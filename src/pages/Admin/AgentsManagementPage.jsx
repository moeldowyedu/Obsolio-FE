import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  XCircle,
  Cloud,
  Cpu,
  Zap,
  Tag,
  Hash,
  Activity,
  Calendar,
  Code
} from 'lucide-react';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import AdminLayout from '../../components/layout/AdminLayout';
import IconPicker from '../../components/common/IconPicker';
import { safeFormatNumber } from '../../utils/numberFormatter';

const AgentsManagementPage = () => {
  const { theme } = useTheme();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [runtimeFilter, setRuntimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at:desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Selection
  const [selectedAgents, setSelectedAgents] = useState([]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Icon Picker state
  const [showIconPicker, setShowIconPicker] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    long_description: '',
    categories: [], // Array of UUIDs
    is_active: true,
    is_featured: false,
    version: '1.0.0',
    developer: '',
    website_url: '',
    documentation_url: '',
    icon_url: '',
    pricing_model: 'free',
    pricing_tier: 'free',
    hourly_rate: 0,
    monthly_price: 0,
    runtime_type: 'cloud',
    config_schema: '{}', // JSON string
    capabilities: '{}', // JSON string
    max_instances: 1,
    supported_languages: '["en"]', // JSON string
    extra_configuration: '{}' // JSON string
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    featured: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [currentPage, searchQuery, statusFilter, categoryFilter, runtimeFilter, sortBy]);

  const fetchCategories = async () => {
    try {
      const response = await adminService.getAgentCategories();
      // Handle both array directly or nested data structure
      let categoriesData = [];

      // Check for HTML response (safety check)
      if (typeof response === 'string' && response.trim().startsWith('<')) {
        console.error('API returned HTML instead of JSON for categories');
        setCategories([]);
        return;
      }

      if (response && Array.isArray(response)) {
        categoriesData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        categoriesData = response.data;
      } else if (response && response.data) {
        // Fallback for object with data property
        categoriesData = [];
      }

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Don't show toast error here to avoid spamming usage
      setCategories([]);
    }
  };

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: perPage,
        search: searchQuery || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        category: categoryFilter.length > 0 ? categoryFilter.join(',') : undefined,
        runtime_type: runtimeFilter !== 'all' ? runtimeFilter : undefined,
        sort: sortBy
      };

      const response = await adminService.getAllAgents(params);

      // Check for HTML response (indicates API error/fallback)
      if (typeof response === 'string' && response.trim().startsWith('<')) {
        console.error('API returned HTML instead of JSON for agents');
        notify.error('API Error: Received Invalid Response');
        setAgents([]);
        return;
      }

      // Handle different response structures
      let agentsData = [];
      let pagination = {};

      if (response && response.data && (Array.isArray(response.data) || Array.isArray(response.data.data))) {
        if (Array.isArray(response.data.data)) {
          agentsData = response.data.data;
          pagination = response.data;
        } else {
          agentsData = response.data;
        }
      } else if (Array.isArray(response)) {
        agentsData = response;
      } else if (response && Array.isArray(response.data)) {
        agentsData = response.data;
      } else {
        // Fallback if structure is unknown but arguably array-like in data
        agentsData = Array.isArray(response.data) ? response.data : [];
      }

      setAgents(agentsData);

      // Update pagination if available
      if (pagination.last_page) {
        setTotalPages(pagination.last_page);
      }

      // Calculate stats from data
      setStats({
        total: pagination.total || agentsData.length,
        active: agentsData.filter(a => a.is_active).length,
        inactive: agentsData.filter(a => !a.is_active).length,
        featured: agentsData.filter(a => a.is_featured).length
      });

    } catch (error) {
      console.error('Error fetching agents:', error);
      notify.error('Failed to load agents');
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAgents(agents.map(a => a.id));
    } else {
      setSelectedAgents([]);
    }
  };

  const handleSelectAgent = (agentId) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Parse JSON fields
      const payload = {
        ...formData,
        config_schema: JSON.parse(formData.config_schema || '{}'),
        capabilities: JSON.parse(formData.capabilities || '{}'),
        supported_languages: JSON.parse(formData.supported_languages || '["en"]'),
        extra_configuration: JSON.parse(formData.extra_configuration || '{}'),
        categories: formData.categories, // Send as array of UUIDs
        category_ids: formData.categories // Send as category_ids alias for backend sync compatibility
      };

      await adminService.createAgent(payload);
      notify.success('Agent created successfully');
      setShowCreateModal(false);
      resetForm();
      fetchAgents();
    } catch (error) {
      console.error('Error creating agent:', error);
      if (error instanceof SyntaxError) {
        notify.error('Invalid JSON in Configuration fields');
      } else {
        notify.error(error.response?.data?.message || 'Failed to create agent');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditAgent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Parse JSON fields
      const payload = {
        ...formData,
        config_schema: JSON.parse(formData.config_schema || '{}'),
        capabilities: JSON.parse(formData.capabilities || '{}'),
        supported_languages: JSON.parse(formData.supported_languages || '["en"]'),
        extra_configuration: JSON.parse(formData.extra_configuration || '{}'),
        categories: formData.categories, // Send as array of UUIDs
        category_ids: formData.categories // Send as category_ids alias for backend sync compatibility
      };

      await adminService.updateAgent(selectedAgent.id, payload);
      notify.success('Agent updated successfully');
      setShowEditModal(false);
      setSelectedAgent(null);
      resetForm();
      fetchAgents();
    } catch (error) {
      console.error('Error updating agent:', error);
      if (error instanceof SyntaxError) {
        notify.error('Invalid JSON in Configuration fields');
      } else {
        notify.error(error.response?.data?.message || 'Failed to update agent');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAgent = async () => {
    setLoading(true);
    try {
      await adminService.deleteAgent(selectedAgent.id);
      notify.success('Agent deleted successfully');
      setShowDeleteModal(false);
      setSelectedAgent(null);
      fetchAgents();
    } catch (error) {
      console.error('Error deleting agent:', error);
      notify.error(error.response?.data?.message || 'Failed to delete agent');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      short_description: '',
      long_description: '',
      categories: [],
      is_active: true,
      is_featured: false,
      version: '1.0.0',
      developer: '',
      website_url: '',
      documentation_url: '',
      icon_url: '',
      pricing_model: 'free',
      pricing_tier: 'free',
      hourly_rate: 0,
      monthly_price: 0,
      runtime_type: 'cloud',
      config_schema: '{}',
      capabilities: '{}',
      max_instances: 1,
      supported_languages: '["en"]',
      extra_configuration: '{}'
    });
    setSelectedAgent(null);
  };

  const openEditModal = (agent) => {
    // Handle categories (ensure array of IDs)
    let agentCategories = [];
    if (agent.categories && Array.isArray(agent.categories)) {
      agentCategories = agent.categories.map(cat =>
        typeof cat === 'object' ? cat.id : cat
      );
    } else if (agent.category_id) {
      agentCategories = [agent.category_id]; // Fallback
    }

    setSelectedAgent(agent);
    setFormData({
      name: agent.name,
      slug: agent.slug,
      description: agent.description || '',
      short_description: agent.short_description || '',
      long_description: agent.long_description || '',
      categories: agentCategories,
      is_active: agent.is_active || agent.status === 'active',
      is_featured: agent.is_featured || false,
      version: agent.version || '1.0.0',
      developer: agent.developer || '',
      website_url: agent.website_url || '',
      documentation_url: agent.documentation_url || '',
      icon_url: agent.icon_url || '',
      pricing_model: agent.pricing_model || 'free',
      pricing_tier: agent.pricing_tier || 'free',
      hourly_rate: agent.hourly_rate || 0,
      monthly_price: agent.monthly_price || 0,
      runtime_type: agent.runtime_type || 'cloud',
      config_schema: typeof agent.config_schema === 'object' ? JSON.stringify(agent.config_schema, null, 2) : (agent.config_schema || '{}'),
      capabilities: typeof agent.capabilities === 'object' ? JSON.stringify(agent.capabilities, null, 2) : (agent.capabilities || '{}'),
      max_instances: agent.max_instances || 1,
      supported_languages: typeof agent.supported_languages === 'object' ? JSON.stringify(agent.supported_languages) : (agent.supported_languages || '["en"]'),
      extra_configuration: typeof agent.extra_configuration === 'object' ? JSON.stringify(agent.extra_configuration, null, 2) : (agent.extra_configuration || '{}')
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (agent) => {
    setSelectedAgent(agent);
    setShowDeleteModal(true);
  };

  const handleIconSelect = (iconUrl) => {
    setFormData({
      ...formData,
      icon_url: iconUrl
    });
    setShowIconPicker(false);
  };

  // Helper for category display
  const getCategoryNames = (catIdsOrObjects) => {
    if (!catIdsOrObjects || !Array.isArray(catIdsOrObjects)) return ['Uncategorized'];

    return catIdsOrObjects.map(cat => {
      const id = typeof cat === 'object' ? cat.id : cat;
      const foundCat = categories.find(c => c.id === id);
      return foundCat ? foundCat.name : 'Unknown';
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Agents List
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>
              Manage and configure AI agents available in the marketplace
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Agent</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-8 h-8 text-blue-500" />
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stats.total}
              </span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total Agents</p>
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
              <Zap className="w-8 h-8 text-yellow-500" />
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stats.featured}
              </span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Featured</p>
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
                placeholder="Search agents by name, tag, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${theme === 'dark'
                ? 'bg-gray-900 border-gray-700 text-white'
                : 'bg-white border-slate-300 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Runtime Filter */}
            <select
              value={runtimeFilter}
              onChange={(e) => setRuntimeFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${theme === 'dark'
                ? 'bg-gray-900 border-gray-700 text-white'
                : 'bg-white border-slate-300 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="all">All Runtimes</option>
              <option value="cloud">Cloud</option>
              <option value="edge">Edge</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Agents Table */}
        <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}>
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedAgents.length === agents.length && agents.length > 0}
                      className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    Agent Details
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    Categories
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    Status
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    Pricing
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    Runtime
                  </th>
                  <th className={`px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-slate-200'}`}>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan="7" className="px-6 py-4">
                        <div className="animate-pulse flex space-x-4">
                          <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                          <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : agents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className={`px-6 py-12 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      No agents found matching your criteria
                    </td>
                  </tr>
                ) : (
                  agents.map((agent) => (
                    <tr key={agent.id} className={theme === 'dark' ? 'hover:bg-gray-900/30' : 'hover:bg-slate-50'}>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedAgents.includes(agent.id)}
                          onChange={() => handleSelectAgent(agent.id)}
                          className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={agent.icon_url || 'https://via.placeholder.com/40'}
                            alt={agent.name}
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40?text=AI';
                            }}
                          />
                          <div>
                            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                              {agent.name}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                              v{agent.version} • {agent.developer}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {getCategoryNames(agent.categories).map((catName, idx) => (
                            <span key={idx} className={`px-2 py-0.5 rounded text-xs font-medium border ${theme === 'dark'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : 'bg-blue-50 text-blue-600 border-blue-200'
                              }`}>
                              {catName}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${agent.is_active
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                          }`}>
                          {agent.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                          {agent.pricing_model === 'free' ? (
                            'Free'
                          ) : (
                            <span>
                              {safeFormatNumber(agent.monthly_price)}/mo
                              <span className="text-xs opacity-60 block">
                                + {safeFormatNumber(agent.hourly_rate)}/hr
                              </span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {agent.runtime_type === 'cloud' && <Cloud className="w-4 h-4 text-blue-500" />}
                          {agent.runtime_type === 'edge' && <Cpu className="w-4 h-4 text-purple-500" />}
                          {agent.runtime_type === 'hybrid' && <Zap className="w-4 h-4 text-yellow-500" />}
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                            {agent.runtime_type.charAt(0).toUpperCase() + agent.runtime_type.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(agent)}
                            className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                              ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                              : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'
                              }`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(agent)}
                            className="p-2 rounded-lg transition-colors hover:bg-red-500/10 text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {(showCreateModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-4xl rounded-xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-700 bg-inherit rounded-t-xl">
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {showCreateModal ? 'Create New Agent' : 'Edit Agent'}
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

              <form onSubmit={showCreateModal ? handleCreateAgent : handleEditAgent} className="p-6 space-y-6">

                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'} border-b border-gray-700 pb-2`}>
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
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
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={formData.short_description}
                      onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Long Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.long_description}
                      onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Categories
                      </label>
                      <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-slate-300'
                        }`}>
                        <div className="mb-2 flex flex-wrap gap-2">
                          {formData.categories.map(catId => {
                            const cat = categories.find(c => c.id === catId);
                            return (
                              <span key={catId} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                {cat ? cat.name : 'Unknown'}
                                <button
                                  type="button"
                                  onClick={() => setFormData({
                                    ...formData,
                                    categories: formData.categories.filter(id => id !== catId)
                                  })}
                                  className="ml-1 hover:text-white"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                        <select
                          value=""
                          onChange={(e) => {
                            if (e.target.value && !formData.categories.includes(e.target.value)) {
                              setFormData({
                                ...formData,
                                categories: [...formData.categories, e.target.value]
                              });
                            }
                          }}
                          className={`w-full bg-transparent border-none focus:ring-0 p-0 text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}
                        >
                          <option value="">Add category...</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id} disabled={formData.categories.includes(cat.id)}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Icon
                      </label>
                      <div className="flex space-x-2">
                        <div className={`w-10 h-10 rounded border flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-slate-300 bg-white'
                          }`}>
                          {formData.icon_url ? (
                            <img src={formData.icon_url} alt="Icon" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-500">No Icon</span>
                          )}
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={formData.icon_url}
                          className={`flex-1 px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-gray-900 border-gray-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          placeholder="Select an icon..."
                        />
                        <button
                          type="button"
                          onClick={() => setShowIconPicker(true)}
                          className={`px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                            : 'border-slate-300 hover:bg-slate-100 text-slate-600'
                            }`}
                        >
                          Choose
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configuration */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'} border-b border-gray-700 pb-2`}>
                    Configuration & Schema
                  </h3>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Config Schema (JSON)
                    </label>
                    <div className="relative">
                      <Code className={`absolute left-3 top-3 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                      <textarea
                        rows={4}
                        value={formData.config_schema}
                        onChange={(e) => setFormData({ ...formData, config_schema: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border font-mono text-sm ${theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-gray-300'
                          : 'bg-white border-slate-300 text-slate-800'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Extra Configuration (JSON)
                    </label>
                    <div className="relative">
                      <Code className={`absolute left-3 top-3 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                      <textarea
                        rows={4}
                        value={formData.extra_configuration}
                        onChange={(e) => setFormData({ ...formData, extra_configuration: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border font-mono text-sm ${theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-gray-300'
                          : 'bg-white border-slate-300 text-slate-800'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        spellCheck="false"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Limits */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'} border-b border-gray-700 pb-2`}>
                    Pricing & Limits
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Pricing Model
                      </label>
                      <select
                        value={formData.pricing_model}
                        onChange={(e) => setFormData({ ...formData, pricing_model: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      >
                        <option value="free">Free</option>
                        <option value="subscription">Subscription</option>
                        <option value="usage">Usage Based</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Monthly Price ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.monthly_price}
                        onChange={(e) => setFormData({ ...formData, monthly_price: parseFloat(e.target.value) })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 pt-4">
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
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Featured
                    </span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${theme === 'dark'
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
                    {loading ? 'Saving...' : (showCreateModal ? 'Create Agent' : 'Update Agent')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-md rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-full bg-red-500/10 text-red-500">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Delete Agent
                </h3>
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                Are you sure you want to delete this agent? This action cannot be undone.
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
                  onClick={handleDeleteAgent}
                  disabled={loading}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Icon Picker Modal */}
        <IconPicker
          isOpen={showIconPicker}
          onClose={() => setShowIconPicker(false)}
          onSelect={handleIconSelect}
        />

      </div>
    </AdminLayout>
  );
};

export default AgentsManagementPage;
