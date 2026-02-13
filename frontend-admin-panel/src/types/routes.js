export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id) => `/users/${id}`,
  },
}

export default API_ROUTES
