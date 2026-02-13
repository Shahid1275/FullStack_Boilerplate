/**
 * Authentication API Endpoints
 */

import apiClient from '../client';

export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  
  register: (userData) => apiClient.post('/auth/register', userData),
  
  logout: () => apiClient.post('/auth/logout'),
  
  getCurrentUser: () => apiClient.get('/auth/me'),
  
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, password) => 
    apiClient.put(`/auth/reset-password/${token}`, { password }),
  
  refreshToken: () => apiClient.post('/auth/refresh'),
};
