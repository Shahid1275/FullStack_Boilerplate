/**
 * User Data Transformer
 * Transform API responses to frontend models
 */

export const userTransformer = {
  /**
   * Transform user data from API to frontend model
   */
  fromApi(apiUser) {
    return {
      id: apiUser._id || apiUser.id,
      name: apiUser.name,
      email: apiUser.email,
      role: apiUser.role,
      avatar: apiUser.avatar || null,
      createdAt: new Date(apiUser.createdAt),
      updatedAt: new Date(apiUser.updatedAt),
    };
  },

  /**
   * Transform user data from frontend to API model
   */
  toApi(user) {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
  },

  /**
   * Transform array of users
   */
  fromApiList(apiUsers) {
    return apiUsers.map((user) => this.fromApi(user));
  },
};
