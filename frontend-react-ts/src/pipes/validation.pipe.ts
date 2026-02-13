/**
 * Validation Pipe
 * Transform and validate data
 */

export class ValidationPipe {
  /**
   * Validate data against a validator
   */
  static validate<T>(
    data: T,
    validator: (data: T) => { valid: boolean; errors: string[] }
  ): T {
    const result = validator(data);

    if (!result.valid) {
      throw new Error(`Validation failed: ${result.errors.join(', ')}`);
    }

    return data;
  }

  /**
   * Transform data
   */
  static transform<T, R>(data: T, transformer: (data: T) => R): R {
    return transformer(data);
  }

  /**
   * Sanitize data (remove null/undefined values)
   */
  static sanitize<T extends Record<string, any>>(data: T): Partial<T> {
    const sanitized: any = {};

    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        sanitized[key] = data[key];
      }
    }

    return sanitized;
  }

  /**
   * Parse integer from string
   */
  static parseInt(value: string | number): number {
    if (typeof value === 'number') return value;
    
    const parsed = parseInt(value, 10);
    
    if (isNaN(parsed)) {
      throw new Error(`Cannot parse "${value}" to integer`);
    }

    return parsed;
  }

  /**
   * Parse float from string
   */
  static parseFloat(value: string | number): number {
    if (typeof value === 'number') return value;
    
    const parsed = parseFloat(value);
    
    if (isNaN(parsed)) {
      throw new Error(`Cannot parse "${value}" to float`);
    }

    return parsed;
  }
}

export default ValidationPipe;
