import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Link2,
  Eye,
  EyeOff,
  Globe,
  Key
} from 'lucide-react';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import AdminLayout from '../../components/layout/AdminLayout';

const AgentEndpointsPage = () => {
  const { theme } = useTheme();
  const [endpoints, setEndpoints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  // UI States
  const [showSecret, setShowSecret] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    agent_id: '',
    type: 'primary',
    url: '',
    secret: '',
    is_active: true
  });

  useEffect(() => {
    fetchAgents();
    fetchEndpoints();
  }, [currentPage, searchQuery]);

  const fetchAgents = async () => {
    try {
      const response = await adminService.getAllAgents({ per_page: 100 });
      if (response.data && Array.isArray(response.data)) {
        setAgents(response.data);
      } else if (Array.isArray(response)) {
        setAgents(response);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      notify.error('Failed to load agents list');
    }
  };

  const fetchEndpoints = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: perPage,
        search: searchQuery || undefined
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
      agent_id: '',
      type: 'primary',
      url: '',
      secret: '',
      is_active: true
    });
    setSelectedEndpoint(null);
  };

  const openEditModal = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setFormData({
      agent_id: endpoint.agent_id,
      type: endpoint.type,
      url: endpoint.url,
      secret: endpoint.secret,
      is_active: endpoint.is_active
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setShowDeleteModal(true);
  };

  const toggleSecretVisibility = (id) => {
    setShowSecret(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getAgentName = (agentId) => {
    const agent = agents.find(a => a.id === agentId);
    return agent ? agent.name : 'Unknown Agent';
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
              Manage external endpoints for your agents
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

        {/* Filters */}
        <div className={`p-6 rounded-xl border mb-6 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search endpoints by type or URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
          </div>
        </div>

        {/* Endpoints Table */}
        <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
          {loading && endpoints.length === 0 ? (
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
                      Agent
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Type
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      URL
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Secret
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
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {getAgentName(endpoint.agent_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}>
                          {endpoint.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Globe className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                            {endpoint.url}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <code className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-slate-100 text-slate-600'}`}>
                            {showSecret[endpoint.id] ? endpoint.secret : '••••••••••••••••'}
                          </code>
                          <button
                            onClick={() => toggleSecretVisibility(endpoint.id)}
                            className={`p-1 rounded hover:bg-opacity-20 ${theme === 'dark' ? 'hover:bg-gray-500 text-gray-400' : 'hover:bg-slate-200 text-gray-500'}`}
                          >
                            {showSecret[endpoint.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${endpoint.is_active
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
                            className={`p-2 rounded-lg transition-colors ${theme === 'dark'
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

        {/* Create/Edit Modal */}
        {(showCreateModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-lg rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {showCreateModal ? 'Create Endpoint' : 'Edit Endpoint'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-slate-100 text-slate-400'
                    }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={showCreateModal ? handleCreateEndpoint : handleUpdateEndpoint} className="p-6 space-y-4">

                {/* Agent Selection */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                    Select Agent *
                  </label>
                  <select
                    required
                    value={formData.agent_id}
                    onChange={(e) => setFormData({ ...formData, agent_id: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="">Choose an agent...</option>
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.id}>{agent.name} ({agent.slug})</option>
                    ))}
                  </select>
                </div>

                {/* Endpoint Type */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                    Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="e.g., primary, webhook, analytics"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                    URL *
                  </label>
                  <div className="relative">
                    <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="https://api.example.com/endpoint"
                    />
                  </div>
                </div>

                {/* Secret */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                    Secret *
                  </label>
                  <div className="relative">
                    <Key className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      required
                      value={formData.secret}
                      onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="Endpoint secret key"
                    />
                  </div>
                </div>

                {/* Is Active */}
                <div className="pt-2">
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
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (showCreateModal ? 'Create Endpoint' : 'Update Endpoint')}
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
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-full bg-red-500/10 text-red-500">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Delete Endpoint
                </h3>
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                Are you sure you want to delete this endpoint? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEndpoint}
                  disabled={loading}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
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
