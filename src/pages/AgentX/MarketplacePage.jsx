import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Star, Download, Grid3x3, List, ArrowUpDown, Users } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const MarketplacePage = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    'All', 'Support', 'Analysis', 'Analytics', 'Sales', 'Marketing', 'HR', 'Finance', 'Legal', 'Operations'
  ];

  const industries = [
    'All', 'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Legal'
  ];

  const pricingOptions = [
    { value: 'all', label: 'All Pricing' },
    { value: 'free', label: 'Free' },
    { value: 'under-100', label: 'Under $100' },
    { value: '100-300', label: '$100 - $300' },
    { value: 'over-300', label: 'Over $300' }
  ];

  useEffect(() => {
    // Mock data - comprehensive agent catalog
    const mockAgents = [
      {
        id: '1',
        name: 'Customer Support Pro',
        icon: '💬',
        description: 'AI-powered customer support with multi-channel integration, sentiment analysis, and automated ticketing',
        category: 'Support',
        industry: 'Technology',
        pricing: 99,
        pricingLabel: '$99/mo',
        rating: 4.8,
        reviews: 342,
        deployments: 1250,
        isPublic: true,
        tags: ['chatbot', 'support', 'automation', '24/7'],
        features: ['Multi-channel', 'Sentiment Analysis', 'Auto-routing', 'Knowledge Base']
      },
      {
        id: '2',
        name: 'Legal Document Analyzer',
        icon: '⚖️',
        description: 'Advanced contract review, compliance checking, and risk assessment for legal documents',
        category: 'Analysis',
        industry: 'Legal',
        pricing: 299,
        pricingLabel: '$299/mo',
        rating: 4.9,
        reviews: 189,
        deployments: 580,
        isPublic: true,
        tags: ['legal', 'documents', 'compliance', 'risk'],
        features: ['Contract Review', 'Compliance Check', 'Risk Scoring', 'Clause Extraction']
      },
      {
        id: '3',
        name: 'Sales Forecasting AI',
        icon: '📈',
        description: 'Predictive analytics for sales pipeline, revenue forecasting, and deal scoring',
        category: 'Analytics',
        industry: 'Sales',
        pricing: 199,
        pricingLabel: '$199/mo',
        rating: 4.7,
        reviews: 256,
        deployments: 920,
        isPublic: true,
        tags: ['sales', 'forecasting', 'analytics', 'pipeline'],
        features: ['Pipeline Analysis', 'Revenue Forecast', 'Deal Scoring', 'Trend Detection']
      },
      {
        id: '4',
        name: 'HR Recruitment Assistant',
        icon: '👥',
        description: 'Automated candidate screening, resume parsing, and interview scheduling',
        category: 'HR',
        industry: 'Technology',
        pricing: 149,
        pricingLabel: '$149/mo',
        rating: 4.6,
        reviews: 198,
        deployments: 670,
        isPublic: true,
        tags: ['hr', 'recruitment', 'automation', 'screening'],
        features: ['Resume Parsing', 'Candidate Scoring', 'Auto-scheduling', 'ATS Integration']
      },
      {
        id: '5',
        name: 'Financial Audit Bot',
        icon: '💰',
        description: 'Automated financial statement analysis, anomaly detection, and compliance reporting',
        category: 'Finance',
        industry: 'Finance',
        pricing: 399,
        pricingLabel: '$399/mo',
        rating: 4.9,
        reviews: 145,
        deployments: 450,
        isPublic: true,
        tags: ['finance', 'audit', 'compliance', 'reporting'],
        features: ['Statement Analysis', 'Anomaly Detection', 'Compliance Reports', 'Risk Assessment']
      },
      {
        id: '6',
        name: 'Content Moderator AI',
        icon: '🛡️',
        description: 'Real-time content moderation for social platforms with customizable policies',
        category: 'Marketing',
        industry: 'Technology',
        pricing: 249,
        pricingLabel: '$249/mo',
        rating: 4.8,
        reviews: 412,
        deployments: 1100,
        isPublic: true,
        tags: ['moderation', 'content', 'safety', 'automation'],
        features: ['Real-time Moderation', 'Custom Policies', 'Multi-language', 'Image/Video Detection']
      },
      {
        id: '7',
        name: 'Marketing Analytics Engine',
        icon: '📊',
        description: 'Comprehensive marketing analytics with ROI tracking and campaign optimization',
        category: 'Marketing',
        industry: 'Retail',
        pricing: 179,
        pricingLabel: '$179/mo',
        rating: 4.7,
        reviews: 287,
        deployments: 830,
        isPublic: true,
        tags: ['marketing', 'analytics', 'roi', 'optimization'],
        features: ['ROI Tracking', 'Campaign Analysis', 'Attribution', 'A/B Testing']
      },
      {
        id: '8',
        name: 'Inventory Optimizer',
        icon: '📦',
        description: 'Smart inventory management with demand forecasting and reorder automation',
        category: 'Operations',
        industry: 'Retail',
        pricing: 229,
        pricingLabel: '$229/mo',
        rating: 4.6,
        reviews: 156,
        deployments: 520,
        isPublic: true,
        tags: ['inventory', 'optimization', 'forecasting', 'automation'],
        features: ['Demand Forecast', 'Auto-reorder', 'Stock Alerts', 'Supplier Integration']
      },
      {
        id: '9',
        name: 'Code Review Assistant',
        icon: '💻',
        description: 'Automated code review with security scanning and best practices checking',
        category: 'Analysis',
        industry: 'Technology',
        pricing: 0,
        pricingLabel: 'Free',
        rating: 4.5,
        reviews: 634,
        deployments: 2150,
        isPublic: true,
        tags: ['code', 'review', 'security', 'quality'],
        features: ['Security Scan', 'Best Practices', 'Code Smells', 'Documentation Check']
      },
      {
        id: '10',
        name: 'Healthcare Claims Processor',
        icon: '🏥',
        description: 'Automated medical claims processing with accuracy verification and fraud detection',
        category: 'Analysis',
        industry: 'Healthcare',
        pricing: 449,
        pricingLabel: '$449/mo',
        rating: 4.9,
        reviews: 98,
        deployments: 320,
        isPublic: true,
        tags: ['healthcare', 'claims', 'fraud', 'compliance'],
        features: ['Claims Processing', 'Fraud Detection', 'HIPAA Compliance', 'Accuracy Check']
      },
      {
        id: '11',
        name: 'Email Campaign Manager',
        icon: '📧',
        description: 'Smart email marketing with personalization, A/B testing, and analytics',
        category: 'Marketing',
        industry: 'Retail',
        pricing: 129,
        pricingLabel: '$129/mo',
        rating: 4.6,
        reviews: 445,
        deployments: 1450,
        isPublic: true,
        tags: ['email', 'marketing', 'personalization', 'analytics'],
        features: ['Personalization', 'A/B Testing', 'Analytics', 'Automation']
      },
      {
        id: '12',
        name: 'Supply Chain Optimizer',
        icon: '🚚',
        description: 'End-to-end supply chain optimization with predictive logistics',
        category: 'Operations',
        industry: 'Manufacturing',
        pricing: 349,
        pricingLabel: '$349/mo',
        rating: 4.8,
        reviews: 167,
        deployments: 410,
        isPublic: true,
        tags: ['supply-chain', 'logistics', 'optimization', 'forecasting'],
        features: ['Route Optimization', 'Demand Forecast', 'Supplier Management', 'Cost Analysis']
      }
    ];

    setAgents(mockAgents);
    setFilteredAgents(mockAgents);
  }, []);

  useEffect(() => {
    let filtered = [...agents];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(agent =>
        agent.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply industry filter
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(agent =>
        agent.industry.toLowerCase() === selectedIndustry.toLowerCase()
      );
    }

    // Apply pricing filter
    if (selectedPricing !== 'all') {
      filtered = filtered.filter(agent => {
        if (selectedPricing === 'free') return agent.pricing === 0;
        if (selectedPricing === 'under-100') return agent.pricing > 0 && agent.pricing < 100;
        if (selectedPricing === '100-300') return agent.pricing >= 100 && agent.pricing <= 300;
        if (selectedPricing === 'over-300') return agent.pricing > 300;
        return true;
      });
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.deployments - a.deployments;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.pricing - b.pricing;
        case 'price-high':
          return b.pricing - a.pricing;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredAgents(filtered);
  }, [agents, searchQuery, selectedCategory, selectedIndustry, selectedPricing, sortBy]);

  const totalAgents = agents.length;
  const totalCategories = [...new Set(agents.map(a => a.category))].length;
  const avgRating = (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1);
  const totalDeployments = agents.reduce((sum, a) => sum + a.deployments, 0);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">AgentX Marketplace</h1>
          <p className="text-secondary-600">
            Discover and deploy pre-built AI agents for your enterprise
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Total Agents</div>
              <Grid3x3 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{totalAgents}</div>
            <div className="text-xs text-gray-500 mt-1">Available to deploy</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Categories</div>
              <Filter className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{totalCategories}</div>
            <div className="text-xs text-gray-500 mt-1">Different categories</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Avg Rating</div>
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{avgRating}</div>
            <div className="text-xs text-gray-500 mt-1">Based on user reviews</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Total Deployments</div>
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{totalDeployments.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Across all agents</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search agents by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>

            {/* Industry Filter */}
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {industries.map(ind => (
                <option key={ind} value={ind.toLowerCase()}>{ind}</option>
              ))}
            </select>

            {/* Pricing Filter */}
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {pricingOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Sort By */}
            <div className="flex items-center gap-2 ml-auto">
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-secondary-600">
            <span className="font-semibold text-secondary-900">{filteredAgents.length}</span> agents found
          </p>
        </div>

        {/* Agents Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl mb-4">
                  {agent.icon}
                </div>

                {/* Header */}
                <h3 className="text-xl font-bold text-secondary-900 mb-2">{agent.name}</h3>
                <p className="text-sm text-secondary-600 mb-4 line-clamp-2">{agent.description}</p>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(agent.rating)}
                  <span className="text-sm font-semibold text-secondary-900">{agent.rating}</span>
                  <span className="text-sm text-gray-500">({agent.reviews})</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1 text-sm text-secondary-600">
                    <Download className="w-4 h-4" />
                    <span>{agent.deployments.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-secondary-600">
                    {agent.category}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-secondary-900">{agent.pricingLabel}</div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
                    Deploy
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl flex-shrink-0">
                    {agent.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-secondary-900 mb-1">{agent.name}</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {renderStars(agent.rating)}
                            <span className="text-sm font-semibold text-secondary-900">{agent.rating}</span>
                            <span className="text-sm text-gray-500">({agent.reviews} reviews)</span>
                          </div>
                          <span className="text-sm text-gray-400">•</span>
                          <div className="flex items-center gap-1 text-sm text-secondary-600">
                            <Download className="w-4 h-4" />
                            <span>{agent.deployments.toLocaleString()} deployments</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-secondary-900">{agent.pricingLabel}</div>
                        <div className="text-sm text-gray-500">per month</div>
                      </div>
                    </div>

                    <p className="text-secondary-600 mb-4">{agent.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {agent.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-secondary-700">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
                        Deploy Agent
                      </button>
                      <button className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-secondary-700 hover:bg-gray-50">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="glass-card rounded-3xl p-12 text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-secondary-900 mb-2">No agents found</h3>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search query to find the perfect agent for your needs
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedIndustry('all');
                setSelectedPricing('all');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MarketplacePage;
