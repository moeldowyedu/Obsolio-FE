import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar/Sidebar';

const MainLayout = ({ children, showFooter = true, showSidebar = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        {showSidebar && <Sidebar />}
        <main className={`flex-grow overflow-x-auto ${showSidebar ? 'bg-gray-50 px-8 lg:px-10 xl:px-12' : 'container mx-auto px-6'}`}>
          {children}
        </main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
