export class ResponseFilter {
  static transform(data) {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  static error(error) {
    return {
      success: false,
      error: error.message,
      statusCode: error.statusCode || 500,
      timestamp: new Date().toISOString(),
    }
  }
}

export default ResponseFilter
