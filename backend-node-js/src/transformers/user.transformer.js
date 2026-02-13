/**
 * User Transformer
 * Transform user data for responses
 */

class UserTransformer {
  /**
   * Transform single user
   */
  static transform(user) {
    if (!user) return null;

    return {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Transform user collection
   */
  static transformCollection(users) {
    return users.map(user => this.transform(user));
  }

  /**
   * Transform for public view
   */
  static transformPublic(user) {
    if (!user) return null;

    return {
      id: user._id || user.id,
      name: user.name,
      role: user.role
    };
  }

  /**
   * Transform with token
   */
  static transformWithToken(user, token) {
    return {
      user: this.transform(user),
      token
    };
  }
}

module.exports = UserTransformer;
