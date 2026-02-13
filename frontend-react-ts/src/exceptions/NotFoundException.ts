/**
 * Not Found Exception
 * Thrown when a resource is not found (404)
 */

import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, true);
  }
}

export default NotFoundException;
