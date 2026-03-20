import type { CheckOptions } from './CheckOptions.ts';
import { check } from './check.ts';

/**
 * Extracts all valid CAS numbers from a string.
 * A CAS number has the format XXXXXXXX-XX-X where X is a digit.
 * @param string - The input string to search for CAS numbers.
 * @param options - Options for validation, including an optional logger.
 * @returns An array of all valid CAS numbers found.
 */
export function extractAll(string: string, options: CheckOptions = {}) {
  const cas = [...string.matchAll(/[0-9]{2,8}-[0-9]{2}-[0-9]/g)];
  return cas.filter((item) => check(item[0], options)).map((item) => item[0]);
}
