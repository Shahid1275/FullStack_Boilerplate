/**
 * Login DTO
 * Data Transfer Object for login requests
 */

export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export class LoginDtoValidator {
  static validate(data: LoginDto): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }

    if (!data.password || data.password.length === 0) {
      errors.push('Password is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default LoginDto;
