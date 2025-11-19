import { useState } from 'react';

const Tabs = ({
  tabs = [],
  defaultTab,
  onChange,
  variant = 'default',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const variants = {
    default: {
      container: 'border-b border-gray-200',
      tab: 'px-4 py-2 border-b-2 font-medium text-sm transition-colors',
      active: 'border-primary-600 text-primary-600',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
    pills: {
      container: 'bg-gray-100 p-1 rounded-lg',
      tab: 'px-4 py-2 rounded-md font-medium text-sm transition-colors',
      active: 'bg-white text-gray-900 shadow-sm',
      inactive: 'text-gray-600 hover:text-gray-900',
    },
    underlined: {
      container: '',
      tab: 'px-4 py-2 border-b-2 font-medium text-sm transition-colors',
      active: 'border-primary-600 text-primary-600',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700',
    },
  };

  const config = variants[variant];

  return (
    <div className={className}>
      <div className={`flex gap-1 ${config.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            disabled={tab.disabled}
            className={`${config.tab} ${
              activeTab === tab.id ? config.active : config.inactive
            } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-secondary-700 rounded-full">
                  {tab.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      {activeTabContent && (
        <div className="mt-4">{activeTabContent}</div>
      )}
    </div>
  );
};

export default Tabs;
