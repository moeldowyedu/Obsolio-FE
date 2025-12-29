import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import AdminLayout from '../../components/layout/AdminLayout';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import {
  UserCheck, Search, Filter, Eye, StopCircle, Clock, Activity,
  ArrowRight, Building2, Calendar, X, AlertTriangle, CheckCircle
} from 'lucide-react';

const ImpersonationPage = () => {
  const { theme } = useTheme();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Statistics
  const [stats, setStats] = useState({
    active: 0,
    today: 0,
    thisWeek: 0,
    total: 0,
  });

  useEffect(() => {
    fetchSessions();
  }, [searchQuery, statusFilter]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      };

      const response = await adminService.getImpersonationLogs(params);

      // Handle different response structures
      let sessionsData = [];
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        sessionsData = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        sessionsData = response.data;
      } else if (Array.isArray(response)) {
        sessionsData = response;
      }

      setSessions(sessionsData);

      // Calculate stats
      const active = sessionsData.filter(s => s.status === 'active').length;
      const today = sessionsData.filter(s => {
        const sessionDate = new Date(s.started_at);
        const todayDate = new Date();
        return sessionDate.toDateString() === todayDate.toDateString();
      }).length;
      const thisWeek = sessionsData.filter(s => {
        const sessionDate = new Date(s.started_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return sessionDate >= weekAgo;
      }).length;

      setStats({
        active,
        today,
        thisWeek,
        total: sessionsData.length,
      });
    } catch (error) {
      console.error('Error fetching impersonation sessions:', error);
      notify.error('Failed to load impersonation sessions');
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = async (sessionId) => {
    if (!confirm('Are you sure you want to end this impersonation session?')) return;

    setLoading(true);
    try {
      await adminService.endImpersonation(sessionId);
      notify.success('Impersonation session ended successfully');
      fetchSessions();
    } catch (error) {
      console.error('Error ending impersonation session:', error);
      notify.error('Failed to end impersonation session');
    } finally {
      setLoading(false);
    }
  };

  const openDetailsModal = (session) => {
    setSelectedSession(session);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setSelectedSession(null);
    setShowDetailsModal(false);
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

  const calculateDuration = (startedAt, endedAt) => {
    const start = new Date(startedAt);
    const end = endedAt ? new Date(endedAt) : new Date();
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins}m`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  const getStatusBadge = (status) => {
    const configs = {
      active: {
        bg: 'bg-green-500/10 text-green-500 border-green-500/20',
        icon: Activity,
        text: 'Active',
      },
      ended: {
        bg: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        icon: CheckCircle,
        text: 'Ended',
      },
    };

    const config = configs[status] || configs.ended;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${config.bg}`}>
        <Icon className="w-4 h-4" />
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
            <UserCheck className="w-8 h-8 text-purple-500" />
            <h1
              className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Tenant Impersonation
            </h1>
          </div>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Monitor and manage console → tenant impersonation sessions
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
                  Active Sessions
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.active}
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
              <Clock className="w-10 h-10 text-purple-500" />
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
                  Total Sessions
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.total}
                </p>
              </div>
              <UserCheck className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
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
                placeholder="Search by admin name, tenant, or reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Status Filter */}
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
              <option value="active">Active</option>
              <option value="ended">Ended</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchSessions}
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 font-medium disabled:opacity-50"
            >
              <Activity className="w-5 h-5" />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Sessions Table */}
        <div
          className={`rounded-xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          {loading && sessions.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck
                className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`}
              />
              <p
                className={`text-lg ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                No impersonation sessions found
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
                      Admin User
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Tenant
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Started
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Duration
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Status
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
                  {sessions.map((session) => (
                    <tr
                      key={session.id}
                      className={`${
                        theme === 'dark'
                          ? 'hover:bg-gray-700/30'
                          : 'hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {session.admin_name?.[0] || 'A'}
                            </span>
                          </div>
                          <div>
                            <div
                              className={`font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {session.admin_name}
                            </div>
                            <div
                              className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {session.admin_email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Building2
                            className={`w-4 h-4 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          />
                          <div>
                            <div
                              className={`font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {session.tenant_name}
                            </div>
                            <div
                              className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {session.tenant_subdomain}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {formatDate(session.started_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {calculateDuration(session.started_at, session.ended_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(session.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openDetailsModal(session)}
                            className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                            }`}
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {session.status === 'active' && (
                            <button
                              onClick={() => handleEndSession(session.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'hover:bg-red-900/30 text-gray-400 hover:text-red-400'
                                  : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
                              }`}
                              title="End Session"
                            >
                              <StopCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Details Modal */}
        {showDetailsModal && selectedSession && (
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
                  Impersonation Session Details
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
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Admin User
                  </label>
                  <div
                    className={`text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {selectedSession.admin_name} ({selectedSession.admin_email})
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Target Tenant
                  </label>
                  <div
                    className={`text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {selectedSession.tenant_name} ({selectedSession.tenant_subdomain})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Started At
                    </label>
                    <div
                      className={`text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {formatDate(selectedSession.started_at)}
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Ended At
                    </label>
                    <div
                      className={`text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {selectedSession.ended_at
                        ? formatDate(selectedSession.ended_at)
                        : 'Still active'}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Duration
                  </label>
                  <div
                    className={`text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {calculateDuration(
                      selectedSession.started_at,
                      selectedSession.ended_at
                    )}
                  </div>
                </div>

                {selectedSession.reason && (
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Reason
                    </label>
                    <div
                      className={`text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {selectedSession.reason}
                    </div>
                  </div>
                )}

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
                    {selectedSession.ip_address || 'N/A'}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Status
                  </label>
                  {getStatusBadge(selectedSession.status)}
                </div>
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

export default ImpersonationPage;
