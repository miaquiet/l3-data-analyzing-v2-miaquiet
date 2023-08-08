import { beforeEach, test, expect } from '@jest/globals';

import { execFileSync } from 'child_process';
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let rows1;
let rows2;

beforeEach(() => {
  const options = { encoding: 'utf8', cwd: path.join(__dirname, '..') };

  const result1 = execFileSync(
    'bin/money.js',
    ['__fixtures__/currencies1.csv'],
    options,
  );
  rows1 = result1.trim().split('\n')

  const result2 = execFileSync(
    'bin/money.js',
    ['__fixtures__/currencies2.csv'],
    options,
  );
  rows2 = result2.trim().split('\n')
});

test('step1', () => {
  expect(rows1[0]).toEqual('Count: 31');
  expect(rows2[0]).toEqual('Count: 40');
});

test('step2', () => {
  expect(rows1[1]).toEqual('Currency codes: AMD, AUD, AZN, BGN, BRL, BYN, CHF, CZK, DKK, EUR, GBP, HKD, HUF, JPY, KRW, SEK, USD, ZAR');
  expect(rows2[1]).toEqual('Currency codes: AMD, AUD, AZN, BGN, BRL, BYN, CAD, CHF, CZK, DKK, EUR, GBP, HKD, HUF, INR, JPY, KGS, KRW, KZT, MDL, SEK, TMT, USD, ZAR');
});

test('step3', () => {
  expect(rows1[2]).toEqual('Cost of currency: Min: 0.0595924, Max: 95.8018');
  expect(rows2[2]).toEqual('Cost of currency: Min: 0.0603052, Max: 97.6482');
});

test('step4', () => {
  expect(rows1[3]).toEqual(`Count currency between 10 and 30: 5`);
  expect(rows2[3]).toEqual('Count currency between 10 and 30: 6');
});

test('step5', () => {
  expect(rows1[4]).toEqual('Arithmetic mean for USD, EUR, CHF is 75');
  expect(rows2[4]).toEqual('Arithmetic mean for USD, EUR, CHF is 76');
});
