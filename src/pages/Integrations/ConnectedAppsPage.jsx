import { useState } from 'react';
import { Plus, Search, CheckCircle, XCircle, Settings, Zap } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const ConnectedAppsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [managingApp, setManagingApp] = useState(null);
  const [disconnectingApp, setDisconnectingApp] = useState(null);
  const [selectedAppToConnect, setSelectedAppToConnect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [connectedApps, setConnectedApps] = useState([
    {
      id: 1,
      name: 'Slack',
      description: 'Team communication and collaboration',
      status: 'connected',
      connectedAt: '2024-01-10',
      lastSync: '2 minutes ago',
      icon: '💬',
      permissions: ['channels:read', 'chat:write', 'users:read']
    },
    {
      id: 2,
      name: 'Google Drive',
      description: 'Cloud storage and file management',
      status: 'connected',
      connectedAt: '2024-01-08',
      lastSync: '1 hour ago',
      icon: '📁',
      permissions: ['drive.file', 'drive.readonly']
    },
    {
      id: 3,
      name: 'Salesforce',
      description: 'CRM and customer management',
      status: 'error',
      connectedAt: '2024-01-05',
      lastSync: '3 days ago',
      error: 'Authentication expired',
      icon: '☁️',
      permissions: ['api', 'chatter_api']
    }
  ]);

  const [availableApps] = useState([
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and collaboration',
      icon: '💬',
      category: 'Communication',
      permissions: [
        { id: 'channels:read', label: 'Read channels', required: true },
        { id: 'chat:write', label: 'Send messages', required: true },
        { id: 'users:read', label: 'View users', required: false },
        { id: 'files:write', label: 'Upload files', required: false }
      ]
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      description: 'Cloud storage and file management',
      icon: '📁',
      category: 'Storage',
      permissions: [
        { id: 'drive.file', label: 'Manage files', required: true },
        { id: 'drive.readonly', label: 'View files', required: false },
        { id: 'drive.metadata', label: 'View metadata', required: false }
      ]
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM and customer management',
      icon: '☁️',
      category: 'CRM',
      permissions: [
        { id: 'api', label: 'Full API access', required: true },
        { id: 'chatter_api', label: 'Chatter access', required: false },
        { id: 'refresh_token', label: 'Offline access', required: true }
      ]
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Code repository and version control',
      icon: '🐙',
      category: 'Development',
      permissions: [
        { id: 'repo', label: 'Repository access', required: true },
        { id: 'user', label: 'User data', required: false },
        { id: 'workflow', label: 'Workflow access', required: false }
      ]
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Project management and issue tracking',
      icon: '📊',
      category: 'Project Management',
      permissions: [
        { id: 'read:jira-work', label: 'Read issues', required: true },
        { id: 'write:jira-work', label: 'Create/update issues', required: true },
        { id: 'read:jira-user', label: 'Read user data', required: false }
      ]
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Workflow automation platform',
      icon: '⚡',
      category: 'Automation',
      permissions: [
        { id: 'zaps:read', label: 'Read Zaps', required: true },
        { id: 'zaps:write', label: 'Create Zaps', required: true }
      ]
    }
  ]);

  const [connectFormData, setConnectFormData] = useState({
    permissions: []
  });

  const handleOpenConnectModal = () => {
    setIsConnectModalOpen(true);
  };

  const handleSelectAppToConnect = (app) => {
    const requiredPermissions = app.permissions
      .filter(p => p.required)
      .map(p => p.id);

    setSelectedAppToConnect(app);
    setConnectFormData({
      permissions: requiredPermissions
    });
  };

  const handleConnectApp = async (e) => {
    e.preventDefault();

    if (!selectedAppToConnect) {
      alert('Please select an app to connect');
      return;
    }

    // Check if required permissions are selected
    const requiredPerms = selectedAppToConnect.permissions
      .filter(p => p.required)
      .map(p => p.id);

    const hasAllRequired = requiredPerms.every(p =>
      connectFormData.permissions.includes(p)
    );

    if (!hasAllRequired) {
      alert('Please grant all required permissions');
      return;
    }

    setIsLoading(true);

    // Simulate OAuth flow
    setTimeout(() => {
      const newApp = {
        id: connectedApps.length + 1,
        name: selectedAppToConnect.name,
        description: selectedAppToConnect.description,
        icon: selectedAppToConnect.icon,
        status: 'connected',
        connectedAt: new Date().toISOString().split('T')[0],
        lastSync: 'Just now',
        permissions: connectFormData.permissions
      };

      setConnectedApps([...connectedApps, newApp]);
      setIsConnectModalOpen(false);
      setSelectedAppToConnect(null);
      setIsLoading(false);
      alert(`Successfully connected to ${selectedAppToConnect.name}!`);
    }, 1500);
  };

  const handleManageApp = (app) => {
    setManagingApp(app);
    setConnectFormData({
      permissions: app.permissions || []
    });
    setIsManageModalOpen(true);
  };

  const handleUpdateAppSettings = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      const updatedApp = {
        ...managingApp,
        permissions: connectFormData.permissions,
        lastSync: 'Just now'
      };

      setConnectedApps(connectedApps.map(a =>
        a.id === managingApp.id ? updatedApp : a
      ));
      setIsManageModalOpen(false);
      setManagingApp(null);
      setIsLoading(false);
      alert('App settings updated successfully!');
    }, 500);
  };

  const handleDisconnectApp = (app) => {
    setDisconnectingApp(app);
    setIsDisconnectModalOpen(true);
  };

  const handleConfirmDisconnect = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setConnectedApps(connectedApps.filter(a => a.id !== disconnectingApp.id));
      setIsDisconnectModalOpen(false);
      setDisconnectingApp(null);
      setIsLoading(false);
    }, 500);
  };

  const handleReconnect = async (app) => {
    setIsLoading(true);

    // Simulate re-authentication
    setTimeout(() => {
      setConnectedApps(connectedApps.map(a =>
        a.id === app.id
          ? { ...a, status: 'connected', error: undefined, lastSync: 'Just now' }
          : a
      ));
      setIsLoading(false);
      alert(`Successfully reconnected to ${app.name}!`);
    }, 1500);
  };

  const handlePermissionToggle = (permissionId) => {
    if (connectFormData.permissions.includes(permissionId)) {
      setConnectFormData({
        ...connectFormData,
        permissions: connectFormData.permissions.filter(p => p !== permissionId)
      });
    } else {
      setConnectFormData({
        ...connectFormData,
        permissions: [...connectFormData.permissions, permissionId]
      });
    }
  };

  const filteredApps = connectedApps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unconnectedApps = availableApps.filter(available =>
    !connectedApps.some(connected =>
      connected.name.toLowerCase() === available.name.toLowerCase()
    )
  );

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Connected Apps</h1>
          <p className="text-gray-400">
            Manage your integrated third-party applications
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search connected apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <Button onClick={handleOpenConnectModal} icon={<Plus className="w-4 h-4" />}>
            Connect New App
          </Button>
        </div>

        {/* Connected Apps List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                        <span className="text-3xl">
                          {app.icon || app.name[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {app.name}
                        </h3>
                        <p className="text-sm text-gray-400">{app.description}</p>
                      </div>
                    </div>
                    {app.status === 'connected' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Connected</p>
                      <p className="text-sm font-medium text-white">
                        {app.connectedAt}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Sync</p>
                      <p className="text-sm font-medium text-white">
                        {app.lastSync}
                      </p>
                    </div>
                  </div>

                  {app.error && (
                    <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg mb-4">
                      <p className="text-sm text-red-300">{app.error}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                    {app.status === 'error' ? (
                      <Button
                        size="sm"
                        onClick={() => handleReconnect(app)}
                        disabled={isLoading}
                      >
                        Reconnect
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleManageApp(app)}
                        icon={<Settings className="w-4 h-4" />}
                      >
                        Manage
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDisconnectApp(app)}
                      disabled={isLoading}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-400">No connected apps found. Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Connect New App Modal */}
        {isConnectModalOpen && !selectedAppToConnect && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsConnectModalOpen(false)}
            />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative glass-card w-full max-w-4xl transform transition-all">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Connect New App
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Choose an application to connect with Obsolio
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                    {unconnectedApps.map((app) => (
                      <Card
                        key={app.id}
                        className="cursor-pointer hover:shadow-lg transition-all hover:border-primary-300"
                        onClick={() => handleSelectAppToConnect(app)}
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                              <span className="text-3xl">{app.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white">
                                {app.name}
                              </h3>
                              <Badge color="blue" className="mt-1">
                                {app.category}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">
                            {app.description}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {unconnectedApps.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400">
                        All available apps are already connected!
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setIsConnectModalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configure App Connection Modal */}
        {selectedAppToConnect && (
          <FormModal
            isOpen={true}
            onClose={() => {
              setSelectedAppToConnect(null);
              setIsConnectModalOpen(false);
            }}
            onSubmit={handleConnectApp}
            title={`Connect ${selectedAppToConnect.name}`}
            submitText="Authorize & Connect"
            isLoading={isLoading}
            size="lg"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">{selectedAppToConnect.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    {selectedAppToConnect.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedAppToConnect.description}
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-200 mb-2 font-medium">
                  Authorization Required
                </p>
                <p className="text-sm text-blue-100">
                  You'll be redirected to {selectedAppToConnect.name} to authorize Obsolio.
                  Please grant the required permissions to continue.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Permissions Requested
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto p-3 bg-white/5 rounded-xl border border-white/10">
                  {selectedAppToConnect.permissions.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-start gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={connectFormData.permissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        disabled={permission.required}
                        className="mt-0.5 w-4 h-4 text-primary-600 border-white/20 rounded focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">
                            {permission.label}
                          </span>
                          {permission.required && (
                            <Badge color="red" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {permission.id}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4">
                <div className="flex gap-2">
                  <span className="text-yellow-600 text-lg">⚠️</span>
                  <p className="text-sm text-yellow-200">
                    By connecting this app, you authorize Obsolio to access your{' '}
                    {selectedAppToConnect.name} data according to the selected permissions.
                    You can revoke access at any time.
                  </p>
                </div>
              </div>
            </div>
          </FormModal>
        )}

        {/* Manage App Settings Modal */}
        {managingApp && (
          <FormModal
            isOpen={isManageModalOpen}
            onClose={() => {
              setIsManageModalOpen(false);
              setManagingApp(null);
            }}
            onSubmit={handleUpdateAppSettings}
            title={`Manage ${managingApp.name}`}
            submitText="Update Settings"
            isLoading={isLoading}
            size="lg"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">{managingApp.icon || managingApp.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    {managingApp.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge color="green">Connected</Badge>
                    <span className="text-xs text-gray-400">
                      Since {managingApp.connectedAt}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Active Permissions
                </label>
                <div className="space-y-2 p-4 bg-white/5 rounded-xl">
                  {managingApp.permissions && managingApp.permissions.length > 0 ? (
                    managingApp.permissions.map((perm) => (
                      <div key={perm} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-300">{perm}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No permissions configured</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-blue-900/20 border border-blue-800 rounded-xl">
                <div>
                  <p className="text-xs text-blue-300 mb-1">Last Synced</p>
                  <p className="text-sm font-medium text-blue-100">{managingApp.lastSync}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-300 mb-1">Status</p>
                  <Badge color={managingApp.status === 'connected' ? 'green' : 'red'}>
                    {managingApp.status}
                  </Badge>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-400">
                  To modify permissions, you'll need to reconnect the app. Contact support
                  for advanced configuration options.
                </p>
              </div>
            </div>
          </FormModal>
        )}

        {/* Disconnect Confirmation */}
        <ConfirmDialog
          isOpen={isDisconnectModalOpen}
          onClose={() => {
            setIsDisconnectModalOpen(false);
            setDisconnectingApp(null);
          }}
          onConfirm={handleConfirmDisconnect}
          title="Disconnect App"
          message={
            disconnectingApp
              ? `Are you sure you want to disconnect "${disconnectingApp.name}"?\n\nThis will revoke Obsolio's access to your ${disconnectingApp.name} account. Any workflows or agents using this integration will stop working.`
              : ''
          }
          confirmText="Disconnect App"
          confirmVariant="danger"
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  );
};

export default ConnectedAppsPage;
