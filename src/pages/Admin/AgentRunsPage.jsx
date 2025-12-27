import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Search,
  Filter,
  Eye,
  X,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  ArrowUpDown,
  RefreshCw,
  Activity,
} from 'lucide-react';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import AdminLayout from '../../components/layout/AdminLayout';

const AgentRunsPage = () => {
  const { theme } = useTheme();
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('started_at');
  const [sortOrder, setSortOrder] = useState('desc');

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRun, setSelectedRun] = useState(null);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    running: 0,
    failed: 0,
    pending: 0,
    successRate: 0,
  });

  useEffect(() => {
    fetchRuns();
  }, [searchQuery, statusFilter, sortBy, sortOrder]);

  const fetchRuns = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        sort: `${sortBy}_${sortOrder}`,
      };

      const response = await adminService.getAllAgentRuns(params);

      // Handle different response structures
      let runsData = [];
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        runsData = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        runsData = response.data;
      } else if (Array.isArray(response)) {
        runsData = response;
      }

      setRuns(runsData);

      // Calculate stats from actual data
      const total = runsData.length;
      const completed = runsData.filter((r) => r.status === 'completed').length;
      const running = runsData.filter((r) => r.status === 'running').length;
      const failed = runsData.filter((r) => r.status === 'failed').length;
      const pending = runsData.filter((r) => r.status === 'pending').length;
      const successRate =
        completed + failed > 0 ? Math.round((completed / (completed + failed)) * 100) : 0;

      setStats({ total, completed, running, failed, pending, successRate });
    } catch (error) {
      console.error('Error fetching agent runs:', error);
      notify.error('Failed to load agent runs');
      setRuns([]);
    } finally {
      setLoading(false);
    }
  };

  const openDetailsModal = (run) => {
    setSelectedRun(run);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setSelectedRun(null);
    setShowDetailsModal(false);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (ms) => {
    if (!ms) return '-';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
    return `${(ms / 60000).toFixed(2)}m`;
  };

  const getStatusBadge = (status) => {
    const configs = {
      completed: { color: 'green', icon: CheckCircle, text: 'Completed' },
      running: { color: 'blue', icon: RefreshCw, text: 'Running' },
      failed: { color: 'red', icon: XCircle, text: 'Failed' },
      pending: { color: 'yellow', icon: Clock, text: 'Pending' },
    };

    const config = configs[status] || configs.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-${config.color}-900/30 text-${config.color}-400`}
      >
        <Icon className={`w-4 h-4 ${status === 'running' ? 'animate-spin' : ''}`} />
        {config.text}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-purple-500" />
            <h1
              className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Agent Runs
            </h1>
          </div>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Monitor and track all agent execution history
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Total Runs
            </p>
            <p
              className={`text-2xl font-bold mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {stats.total}
            </p>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Completed
            </p>
            <p className="text-2xl font-bold mt-1 text-green-400">{stats.completed}</p>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Running
            </p>
            <p className="text-2xl font-bold mt-1 text-blue-400">{stats.running}</p>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Failed
            </p>
            <p className="text-2xl font-bold mt-1 text-red-400">{stats.failed}</p>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Success Rate
            </p>
            <p className="text-2xl font-bold mt-1 text-purple-400">{stats.successRate}%</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <input
              type="text"
              placeholder="Search by agent name or run ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-2.5 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="running">Running</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>

          <button
            onClick={fetchRuns}
            className={`px-4 py-2.5 rounded-lg border transition-colors flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
            }`}
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Runs Table */}
        <div
          className={`rounded-xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={
                  theme === 'dark'
                    ? 'bg-gray-900/50 border-b border-gray-700'
                    : 'bg-gray-50 border-b border-gray-200'
                }
              >
                <tr>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Run ID
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-opacity-80 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    onClick={() => toggleSort('agent_name')}
                  >
                    <div className="flex items-center gap-2">
                      Agent Name
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-opacity-80 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    onClick={() => toggleSort('started_at')}
                  >
                    <div className="flex items-center gap-2">
                      Started At
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Duration
                  </th>
                  <th
                    className={`px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : runs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className={`px-6 py-12 text-center ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      No agent runs found
                    </td>
                  </tr>
                ) : (
                  runs.map((run) => (
                    <tr
                      key={run.id}
                      className={`${
                        theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-mono text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {run.id}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {run.agent_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(run.status)}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {formatDate(run.started_at)}
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        {formatDuration(run.duration_ms)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => openDetailsModal(run)}
                          className={`p-2 rounded-lg transition-colors ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                          }`}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRun && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div
              className={`px-6 py-4 border-b flex items-center justify-between ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <h3
                className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Run Details: {selectedRun.id}
              </h3>
              <button
                onClick={closeDetailsModal}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-4 space-y-6 max-h-[calc(90vh-5rem)]">
              {/* Basic Info */}
              <div>
                <h4
                  className={`text-lg font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Basic Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Agent Name
                    </p>
                    <p
                      className={`text-base font-medium mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {selectedRun.agent_name}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Status
                    </p>
                    <div className="mt-1">{getStatusBadge(selectedRun.status)}</div>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Started At
                    </p>
                    <p
                      className={`text-base mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {formatDate(selectedRun.started_at)}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Duration
                    </p>
                    <p
                      className={`text-base mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {formatDuration(selectedRun.duration_ms)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div>
                <h4
                  className={`text-lg font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Input
                </h4>
                <pre
                  className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${
                    theme === 'dark'
                      ? 'bg-gray-900 text-gray-300'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {JSON.stringify(JSON.parse(selectedRun.input), null, 2)}
                </pre>
              </div>

              {/* Output */}
              {selectedRun.output && (
                <div>
                  <h4
                    className={`text-lg font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Output
                  </h4>
                  <pre
                    className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${
                      theme === 'dark'
                        ? 'bg-gray-900 text-green-400'
                        : 'bg-gray-100 text-green-700'
                    }`}
                  >
                    {JSON.stringify(JSON.parse(selectedRun.output), null, 2)}
                  </pre>
                </div>
              )}

              {/* Error */}
              {selectedRun.error && (
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-red-400">Error</h4>
                  <pre
                    className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${
                      theme === 'dark'
                        ? 'bg-red-900/20 text-red-400 border border-red-800'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {selectedRun.error}
                  </pre>
                </div>
              )}
            </div>

            <div
              className={`px-6 py-4 border-t flex items-center justify-end ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <button
                onClick={closeDetailsModal}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AgentRunsPage;
