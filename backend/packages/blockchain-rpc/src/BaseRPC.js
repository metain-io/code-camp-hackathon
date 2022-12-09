const BN = require("bn.js");
const MoneyNumber = require("../utils/moneyNumber");

const COMMON_PRECISION = 18;

class BaseRPC {
  constructor(provider, opts) {
    opts = opts || {};

    this.network = opts.network;
    this.mode = opts.mode;
    this.provider = provider;
    this.timeout = opts.timeout || 30000;
    this.fastTimeout = opts.fastTimeout || 10000;
    this.smartContractConfig = opts.smartContractConfig;
    this.tag = `${opts.network}:${opts.mode}`;

    this.deferred = false;
    this.isCheckingDeferrence = false;
    this.commonPrecision = COMMON_PRECISION;

    this.supportedCurrencies = Object.keys(this.smartContractConfig.contracts || {}).concat(
      this.smartContractConfig.coin
    );
  }

  /**
   * getDescriptor
   * @returns {string}
   */
  getDescriptor() {
    return JSON.stringify({ provider: this.provider });
  }

  /**
   * recheckDeferrence
   */
  async recheckDeferrence() {
    if (!this.deferred || this.isCheckingDeferrence) {
      return;
    }

    this.isCheckingDeferrence = true;

    try {
      await this.getBlockNumber();
    } catch (ex) {}

    this.isCheckingDeferrence = false;
  }

  /**
   *
   */
  defer() {
    this.deferred = true;
  }

  /**
   * isDeferred
   * @returns
   */
  isDeferred() {
    return this.deferred;
  }

  /**
   * @name moneyNumber
   * @param {number | BN | string} amount
   * @param {string} currency
   * @param {boolean} normalize Normalize input value
   * @returns
   */
  moneyNumber(amount, currency, normalize) {
    let precision;
    if (!currency || currency === this.smartContractConfig.coin) {
      precision = this.smartContractConfig.decimals;
    } else {
      const contract = this.smartContractConfig.contracts[currency];
      if (contract) {
        precision = contract.decimals;
      } else {
        precision = this.commonPrecision;
      }
    }

    return new MoneyNumber(amount, currency, precision, this.commonPrecision, normalize);
  }

  /**
   * getConfirmationDelay
   */
  getConfirmationDelay() {
    return (1 + this.smartContractConfig.requiredVerifications) * this.smartContractConfig.newBlockTime;
  }

  /**
   * isEnoughConfirmation
   * @param {*} latest
   * @param {*} current
   * @returns
   */
  isEnoughConfirmation(latest, current) {
    const count = latest - current;
    if (isNaN(count)) {
      return true;
    }
    return count >= this.smartContractConfig.requiredVerifications;
  }

  /**
   * isBlockAncient
   * @param {*} count
   * @returns
   */
  isBlockAncient(count) {
    return count >= 24 * 1200;
  }
  /**
   * tryHexToNumberString
   * @param {*} hex
   */
  tryHexToNumberString(hex) {
    if (Number.isFinite(hex)) {
      return hex.toString();
    }

    if (hex.startsWith("0x")) {
      return new BN(hex.substring(2), 16).toString();
    }

    return hex;
  }

  /**
   * tryHexToNumber
   * @param {*} hex
   * @returns
   */
  tryHexToNumber(hex) {
    if (Number.isFinite(hex)) {
      return hex;
    }

    try {
      if (hex.startsWith("0x")) {
        return new BN(hex.substring(2), 16).toNumber();
      }

      return parseInt(hex);
    } catch (ex) {
      console.error("[BaseRPC:tryHexToNumber]", ex);
    }

    return 0;
  }

  /**
   * @name getGasCurrency
   * @returns
   */
  getGasCurrency() {
    return this.smartContractConfig.coin;
  }

  /**
   * @name getSupportedCurrencies
   * @returns {Array} Supported currency codes by this chain
   */
  getSupportedCurrencies() {
    return this.supportedCurrencies;
  }

  async importWallet(address) {
    throw new Error("not_implemented");
  }

  async getBalance(address, currency) {
    throw new Error("not_implemented");
  }

  async estimateTransactionFee(currency, from, to, amount) {
    throw new Error("not_implemented");
  }

  async getBlock(blockHashOrBlockNumber, returnTransactionObjects) {
    throw new Error("not_implemented");
  }

  async getTransaction(transactionHash) {
    throw new Error("not_implemented");
  }

  async getBlockNumber() {
    throw new Error("not_implemented");
  }

  privateKeyToAccount(privateKey) {
    throw new Error("not_implemented");
  }

  /**
   * @name createTrade
   * @param {string} account
   * @param {string} currency
   * @param {string} to
   * @param {MoneyNumber} amount
   * @param {string} memo
   */
  async createTrade(account, currency, to, amount, memo) {
    throw new Error("not_implemented");
  }

  sendTrade(trade) {
    throw new Error("not_implemented");
  }

  getTradeReceipt(txID) {
    throw new Error("not_implemented");
  }

  getTradeHash(trade) {
    throw new Error("not_implemented");
  }

  filterInterestingTransactions(block) {
    throw new Error("not_implemented");
  }

  normalizeTransaction(tx, block) {
    throw new Error("not_implemented");
  }

  async parseTransactionDeposit(data) {
    throw new Error("not_implemented");
  }

  filterContractInteractions(transactions, abi, contractAddresses) {
    return transactions;
  }

  async parseTransactionNFT(data) {
    return data;
  }
}

BaseRPC.COMMON_PRECISION = COMMON_PRECISION;

module.exports = BaseRPC;
