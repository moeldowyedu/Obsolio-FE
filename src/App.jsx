import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import { getSubdomain, isSystemAdminDomain, isPublicDomain } from './utils/subdomain';

// Routers
import PublicRouter from './router/PublicRouter';
import TenantRouter from './router/TenantRouter';
import AdminRouter from './router/AdminRouter';

// Loading Component
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading Obsolio...</p>
    </div>
  </div>
);

function App() {
  const [currentRouter, setCurrentRouter] = useState(null);

  useEffect(() => {
    const subdomain = getSubdomain();

    // Determine which router to mount based on subdomain
    if (isPublicDomain()) {
      console.log('🌍 Mounting Public Router (Bare Domain)');
      setCurrentRouter(<PublicRouter />);
    } else if (isSystemAdminDomain()) {
      console.log('🛡️ Mounting Admin Router (System Admin)');
      setCurrentRouter(<AdminRouter />);
    } else {
      console.log(`🏢 Mounting Tenant Router (Subdomain: ${subdomain})`);
      setCurrentRouter(<TenantRouter />);
    }
  }, []);

  if (!currentRouter) {
    return <LoadingScreen />;
  }

  return (
    <LanguageProvider>
      <div className="App">
        <ScrollToTop />
        {currentRouter}
      </div>
    </LanguageProvider>
  );
}

export default App;
