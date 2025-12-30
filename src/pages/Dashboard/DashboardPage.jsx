import { useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useBillingStore } from '../../store/billingStore';
import { useTheme } from '../../contexts/ThemeContext';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ChatLauncher from '../../components/dashboard/ChatLauncher';
import ActionCards from '../../components/dashboard/ActionCards';

const DashboardPage = () => {
  const { fetchSubscription } = useBillingStore();
  const { theme } = useTheme();

  useEffect(() => {
    fetchSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout showFooter={false}>
      <div className={`min-h-[calc(100vh-2rem)] flex flex-col relative ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>

        {/* Top Header Section */}
        <div className="w-full px-4 pt-4">
          <DashboardHeader />
        </div>

        {/* Main Content Area - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-20">

          {/* Chat Launcher Section */}
          <div className="w-full mb-16 animate-slide-up">
            <ChatLauncher />
          </div>

          {/* Action Cards Section */}
          <div className="w-full animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <ActionCards />
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
