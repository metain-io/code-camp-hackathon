import Bn from 'bn.js';
import { numberToFixedString } from './utils';

const DEFAULT_DECIMALS = 18;
const DEFAULT_BASE = new Bn(10).pow(new Bn(DEFAULT_DECIMALS));

class WrappedBn {
    private _bn: Bn;

    private constructor(bn: Bn) {
        this._bn = bn;
    }

    static ZERO = WrappedBn.createFromNumber(0);

    static createFromNumber(n: number): WrappedBn {
        let str = numberToFixedString(n).replace('-', '');

        const sign = n < 0 ? '-' : '';

        const numberComponents = str.split(/[^0-9]/);

        numberComponents[1] = (numberComponents[1] || '0').padEnd(DEFAULT_DECIMALS, '0').substring(0, DEFAULT_DECIMALS);

        const bn = new Bn(sign + numberComponents.join(''));

        return new WrappedBn(bn);
    }

    static createFromBn(bn: Bn, bnDecimals: number = DEFAULT_DECIMALS): WrappedBn {
        if (bnDecimals < 0) {
            throw new Error('bnDecimals is less than 0');
        }

        const base = new Bn(10).pow(new Bn(bnDecimals));

        let outBn = bn.mul(DEFAULT_BASE);

        if (bnDecimals != 0) {
            outBn = outBn.div(base);
        }

        return new WrappedBn(outBn);
    }

    static add(wbn1: WrappedBn, wbn2: WrappedBn): WrappedBn {
        const bn = wbn1._bn.add(wbn2._bn);
        return new WrappedBn(bn);
    }

    static sub(wbn1: WrappedBn, wbn2: WrappedBn): WrappedBn {
        const bn = wbn1._bn.sub(wbn2._bn);
        return new WrappedBn(bn);
    }

    static mul(wbn1: WrappedBn, wbn2: WrappedBn): WrappedBn {
        const bn = wbn1._bn.mul(wbn2._bn).div(DEFAULT_BASE);
        return new WrappedBn(bn);
    }

    static div(wbn1: WrappedBn, wbn2: WrappedBn): WrappedBn {
        const bn = wbn1._bn.mul(DEFAULT_BASE).div(wbn2._bn);
        return new WrappedBn(bn);
    }

    static divRound(wbn1: WrappedBn, wbn2: WrappedBn): WrappedBn {
        const bn = wbn1._bn.divRound(wbn2._bn).mul(DEFAULT_BASE);
        return new WrappedBn(bn);
    }

    static mod(wbn1: WrappedBn, wbn2: WrappedBn): WrappedBn {
        const bn = wbn1._bn.mod(wbn2._bn);
        return new WrappedBn(bn);
    }

    static floor(wbn: WrappedBn): WrappedBn {
        //@ts-ignore
        const divMod = wbn._bn.divmod(DEFAULT_BASE);

        const { div } = divMod;

        if (wbn._bn.gte(div)) {
            return WrappedBn.createFromBn(div.mul(DEFAULT_BASE));
        }

        return WrappedBn.createFromBn(div.sub(new Bn(1)).mul(DEFAULT_BASE));
    }

    static ceil(wbn: WrappedBn): WrappedBn {
        //@ts-ignore
        const divMod = wbn._bn.divmod(DEFAULT_BASE);

        const { div } = divMod;

        if (wbn._bn.lte(div)) {
            return WrappedBn.createFromBn(div.mul(DEFAULT_BASE));
        }

        return WrappedBn.createFromBn(div.add(new Bn(1)).mul(DEFAULT_BASE));
    }

    static round(wbn: WrappedBn): WrappedBn {
        //@ts-ignore
        const divMod = wbn._bn.divmod(DEFAULT_BASE);

        const { mod } = divMod;

        const base = mod.mul(new Bn(10)).abs().div(DEFAULT_BASE);

        if (base.gte(new Bn(5))) {
            return WrappedBn.ceil(wbn);
        }

        return WrappedBn.floor(wbn);
    }

