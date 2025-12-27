import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  Bot, Plus, Search, Filter, Download, Trash2, Edit,
  Power, PlayCircle, BarChart3, X, Code, Package, AlertCircle,
  ChevronDown, ChevronUp, MoreVertical, Check
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
    category_id: '',
    description: '',
    runtime_type: 'python',
    version: '1.0.0',
    code: '',
    requirements: '',
    config_schema: '{}',
    is_active: true,
    is_featured: false,
    icon_url: '',
    documentation: ''
  });

  // Mock Categories (will be fetched from API later)
  const categories = [
    { id: '1', name: 'Data Processing', slug: 'data-processing' },
    { id: '2', name: 'Web Scraping', slug: 'web-scraping' },
    { id: '3', name: 'API Integration', slug: 'api-integration' },
    { id: '4', name: 'Email Automation', slug: 'email-automation' },
    { id: '5', name: 'Social Media', slug: 'social-media' },
    { id: '6', name: 'Analytics', slug: 'analytics' }
  ];

  // Mock Agents Data (will be replaced with API call)
  const mockAgents = [
    {
      id: '1',
      name: 'Web Scraper Pro',
      slug: 'web-scraper-pro',
      category: 'Web Scraping',
      category_id: '2',
      description: 'Advanced web scraping agent with JavaScript rendering support',
      runtime_type: 'python',
      version: '2.1.0',
      status: 'active',
      is_featured: true,
      total_runs: 15234,
      success_rate: 98.5,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-03-20T14:22:00Z'
    },
    {
      id: '2',
      name: 'Email Campaign Manager',
      slug: 'email-campaign-manager',
      category: 'Email Automation',
      category_id: '4',
      description: 'Automated email campaign management and tracking',
      runtime_type: 'nodejs',
      version: '1.5.2',
      status: 'active',
      is_featured: true,
      total_runs: 8932,
      success_rate: 99.2,
      created_at: '2024-02-01T09:15:00Z',
      updated_at: '2024-03-18T11:10:00Z'
    },
    {
      id: '3',
      name: 'Data Transformer',
      slug: 'data-transformer',
      category: 'Data Processing',
      category_id: '1',
      description: 'Transform and process data between various formats',
      runtime_type: 'python',
      version: '3.0.1',
      status: 'active',
      is_featured: false,
      total_runs: 12456,
      success_rate: 97.8,
      created_at: '2024-01-20T13:45:00Z',
      updated_at: '2024-03-15T16:30:00Z'
    },
    {
      id: '4',
      name: 'Social Media Analytics',
      slug: 'social-media-analytics',
      category: 'Analytics',
      category_id: '6',
      description: 'Comprehensive social media metrics and insights',
      runtime_type: 'nodejs',
      version: '1.8.0',
      status: 'active',
      is_featured: true,
      total_runs: 6789,
      success_rate: 96.5,
      created_at: '2024-02-10T11:20:00Z',
      updated_at: '2024-03-22T09:45:00Z'
    },
    {
      id: '5',
      name: 'API Connector',
      slug: 'api-connector',
      category: 'API Integration',
      category_id: '3',
      description: 'Connect and sync data with external APIs',
      runtime_type: 'python',
      version: '2.3.0',
      status: 'inactive',
      is_featured: false,
      total_runs: 4523,
      success_rate: 95.2,
      created_at: '2024-01-25T15:10:00Z',
      updated_at: '2024-03-10T10:20:00Z'
    },
    {
      id: '6',
      name: 'Twitter Bot',
      slug: 'twitter-bot',
      category: 'Social Media',
      category_id: '5',
      description: 'Automated Twitter posting and engagement',
      runtime_type: 'nodejs',
      version: '1.2.5',
      status: 'active',
      is_featured: false,
      total_runs: 3214,
      success_rate: 98.1,
      created_at: '2024-02-15T08:30:00Z',
      updated_at: '2024-03-19T14:15:00Z'
    },
    {
      id: '7',
      name: 'CSV Parser',
      slug: 'csv-parser',
      category: 'Data Processing',
      category_id: '1',
      description: 'Parse and validate CSV files with custom schemas',
      runtime_type: 'python',
      version: '1.0.3',
      status: 'active',
      is_featured: false,
      total_runs: 9876,
      success_rate: 99.5,
      created_at: '2024-02-20T12:00:00Z',
      updated_at: '2024-03-21T16:40:00Z'
    },
    {
      id: '8',
      name: 'LinkedIn Connector',
      slug: 'linkedin-connector',
      category: 'Social Media',
      category_id: '5',
      description: 'Connect and manage LinkedIn profiles and posts',
      runtime_type: 'nodejs',
      version: '2.0.0',
      status: 'inactive',
      is_featured: false,
      total_runs: 2134,
      success_rate: 94.3,
      created_at: '2024-01-30T10:45:00Z',
      updated_at: '2024-03-05T13:25:00Z'
    }
  ];

  // Fetch agents data
  useEffect(() => {
    fetchAgents();
  }, [currentPage, perPage, statusFilter, categoryFilter, runtimeFilter, sortBy, searchQuery]);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await adminService.getAllAgents({ page: currentPage, per_page: perPage, ... });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter and sort mock data
      let filtered = [...mockAgents];

      // Apply search
      if (searchQuery) {
        filtered = filtered.filter(agent =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply status filter
      if (statusFilter !== 'all') {
        filtered = filtered.filter(agent => agent.status === statusFilter);
      }

      // Apply category filter
      if (categoryFilter.length > 0) {
        filtered = filtered.filter(agent => categoryFilter.includes(agent.category_id));
      }

      // Apply runtime filter
      if (runtimeFilter !== 'all') {
        filtered = filtered.filter(agent => agent.runtime_type === runtimeFilter);
      }

      // Apply sorting
      switch (sortBy) {
        case 'name_asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'runs_desc':
          filtered.sort((a, b) => b.total_runs - a.total_runs);
          break;
        case 'runs_asc':
          filtered.sort((a, b) => a.total_runs - b.total_runs);
          break;
        case 'created_desc':
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'created_asc':
          filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
      }

      setAgents(filtered);

      // Calculate stats
      setStats({
        total: mockAgents.length,
        active: mockAgents.filter(a => a.status === 'active').length,
        inactive: mockAgents.filter(a => a.status === 'inactive').length,
        featured: mockAgents.filter(a => a.is_featured).length
      });

    } catch (error) {
      console.error('Error fetching agents:', error);
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
      // TODO: Replace with actual API call
      // await adminService.createAgent(formData);
      console.log('Creating agent:', formData);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setShowCreateModal(false);
      resetForm();
      fetchAgents();
    } catch (error) {
      console.error('Error creating agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAgent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await adminService.updateAgent(selectedAgent.id, formData);
      console.log('Updating agent:', selectedAgent.id, formData);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setShowEditModal(false);
      setSelectedAgent(null);
      resetForm();
      fetchAgents();
    } catch (error) {
      console.error('Error updating agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAgent = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await adminService.deleteAgent(selectedAgent.id);
      console.log('Deleting agent:', selectedAgent.id);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setShowDeleteModal(false);
      setSelectedAgent(null);
      fetchAgents();
    } catch (error) {
      console.error('Error deleting agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkActivate = async () => {
    console.log('Bulk activate:', selectedAgents);
    // TODO: Implement bulk activate
    setSelectedAgents([]);
  };

  const handleBulkDeactivate = async () => {
    console.log('Bulk deactivate:', selectedAgents);
    // TODO: Implement bulk deactivate
    setSelectedAgents([]);
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
      category_id: agent.category_id,
      description: agent.description,
      runtime_type: agent.runtime_type,
      version: agent.version,
      code: agent.code || '',
      requirements: agent.requirements || '',
      config_schema: agent.config_schema || '{}',
      is_active: agent.status === 'active',
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
      category_id: '',
      description: '',
      runtime_type: 'python',
      version: '1.0.0',
      code: '',
      requirements: '',
      config_schema: '{}',
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
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-white/10 text-white placeholder-gray-400'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                theme === 'dark'
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
                  className={`px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'
                      : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                  }`}
                >
                  Activate ({selectedAgents.length})
                </button>
                <button
                  onClick={handleBulkDeactivate}
                  className={`px-4 py-2 rounded-lg border ${
                    theme === 'dark'
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
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                theme === 'dark'
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
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
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
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
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
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
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
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
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
                      Category
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
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          {agent.category}
                        </span>
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
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            agent.status === 'active'
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-red-500/10 text-red-500'
                          }`}
                        >
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          {agent.total_runs.toLocaleString()}
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
                            className={`p-2 rounded-lg ${
                              theme === 'dark'
                                ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                            title="Edit Agent"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(agent)}
                            className={`p-2 rounded-lg ${
                              theme === 'dark'
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
            <div className={`w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-[#1a1f2e] border border-white/10' : 'bg-white border border-slate-200'
            }`}>
              {/* Modal Header */}
              <div className={`px-6 py-4 border-b flex items-center justify-between ${
                theme === 'dark' ? 'border-white/10' : 'border-slate-200'
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
                  className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <form onSubmit={showCreateModal ? handleCreateAgent : handleEditAgent} className="flex flex-col max-h-[calc(90vh-5rem)]">
                <div className="overflow-y-auto px-6 py-4 space-y-4">
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
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
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
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
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
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-white/10 text-white'
                            : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="">Select category...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        Runtime Type *
                      </label>
                      <select
                        required
                        value={formData.runtime_type}
                        onChange={(e) => setFormData({ ...formData, runtime_type: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          theme === 'dark'
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
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-white/10 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      placeholder="e.g., 1.0.0"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-white/10 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      placeholder="Brief description of what this agent does..."
                    />
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
                <div className={`px-6 py-4 border-t flex items-center justify-end space-x-3 ${
                  theme === 'dark' ? 'border-white/10 bg-gray-800/30' : 'border-slate-200 bg-slate-50'
                }`}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className={`px-6 py-2 rounded-lg ${
                      theme === 'dark'
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
            <div className={`w-full max-w-md rounded-2xl p-6 ${
              theme === 'dark' ? 'bg-[#1a1f2e] border border-white/10' : 'bg-white border border-slate-200'
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
                  className={`px-6 py-2 rounded-lg ${
                    theme === 'dark'
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
