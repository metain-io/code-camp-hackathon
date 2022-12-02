/**
 * * format2ShortId
 * Convert long id string to short id format
 * Example: 4x04755adeeb35be235b2835dffd32211 -> 4x04755...221
 *
 * @param id
 * @param firstCharacterQty
 * @param lastCharacterQty
 * @returns
 */
export function format2ShortId(str: string, firstCharacterQty: number = 3, lastCharacterQty: number = 3) {
    if (!str) {
        return '';
    }
    let calculatedFirstCharacterQty = firstCharacterQty;
    let calculatedLastCharacterQty = str.length - lastCharacterQty;
    let moreCharater = '...';

    if (firstCharacterQty + lastCharacterQty >= str.length) {
        calculatedFirstCharacterQty = str.length;
        calculatedLastCharacterQty = str.length;
        moreCharater = '';
    }

    return `${str.substring(0, calculatedFirstCharacterQty)}${moreCharater}${str.substring(
        calculatedLastCharacterQty,
        str.length,
    )}`;
}

/**
 * formatHintEmail
 * Convert email to hint formation
 * Example: johndoe@gmail.com -> j*****@***.com
 *
 * @param str
 * @param placeholder
 * @returns
 */
export function formatHintEmail(str?: string, placeholder: string = '*') {
    if (!str) return str;
    const lastIndexOfDotCharacter = str.lastIndexOf('.') > 0 ? str.lastIndexOf('.') : str.length - 4;
    return `${str.substring(0, 1)}*****@***${str.substring(lastIndexOfDotCharacter, str.length)}`;
}

/**
 * formatString
 * Example:
 * formatString("Hello world {word} {target}!", {word: "from", target: "Metain"})
 * Result => "Hello world from Metain!"
 *
 * @param str
 * @param params
 * @returns
 */
export function formatString(str: string, params: object) {
    if (arguments.length > 1) {
        let key;
        let args = arguments[1];

        for (key in args) {
            str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key] ?? '');
        }
    }

    return str;
}
