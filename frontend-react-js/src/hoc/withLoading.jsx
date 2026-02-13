/**
 * withLoading HOC - Show loading state while data is being fetched
 */

import { Loader } from '@/components/common/Loader';

export const withLoading = (Component) => {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <Loader />;
    }

    return <Component {...props} />;
  };
};
