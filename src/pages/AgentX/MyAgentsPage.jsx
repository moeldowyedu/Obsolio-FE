import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Play, Pause, Settings, Trash2, TrendingUp, Grid3x3, List,
  Eye, Activity, AlertCircle, CheckCircle, Clock, Search, Filter, X
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { formatNumber, formatRelativeTime } from '../../utils/formatters'; // Ensure these exist or use date-fns
import { useAgentStore } from '../../store/agentStore';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';

const MyAgentsPage = () => {
  const { agents, isLoading, error, fetchAgents, deleteAgent, updateAgentStatus, clearError } = useAgentStore();
  const { theme } = useTheme();

  // UI State
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'paused', 'error'

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleStatus = async (agentId, currentStatus) => {
    if (currentStatus === 'error') return;
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      await updateAgentStatus(agentId, newStatus);
      toast.success(`Agent ${newStatus === 'active' ? 'activated' : 'paused'}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (agentId, agentName) => {
    if (confirm(`Are you sure you want to uninstall "${agentName}"?`)) {
      try {
        await deleteAgent(agentId);
        toast.success('Agent uninstalled successfully');
      } catch (error) {
        toast.error('Failed to uninstall agent');
      }
    }
  };

  // Filter & Search Logic
  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (agent.description && agent.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [agents, searchQuery, statusFilter]);

  const getStatusBadge = (status) => {
    const configs = {
      active: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20', label: 'Active' },
      paused: { icon: Pause, color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20', label: 'Paused' },
      error: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20', label: 'Error' }
    };
    const config = configs[status] || configs.active;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  return (
    <MainLayout showSidebar={true} theme={theme}>
      <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>My Agents</h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
              Manage {agents.length} installed agents
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/agentx/marketplace">
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary-600/20">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Install New Agent</span>
                <span className="sm:hidden">Install</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

          {/* Search */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search installed agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 ${theme === 'dark' ? 'bg-[#1e293b] border-gray-700 text-white placeholder-gray-500' : 'bg-white border-slate-200 text-slate-900'
                }`}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer ${theme === 'dark' ? 'bg-[#1e293b] border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-700'
                  }`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="error">Error</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className={`flex p-1 rounded-lg border ${theme === 'dark' ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-slate-200'}`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-slate-900') : 'text-gray-400'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-slate-900') : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-64 rounded-2xl animate-pulse ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-200'}`} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-500">Failed to load agents</h3>
            <p className="text-gray-500">{error}</p>
            <button onClick={fetchAgents} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Retry</button>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3x3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {searchQuery ? 'No matching agents found' : 'No agents installed'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {searchQuery ? 'Try adjusting your search or filters.' : 'Head over to the marketplace to discover and install powerful AI agents.'}
            </p>
            {!searchQuery && (
              <Link to="/agentx/marketplace">
                <button className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
                  Browse Marketplace
                </button>
              </Link>
            )}
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} className="text-primary-500 hover:underline">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredAgents.map(agent => (
              <div
                key={agent.id}
                className={`group relative rounded-2xl border transition-all duration-300 ${theme === 'dark'
                    ? 'bg-[#1e293b]/50 border-white/5 hover:bg-[#1e293b] hover:border-white/10'
                    : 'bg-white border-slate-200 hover:shadow-lg hover:border-primary-200'
                  } ${viewMode === 'list' ? 'flex items-center gap-6 p-4' : 'p-6 flex flex-col'}`}
              >
                {/* Status absolute for Grid */}
                {viewMode === 'grid' && (
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(agent.status)}
                  </div>
                )}

                <div className={`flex ${viewMode === 'list' ? 'items-center gap-4 flex-1' : 'items-start gap-4 mb-6'}`}>
                  {/* Icon */}
                  <div className={`rounded-xl flex items-center justify-center flex-shrink-0 ${viewMode === 'list' ? 'w-12 h-12 text-2xl' : 'w-14 h-14 text-3xl shadow-lg'
                    } bg-gradient-to-br from-indigo-500 to-purple-600 text-white`}>
                    {agent.agent?.icon_url ? <img src={agent.agent.icon_url} className="w-full h-full object-cover rounded-xl" /> : (agent.agent?.name?.[0] || 'A')}
                  </div>

                  <div className="min-w-0">
                    <h3 className={`font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'} ${viewMode === 'grid' ? 'text-lg pr-16' : 'text-base'}`}>
                      {agent.agent?.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{agent.agent?.category}</span>
                      {viewMode === 'list' && <span className="w-1 h-1 rounded-full bg-gray-500" />}
                      {viewMode === 'list' && <span>Installed {new Date(agent.purchased_at).toLocaleDateString()}</span>}
                    </div>
                  </div>
                </div>

                {/* List View Status/Metrics */}
                {viewMode === 'list' && (
                  <div className="flex items-center gap-8 mr-6">
                    <div className="text-center min-w-[80px]">
                      <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatNumber(agent.usage_count || 0)}</div>
                      <div className="text-xs text-gray-500">Uses</div>
                    </div>
                    <div className="hidden sm:block text-right min-w-[100px]">
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{agent.last_used_at ? new Date(agent.last_used_at).toLocaleDateString() : 'Never'}</div>
                      <div className="text-xs text-gray-500">Last Used</div>
                    </div>
                    <div>
                      {getStatusBadge(agent.status)}
                    </div>
                  </div>
                )}

                {/* Grid View Metrics */}
                {viewMode === 'grid' && (
                  <div className={`grid grid-cols-2 gap-4 mb-6 py-4 border-y ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total Usage</div>
                      <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {formatNumber(agent.usage_count || 0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Last Used</div>
                      <div className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        {agent.last_used_at ? new Date(agent.last_used_at).toLocaleDateString() : 'Never'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className={`flex items-center gap-2 ${viewMode === 'list' ? '' : 'mt-auto'}`}>
                  {agent.status === 'active' ? (
                    <button onClick={() => handleToggleStatus(agent.id, 'active')} className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-yellow-500' : 'hover:bg-yellow-50 text-yellow-600'}`} title="Pause Agent">
                      <Pause className="w-5 h-5" />
                    </button>
                  ) : (
                    <button onClick={() => handleToggleStatus(agent.id, 'paused')} className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-green-500' : 'hover:bg-green-50 text-green-600'}`} title="Resume Agent">
                      <Play className="w-5 h-5" />
                    </button>
                  )}

                  <Link to={`/agentx/hub/agent/${agent.agent?.id}`} className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`} title="View Details">
                    <Settings className="w-5 h-5" />
                  </Link>

                  <button onClick={() => handleDelete(agent.id, agent.agent?.name)} className={`p-2 rounded-lg transition-colors ml-auto ${theme === 'dark' ? 'hover:bg-white/10 text-red-400' : 'hover:bg-red-50 text-red-600'}`} title="Uninstall Agent">
                    <Trash2 className="w-5 h-5" />
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
