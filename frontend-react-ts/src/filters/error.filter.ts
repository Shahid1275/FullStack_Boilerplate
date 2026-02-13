/**
 * Error Filter
 * Global error handling and filtering
 */

import { BaseException } from '../exceptions';

export class ErrorFilter {
  /**
   * Filter and format errors
   */
  static filter(error: any): {
    message: string;
    statusCode: number;
    details?: any;
  } {
    // Handle custom exceptions
    if (error instanceof BaseException) {
      return {
        message: error.message,
        statusCode: error.statusCode,
        details: error.toJSON()
      };
    }

    // Handle network errors
    if (error.name === 'NetworkError' || error.message.includes('Network')) {
      return {
        message: 'Network error. Please check your connection.',
        statusCode: 0
      };
    }

    // Handle API errors
    if (error.response) {
      return {
        message: error.response.data?.message || 'An error occurred',
        statusCode: error.response.status,
        details: error.response.data
      };
    }

    // Handle unknown errors
    return {
      message: error.message || 'An unexpected error occurred',
      statusCode: 500
    };
  }

  /**
   * Check if error is operational
   */
  static isOperational(error: any): boolean {
    if (error instanceof BaseException) {
      return error.isOperational;
    }
    return false;
  }

  /**
   * Log error
   */
  static log(error: any): void {
    const filtered = this.filter(error);
    console.error('[ErrorFilter]', filtered);
  }
}

export default ErrorFilter;
