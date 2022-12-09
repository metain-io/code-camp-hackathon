const { fireAndForget, requestResponse, IRIS_BUSES } = require("@metain/pkg/iris");
const { NETWORKS_WALLET_ADDRESS_REMAP } = require("@metain/blockchain-rpc");
const { createRPC, fetchSecret, tryJSONParse } = require("@metain/typhon-helper");

const BaseModule = require("./BaseModule");
const constant = require("../constant");

module.exports = class ProcessBlock extends BaseModule {
  constructor(opts) {
    super(opts);
    this.queue = this.jobQueues.get("process-block", "", "", { priority: 5 });
    this.confirmQueue = this.jobQueues.get("confirm-block", "", "", { priority: 1 });
    this.confirmPrivateOfferQueue = this.jobQueues.get("confirm-block-private-offer", "", "", { priority: 1 });
  }

  start() {
    this.queue.start({
      process: this.process.bind(this),
      onCompleted: (job) => {},
      onFailed: (job, err) => {
        console.error(err);
      },
    });
  }

  async process(job) {
    const { network, mode, block } = job.data;
    const retry = job.data.retry || 0;

    console.log(`PROCESS BLOCK ${network}:${mode} at ${block}`);

    const rpc = await createRPC({
      jobQueues: this.jobQueues,
      redisClient: this.redisClient,
      network: network,
      mode: mode,
    });

    const { deposits, reitTransactions, allDepositsCount, contractInteractions } = await this.getTransactions(
      rpc,
      block
    );

    if (deposits.length > 0) {
      await requestResponse({
        env: process.env.ENV,
        bus: IRIS_BUSES.BUS_CRITICAL.NAME,
        service: "cerberus",
        action: "hold-deposits",
        data: {
          deposits,
        },
      });
    }

    if (deposits.length > 0 || contractInteractions.length > 0 || reitTransactions.length > 0) {
      console.log(`TO CONFIRM BLOCK ${network}:${mode} at ${block}`);
      this.confirmQueue.add(
        { block, network, mode, retry, deposits, reitTransactions, allDepositsCount, contractInteractions },
        { jobId: `${network}:${mode}:${block}` }
      );
    }
  }

  async getTransactions(rpc, blockNumber) {
    const res = await rpc.getBlock(blockNumber, true);

    if (res) {
      try {
        const allTransactions = rpc.filterInterestingTransactions(res);

        const [deposits, contractInteractions, reitTransactions] = await Promise.all([
          this.scanDepositTransactions(rpc, allTransactions),
          this.scanContractInteractions(rpc, res),
          this.scanNFTTransactions(rpc, allTransactions),
        ]);

        return {
          deposits,
          allDepositsCount: allTransactions.length,
          reitTransactions,
          contractInteractions,
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    } else {
      throw new Error(`Unexpected empty block scan result ${blockNumber}`);
    }
  }

  async scanContractInteractions(rpc, list) {
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
          const key = `${name}|${project}`;
          contracts[key] = {
            abi: setting.abi,
            address: setting.addresses[project],
          };
        }
      } catch (ex) {
        console.error("[ERROR][scanContractInteractions]", ex);
      }
    }

    const decodedList = rpc.filterContractInteractions(list, contracts);
    return decodedList;
  }

  async scanDepositTransactions(rpc, transactions) {
    const network = rpc.network;
    const mode = rpc.mode;

    // Parse transaction's blockchain data for deposit information
    const parsedTransactions = await Promise.all(
      transactions.map(async (txn) => {
        txn.deposit = await rpc.parseTransactionDeposit(txn);
        return txn;
      })
    );

    // Map transaction addresses with our in-house usernames
    const remappedNetwork = NETWORKS_WALLET_ADDRESS_REMAP[network] + "-" + mode;
    const transactionAddresses = [
      ...new Set(parsedTransactions.map((txn) => remappedNetwork + ":" + txn.deposit.beneficiary)),
    ];

    if (transactionAddresses.length > 0) {
      const accounts = await requestResponse({
        env: process.env.ENV,
        bus: IRIS_BUSES.BUS_HIGH.NAME,
        service: "cerberus",
        action: "fetch-custodial-accounts",
        data: {
          addresses: transactionAddresses,
        },
      });

      if (accounts && accounts.length > 0) {
        // Process transaction with found usernames
        const results = await Promise.all(
          parsedTransactions.map((data) => this.processTransaction(network, mode, data, accounts))
        );

        return results.filter((acc) => !!acc);
      }
    }

    return [];
  }

  async processTransaction(network, mode, data, accounts) {
    const { beneficiary, value, currency } = data;

    if (constant.SUPPORTED_CURRENCIES.indexOf(currency) < 0) {
      console.log("[LOG][ProcessBlock] Ignore currency", currency, data.hash);
      return null;
    }

    const remappedNetwork = NETWORKS_WALLET_ADDRESS_REMAP[network] + "-" + mode;
    const addressToFind = remappedNetwork + ":" + beneficiary;
    const account = accounts.find((acc) => acc.address === addressToFind);
    if (account) {
      const result = await this.recordPendingDeposit({
        account,
        currency,
        value,
        network,
        mode,

        txId: data.hash,
        blockNumber: data.blockNumber,
        from: data.from,
        to: beneficiary,
      });

      return result;
    }

    return null;
  }

  async recordPendingDeposit(opts) {
    const { txId, account, currency, value, network, mode, blockNumber, from, to } = opts;
    const username = account.username;

    const data = {
      username,
      value,
      currency,
      from,
      to,
      txId,
      blockNumber,
      network: `${network}-${mode}`,
      hash: `${blockNumber}:${txId}`,
    };

    return data;
  }

  async scanNFTTransactions(rpc, transactions) {
    const network = rpc.network;
    const mode = rpc.mode;

    // Parse transaction's blockchain data for deposit information
    const parsedTransactions = await Promise.all(
      transactions.map(async (txn) => {
        txn.transfers = await rpc.parseTransactionNFT(txn, "VOT1");
        return txn;
      })
    );

    const remappedNetwork = NETWORKS_WALLET_ADDRESS_REMAP[network] + "-" + mode;

    const results = [];
    parsedTransactions.map((txn) => {
      if (txn.transfers && txn.transfers.length) {
        txn.transfers.map((transfer) => {
          const data = {
            hash: txn.hash,
            blockNumber: txn.blockNumber,
            value: transfer.value,
            currency: transfer.currency,
          };
          results.push(
            this.processNFTTransaction(network, mode, {
              beneficiary: `${remappedNetwork}:${transfer.to}`,
              type: "debit",
              ...data,
            })
          );
          results.push(
            this.processNFTTransaction(network, mode, {
              beneficiary: `${remappedNetwork}:${transfer.from}`,
              type: "credit",
              ...data,
            })
          );
        });
      }
    });

    return results;
  }

  processNFTTransaction(network, mode, data) {
    const { hash, blockNumber, beneficiary, value, currency, type } = data;

    const result = this.recordTransactionNFT({
      currency,
      value,
      network,
      mode,

      txId: hash,
      blockNumber: blockNumber,
      beneficiary,
      type,
    });

    return result;
  }

  recordTransactionNFT(opts) {
    const { txId, currency, value, network, mode, blockNumber, beneficiary, type } = opts;

    const data = {
      value,
      currency,
      beneficiary,
      type,
      txId,
      blockNumber,
      network: `${network}-${mode}`,
      hash: `${blockNumber}:${txId}`,
    };

    return data;
  }
};
