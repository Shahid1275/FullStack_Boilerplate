import apiClient from '../api/client'

export class UserService {
  static async getAll() {
    return await apiClient.get('/users')
  }

  static async getById(id) {
    return await apiClient.get(`/users/${id}`)
  }

  static async create(data) {
    return await apiClient.post('/users', data)
  }

  static async update(id, data) {
    return await apiClient.put(`/users/${id}`, data)
  }

  static async delete(id) {
    return await apiClient.delete(`/users/${id}`)
  }
}

export default UserService
