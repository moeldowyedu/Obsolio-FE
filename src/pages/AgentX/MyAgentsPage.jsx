import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Play, Pause, Settings, Trash2, TrendingUp, Grid3x3, List, Eye, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { formatNumber, formatRelativeTime } from '../../utils/formatters';
import { useAgentStore } from '../../store/agentStore';
import toast from 'react-hot-toast';

const MyAgentsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const { agents, isLoading, fetchAgents, deleteAgent, updateAgentStatus } = useAgentStore();

  useEffect(() => {
    // Fetch agents from backend when component mounts
    fetchAgents();
  }, [fetchAgents]);

  const handleToggleStatus = async (agentId, currentStatus) => {
    if (currentStatus === 'error') return;

    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      await updateAgentStatus(agentId, newStatus);
      toast.success(`Agent ${newStatus === 'active' ? 'activated' : 'paused'} successfully`);
    } catch (error) {
      toast.error('Failed to update agent status');
    }
  };

  const handleDelete = async (agentId, agentName) => {
    if (confirm(`Are you sure you want to undeploy "${agentName}"? This action cannot be undone.`)) {
      try {
        await deleteAgent(agentId);
        toast.success('Agent deleted successfully');
      } catch (error) {
        toast.error('Failed to delete agent');
      }
    }
  };

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const totalExecutions = agents.reduce((sum, a) => sum + (a.executions || 0), 0);
  const avgSuccessRate = agents.length > 0
    ? agents.reduce((sum, a) => sum + (a.success_rate || 0), 0) / agents.length
    : 0;

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

        {/* Loading State */}
        {isLoading && (
          <div className="glass-card rounded-3xl p-12 text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Loading agents...</h3>
            <p className="text-secondary-600">Please wait while we fetch your agents</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && agents.length === 0 && (
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
        )}

        {/* Agents Grid */}
        {!isLoading && agents.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow">
                {/* Icon and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                    {agent.icon || '🤖'}
                  </div>
                  {getStatusBadge(agent.status)}
                </div>

                {/* Name and Description */}
                <h3 className="text-xl font-bold text-secondary-900 mb-2">{agent.name}</h3>
                <p className="text-sm text-secondary-600 mb-4 line-clamp-2">{agent.description || 'No description provided'}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Executions</div>
                    <div className="text-lg font-bold text-secondary-900">
                      {formatNumber(agent.executions || 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                    <div className="text-lg font-bold text-green-600">
                      {agent.success_rate || 0}%
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleToggleStatus(agent.id, agent.status)}
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
                    onClick={() => handleDelete(agent.id, agent.name)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
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
