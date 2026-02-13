/**
 * Validate Decorator - Input validation
 * Validates method parameters before execution
 */

export interface ValidationRule {
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

/**
 * Validate decorator for methods
 */
export function Validate(schema: ValidationSchema) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [data] = args;

      if (!data || typeof data !== 'object') {
        throw new Error('Validation failed: Data must be an object');
      }

      const errors: string[] = [];

      for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];

        // Required check
        if (rules.required && (value === undefined || value === null || value === '')) {
          errors.push(rules.message || `${field} is required`);
          continue;
        }

        // Skip validation if not required and value is empty
        if (!rules.required && (value === undefined || value === null)) {
          continue;
        }

        // Type check
        if (rules.type) {
          const actualType = Array.isArray(value) ? 'array' : typeof value;
          if (actualType !== rules.type) {
            errors.push(rules.message || `${field} must be of type ${rules.type}`);
            continue;
          }
        }

        // Min/Max check for numbers
        if (rules.type === 'number') {
          if (rules.min !== undefined && value < rules.min) {
            errors.push(rules.message || `${field} must be at least ${rules.min}`);
          }
          if (rules.max !== undefined && value > rules.max) {
            errors.push(rules.message || `${field} must be at most ${rules.max}`);
          }
        }

        // Min/Max length check for strings and arrays
        if (rules.type === 'string' || rules.type === 'array') {
          const length = value.length;
          if (rules.min !== undefined && length < rules.min) {
            errors.push(rules.message || `${field} must have at least ${rules.min} characters`);
          }
          if (rules.max !== undefined && length > rules.max) {
            errors.push(rules.message || `${field} must have at most ${rules.max} characters`);
          }
        }

        // Pattern check for strings
        if (rules.type === 'string' && rules.pattern) {
          if (!rules.pattern.test(value)) {
            errors.push(rules.message || `${field} format is invalid`);
          }
        }

        // Custom validation
        if (rules.custom && !rules.custom(value)) {
          errors.push(rules.message || `${field} validation failed`);
        }
      }

      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

/**
 * ValidateParam decorator for individual parameters
 */
export function ValidateParam(index: number, rule: ValidationRule) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const value = args[index];

      if (rule.required && (value === undefined || value === null)) {
        throw new Error(rule.message || `Parameter at index ${index} is required`);
      }

      if (rule.type) {
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        if (actualType !== rule.type) {
          throw new Error(rule.message || `Parameter must be of type ${rule.type}`);
        }
      }

      if (rule.custom && !rule.custom(value)) {
        throw new Error(rule.message || `Parameter validation failed`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
