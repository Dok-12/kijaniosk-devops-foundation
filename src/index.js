'use strict';

function calculateTotal(amount, fee = 0) {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new TypeError('amount must be a non-negative finite number');
  }

  if (!Number.isFinite(fee) || fee < 0) {
    throw new TypeError('fee must be a non-negative finite number');
  }

  return Math.round((amount + fee) * 100) / 100;
}

module.exports = { calculateTotal };

function deliberateLintFault( {
