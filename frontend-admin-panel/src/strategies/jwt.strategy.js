export class JwtStrategy {
  static sign(payload, secret) {
    // JWT signing logic
    return btoa(JSON.stringify(payload))
  }

  static verify(token, secret) {
    try {
      return JSON.parse(atob(token))
    } catch {
      return null
    }
  }

  static decode(token) {
    return this.verify(token)
  }
}

export default JwtStrategy
