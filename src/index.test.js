const IBANValidator = require('./index');

describe('IBANValidator', () => {
  describe('validate', () => {
    test('should validate correct IBANs', () => {
      expect(IBANValidator.validate('DE89370400440532013000')).toBe(true);
      expect(IBANValidator.validate('GB82WEST12345698765432')).toBe(true);
      expect(IBANValidator.validate('TR330006100519786457841326')).toBe(true);
    });

    test('should validate IBANs with spaces', () => {
      expect(IBANValidator.validate('DE89 3704 0044 0532 0130 00')).toBe(true);
      expect(IBANValidator.validate('GB82 WEST 1234 5698 7654 32')).toBe(true);
    });

    test('should reject invalid IBANs', () => {
      expect(IBANValidator.validate('DE89370400440532013001')).toBe(false);
      expect(IBANValidator.validate('INVALIDIBAN')).toBe(false);
      expect(IBANValidator.validate('')).toBe(false);
      expect(IBANValidator.validate(null)).toBe(false);
    });
  });

  describe('format', () => {
    test('should format IBANs with spaces every 4 characters', () => {
      expect(IBANValidator.format('DE89370400440532013000'))
        .toBe('DE89 3704 0044 0532 0130 00');
      expect(IBANValidator.format('GB82WEST12345698765432'))
        .toBe('GB82 WEST 1234 5698 7654 32');
    });

    test('should handle empty or invalid input', () => {
      expect(IBANValidator.format('')).toBe('');
      expect(IBANValidator.format(null)).toBe('');
    });
  });

  describe('getCountryCode', () => {
    test('should return country code from IBAN', () => {
      expect(IBANValidator.getCountryCode('DE89370400440532013000')).toBe('DE');
      expect(IBANValidator.getCountryCode('GB82WEST12345698765432')).toBe('GB');
    });

    test('should handle invalid input', () => {
      expect(IBANValidator.getCountryCode('')).toBe(null);
      expect(IBANValidator.getCountryCode('D')).toBe(null);
      expect(IBANValidator.getCountryCode(null)).toBe(null);
    });
  });
}); 