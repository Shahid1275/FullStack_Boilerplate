import apiClient from './api'

export const authService = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      return response
    } catch (error) {
      throw error
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout')
      return response
    } catch (error) {
      throw error
    }
  },

  refreshToken: async () => {
    try {
      const response = await apiClient.post('/auth/refresh-token')
      return response
    } catch (error) {
      throw error
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email })
      return response
    } catch (error) {
      throw error
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, password })
      return response
    } catch (error) {
      throw error
    }
  },
}
