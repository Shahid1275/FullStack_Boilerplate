/**
 * Network Exception
 * Thrown when network requests fail
 */

import { BaseException } from './BaseException';

export class NetworkException extends BaseException {
  constructor(message: string = 'Network request failed') {
    super(message, 0, true);
  }
}

export default NetworkException;
