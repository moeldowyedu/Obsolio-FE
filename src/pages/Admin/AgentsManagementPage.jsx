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
  Code,
  RotateCcw,
  Bot
} from 'lucide-react';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import AdminLayout from '../../components/layout/AdminLayout';
import IconPicker from '../../components/common/IconPicker';
import AgentFormModal from '../../components/admin/AgentFormModal';
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

  // Form state - Passed down to Modal now, mostly handled there but we need initial
  const [modalInitialData, setModalInitialData] = useState(null);

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

  const handleCreateAgent = async (formData) => {
    setLoading(true);
    try {
      // Parse JSON fields and construct clean payload
      const payload = {
        name: formData.name,
        slug: formData.slug,
        short_description: formData.short_description,
        long_description: formData.long_description,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        version: formData.version,
        developer: formData.developer,
        website_url: formData.website_url,
        documentation_url: formData.documentation_url,
        icon_url: formData.icon_url,
        // Map pricing fields
        price_model: formData.pricing_model,
        monthly_price: formData.monthly_price,
        hourly_rate: formData.hourly_rate,
        runtime_type: formData.runtime_type,
        // Categories - send only IDs
        category_ids: formData.categories,
        // JSON Configurations
        config_schema: JSON.parse(formData.config_schema || '{}'),
        capabilities: JSON.parse(formData.capabilities || '{}'),
        supported_languages: JSON.parse(formData.supported_languages || '["en"]'),
        extra_configuration: JSON.parse(formData.extra_configuration || '{}'),
      };

      console.log('Creating Agent Payload:', payload);
      await adminService.createAgent(payload);
      notify.success('Agent created successfully');
      setShowCreateModal(false);
      setModalInitialData(null);
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

  const handleEditAgent = async (formData) => {
    setLoading(true);
    try {
      // Parse JSON fields and construct clean payload
      const payload = {
        name: formData.name,
        slug: formData.slug,
        short_description: formData.short_description,
        long_description: formData.long_description,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        version: formData.version,
        developer: formData.developer,
        website_url: formData.website_url,
        documentation_url: formData.documentation_url,
        icon_url: formData.icon_url,
        // Map pricing fields
        price_model: formData.pricing_model,
        monthly_price: formData.monthly_price,
        hourly_rate: formData.hourly_rate,
        runtime_type: formData.runtime_type,
        // Categories - send only IDs
        category_ids: formData.categories,
        // JSON Configurations
        config_schema: JSON.parse(formData.config_schema || '{}'),
        capabilities: JSON.parse(formData.capabilities || '{}'),
        supported_languages: JSON.parse(formData.supported_languages || '["en"]'),
        extra_configuration: JSON.parse(formData.extra_configuration || '{}'),
      };

      console.log('Updating Agent Payload:', payload);
      await adminService.updateAgent(selectedAgent.id, payload);
      notify.success('Agent updated successfully');
      setShowEditModal(false);
      setSelectedAgent(null);
      setModalInitialData(null);
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
      if (statusFilter === 'trash') {
        // Force Delete
        await adminService.deleteAgent(selectedAgent.id);
        notify.success('Agent permanently deleted');
      } else {
        // Soft Delete (Move to Trash)
        await adminService.updateAgent(selectedAgent.id, { status: 'trash' });
        notify.success('Agent moved to trash');
      }
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

  const handleRestoreAgent = async (agent) => {
    if (!window.confirm('Are you sure you want to restore this agent?')) return;
    setLoading(true);
    try {
      await adminService.updateAgent(agent.id, { status: 'active' });
      notify.success('Agent restored successfully');
      fetchAgents();
    } catch (error) {
      console.error('Error restoring agent:', error);
      notify.error('Failed to restore agent');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setModalInitialData(null);
    setSelectedAgent(null);
  };

  const openEditModal = async (agent) => {
    // 1. Set basic info first
    setSelectedAgent(agent);

    // Initial categories
    let initialCategories = [];
    if (agent.categories && Array.isArray(agent.categories)) {
      initialCategories = agent.categories.map(cat => typeof cat === 'object' ? cat.id : cat);
    } else if (agent.category_id) {
      initialCategories = [agent.category_id];
    }

    const initialData = {
      name: agent.name,
      slug: agent.slug,
      description: agent.description || '',
      short_description: agent.short_description || '',
      long_description: agent.long_description || '',
      categories: initialCategories,
      is_active: agent.is_active || agent.status === 'active',
      is_featured: agent.is_featured || false,
      version: agent.version || '1.0.0',
      developer: agent.developer || '',
      website_url: agent.website_url || '',
      documentation_url: agent.documentation_url || '',
      icon_url: agent.icon_url || '',
      pricing_model: agent.pricing_model || agent.price_model || 'free',
      pricing_tier: agent.pricing_tier || 'free',
      hourly_rate: agent.hourly_rate || 0,
      monthly_price: agent.monthly_price || 0,
      runtime_type: agent.runtime_type || 'cloud',
      config_schema: agent.config_schema, // Pass as object if object
      capabilities: agent.capabilities,
      max_instances: agent.max_instances || 1,
      supported_languages: agent.supported_languages,
      extra_configuration: agent.extra_configuration
    };

    setModalInitialData(initialData);
    setShowEditModal(true);

    // 2. Fetch fresh categories
    try {
      const freshCategories = await adminService.getAgentCategoriesById(agent.id);
      if (freshCategories && Array.isArray(freshCategories)) {
        setModalInitialData(prev => ({
          ...prev,
          categories: freshCategories.map(c => c.id)
        }));
      }
    } catch (err) {
      console.error("Failed to fetch latest agent categories", err);
    }
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
      // If cat is an object with a name, use it directly (API now returns full objects)
      if (typeof cat === 'object' && cat.name) return cat.name;

      // Fallback: If it's an object without name (just ID wrapper) or a string ID, look it up
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
            onClick={() => {
              setModalInitialData(null);
              setShowCreateModal(true);
            }}
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
              <option value="trash">Trash</option>
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
                      <td colSpan="7" className="px-6 py-3">
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
                      <td className="px-6 py-3">
                        <input
                          type="checkbox"
                          checked={selectedAgents.includes(agent.id)}
                          onChange={() => handleSelectAgent(agent.id)}
                          className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10 flex-shrink-0">
                            <img
                              src={agent.icon_url || 'https://via.placeholder.com/40'}
                              alt={agent.name}
                              className={`w-full h-full rounded-lg object-cover dark:invert transition-opacity duration-300 ${!agent.icon_url ? 'hidden' : ''}`}
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className={`absolute inset-0 w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${agent.icon_url ? 'hidden' : 'flex'}`}>
                              <Bot className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            </div>
                          </div>
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
                      <td className="px-6 py-3">
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
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${agent.is_active
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                          }`}>
                          {agent.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
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
                      <td className="px-6 py-3">
                        <div className="flex items-center space-x-2">
                          {agent.runtime_type === 'cloud' && <Cloud className="w-4 h-4 text-blue-500" />}
                          {agent.runtime_type === 'edge' && <Cpu className="w-4 h-4 text-purple-500" />}
                          {agent.runtime_type === 'hybrid' && <Zap className="w-4 h-4 text-yellow-500" />}
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                            {agent.runtime_type.charAt(0).toUpperCase() + agent.runtime_type.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right">
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
                          {statusFilter === 'trash' ? (
                            <button
                              onClick={() => handleRestoreAgent(agent)}
                              className="p-2 rounded-lg transition-colors hover:bg-green-500/10 text-green-500"
                              title="Restore"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          ) : null}
                          <button
                            onClick={() => openDeleteModal(agent)}
                            className="p-2 rounded-lg transition-colors hover:bg-red-500/10 text-red-500"
                            title={statusFilter === 'trash' ? "Force Delete" : "Move to Trash"}
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
        <AgentFormModal
          isOpen={showCreateModal || showEditModal}
          onClose={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            setModalInitialData(null);
          }}
          onSubmit={showEditModal ? handleEditAgent : handleCreateAgent}
          initialData={modalInitialData}
          categories={categories}
          loading={loading}
        />

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-md rounded-2xl shadow-xl p-6 ${theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {statusFilter === 'trash' ? 'Permanently Delete Agent?' : 'Move to Trash?'}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>
                  {statusFilter === 'trash'
                    ? `Are you sure you want to permanently delete "${selectedAgent.name}"? This action cannot be undone.`
                    : `Are you sure you want to move "${selectedAgent.name}" to the trash? You can restore it later.`}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${theme === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAgent}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  {statusFilter === 'trash' ? 'Force Delete' : 'Move to Trash'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AgentsManagementPage;
