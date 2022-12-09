const { Transaction, Connection } = require("@solana/web3.js");
const bs58 = require("bs58");

const BaseRPC = require("./BaseRPC");

/**
 * SolanaRPC
 */
module.exports = class SolanaRPC extends BaseRPC {
  /**
   * Constructor
   * @param {Object|string} provider
   * @param {Object} opts
   * @param {Object} opts.smartContractConfig
   * @param {number} opts.timeout
   */
  constructor(provider, opts) {
    super(provider, opts);

    this.mode = opts.mode;
    this.connection = new Connection(provider);
    this.transaction = new Transaction();
  }

  /**
   * getBlockNumber
   * @returns
   */
  async getBlockNumber() {
    const result = await Promise.race([
      this.connection.getSlot(),
      new Promise((resolve) => setTimeout(resolve, this.fastTimeout)),
    ]);

    if (!result) {
      this.deferred = true;
      throw new Error("timed_out");
    }

    this.deferred = false;
    return result - 200;
  }

  /**
   * filterInterestingTransactions
   * @param {Object} block
   * @returns
   */
  filterInterestingTransactions(block) {
    const { transactions } = block;
    if (!transactions) {
      return [];
    }

    let result = [];
    transactions.forEach((tx) => {
      if (tx) {
        const normalizeds = this.normalizeTransaction(tx, block);
        if (normalizeds) {
          result = result.concat(normalizeds);
        }
      }
    });

    return result;
  }

  /**
   * normalizeTransaction
   * @param {*} tx
   * @param {*} block
   * @returns
   */
  normalizeTransaction(tx, block) {
    if (!tx.transaction.signatures) {
      return null;
    }

    try {
      tx.hash = `${this.tag}:${tx.transaction.signatures[0]}`;
      tx.blockNumber = this.tryHexToNumber(block.blockHeight);
      return [tx];
    } catch (ex) {
      console.error(ex);
    }

    return null;
  }

  /**
   * @name getBlock
   * @param {number|string} blockHashOrBlockNumber
   * @param {boolean} returnTransactionObjects
   */
  async getBlock(blockHashOrBlockNumber, returnTransactionObjects) {
    if (!blockHashOrBlockNumber) {
      blockHashOrBlockNumber = await this.getBlockNumber();
    }

    const result = await Promise.race([
      this.connection.getBlock(parseInt(blockHashOrBlockNumber), {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      }),
      new Promise((resolve) => setTimeout(() => resolve("timed_out"), this.timeout)),
    ]);

    if (result === "timed_out") {
      this.deferred = true;
      throw new Error(result);
    }

    if (!result) {
      this.deferred = true;
    }

    this.deferred = false;
    return result;
  }

  /**
   * parseTransactionDeposit
   * @param {*} data
   * @returns
   */
  async parseTransactionDeposit(data) {
    return [];
  }

  /**
   * @name normalizeWalletAddress
   * @description Normalize a wallet address that starts with 0x and all lower case.
   * @param {String} address
   * @returns {String} Normalized wallet address
   */
  normalizeWalletAddress(address) {
    let res = address.toLowerCase();
    if (!res.startsWith("0x")) {
      res = "0x" + res;
    }
    return res;
  }

  /**
   * @name filterContractInteractions
   * @description
   * @param {*} blockData
   * @param {*} contracts
   */
  filterContractInteractions(blockData, contracts) {
    return [];
  }

  /**
   * parseTransactionNFT
   * @param {*} data
   * @returns
   */
  async parseTransactionNFT(data, tokenName) {
    let mapTransaction = {};
    const tokenAddress = this.smartContractConfig.contracts[tokenName].address;

    const { meta } = data;
    if (meta.postTokenBalances && meta.preTokenBalances) {
      const postTokenBalances = meta.postTokenBalances;
      const preTokenBalances = meta.preTokenBalances;

      for (let i = 0; i < postTokenBalances.length; i++) {
        const postTokenItem = postTokenBalances[i];
        const preTokenItem = preTokenBalances[i];

        const minToken = postTokenItem.mint;

        if (minToken === tokenAddress) {
          const postValue = this.moneyNumber(postTokenItem.uiTokenAmount.amount, tokenName, false);
          const preValue = this.moneyNumber(preTokenItem.uiTokenAmount.amount, tokenName, false);
          const value = postValue - preValue;
          const transType = value > 0 ? "to" : "from";
          const amount = Math.abs(value).toString();

          if (!mapTransaction[amount]) {
            mapTransaction[amount] = {
              currency: tokenName,
              value: amount,
            };
          }
          mapTransaction[amount][transType] = postTokenItem.owner;
        }
      }
    }

    let result = [];
    if (mapTransaction) {
      for (let key in mapTransaction) {
        result.push(mapTransaction[key]);
      }
    }
    console.log("parseTransactionNFT result: ", result);

    return result;
  }
};
