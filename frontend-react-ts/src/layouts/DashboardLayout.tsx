/**
 * Dashboard Layout Component
 */

import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <nav className="p-4">
            {/* Navigation items */}
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
