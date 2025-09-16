import { FifoLogger } from 'fifo-logger';
import { expect, test } from 'vitest';

import { check } from '..';

test('check if the string is a cas number', () => {
  expect(check('')).toBe(false);
  expect(check('40-00-0')).toBe(false);
  expect(check('50-00-0')).toBe(true);
  expect(check('5000-00-0')).toBe(true);
  expect(check('5000-01-1')).toBe(true);
  expect(check('5000-01-2')).toBe(false);
});

test('check-cas-number with logger', () => {
  const logger = new FifoLogger();
  let result = check('', { logger });

  expect(result).toBe(false);
  expect(logger.getLogs()).toMatchObject([
    {
      level: 50,
      levelLabel: 'error',
      message:
        'Invalid CAS number: , the format does not match: XXXXXXXX-XX-X.',
    },
  ]);

  logger.clear();
  result = check('50-00-0', { logger });

  expect(result).toBe(true);
  expect(logger.getLogs()).toMatchObject([]);

  logger.clear();
  result = check('50-00-1', { logger });

  expect(result).toBe(false);
  expect(logger.getLogs()).toMatchObject([
    {
      level: 50,
      levelLabel: 'error',
      message:
        'Invalid CAS number: 50-00-1, the check digit does not match. Expected: 0 but got: 1.',
    },
  ]);

  logger.clear();
  result = check('40-00-0', { logger });

  expect(result).toBe(false);
  expect(logger.getLogs()).toMatchObject([
    {
      level: 50,
      levelLabel: 'error',
      message:
        'Invalid CAS number: 40-00-0, the number is smaller than 50-00-0.',
    },
  ]);
});
