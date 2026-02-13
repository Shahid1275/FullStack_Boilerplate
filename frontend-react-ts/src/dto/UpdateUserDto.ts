/**
 * Update User DTO
 * Data Transfer Object for user update requests
 */

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: string;
}

export class UpdateUserDtoValidator {
  static validate(data: UpdateUserDto): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (data.name !== undefined && data.name.trim().length === 0) {
      errors.push('Name cannot be empty');
    }

    if (data.email !== undefined && !this.isValidEmail(data.email)) {
      errors.push('Valid email is required');
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

export default UpdateUserDto;
