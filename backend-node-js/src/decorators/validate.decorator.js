/**
 * Validation Decorator
 * Validate function parameters
 */

/**
 * Decorator to validate parameters
 */
const validateDecorator = (schema) => {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args) {
      const [req] = args;
      
      // Validate request body
      const { error } = schema.validate(req.body);
      
      if (error) {
        throw new Error(`Validation failed: ${error.details[0].message}`);
      }

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
};

module.exports = validateDecorator;
