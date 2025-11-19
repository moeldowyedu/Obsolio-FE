import { useState } from 'react';
import { Plus, Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';

const APIKeysPage = () => {
  const [showKey, setShowKey] = useState({});

  const [apiKeys] = useState([
    {
      id: 1,
      name: 'Production API Key',
      key: 'aas_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
      created: '2024-01-10',
      lastUsed: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'aas_dev_yyyyyyyyyyyyyyyyyyyyyyyyyy',
      created: '2024-01-05',
      lastUsed: '1 day ago',
      status: 'active'
    }
  ]);

  const toggleShowKey = (id) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">API Keys</h1>
          <p className="text-secondary-600">
            Manage your API keys for programmatic access
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <Button icon={<Plus className="w-4 h-4" />}>
            Create API Key
          </Button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card key={apiKey.id}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {apiKey.name}
                      </h3>
                      <Badge color="green">{apiKey.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono">
                        {showKey[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••••••••'}
                      </code>
                      <button
                        onClick={() => toggleShowKey(apiKey.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {showKey[apiKey.id] ? (
                          <EyeOff className="w-4 h-4 text-secondary-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-secondary-600" />
                        )}
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Copy className="w-4 h-4 text-secondary-600" />
                      </button>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<Trash2 className="w-4 h-4" />}
                  >
                    Revoke
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Created</p>
                    <p className="font-medium text-secondary-900">{apiKey.created}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Used</p>
                    <p className="font-medium text-secondary-900">{apiKey.lastUsed}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default APIKeysPage;
