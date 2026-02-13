/**
 * User Domain Module
 */

export class UserDomain {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async fetchUser(id) {
    return await this.repository.getById(id);
  }

  async updateUser(id, data) {
    return await this.repository.update(id, data);
  }

  async deleteUser(id) {
    return await this.repository.delete(id);
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePassword(password) {
    return password.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  }
}