    static format(
        wbn: WrappedBn,
        numberOfFraction: number = 2,
        decimalSeparator: string = ',',
        pointSymbol: string = '.',
        keepFractionZero = false,
    ): string {
        const sign = wbn._bn.isNeg() ? '-' : '';
        const div = wbn._bn.div(DEFAULT_BASE).abs();
        const mod = wbn._bn.mod(DEFAULT_BASE).abs();

        const divStr = div
            .toString(10)
            .split('')
            .reverse()
            .map((digit, index) => (index != 0 && index % 3 === 0 ? `${digit}${decimalSeparator}` : digit))
            .reverse()
            .join('');

        let modStr = mod
            .toString(10)
            .padStart(DEFAULT_DECIMALS, '0')
            .substring(0, numberOfFraction)
            .padEnd(numberOfFraction, '0');

        if (!keepFractionZero) {
            modStr = modStr.replace(/0+$/g, '');
        }

        return `${sign}${divStr}${modStr ? pointSymbol + modStr : ''}`;
    }

    static convertToNumber(wbn: WrappedBn) {
        // @ts-ignore
        const dm = wbn._bn.divmod(DEFAULT_BASE);

        let str = dm.div.toString(10) + '.' + dm.mod.toString(10).replace('-', '').padStart(DEFAULT_DECIMALS, '0');

        if (wbn._bn.isNeg() && str[0] !== '-') {
            str = '-' + str;
        }

        return parseFloat(str);
    }

    static convertToBn(wbn: WrappedBn, outDecimals: number) {
        if (outDecimals == DEFAULT_DECIMALS) {
            return new Bn(wbn._bn);
        }

        const base = new Bn(10).pow(new Bn(Math.abs(DEFAULT_DECIMALS - outDecimals)));

        if (outDecimals < DEFAULT_DECIMALS) {
            return wbn._bn.div(base);
        }

        return wbn._bn.mul(base);
    }

    static convertToString(wbn: WrappedBn, base?: number | 'hex', length?: number) {
        return wbn._bn.toString(base || 10, length);
    }

    toNumber(): number {
        return WrappedBn.convertToNumber(this);
    }

    toBn(outDecimals: number = DEFAULT_DECIMALS): Bn {
        return WrappedBn.convertToBn(this, outDecimals);
    }

    toString(base?: number | 'hex', length?: number): string {
        return WrappedBn.convertToString(this, base, length);
    }

    add(wbn: WrappedBn): void {
        this._bn = WrappedBn.add(this, wbn)._bn;
    }

    sub(wbn: WrappedBn): void {
        this._bn = WrappedBn.sub(this, wbn)._bn;
    }

    mul(wbn: WrappedBn): void {
        this._bn = WrappedBn.mul(this, wbn)._bn;
    }

    div(wbn: WrappedBn): void {
        this._bn = WrappedBn.div(this, wbn)._bn;
    }

    divRound(wbn: WrappedBn): void {
        this._bn = WrappedBn.divRound(this, wbn)._bn;
    }

    mod(wbn: WrappedBn): void {
        this._bn = WrappedBn.mod(this, wbn)._bn;
    }

    floor(): void {
        this._bn = WrappedBn.floor(this)._bn;
    }

    ceil(): void {
        this._bn = WrappedBn.ceil(this)._bn;
    }

    round(this: WrappedBn): void {
        this._bn = WrappedBn.round(this)._bn;
    }

    format(nbOfFraction: number = 2, decimalSeparator: string = ',', pointSymbol: string = '.'): string {
        return WrappedBn.format(this, nbOfFraction, decimalSeparator, pointSymbol);
    }

    eq(wbn: WrappedBn) {
        return this._bn.eq(wbn._bn);
    }

    gt(wbn: WrappedBn) {
        return this._bn.gt(wbn._bn);
    }

    gte(wbn: WrappedBn) {
        return this._bn.gte(wbn._bn);
    }

    lt(wbn: WrappedBn) {
        return this._bn.lt(wbn._bn);
    }

    lte(wbn: WrappedBn) {
        return this._bn.lte(wbn._bn);
    }

    eqz() {
        return this.eq(WrappedBn.ZERO);
    }

    gtz() {
        return this.gt(WrappedBn.ZERO);
    }

    gtez() {
        return this.gte(WrappedBn.ZERO);
    }

    ltz() {
        return this.lt(WrappedBn.ZERO);
    }

    ltez() {
        return this.lte(WrappedBn.ZERO);
    }
}

export default WrappedBn;
