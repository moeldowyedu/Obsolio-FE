import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import AdminLayout from '../../components/layout/AdminLayout';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import { safeFormatNumber } from '../../utils/numberFormatter';
import IconPicker from '../../components/common/IconPicker';
import {
  Bot, Plus, Search, Filter, Download, Trash2, Edit,
  Power, PlayCircle, BarChart3, X, Code, Package, AlertCircle,
  ChevronDown, ChevronUp, MoreVertical, Check, Image as ImageIcon
} from 'lucide-react';

const AgentsManagementPage = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [runtimeFilter, setRuntimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_desc');
  const [showFilters, setShowFilters] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(20);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    featured: 0
  });

  // Form State for Create/Edit
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categories: [],
    description: '',
    long_description: '',
    runtime_type: 'python',
    version: '1.0.0',
    code: '',
    requirements: '',
    config_schema: '{}',
    capabilities: '{}',
    supported_languages: '["en"]',
    price_model: 'free',
    base_price: 0,
    monthly_price: '',
    annual_price: '',
    execution_timeout_ms: 30000,
    is_active: true,
    is_featured: false,
    icon_url: '',
    documentation: ''
  });

  // Categories State
  const [categories, setCategories] = useState([]);

  // Fetch agents data
  useEffect(() => {
    fetchAgents();
  }, [currentPage, perPage, statusFilter, categoryFilter, runtimeFilter, sortBy, searchQuery]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await adminService.getAgentCategories();

      // Check for HTML response (indicates API error/fallback)
      if (typeof response === 'string' && response.trim().startsWith('<')) {
        console.error('API returned HTML instead of JSON for categories');
        return;
      }

      // Handle different response structures
      let categoriesData = [];
      if (response && response.data && Array.isArray(response.data)) {
        categoriesData = response.data;
      } else if (Array.isArray(response)) {
        categoriesData = response;
      } else if (response && response.data && Array.isArray(response.data.data)) {
        categoriesData = response.data.data;
      }

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Don't show error toast for categories as it's not critical
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
      } else if (response && response.data) {
        // Fallback for wrapped data
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

  const handleBulkActivate = async () => {
    if (selectedAgents.length === 0) return;

    setLoading(true);
    try {
      await adminService.bulkActivateAgents(selectedAgents);
      notify.success(`${selectedAgents.length} agent(s) activated successfully`);
      setSelectedAgents([]);
      fetchAgents();
    } catch (error) {
      console.error('Error activating agents:', error);
      notify.error('Failed to activate agents');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDeactivate = async () => {
    if (selectedAgents.length === 0) return;

    setLoading(true);
    try {
      await adminService.bulkDeactivateAgents(selectedAgents);
      notify.success(`${selectedAgents.length} agent(s) deactivated successfully`);
      setSelectedAgents([]);
      fetchAgents();
    } catch (error) {
      console.error('Error deactivating agents:', error);
      notify.error('Failed to deactivate agents');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    console.log('Exporting agents...');
    // TODO: Implement export functionality
  };

  const openEditModal = (agent) => {
    setSelectedAgent(agent);
    setFormData({
      name: agent.name,
      slug: agent.slug,
      categories: agent.categories?.map(c => c.id) || [],
      description: agent.description,
      long_description: agent.long_description || '',
      runtime_type: agent.runtime_type,
      version: agent.version,
      code: agent.code || '',
      requirements: agent.requirements || '',
      config_schema: typeof agent.config_schema === 'object' ? JSON.stringify(agent.config_schema, null, 2) : (agent.config_schema || '{}'),
      capabilities: typeof agent.capabilities === 'object' ? JSON.stringify(agent.capabilities, null, 2) : (agent.capabilities || '{}'),
      supported_languages: typeof agent.supported_languages === 'object' ? JSON.stringify(agent.supported_languages, null, 2) : (agent.supported_languages || '["en"]'),
      price_model: agent.price_model || 'free',
      base_price: agent.base_price || 0,
      monthly_price: agent.monthly_price || '',
      annual_price: agent.annual_price || '',
      execution_timeout_ms: agent.execution_timeout_ms || 30000,
      is_active: agent.is_active !== undefined ? agent.is_active : (agent.status === 'active'),
      is_featured: agent.is_featured,
      icon_url: agent.icon_url || '',
      documentation: agent.documentation || ''
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (agent) => {
    setSelectedAgent(agent);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      categories: [],
      description: '',
      long_description: '',
      runtime_type: 'python',
      version: '1.0.0',
      code: '',
      requirements: '',
      config_schema: '{}',
      capabilities: '{}',
      supported_languages: '["en"]',
      price_model: 'free',
      base_price: 0,
      monthly_price: '',
      annual_price: '',
      execution_timeout_ms: 30000,
      is_active: true,
      is_featured: false,
      icon_url: '',
      documentation: ''
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Agents Management
            </h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Manage platform agents, versions, and configurations
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create Agent</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total Agents</p>
                <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Bot className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Active</p>
                <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {stats.active}
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Power className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Inactive</p>
                <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {stats.inactive}
                </p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Featured</p>
                <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {stats.featured}
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search agents by name, slug, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme === 'dark'
                  ? 'bg-gray-800 border-white/10 text-white placeholder-gray-400'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${theme === 'dark'
                ? 'bg-gray-800 border-white/10 text-white hover:bg-gray-700'
                : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
                }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Bulk Actions */}
            {selectedAgents.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBulkActivate}
                  className={`px-4 py-2 rounded-lg border ${theme === 'dark'
                    ? 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'
                    : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                    }`}
                >
                  Activate ({selectedAgents.length})
                </button>
                <button
                  onClick={handleBulkDeactivate}
                  className={`px-4 py-2 rounded-lg border ${theme === 'dark'
                    ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                    : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                    }`}
                >
                  Deactivate ({selectedAgents.length})
                </button>
              </div>
            )}

            {/* Export */}
            <button
              onClick={handleExport}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${theme === 'dark'
                ? 'bg-gray-800 border-white/10 text-white hover:bg-gray-700'
                : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
                }`}
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className={`mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
              {/* Status Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark'
                    ? 'bg-gray-800 border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                    }`}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Runtime Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                  Runtime Type
                </label>
                <select
                  value={runtimeFilter}
                  onChange={(e) => setRuntimeFilter(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark'
                    ? 'bg-gray-800 border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                    }`}
                >
                  <option value="all">All Runtimes</option>
                  <option value="python">Python</option>
                  <option value="nodejs">Node.js</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark'
                    ? 'bg-gray-800 border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                    }`}
                >
                  <option value="created_desc">Newest First</option>
                  <option value="created_asc">Oldest First</option>
                  <option value="name_asc">Name A-Z</option>
                  <option value="name_desc">Name Z-A</option>
                  <option value="runs_desc">Most Runs</option>
                  <option value="runs_asc">Least Runs</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setCategoryFilter([]);
                    setRuntimeFilter('all');
                    setSortBy('created_desc');
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                    ? 'bg-gray-800 border-white/10 text-gray-300 hover:bg-gray-700'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Agents Table */}
        <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200'}`}>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : agents.length === 0 ? (
            <div className="text-center py-12">
              <Bot className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-slate-300'}`} />
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                No agents found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-slate-50'}`}>
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedAgents.length === agents.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Agent Name
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Categories
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Runtime
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Version
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Status
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Total Runs
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Success Rate
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Created
                    </th>
                    <th className={`px-4 py-3 text-right text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-slate-200'}`}>
                  {agents.map((agent) => (
                    <tr
                      key={agent.id}
                      className={`${theme === 'dark' ? 'hover:bg-gray-800/30' : 'hover:bg-slate-50'} transition-colors`}
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedAgents.includes(agent.id)}
                          onChange={() => handleSelectAgent(agent.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                            <Bot className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                              {agent.name}
                              {agent.is_featured && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500/10 text-yellow-500 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                              {agent.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(agent.categories) && agent.categories.length > 0 ? (
                            agent.categories.map((cat, idx) => (
                              <span key={idx} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {cat.name}
                              </span>
                            ))
                          ) : (
                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          {agent.runtime_type === 'python' ? (
                            <Code className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Package className="w-4 h-4 text-green-500" />
                          )}
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                            {agent.runtime_type}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          v{agent.version}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${agent.status === 'active'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-red-500/10 text-red-500'
                            }`}
                        >
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          {safeFormatNumber(agent.total_runs)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                              style={{ width: `${agent.success_rate}%` }}
                            />
                          </div>
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                            {agent.success_rate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                          {formatDate(agent.created_at)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(agent)}
                            className={`p-2 rounded-lg ${theme === 'dark'
                              ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                            title="Edit Agent"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(agent)}
                            className={`p-2 rounded-lg ${theme === 'dark'
                              ? 'text-gray-400 hover:bg-red-500/10 hover:text-red-400'
                              : 'text-slate-500 hover:bg-red-50 hover:text-red-600'
                              }`}
                            title="Delete Agent"
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

        {/* Create/Edit Agent Modal */}
        {(showCreateModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-[#1a1f2e] border border-white/10' : 'bg-white border border-slate-200'
              }`}>
              {/* Modal Header */}
              <div className={`px-6 py-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'
                }`}>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {showCreateModal ? 'Create New Agent' : 'Edit Agent'}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-100'
                    }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <form onSubmit={showCreateModal ? handleCreateAgent : handleEditAgent} className="flex flex-col max-h-[80vh]">
                <div className="overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar flex-1">
                  {/* Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Agent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-800 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      placeholder="e.g., Web Scraper Pro"
                    />
                  </div>

                  {/* Slug */}
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
                        ? 'bg-gray-800 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      placeholder="e.g., web-scraper-pro"
                    />
                  </div>

                  {/* Category and Runtime */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Categories *
                      </label>
                      <div className="space-y-3">
                        <select
                          value=""
                          onChange={(e) => {
                            const catId = e.target.value;
                            if (catId && !formData.categories.includes(catId)) {
                              setFormData({ ...formData, categories: [...formData.categories, catId] });
                            }
                          }}
                          className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-gray-800 border-white/10 text-white'
                            : 'bg-white border-slate-200 text-slate-900'
                            }`}
                        >
                          <option value="">Add category...</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id} disabled={formData.categories.includes(cat.id)}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <div className="flex flex-wrap gap-2">
                          {formData.categories.map((catId) => {
                            const category = categories.find(c => c.id === catId);
                            return (
                              <span key={catId} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                                }`}>
                                {category?.name || 'Unknown'}
                                <button
                                  type="button"
                                  onClick={() => setFormData({
                                    ...formData,
                                    categories: formData.categories.filter(id => id !== catId)
                                  })}
                                  className="hover:text-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Runtime Type *
                      </label>
                      <select
                        required
                        value={formData.runtime_type}
                        onChange={(e) => setFormData({ ...formData, runtime_type: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                          ? 'bg-gray-800 border-white/10 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                          }`}
                      >
                        <option value="python">Python</option>
                        <option value="nodejs">Node.js</option>
                      </select>
                    </div>
                  </div>

                  {/* Version */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Version *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-800 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      placeholder="e.g., 1.0.0"
                    />
                  </div>

                  {/* Icon */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Icon
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <ImageIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input
                          type="text"
                          name="icon_url"
                          value={formData.icon_url}
                          readOnly
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme === 'dark'
                            ? 'bg-gray-900 border-white/10 text-white cursor-not-allowed opacity-70'
                            : 'bg-slate-50 border-slate-200 text-slate-900 cursor-not-allowed opacity-70'
                            }`}
                          placeholder="Select an icon..."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowIconPicker(true)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark'
                          ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border border-purple-500/30'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200'
                          }`}
                      >
                        Choose Icon
                      </button>
                    </div>
                    {formData.icon_url && (
                      <div className="mt-2 flex items-center gap-2">
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                          Preview:
                        </p>
                        <img
                          src={formData.icon_url}
                          alt="Icon Preview"
                          className="w-8 h-8 p-1 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://unpkg.com/lucide-static@latest/icons/help-circle.svg';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Icon Picker Modal */}
                  {showIconPicker && (
                    <IconPicker
                      onSelect={(url) => setFormData({ ...formData, icon_url: url })}
                      onClose={() => setShowIconPicker(false)}
                      selectedIcon={formData.icon_url}
                    />
                  )}


                  {/* Description */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-800 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      placeholder="Short description of the agent..."
                    />
                  </div>

                  {/* Long Description */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Long Description
                    </label>
                    <textarea
                      value={formData.long_description}
                      onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                      rows={5}
                      className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-800 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      placeholder="Detailed description and usage instructions..."
                    />
                  </div>

                  {/* Pricing Section */}
                  <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`text-sm font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Pricing Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          Price Model *
                        </label>
                        <select
                          required
                          value={formData.price_model}
                          onChange={(e) => setFormData({ ...formData, price_model: e.target.value })}
                          className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-gray-800 border-white/10 text-white'
                            : 'bg-white border-slate-200 text-slate-900'
                            }`}
                        >
                          <option value="free">Free</option>
                          <option value="one_time">One Time</option>
                          <option value="subscription">Subscription</option>
                          <option value="usage_based">Usage Based</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          Base Price
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.base_price}
                          onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                          className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-gray-800 border-white/10 text-white'
                            : 'bg-white border-slate-200 text-slate-900'
                            }`}
                        />
                      </div>
                      {formData.price_model === 'subscription' && (
                        <>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                              Monthly Price
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={formData.monthly_price}
                              onChange={(e) => setFormData({ ...formData, monthly_price: parseFloat(e.target.value) || '' })}
                              className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                ? 'bg-gray-800 border-white/10 text-white'
                                : 'bg-white border-slate-200 text-slate-900'
                                }`}
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                              Annual Price
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={formData.annual_price}
                              onChange={(e) => setFormData({ ...formData, annual_price: parseFloat(e.target.value) || '' })}
                              className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                ? 'bg-gray-800 border-white/10 text-white'
                                : 'bg-white border-slate-200 text-slate-900'
                                }`}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Advanced Configuration */}
                  <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`text-sm font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Execution & Configuration</h4>

                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          Execution Timeout (ms)
                        </label>
                        <input
                          type="number"
                          value={formData.execution_timeout_ms}
                          onChange={(e) => setFormData({ ...formData, execution_timeout_ms: parseInt(e.target.value) || 30000 })}
                          className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-gray-800 border-white/10 text-white'
                            : 'bg-white border-slate-200 text-slate-900'
                            }`}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                            Capabilities (JSON)
                          </label>
                          <textarea
                            value={formData.capabilities}
                            onChange={(e) => setFormData({ ...formData, capabilities: e.target.value })}
                            rows={3}
                            className={`w-full px-4 py-2 rounded-lg border font-mono text-xs ${theme === 'dark'
                              ? 'bg-gray-800 border-white/10 text-white'
                              : 'bg-white border-slate-200 text-slate-900'
                              }`}
                            placeholder="{}"
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                            Supported Languages (JSON Array)
                          </label>
                          <textarea
                            value={formData.supported_languages}
                            onChange={(e) => setFormData({ ...formData, supported_languages: e.target.value })}
                            rows={3}
                            className={`w-full px-4 py-2 rounded-lg border font-mono text-xs ${theme === 'dark'
                              ? 'bg-gray-800 border-white/10 text-white'
                              : 'bg-white border-slate-200 text-slate-900'
                              }`}
                            placeholder='["en"]'
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Active
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Featured
                      </span>
                    </label>
                  </div>
                </div>

                {/* Modal Footer - Fixed */}
                <div className={`px-6 py-4 border-t flex items-center justify-end space-x-3 ${theme === 'dark' ? 'border-white/10 bg-gray-800/30' : 'border-slate-200 bg-slate-50'
                  }`}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className={`px-6 py-2 rounded-lg ${theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : showCreateModal ? 'Create Agent' : 'Update Agent'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedAgent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-md rounded-2xl p-6 ${theme === 'dark' ? 'bg-[#1a1f2e] border border-white/10' : 'bg-white border border-slate-200'
              }`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Delete Agent
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Are you sure you want to delete <strong>{selectedAgent.name}</strong>? All associated data will be permanently removed.
              </p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedAgent(null);
                  }}
                  className={`px-6 py-2 rounded-lg ${theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAgent}
                  disabled={loading}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Agent'}
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
