import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Play, Pause, Settings, Trash2, TrendingUp, Grid3x3, List, Eye, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { formatNumber, formatRelativeTime } from '../../utils/formatters';

const MyAgentsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [agents, setAgents] = useState([
    {
      id: '1',
      name: 'Customer Support AI',
      icon: '💬',
      description: 'Intelligent customer support automation with multi-channel support',
      status: 'active',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      lastActive: new Date(Date.now() - 1000 * 60 * 5),
      executions: 12450,
      successRate: 98.4,
      avgProcessingTime: '1.2s',
      engines: ['Text', 'Vision'],
      hitlMode: 'hitl',
      source: 'marketplace'
    },
    {
      id: '2',
      name: 'Invoice Validator',
      icon: '📄',
      description: 'Custom agent for validating vendor invoices against PO numbers',
      status: 'active',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
      lastActive: new Date(Date.now() - 1000 * 60 * 15),
      executions: 3280,
      successRate: 99.2,
      avgProcessingTime: '2.1s',
      engines: ['Document', 'Data'],
      hitlMode: 'spot-check',
      source: 'private'
    },
    {
      id: '3',
      name: 'Code Review Assistant',
      icon: '💻',
      description: 'Automated PR review with security and best practices checking',
      status: 'paused',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 12),
      executions: 456,
      successRate: 96.8,
      avgProcessingTime: '4.5s',
      engines: ['Code'],
      hitlMode: 'full-review',
      source: 'private'
    },
    {
      id: '4',
      name: 'Social Media Monitor',
      icon: '📱',
      description: 'Real-time brand monitoring and sentiment analysis',
      status: 'active',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22),
      lastActive: new Date(Date.now() - 1000 * 60 * 2),
      executions: 28900,
      successRate: 97.6,
      avgProcessingTime: '0.8s',
      engines: ['Text', 'Web', 'Vision'],
      hitlMode: 'spot-check',
      source: 'marketplace'
    },
    {
      id: '5',
      name: 'Document Classifier',
      icon: '📋',
      description: 'Automated document classification and routing system',
      status: 'error',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      lastActive: new Date(Date.now() - 1000 * 60 * 30),
      executions: 892,
      successRate: 94.2,
      avgProcessingTime: '1.8s',
      engines: ['Document', 'Text'],
      hitlMode: 'hitl',
      source: 'marketplace'
    },
    {
      id: '6',
      name: 'Email Response Bot',
      icon: '📧',
      description: 'Automated email response generation with context awareness',
      status: 'active',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
      lastActive: new Date(Date.now() - 1000 * 60 * 8),
      executions: 5670,
      successRate: 98.9,
      avgProcessingTime: '1.5s',
      engines: ['Text'],
      hitlMode: 'spot-check',
      source: 'private'
    }
  ]);

  const handleToggleStatus = (id) => {
    setAgents(agents.map(agent => {
      if (agent.id === id && agent.status !== 'error') {
        return {
          ...agent,
          status: agent.status === 'active' ? 'paused' : 'active'
        };
      }
      return agent;
    }));
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to undeploy this agent? This action cannot be undone.')) {
      setAgents(agents.filter(agent => agent.id !== id));
    }
  };

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const totalExecutions = agents.reduce((sum, a) => sum + a.executions, 0);
  const avgSuccessRate = agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length;

  const getStatusBadge = (status) => {
    const configs = {
      active: {
        icon: CheckCircle,
        className: 'bg-green-100 text-green-700 border-green-200',
        label: 'Active'
      },
      paused: {
        icon: Pause,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        label: 'Paused'
      },
      error: {
        icon: AlertCircle,
        className: 'bg-red-100 text-red-700 border-red-200',
        label: 'Error'
      }
    };

    const config = configs[status] || configs.active;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">My Agents</h1>
            <p className="text-secondary-600">
              Manage your deployed AI agents and monitor their performance
            </p>
          </div>
          <Link to="/agentx/marketplace">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Deploy New Agent
            </button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Total Agents</div>
              <Grid3x3 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{agents.length}</div>
            <div className="text-xs text-gray-500 mt-1">Deployed agents</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Active</div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{activeAgents}</div>
            <div className="text-xs text-gray-500 mt-1">Currently running</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Total Executions</div>
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{formatNumber(totalExecutions)}</div>
            <div className="text-xs text-gray-500 mt-1">All-time runs</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Success Rate</div>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600">{avgSuccessRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 mt-1">Average across all agents</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-secondary-900">Your Agents</h2>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                viewMode === 'grid' ? 'bg-white shadow' : ''
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                viewMode === 'list' ? 'bg-white shadow' : ''
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">List</span>
            </button>
          </div>
        </div>

        {/* Agents Display */}
        {agents.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center">
            <Grid3x3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-secondary-900 mb-2">No agents deployed yet</h3>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Deploy agents from the marketplace or create your own custom agents to get started
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/agentx/marketplace">
                <button className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-secondary-700 hover:bg-gray-50">
                  Browse Marketplace
                </button>
              </Link>
              <Link to="/agentx/builder">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
                  Create Agent
                </button>
              </Link>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow">
                {/* Icon and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                    {agent.icon}
                  </div>
                  {getStatusBadge(agent.status)}
                </div>

                {/* Name and Description */}
                <h3 className="text-xl font-bold text-secondary-900 mb-2">{agent.name}</h3>
                <p className="text-sm text-secondary-600 mb-4 line-clamp-2">{agent.description}</p>

                {/* Source Badge */}
                <div className="mb-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    agent.source === 'private'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {agent.source === 'private' ? 'Private' : 'Marketplace'}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Executions</div>
                    <div className="text-lg font-bold text-secondary-900">
                      {formatNumber(agent.executions)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                    <div className="text-lg font-bold text-green-600">
                      {agent.successRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Avg Time</div>
                    <div className="text-sm font-semibold text-secondary-900">
                      {agent.avgProcessingTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Last Active</div>
                    <div className="text-sm font-semibold text-secondary-900">
                      {formatRelativeTime(agent.lastActive)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleToggleStatus(agent.id)}
                    disabled={agent.status === 'error'}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 ${
                      agent.status === 'active'
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : agent.status === 'error'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {agent.status === 'active' ? (
                      <><Pause className="w-4 h-4" /> Pause</>
                    ) : agent.status === 'error' ? (
                      <><AlertCircle className="w-4 h-4" /> Error</>
                    ) : (
                      <><Play className="w-4 h-4" /> Resume</>
                    )}
                  </button>
                  <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 flex items-center justify-center gap-1">
                    <Settings className="w-4 h-4" />
                    Configure
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center justify-center gap-1">
                    <Eye className="w-4 h-4" />
                    View Logs
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl flex-shrink-0">
                    {agent.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-secondary-900">{agent.name}</h3>
                          {getStatusBadge(agent.status)}
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            agent.source === 'private'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {agent.source === 'private' ? 'Private' : 'Marketplace'}
                          </span>
                        </div>
                        <p className="text-secondary-600">{agent.description}</p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Total Executions</div>
                        <div className="text-xl font-bold text-secondary-900">
                          {formatNumber(agent.executions)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                        <div className="text-xl font-bold text-green-600">
                          {agent.successRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Avg Processing Time</div>
                        <div className="text-xl font-bold text-secondary-900">
                          {agent.avgProcessingTime}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Last Active</div>
                        <div className="text-xl font-bold text-secondary-900">
                          {formatRelativeTime(agent.lastActive)}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-secondary-600">Engines:</span>
                      <div className="flex gap-2">
                        {agent.engines.map((engine, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-secondary-700 text-sm rounded-lg font-medium"
                          >
                            {engine}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-secondary-600 ml-2">HITL:</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg font-medium">
                        {agent.hitlMode}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleStatus(agent.id)}
                        disabled={agent.status === 'error'}
                        className={`px-6 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                          agent.status === 'active'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : agent.status === 'error'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {agent.status === 'active' ? (
                          <><Pause className="w-4 h-4" /> Pause Agent</>
                        ) : agent.status === 'error' ? (
                          <><AlertCircle className="w-4 h-4" /> Fix Error</>
                        ) : (
                          <><Play className="w-4 h-4" /> Resume Agent</>
                        )}
                      </button>
                      <Link to={`/agentx/agents/${agent.id}/analytics`}>
                        <button className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Analytics
                        </button>
                      </Link>
                      <button className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Logs
                      </button>
                      <Link to={`/agentx/agents/${agent.id}/settings`}>
                        <button className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Configure
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(agent.id)}
                        className="px-6 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-semibold hover:bg-red-200 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyAgentsPage;
