import parsePhoneNumberFromString from 'libphonenumber-js';

export default function sanitizePhone(value) {
  /**
   * Parse phone number from a string
   */
  const phoneNumber = parsePhoneNumberFromString(value, 'BR');

  return phoneNumber.number.toString().replace('+', '');
}
