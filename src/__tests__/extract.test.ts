import { expect, test } from 'vitest';

import { extract } from '../index.js';

test('validate-cas-number', () => {
  expect(extract('')).toBeNull();
  expect(extract('40-00-0')).toBeNull();
  expect(extract('50-00-0')).toBe('50-00-0');
  expect(extract('[50-00-0]')).toBe('50-00-0');
  expect(extract('50-00-0, 1234')).toBe('50-00-0');
  expect(extract('1234, 50-00-0, 1234')).toBe('50-00-0');
  expect(extract('5000-00-0')).toBe('5000-00-0');
  expect(extract('5000-01-1')).toBe('5000-01-1');
  expect(extract('5000-01-2')).toBeNull();
});
