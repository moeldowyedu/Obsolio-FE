import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar/Sidebar';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../contexts/ThemeContext';
import { useImpersonation } from '../../hooks/useImpersonation';

const MainLayout = ({ children, showFooter = true, showSidebar = true }) => {
  const { isAuthenticated } = useAuthStore();
  const { isImpersonating, stopImpersonation } = useImpersonation();
  const { theme } = useTheme();

  // Only show sidebar if authenticated and showSidebar is true
  const shouldShowSidebar = showSidebar && isAuthenticated;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
      {isImpersonating && (
        <div className="bg-red-600 text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center relative z-50">
          <span className="mr-2">⚠️ You are impersonating a tenant. Actions performed will be logged as System Admin.</span>
          <button
            onClick={stopImpersonation}
            className="bg-white text-red-600 px-3 py-1 rounded text-xs font-bold hover:bg-gray-100 transition-colors uppercase tracking-wider"
          >
            Exit Impersonation
          </button>
        </div>
      )}
      {!shouldShowSidebar && <Header />}
      <div className="flex flex-grow">
        {shouldShowSidebar && <Sidebar />}
        <main className={`flex-grow overflow-x-auto transition-colors duration-300 ${shouldShowSidebar
          ? `${theme === 'dark' ? 'bg-[#0B0E14] text-white' : 'bg-slate-50 text-slate-900'} px-8 lg:px-10 xl:px-12`
          : 'container mx-auto px-6 pt-28'
          }`}>
          {children}
        </main>
      </div>
      {showFooter && !shouldShowSidebar && <Footer />}
    </div>
  );
};

export default MainLayout;
