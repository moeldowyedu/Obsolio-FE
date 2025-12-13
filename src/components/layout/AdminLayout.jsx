import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Building2, Users, Cpu, Bot, Activity, Plug,
  Settings, LogOut, Menu, X, ChevronDown, LayoutDashboard
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const isGodfather = location.pathname.startsWith('/godfather');

  const navigation = isGodfather ? [
    { name: 'Godfather Dashboard', href: '/godfather/dashboard', icon: LayoutDashboard },
    { name: 'Manage Tenants', href: '/godfather/tenants', icon: Building2 },
    { name: 'Manage Billing', href: '/godfather/billing', icon: Users }, // Using Users icon as placeholder or appropriate one
    { name: 'AgentX Stats', href: '/godfather/active-agents', icon: Activity },
  ] : [
    { name: 'Dashboard', href: '/system-admin/dashboard', icon: LayoutDashboard },
    { name: 'Tenants Management', href: '/system-admin/tenants', icon: Building2 },
    { name: 'Engine Management', href: '/system-admin/engines', icon: Cpu },
    { name: 'Agents Management', href: '/system-admin/agents', icon: Bot },
    { name: 'Active Agents Monitor', href: '/system-admin/active-agents', icon: Activity },
    { name: 'Integration Management', href: '/system-admin/integrations', icon: Plug },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className={`min-h-screen ${isGodfather ? 'bg-gray-50' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'}`}>
      {/* Top Header */}
      <header className={`fixed top-0 left-0 right-0 h-16 backdrop-blur-sm border-b z-50 transition-colors duration-300 ${isGodfather
          ? 'bg-white/90 border-gray-200'
          : 'bg-gray-900/95 border-gray-700/50'
        }`}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${isGodfather
                  ? 'text-gray-600 hover:bg-gray-100'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`font-bold text-lg ${isGodfather ? 'text-gray-900' : 'text-white'}`}>
                  {isGodfather ? 'Godfather Console' : 'Obsolio System Admin'}
                </h1>
                <p className={`text-xs ${isGodfather ? 'text-gray-500' : 'text-gray-400'}`}>
                  {isGodfather ? 'Master Control' : 'Platform Management Console'}
                </p>
              </div>
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${isGodfather ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">SA</span>
              </div>
              <div className="text-left hidden md:block">
                <div className={`text-sm font-semibold ${isGodfather ? 'text-gray-900' : 'text-white'}`}>System Admin</div>
                <div className={`text-xs ${isGodfather ? 'text-gray-500' : 'text-gray-400'}`}>admin@obsolio.com</div>
              </div>
              <ChevronDown className={`w-4 h-4 ${isGodfather ? 'text-gray-500' : 'text-gray-400'}`} />
            </button>

            {profileOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border py-2 ${isGodfather
                  ? 'bg-white border-gray-200'
                  : 'bg-gray-800 border-gray-700'
                }`}>
                <Link
                  to="/system-admin/settings"
                  className={`flex items-center space-x-2 px-4 py-2 transition-colors ${isGodfather
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button className={`flex items-center space-x-2 px-4 py-2 transition-colors w-full text-left ${isGodfather
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-red-400 hover:bg-gray-700'
                  }`}>
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
            } overflow-hidden z-40 ${isGodfather
              ? 'bg-white/90 border-gray-200'
              : 'bg-gray-900/95 border-gray-700/50'
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
                      : isGodfather
                        ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
