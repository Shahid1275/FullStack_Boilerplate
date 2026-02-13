/**
 * Auth Domain Module
 */

interface AuthRepository {
  login(credentials: { email: string; password: string }): Promise<any>;
  register(userData: any): Promise<any>;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export class AuthDomain {
  constructor(private authRepository: AuthRepository) {}

  async login(credentials: LoginCredentials) {
    const { email, password } = credentials;
    
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    if (!password) {
      throw new Error('Password is required');
    }
    
    return await this.authRepository.login(credentials);
  }

  async register(userData: RegisterData) {
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
    
    return await this.authRepository.register(userData);
  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  }
}
