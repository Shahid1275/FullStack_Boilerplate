/**
 * User API Endpoints (TypeScript)
 */

import apiClient from '../client';
import { User, PaginatedResponse, UserUpdateData } from '@/types';

interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export const userAPI = {
  getAll: (params?: UserQueryParams): Promise<PaginatedResponse<User>> => 
    apiClient.get('/users', { params }),
  
  getById: (id: string): Promise<User> => 
    apiClient.get(`/users/${id}`),
  
  update: (id: string, data: UserUpdateData): Promise<User> => 
    apiClient.put(`/users/${id}`, data),
  
  delete: (id: string): Promise<void> => 
    apiClient.delete(`/users/${id}`),
  
  updateProfile: (data: UserUpdateData): Promise<User> => 
    apiClient.put('/users/profile', data),
  
  uploadAvatar: (formData: FormData): Promise<{ url: string }> => 
    apiClient.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};
