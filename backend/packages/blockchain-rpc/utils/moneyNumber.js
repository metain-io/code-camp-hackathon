const BN = require("bn.js");

/**
 * @name getDecimalSeparator
 * @param {string} locale 
 * @returns 
 */
function getDecimalSeparator(locale) {
  const numberWithDecimalSeparator = 1.1;
  return Intl.NumberFormat(locale)
    .formatToParts(numberWithDecimalSeparator)
    .find((part) => part.type === "decimal").value;
}

/**
 * @name numberToBN
 * @param {number} x
 * @param {number} decimals
 * @returns
 */
function numberToBN(x, decimals) {
  try {
    var c = x.toString(10).split(/[^0-9]/);
    var d = (c[1] || "0").padEnd(decimals, "0").substring(0, decimals);
    return new BN(c[0] + d);
  } catch (ex) {
    console.error(ex);
  }

  return new BN(0);
}

/**
 * @name BNToNumber
 * @param {BN} x
 * @param {number} decimals
 * @returns
 */
function BNToNumber(x, decimals) {
  try {
    const base = new BN(10).pow(new BN(decimals));
    const dm = new BN(x.toString(10)).divmod(base);
    const s = dm.div.toString(10) + getDecimalSeparator() + dm.mod.toString(10).padStart(decimals, "0");
    return parseFloat(s);
  } catch (ex) {
    console.error(ex);
  }

  return 0;
}

/**
 * @name changeValuePrecision
 * @param {BN} x
 * @param {number} decimals
 * @param {number} toDecimals
 */
function changeValuePrecision(x, decimals, toDecimals) {
  const base = new BN(10).pow(new BN(Math.abs(decimals - toDecimals)));
  if (decimals > toDecimals) {
    return new BN(x.toString(10)).div(base);
  } else if (decimals < toDecimals) {
    return new BN(x.toString(10)).mul(base);
  }

  return new BN(x.toString(10));
}

module.exports = class MoneyNumber {
  /**
   * @name Constructor
   * @param {*} value
   * @param {*} currency
   * @param {*} precision
   * @param {*} normalPrecision
   * @param {*} normalize
   */
  constructor(value, currency, precision, normalPrecision, normalize) {
    this.currency = currency || "";
    this.normalPrecision = normalPrecision || 18;
    this.precision = precision || 18;

    if (!value || typeof value === "number") {
      this.value = numberToBN(value || 0, this.normalPrecision);
    } else {
      if (typeof value === "string") {
        this.value = new BN(value);
      } else {
        this.value = value;
      }

      if (normalize) {
        this.value = changeValuePrecision(this.value, this.precision, this.normalPrecision);
      }
    }
  }

  /**
   * @name toString
   * @returns
   */
  toString() {
    return this.value.toString(10);
  }

  /**
   * @name toNumber
   * @returns
   */
  toNumber() {
    return BNToNumber(this.value, this.normalPrecision);
  }

  /**
   * @name toCurrency
   * @returns
   */
  toCurrency() {
    return changeValuePrecision(this.value, this.normalPrecision, this.precision).toString(10);
  }

  /**
   * @name toCurrencyAsNumber
   * @returns
   */
  toCurrencyAsNumber() {
    return changeValuePrecision(this.value, this.normalPrecision, this.precision).toNumber();
  }

  add(x) {
    return new MoneyNumber(this.value.add(x.value), this.currency, this.precision, this.normalPrecision, false);
  }

  sub(x) {
    return new MoneyNumber(this.value.sub(x.value), this.currency, this.precision, this.normalPrecision, false);
  }

  ltz() {
    return this.value.lt(new BN(0));
  }

  gtz() {
    return this.value.gt(new BN(0));
  }

  gt (x) {
    return this.value.gt(x.value);
  }

  ltez () {
    return this.value.lte(new BN(0));    
  }
};
