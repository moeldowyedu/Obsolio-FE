import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Link2,
  Code,
  CheckCircle,
  XCircle,
  Activity,
  Globe,
  Lock,
  Unlock,
} from 'lucide-react';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import AdminLayout from '../../components/layout/AdminLayout';

const AgentEndpointsPage = () => {
  const { theme } = useTheme();
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    path: '',
    method: 'GET',
    description: '',
    is_active: true,
    requires_auth: true,
    rate_limit: 100,
    timeout_seconds: 30,
  });

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    fetchEndpoints();
  }, [currentPage, searchQuery, statusFilter, methodFilter]);

  const fetchEndpoints = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: perPage,
        search: searchQuery || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        method: methodFilter !== 'all' ? methodFilter : undefined,
      };

      const response = await adminService.getAgentEndpoints(params);

      // Handle different response structures
      let endpointsData = [];
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        endpointsData = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        endpointsData = response.data;
      } else if (Array.isArray(response)) {
        endpointsData = response;
      }

      setEndpoints(endpointsData);

      // Calculate stats
      const activeCount = endpointsData.filter(e => e.is_active).length;
      const totalRequests = endpointsData.reduce((sum, e) => sum + (e.total_requests || 0), 0);

      setStats({
        total: endpointsData.length,
        active: activeCount,
        inactive: endpointsData.length - activeCount,
        totalRequests: totalRequests,
      });
    } catch (error) {
      console.error('Error fetching agent endpoints:', error);
      notify.error('Failed to load agent endpoints');
      setEndpoints([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEndpoint = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.createAgentEndpoint(formData);
      notify.success('Endpoint created successfully');
      setShowCreateModal(false);
      resetForm();
      fetchEndpoints();
    } catch (error) {
      console.error('Error creating endpoint:', error);
      notify.error(error.response?.data?.message || 'Failed to create endpoint');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEndpoint = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.updateAgentEndpoint(selectedEndpoint.id, formData);
      notify.success('Endpoint updated successfully');
      setShowEditModal(false);
      resetForm();
      fetchEndpoints();
    } catch (error) {
      console.error('Error updating endpoint:', error);
      notify.error(error.response?.data?.message || 'Failed to update endpoint');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEndpoint = async () => {
    setLoading(true);
    try {
      await adminService.deleteAgentEndpoint(selectedEndpoint.id);
      notify.success('Endpoint deleted successfully');
      setShowDeleteModal(false);
      setSelectedEndpoint(null);
      fetchEndpoints();
    } catch (error) {
      console.error('Error deleting endpoint:', error);
      notify.error(error.response?.data?.message || 'Failed to delete endpoint');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      path: '',
      method: 'GET',
      description: '',
      is_active: true,
      requires_auth: true,
      rate_limit: 100,
      timeout_seconds: 30,
    });
    setSelectedEndpoint(null);
  };

  const openEditModal = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setFormData({
      name: endpoint.name,
      slug: endpoint.slug,
      path: endpoint.path,
      method: endpoint.method,
      description: endpoint.description || '',
      is_active: endpoint.is_active,
      requires_auth: endpoint.requires_auth,
      rate_limit: endpoint.rate_limit || 100,
      timeout_seconds: endpoint.timeout_seconds || 30,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setShowDeleteModal(true);
  };

  const getMethodBadgeColor = (method) => {
    const colors = {
      GET: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      POST: 'bg-green-500/10 text-green-500 border-green-500/20',
      PUT: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      PATCH: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      DELETE: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    return colors[method] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Agent Endpoints
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>
              Manage API endpoints that agents can access
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Endpoint</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <Link2 className="w-8 h-8 text-blue-500" />
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stats.total}
              </span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total Endpoints</p>
          </div>

          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stats.active}
              </span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Active</p>
          </div>

          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-red-500" />
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stats.inactive}
              </span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Inactive</p>
          </div>

          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-purple-500" />
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stats.totalRequests.toLocaleString()}
              </span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total Requests</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`p-6 rounded-xl border mb-6 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search endpoints by name or path..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Method Filter */}
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="all">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>

        {/* Endpoints Table */}
        <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : endpoints.length === 0 ? (
            <div className="text-center py-12">
              <Link2 className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-slate-300'}`} />
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                No endpoints found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Endpoint
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Method
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Path
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Auth
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Requests
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-slate-200'}`}>
                  {endpoints.map((endpoint) => (
                    <tr key={endpoint.id} className={theme === 'dark' ? 'hover:bg-gray-900/30' : 'hover:bg-slate-50'}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            endpoint.is_active
                              ? 'bg-purple-500/10 text-purple-500'
                              : 'bg-gray-500/10 text-gray-500'
                          }`}>
                            <Link2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                              {endpoint.name}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                              {endpoint.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getMethodBadgeColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <code className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                          {endpoint.path}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        {endpoint.requires_auth ? (
                          <Lock className="w-4 h-4 text-orange-500" />
                        ) : (
                          <Unlock className="w-4 h-4 text-gray-500" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>
                          {(endpoint.total_requests || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          endpoint.is_active
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {endpoint.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(endpoint)}
                            className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'
                            }`}
                            title="Edit endpoint"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(endpoint)}
                            className="p-2 rounded-lg transition-colors hover:bg-red-500/10 text-red-500"
                            title="Delete endpoint"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-2xl rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Create New Endpoint
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-slate-100 text-slate-400'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateEndpoint} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Endpoint Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="e.g., Weather API"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="e.g., weather-api"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      HTTP Method *
                    </label>
                    <select
                      required
                      value={formData.method}
                      onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      API Path *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.path}
                      onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="/api/weather"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Endpoint description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Rate Limit (requests/min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.rate_limit}
                      onChange={(e) => setFormData({ ...formData, rate_limit: parseInt(e.target.value) })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.timeout_seconds}
                      onChange={(e) => setFormData({ ...formData, timeout_seconds: parseInt(e.target.value) })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Active
                    </span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requires_auth}
                      onChange={(e) => setFormData({ ...formData, requires_auth: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Requires Authentication
                    </span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Endpoint'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal - Similar structure to Create Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-2xl rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Edit Endpoint
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-slate-100 text-slate-400'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateEndpoint} className="p-6 space-y-4">
                {/* Same form fields as Create Modal */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Endpoint Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      HTTP Method *
                    </label>
                    <select
                      required
                      value={formData.method}
                      onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      API Path *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.path}
                      onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Rate Limit (requests/min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.rate_limit}
                      onChange={(e) => setFormData({ ...formData, rate_limit: parseInt(e.target.value) })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.timeout_seconds}
                      onChange={(e) => setFormData({ ...formData, timeout_seconds: parseInt(e.target.value) })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Active
                    </span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requires_auth}
                      onChange={(e) => setFormData({ ...formData, requires_auth: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Requires Authentication
                    </span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Endpoint'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-md rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Delete Endpoint
              </h2>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                Are you sure you want to delete "{selectedEndpoint?.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedEndpoint(null);
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEndpoint}
                  disabled={loading}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AgentEndpointsPage;
