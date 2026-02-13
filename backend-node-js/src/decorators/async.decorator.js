/**
 * Async Decorator
 * Wrap async functions with error handling
 */

const asyncDecorator = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncDecorator;
