/**
 * Response Transformer - Transform API responses
 */

export class ResponseTransformer {
  /**
   * Transform success response
   */
  static success<T>(data: T, message?: string): Record<string, any> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date(),
    };
  }

  /**
   * Transform error response
   */
  static error(message: string, statusCode: number = 500, details?: any): Record<string, any> {
    return {
      success: false,
      error: {
        message,
        statusCode,
        details,
        timestamp: new Date(),
      },
    };
  }

  /**
   * Transform paginated response
   */
  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number
  ): Record<string, any> {
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      timestamp: new Date(),
    };
  }

  /**
   * Transform list response
   */
  static list<T>(items: T[], total?: number): Record<string, any> {
    return {
      success: true,
      data: items,
      meta: {
        count: items.length,
        total: total || items.length,
        timestamp: new Date(),
      },
    };
  }

  /**
   * Transform created response
   */
  static created<T>(data: T, message: string = 'Resource created successfully'): Record<string, any> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date(),
    };
  }

  /**
   * Transform updated response
   */
  static updated<T>(data: T, message: string = 'Resource updated successfully'): Record<string, any> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date(),
    };
  }

  /**
   * Transform deleted response
   */
  static deleted(message: string = 'Resource deleted successfully'): Record<string, any> {
    return {
      success: true,
      message,
      timestamp: new Date(),
    };
  }

  /**
   * Transform not found response
   */
  static notFound(resource: string = 'Resource'): Record<string, any> {
    return {
      success: false,
      error: {
        message: `${resource} not found`,
        statusCode: 404,
        timestamp: new Date(),
      },
    };
  }
}
