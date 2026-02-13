/**
 * Create User DTO - Data Transfer Object
 * Validates and transfers user creation data
 */

export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;

  constructor(data: any) {
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role || 'user';
  }

  /**
   * Validates the DTO
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.email) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(this.email)) {
      errors.push('Email format is invalid');
    }

    if (!this.username) {
      errors.push('Username is required');
    } else if (this.username.length < 3) {
      errors.push('Username must be at least 3 characters');
    }

    if (!this.password) {
      errors.push('Password is required');
    } else if (this.password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Email validation helper
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
