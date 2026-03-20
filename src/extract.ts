import type { CheckOptions } from './CheckOptions.ts';
import { check } from './check.ts';

/**
 * Extracts the first valid CAS number from a string.
 * A CAS number has the format XXXXXXXX-XX-X where X is a digit.
 * @param string - The input string to search for a CAS number.
 * @param options - Options for validation, including an optional logger.
 * @returns The first valid CAS number found, or `null` if none is found.
 */
export function extract(string: string, options: CheckOptions = {}) {
  const cas = string.match(/[0-9]{2,8}-[0-9]{2}-[0-9]/)?.[0];
  if (!cas) return null;

  if (check(cas, options)) return cas;
  return null;
}
