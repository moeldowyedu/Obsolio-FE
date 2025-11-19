import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TenantSwitcher = ({ currentTenant, tenants, onSwitch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSwitch = (tenant) => {
    onSwitch(tenant);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          {currentTenant?.name?.charAt(0) || 'T'}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-secondary-900">{currentTenant?.name || 'Select Tenant'}</p>
          <p className="text-xs text-gray-500">{currentTenant?.plan || 'No plan'}</p>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
                Switch Tenant
              </p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {tenants.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => handleSwitch(tenant)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    tenant.id === currentTenant?.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {tenant.name.charAt(0)}
                  </div>
                  <div className="flex-grow text-left">
                    <p className="text-sm font-medium text-secondary-900">{tenant.name}</p>
                    <p className="text-xs text-gray-500">{tenant.plan}</p>
                  </div>
                  {tenant.id === currentTenant?.id && (
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <div className="p-2 border-t border-gray-200">
              <button
                onClick={() => {
                  navigate('/settings/tenant');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors text-left"
              >
                Manage Tenants
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TenantSwitcher;
