import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import AdminLayout from '../../components/layout/AdminLayout';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import {
  Shield, Search, Filter, Download, Eye, Calendar, User, Activity,
  Database, Settings, UserPlus, UserMinus, FileText, Lock, Unlock,
  Trash2, Edit, ChevronDown, ChevronUp, X
} from 'lucide-react';

const AuditLogsPage = () => {
  const { theme } = useTheme();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('');
  const [dateRange, setDateRange] = useState('7days');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(20);

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // Statistics
  const [stats, setStats] = useState({
    today: 0,
    thisWeek: 0,
    total: 0,
    criticalActions: 0,
  });

  useEffect(() => {
    fetchLogs();
  }, [currentPage, searchQuery, actionFilter, entityFilter, userFilter, dateRange]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: perPage,
        search: searchQuery || undefined,
        action: actionFilter !== 'all' ? actionFilter : undefined,
        entity_type: entityFilter !== 'all' ? entityFilter : undefined,
        user_id: userFilter || undefined,
        date_range: dateRange,
      };

      const response = await adminService.getActivityLogs(params);

      // Handle different response structures
      let logsData = [];
      let pagination = {};
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        logsData = response.data.data;
        pagination = response.data;
      } else if (response.data && Array.isArray(response.data)) {
        logsData = response.data;
      } else if (Array.isArray(response)) {
        logsData = response;
      }

      setLogs(logsData);

      if (pagination.last_page) {
        setTotalPages(pagination.last_page);
      }

      // Calculate stats
      const today = logsData.filter(log => {
        const logDate = new Date(log.created_at);
        const todayDate = new Date();
        return logDate.toDateString() === todayDate.toDateString();
      }).length;

      const thisWeek = logsData.filter(log => {
        const logDate = new Date(log.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return logDate >= weekAgo;
      }).length;

      const criticalActions = logsData.filter(
        log => ['delete', 'suspend', 'deactivate', 'revoke'].includes(log.action)
      ).length;

      setStats({
        today,
        thisWeek,
        total: pagination.total || logsData.length,
        criticalActions,
      });
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      notify.error('Failed to load audit logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (logId) => {
    setExpandedRows((prev) =>
      prev.includes(logId)
        ? prev.filter((id) => id !== logId)
        : [...prev, logId]
    );
  };

  const openDetailsModal = (log) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setSelectedLog(null);
    setShowDetailsModal(false);
  };

  const handleExport = () => {
    console.log('Exporting audit logs...');
    notify.info('Export functionality coming soon');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionIcon = (action) => {
    const icons = {
      create: UserPlus,
      update: Edit,
      delete: Trash2,
      suspend: Lock,
      activate: Unlock,
      deactivate: UserMinus,
      login: User,
      logout: User,
      impersonate: Shield,
      export: Download,
      import: Database,
      change_settings: Settings,
    };
    return icons[action] || Activity;
  };

  const getActionColor = (action) => {
    const colors = {
      create: 'text-green-500',
      update: 'text-blue-500',
      delete: 'text-red-500',
      suspend: 'text-orange-500',
      activate: 'text-green-500',
      deactivate: 'text-gray-500',
      login: 'text-purple-500',
      logout: 'text-gray-500',
      impersonate: 'text-yellow-500',
      export: 'text-blue-500',
      import: 'text-blue-500',
      change_settings: 'text-purple-500',
    };
    return colors[action] || 'text-gray-500';
  };

  const getSeverityBadge = (action) => {
    const criticalActions = ['delete', 'suspend', 'deactivate', 'revoke'];
    const warningActions = ['update', 'change_settings', 'impersonate'];

    let severity = 'info';
    if (criticalActions.includes(action)) severity = 'critical';
    else if (warningActions.includes(action)) severity = 'warning';

    const configs = {
      critical: 'bg-red-500/10 text-red-500 border-red-500/20',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${configs[severity]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-purple-500" />
            <h1
              className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Audit Logs
            </h1>
          </div>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            System-wide activity tracking and security monitoring
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Today
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.today}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  This Week
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.thisWeek}
                </p>
              </div>
              <Activity className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Events
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.total}
                </p>
              </div>
              <FileText className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Critical Actions
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.criticalActions}
                </p>
              </div>
              <Shield className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          className={`p-4 rounded-xl mb-6 ${
            theme === 'dark'
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
              <input
                type="text"
                placeholder="Search by user, action, or entity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className={`mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Action Type
                </label>
                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Actions</option>
                  <option value="create">Create</option>
                  <option value="update">Update</option>
                  <option value="delete">Delete</option>
                  <option value="suspend">Suspend</option>
                  <option value="activate">Activate</option>
                  <option value="login">Login</option>
                  <option value="impersonate">Impersonate</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Entity Type
                </label>
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Entities</option>
                  <option value="tenant">Tenant</option>
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                  <option value="subscription">Subscription</option>
                  <option value="integration">Integration</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActionFilter('all');
                    setEntityFilter('all');
                    setUserFilter('');
                    setDateRange('7days');
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Audit Logs Table */}
        <div
          className={`rounded-xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <Shield
                className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`}
              />
              <p
                className={`text-lg ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                No audit logs found
              </p>
            </div>
          ) : (
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
                      Timestamp
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      User
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Action
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Entity
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Severity
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
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {logs.map((log) => {
                    const Icon = getActionIcon(log.action);
                    const isExpanded = expandedRows.includes(log.id);

                    return (
                      <>
                        <tr
                          key={log.id}
                          className={`${
                            theme === 'dark'
                              ? 'hover:bg-gray-700/30'
                              : 'hover:bg-gray-50'
                          } transition-colors`}
                        >
                          <td className="px-6 py-4">
                            <div
                              className={`text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}
                            >
                              {formatDate(log.created_at)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <span className="text-white font-semibold text-xs">
                                  {log.user_name?.[0] || 'U'}
                                </span>
                              </div>
                              <div>
                                <div
                                  className={`font-medium text-sm ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {log.user_name || 'Unknown'}
                                </div>
                                <div
                                  className={`text-xs ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                  }`}
                                >
                                  {log.user_email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${getActionColor(log.action)}`} />
                              <span
                                className={`text-sm font-medium capitalize ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {log.action.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div
                                className={`text-sm font-medium ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {log.entity_type}
                              </div>
                              <div
                                className={`text-xs ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                {log.entity_name || log.entity_id}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getSeverityBadge(log.action)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => toggleRow(log.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  theme === 'dark'
                                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                }`}
                                title="Toggle Details"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => openDetailsModal(log)}
                                className={`p-2 rounded-lg transition-colors ${
                                  theme === 'dark'
                                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                }`}
                                title="View Full Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Row Details */}
                        {isExpanded && (
                          <tr className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}>
                            <td colSpan="6" className="px-6 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label
                                    className={`block text-xs font-medium mb-1 ${
                                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                                  >
                                    IP Address
                                  </label>
                                  <div
                                    className={`text-sm font-mono ${
                                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    {log.ip_address || 'N/A'}
                                  </div>
                                </div>
                                <div>
                                  <label
                                    className={`block text-xs font-medium mb-1 ${
                                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                                  >
                                    User Agent
                                  </label>
                                  <div
                                    className={`text-sm truncate ${
                                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    {log.user_agent || 'N/A'}
                                  </div>
                                </div>
                                {log.description && (
                                  <div className="md:col-span-2">
                                    <label
                                      className={`block text-xs font-medium mb-1 ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                      }`}
                                    >
                                      Description
                                    </label>
                                    <div
                                      className={`text-sm ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                      }`}
                                    >
                                      {log.description}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className={`px-6 py-4 border-t flex items-center justify-between ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : theme === 'dark'
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                } ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              >
                Previous
              </button>
              <span
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : theme === 'dark'
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                } ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Details Modal */}
        {showDetailsModal && selectedLog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              className={`w-full max-w-2xl rounded-2xl ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Modal Header */}
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
                  Audit Log Details
                </h3>
                <button
                  onClick={closeDetailsModal}
                  className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Timestamp
                    </label>
                    <div
                      className={`text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {formatDate(selectedLog.created_at)}
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Severity
                    </label>
                    {getSeverityBadge(selectedLog.action)}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    User
                  </label>
                  <div
                    className={`text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {selectedLog.user_name} ({selectedLog.user_email})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Action
                    </label>
                    <div
                      className={`text-sm capitalize ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {selectedLog.action.replace('_', ' ')}
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Entity Type
                    </label>
                    <div
                      className={`text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {selectedLog.entity_type}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Entity
                  </label>
                  <div
                    className={`text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {selectedLog.entity_name || selectedLog.entity_id}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    IP Address
                  </label>
                  <div
                    className={`text-sm font-mono ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {selectedLog.ip_address || 'N/A'}
                  </div>
                </div>

                {selectedLog.description && (
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Description
                    </label>
                    <div
                      className={`text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {selectedLog.description}
                    </div>
                  </div>
                )}

                {selectedLog.metadata && (
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Additional Data
                    </label>
                    <pre
                      className={`text-xs p-3 rounded-lg overflow-auto max-h-48 ${
                        theme === 'dark'
                          ? 'bg-gray-900 text-gray-300'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div
                className={`px-6 py-4 border-t flex items-center justify-end ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <button
                  onClick={closeDetailsModal}
                  className={`px-6 py-2 rounded-lg font-medium ${
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
      </div>
    </AdminLayout>
  );
};

export default AuditLogsPage;
