/**
 * withLoading HOC - Show loading state while data is being fetched
 */

import { ComponentType } from 'react';

interface LoadingProps {
  isLoading?: boolean;
}

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export const withLoading = <P extends object>(Component: ComponentType<P>) => {
  return function LoadingComponent({ isLoading, ...props }: P & LoadingProps) {
    if (isLoading) {
      return <Loader />;
    }

    return <Component {...(props as P)} />;
  };
};
