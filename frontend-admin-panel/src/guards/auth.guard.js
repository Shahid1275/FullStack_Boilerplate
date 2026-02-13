export class AuthGuard {
  static check() {
    const token = localStorage.getItem('token')
    return !!token
  }

  static requireAuth() {
    if (!this.check()) {
      window.location.href = '/login'
      return false
    }
    return true
  }
}

export class RoleGuard {
  static hasRole(requiredRole) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return user.role === requiredRole
  }
}

export default { AuthGuard, RoleGuard }
