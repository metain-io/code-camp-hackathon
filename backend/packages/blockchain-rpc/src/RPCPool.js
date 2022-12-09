const fs = require("fs");

module.exports = class RPCPool {
  /**
   * constructor
   * @param {Object} opts
   * @param {string} opts.network
   * @param {string} opts.mode
   */
  constructor(opts) {
    this.network = opts.network;
    this.mode = opts.mode || "mainnet";
    this.create = opts.create;
    this.configBase = opts.configBase;
    this.smartContractConfig = opts.smartContractConfig;

    this.counter = 0;
    this.pool = [];
    this.rpcConfig = null;

    this.configBase.on("sync", this.reloadConfig.bind(this));
    this.reloadConfig(this.configBase.data.rpc);
  }

  reloadConfig (config) {
    this.rpcConfig = config[`${this.network}-${this.mode}`];
    if (!this.rpcConfig) {
      return;
    }

    const newPool = [];
    if (this.create) {
      for (let rpcUrl of this.rpcConfig) {
        newPool.push(
          this.create({
            rpcUrl,
            network: this.network,
            mode: this.mode,
            smartContractConfig: this.smartContractConfig
          })
        );
      }
    }

    this.pool = newPool;
  }

  /**
   * rotate
   * @returns
   */
  rotate () {
    for (let i = 0; i < this.pool.length; ++i) {
      const res = this.pool[this.counter];
      this.counter = (this.counter + 1) % this.pool.length;

      if (!res.isDeferred()) {
        return res;
      } else {
        res.recheckDeferrence();
      }
    }
  }
};
