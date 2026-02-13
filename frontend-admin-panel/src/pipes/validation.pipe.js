export class ValidationPipe {
  static email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  static minLength(value, min) {
    return value.length >= min
  }

  static maxLength(value, max) {
    return value.length <= max
  }

  static isNumber(value) {
    return !isNaN(value)
  }
}

export default ValidationPipe
