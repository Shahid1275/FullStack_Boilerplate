export class BaseException extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.timestamp = new Date()
  }
}

export class NotFoundException extends BaseException {
  constructor(message = 'Resource not found') {
    super(message, 404)
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

export default { BaseException, NotFoundException, UnauthorizedException }
