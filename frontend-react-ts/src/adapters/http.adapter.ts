/**
 * HTTP Adapter - Abstraction over HTTP client
 * Makes it easy to swap axios with fetch or any other library
 */

import apiClient from '@/api/client';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpAdapter {
  /**
   * GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await apiClient.get<T>(url, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await apiClient.post<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await apiClient.put<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await apiClient.delete<T>(url, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await apiClient.patch<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle errors uniformly
   */
  private handleError(error: any): Error {
    // Can integrate with error tracking service here
    return error;
  }
}

export default new HttpAdapter();
