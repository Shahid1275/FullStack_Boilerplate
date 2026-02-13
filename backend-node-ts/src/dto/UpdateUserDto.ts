/**
 * Update User DTO - Data Transfer Object
 * Validates and transfers user update data
 */

export class UpdateUserDto {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: boolean;

  constructor(data: any) {
    this.email = data.email;
    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.isActive = data.isActive;
  }

  /**
   * Validates the DTO
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (this.email !== undefined && !this.isValidEmail(this.email)) {
      errors.push('Email format is invalid');
    }

    if (this.username !== undefined && this.username.length < 3) {
      errors.push('Username must be at least 3 characters');
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

  /**
   * Check if DTO has any data
   */
  hasData(): boolean {
    return (
      this.email !== undefined ||
      this.username !== undefined ||
      this.firstName !== undefined ||
      this.lastName !== undefined ||
      this.role !== undefined ||
      this.isActive !== undefined
    );
  }
}
