import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar/Sidebar';
import { useAuthStore } from '../../store/authStore';

const MainLayout = ({ children, showFooter = true, showSidebar = true }) => {
  const { isAuthenticated } = useAuthStore();

  // Only show sidebar if authenticated and showSidebar is true
  const shouldShowSidebar = showSidebar && isAuthenticated;

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldShowSidebar && <Header />}
      <div className="flex flex-grow">
        {shouldShowSidebar && <Sidebar />}
        <main className={`flex-grow overflow-x-auto ${shouldShowSidebar ? 'bg-[#0B0E14] text-white px-8 lg:px-10 xl:px-12' : 'container mx-auto px-6'}`}>
          {children}
        </main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
