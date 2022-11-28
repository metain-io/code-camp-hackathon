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
