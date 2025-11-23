import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PLATFORM, ENGINES } from '../../../utils/constants';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    organization: false,
    agentx: false,
    jobFlows: false,
    orchestration: false,
    scheduling: false,
    hitl: false,
    engines: false,
    integrations: false,
    teamUsers: false,
    billing: false,
    settings: false
  });

  // Auto-expand sections based on current route
  useEffect(() => {
    const path = location.pathname;
    const newExpanded = { ...expandedSections };

    if (path.startsWith('/organization/')) {
      newExpanded.organization = true;
    } else if (path.startsWith('/agentx/') || path.startsWith('/agents/')) {
      newExpanded.agentx = true;
    } else if (path.startsWith('/job-flows/')) {
      newExpanded.jobFlows = true;
    } else if (path.startsWith('/orchestration/')) {
      newExpanded.orchestration = true;
    } else if (path.startsWith('/scheduling/')) {
      newExpanded.scheduling = true;
    } else if (path.startsWith('/hitl/')) {
      newExpanded.hitl = true;
    } else if (path.startsWith('/engines/')) {
      newExpanded.engines = true;
    } else if (path.startsWith('/integrations/')) {
      newExpanded.integrations = true;
    } else if (path.startsWith('/team-users/')) {
      newExpanded.teamUsers = true;
    } else if (path.startsWith('/billing/')) {
      newExpanded.billing = true;
    } else if (path.startsWith('/settings/')) {
      newExpanded.settings = true;
    }

    setExpandedSections(newExpanded);
  }, [location.pathname]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      exact: true
    },
    {
      name: 'Organization',
      icon: '🏢',
      section: 'organization',
      children: [
        { name: 'Branches', href: '/organization/branches', icon: '🏛️' },
        { name: 'Departments', href: '/organization/departments', icon: '🏗️' },
        { name: 'Projects', href: '/organization/projects', icon: '📁' },
        { name: 'Teams', href: '/organization/teams', icon: '👥' },
      ]
    },
    {
      name: 'AgentX Hub',
      icon: '🤖',
      section: 'agentx',
      children: [
        { name: 'Marketplace', href: '/agentx/marketplace', icon: '🏪' },
        { name: 'My Agents', href: '/agentx/my-agents', icon: '👤' },
        { name: 'Agent Builder', href: '/agentx/builder', icon: '🔧' },
        { name: 'Deploy Agent', href: '/agents/deploy', icon: '➕' },
        { name: 'Developer Portal', href: '/agentx/developer', icon: '📚' },
      ]
    },
    {
      name: 'Messages',
      href: '/chat',
      icon: '💬',
      exact: true
    },
    {
      name: 'Job Flows',
      icon: '⚡',
      section: 'jobFlows',
      children: [
        { name: 'All Job Flows', href: '/job-flows/all', icon: '📋' },
        { name: 'Job Calendar', href: '/job-flows/calendar', icon: '📅' },
        { name: 'Execution History', href: '/job-flows/history', icon: '📜' },
      ]
    },
    {
      name: 'Orchestration',
      icon: '🔀',
      section: 'orchestration',
      children: [
        { name: 'Workflows', href: '/orchestration/workflows', icon: '📊' },
        { name: 'Workflow Builder', href: '/orchestration/builder', icon: '🔧' },
        { name: 'Execution History', href: '/orchestration/history', icon: '📜' },
      ]
    },
    {
      name: 'Scheduling',
      icon: '📅',
      section: 'scheduling',
      children: [
        { name: 'Scheduled Jobs', href: '/scheduling/jobs', icon: '⏰' },
        { name: 'Calendar View', href: '/scheduling/calendar', icon: '📆' },
        { name: 'Upcoming Runs', href: '/scheduling/upcoming', icon: '⏳' },
      ]
    },
    {
      name: 'HITL Framework',
      icon: '👥',
      section: 'hitl',
      children: [
        { name: 'Approval Queue', href: '/hitl/approval-queue', icon: '📥' },
        { name: 'My Approvals', href: '/hitl/my-approvals', icon: '✅' },
        { name: 'Activity Logs', href: '/hitl/activity-logs', icon: '📜' },
        { name: 'HITL Configuration', href: '/hitl/configuration', icon: '⚙️' },
      ]
    },
    {
      name: 'Precision AI Engines',
      icon: '⚙️',
      section: 'engines',
      children: ENGINES.map(engine => ({
        name: engine.shortName,
        href: `/engines/${engine.id}`,
        icon: engine.icon
      }))
    },
    {
      name: 'Integrations',
      icon: '🔌',
      section: 'integrations',
      children: [
        { name: 'Connected Apps', href: '/integrations/connected', icon: '🔗' },
        { name: 'API Keys', href: '/integrations/api-keys', icon: '🔑' },
        { name: 'Webhooks', href: '/integrations/webhooks', icon: '🪝' },
        { name: 'Browse Integrations', href: '/integrations/browse', icon: '🏪' },
      ]
    },
    {
      name: 'Team & Users',
      icon: '👥',
      section: 'teamUsers',
      children: [
        { name: 'All Users', href: '/team-users/all', icon: '👤' },
        { name: 'Invite Users', href: '/team-users/invite', icon: '📧' },
        { name: 'Roles & Permissions', href: '/team-users/roles', icon: '🔐' },
        { name: 'User Activity', href: '/team-users/activity', icon: '📊' },
      ]
    },
    {
      name: 'Billing & Usage',
      icon: '💳',
      section: 'billing',
      children: [
        { name: 'Overview', href: '/billing/overview', icon: '📊' },
        { name: 'Subscription', href: '/billing/subscription', icon: '💰' },
        { name: 'Usage Reports', href: '/billing/usage', icon: '📈' },
        { name: 'Invoices', href: '/billing/invoices', icon: '🧾' },
      ]
    },
    {
      name: 'Settings',
      icon: '⚙️',
      section: 'settings',
      children: [
        { name: 'Tenant Settings', href: '/settings/tenant', icon: '🏢' },
        { name: 'Rubrics', href: '/settings/rubrics', icon: '📋' },
        { name: 'Security', href: '/settings/security', icon: '🔒' },
        { name: 'Notifications', href: '/settings/notifications', icon: '🔔' },
      ]
    },
  ];

  return (
    <aside
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Logo/Brand */}
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-gray-200 transition-all duration-300 flex-shrink-0`}>
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-xl font-bold font-heading text-secondary-900 whitespace-nowrap">
                {PLATFORM.name}
              </h1>
              <p className="text-xs text-secondary-600 whitespace-nowrap">
                {PLATFORM.tagline}
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-20 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 shadow-sm"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-secondary-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-secondary-600" />
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
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                      isAnyChildActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
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
                              `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive
                                  ? 'bg-primary-100 text-primary-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`
                            }
                          >
                            <span className="text-base">{child.icon}</span>
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
                              `flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                                isActive
                                  ? 'bg-primary-50 text-primary-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`
                            }
                          >
                            <span className="text-base">{child.icon}</span>
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
                    `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  title={isCollapsed ? item.name : ''}
                >
                  <span className="text-lg">{item.icon}</span>
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
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-secondary-900 mb-1">
              Need Help?
            </h3>
            <p className="text-xs text-secondary-600 mb-3">
              Check our documentation and guides
            </p>
            <a
              href="/agentx/developer"
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              View Documentation →
            </a>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
