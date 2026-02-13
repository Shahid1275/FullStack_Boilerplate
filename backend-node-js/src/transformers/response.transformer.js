/**
 * Response Transformer
 * Transform API responses
 */

class ResponseTransformer {
  /**
   * Transform success response
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
   * Transform error response
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
   * Transform paginated response
   */
  static paginate(data, pagination) {
    return {
      success: true,
      data,
      pagination: {
        currentPage: pagination.page,
        perPage: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
        hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
        hasPrev: pagination.page > 1
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  }
}

module.exports = ResponseTransformer;
