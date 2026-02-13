/**
 * Main Layout Component
 */

import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">React TypeScript App</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>
      
      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600">
          © 2026 Your Company
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
