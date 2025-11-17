import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Book, Terminal, Zap, FileCode, Database, Webhook, Key } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const DeveloperPortalPage = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'api-docs', label: 'API Documentation', icon: Book },
    { id: 'sdk', label: 'SDKs & Libraries', icon: Code },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'examples', label: 'Code Examples', icon: FileCode },
  ];

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
            <Terminal className="w-8 h-8 text-blue-600" />
            Developer Portal
          </h1>
          <p className="text-gray-600">
            Build, integrate, and extend Precision AI Agents with our comprehensive developer tools
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">API Calls (30d)</div>
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">128.5K</div>
            <div className="text-xs text-green-600 mt-1">↑ 23% from last month</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Active API Keys</div>
              <Key className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <div className="text-xs text-gray-500 mt-1">Production & Development</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Webhook Events</div>
              <Webhook className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">45.2K</div>
            <div className="text-xs text-green-600 mt-1">99.8% success rate</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Avg Latency</div>
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">285ms</div>
            <div className="text-xs text-green-600 mt-1">↓ 15% improvement</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
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

          <div className="p-8">
            {/* Getting Started */}
            {activeTab === 'getting-started' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
                  <p className="text-gray-600 mb-6">
                    Get started with the Aasim AI Platform API in under 5 minutes
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Get API Key</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Generate your API key from the settings panel
                    </p>
                    <Link to="/settings/integrations" className="text-sm text-primary-600 font-semibold hover:underline">
                      Get API Key →
                    </Link>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-purple-600">2</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Install SDK</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Choose from JavaScript, Python, PHP, or REST API
                    </p>
                    <button className="text-sm text-primary-600 font-semibold hover:underline">
                      View SDKs →
                    </button>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-green-600">3</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Make First Call</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Send your first request and get results
                    </p>
                    <button className="text-sm text-primary-600 font-semibold hover:underline">
                      Try Example →
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-400">Quick Example - Node.js</span>
                    <button className="text-xs text-primary-400 hover:text-primary-300">Copy</button>
                  </div>
                  <pre className="text-green-400 text-sm font-mono overflow-x-auto">
{`const Aasim = require('@aasim/sdk');

const client = new Aasim({
  apiKey: 'your-api-key-here'
});

const result = await client.agents.run({
  agentId: 'agent-123',
  input: {
    document: 'https://example.com/doc.pdf'
  }
});

console.log(result);`}
                  </pre>
                </div>
              </div>
            )}

            {/* API Documentation */}
            {activeTab === 'api-docs' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">API Reference</h2>

                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-2">Base URL</h3>
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">https://api.aasim.ai/v1</code>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-3">Authentication</h3>
                    <p className="text-sm text-gray-600 mb-3">All API requests require authentication using your API key in the header:</p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400 text-sm">Authorization: Bearer YOUR_API_KEY</code>
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-3">Core Endpoints</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                          <code className="text-sm">/agents/run</code>
                        </div>
                        <span className="text-sm text-gray-600">Execute an agent</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                          <code className="text-sm">/agents/:id</code>
                        </div>
                        <span className="text-sm text-gray-600">Get agent details</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                          <code className="text-sm">/runs/:id</code>
                        </div>
                        <span className="text-sm text-gray-600">Get run status</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                          <code className="text-sm">/webhooks</code>
                        </div>
                        <span className="text-sm text-gray-600">Configure webhooks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SDKs */}
            {activeTab === 'sdk' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Official SDKs & Libraries</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                        <Code className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">JavaScript / Node.js</h3>
                        <p className="text-xs text-gray-500">npm install @aasim/sdk</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Official JavaScript SDK for Node.js and browser environments
                    </p>
                    <a href="#" className="text-sm text-primary-600 font-semibold hover:underline">
                      View Documentation →
                    </a>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Code className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Python</h3>
                        <p className="text-xs text-gray-500">pip install aasim-python</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Official Python SDK with async support and type hints
                    </p>
                    <a href="#" className="text-sm text-primary-600 font-semibold hover:underline">
                      View Documentation →
                    </a>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Code className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">PHP</h3>
                        <p className="text-xs text-gray-500">composer require aasim/sdk</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Official PHP SDK compatible with PHP 7.4+
                    </p>
                    <a href="#" className="text-sm text-primary-600 font-semibold hover:underline">
                      View Documentation →
                    </a>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                        <Code className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Ruby</h3>
                        <p className="text-xs text-gray-500">gem install aasim</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Official Ruby gem for Rails and Ruby applications
                    </p>
                    <a href="#" className="text-sm text-primary-600 font-semibold hover:underline">
                      View Documentation →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Webhooks */}
            {activeTab === 'webhooks' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhooks Integration</h2>
                <p className="text-gray-600 mb-6">
                  Receive real-time notifications when agents complete runs, encounter errors, or require human review
                </p>

                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Webhook Events</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm">agent.run.completed</code>
                      <span className="text-xs text-gray-600">Agent successfully completed execution</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm">agent.run.failed</code>
                      <span className="text-xs text-gray-600">Agent execution failed</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm">agent.hitl.required</code>
                      <span className="text-xs text-gray-600">Human review required</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm">agent.hitl.approved</code>
                      <span className="text-xs text-gray-600">Human approved the result</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/settings/integrations"
                  className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center gap-2"
                >
                  <Webhook className="w-5 h-5" />
                  Configure Webhooks
                </Link>
              </div>
            )}

            {/* Code Examples */}
            {activeTab === 'examples' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Examples</h2>
                <p className="text-gray-600 mb-6">
                  Real-world examples and use cases to help you get started quickly
                </p>

                <div className="grid grid-cols-1 gap-6">
                  {[
                    { title: 'Document Processing', desc: 'Extract data from invoices and receipts', lang: 'Python' },
                    { title: 'Video Analysis', desc: 'Analyze video content for compliance', lang: 'Node.js' },
                    { title: 'Code Review Automation', desc: 'Automated PR reviews with webhooks', lang: 'JavaScript' },
                    { title: 'Multi-Agent Workflow', desc: 'Chain multiple agents in sequence', lang: 'Python' }
                  ].map((example, index) => (
                    <div key={index} className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{example.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{example.desc}</p>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{example.lang}</span>
                        </div>
                        <button className="text-sm text-primary-600 font-semibold hover:underline">
                          View Code →
                        </button>
                      </div>
                    </div>
                  ))}
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
