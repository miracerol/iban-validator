# IBAN Validator

A lightweight and efficient JavaScript library for validating International Bank Account Numbers (IBAN). This validator implements the standard IBAN validation algorithm including check digit verification and country-specific format validation.

## Features

- ✅ Validate IBAN numbers
- 🌍 Get country code from IBAN
- 📝 Format IBAN for better readability
- 0️⃣ Zero dependencies
- ✨ Simple and easy to use

## Installation

```bash
npm install iban-validator
```

## Usage

```javascript
const IBANValidator = require('iban-validator');

// Validate an IBAN
console.log(IBANValidator.validate('DE89 3704 0044 0532 0130 00')); // true
console.log(IBANValidator.validate('INVALID')); // false

// Format an IBAN
console.log(IBANValidator.format('DE89370400440532013000'));
// Output: 'DE89 3704 0044 0532 0130 00'

// Get country code
console.log(IBANValidator.getCountryCode('DE89370400440532013000')); // 'DE'
```

## API Reference

### `validate(iban: string): boolean`

Validates an IBAN number. Returns `true` if the IBAN is valid, `false` otherwise.

- Removes spaces and converts to uppercase
- Checks country-specific format
- Validates check digits using MOD-97 algorithm

### `format(iban: string): string`

Formats an IBAN by adding spaces every 4 characters for better readability.

### `getCountryCode(iban: string): string | null`

Extracts and returns the country code from an IBAN. Returns `null` if the IBAN is invalid or too short.

## Testing

Run the test suite:

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

Need a valid IBAN for testing? Use [Random IBAN Generator](https://randomlyiban.com). 