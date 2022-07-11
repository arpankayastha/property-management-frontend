/**
 * FORMAT NUMBER INTO A NUMBER SHOWING THOUSANDS (K) OR MILLIONS (M)
 * @param {*} num 
 * @param {string} prefix 
 */
export const kmFormatter = (value, prefix = '') => {
    let formattedNum = parseFloat(value.toString().replace(/[^\d.-]/g, ''));

    if (Math.abs(value) > 9999) {
        formattedNum = Math.sign(value) * ((Math.abs(value) / 1000).toFixed(0)) + 'k';
    }

    if (Math.abs(value) > 999999) {
        formattedNum = Math.sign(value) * ((Math.abs(value) / 1000000).toFixed(1)) + 'm';
    }

    formattedNum = formattedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    formattedNum = prefix + formattedNum;
    return formattedNum;
}

/**
 * FORMATS TEXT INTO A CURRENCY FORMAT WITH PREFIX, RETURNS NEGATIVE VALUES IN PARENTHESES, NO CENTS SUPPORT
 * @param {string} value
 * @param {string} prefix   // currency prefix
 * @param {boolean} isAbs   // should return absolute value
 */
export const currencyFormatter = (value, prefix = '$', isAbs = false, isStatic = true) => {
    let stringValue = value.toString();

    // Remove last character if more than 2 decimals
    if (value.toString().split('.').length - 1 && stringValue.length - stringValue.indexOf('.') > 3) {
        stringValue = stringValue.slice(0, -1);
    }

    let valueFloat = parseFloat(stringValue.replace(/[^\d.-]/g, '')).toFixed(2);
    let valueAbs = Math.abs(valueFloat);

    // Add decimals if number is static
    if (isStatic) {
        valueAbs = valueAbs.toFixed(2);
    }

    if (isNaN(valueAbs)) return null;

    let string = prefix + valueAbs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Add decimal dot
    let addDot = stringValue.split('.').length - 1 === 1 && stringValue.indexOf('.') === stringValue.length - 1;

    if (addDot) {
        string += '.';
    }

    if (!isAbs && valueFloat < 0) {
        string = '–' + string;
    }
    return string;
}


/**
 * FORMATS TEXT INTO A PHONE NUMBER FORMAT
 * @param {*} value 
 */
export const phoneNumberFormatter = (value) => {
    let split = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    return !split[2] ? split[1] : '(' + split[1] + ') ' + split[2] + (split[3] ? '-' + split[3] : '');
}


export function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      // you can also use substr instead of substring
      string = string.substring(0, limit) + dots;
    }
    return string;
  }