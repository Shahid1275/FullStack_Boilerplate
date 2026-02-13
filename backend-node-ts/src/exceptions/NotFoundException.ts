/**
 * Not Found Exception - 404 errors
 */

import { BaseException } from './BaseException';
import { HttpStatus } from '../enums/HttpStatus';

export class NotFoundException extends BaseException {
  constructor(resource: string = 'Resource', details?: any) {
    super(`${resource} not found`, HttpStatus.NOT_FOUND, true, details);
  }
}
