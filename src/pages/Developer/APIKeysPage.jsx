import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Modal, Textarea, Select, Alert, EmptyState } from '../../components/common';
import { APIKeyCard } from '../../components/developer';
import { Plus, Key, Shield, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const APIKeysPage = () => {
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      description: 'Main production key for live environment',
      key: 'aasim_live_4xKz7nP2mQwR8vYhF6jL9sE3tBcX1aN5',
      status: 'active',
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 335).toISOString(),
      lastUsed: new Date(Date.now() - 3600000).toISOString(),
      requestCount: 15847,
      scopes: ['agents:read', 'agents:write', 'workflows:execute'],
    },
    {
      id: '2',
      name: 'Development Key',
      description: 'Testing and development purposes',
      key: 'aasim_test_2yWm5cD1hJsU4rBnT8gK7aE9vFpL3xN6',
      status: 'active',
      createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      expiresAt: null,
      lastUsed: new Date(Date.now() - 7200000).toISOString(),
      requestCount: 3421,
      scopes: ['agents:read', 'workflows:read'],
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyData, setNewKeyData] = useState({
    name: '',
    description: '',
    expiresIn: '365',
    scopes: [],
  });

  const availableScopes = [
    { id: 'agents:read', name: 'Read Agents', description: 'View agent configurations' },
    { id: 'agents:write', name: 'Write Agents', description: 'Create and update agents' },
    { id: 'agents:delete', name: 'Delete Agents', description: 'Remove agents' },
    { id: 'workflows:read', name: 'Read Workflows', description: 'View workflows' },
    { id: 'workflows:execute', name: 'Execute Workflows', description: 'Run workflows' },
    { id: 'billing:read', name: 'Read Billing', description: 'View billing information' },
  ];

  const handleCreateKey = () => {
    if (!newKeyData.name.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }

    const newKey = {
      id: Date.now().toString(),
      name: newKeyData.name,
      description: newKeyData.description,
      key: `aasim_live_${Math.random().toString(36).substring(2, 34)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: newKeyData.expiresIn === 'never'
        ? null
        : new Date(Date.now() + parseInt(newKeyData.expiresIn) * 86400000).toISOString(),
      lastUsed: null,
      requestCount: 0,
      scopes: newKeyData.scopes,
    };

    setApiKeys([...apiKeys, newKey]);
    setIsCreateModalOpen(false);
    setNewKeyData({ name: '', description: '', expiresIn: '365', scopes: [] });
    toast.success('API key created successfully');
  };

  const handleRotateKey = (keyId) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === keyId
          ? {
              ...key,
              key: `aasim_live_${Math.random().toString(36).substring(2, 34)}`,
              createdAt: new Date().toISOString(),
            }
          : key
      )
    );
    toast.success('API key rotated successfully');
  };

  const handleDeleteKey = (keyId) => {
    setApiKeys(apiKeys.filter((key) => key.id !== keyId));
    toast.success('API key deleted');
  };

  const handleToggleScope = (scopeId) => {
    setNewKeyData((prev) => ({
      ...prev,
      scopes: prev.scopes.includes(scopeId)
        ? prev.scopes.filter((s) => s !== scopeId)
        : [...prev.scopes, scopeId],
    }));
  };

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
              API Keys
            </h1>
            <p className="text-lg text-gray-600">
              Manage API keys for programmatic access to Aasim
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Create API Key
          </Button>
        </div>

        {/* Security Alert */}
        <Alert variant="warning" title="Security Best Practices">
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Never share your API keys or commit them to version control</li>
            <li>• Use environment variables to store keys securely</li>
            <li>• Rotate keys regularly and delete unused keys</li>
            <li>• Use scoped keys with minimum required permissions</li>
          </ul>
        </Alert>

        {/* API Keys Grid */}
        {apiKeys.length === 0 ? (
          <EmptyState
            icon={Key}
            title="No API Keys"
            description="Create your first API key to start making authenticated requests"
            action={
              <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
                <Plus className="w-5 h-5 mr-2" />
                Create API Key
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {apiKeys.map((apiKey) => (
              <APIKeyCard
                key={apiKey.id}
                apiKey={apiKey}
                onRotate={handleRotateKey}
                onDelete={handleDeleteKey}
              />
            ))}
          </div>
        )}

        {/* Create Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create API Key"
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Key Name"
              value={newKeyData.name}
              onChange={(e) => setNewKeyData({ ...newKeyData, name: e.target.value })}
              placeholder="e.g., Production API Key"
              required
            />

            <Textarea
              label="Description (Optional)"
              value={newKeyData.description}
              onChange={(e) => setNewKeyData({ ...newKeyData, description: e.target.value })}
              placeholder="Describe what this key will be used for"
              rows={3}
            />

            <Select
              label="Expiration"
              value={newKeyData.expiresIn}
              onChange={(e) => setNewKeyData({ ...newKeyData, expiresIn: e.target.value })}
            >
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
              <option value="never">Never expires</option>
            </Select>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Permissions
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableScopes.map((scope) => (
                  <div
                    key={scope.id}
                    onClick={() => handleToggleScope(scope.id)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      newKeyData.scopes.includes(scope.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={newKeyData.scopes.includes(scope.id)}
                        onChange={() => {}}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{scope.name}</p>
                        <p className="text-sm text-gray-600">{scope.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <Shield className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-gray-600">
                Selected permissions: {newKeyData.scopes.length} scope{newKeyData.scopes.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={() => setIsCreateModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateKey}
                variant="primary"
                className="flex-1"
                disabled={!newKeyData.name.trim()}
              >
                <Key className="w-4 h-4 mr-2" />
                Create Key
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default APIKeysPage;
