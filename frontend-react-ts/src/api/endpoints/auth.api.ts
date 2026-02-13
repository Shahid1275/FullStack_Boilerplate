/**
 * Authentication API Endpoints (TypeScript)
 */

import apiClient from '../client';
import { LoginCredentials, RegisterData, User, AuthResponse } from '@/types';

export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AuthResponse> => 
    apiClient.post('/auth/login', credentials),
  
  register: (userData: RegisterData): Promise<AuthResponse> => 
    apiClient.post('/auth/register', userData),
  
  logout: (): Promise<void> => 
    apiClient.post('/auth/logout'),
  
  getCurrentUser: (): Promise<User> => 
    apiClient.get('/auth/me'),
  
  forgotPassword: (email: string): Promise<{ message: string }> => 
    apiClient.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string): Promise<{ message: string }> => 
    apiClient.put(`/auth/reset-password/${token}`, { password }),
  
  refreshToken: (): Promise<{ token: string }> => 
    apiClient.post('/auth/refresh'),
};
