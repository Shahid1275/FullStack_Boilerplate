/**
 * Forbidden Exception
 * Thrown for authorization failures (403)
 */

const BaseException = require('./BaseException');

class ForbiddenException extends BaseException {
  constructor(message = 'Access forbidden') {
    super(message, 403, true);
  }
}

module.exports = ForbiddenException;
