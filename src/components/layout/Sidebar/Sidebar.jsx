import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogOut, User, Building2, Settings } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useLayoutStore } from '../../../store/layoutStore';
import { PLATFORM, ENGINES } from '../../../utils/constants';

import logo from '../../../assets/imgs/OBSOLIO-logo-cyan.png';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const {
    isCollapsed,
    toggleSidebar,
    expandedSections,
    toggleSection,
    setSectionExpanded
  } = useLayoutStore();

  // Auto-expand sections based on current route
  useEffect(() => {
    const path = location.pathname;

    // Determine which section *should* be active
    let activeSection = null;
    if (path.startsWith('/organization/')) activeSection = 'organization';
    else if (path.startsWith('/agentx/') || path.startsWith('/agents/')) activeSection = 'agentx';
    else if (path.startsWith('/job-flows/')) activeSection = 'jobFlows';
    else if (path.startsWith('/orchestration/')) activeSection = 'orchestration';
    else if (path.startsWith('/scheduling/')) activeSection = 'scheduling';
    else if (path.startsWith('/hitl/')) activeSection = 'hitl';
    else if (path.startsWith('/engines/')) activeSection = 'engines';
    else if (path.startsWith('/integrations/')) activeSection = 'integrations';
    else if (path.startsWith('/team-users/')) activeSection = 'teamUsers';
    else if (path.startsWith('/billing/')) activeSection = 'billing';
    else if (path.startsWith('/settings/')) activeSection = 'settings';

    // If an active section is found, expand it. DO NOT collapse others if they were manually opened.
    // Or, for stricter navigation behavior, collapse others? The user said "keep sub menu expanded".
    // A balanced approach: Ensure the active one is true.
    // If an active section is found, expand it. DO NOT collapse others if they were manually opened.
    if (activeSection) {
      setSectionExpanded(activeSection, true);
    }
  }, [location.pathname, setSectionExpanded]);





  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: 'dashboard',
      exact: true
    },
    {
      name: 'AgentX Hub',
      icon: 'smart_toy',
      section: 'agentx',
      children: [
        { name: 'HUB', href: '/agentx/hub', icon: 'store' },
        { name: 'My Agents', href: '/agentx/my-agents', icon: 'person' },
        { name: 'Agent Builder', href: '/agentx/builder', icon: 'construction' },
        { name: 'Deploy Agent', href: '/agents/deploy', icon: 'add_circle' },
        { name: 'Developer Portal', href: '/agentx/developer', icon: 'code' },
      ]
    },
    {
      name: 'Organization',
      icon: 'business',
      section: 'organization',
      children: [
        { name: 'Branches', href: '/organization/branches', icon: 'account_tree' },
        { name: 'Departments', href: '/organization/departments', icon: 'corporate_fare' },
        { name: 'Projects', href: '/organization/projects', icon: 'folder' },
        { name: 'Teams', href: '/organization/teams', icon: 'groups' },
        { name: 'Settings', href: '/organization/settings', icon: 'settings' },
      ]
    },
    {
      name: 'Orchestration',
      icon: 'account_tree',
      section: 'orchestration',
      children: [
        { name: 'Workflows', href: '/orchestration/workflows', icon: 'workflow' },
        { name: 'Workflow Builder', href: '/orchestration/builder', icon: 'construction' },
        { name: 'Execution History', href: '/orchestration/history', icon: 'history' },
        { name: 'Scheduled Jobs', href: '/scheduling/jobs', icon: 'alarm' },
        { name: 'Calendar View', href: '/scheduling/calendar', icon: 'calendar_today' },
        { name: 'Upcoming Runs', href: '/scheduling/upcoming', icon: 'hourglass_empty' },
      ]
    },
    {
      name: 'HITL Framework',
      icon: 'supervised_user_circle',
      section: 'hitl',
      children: [
        { name: 'Approval Queue', href: '/hitl/approval-queue', icon: 'inbox' },
        { name: 'My Approvals', href: '/hitl/my-approvals', icon: 'check_circle' },
        { name: 'Activity Logs', href: '/hitl/activity-logs', icon: 'receipt_long' },
        { name: 'HITL Configuration', href: '/hitl/configuration', icon: 'settings' },
      ]
    },
    {
      name: 'Job Flows',
      icon: 'bolt',
      section: 'jobFlows',
      children: [
        { name: 'All Job Flows', href: '/job-flows/all', icon: 'list_alt' },
        { name: 'Job Calendar', href: '/job-flows/calendar', icon: 'calendar_month' },
        { name: 'Execution History', href: '/job-flows/history', icon: 'history' },
      ]
    },
    {
      name: 'Team & Users',
      icon: 'group',
      section: 'teamUsers',
      children: [
        { name: 'All Users', href: '/team-users/all', icon: 'person' },
        { name: 'Roles & Permissions', href: '/team-users/roles', icon: 'admin_panel_settings' },
        { name: 'User Activity', href: '/team-users/activity', icon: 'analytics' },
      ]
    },
    {
      name: 'Integrations',
      icon: 'extension',
      section: 'integrations',
      children: [
        { name: 'Connected Apps', href: '/integrations/connected', icon: 'link' },
        { name: 'API Keys', href: '/integrations/api-keys', icon: 'key' },
        { name: 'Webhooks', href: '/integrations/webhooks', icon: 'webhook' },
        { name: 'Browse Integrations', href: '/integrations/browse', icon: 'apps' },
      ]
    },
    {
      name: 'Billing & Usage',
      icon: 'credit_card',
      section: 'billing',
      children: [
        { name: 'Overview', href: '/billing/overview', icon: 'dashboard' },
        { name: 'Subscription', href: '/billing/subscription', icon: 'payments' },
        { name: 'Usage Reports', href: '/billing/usage', icon: 'trending_up' },
        { name: 'Invoices', href: '/billing/invoices', icon: 'receipt' },
      ]
    },
    {
      name: 'Settings',
      icon: 'settings',
      section: 'settings',
      children: [
        { name: 'Tenant Settings', href: '/settings/tenant', icon: 'business' },
        { name: 'Rubrics', href: '/settings/rubrics', icon: 'rule' },
        { name: 'Security', href: '/settings/security', icon: 'lock' },
        { name: 'Notifications', href: '/settings/notifications', icon: 'notifications' },
      ]
    },
  ];

  // Determine display name based on length preferences
  const displayName = (() => {
    const fullName = user?.tenant?.organization_full_name || user?.tenant?.name || user?.tenant?.company || user?.company || 'My Workspace';
    const shortName = user?.tenant?.organization_short_name || user?.tenant?.short_name;

    // Use short name if full name is too long (>15 chars) AND short name exists
    if (fullName.length > 15 && shortName) {
      return shortName;
    }
    return fullName;
  })();

  return (
    <aside
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#0B0E14] border-r border-white/10 h-screen sticky top-0 transition-all duration-300 ease-in-out flex flex-col flex-shrink-0`}
    >
      {/* Tenant Branding */}
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-white/10 transition-all duration-300 flex-shrink-0`}>
        <div className="flex items-center gap-3">
          <div className={`${isCollapsed ? 'w-10 h-10 p-1' : 'w-[70px] h-[50px] p-1'} rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-200/10 transition-all duration-300`}>
            {user?.tenant?.organizationLogo || user?.tenant?.logo_url || user?.tenant?.logo ? (
              <img
                src={user?.tenant?.organizationLogo || user?.tenant?.logo_url || user?.tenant?.logo}
                alt="Tenant Logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className={`${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'} text-primary-600`} />
            )}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-white truncate" title={user?.tenant?.organization_full_name || user?.tenant?.name}>
                {displayName}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <p className="text-xs text-gray-400 truncate">
                  {user?.role || 'Admin'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-20 -right-3 w-6 h-6 bg-[#1e293b] border border-white/10 rounded-full flex items-center justify-center hover:bg-[#334155] transition-colors z-10 shadow-sm"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Navigation - Scrollable */}
      <nav className="p-4 flex-grow overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => {
            if (item.children) {
              const isExpanded = expandedSections[item.section];
              const isAnyChildActive = item.children.some(child =>
                location.pathname === child.href || location.pathname.startsWith(child.href + '/')
              );

              return (
                <li key={item.name}>
                  <button
                    onClick={() => !isCollapsed && toggleSection(item.section)}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${isAnyChildActive ? 'bg-primary-500/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                      }`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-lg text-gray-500 group-hover:text-gray-300">{item.icon}</span>
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <svg
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Submenu for expanded sidebar */}
                  {!isCollapsed && isExpanded && (
                    <ul className="mt-1 ml-6 space-y-1 animate-slideDown">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            to={child.href}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${isActive
                                ? 'bg-primary-500/10 text-primary-400 font-medium'
                                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                              }`
                            }
                          >
                            <span className="material-icons text-base text-gray-500">{child.icon}</span>
                            <span>{child.name}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tooltip submenu for collapsed sidebar */}
                  {isCollapsed && (
                    <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]">
                        <div className="px-4 py-2 text-sm font-semibold text-secondary-900 border-b border-gray-200">
                          {item.name}
                        </div>
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-2 text-sm transition-colors ${isActive
                                ? 'bg-primary-50 text-primary-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                              }`
                            }
                          >
                            <span className="material-icons text-base text-secondary-600">{child.icon}</span>
                            <span>{child.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={item.name} className="relative group">
                <NavLink
                  to={item.href}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                    }`
                  }
                  title={isCollapsed ? item.name : ''}
                >
                  <span className="material-icons text-lg text-gray-500">{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>

                {/* Tooltip for collapsed sidebar */}
                {isCollapsed && (
                  <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section - Help */}
      {/* Bottom Section - User Profile & Logout */}
      <div className="border-t border-white/10 bg-[#0B0E14] flex-shrink-0">
        {!isCollapsed ? (
          <div className="p-4 space-y-4">
            {/* Help Box */}
            <div className="bg-gradient-to-r from-primary-900/10 to-blue-900/10 rounded-lg p-3 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-gray-200">Need Help?</h3>
                <Link to="/agentx/developer" className="text-[10px] text-primary-400 hover:text-primary-300">Docs →</Link>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-primary-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {(user?.name || user?.fullName || user?.full_name || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name || user?.fullName || user?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await logout();
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-primary-500 flex items-center justify-center text-white text-xs font-bold" title={user?.name || user?.fullName || user?.full_name}>
              {(user?.name || user?.fullName || user?.full_name || 'U').charAt(0).toUpperCase()}
            </div>
            <button
              onClick={async () => {
                try {
                  await logout();
                } catch (error) {
                  console.error('Logout failed:', error);
                }
              }}
              className="w-10 h-10 mx-auto flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
