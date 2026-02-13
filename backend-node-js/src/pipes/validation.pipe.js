/**
 * Validation Pipe
 * Transform and validate input data
 */

class ValidationPipe {
  /**
   * Transform and validate data
   */
  static transform(schema) {
    return async (req, res, next) => {
      try {
        if (schema.validate) {
          // For DTOs with validate method
          const dto = new schema(req.body);
          dto.validate();
          req.validatedData = dto.toObject();
        } else if (schema.validateAsync) {
          // For Joi/Yup schemas
          req.validatedData = await schema.validateAsync(req.body);
        }
        next();
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.message
        });
      }
    };
  }
}

module.exports = ValidationPipe;
