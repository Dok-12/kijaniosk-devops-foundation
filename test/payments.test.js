'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateTotal } = require('../src');

test('calculates a payment total without a fee', () => {
  assert.equal(calculateTotal(100), 100);
});

test('adds a payment fee', () => {
  assert.equal(calculateTotal(100, 2.5), 102.5);
});

test('rounds the total to two decimal places', () => {
  assert.equal(calculateTotal(10.105, 0), 10.11);
});

test('rejects negative amounts', () => {
  assert.throws(() => calculateTotal(-1), TypeError);
});

test('rejects invalid fees', () => {
  assert.throws(() => calculateTotal(10, Number.NaN), TypeError);
});
