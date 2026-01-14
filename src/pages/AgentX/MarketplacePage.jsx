import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Bot, TrendingUp, Download, Star, Filter,
  CheckCircle, AlertCircle, Zap, Settings, Play,
  BarChart3, Clock, Grid3X3, List, ChevronDown, X, RefreshCw
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { Card } from '../../components/common';
import { tenantService } from '../../services/tenantService';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/common/Button/Button';

const MarketplacePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Styles
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';
  const bgCard = theme === 'dark' ? 'bg-[#1e293b]/50' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-white/10' : 'border-slate-200';

  // Data State
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');

  // Stats (computed from agents)
  const stats = [
    {
      label: 'Available Agents',
      value: agents.length.toString(),
      change: 'Ready to deploy',
      icon: Bot,
      color: 'blue'
    },
    {
      label: 'Active Agents',
      value: agents.filter(a => a.is_active).length.toString(),
      change: 'Currently running',
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Featured',
      value: agents.filter(a => a.is_featured).length.toString(),
      change: 'Top rated',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      label: 'Total Installs',
      value: agents.reduce((sum, a) => sum + (a.total_installs || 0), 0).toLocaleString(),
      change: 'Across all agents',
      icon: Download,
      color: 'orange'
    }
  ];

  const COLORS = {
    blue: { bg: theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100', text: theme === 'dark' ? 'text-blue-400' : 'text-blue-600' },
    green: { bg: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100', text: theme === 'dark' ? 'text-green-400' : 'text-green-600' },
    purple: { bg: theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100', text: theme === 'dark' ? 'text-purple-400' : 'text-purple-600' },
    orange: { bg: theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-100', text: theme === 'dark' ? 'text-orange-400' : 'text-orange-600' },
    cyan: { bg: theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-100', text: theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600' },
  };

  // Extract categories from agents
  const categories = [...new Set(
    agents.flatMap(agent =>
      agent.categories?.map(cat => cat.name || cat) || []
    ).filter(Boolean)
  )];

  // Fetch Agents
  const fetchAgents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await tenantService.getAgents();

      if (response.success) {
        const agentData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        setAgents(agentData.filter(agent => agent.is_active !== false));
      } else {
        setError("Failed to fetch agents.");
      }
    } catch (err) {
      console.error("Error fetching agents:", err);
      setError("Something went wrong while loading agents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = !searchQuery ||
      agent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' ||
      agent.categories?.some(cat => (cat.name || cat) === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.total_installs || 0) - (a.total_installs || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      default:
        return 0;
    }
  });

  const getStatusColor = (isActive) => {
    return isActive
      ? (theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200')
      : (theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-600 border-gray-200');
  };

  const getPriceModelBadge = (model) => {
    const badges = {
      'free': { bg: 'bg-green-500/20', text: 'text-green-500', label: 'Free' },
      'per-use': { bg: 'bg-blue-500/20', text: 'text-blue-500', label: 'Pay per Use' },
      'subscription': { bg: 'bg-purple-500/20', text: 'text-purple-500', label: 'Subscription' },
      'enterprise': { bg: 'bg-orange-500/20', text: 'text-orange-500', label: 'Enterprise' },
    };
    return badges[model?.toLowerCase()] || badges['subscription'];
  };

  return (
    <MainLayout showSidebar={true}>
      <div className={`min-h-screen pb-20 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
        <div className="max-w-[1600px] mx-auto px-6 py-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>AgentX Hub</h1>
              <p className={textSecondary}>Deploy and manage AI agents for your organization</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchAgents}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white border border-white/10' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'}`}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="font-medium">Refresh</span>
              </button>
              <Button className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span>Browse Catalog</span>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colors = COLORS[stat.color];
              return (
                <Card key={index} hover className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                  </div>
                  <h3 className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</h3>
                  <p className={`${textSecondary} text-sm font-medium mb-1`}>{stat.label}</p>
                  <p className={`${textSecondary} text-xs`}>{stat.change}</p>
                </Card>
              );
            })}
          </div>

          {/* Filters Bar */}
          <Card className="mb-6 p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-3 items-center flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[250px] max-w-md">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${textSecondary}`}>{sortedAgents.length} agents</span>
                <div className={`flex items-center rounded-lg border ${borderColor} p-1`}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-900') : textSecondary}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-900') : textSecondary}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className={`w-14 h-14 rounded-xl mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`} />
                  <div className={`h-6 rounded w-3/4 mb-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`} />
                  <div className={`h-4 rounded w-full mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`} />
                  <div className={`h-4 rounded w-1/2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`} />
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className={`text-lg font-bold mb-2 ${textPrimary}`}>Failed to load agents</h3>
              <p className={textSecondary}>{error}</p>
              <Button onClick={fetchAgents} className="mt-4">Try Again</Button>
            </Card>
          ) : sortedAgents.length === 0 ? (
            <Card className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className={`text-lg font-bold mb-2 ${textPrimary}`}>No agents found</h3>
              <p className={textSecondary}>Try adjusting your search or filters.</p>
              <Button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {sortedAgents.map(agent => {
                const priceInfo = getPriceModelBadge(agent.price_model);
                return (
                  <Card
                    key={agent.id}
                    hover
                    onClick={() => navigate(`/agentx/hub/agent/${agent.id}`)}
                    className={`cursor-pointer transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row items-center p-4 gap-6' : 'p-6'}`}
                  >
                    {/* Agent Header */}
                    <div className={`flex items-start gap-4 ${viewMode === 'list' ? 'flex-1' : 'mb-4'}`}>
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20 flex-shrink-0 overflow-hidden`}>
                        {agent.icon_url ? (
                          <img src={agent.icon_url} alt={agent.name} className="w-10 h-10 object-contain" />
                        ) : (
                          <Bot className="w-7 h-7 text-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`text-lg font-bold truncate ${textPrimary}`}>{agent.name}</h3>
                          {agent.is_featured && (
                            <TrendingUp className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className={`text-sm ${textSecondary} ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-1'}`}>
                          {agent.description}
                        </p>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className={`flex items-center gap-4 ${viewMode === 'list' ? '' : 'mb-4 pb-4 border-b ' + borderColor}`}>
                      {agent.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className={`text-sm font-semibold ${textPrimary}`}>{agent.rating}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Download className={`w-4 h-4 ${textSecondary}`} />
                        <span className={`text-sm ${textSecondary}`}>
                          {agent.total_installs > 1000 ? (agent.total_installs / 1000).toFixed(1) + 'k' : (agent.total_installs || 0)}
                        </span>
                      </div>
                    </div>

                    {/* Badges & Actions */}
                    <div className={`flex items-center justify-between gap-3 ${viewMode === 'list' ? '' : ''}`}>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(agent.is_active)}`}>
                          {agent.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${priceInfo.bg} ${priceInfo.text}`}>
                          {priceInfo.label}
                        </span>
                      </div>

                      {viewMode === 'list' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                          >
                            <Settings className="w-3.5 h-3.5" />
                            Configure
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                            Deploy
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Grid View Actions */}
                    {viewMode === 'grid' && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                        >
                          <Settings className="w-3.5 h-3.5" />
                          Configure
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                        >
                          <Play className="w-3.5 h-3.5" />
                          Deploy
                        </button>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MarketplacePage;
