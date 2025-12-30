import { Link } from 'react-router-dom';
import { AlertCircle, Home, LayoutDashboard, HelpCircle, ArrowRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { useTheme } from '../contexts/ThemeContext';

const NotFoundPage = ({ showSidebar = true }) => {
  const { theme } = useTheme();

  return (
    <MainLayout showFooter={false} showSidebar={showSidebar}>
      <div className={`min-h-screen flex items-center justify-center px-6 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0B0E14] text-white' : 'bg-slate-50 text-slate-900'
        }`}>

        {/* Animated Background Elements */}
        {theme === 'dark' && (
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-orange/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        )}

        <div className="relative z-10 text-center max-w-3xl mx-auto pt-10 md:pt-0">

          {/* Animated Icon */}
          <div className="mb-8 inline-block animate-scale-in">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${theme === 'dark' ? 'bg-primary-500/20' : 'bg-primary-200'
                }`}></div>
              <div className={`relative backdrop-blur-md border rounded-full p-8 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                }`}>
                <AlertCircle className={`w-24 h-24 ${theme === 'dark' ? 'text-brand-blue' : 'text-brand-blue'}`} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* 404 Heading with Gradient */}
          <h1 className="text-8xl md:text-9xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-brand-blue via-sky-400 to-brand-orange bg-clip-text text-transparent">
              404
            </span>
          </h1>

          {/* Subheading */}
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 animate-slide-up ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Page Not Found
          </h2>

          {/* Description */}
          <p className={`text-lg mb-12 max-w-xl mx-auto leading-relaxed animate-slide-up ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`} style={{ animationDelay: '0.1s' }}>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>

            {/* Primary CTA - Go Home */}
            <Link
              to="/"
              className="glass-btn-primary group flex items-center gap-3 min-w-[200px] justify-center px-6 py-3 rounded-lg font-semibold bg-brand-blue text-white hover:bg-sky-600 shadow-lg transition-all"
            >
              <Home className="w-5 h-5" />
              Go Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA - Dashboard */}
            <Link
              to="/"
              className={`group flex items-center gap-3 min-w-[200px] justify-center px-6 py-3 rounded-lg font-semibold border transition-all ${theme === 'dark'
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:shadow-md'
                }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
          </div>

          {/* Help Link */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/support"
              className={`inline-flex items-center gap-2 transition-colors text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-primary-400' : 'text-slate-500 hover:text-primary-600'
                }`}
            >
              <HelpCircle className="w-4 h-4" />
              Need help? Contact Support
            </Link>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
