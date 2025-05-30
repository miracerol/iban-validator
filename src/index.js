/**
 * IBAN Validator
 * A simple validator for International Bank Account Numbers (IBAN)
 */

class IBANValidator {
  /**
   * Validates an IBAN number
   * @param {string} iban - The IBAN to validate
   * @returns {boolean} - True if the IBAN is valid, false otherwise
   */
  static validate(iban) {
    if (!iban) return false;

    // Remove spaces and convert to uppercase
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();

    // Basic format check
    if (!/^[A-Z]{2}[0-9A-Z]{2,34}$/.test(cleanIban)) {
      return false;
    }

    // Move first 4 characters to the end
    const rearrangedIban = cleanIban.slice(4) + cleanIban.slice(0, 4);

    // Convert letters to numbers (A=10, B=11, etc.)
    const numericIban = rearrangedIban.split('')
      .map(char => {
        if (/[0-9]/.test(char)) return char;
        return (char.charCodeAt(0) - 55).toString();
      })
      .join('');

    // Perform mod-97 operation
    let remainder = 0;
    for (let i = 0; i < numericIban.length; i++) {
      remainder = (remainder * 10 + parseInt(numericIban[i])) % 97;
    }

    return remainder === 1;
  }

  /**
   * Returns the country code from an IBAN
   * @param {string} iban - The IBAN
   * @returns {string|null} - The country code or null if invalid format
   */
  static getCountryCode(iban) {
    if (!iban || iban.length < 2) return null;
    return iban.slice(0, 2).toUpperCase();
  }

  /**
   * Formats an IBAN with spaces for better readability
   * @param {string} iban - The IBAN to format
   * @returns {string} - The formatted IBAN
   */
  static format(iban) {
    if (!iban) return '';
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    return cleanIban.match(/.{1,4}/g)?.join(' ') || cleanIban;
  }
}

module.exports = IBANValidator; 