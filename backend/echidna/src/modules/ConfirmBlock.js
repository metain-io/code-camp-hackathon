const { fireAndForget, requestResponse, IRIS_BUSES } = require("@metain/pkg/iris");
const { getSmartContractConfig } = require("@metain/blockchain-rpc");
const { createRPC, fetchSecret, tryJSONParse } = require("@metain/typhon-helper");
const BaseModule = require("./BaseModule");

const constant = require("../constant");
const provider = require("../provider");

module.exports = class ScanNewBlock extends BaseModule {
  constructor(opts) {
    super(opts);
    this.queue = this.jobQueues.get("confirm-block", "", "", { priority: 2 });
    this.reprocessQueue = this.jobQueues.get("process-block", "", "", { priority: 5 });

    this.confirmingDeposits = [];
  }

  start() {
    this.queue.start({
      process: this.process.bind(this),
      onCompleted: (job) => {
        const { network, mode, block } = job.data;
        console.log(`CONFIRMED BLOCK ${network}:${mode} at ${block}`);
      },
      onFailed: (job, err) => {
        console.error(err);
      },
    });
  }

  async process(job) {
    const { network, mode, block, deposits, reitTransactions, allDepositsCount, contractInteractions, retry } =
      job.data;
    if (!Array.isArray(deposits)) {
      return;
    }

    const rpc = await createRPC({
      jobQueues: this.jobQueues,
      redisClient: this.redisClient,
      network: network,
      mode: mode,
    });

    let latestBlockNumber = await this.redisClient.get(`latest-block-number:${network}:${mode}`);
    if (!latestBlockNumber) {
      latestBlockNumber = await rpc.getBlockNumber();
      if (!latestBlockNumber) {
        throw new Error("Faulty RPC server");
      }
    }

    const smartConfig = getSmartContractConfig(network, mode);
    const confirmsCount = latestBlockNumber - block;
    if (confirmsCount < smartConfig.requiredVerifications) {
      throw new Error("Need more confirmations");
    }

    console.log(`CONFIRM BLOCK ${network}:${mode} at ${block} (${confirmsCount} confirms)`);
    const { rescannedDeposits, rescannedContractInteractions } = await this.getTransactions(rpc, block);

    if (
      rescannedDeposits.length !== allDepositsCount ||
      rescannedContractInteractions.length !== contractInteractions.length
    ) {
      console.warn(`DIFFERENT BLOCK DATA ${network}:${mode} at ${block}`);
      await this.retry(network, mode, block, retry, []);
      return;
    }

    const failedDeposits = this.confirmDepositTransactions(deposits, rescannedDeposits);

    if (this.confirmingDeposits.length > 0) {
      await fireAndForget({
        env: process.env.ENV,
        bus: IRIS_BUSES.BUS_CRITICAL.NAME,
        service: "cerberus",
        action: "record-deposits",
        data: {
          deposits: this.confirmingDeposits,
        },
      });
      this.confirmingDeposits = [];
    }

    if (reitTransactions.length) {
      const result = await Promise.all(
        reitTransactions.map(async (txn) => {
          return await requestResponse({
            env: process.env.ENV,
            bus: IRIS_BUSES.BUS_CRITICAL.NAME,
            service: "pandora",
            action: "transfer-reit",
            data: {
              body: {
                type: txn.type,
                address: txn.beneficiary,
                amount: txn.value,
                currency: txn.currency,
                network: txn.network,
                txID: txn.txId,
                blockNumber: txn.blockNumber.toString(),
                comment: "TRANF_REIT",
                system: "echina",
              },
            },
            enableLog: true,
          });
        })
      );
    }

    if (failedDeposits.length > 0) {
      await this.retry(network, mode, block, retry, failedDeposits);
    }

    const failedContractInteractions = this.confirmContractInteractions(
      rpc,
      contractInteractions,
      rescannedContractInteractions
    );
    if (failedContractInteractions.length > 0) {
      await this.retry(network, mode, block, retry, failedContractInteractions);
    }
  }

  async retry(network, mode, block, count, failedTransactions) {
    if (count < constant.MAX_CONFIRM_RETRIES) {
      console.log(`RETRY ${failedTransactions.length} TRANSACTIONS OF BLOCK ${block} FOR ${count + 1} TIMES`);
      this.reprocessQueue.add(
        { network, mode, block, retry: count + 1 },
        { jobId: `${this.network}:${this.mode}:${block}:${count + 1}` }
      );
    } else {
      console.error(
        `TOO MANY RETRIES CONFIRMING BLOCK ${block} TRANSACTIONS [${failedTransactions.map((tx) => tx.txId).join(",")}]`
      );
    }
  }

  async confirmContractInteractions(rpc, contractInteractions, rescannedContractInteractions) {
    const results = await Promise.all(
      contractInteractions.map((tx) => this.confirmContractInteraction(rpc, tx, rescannedContractInteractions))
    );
    const failedTransactions = results.filter((tx) => !!tx);
    return failedTransactions;
  }

  async confirmDepositTransactions(deposits, rescannedDeposits) {
    const results = await Promise.all(deposits.map((tx) => this.confirmTransaction(tx, rescannedDeposits)));
    const failedTransactions = results.filter((tx) => !!tx);
    return failedTransactions;
  }

  async confirmContractInteraction(rpc, contractInteraction, rescannedContractInteractions) {
    const matchingTransaction = rescannedContractInteractions.find((tx) => tx.txId === contractInteraction.txId);

    if (!matchingTransaction) {
      console.error(`NO CONFIRMED INTERACTION: ${contractInteraction.txId}`);
      return null;
    }

    if (
      contractInteraction.from === matchingTransaction.from &&
      contractInteraction.blockNumber === matchingTransaction.blockNumber &&
      contractInteraction.to === matchingTransaction.to &&
      contractInteraction.input === matchingTransaction.input
    ) {
      const network = rpc.network;
      const mode = rpc.mode;

      console.log(`CONFIRMED INTERACTION: ${contractInteraction.txId}`);

      // TODO: common way to generate wallet username
      const username = `w-${network}-${mode === "mainnet" ? "m" : "t"}-${contractInteraction.from}`;

      await fireAndForget({
        env: process.env.ENV,
        bus: IRIS_BUSES.BUS_HIGH.NAME,
        service: "wallet",
        action: "smart-contract",
        data: {
          username,
          key: contractInteraction.contractKey,
          txId: contractInteraction.txId,
          decodedInput: contractInteraction.decodedInput,
        },
      });

      return null;
    }

    console.error(`FAILED INTERACTION: ${contractInteraction.txId}`);
    return contractInteraction;
  }

  async confirmTransaction(deposit, rescannedTransactions) {
    const matchingTransaction = rescannedTransactions.find((tx) => tx.hash === deposit.txId);
    if (!matchingTransaction) {
      console.error(`NO CONFIRMED TRANSACTION: ${deposit.txId}`);
      return null;
    }

    if (
      deposit.from === matchingTransaction.from &&
      deposit.blockNumber === matchingTransaction.blockNumber &&
      deposit.currency === matchingTransaction.currency &&
      deposit.to === matchingTransaction.deposit.beneficiary &&
      deposit.value === matchingTransaction.deposit.value
    ) {
      console.log(`CONFIRMED TRANSACTION: ${deposit.txId}`);
      this.confirmingDeposits.push(deposit);
      return null;
    }

    console.error(`FAILED TRANSACTION: ${deposit.txId}`);
    return deposit;
  }

  async getTransactions(rpc, blockNumber) {
    const res = await rpc.getBlock(blockNumber, true);

    if (res) {
      try {
        const [rescannedDeposits, rescannedContractInteractions] = await Promise.all([
          this.rescanDepositTransactions(rpc, res),
          this.rescanContractInteractions(rpc, res),
        ]);

        return { rescannedDeposits, rescannedContractInteractions };
      } catch (ex) {
        console.error(ex);
      }
    } else {
      throw new Error(`Unexpected empty block scan result ${blockNumber}`);
    }
  }

  async rescanDepositTransactions(rpc, list) {
    const transactions = rpc.filterInterestingTransactions(list);

    // Parse transaction's blockchain data for deposit information
    const parsedTransactions = await Promise.all(
      transactions.map(async (txn) => {
        txn.deposit = await rpc.parseTransactionDeposit(txn);
        return txn;
      })
    );

    return parsedTransactions;
  }

  async rescanContractInteractions(rpc, list) {
    const settings = await fetchSecret({
      jobQueues: this.jobQueues,
      redisClient: this.redisClient,
      network: rpc.network,
      mode: rpc.mode,
      path: `settings/contracts/${rpc.network}`,
    });

    if (!settings || !Object.keys(settings).length) {
      return [];
    }

    let contracts = {};

    for (let name in settings) {
      try {
        const setting = JSON.parse(settings[name]);
        for (let project in setting.addresses) {
          const key = `${name}-${project}`;
          contracts[key] = {
            abi: setting.abi,
            address: setting.addresses[project],
          };
        }
      } catch (ex) {
        console.error("[ERROR][rescanContractInteractions]", ex);
      }
    }

    return rpc.filterContractInteractions(list, contracts);
  }
};
