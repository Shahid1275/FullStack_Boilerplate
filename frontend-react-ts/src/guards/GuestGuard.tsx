/**
 * Guest Guard (TypeScript)
 */

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Routes } from '@/constants';

interface GuestGuardProps {
  children: ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={Routes.DASHBOARD} replace />;
  }

  return <>{children}</>;
};
