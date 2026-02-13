/**
 * withAuth HOC - Higher Order Component for authentication
 * Wraps components that require authentication
 */

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
      return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <Component {...props} />;
  };
};
