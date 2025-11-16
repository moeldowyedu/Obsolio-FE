import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Table, Badge, EmptyState, Dropdown } from '../../components/common';
import { AgentListCard } from '../../components/agents';
import { useAgentStore } from '../../store/agentStore';
import {
  Plus,
  Grid3x3,
  List,
  Search,
  Play,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AgentsListPage = () => {
  const navigate = useNavigate();
  const {
    agents,
    fetchAgents,
    deleteAgent,
    updateAgentStatus,
    runAgent,
    isLoading,
  } = useAgentStore();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      await fetchAgents();
    } catch (error) {
      toast.error('Failed to load agents');
    }
  };

  const handleRunAgent = async (agentId) => {
    try {
      await runAgent(agentId, {});
      toast.success('Agent execution started');
    } catch (error) {
      toast.error('Failed to start agent execution');
    }
  };

  const handleEditAgent = (agentId) => {
    navigate(`/agents/${agentId}`);
  };

  const handleDeleteAgent = async (agentId) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      try {
        await deleteAgent(agentId);
        toast.success('Agent deleted successfully');
      } catch (error) {
        toast.error('Failed to delete agent');
      }
    }
  };

  const handleToggleStatus = async (agentId) => {
    const agent = agents.find((a) => a.id === agentId);
    const newStatus = agent.status === 'active' ? 'paused' : 'active';
    try {
      await updateAgentStatus(agentId, newStatus);
      toast.success(`Agent ${newStatus === 'active' ? 'activated' : 'paused'}`);
    } catch (error) {
      toast.error('Failed to update agent status');
    }
  };

  // Filter and sort agents
  const filteredAgents = agents
    .filter((agent) => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'runs':
          return (b.stats?.totalRuns || 0) - (a.stats?.totalRuns || 0);
        default:
          return 0;
      }
    });

  // Mock data if no agents
  const displayAgents = filteredAgents.length > 0 ? filteredAgents : [
    {
      id: '1',
      name: 'Customer Support Assistant',
      description: 'AI-powered customer support agent with multi-language support and sentiment analysis',
      status: 'active',
      engines: ['text', 'vision'],
      stats: { totalRuns: 1247, successRate: 94.2, avgDuration: 2.3 },
      lastRun: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Document Processor',
      description: 'Automated document processing with OCR and data extraction capabilities',
      status: 'active',
      engines: ['document', 'text'],
      stats: { totalRuns: 856, successRate: 98.1, avgDuration: 5.7 },
      lastRun: new Date(Date.now() - 86400000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: '3',
      name: 'Market Research Analyst',
      description: 'Comprehensive market research and competitive analysis agent',
      status: 'paused',
      engines: ['web', 'data', 'text'],
      stats: { totalRuns: 432, successRate: 91.5, avgDuration: 12.4 },
      lastRun: new Date(Date.now() - 172800000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ];

  const getStatusVariant = (status) => {
    const variants = {
      active: 'success',
      inactive: 'default',
      error: 'danger',
      paused: 'warning',
    };
    return variants[status] || 'default';
  };

  // Table columns
  const tableColumns = [
    {
      key: 'name',
      label: 'Agent Name',
      render: (value, agent) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 line-clamp-1">{agent.description}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={getStatusVariant(value)} size="sm">
          {value}
        </Badge>
      ),
    },
    {
      key: 'stats',
      label: 'Total Runs',
      render: (value) => (
        <span className="font-medium">{value?.totalRuns?.toLocaleString() || 0}</span>
      ),
    },
    {
      key: 'stats',
      label: 'Success Rate',
      render: (value) => (
        <span className="font-medium text-green-600">{value?.successRate || 0}%</span>
      ),
    },
    {
      key: 'lastRun',
      label: 'Last Run',
      render: (value) =>
        value ? new Date(value).toLocaleDateString() : 'Never',
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, agent) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleRunAgent(agent.id);
            }}
            variant="ghost"
            size="sm"
            disabled={agent.status !== 'active'}
          >
            <Play className="w-4 h-4" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleEditAgent(agent.id);
            }}
            variant="ghost"
            size="sm"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAgent(agent.id);
            }}
            variant="ghost"
            size="sm"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading && agents.length === 0) {
    return (
      <MainLayout>
        <div className="py-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading agents...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
              My Agents
            </h1>
            <p className="text-lg text-gray-600">
              Manage and monitor your AI agents
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/agents/create')} variant="primary">
              <Plus className="w-5 h-5 mr-2" />
              Create Agent
            </Button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:w-auto">
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="error">Error</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="name">Name</option>
              <option value="runs">Most Runs</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${
                  viewMode === 'table'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Agents Display */}
        {displayAgents.length === 0 ? (
          <EmptyState
            icon={Plus}
            title="No Agents Found"
            description={
              searchQuery
                ? 'No agents match your search criteria'
                : 'Create your first AI agent to get started'
            }
            action={
              !searchQuery && (
                <Button onClick={() => navigate('/agents/create')} variant="primary">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Agent
                </Button>
              )
            }
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayAgents.map((agent) => (
              <AgentListCard
                key={agent.id}
                agent={agent}
                onRun={handleRunAgent}
                onEdit={handleEditAgent}
                onDelete={handleDeleteAgent}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <Table
            columns={tableColumns}
            data={displayAgents}
            sortable
            pagination
            pageSize={10}
            onRowClick={(agent) => navigate(`/agents/${agent.id}`)}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default AgentsListPage;
