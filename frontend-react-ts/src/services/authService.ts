import apiClient from './api'
import { LoginCredentials, RegisterData, AuthResponse } from '@/types'

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<any, AuthResponse>('/auth/login', credentials)
      return response
    } catch (error) {
      throw error
    }
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<any, AuthResponse>('/auth/register', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      throw error
    }
  },

  refreshToken: async (): Promise<{ token: string }> => {
    try {
      const response = await apiClient.post<any, { token: string }>('/auth/refresh-token')
      return response
    } catch (error) {
      throw error
    }
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<any, { message: string }>('/auth/forgot-password', { email })
      return response
    } catch (error) {
      throw error
    }
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<any, { message: string }>('/auth/reset-password', { token, password })
      return response
    } catch (error) {
      throw error
    }
  },
}
