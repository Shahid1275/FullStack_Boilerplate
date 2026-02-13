/**
 * JWT Strategy
 * JWT authentication strategy
 */

const jwt = require('jsonwebtoken');
const { UnauthorizedException } = require('../exceptions');

class JwtStrategy {
  /**
   * Sign JWT token
   */
  static sign(payload, expiresIn = '7d') {
    try {
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn
      });
    } catch (error) {
      throw new Error(`Token signing failed: ${error.message}`);
    }
  }

  /**
   * Verify JWT token
   */
  static verify(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Decode JWT token (without verification)
   */
  static decode(token) {
    return jwt.decode(token);
  }

  /**
   * Extract token from request
   */
  static extractToken(req) {
    let token = null;

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    return token;
  }
}

module.exports = JwtStrategy;
