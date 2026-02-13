/**
 * User Data Transformer
 * Transform API responses to frontend models
 */

interface ApiUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface FrontendUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const userTransformer = {
  /**
   * Transform user data from API to frontend model
   */
  fromApi(apiUser: ApiUser): FrontendUser {
    return {
      id: apiUser._id || apiUser.id || '',
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
  toApi(user: Partial<FrontendUser>): Partial<ApiUser> {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || undefined,
    };
  },

  /**
   * Transform array of users
   */
  fromApiList(apiUsers: ApiUser[]): FrontendUser[] {
    return apiUsers.map((user) => this.fromApi(user));
  },
};
