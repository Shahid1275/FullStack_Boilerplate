/**
 * Validation Pipe - Data validation and transformation
 */

export class ValidationPipe {
  /**
   * Validate email format
   */
  static email(value: string): string {
    if (!value) {
      throw new Error('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }

    return value.toLowerCase().trim();
  }

  /**
   * Validate and parse integer
   */
  static integer(value: any): number {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new Error('Must be a valid integer');
    }
    return parsed;
  }

  /**
   * Validate and parse float
   */
  static float(value: any): number {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      throw new Error('Must be a valid number');
    }
    return parsed;
  }

  /**
   * Validate and parse boolean
   */
  static boolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    throw new Error('Must be a valid boolean');
  }

  /**
   * Validate string length
   */
  static stringLength(value: string, min?: number, max?: number): string {
    if (!value) {
      throw new Error('String is required');
    }

    if (min !== undefined && value.length < min) {
      throw new Error(`String must be at least ${min} characters`);
    }

    if (max !== undefined && value.length > max) {
      throw new Error(`String must be at most ${max} characters`);
    }

    return value;
  }

  /**
   * Sanitize string (remove HTML tags)
   */
  static sanitize(value: string): string {
    if (!value) return '';
    return value.replace(/<[^>]*>/g, '').trim();
  }

  /**
   * Validate enum value
   */
  static enum<T>(value: any, enumObj: any): T {
    const values = Object.values(enumObj);
    if (!values.includes(value)) {
      throw new Error(`Must be one of: ${values.join(', ')}`);
    }
    return value as T;
  }

  /**
   * Validate array
   */
  static array(value: any, minLength?: number, maxLength?: number): any[] {
    if (!Array.isArray(value)) {
      throw new Error('Must be an array');
    }

    if (minLength !== undefined && value.length < minLength) {
      throw new Error(`Array must have at least ${minLength} items`);
    }

    if (maxLength !== undefined && value.length > maxLength) {
      throw new Error(`Array must have at most ${maxLength} items`);
    }

    return value;
  }

  /**
   * Validate UUID
   */
  static uuid(value: string): string {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('Invalid UUID format');
    }
    return value;
  }

  /**
   * Validate URL
   */
  static url(value: string): string {
    try {
      new URL(value);
      return value;
    } catch {
      throw new Error('Invalid URL format');
    }
  }
}
