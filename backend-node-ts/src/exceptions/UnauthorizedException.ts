/**
 * Unauthorized Exception - 401 errors
 */

import { BaseException } from './BaseException';
import { HttpStatus } from '../enums/HttpStatus';

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'Unauthorized access', details?: any) {
    super(message, HttpStatus.UNAUTHORIZED, true, details);
  }
}
