/**
 * HTTP Core Module
 * Core HTTP logic independent of specific HTTP library
 */

class HttpCore {
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
  buildUrl(endpoint, params = {}) {
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
  parseError(error) {
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
}

export default new HttpCore();
