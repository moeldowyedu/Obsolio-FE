import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PLATFORM, ENGINES } from '../../../utils/constants';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    engines: false,
    agentx: false,
    hitl: false,
    settings: false
  });

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
      name: 'AgentX Hub',
      icon: '🤖',
      section: 'agentx',
      children: [
        { name: 'Marketplace', href: '/agentx/marketplace', icon: '🏪' },
        { name: 'My Agents', href: '/agentx/my-agents', icon: '📁' },
        { name: 'Private Agents', href: '/agentx/private', icon: '🔒' },
        { name: 'Developer Portal', href: '/agentx/developer', icon: '💻' },
      ]
    },
    {
      name: 'HITL Framework',
      icon: '👥',
      section: 'hitl',
      children: [
        { name: 'Oversight Modes', href: '/hitl/modes', icon: '🔘' },
        { name: 'Approval Workflows', href: '/hitl/approvals', icon: '✅' },
        { name: 'Activity Logs', href: '/hitl/logs', icon: '📜' },
      ]
    },
    {
      name: 'Settings',
      icon: '⚙️',
      section: 'settings',
      children: [
        { name: 'Tenant Settings', href: '/settings/tenant', icon: '🏢' },
        { name: 'Rubrics', href: '/settings/rubrics', icon: '📋' },
        { name: 'Integrations', href: '/settings/integrations', icon: '🔌' },
        { name: 'Users & Roles', href: '/settings/users', icon: '👤' },
      ]
    },
  ];

  return (
    <aside
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out group`}
    >
      {/* Logo/Brand */}
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-gray-200 transition-all duration-300`}>
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-xl font-bold font-heading text-gray-900 whitespace-nowrap">
                {PLATFORM.name}
              </h1>
              <p className="text-xs text-gray-600 whitespace-nowrap">
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
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            if (item.children) {
              const isExpanded = expandedSections[item.section];
              return (
                <li key={item.name}>
                  <button
                    onClick={() => !isCollapsed && toggleSection(item.section)}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group`}
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
                        <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-200">
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

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Need Help?
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Check our documentation and guides
            </p>
            <a
              href="#"
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
