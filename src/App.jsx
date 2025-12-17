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

import { useTenantStore } from './store/tenantStore';
import { getCurrentTenantId } from './utils/tenantDetection';

function App() {
  const [currentRouter, setCurrentRouter] = useState(null);
  const { currentTenant } = useTenantStore();

  useEffect(() => {
    const subdomain = getSubdomain();
    const tenantId = getCurrentTenantId();

    // 🔍 Debug Logging
    console.group('🌐 Subdomain Detection');
    console.log('Current Hostname:', window.location.hostname);
    console.log('Detected Subdomain:', subdomain);
    console.log('Is Public Domain:', isPublicDomain());
    console.log('Is System Admin:', isSystemAdminDomain());
    console.log('Is Tenant Domain:', !isPublicDomain() && !isSystemAdminDomain());
    console.log('Tenant ID:', tenantId);
    console.log('VITE_APP_DOMAIN:', import.meta.env.VITE_APP_DOMAIN);
    console.groupEnd();

    // ⚠️ CRITICAL: Initialize tenant in store if on tenant subdomain
    // This allows the store to be aware of the context immediately
    if (tenantId && (!currentTenant || currentTenant.id !== tenantId)) {
      console.log('🏢 Initializing Tenant Store:', tenantId);
      // We manually set the state here to ensure immediate availability
      useTenantStore.setState({
        currentTenant: {
          id: tenantId,
          subdomain: tenantId
        }
      });
    }

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
  }, [currentTenant]);

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
