const path = require("path");

const Web3 = require("web3");
const BtcRPC = require("./BtcRPC");
const EthRPC = require("./EthRPC");
const TrxRPC = require("./TrxRPC");
const SolRPC = require("./SolRPC");

const smartContractConfig = require("../config/smartcontract.config.json");
const RPCPool = require("./RPCPool");
const BaseRPC = require("./BaseRPC");

const ConfigBase = require("../utils/configBase");

const SMARTCONTRACT_CONFIG = smartContractConfig;

exports.NETWORKS_WALLET_ADDRESS_REMAP = {
  eth: "eth",
  bsc: "eth",
  trx: "trx",
  btc: "btc",
  avax: "eth",
  matic: "eth",
  sol: "sol"
};

/**
 * toWei
 * @param {*} value
 * @param {*} unit
 * @returns
 */
const toWei = function (value, unit) {
  return Web3.utils.toWei(value, unit);
};

exports.toWei = toWei;

/**
 * createAvaxRPC
 */
const createAvaxRPC = function (opts) {
  return new EthRPC(opts.rpcUrl, {
    network: opts.network,
    mode: opts.mode,
    gasLimit: 100000,
    gasPrice: toWei('100', 'gwei'),
    smartContractConfig: opts.smartContractConfig,
  });
};

/**
 * createMaticRPC
 */
 const createMaticRPC = function (opts) {
  return new EthRPC(opts.rpcUrl, {
    network: opts.network,
    mode: opts.mode,
    gasLimit: 100000,
    gasPrice: toWei('100', 'gwei'),
    smartContractConfig: opts.smartContractConfig,
  });
};

/**
 * createBscRPC
 */
const createBscRPC = function (opts) {
  return new EthRPC(opts.rpcUrl, {
    network: opts.network,
    mode: opts.mode,
    gasLimit: 100000,
    gasPrice: toWei('100', 'gwei'),
    smartContractConfig: opts.smartContractConfig,
  });
};

/**
 * createEthRPC
 */
const createEthRPC = function (opts) {
  return new EthRPC(opts.rpcUrl, {
    network: opts.network,
    mode: opts.mode,
    gasLimit: 100000,
    smartContractConfig: opts.smartContractConfig
  });
};

/**
 * createTrxRPC
 * @param {*} opts 
 * @returns 
 */
const createTrxRPC = function (opts) {
  return new TrxRPC(opts.rpcUrl, {
    network: opts.network,
    mode: opts.mode,
    smartContractConfig: opts.smartContractConfig
  })
}

/**
 * createBtcRPC
 * @param {*} opts 
 */
const createBtcRPC = function (opts) {
  const rpc = new BtcRPC(opts.rpcUrl, {
    network: opts.network,
    mode: opts.mode,
    smartContractConfig: opts.smartContractConfig
  });
  return rpc;
}


/**
 * createSolanaRPC
 * @param {*} opts 
 */
const createSolRPC = function (opts) {
  const rpc = new SolRPC(opts.rpcUrl, {
    network: opts.network,
    mode: opts.mode,
    smartContractConfig: opts.smartContractConfig
  });
  return rpc;
}

/**
 * createRPC
 * @param {*} network
 * @param {*} mode
 * @returns
 */

const createRpcFunc = {
  eth: createEthRPC,
  bsc: createBscRPC,
  trx: createTrxRPC,
  btc: createBtcRPC,
  avax: createAvaxRPC,
  matic: createMaticRPC,
  sol: createSolRPC
};

exports.quickCreateRPC = function (network, mode, rpcUrl) {
  if (!createRpcFunc[network]) {
    throw new Error(`Unsupported ${network}-${mode}`);
  }

  const rpc = createRpcFunc[network]({
    rpcUrl,
    network,
    mode,
    smartContractConfig: SMARTCONTRACT_CONFIG[`${network}-${mode}`]
  });

  return rpc;
};

let rpcPool = {};

/**
 * @name createRPC
 * @param {string} network 
 * @param {string} mode 
 * @param {object} configBase 
 * @returns {BaseRPC} The RPC wrapper object
 */
exports.createRPC = function (network, mode, configBase) {
  if (!rpcPool[network]) {
    rpcPool[network] = {};
  }
  if (!rpcPool[network][mode]) {
    rpcPool[network][mode] = new RPCPool({
      network,
      mode,
      configBase,
      create: createRpcFunc[network],
      smartContractConfig: SMARTCONTRACT_CONFIG[`${network}-${mode}`]
    });
  }

  const rpc = rpcPool[network][mode].rotate();
  if (!rpc) {
    console.warn(`Unsupported ${network}-${mode}`);
  }
  return rpc;
};

/**
 * @name getSmartContractConfig
 * @param {*} network 
 * @param {*} mode 
 */
exports.getSmartContractConfig = function (network, mode) {
  return SMARTCONTRACT_CONFIG[`${network}-${mode}`];
}

/**
 * @name createConfigBase
 * @param {*} opts 
 * @returns 
 */
exports.createConfigBase = function (opts) {
  return new ConfigBase(opts);
}

exports.getCommonPrecision = function () {
  return BaseRPC.COMMON_PRECISION;
}