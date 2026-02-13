/**
 * App Providers Composition
 * Centralized provider wrapper for the entire application
 */

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import store from '@/store';
import ErrorFallback from '@/components/common/ErrorFallback';

/**
 * Compose all providers in one place
 */
export const AppProviders = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};
