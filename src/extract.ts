import type { CheckOptions } from './CheckOptions';
import { check } from './check';

/**
 * This method extracts the first CAS number from a string. A cas number is something
 * defined as matching the regex [0-9]{2,8}-[0-9]{2}-[0-9].
 * It returns the CAS number if found, or null otherwise.
 * A CAS number has the format XXXXXXXX-XX-X where X is a digit.
 * @param string
 * @param options
 * @returns
 */
export function extract(string: string, options: CheckOptions = {}) {
  const cas = string.match(/[0-9]{2,8}-[0-9]{2}-[0-9]/)?.[0];
  if (!cas) return null;

  if (check(cas, options)) return cas;
  return null;
}
