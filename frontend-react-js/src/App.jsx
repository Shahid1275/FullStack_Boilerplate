import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { errorTracking, analytics } from '@/monitoring';
import '@/i18n'; // Initialize i18n
import './App.css';

function App() {
  useEffect(() => {
    // Initialize monitoring services
    errorTracking.init();
    analytics.init();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppRoutes />
    </div>
  );
}

export default App;
