/* eslint-disable no-param-reassign */
const utils = require('web3-utils');
const { formatters } = require('web3-core-helpers');

module.exports = (tx) => {
  if (tx.blockNumber !== null) {
    tx.blockNumber = utils.hexToNumber(tx.blockNumber);
  }
  if (tx.transactionIndex !== null) {
    tx.transactionIndex = utils.hexToNumber(tx.transactionIndex);
  }
  tx.nonce = tx.nonce && formatters.outputBigNumberFormatter(tx.nonce);
  tx.gas = tx.gas && formatters.outputBigNumberFormatter(tx.gas);
  tx.gasPrice = tx.gasPrice && formatters.outputBigNumberFormatter(tx.gasPrice);
  tx.value = tx.value && formatters.outputBigNumberFormatter(tx.value);
  if (tx.to && utils.isAddress(tx.to)) { // tx.to could be `0x0` or `null` while contract creation
    tx.to = utils.toChecksumAddress(tx.to);
  } else {
    tx.to = null; // set to `null` if invalid address
  }
  if (tx.from) {
    tx.from = utils.toChecksumAddress(tx.from);
  }
  return tx;
};
