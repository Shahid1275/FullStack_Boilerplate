/**
 * Unauthorized Exception
 * Thrown for authentication failures (401)
 */

const BaseException = require('./BaseException');

class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized access') {
    super(message, 401, true);
  }
}

module.exports = UnauthorizedException;
