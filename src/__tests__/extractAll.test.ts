import { FifoLogger } from 'fifo-logger';
import { expect, test } from 'vitest';

import { extractAll } from '..';

test('validate-cas-number', () => {
  const logger = new FifoLogger();

  expect(extractAll('')).toStrictEqual([]);
  expect(extractAll('40-00-0')).toStrictEqual([]);
  expect(extractAll('50-00-0')).toStrictEqual(['50-00-0']);
  expect(extractAll('[50-00-0]')).toStrictEqual(['50-00-0']);
  expect(extractAll('50-00-0, 1234')).toStrictEqual(['50-00-0']);
  expect(extractAll('1234, 50-00-0, 1234')).toStrictEqual(['50-00-0']);
  expect(extractAll('5000-00-0')).toStrictEqual(['5000-00-0']);
  expect(extractAll('5000-01-1')).toStrictEqual(['5000-01-1']);
  expect(extractAll('5000-00-0,5000-01-1')).toStrictEqual([
    '5000-00-0',
    '5000-01-1',
  ]);
  expect(extractAll('5000-01-1, [5000-01-2]', { logger })).toStrictEqual([
    '5000-01-1',
  ]);

  const logs = logger.getLogs();

  expect(logs).toHaveLength(1);
  expect(logs[0].message).toBe(
    'Invalid CAS number: 5000-01-2, the check digit does not match. Expected: 1 but got: 2.',
  );

  expect(extractAll('5000-01-2')).toStrictEqual([]);
});
