import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectIsAuthenticated, logoutUser } from '@/store/slices/authSlice'

const Header: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            React TS App
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition">
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
