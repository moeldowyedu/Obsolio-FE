import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Plus, Edit, Copy, Share2, Archive, Settings, TrendingUp, Shield, Users, Calendar, FileCode } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { formatDate, formatNumber } from '../../utils/formatters';

const PrivateAgentsPage = () => {
  const [privateAgents, setPrivateAgents] = useState([
    {
      id: '1',
      name: 'Internal HR Screening Bot',
      icon: '👥',
      description: 'Custom agent for screening job applications with company-specific criteria and compliance requirements',
      status: 'active',
      version: 'v2.3.1',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      metrics: {
        totalRuns: 1850,
        successRate: 99.5,
        avgProcessingTime: '1.8s'
      },
      visibility: 'organization',
      createdBy: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com'
      },
      team: 'HR Department'
    },
    {
      id: '2',
      name: 'Proprietary Contract Analyzer',
      icon: '📜',
      description: 'Trained on company contracts and legal templates for compliance checking and risk assessment',
      status: 'active',
      version: 'v1.5.2',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      metrics: {
        totalRuns: 890,
        successRate: 98.1,
        avgProcessingTime: '3.2s'
      },
      visibility: 'team',
      createdBy: {
        name: 'Michael Chen',
        email: 'michael.chen@company.com'
      },
      team: 'Legal'
    },
    {
      id: '3',
      name: 'Custom Invoice Processor',
      icon: '💰',
      description: 'Trained on internal invoice formats and vendor databases for automated processing and validation',
      status: 'draft',
      version: 'v0.9.0',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      metrics: {
        totalRuns: 125,
        successRate: 94.8,
        avgProcessingTime: '2.5s'
      },
      visibility: 'team',
      createdBy: {
        name: 'Emily Rodriguez',
        email: 'emily.r@company.com'
      },
      team: 'Finance'
    },
    {
      id: '4',
      name: 'Internal Knowledge Base Assistant',
      icon: '📚',
      description: 'AI agent trained on company documentation, policies, and internal knowledge base for employee support',
      status: 'active',
      version: 'v3.1.0',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      metrics: {
        totalRuns: 4250,
        successRate: 97.8,
        avgProcessingTime: '1.1s'
      },
      visibility: 'organization',
      createdBy: {
        name: 'David Park',
        email: 'david.park@company.com'
      },
      team: 'IT Operations'
    },
    {
      id: '5',
      name: 'Security Incident Analyzer',
      icon: '🔒',
      description: 'Custom agent for analyzing security logs and detecting potential threats based on company infrastructure',
      status: 'active',
      version: 'v2.0.5',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      metrics: {
        totalRuns: 2100,
        successRate: 99.1,
        avgProcessingTime: '0.9s'
      },
      visibility: 'team',
      createdBy: {
        name: 'Alex Thompson',
        email: 'alex.t@company.com'
      },
      team: 'Security'
    },
    {
      id: '6',
      name: 'Product Feedback Analyzer',
      icon: '💬',
      description: 'Analyzes customer feedback and product reviews with context of company product roadmap',
      status: 'archived',
      version: 'v1.2.0',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      metrics: {
        totalRuns: 650,
        successRate: 96.5,
        avgProcessingTime: '2.0s'
      },
      visibility: 'team',
      createdBy: {
        name: 'Lisa Wang',
        email: 'lisa.wang@company.com'
      },
      team: 'Product'
    }
  ]);

  const handleDuplicate = (agentId) => {
    const agent = privateAgents.find(a => a.id === agentId);
    if (agent) {
      const newAgent = {
        ...agent,
        id: String(Date.now()),
        name: `${agent.name} (Copy)`,
        version: 'v1.0.0',
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        metrics: {
          totalRuns: 0,
          successRate: 0,
          avgProcessingTime: '0s'
        }
      };
      setPrivateAgents([newAgent, ...privateAgents]);
    }
  };

  const handleArchive = (agentId) => {
    if (confirm('Are you sure you want to archive this agent?')) {
      setPrivateAgents(privateAgents.map(agent =>
        agent.id === agentId ? { ...agent, status: 'archived' } : agent
      ));
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Active' },
      draft: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-700 border-gray-200', label: 'Archived' }
    };
    const badge = badges[status] || badges.draft;
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>{badge.label}</span>;
  };

  const getVisibilityBadge = (visibility) => {
    return visibility === 'organization' ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
        <Shield className="w-3 h-3" />
        Organization
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
        <Users className="w-3 h-3" />
        Team
      </span>
    );
  };

  const activeAgents = privateAgents.filter(a => a.status === 'active').length;
  const teamAgents = privateAgents.filter(a => a.visibility === 'team').length;
  const archivedAgents = privateAgents.filter(a => a.status === 'archived').length;
  const totalRuns = privateAgents.reduce((sum, a) => sum + a.metrics.totalRuns, 0);

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-secondary-900">Private Agents</h1>
            </div>
            <p className="text-secondary-600">
              Organization-specific agents trained on your proprietary data and processes
            </p>
          </div>
          <Link to="/agentx/builder">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Private Agent
            </button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Total Private Agents</div>
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{privateAgents.length}</div>
            <div className="text-xs text-gray-500 mt-1">Custom agents created</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Active Agents</div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{activeAgents}</div>
            <div className="text-xs text-gray-500 mt-1">Currently deployed</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Team Agents</div>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600">{teamAgents}</div>
            <div className="text-xs text-gray-500 mt-1">Restricted access</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Total Runs</div>
              <FileCode className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{formatNumber(totalRuns)}</div>
            <div className="text-xs text-gray-500 mt-1">Across all agents</div>
          </div>
        </div>

        {/* Private Agents List */}
        <div>
          <h2 className="text-xl font-bold text-secondary-900 mb-4">Your Private Agents</h2>
          {privateAgents.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-2">No Private Agents Yet</h3>
              <p className="text-secondary-600 mb-6 max-w-md mx-auto">
                Create custom agents trained on your organization's proprietary data and business processes
              </p>
              <Link to="/agentx/builder">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow inline-flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create Your First Private Agent
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {privateAgents.map((agent) => (
                <div key={agent.id} className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-4xl flex-shrink-0 shadow-lg">
                      {agent.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-secondary-900">{agent.name}</h3>
                            {getStatusBadge(agent.status)}
                            {getVisibilityBadge(agent.visibility)}
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-secondary-700 border border-gray-200">
                              {agent.version}
                            </span>
                          </div>
                          <p className="text-secondary-600 mb-3">{agent.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Created {formatDate(agent.createdAt, 'short')}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{agent.team}</span>
                            </div>
                            <span>•</span>
                            <span>By {agent.createdBy.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-6 mb-4 pb-4 border-b border-gray-200">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Total Runs</div>
                          <div className="text-xl font-bold text-secondary-900">
                            {formatNumber(agent.metrics.totalRuns)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                          <div className="text-xl font-bold text-green-600">
                            {agent.metrics.successRate}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Avg Processing</div>
                          <div className="text-xl font-bold text-secondary-900">
                            {agent.metrics.avgProcessingTime}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Link to={`/agentx/private/${agent.id}/edit`}>
                          <button className="px-6 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-200 flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDuplicate(agent.id)}
                          className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          Duplicate
                        </button>
                        <button className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                        <Link to={`/agentx/private/${agent.id}/settings`}>
                          <button className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                          </button>
                        </Link>
                        {agent.status !== 'archived' && (
                          <button
                            onClick={() => handleArchive(agent.id)}
                            className="px-6 py-2 bg-gray-100 text-secondary-700 rounded-xl text-sm font-semibold hover:bg-gray-200 flex items-center gap-2"
                          >
                            <Archive className="w-4 h-4" />
                            Archive
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-secondary-900 mb-2 text-lg">Enterprise Security & Privacy</h4>
              <p className="text-secondary-700 text-sm mb-3">
                Private agents are exclusive to your organization and provide the highest level of security and customization:
              </p>
              <ul className="space-y-2 text-sm text-secondary-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  <span><strong>Data Isolation:</strong> Training data never leaves your environment</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  <span><strong>Custom Models:</strong> Fine-tuned on your proprietary business processes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  <span><strong>Access Control:</strong> Team-level or organization-level visibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  <span><strong>Compliance Ready:</strong> Built for GDPR, HIPAA, and SOC 2 compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivateAgentsPage;
