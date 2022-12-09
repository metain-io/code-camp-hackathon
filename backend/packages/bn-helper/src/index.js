import BN from "bn.js";

const DECIMALS = 18;
const BASE = Math.pow(10, DECIMALS);
const BASE_BN = new BN(BASE.toString());

export function tryBN(val) {
  if (!val) {
    return new BN(0);
  }

  try {
    return new BN(val.toString(), 10);
  } catch (ex) {}

  return new BN(0);
}

export function convertNumberToBN(x) {
  return new BN(Math.floor(x * BASE).toLocaleString("fullwide", { useGrouping: false }));
}

export function convertStringToBN(x) {
  if (!x || isNaN(+x)) return ZERO_BN;
  return convertNumberToBN(+x);
}

export function mul(bn1, bn2) {
  return bn1.mul(bn2).div(BASE_BN);
}

export function div(bn1, bn2) {
  return bn1.mul(BASE_BN).div(bn2);
}

export function add(bn1, bn2) {
  return bn1.add(bn2);
}

export function sub(bn1, bn2) {
  return bn1.sub(bn2);
}

export function format(value, separator = ".", pointSymbol = ",") {
  const bn = new BN(value);
  if (!bn) {
    return "0";
  }

  const sign = bn.isNeg() ? "-" : "";
  const div = bn.div(BASE_BN).abs();
  const mod = bn.mod(BASE_BN).abs();

  const divStr = addSeparator(div, separator);
  const modStr = mod.toString(10, DECIMALS).substring(0, 4).replace(/0+$/, "");

  const result = `${sign}${divStr}${modStr ? pointSymbol + modStr : ""}`;

  return result;
}

function addSeparator(num, separator = ".") {
  if (num === null) return;
  return (
    num
      .toString() // transform the number to string
      .split("") // transform the string to array with every digit becoming an element in the array
      .reverse() // reverse the array so that we can start process the number from the least digit
      .map((digit, index) => (index != 0 && index % 3 === 0 ? `${digit}${separator}` : digit)) // map every digit from the array.
      // If the index is a multiple of 3 and it's not the least digit,
      // that is the place we insert the comma behind.
      .reverse() // reverse back the array so that the digits are sorted in correctly display order
      .join("")
  ); // transform the array back to the string
}

export const ZERO_BN = new BN(0);

export default {
  convertNumberToBN,
  convertStringToBN,
  tryBN,
  mul,
  div,
  add,
  sub,
  format,
  ZERO_BN,
};
