import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const location = useLocation()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
      }
    }, [location])

    return <Component {...props} />
  }
}

export function withRole(Component, requiredRole) {
  return function RoleProtectedComponent(props) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (user.role !== requiredRole) {
      return <div>Access Denied</div>
    }

    return <Component {...props} />
  }
}

export default { withAuth, withRole }
