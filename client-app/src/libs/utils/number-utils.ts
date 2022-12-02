export function formatNumber(
    number: number,
    numberOfFraction: number = 2,
    decimalSeparator: string = ',',
    pointSymbol: string = '.',
    keepFractionZero = false,
): string {
    if (number === undefined || number === null || isNaN(number)) return number + '';

    const strNumber = Math.abs(number)?.toString();

    const [div, mod] = strNumber.split('.');

    const divStr = div
        .split('')
        .reverse()
        .map((digit, index) => (index != 0 && index % 3 === 0 ? `${digit}${decimalSeparator}` : digit))
        .reverse()
        .join('');

    let modStr = mod ? mod.substring(0, numberOfFraction).padEnd(numberOfFraction, '0') : undefined;

    if (!keepFractionZero) {
        modStr = modStr ? modStr.replace(/0+$/g, '') : modStr;
    }

    return `${number < 0 ? '-' : ''}${divStr}${modStr ? pointSymbol + modStr : ''}`;
}

export function numberToFixedString(x: number): string {
    let result = x + '';
    if (Math.abs(x) < 1.0) {
        let e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            result = '0.' + new Array(e).join('0') + x.toString().substring(2);
        }
    } else {
        let e = parseInt(x.toString().split('+')[1]);
        if (e > 19) {
            e -= 19;
            x /= Math.pow(10, e);
            result = x + new Array(e + 1).join('0');
        }
    }
    return result;
}
