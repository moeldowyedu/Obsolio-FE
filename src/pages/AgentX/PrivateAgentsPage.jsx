import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Plus, Code, Upload, Settings, TrendingUp, Shield } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const PrivateAgentsPage = () => {
  const [privateAgents, setPrivateAgents] = useState([
    {
      id: '1',
      name: 'Internal HR Screening Bot',
      icon: '👥',
      description: 'Custom agent for screening job applications with company-specific criteria',
      status: 'active',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      metrics: {
        totalRuns: 1850,
        successRate: 99.5,
        avgProcessingTime: '1.8s'
      },
      visibility: 'organization',
      createdBy: 'admin@company.com'
    },
    {
      id: '2',
      name: 'Proprietary Contract Analyzer',
      icon: '📜',
      description: 'Trained on company contracts and legal templates for compliance checking',
      status: 'active',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
      metrics: {
        totalRuns: 890,
        successRate: 98.1,
        avgProcessingTime: '3.2s'
      },
      visibility: 'organization',
      createdBy: 'legal@company.com'
    },
    {
      id: '3',
      name: 'Custom Invoice Processor',
      icon: '💰',
      description: 'Trained on internal invoice formats and vendor databases',
      status: 'draft',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      metrics: {
        totalRuns: 125,
        successRate: 94.8,
        avgProcessingTime: '2.5s'
      },
      visibility: 'team',
      createdBy: 'finance@company.com'
    }
  ]);

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Active' },
      draft: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-700 border-gray-200', label: 'Archived' }
    };
    const badge = badges[status] || badges.draft;
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>{badge.label}</span>;
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Lock className="w-8 h-8 text-purple-600" />
                Private Agents
              </h1>
              <p className="text-gray-600 mt-2">
                Organization-specific agents trained on your proprietary data and processes
              </p>
            </div>
            <Link
              to="/agentx/builder"
              className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Private Agent
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Total Private Agents</div>
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{privateAgents.length}</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Active Agents</div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {privateAgents.filter(a => a.status === 'active').length}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Total Runs</div>
              <Code className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {privateAgents.reduce((sum, a) => sum + a.metrics.totalRuns, 0).toLocaleString()}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Avg Success Rate</div>
              <Settings className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {(privateAgents.reduce((sum, a) => sum + a.metrics.successRate, 0) / privateAgents.length).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Private Agents List */}
        <div className="space-y-4">
          {privateAgents.map((agent) => (
            <div key={agent.id} className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-3xl flex-shrink-0">
                    {agent.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                      {getStatusBadge(agent.status)}
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                        <Lock className="w-3 h-3 inline mr-1" />
                        {agent.visibility}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{agent.description}</p>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Total Runs</div>
                        <div className="font-semibold text-gray-900">{agent.metrics.totalRuns.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                        <div className="font-semibold text-green-600">{agent.metrics.successRate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Avg Processing</div>
                        <div className="font-semibold text-gray-900">{agent.metrics.avgProcessingTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Created By</div>
                        <div className="font-semibold text-gray-900 text-xs">{agent.createdBy}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Link
                    to={`/agentx/private/${agent.id}/settings`}
                    className="glass-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Configure
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {privateAgents.length === 0 && (
          <div className="glass-card rounded-3xl p-12 text-center">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Private Agents Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create custom agents trained on your organization's proprietary data and business processes
            </p>
            <Link
              to="/agentx/builder"
              className="glass-btn-primary rounded-xl px-8 py-3 font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Your First Private Agent
            </Link>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 glass-card rounded-2xl p-6 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">🔒 Enterprise Security & Privacy</h4>
              <p className="text-gray-700 text-sm">
                Private agents are exclusive to your organization. Training data never leaves your environment,
                and models are isolated with enterprise-grade encryption. Perfect for sensitive business processes,
                proprietary workflows, and compliance-critical operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivateAgentsPage;
