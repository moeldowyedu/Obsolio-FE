import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Building2, Users, CreditCard, Bot, Activity, Plug,
  Settings, LogOut, Menu, X, ChevronDown, LayoutDashboard,
  FolderTree, ChevronRight, Link2, BarChart3, List, UserCheck, Shield,
  UserCog, Building, DollarSign, Package
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import logo from '../../assets/imgs/OBSOLIO-logo-light.png';
import logoDark from '../../assets/imgs/OBSOLIO-logo-new.png';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // true = Expanded (w-64), false = Minimized (w-20)
  const [profileOpen, setProfileOpen] = useState(false);
  // 'activeSection' tracks which menu section is expanded. Accordion style: only 1 at a time.
  const [activeSection, setActiveSection] = useState('tenants');

  const { user, logout } = useAuthStore();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize active section based on current path
  useState(() => {
    const path = location.pathname;
    if (path.includes('/tenants')) setActiveSection('tenants');
    else if (path.includes('/agents') || path.includes('/agent-')) setActiveSection('agents');
    else if (path.includes('/subscriptions') || path.includes('subscription')) setActiveSection('subscriptions');
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      window.location.href = '/login';
    }
  };

  const toggleSection = (section) => {
    if (!sidebarOpen) setSidebarOpen(true); // Auto-expand sidebar if clicking a section
    // Toggle: if already active, collapse it (set to ''). Else set to section.
    setActiveSection(activeSection === section ? '' : section);
  };

  const tenantsSubMenu = [
    { name: 'Dashboard', href: '/tenants/dashboard', icon: BarChart3 },
    { name: 'Tenants List', href: '/tenants', icon: List },
  ];

  const agentsSubMenu = [
    { name: 'Categories', href: '/agent-categories', icon: FolderTree },
    { name: 'Agents', href: '/agents', icon: Bot },
    { name: 'Agent Endpoints', href: '/agent-endpoints', icon: Link2 },
    { name: 'Agent Runs', href: '/agent-runs', icon: Activity },
    { name: 'Active Agents', href: '/active-agents', icon: Activity },
  ];

  const subscriptionsSubMenu = [
    { name: 'Active Subscriptions', href: '/active-subscriptions', icon: DollarSign },
    { name: 'Subscription Plans', href: '/subscription-plans', icon: Package },
  ];

  const isActive = (href) => location.pathname === href;

  // Helper to check if any child of a section is active (for highlighing parent icon)
  const isSectionActive = (sectionName) => {
    if (sectionName === 'tenants') return tenantsSubMenu.some(item => isActive(item.href));
    if (sectionName === 'agents') return agentsSubMenu.some(item => isActive(item.href));
    if (sectionName === 'subscriptions') return subscriptionsSubMenu.some(item => isActive(item.href));
    return false;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark'
      ? 'bg-[#0B0E14]'
      : 'bg-white'}`}>

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
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              {/* Logo Logic: Use new dark variant in dark mode */}
              <img src={theme === 'dark' ? logoDark : logo} alt="Obsolio" className="h-8 w-auto" />
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
            <Link
              to="/organizations"
              className={`hidden md:flex items-center space-x-2 text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Building2 className="w-4 h-4" />
              <span>Organizations</span>
            </Link>
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

      {/* Sidebar Layout */}
      <div className="flex pt-16">
        <aside
          className={`fixed left-0 top-16 bottom-0 backdrop-blur-sm border-r transition-all duration-300 
            ${sidebarOpen ? 'w-64' : 'w-20'} 
            overflow-hidden z-40 ${theme === 'dark'
              ? 'bg-gray-900/95 border-gray-700/50'
              : 'bg-white/95 border-slate-200'
            }`}
        >
          <nav className="p-4 space-y-2 overflow-y-auto h-full overflow-x-hidden">
            {/* Dashboard */}
            <Link
              to="/"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/')
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                : 'text-white hover:bg-gray-800'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              title={!sidebarOpen ? "Dashboard" : ""}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Dashboard</span>}
            </Link>

            {/* Section: User & Access */}
            <div className={`pt-4 pb-2 ${!sidebarOpen ? 'hidden' : ''}`}>
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User & Access
              </p>
            </div>
            {!sidebarOpen && <div className="border-t border-gray-700 my-2 mx-2"></div>}

            <Link
              to="/console-users"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/console-users')
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                : 'text-white hover:bg-gray-800'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              title={!sidebarOpen ? "Console Users" : ""}
            >
              <UserCog className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Console Users</span>}
            </Link>

            <Link
              to="/rbac"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/rbac')
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                : 'text-white hover:bg-gray-800'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              title={!sidebarOpen ? "RBAC" : ""}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">RBAC</span>}
            </Link>

            <Link
              to="/impersonation"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/impersonation')
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                : 'text-white hover:bg-gray-800'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              title={!sidebarOpen ? "Impersonation" : ""}
            >
              <UserCheck className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Impersonation</span>}
            </Link>

            {/* Section: Tenant Management */}
            <div className={`pt-4 pb-2 ${!sidebarOpen ? 'hidden' : ''}`}>
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tenant Management
              </p>
            </div>
            {!sidebarOpen && <div className="border-t border-gray-700 my-2 mx-2"></div>}

            {/* Tenants Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('tenants')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${(isActive('/tenants') || activeSection === 'tenants') && !sidebarOpen
                  ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                  : isSectionActive('tenants')
                    ? 'text-brand-orange'
                    : 'text-white hover:bg-gray-800'
                  } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
                title={!sidebarOpen ? "Tenants" : ""}
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium whitespace-nowrap">Tenants</span>}
                </div>
                {sidebarOpen && (
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${activeSection === 'tenants' ? 'rotate-90' : ''
                      }`}
                  />
                )}
              </button>

              {sidebarOpen && activeSection === 'tenants' && (
                <div className="ml-4 space-y-1 border-l-2 border-gray-700 pl-2">
                  {tenantsSubMenu.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all text-sm ${active
                          ? 'bg-gray-800 text-brand-orange font-medium border-l-2 border-brand-orange'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                          }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/organizations"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/organizations')
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                : 'text-white hover:bg-gray-800'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              title={!sidebarOpen ? "Organizations" : ""}
            >
              <Building className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Organizations</span>}
            </Link>

            {/* Section: Subscriptions */}
            <div className={`pt-4 pb-2 ${!sidebarOpen ? 'hidden' : ''}`}>
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Subscriptions
              </p>
            </div>
            {!sidebarOpen && <div className="border-t border-gray-700 my-2 mx-2"></div>}

            {/* Subscriptions Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('subscriptions')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${(isActive('/subscriptions') || activeSection === 'subscriptions') && !sidebarOpen
                  ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                  : isSectionActive('subscriptions')
                    ? 'text-brand-orange'
                    : 'text-white hover:bg-gray-800'
                  } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
                title={!sidebarOpen ? "Subscriptions" : ""}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium whitespace-nowrap">Subscriptions</span>}
                </div>
                {sidebarOpen && (
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${activeSection === 'subscriptions' ? 'rotate-90' : ''
                      }`}
                  />
                )}
              </button>

              {sidebarOpen && activeSection === 'subscriptions' && (
                <div className="ml-4 space-y-1 border-l-2 border-gray-700 pl-2">
                  {subscriptionsSubMenu.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all text-sm ${active
                          ? 'bg-gray-800 text-brand-orange font-medium border-l-2 border-brand-orange'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                          }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section: Agents */}
            <div className={`pt-4 pb-2 ${!sidebarOpen ? 'hidden' : ''}`}>
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Agent Management
              </p>
            </div>
            {!sidebarOpen && <div className="border-t border-gray-700 my-2 mx-2"></div>}

            {/* Agents Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('agents')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${(isActive('/agents') || activeSection === 'agents') && !sidebarOpen
                  ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                  : isSectionActive('agents')
                    ? 'text-brand-orange'
                    : 'text-white hover:bg-gray-800'
                  } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
                title={!sidebarOpen ? "Agents" : ""}
              >
                <div className="flex items-center space-x-3">
                  <Bot className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium whitespace-nowrap">Agents</span>}
                </div>
                {sidebarOpen && (
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${activeSection === 'agents' ? 'rotate-90' : ''
                      }`}
                  />
                )}
              </button>

              {sidebarOpen && activeSection === 'agents' && (
                <div className="ml-4 space-y-1 border-l-2 border-gray-700 pl-2">
                  {agentsSubMenu.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all text-sm ${active
                          ? 'bg-gray-800 text-brand-orange font-medium border-l-2 border-brand-orange'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                          }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section: System */}
            <div className={`pt-4 pb-2 ${!sidebarOpen ? 'hidden' : ''}`}>
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                System
              </p>
            </div>
            {!sidebarOpen && <div className="border-t border-gray-700 my-2 mx-2"></div>}

            <Link
              to="/integrations"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/integrations')
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                : 'text-white hover:bg-gray-800'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              title={!sidebarOpen ? "Integrations" : ""}
            >
              <Plug className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Integrations</span>}
            </Link>

            <Link
              to="/analytics"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/analytics')
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                : 'text-white hover:bg-gray-800'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              title={!sidebarOpen ? "Analytics" : ""}
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Analytics</span>}
            </Link>

            <Link
              to="/audit-logs"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/audit-logs')
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/20'
                : 'text-white hover:bg-gray-800'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              title={!sidebarOpen ? "Audit Logs" : ""}
            >
              <Shield className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Audit Logs</span>}
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'
            }`}
        >
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
