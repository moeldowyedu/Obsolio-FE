import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Building2, Users, Cpu, Bot, Activity, Plug,
  Settings, LogOut, Menu, X, ChevronDown, LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import logoDark from '../../assets/imgs/OBSOLIO-logo.png';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Navigation is handled by the logout function in authStore
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback navigation
      window.location.href = '/login';
    }
  };

  // We are likely on the console subdomain, so paths are root relative.
  // Or we might be handling legacy/dev envs.
  // Let's standardise on root-relative paths which AdminRouter handles.

  const navigation = [
    { name: 'Console Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Manage Tenants', href: '/tenants', icon: Building2 },
    { name: 'Manage Engines', href: '/engines', icon: Cpu },
    { name: 'Manage Agents', href: '/agents', icon: Bot }, // Updated to match AdminRouter path
    { name: 'Active Agents', href: '/active-agents', icon: Activity },
    { name: 'Integrations', href: '/integrations', icon: Plug },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark'
      ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
      : 'bg-slate-50'}`}>

      {/* Top Header */}
      <header className={`fixed top-0 left-0 right-0 h-16 backdrop-blur-sm border-b z-50 transition-colors duration-300 ${theme === 'dark'
        ? 'bg-gray-900/95 border-gray-700/50'
        : 'bg-white/90 border-slate-200'
        }`}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-2">
              <img src={theme === 'dark' ? logo : logoDark} alt="Obsolio" className="h-8 w-auto" />
              <div>
                <h1 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  OBSOLIO Console
                </h1>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                  System Administration
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-100'
                  }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                  {user?.profile_image ? (
                    <img src={user.profile_image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-semibold text-sm">{(user?.name || 'SA')[0]}</span>
                  )}
                </div>
                <div className="text-left hidden md:block">
                  <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user?.name || 'System Admin'}</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{user?.email || 'admin@obsolio.com'}</div>
                </div>
                <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`} />
              </button>

              {profileOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border py-2 ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-slate-200'
                  }`}>
                  <Link
                    to="#"
                    className={`flex items-center space-x-2 px-4 py-2 transition-colors opacity-50 cursor-not-allowed ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    title="Global Settings - Coming Soon"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center space-x-2 px-4 py-2 transition-colors w-full text-left text-red-400 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50'
                      }`}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 bottom-0 backdrop-blur-sm border-r transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'
            } overflow-hidden z-40 ${theme === 'dark'
              ? 'bg-gray-900/95 border-gray-700/50'
              : 'bg-white/95 border-slate-200'
            }`}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${active
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'
            }`}
        >
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
