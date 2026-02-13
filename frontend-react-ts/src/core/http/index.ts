/**
 * HTTP Core Module
 * Core HTTP logic independent of specific HTTP library
 */

class HttpCore {
  private readonly baseURL: string;
  private readonly timeout: number;
  private readonly defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    this.timeout = 30000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Build URL with query parameters
   */
  buildUrl(endpoint: string, params: Record<string, any> = {}): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    return url.toString();
  }

  /**
   * Parse error response
   */
  parseError(error: any): { message: string; status: number; data?: any } {
    if (error.response) {
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    }
    
    if (error.request) {
      return {
        message: 'No response from server',
        status: 0,
      };
    }
    
    return {
      message: error.message || 'An error occurred',
      status: 0,
    };
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  getTimeout(): number {
    return this.timeout;
  }

  getDefaultHeaders(): Record<string, string> {
    return { ...this.defaultHeaders };
  }
}

export default new HttpCore();
