/**
 * IBAN Validator
 * A comprehensive validator for International Bank Account Numbers (IBAN)
 * Based on ISO 13616 standard with proper mod-97 calculation
 */

class IBANValidator {
  /**
   * Country-specific IBAN lengths
   * @private
   */
  static #countryLengths = {
    'AD': 24, 'AE': 23, 'AL': 28, 'AT': 20, 'AZ': 28,
    'BA': 20, 'BE': 16, 'BG': 22, 'BH': 22, 'BR': 29,
    'BY': 28, 'CH': 21, 'CR': 22, 'CY': 28, 'CZ': 24,
    'DE': 22, 'DK': 18, 'DO': 28, 'EE': 20, 'EG': 29,
    'ES': 24, 'FI': 18, 'FO': 18, 'FR': 27, 'GB': 22,
    'GE': 22, 'GI': 23, 'GL': 18, 'GR': 27, 'GT': 28,
    'HR': 21, 'HU': 28, 'IE': 22, 'IL': 23, 'IS': 26,
    'IT': 27, 'JO': 30, 'KW': 30, 'KZ': 20, 'LB': 28,
    'LC': 32, 'LI': 21, 'LT': 20, 'LU': 20, 'LV': 21,
    'MC': 27, 'MD': 24, 'ME': 22, 'MK': 19, 'MR': 27,
    'MT': 31, 'MU': 30, 'NL': 18, 'NO': 15, 'PK': 24,
    'PL': 28, 'PS': 29, 'PT': 25, 'QA': 29, 'RO': 24,
    'RS': 22, 'SA': 24, 'SE': 24, 'SI': 19, 'SK': 24,
    'SM': 27, 'TN': 24, 'TR': 26, 'UA': 29, 'VG': 24,
    'XK': 20
  };

  /**
   * Prepare IBAN for mod-97 calculation by moving first 4 chars to end 
   * and converting letters to numbers (A=10, B=11, ..., Z=35)
   * @param {string} iban - The IBAN to prepare
   * @returns {string} - The prepared IBAN for calculation
   * @private
   */
  static #prepareIban(iban) {
    // Move first 4 characters to the end
    const rearranged = iban.slice(4) + iban.slice(0, 4);
    
    // Convert letters to numbers: A=10, B=11, ..., Z=35
    return rearranged.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) { // A-Z
        return (code - 55).toString(); // A=10, B=11, etc.
      }
      return char; // Numbers remain as is
    }).join('');
  }

  /**
   * Calculate mod-97 for large numbers using iterative method
   * This prevents integer overflow for very long IBAN numbers
   * @param {string} numericString - The numeric string to calculate mod-97 for
   * @returns {number} - The remainder when divided by 97
   * @private
   */
  static #mod97(numericString) {
    let remainder = 0;
    
    // Process each digit to avoid integer overflow
    for (let i = 0; i < numericString.length; i++) {
      remainder = (remainder * 10 + parseInt(numericString[i])) % 97;
    }
    
    return remainder;
  }

  /**
   * Validates an IBAN number according to ISO 13616
   * @param {string} iban - The IBAN to validate
   * @returns {boolean} - True if the IBAN is valid, false otherwise
   */
  static validate(iban) {
    if (!iban || typeof iban !== 'string') {
      return false;
    }

    // Step 1: Remove spaces and convert to uppercase
    const cleanIban = iban.replace(/\s+/g, '').toUpperCase();

    // Step 2: Basic format check - must start with 2 letters followed by 2 digits
    if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleanIban)) {
      return false;
    }

    // Step 3: Country code validation and length check
    const countryCode = cleanIban.substring(0, 2);
    const expectedLength = this.#countryLengths[countryCode];
    
    if (!expectedLength) {
      return false; // Invalid country code
    }
    
    if (cleanIban.length !== expectedLength) {
      return false; // Invalid length for country
    }

    // Step 4: Prepare IBAN for mod-97 calculation
    const preparedIban = this.#prepareIban(cleanIban);

    // Step 5: Calculate mod-97
    const remainder = this.#mod97(preparedIban);

    // Step 6: Valid IBAN if remainder equals 1
    return remainder === 1;
  }

  /**
   * Validates an IBAN number (alias for validate method)
   * @param {string} iban - The IBAN to validate
   * @returns {boolean} - True if the IBAN is valid, false otherwise
   */
  static isValid(iban) {
    return this.validate(iban);
  }

  /**
   * Returns the country code from an IBAN
   * @param {string} iban - The IBAN
   * @returns {string|null} - The country code or null if invalid format
   */
  static getCountryCode(iban) {
    if (!iban || typeof iban !== 'string' || iban.length < 2) {
      return null;
    }
    const cleanIban = iban.replace(/\s+/g, '').toUpperCase();
    return cleanIban.slice(0, 2);
  }

  /**
   * Formats an IBAN with spaces for better readability
   * @param {string} iban - The IBAN to format
   * @returns {string} - The formatted IBAN
   */
  static format(iban) {
    if (!iban || typeof iban !== 'string') {
      return '';
    }
    const cleanIban = iban.replace(/\s+/g, '').toUpperCase();
    return cleanIban.match(/.{1,4}/g)?.join(' ') || cleanIban;
  }
}

// Browser uyumluluğu için window nesnesine export et
if (typeof window !== 'undefined') {
  window.IBANValidator = IBANValidator;
}

// Node.js uyumluluğu için module.exports
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IBANValidator;
} 