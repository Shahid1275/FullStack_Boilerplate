/**
 * Auth Domain Module
 */

export class AuthDomain {
  constructor(authRepository) {
    this.repository = authRepository;
  }

  async login(credentials) {
    const { email, password } = credentials;
    
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    if (!password) {
      throw new Error('Password is required');
    }
    
    return await this.repository.login(credentials);
  }

  async register(userData) {
    const { email, password, name } = userData;
    
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    if (!this.validatePassword(password)) {
      throw new Error('Password must be at least 6 characters with uppercase, lowercase, and number');
    }
    
    if (!name || name.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    
    return await this.repository.register(userData);
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePassword(password) {
    return password.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  }
}
