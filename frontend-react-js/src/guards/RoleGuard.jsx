/**
 * Role-Based Authorization Guard
 * Restricts access based on user roles
 */

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@/constants';

export const RoleGuard = ({ children, allowedRoles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};
