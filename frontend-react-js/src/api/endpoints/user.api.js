/**
 * User API Endpoints
 */

import apiClient from '../client';

export const userAPI = {
  getAll: (params) => apiClient.get('/users', { params }),
  
  getById: (id) => apiClient.get(`/users/${id}`),
  
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  
  delete: (id) => apiClient.delete(`/users/${id}`),
  
  updateProfile: (data) => apiClient.put('/users/profile', data),
  
  uploadAvatar: (formData) => 
    apiClient.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};
