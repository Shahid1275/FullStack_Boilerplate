/**
 * withRole HOC - Higher Order Component for role-based access
 */

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const withRole = (allowedRoles = []) => (Component) => {
  return function RoleBasedComponent(props) {
    const { user } = useSelector((state) => state.auth);

    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Component {...props} />;
  };
};
