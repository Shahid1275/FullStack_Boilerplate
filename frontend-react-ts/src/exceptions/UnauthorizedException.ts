/**
 * Unauthorized Exception
 * Thrown when authentication fails (401)
 */

import { BaseException } from './BaseException';

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401, true);
  }
}

export default UnauthorizedException;
