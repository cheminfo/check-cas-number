import type { CheckOptions } from './CheckOptions.js';

/**
 * Checks if a CAS number is valid.
 * A CAS number has the format XXXXXXXX-XX-X where X is a digit. The string can only contain the CAS number.
 * @param cas
 * @param options
 * @returns
 */
export function check(cas: string, options: CheckOptions = {}) {
  const { logger } = options;

  if (!cas?.match(/[0-9]{2,8}-[0-9]{2}-[0-9]/)) {
    logger?.error(
      `Invalid CAS number: ${cas}, the format does not match: XXXXXXXX-XX-X.`,
    );
    return false;
  }

  let sum = 0;
  const digits = cas.replaceAll('-', '');

  for (let i = digits.length - 2; i >= 0; i--) {
    // @ts-expect-error we are sure that digits[i] exists
    sum = sum + Number.parseInt(digits[i], 10) * (digits.length - i - 1);
  }

  // is it larger than 50000 ?
  if (Number.parseInt(cas.replaceAll('-', ''), 10) < 50000) {
    logger?.error(
      `Invalid CAS number: ${cas}, the number is smaller than 50-00-0.`,
    );
    return false;
  }

  // does the checkdigit match ?
  const checkDigit = sum % 10;
  if (checkDigit !== Number.parseInt(cas.slice(-1), 10)) {
    logger?.error(
      `Invalid CAS number: ${cas}, the check digit does not match. Expected: ${
        checkDigit
      } but got: ${cas.slice(-1)}.`,
    );
    return false;
  }
  return true;
}
