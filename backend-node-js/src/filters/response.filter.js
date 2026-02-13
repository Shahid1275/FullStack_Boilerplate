/**
 * Response Filter
 * Transform and standardize API responses
 */

class ResponseFilter {
  /**
   * Success response
   */
  static success(data, message = 'Success', meta = {}) {
    return {
      success: true,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta
      }
    };
  }

  /**
   * Error response
   */
  static error(message, errors = [], statusCode = 400) {
    return {
      success: false,
      message,
      errors,
      meta: {
        timestamp: new Date().toISOString(),
        statusCode
      }
    };
  }

  /**
   * Paginated response
   */
  static paginated(data, pagination) {
    return {
      success: true,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        pages: Math.ceil(pagination.total / pagination.limit),
        hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
        hasPrev: pagination.page > 1
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  }
}

module.exports = ResponseFilter;
