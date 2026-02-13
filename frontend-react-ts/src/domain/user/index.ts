/**
 * User Domain Module
 */

interface UserRepository {
  getById(id: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}

export class UserDomain {
  constructor(private userRepository: UserRepository) {}

  async fetchUser(id: string) {
    return await this.userRepository.getById(id);
  }

  async updateUser(id: string, data: any) {
    return await this.userRepository.update(id, data);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  }
}
