/**
 * Transform Interceptor
 * Transform response data before sending
 */

class TransformInterceptor {
  /**
   * Transform response
   */
  static intercept(req, res, next) {
    const originalJson = res.json.bind(res);

    res.json = function(data) {
      // Add metadata to response
      const transformed = {
        ...data,
        meta: {
          ...data.meta,
          requestId: req.id || Date.now().toString(),
          path: req.path,
          method: req.method
        }
      };

      return originalJson(transformed);
    };

    next();
  }
}

module.exports = TransformInterceptor;
