import { useState } from 'react';
import { Plug, Check, X, ExternalLink, Settings as SettingsIcon, Zap } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const IntegrationsPage = () => {
  const [integrations] = useState([
    {
      id: '1',
      name: 'Slack',
      description: 'Receive agent notifications and approvals in Slack channels',
      icon: '💬',
      category: 'Communication',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 15),
      config: { channel: '#ai-agents', notifications: true }
    },
    {
      id: '2',
      name: 'GitHub',
      description: 'Automated code review and PR analysis',
      icon: '🐙',
      category: 'Development',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 5),
      config: { repo: 'company/main-app', autoPR: true }
    },
    {
      id: '3',
      name: 'Zapier',
      description: 'Connect to 5000+ apps with automated workflows',
      icon: '⚡',
      category: 'Automation',
      status: 'available',
      lastSync: null,
      config: {}
    },
    {
      id: '4',
      name: 'Google Drive',
      description: 'Process and analyze documents from Google Drive',
      icon: '📁',
      category: 'Storage',
      status: 'available',
      lastSync: null,
      config: {}
    },
    {
      id: '5',
      name: 'Salesforce',
      description: 'Sync customer data and automated lead scoring',
      icon: '☁️',
      category: 'CRM',
      status: 'available',
      lastSync: null,
      config: {}
    },
    {
      id: '6',
      name: 'Microsoft Teams',
      description: 'Team notifications and approval workflows',
      icon: '🎯',
      category: 'Communication',
      status: 'available',
      lastSync: null,
      config: {}
    },
    {
      id: '7',
      name: 'Jira',
      description: 'Automated ticket triage and project management',
      icon: '📊',
      category: 'Project Management',
      status: 'available',
      lastSync: null,
      config: {}
    },
    {
      id: '8',
      name: 'Webhook',
      description: 'Custom webhooks for real-time event notifications',
      icon: '🔗',
      category: 'Custom',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 2),
      config: { url: 'https://api.company.com/webhook' }
    }
  ]);

  const categories = ['All', 'Communication', 'Development', 'Automation', 'Storage', 'CRM', 'Project Management', 'Custom'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIntegrations = selectedCategory === 'All'
    ? integrations
    : integrations.filter(i => i.category === selectedCategory);

  const getStatusBadge = (status) => {
    if (status === 'connected') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200 inline-flex items-center gap-1">
          <Check className="w-3 h-3" />
          Connected
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
        Available
      </span>
    );
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
            <Plug className="w-8 h-8 text-primary-600" />
            Integrations
          </h1>
          <p className="text-gray-600">
            Connect Aasim AI with your favorite tools and platforms
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Connected</div>
            <div className="text-3xl font-bold text-green-600">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Available</div>
            <div className="text-3xl font-bold text-gray-900">
              {integrations.filter(i => i.status === 'available').length}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Categories</div>
            <div className="text-3xl font-bold text-gray-900">
              {new Set(integrations.map(i => i.category)).size}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Total</div>
            <div className="text-3xl font-bold text-gray-900">{integrations.length}</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'glass-card text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{integration.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{integration.name}</h3>
                    <p className="text-xs text-gray-500">{integration.category}</p>
                  </div>
                </div>
                {getStatusBadge(integration.status)}
              </div>

              <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{integration.description}</p>

              {integration.status === 'connected' && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Last sync</div>
                  <div className="text-sm font-medium text-gray-900">
                    {integration.lastSync.toLocaleTimeString()}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                {integration.status === 'connected' ? (
                  <>
                    <button className="flex-1 glass-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold inline-flex items-center justify-center gap-2">
                      <SettingsIcon className="w-4 h-4" />
                      Configure
                    </button>
                    <button className="glass-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button className="flex-1 glass-btn-primary rounded-lg px-4 py-2 text-sm font-semibold inline-flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Webhook Configuration */}
        <div className="mt-12 glass-card rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🔗</span>
            Custom Webhook Configuration
          </h3>
          <p className="text-gray-600 mb-6">
            Configure custom webhooks to receive real-time notifications about agent events
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                placeholder="https://your-domain.com/webhook/aasim"
                className="glass-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Events to Subscribe
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['agent.completed', 'agent.failed', 'hitl.required', 'hitl.approved'].map((event) => (
                  <label key={event} className="flex items-center gap-2 glass-card rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" className="rounded text-primary-600" />
                    <span className="text-sm text-gray-700">{event}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="glass-btn-primary rounded-xl px-6 py-3 font-semibold">
                Save Webhook
              </button>
              <button className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold">
                Test Connection
              </button>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="mt-8 glass-card rounded-2xl p-8 bg-gradient-to-r from-primary-50 to-purple-50">
          <h4 className="font-bold text-gray-900 mb-2">🔑 API Keys & Authentication</h4>
          <p className="text-gray-700 text-sm mb-4">
            Need to build a custom integration? Generate API keys and access our comprehensive developer documentation.
          </p>
          <div className="flex items-center gap-3">
            <button className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center gap-2">
              Generate API Key
            </button>
            <a
              href="/agentx/developer"
              className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold inline-flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Developer Docs
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default IntegrationsPage;
