import apiClient from './api'

export const userService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/users/profile')
      return response
    } catch (error) {
      throw error
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/users/profile', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  getAllUsers: async (params = {}) => {
    try {
      const response = await apiClient.get('/users', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/users/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  uploadAvatar: async (file) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const response = await apiClient.post('/users/avatar', formData, {
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
