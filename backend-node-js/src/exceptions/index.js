/**
 * Exceptions Index
 * Custom exception classes aggregator
 */

const BaseException = require('./BaseException');
const NotFoundException = require('./NotFoundException');
const UnauthorizedException = require('./UnauthorizedException');
const ForbiddenException = require('./ForbiddenException');

module.exports = {
  BaseException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException
};
