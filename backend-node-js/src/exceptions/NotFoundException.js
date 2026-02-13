/**
 * Not Found Exception
 * Thrown when resource is not found (404)
 */

const BaseException = require('./BaseException');

class NotFoundException extends BaseException {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, true);
  }
}

module.exports = NotFoundException;
