/**
 * withAuth HOC - Higher Order Component for authentication
 * Wraps components that require authentication
 */

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { RootState } from '@/store/store';
import { ComponentType } from 'react';

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
      return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <Component {...props} />;
  };
};
