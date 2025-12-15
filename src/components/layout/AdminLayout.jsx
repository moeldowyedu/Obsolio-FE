import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Building2, Users, Cpu, Bot, Activity, Plug,
  Settings, LogOut, Menu, X, ChevronDown, LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Header */}
      <header className={'fixed top-0 left-0 right-0 h-16 backdrop-blur-sm border-b z-50 transition-colors duration-300 bg-gray-900/95 border-gray-700/50'}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={'p-2 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-white'}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Obsolio" className="h-8 w-auto" />
              <div>
                <h1 className={'font-bold text-lg text-white'}>
                  OBSOLIO Console
                </h1>
                <p className={'text-xs text-gray-400'}>
                  System Administration
                </p>
              </div>
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={'flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800'}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                {user?.profile_image ? (
                  <img src={user.profile_image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-semibold text-sm">{(user?.name || 'SA')[0]}</span>
                )}
              </div>
              <div className="text-left hidden md:block">
                <div className={'text-sm font-semibold text-white'}>{user?.name || 'System Admin'}</div>
                <div className={'text-xs text-gray-400'}>{user?.email || 'admin@obsolio.com'}</div>
              </div>
              <ChevronDown className={'w-4 h-4 text-gray-400'} />
            </button>

            {profileOpen && (
              <div className={'absolute right-0 mt-2 w-48 rounded-lg shadow-xl border py-2 bg-gray-800 border-gray-700'}>
                <Link
                  to="#"
                  className={'flex items-center space-x-2 px-4 py-2 transition-colors text-gray-300 hover:bg-gray-700 opacity-50 cursor-not-allowed'}
                  title="Global Settings - Coming Soon"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={'flex items-center space-x-2 px-4 py-2 transition-colors w-full text-left text-red-400 hover:bg-gray-700'}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 bottom-0 backdrop-blur-sm border-r transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'
            } overflow-hidden z-40 bg-gray-900/95 border-gray-700/50`}
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
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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
