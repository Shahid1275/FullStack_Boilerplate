/**
 * HTTP Adapter - Abstraction over HTTP client
 * Makes it easy to swap axios with fetch or any other library
 */

import apiClient from '@/api/client';

class HttpAdapter {
  /**
   * GET request
   */
  async get(url, config = {}) {
    try {
      return await apiClient.get(url, config);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST request
   */
  async post(url, data, config = {}) {
    try {
      return await apiClient.post(url, data, config);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * PUT request
   */
  async put(url, data, config = {}) {
    try {
      return await apiClient.put(url, data, config);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * DELETE request
   */
  async delete(url, config = {}) {
    try {
      return await apiClient.delete(url, config);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * PATCH request
   */
  async patch(url, data, config = {}) {
    try {
      return await apiClient.patch(url, data, config);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle errors uniformly
   */
  handleError(error) {
    // Can integrate with error tracking service here
    throw error;
  }
}

export default new HttpAdapter();
