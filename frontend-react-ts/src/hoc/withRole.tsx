/**
 * withRole HOC - Higher Order Component for role-based access
 */

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { RootState } from '@/store/store';
import { ComponentType } from 'react';

export const withRole = (allowedRoles: string[] = []) => <P extends object>(Component: ComponentType<P>) => {
  return function RoleBasedComponent(props: P) {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Component {...props} />;
  };
};
