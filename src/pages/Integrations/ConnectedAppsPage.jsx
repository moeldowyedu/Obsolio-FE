import { useState } from 'react';
import { Plus, Search, CheckCircle, XCircle } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';

const ConnectedAppsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [connectedApps] = useState([
    {
      id: 1,
      name: 'Slack',
      description: 'Team communication and collaboration',
      status: 'connected',
      connectedAt: '2024-01-10',
      lastSync: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Google Drive',
      description: 'Cloud storage and file management',
      status: 'connected',
      connectedAt: '2024-01-08',
      lastSync: '1 hour ago'
    },
    {
      id: 3,
      name: 'Salesforce',
      description: 'CRM and customer management',
      status: 'error',
      connectedAt: '2024-01-05',
      lastSync: '3 days ago',
      error: 'Authentication expired'
    }
  ]);

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Connected Apps</h1>
          <p className="text-secondary-600">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <Button icon={<Plus className="w-4 h-4" />}>
            Connect New App
          </Button>
        </div>

        {/* Connected Apps List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connectedApps.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {app.name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                        {app.name}
                      </h3>
                      <p className="text-sm text-secondary-600">{app.description}</p>
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
                    <p className="text-sm font-medium text-secondary-900">
                      {app.connectedAt}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Sync</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {app.lastSync}
                    </p>
                  </div>
                </div>

                {app.error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <p className="text-sm text-red-800">{app.error}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  {app.status === 'error' ? (
                    <Button size="sm">Reconnect</Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Disconnect
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ConnectedAppsPage;
