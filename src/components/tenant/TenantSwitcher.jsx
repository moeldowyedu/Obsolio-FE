import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Check, Settings, Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const TenantSwitcher = ({ currentTenant, tenants = [], onSwitch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSwitch = (tenant) => {
    onSwitch(tenant);
    setIsOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return 'W';
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
          ${theme === 'dark'
            ? 'bg-white/5 border border-white/10 hover:bg-white/10'
            : 'bg-white border border-slate-200 hover:bg-slate-50 shadow-sm'
          }
        `}
      >
        {/* Workspace Avatar */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
          {getInitials(currentTenant?.name)}
        </div>

        {/* Workspace Info */}
        <div className="text-left flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {currentTenant?.name || 'Select Workspace'}
          </p>
          <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
            {currentTenant?.plan || 'No plan'} {currentTenant?.type && `• ${currentTenant.type}`}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown
          className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className={`
            absolute top-full mt-2 w-80 rounded-xl shadow-2xl z-50 overflow-hidden border
            ${theme === 'dark'
              ? 'bg-[#1e293b] border-white/10'
              : 'bg-white border-slate-200'
            }
          `}>
            {/* Header */}
            <div className={`p-3 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
              <p className={`text-xs font-semibold uppercase tracking-wider px-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                Your Workspaces
              </p>
            </div>

            {/* Workspaces List */}
            <div className="max-h-72 overflow-y-auto">
              {tenants.length > 0 ? (
                tenants.map((tenant) => (
                  <button
                    key={tenant.id}
                    onClick={() => handleSwitch(tenant)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 transition-colors text-left
                      ${tenant.id === currentTenant?.id
                        ? (theme === 'dark' ? 'bg-primary-500/10' : 'bg-primary-50')
                        : (theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50')
                      }
                    `}
                  >
                    {/* Workspace Avatar */}
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0
                      ${tenant.id === currentTenant?.id
                        ? 'bg-gradient-to-br from-primary-500 to-purple-600 shadow-lg shadow-primary-500/30'
                        : 'bg-gradient-to-br from-primary-400 to-purple-500'
                      }
                    `}>
                      {getInitials(tenant.name)}
                    </div>

                    {/* Workspace Details */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {tenant.name}
                      </p>
                      <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                        {tenant.subdomain}.obsolio.com • {tenant.plan}
                      </p>
                    </div>

                    {/* Selected Checkmark */}
                    {tenant.id === currentTenant?.id && (
                      <Check className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    )}
                  </button>
                ))
              ) : (
                <div className={`p-6 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                  <p className="text-sm">No workspaces available</p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className={`p-2 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
              <button
                onClick={() => {
                  navigate('/workspace/create');
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center gap-2
                  ${theme === 'dark'
                    ? 'text-primary-400 hover:bg-white/5'
                    : 'text-primary-600 hover:bg-primary-50'
                  }
                `}
              >
                <Plus className="w-4 h-4" />
                Create New Workspace
              </button>
              <button
                onClick={() => {
                  navigate('/settings/tenant');
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center gap-2
                  ${theme === 'dark'
                    ? 'text-gray-400 hover:bg-white/5'
                    : 'text-slate-600 hover:bg-slate-50'
                  }
                `}
              >
                <Settings className="w-4 h-4" />
                Workspace Settings
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TenantSwitcher;
