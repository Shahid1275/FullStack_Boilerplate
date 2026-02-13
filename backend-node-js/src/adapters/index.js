/**
 * Adapters Index
 * External service adapters aggregator
 */

const PaymentAdapter = require('./payment.adapter');
const StorageAdapter = require('./storage.adapter');
const EmailAdapter = require('./email.adapter');

module.exports = {
  PaymentAdapter,
  StorageAdapter,
  EmailAdapter
};
