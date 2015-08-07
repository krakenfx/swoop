let iban = {errors: {}};

function isIbanValid(iban) {

    if (typeof iban != 'string') {
        return false;
    }

    iban = iban.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let prepared = iso13616Prepare(`${iban}`);
    return iso7064Mod97_10(prepared) === 1;

}

/**
 * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
 * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
 *
 * @param {string} iban the IBAN
 * @returns {string} the prepared IBAN
 */
function iso13616Prepare(iban) {
    var A = 'A'.charCodeAt(0),
    Z = 'Z'.charCodeAt(0);

    iban = iban.toUpperCase();
    iban = iban.substr(4) + iban.substr(0,4);

    return iban.split('').map(function(n){
        var code = n.charCodeAt(0);
        if (code >= A && code <= Z){
            // A = 10, B = 11, ... Z = 35
            return code - A + 10;
        } else {
            return n;
        }
    }).join('');
}

/**
 * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
 *
 * @param iban
 * @returns {number}
 */
function iso7064Mod97_10(iban) {
    var remainder = iban,
    block;

    while (remainder.length > 2){
        block = remainder.slice(0, 9);
        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
    }

    return parseInt(remainder, 10) % 97;
}

iban.isIbanValid = isIbanValid;

export default iban;
