import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal, Key, Copy, Eye, EyeOff, Plus, Trash2, CheckCircle,
  XCircle, Webhook, Download, Book, Code, Database, Zap, Activity,
  AlertCircle, Clock, TrendingUp
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { formatRelativeTime, formatDate } from '../../utils/formatters';

const DeveloperPortalPage = () => {
  const [activeTab, setActiveTab] = useState('api-keys');
  const [showKey, setShowKey] = useState({});
  const [codeTab, setCodeTab] = useState('python');

  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production Key',
      key: 'sk_live_1a2b3c4d5e6f7g8h9i0j',
      created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
      lastUsed: new Date(Date.now() - 1000 * 60 * 30),
      calls: 128543,
      status: 'active'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'sk_test_9i8h7g6f5e4d3c2b1a0j',
      created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
      lastUsed: new Date(Date.now() - 1000 * 60 * 5),
      calls: 45678,
      status: 'active'
    },
    {
      id: '3',
      name: 'Staging Key',
      key: 'sk_stag_5k4j3h2g1f0e9d8c7b6a',
      created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2),
      calls: 12340,
      status: 'active'
    }
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: '1',
      url: 'https://api.yourcompany.com/webhooks/agents',
      events: ['agent.run.completed', 'agent.run.failed', 'agent.hitl.required'],
      status: 'active',
      created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      lastTriggered: new Date(Date.now() - 1000 * 60 * 10),
      deliveries: 5420,
      successRate: 99.8
    },
    {
      id: '2',
      url: 'https://hooks.slack.com/services/T00000000/B00000000',
      events: ['agent.run.failed', 'agent.hitl.required'],
      status: 'active',
      created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      lastTriggered: new Date(Date.now() - 1000 * 60 * 45),
      deliveries: 892,
      successRate: 100.0
    }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: '1',
      method: 'POST',
      endpoint: '/agents/run',
      status: 200,
      responseTime: 285,
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      apiKey: 'Production Key'
    },
    {
      id: '2',
      method: 'GET',
      endpoint: '/agents/agent-123',
      status: 200,
      responseTime: 45,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      apiKey: 'Development Key'
    },
    {
      id: '3',
      method: 'POST',
      endpoint: '/agents/run',
      status: 200,
      responseTime: 312,
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      apiKey: 'Production Key'
    },
    {
      id: '4',
      method: 'GET',
      endpoint: '/runs/run-456',
      status: 200,
      responseTime: 52,
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      apiKey: 'Production Key'
    },
    {
      id: '5',
      method: 'POST',
      endpoint: '/webhooks',
      status: 201,
      responseTime: 78,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      apiKey: 'Development Key'
    },
    {
      id: '6',
      method: 'POST',
      endpoint: '/agents/run',
      status: 429,
      responseTime: 15,
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      apiKey: 'Development Key'
    },
    {
      id: '7',
      method: 'GET',
      endpoint: '/agents',
      status: 200,
      responseTime: 125,
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      apiKey: 'Production Key'
    },
    {
      id: '8',
      method: 'POST',
      endpoint: '/agents/run',
      status: 500,
      responseTime: 1250,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      apiKey: 'Staging Key'
    },
    {
      id: '9',
      method: 'DELETE',
      endpoint: '/webhooks/webhook-789',
      status: 204,
      responseTime: 42,
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      apiKey: 'Development Key'
    },
    {
      id: '10',
      method: 'GET',
      endpoint: '/runs/run-789',
      status: 404,
      responseTime: 28,
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
      apiKey: 'Development Key'
    }
  ]);

  const handleCreateApiKey = () => {
    const keyName = prompt('Enter a name for your new API key:');
    if (keyName) {
      const newKey = {
        id: String(Date.now()),
        name: keyName,
        key: `sk_live_${Math.random().toString(36).substr(2, 20)}`,
        created: new Date(),
        lastUsed: null,
        calls: 0,
        status: 'active'
      };
      setApiKeys([...apiKeys, newKey]);
    }
  };

  const handleRevokeKey = (keyId) => {
    if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    alert('API key copied to clipboard!');
  };

  const toggleShowKey = (keyId) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const maskKey = (key) => {
    return `${key.substring(0, 12)}${'•'.repeat(20)}`;
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-blue-100 text-blue-700',
      POST: 'bg-green-100 text-green-700',
      PUT: 'bg-yellow-100 text-yellow-700',
      DELETE: 'bg-red-100 text-red-700',
      PATCH: 'bg-purple-100 text-purple-700'
    };
    return colors[method] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 400 && status < 500) return 'text-yellow-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const codeExamples = {
    python: `# Install the Aasim SDK
# pip install aasim-python

from aasim import Aasim

# Initialize client
client = Aasim(api_key='your-api-key-here')

# Run an agent
result = client.agents.run(
    agent_id='agent-123',
    input={
        'document': 'https://example.com/doc.pdf',
        'parameters': {
            'extract_fields': ['invoice_number', 'total', 'date']
        }
    }
)

print(f"Status: {result.status}")
print(f"Output: {result.output}")`,

    javascript: `// Install the Aasim SDK
// npm install @aasim/sdk

const Aasim = require('@aasim/sdk');

// Initialize client
const client = new Aasim({
  apiKey: 'your-api-key-here'
});

// Run an agent
const result = await client.agents.run({
  agentId: 'agent-123',
  input: {
    document: 'https://example.com/doc.pdf',
    parameters: {
      extractFields: ['invoice_number', 'total', 'date']
    }
  }
});

console.log('Status:', result.status);
console.log('Output:', result.output);`,

    curl: `# Run an agent using cURL
curl -X POST https://api.aasim.ai/v1/agents/run \\
  -H "Authorization: Bearer your-api-key-here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "agent-123",
    "input": {
      "document": "https://example.com/doc.pdf",
      "parameters": {
        "extract_fields": ["invoice_number", "total", "date"]
      }
    }
  }'

# Get run status
curl -X GET https://api.aasim.ai/v1/runs/run-456 \\
  -H "Authorization: Bearer your-api-key-here"`
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-secondary-900">Developer Portal</h1>
            </div>
            <p className="text-secondary-600">
              Build, integrate, and extend Aasim AI Agents with our comprehensive developer tools
            </p>
          </div>
          <a
            href="https://docs.aasim.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 inline-flex items-center gap-2"
          >
            <Book className="w-5 h-5" />
            View Documentation
          </a>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">API Calls (30d)</div>
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">186.5K</div>
            <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              23% from last month
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Active API Keys</div>
              <Key className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{apiKeys.length}</div>
            <div className="text-xs text-gray-500 mt-1">Production & Development</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Webhook Events</div>
              <Webhook className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">6.3K</div>
            <div className="text-xs text-green-600 mt-1">99.8% success rate</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Avg Latency</div>
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">285ms</div>
            <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 rotate-180" />
              15% improvement
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: 'api-keys', label: 'API Keys', icon: Key },
                { id: 'webhooks', label: 'Webhooks', icon: Webhook },
                { id: 'sdk', label: 'SDKs', icon: Code },
                { id: 'code-examples', label: 'Code Examples', icon: Terminal },
                { id: 'activity', label: 'Recent Activity', icon: Activity }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {/* API Keys Tab */}
            {activeTab === 'api-keys' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-900 mb-2">API Keys</h2>
                    <p className="text-secondary-600">
                      Manage your API keys to authenticate requests to the Aasim API
                    </p>
                  </div>
                  <button
                    onClick={handleCreateApiKey}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create New Key
                  </button>
                </div>

                {/* Rate Limits */}
                <div className="glass-card rounded-xl p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary-900 mb-2">Rate Limits</h3>
                      <div className="grid grid-cols-3 gap-6 text-sm">
                        <div>
                          <div className="text-secondary-600 mb-1">Requests per minute</div>
                          <div className="text-2xl font-bold text-secondary-900">1,000</div>
                        </div>
                        <div>
                          <div className="text-secondary-600 mb-1">Concurrent requests</div>
                          <div className="text-2xl font-bold text-secondary-900">100</div>
                        </div>
                        <div>
                          <div className="text-secondary-600 mb-1">Monthly quota</div>
                          <div className="text-2xl font-bold text-secondary-900">1M</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* API Keys List */}
                <div className="space-y-3">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="glass-card rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-secondary-900">{apiKey.name}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                              Active
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <code className="text-sm bg-gray-100 px-3 py-2 rounded-lg font-mono">
                              {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                            </code>
                            <button
                              onClick={() => toggleShowKey(apiKey.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              {showKey[apiKey.id] ? (
                                <EyeOff className="w-4 h-4 text-secondary-600" />
                              ) : (
                                <Eye className="w-4 h-4 text-secondary-600" />
                              )}
                            </button>
                            <button
                              onClick={() => handleCopyKey(apiKey.key)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Copy className="w-4 h-4 text-secondary-600" />
                            </button>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-secondary-600">
                            <div>Created {formatDate(apiKey.created, 'short')}</div>
                            <div>•</div>
                            <div>Last used {apiKey.lastUsed ? formatRelativeTime(apiKey.lastUsed) : 'Never'}</div>
                            <div>•</div>
                            <div>{apiKey.calls.toLocaleString()} API calls</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRevokeKey(apiKey.id)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Revoke
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Webhooks Tab */}
            {activeTab === 'webhooks' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-900 mb-2">Webhooks</h2>
                    <p className="text-secondary-600">
                      Configure webhooks to receive real-time notifications about agent events
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 inline-flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Webhook
                  </button>
                </div>

                {/* Available Events */}
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-bold text-secondary-900 mb-4">Available Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { event: 'agent.run.completed', desc: 'Agent successfully completed execution' },
                      { event: 'agent.run.failed', desc: 'Agent execution failed' },
                      { event: 'agent.hitl.required', desc: 'Human review required' },
                      { event: 'agent.hitl.approved', desc: 'Human approved the result' },
                      { event: 'agent.hitl.rejected', desc: 'Human rejected the result' },
                      { event: 'agent.deployed', desc: 'New agent deployed' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <code className="text-sm font-semibold text-secondary-900">{item.event}</code>
                          <p className="text-xs text-secondary-600 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Webhooks List */}
                <div className="space-y-3">
                  {webhooks.map((webhook) => (
                    <div key={webhook.id} className="glass-card rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <code className="text-lg font-bold text-secondary-900">{webhook.url}</code>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                              Active
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {webhook.events.map((event, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium"
                              >
                                {event}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-secondary-600">
                            <div>{webhook.deliveries.toLocaleString()} deliveries</div>
                            <div>•</div>
                            <div className="text-green-600">{webhook.successRate}% success rate</div>
                            <div>•</div>
                            <div>Last triggered {formatRelativeTime(webhook.lastTriggered)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50">
                            Edit
                          </button>
                          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SDKs Tab */}
            {activeTab === 'sdk' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">Official SDKs & Libraries</h2>
                  <p className="text-secondary-600 mb-6">
                    Download and integrate our official SDKs for your preferred programming language
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Python',
                      icon: '🐍',
                      install: 'pip install aasim-python',
                      docs: 'https://docs.aasim.ai/python',
                      color: 'from-blue-500 to-blue-600'
                    },
                    {
                      name: 'JavaScript / Node.js',
                      icon: '📦',
                      install: 'npm install @aasim/sdk',
                      docs: 'https://docs.aasim.ai/javascript',
                      color: 'from-yellow-500 to-yellow-600'
                    },
                    {
                      name: 'Java',
                      icon: '☕',
                      install: 'maven: com.aasim:aasim-java',
                      docs: 'https://docs.aasim.ai/java',
                      color: 'from-red-500 to-red-600'
                    },
                    {
                      name: 'Ruby',
                      icon: '💎',
                      install: 'gem install aasim',
                      docs: 'https://docs.aasim.ai/ruby',
                      color: 'from-pink-500 to-pink-600'
                    },
                    {
                      name: 'PHP',
                      icon: '🐘',
                      install: 'composer require aasim/sdk',
                      docs: 'https://docs.aasim.ai/php',
                      color: 'from-purple-500 to-purple-600'
                    },
                    {
                      name: 'Go',
                      icon: '🔵',
                      install: 'go get github.com/aasim/aasim-go',
                      docs: 'https://docs.aasim.ai/go',
                      color: 'from-cyan-500 to-cyan-600'
                    }
                  ].map((sdk, index) => (
                    <div key={index} className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${sdk.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                          {sdk.icon}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-secondary-900 mb-1">{sdk.name}</h3>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-secondary-700">
                            {sdk.install}
                          </code>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={sdk.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 text-center"
                        >
                          View Docs
                        </a>
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Install
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Examples Tab */}
            {activeTab === 'code-examples' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">Code Examples</h2>
                  <p className="text-secondary-600 mb-6">
                    Real-world examples to help you get started quickly
                  </p>
                </div>

                {/* Language Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                  {['python', 'javascript', 'curl'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeTab(lang)}
                      className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                        codeTab === lang
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {lang === 'python' && 'Python'}
                      {lang === 'javascript' && 'JavaScript'}
                      {lang === 'curl' && 'cURL'}
                    </button>
                  ))}
                </div>

                {/* Code Block */}
                <div className="relative">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(codeExamples[codeTab]);
                      alert('Code copied to clipboard!');
                    }}
                    className="absolute top-4 right-4 px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 flex items-center gap-2 z-10"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono">
                      {codeExamples[codeTab]}
                    </pre>
                  </div>
                </div>

                {/* API Base URL */}
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-bold text-secondary-900 mb-3">Base URL</h3>
                  <code className="bg-gray-100 px-4 py-2 rounded-lg text-sm block">
                    https://api.aasim.ai/v1
                  </code>
                  <p className="text-sm text-secondary-600 mt-3">
                    All API requests should be made to this base URL with your API key in the Authorization header.
                  </p>
                </div>
              </div>
            )}

            {/* Recent Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">Recent API Activity</h2>
                  <p className="text-secondary-600 mb-6">
                    Monitor your latest API calls and their performance
                  </p>
                </div>

                {/* Activity Log */}
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Method</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Endpoint</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Response Time</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">API Key</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentActivity.map((activity) => (
                          <tr key={activity.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(activity.method)}`}>
                                {activity.method}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <code className="text-sm text-secondary-900">{activity.endpoint}</code>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-sm font-semibold ${getStatusColor(activity.status)}`}>
                                {activity.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-secondary-900">{activity.responseTime}ms</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                              {activity.apiKey}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                              {formatRelativeTime(activity.timestamp)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeveloperPortalPage;
