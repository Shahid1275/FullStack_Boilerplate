/**
 * Role-Based Authorization Guard (TypeScript)
 */

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Routes, UserRole } from '@/constants';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const RoleGuard = ({ children, allowedRoles = [] }: RoleGuardProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user || !allowedRoles.includes(user.role as UserRole)) {
    return <Navigate to={Routes.HOME} replace />;
  }

  return <>{children}</>;
};
