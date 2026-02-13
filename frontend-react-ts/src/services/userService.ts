import apiClient from './api'
import { User, PaginationParams, PaginatedResponse } from '@/types'

export const userService = {
  getProfile: async (): Promise<User> => {
    try {
      const response = await apiClient.get<any, User>('/users/profile')
      return response
    } catch (error) {
      throw error
    }
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await apiClient.put<any, User>('/users/profile', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  getAllUsers: async (params: PaginationParams = {}): Promise<PaginatedResponse<User>> => {
    try {
      const response = await apiClient.get<any, PaginatedResponse<User>>('/users', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await apiClient.get<any, User>(`/users/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.delete<any, { message: string }>(`/users/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  uploadAvatar: async (file: File): Promise<{ url: string }> => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const response = await apiClient.post<any, { url: string }>('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response
    } catch (error) {
      throw error
    }
  },
}
