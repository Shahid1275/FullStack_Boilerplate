/**
 * Transform Pipe
 * Transform data before processing
 */

class TransformPipe {
  /**
   * Transform data
   */
  static transform(transformFn) {
    return (req, res, next) => {
      try {
        req.body = transformFn(req.body);
        next();
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Data transformation failed',
          error: error.message
        });
      }
    };
  }

  /**
   * Parse integer pipe
   */
  static parseInt(field) {
    return (req, res, next) => {
      if (req.params[field]) {
        req.params[field] = parseInt(req.params[field], 10);
      }
      if (req.query[field]) {
        req.query[field] = parseInt(req.query[field], 10);
      }
      next();
    };
  }
}

module.exports = TransformPipe;
