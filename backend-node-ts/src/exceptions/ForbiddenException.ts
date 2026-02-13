/**
 * Forbidden Exception - 403 errors
 */

import { BaseException } from './BaseException';
import { HttpStatus } from '../enums/HttpStatus';

export class ForbiddenException extends BaseException {
  constructor(message: string = 'Forbidden - insufficient permissions', details?: any) {
    super(message, HttpStatus.FORBIDDEN, true, details);
  }
}
