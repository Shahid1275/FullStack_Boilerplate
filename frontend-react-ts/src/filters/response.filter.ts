/**
 * Response Filter
 * Filter and transform API responses
 */

export class ResponseFilter {
  /**
   * Transform success response
   */
  static success<T>(data: T, message: string = 'Success'): {
    success: true;
    data: T;
    message: string;
    timestamp: string;
  } {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Transform error response
   */
  static error(
    message: string,
    errors: string[] = [],
    statusCode: number = 400
  ): {
    success: false;
    message: string;
    errors: string[];
    statusCode: number;
    timestamp: string;
  } {
    return {
      success: false,
      message,
      errors,
      statusCode,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Extract data from API response
   */
  static extractData<T>(response: any): T {
    return response.data?.data || response.data || response;
  }

  /**
   * Check if response is successful
   */
  static isSuccess(response: any): boolean {
    return response.success === true || response.status === 200;
  }
}

export default ResponseFilter;
