import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, TrendingUp, Star, Download, Grid3x3, List, ArrowUpDown, Users, MessageCircle, ChevronDown, ChevronUp, X } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../contexts/ThemeContext';


const MarketplacePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { theme } = useTheme();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filter state
  const [filters, setFilters] = useState({
    sectors: [],
    owner: 'all',
    rating: null,
    engines: [],
    skills: [],
    priceMin: 0,
    priceMax: 500,
    techStack: [],
    features: []
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedFilters, setExpandedFilters] = useState({
    sectors: true,
    owner: true,
    rating: true,
    engines: false,
    skills: false,
    price: true,
    tech: false,
    features: false
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Data
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);

  const handleAuthenticatedAction = (action, agentId) => {
    if (!isAuthenticated) {
      navigate(`/login?returnUrl=/agentx/hub/agent/${agentId}`);
      return;
    }
    action();
  };

  // Filter options
  const filterOptions = {
    sectors: ['Tech', 'Law', 'Health', 'Education', 'Business', 'HR'],
    engines: ['Videos', 'Audios', 'Images', 'Files', 'Source Code', 'Databases'],
    skills: ['Analysis', 'Automation', 'Support', 'Marketing', 'Finance', 'Legal'],
    techStack: ['Python', 'Node.js', 'N8N', 'Custom'],
    features: ['Multi-channel', 'Real-time', 'HITL Support', 'API Integration']
  };

  useEffect(() => {
    // Mock data - 15 agents
    const mockAgents = [
      {
        id: '1',
        name: 'Customer Support Pro',
        icon: '💬',
        description: 'AI-powered customer support with multi-channel integration, sentiment analysis, and automated ticketing',
        category: 'Support',
        industry: 'Tech',
        pricing: 99,
        pricingLabel: '$99/mo',
        rating: 4.8,
        reviews: 342,
        deployments: 1250,
        isPublic: true,
        owner: 'Obsolio',
        tags: ['chatbot', 'support', 'automation', '24/7'],
        features: ['Multi-channel', 'Sentiment Analysis', 'Auto-routing', 'Knowledge Base'],
        engines: ['Text', 'Audio'],
        techStack: ['Python', 'API Integration'],
        skills: ['Support', 'Automation']
      },
      {
        id: '2',
        name: 'Legal Document Analyzer',
        icon: '⚖️',
        description: 'Advanced contract review, compliance checking, and risk assessment for legal documents',
        category: 'Analysis',
        industry: 'Law',
        pricing: 299,
        pricingLabel: '$299/mo',
        rating: 4.9,
        reviews: 189,
        deployments: 580,
        isPublic: true,
        owner: 'LegalTech Corp',
        tags: ['legal', 'documents', 'compliance', 'risk'],
        features: ['Contract Review', 'Compliance Check', 'Risk Scoring', 'Clause Extraction'],
        engines: ['Files', 'Text'],
        techStack: ['Python', 'Custom'],
        skills: ['Analysis', 'Legal']
      },
      {
        id: '3',
        name: 'Sales Forecasting AI',
        icon: '📈',
        description: 'Predictive analytics for sales pipeline, revenue forecasting, and deal scoring',
        category: 'Analytics',
        industry: 'Business',
        pricing: 199,
        pricingLabel: '$199/mo',
        rating: 4.7,
        reviews: 256,
        deployments: 920,
        isPublic: true,
        owner: 'SalesPro Inc',
        tags: ['sales', 'forecasting', 'analytics', 'pipeline'],
        features: ['Pipeline Analysis', 'Revenue Forecast', 'Deal Scoring', 'Trend Detection'],
        engines: ['Data', 'Text'],
        techStack: ['Python', 'API Integration'],
        skills: ['Analysis', 'Finance']
      },
      {
        id: '4',
        name: 'HR Recruitment Assistant',
        icon: '👥',
        description: 'Automated candidate screening, resume parsing, and interview scheduling',
        category: 'HR',
        industry: 'HR',
        pricing: 149,
        pricingLabel: '$149/mo',
        rating: 4.6,
        reviews: 198,
        deployments: 670,
        isPublic: true,
        owner: 'TalentHub Solutions',
        tags: ['hr', 'recruitment', 'automation', 'screening'],
        features: ['Resume Parsing', 'Candidate Scoring', 'Auto-scheduling', 'ATS Integration'],
        engines: ['Files', 'Text'],
        techStack: ['Python', 'API Integration'],
        skills: ['Automation', 'Analysis']
      },
      {
        id: '5',
        name: 'Financial Audit Bot',
        icon: '💰',
        description: 'Automated financial statement analysis, anomaly detection, and compliance reporting',
        category: 'Finance',
        industry: 'Business',
        pricing: 399,
        pricingLabel: '$399/mo',
        rating: 4.9,
        reviews: 145,
        deployments: 450,
        isPublic: true,
        owner: 'Obsolio',
        tags: ['finance', 'audit', 'compliance', 'reporting'],
        features: ['Statement Analysis', 'Anomaly Detection', 'Compliance Reports', 'Risk Assessment'],
        engines: ['Files', 'Data'],
        techStack: ['Python', 'Custom'],
        skills: ['Finance', 'Analysis']
      },
      {
        id: '6',
        name: 'Content Moderator AI',
        icon: '🛡️',
        description: 'Real-time content moderation for social platforms with customizable policies',
        category: 'Marketing',
        industry: 'Tech',
        pricing: 249,
        pricingLabel: '$249/mo',
        rating: 4.8,
        reviews: 412,
        deployments: 1100,
        isPublic: true,
        owner: 'Obsolio',
        tags: ['moderation', 'content', 'safety', 'automation'],
        features: ['Real-time Moderation', 'Custom Policies', 'Multi-language', 'Image/Video Detection'],
        engines: ['Images', 'Videos', 'Text'],
        techStack: ['Python', 'API Integration'],
        skills: ['Automation', 'Analysis']
      },
      {
        id: '7',
        name: 'Marketing Analytics Engine',
        icon: '📊',
        description: 'Comprehensive marketing analytics with ROI tracking and campaign optimization',
        category: 'Marketing',
        industry: 'Business',
        pricing: 179,
        pricingLabel: '$179/mo',
        rating: 4.7,
        reviews: 287,
        deployments: 830,
        isPublic: true,
        owner: 'MarketPro Analytics',
        tags: ['marketing', 'analytics', 'roi', 'optimization'],
        features: ['ROI Tracking', 'Campaign Analysis', 'Attribution', 'A/B Testing'],
        engines: ['Data', 'Text'],
        techStack: ['Python', 'API Integration'],
        skills: ['Marketing', 'Analysis']
      },
      {
        id: '8',
        name: 'Inventory Optimizer',
        icon: '📦',
        description: 'Smart inventory management with demand forecasting and reorder automation',
        category: 'Operations',
        industry: 'Business',
        pricing: 229,
        pricingLabel: '$229/mo',
        rating: 4.6,
        reviews: 156,
        deployments: 520,
        isPublic: true,
        owner: 'SupplyChain Plus',
        tags: ['inventory', 'optimization', 'forecasting', 'automation'],
        features: ['Demand Forecast', 'Auto-reorder', 'Stock Alerts', 'Supplier Integration'],
        engines: ['Data'],
        techStack: ['Python', 'API Integration'],
        skills: ['Automation', 'Analysis']
      },
      {
        id: '9',
        name: 'Code Review Assistant',
        icon: '💻',
        description: 'Automated code review with security scanning and best practices checking',
        category: 'Analysis',
        industry: 'Tech',
        pricing: 0,
        pricingLabel: 'Free',
        rating: 4.5,
        reviews: 634,
        deployments: 2150,
        isPublic: true,
        owner: 'Obsolio',
        tags: ['code', 'review', 'security', 'quality'],
        features: ['Security Scan', 'Best Practices', 'Code Smells', 'Documentation Check'],
        engines: ['Source Code'],
        techStack: ['Python', 'N8N'],
        skills: ['Analysis']
      },
      {
        id: '10',
        name: 'Healthcare Claims Processor',
        icon: '🏥',
        description: 'Automated medical claims processing with accuracy verification and fraud detection',
        category: 'Analysis',
        industry: 'Health',
        pricing: 449,
        pricingLabel: '$449/mo',
        rating: 4.9,
        reviews: 98,
        deployments: 320,
        isPublic: true,
        owner: 'HealthTech Systems',
        tags: ['healthcare', 'claims', 'fraud', 'compliance'],
        features: ['Claims Processing', 'Fraud Detection', 'HIPAA Compliance', 'Accuracy Check'],
        engines: ['Files', 'Data'],
        techStack: ['Python', 'Custom'],
        skills: ['Analysis', 'Automation']
      },
      {
        id: '11',
        name: 'Email Campaign Manager',
        icon: '📧',
        description: 'Smart email marketing with personalization, A/B testing, and analytics',
        category: 'Marketing',
        industry: 'Business',
        pricing: 129,
        pricingLabel: '$129/mo',
        rating: 4.6,
        reviews: 445,
        deployments: 1450,
        isPublic: true,
        owner: 'EmailPro Suite',
        tags: ['email', 'marketing', 'personalization', 'analytics'],
        features: ['Personalization', 'A/B Testing', 'Analytics', 'Automation'],
        engines: ['Text'],
        techStack: ['Node.js', 'API Integration'],
        skills: ['Marketing', 'Automation']
      },
      {
        id: '12',
        name: 'Supply Chain Optimizer',
        icon: '🚚',
        description: 'End-to-end supply chain optimization with predictive logistics',
        category: 'Operations',
        industry: 'Business',
        pricing: 349,
        pricingLabel: '$349/mo',
        rating: 4.8,
        reviews: 167,
        deployments: 410,
        isPublic: true,
        owner: 'LogisticsAI Inc',
        tags: ['supply-chain', 'logistics', 'optimization', 'forecasting'],
        features: ['Route Optimization', 'Demand Forecast', 'Supplier Management', 'Cost Analysis'],
        engines: ['Data'],
        techStack: ['Python', 'Custom'],
        skills: ['Automation', 'Analysis']
      },
      {
        id: '13',
        name: 'Education Assessment AI',
        icon: '📚',
        description: 'Automated grading and assessment for educational institutions',
        category: 'Education',
        industry: 'Education',
        pricing: 199,
        pricingLabel: '$199/mo',
        rating: 4.7,
        reviews: 234,
        deployments: 680,
        isPublic: true,
        owner: 'EduTech Solutions',
        tags: ['education', 'grading', 'assessment', 'automation'],
        features: ['Auto-grading', 'Plagiarism Detection', 'Analytics', 'Feedback Generation'],
        engines: ['Text', 'Files'],
        techStack: ['Python', 'API Integration'],
        skills: ['Analysis', 'Automation']
      },
      {
        id: '14',
        name: 'Video Content Analyzer',
        icon: '🎥',
        description: 'Advanced video analysis for content moderation and insights',
        category: 'Analysis',
        industry: 'Tech',
        pricing: 279,
        pricingLabel: '$279/mo',
        rating: 4.8,
        reviews: 198,
        deployments: 540,
        isPublic: true,
        owner: 'Obsolio',
        tags: ['video', 'analysis', 'moderation', 'insights'],
        features: ['Scene Detection', 'Object Recognition', 'Transcript Generation', 'Sentiment Analysis'],
        engines: ['Videos', 'Audio'],
        techStack: ['Python', 'Custom'],
        skills: ['Analysis']
      },
      {
        id: '15',
        name: 'Voice Assistant Builder',
        icon: '🎤',
        description: 'Create custom voice assistants with natural language understanding',
        category: 'Support',
        industry: 'Tech',
        pricing: 189,
        pricingLabel: '$189/mo',
        rating: 4.6,
        reviews: 312,
        deployments: 890,
        isPublic: true,
        owner: 'VoiceAI Labs',
        tags: ['voice', 'assistant', 'nlp', 'automation'],
        features: ['Speech Recognition', 'NLU', 'Multi-language', 'Custom Intents'],
        engines: ['Audio', 'Text'],
        techStack: ['Python', 'API Integration'],
        skills: ['Support', 'Automation']
      }
    ];

    setAgents(mockAgents);
    setFilteredAgents(mockAgents);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...agents];

    // Sector filter
    if (filters.sectors.length > 0) {
      filtered = filtered.filter(agent =>
        filters.sectors.includes(agent.industry)
      );
    }

    // Owner filter
    if (filters.owner === 'obsolio') {
      filtered = filtered.filter(agent => agent.owner === 'Obsolio');
    } else if (filters.owner === 'others') {
      filtered = filtered.filter(agent => agent.owner !== 'Obsolio');
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(agent => agent.rating >= filters.rating);
    }

    // Engines filter
    if (filters.engines.length > 0) {
      filtered = filtered.filter(agent =>
        agent.engines && agent.engines.some(e => filters.engines.includes(e))
      );
    }

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter(agent =>
        agent.skills && agent.skills.some(s => filters.skills.includes(s))
      );
    }

    // Price range filter
    filtered = filtered.filter(agent =>
      agent.pricing >= filters.priceMin && agent.pricing <= filters.priceMax
    );

    // Tech stack filter
    if (filters.techStack.length > 0) {
      filtered = filtered.filter(agent =>
        agent.techStack && agent.techStack.some(t => filters.techStack.includes(t))
      );
    }

    // Features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(agent =>
        agent.features && agent.features.some(f => filters.features.includes(f))
      );
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
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
    setCurrentPage(1); // Reset to first page when filters change
  }, [agents, filters, searchQuery, sortBy]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Pagination
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

  const toggleFilter = (category) => {
    setExpandedFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      if (category === 'owner' || category === 'rating') {
        return { ...prev, [category]: value };
      }

      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      return { ...prev, [category]: newValues };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      sectors: [],
      owner: 'all',
      rating: null,
      engines: [],
      skills: [],
      priceMin: 0,
      priceMax: 500,
      techStack: [],
      features: []
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.sectors.length > 0) count++;
    if (filters.owner !== 'all') count++;
    if (filters.rating) count++;
    if (filters.engines.length > 0) count++;
    if (filters.skills.length > 0) count++;
    if (filters.priceMin > 0 || filters.priceMax < 500) count++;
    if (filters.techStack.length > 0) count++;
    if (filters.features.length > 0) count++;
    return count;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-400'
              }`}
          />
        ))}
      </div>
    );
  };

  const FilterSection = ({ title, category, children }) => (
    <div className={`border-b last:border-b-0 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
      <button
        onClick={() => toggleFilter(category)}
        className={`w-full flex items-center justify-between p-3 transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
      >
        <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{title}</span>
        {expandedFilters[category] ? (
          <ChevronUp className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`} />
        ) : (
          <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`} />
        )}
      </button>
      {expandedFilters[category] && (
        <div className="px-3 pb-3 space-y-1.5">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <MainLayout showSidebar={true} theme={theme}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
        {/* Header - More Professional */}
        <div className={`mt-6 pb-8 border-b ${theme === 'dark' ? 'bg-[#0B0E14] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
              {/* Title Section */}
              <div>
                <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AgentX HUB</h1>
                <p className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                  Discover and deploy pre-built AI agents for your enterprise
                </p>
              </div>

              {/* Search & Controls Section - Dark styled as requested */}
              <div className="bg-[#1e293b] p-1.5 rounded-xl flex flex-col md:flex-row items-center gap-2 shadow-xl border border-white/5 w-full xl:w-auto">
                {/* Search Input */}
                <div className="relative flex-1 xl:min-w-[400px] w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search agents by name, description, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#0f172a] border border-white/5 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                  />
                </div>

                <div className="w-px h-6 bg-gray-700 hidden md:block"></div>

                {/* Sort */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-9 pr-8 py-2 bg-[#0f172a] border border-white/5 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none cursor-pointer"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-[#0f172a] rounded-lg p-1 border border-white/5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-[#1e293b] text-white shadow-sm' : 'text-gray-400 hover:text-gray-300'}`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-[#1e293b] text-white shadow-sm' : 'text-gray-400 hover:text-gray-300'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className={`w-full flex items-center justify-between border p-3 rounded-lg font-medium ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary-400" />
                  <span>Filters</span>
                </div>
                {getActiveFilterCount() > 0 && (
                  <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Left Sidebar - Filters */}
            {/* Mobile Overlay */}
            {mobileFiltersOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              />
            )}

            <aside className={`
              fixed inset-y-0 left-0 w-80 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:bg-transparent lg:z-auto
              ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:block flex-shrink-0 ${theme === 'dark' ? 'bg-[#1a1f2e]' : 'bg-white'}
            `}>
              <div className={`h-full lg:h-auto overflow-y-auto lg:overflow-visible lg:rounded-xl lg:border lg:sticky lg:top-24 ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                {/* Filter Header */}
                <div className={`p-3 border-b flex items-center justify-between flex-shrink-0 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className="flex items-center gap-2">
                    <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`} />
                    <h2 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Filters</h2>
                    {getActiveFilterCount() > 0 && (
                      <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {getActiveFilterCount()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {getActiveFilterCount() > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className={`text-xs font-medium transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary-600'}`}
                      >
                        Clear all
                      </button>
                    )}
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className={`lg:hidden ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Filter Sections */}
                <div>
                  {/* Major Sector */}
                  <FilterSection title="Major Sector" category="sectors">
                    {filterOptions.sectors.map(sector => (
                      <label key={sector} className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                        <input
                          type="checkbox"
                          checked={filters.sectors.includes(sector)}
                          onChange={() => handleFilterChange('sectors', sector)}
                          className={`w-4 h-4 text-primary-600 rounded focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                        />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{sector}</span>
                      </label>
                    ))}
                  </FilterSection>

                  {/* Owner */}
                  <FilterSection title="Owner" category="owner">
                    <label className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                      <input
                        type="radio"
                        name="owner"
                        checked={filters.owner === 'all'}
                        onChange={() => handleFilterChange('owner', 'all')}
                        className={`w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>All Owners</span>
                    </label>
                    <label className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                      <input
                        type="radio"
                        name="owner"
                        checked={filters.owner === 'obsolio'}
                        onChange={() => handleFilterChange('owner', 'obsolio')}
                        className={`w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>Obsolio (Official)</span>
                    </label>
                    <label className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                      <input
                        type="radio"
                        name="owner"
                        checked={filters.owner === 'others'}
                        onChange={() => handleFilterChange('owner', 'others')}
                        className={`w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>Other Tenants</span>
                    </label>
                  </FilterSection>

                  {/* Rating */}
                  <FilterSection title="Rating" category="rating">
                    {[4.5, 4.0, 3.5, 3.0].map(rating => (
                      <label key={rating} className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => handleFilterChange('rating', rating)}
                          className={`w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                        />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{rating}+ stars</span>
                      </label>
                    ))}
                  </FilterSection>

                  {/* Precision AI Engines */}
                  <FilterSection title="Precision AI Engines" category="engines">
                    {filterOptions.engines.map(engine => (
                      <label key={engine} className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                        <input
                          type="checkbox"
                          checked={filters.engines.includes(engine)}
                          onChange={() => handleFilterChange('engines', engine)}
                          className={`w-4 h-4 text-primary-600 rounded focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                        />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{engine}</span>
                      </label>
                    ))}
                  </FilterSection>

                  {/* Skills */}
                  <FilterSection title="Skills" category="skills">
                    {filterOptions.skills.map(skill => (
                      <label key={skill} className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                        <input
                          type="checkbox"
                          checked={filters.skills.includes(skill)}
                          onChange={() => handleFilterChange('skills', skill)}
                          className={`w-4 h-4 text-primary-600 rounded focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                        />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{skill}</span>
                      </label>
                    ))}
                  </FilterSection>

                  {/* Price Range (USD) */}
                  <FilterSection title="PRICE (USD)" category="price">
                    <div className="space-y-2 px-2 py-2" onClick={(e) => e.stopPropagation()}>
                      {/* Min and Max Price Inputs - Side by Side */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Min Price */}
                        <div>
                          <label className={`text-[10px] mb-1 block ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Min</label>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (filters.priceMin >= 10) {
                                  setFilters(prev => ({ ...prev, priceMin: prev.priceMin - 10 }));
                                }
                              }}
                              className={`w-6 h-7 border rounded text-xs font-bold transition-colors flex items-center justify-center ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'}`}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="0"
                              max={filters.priceMax}
                              value={filters.priceMin}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                if (value <= filters.priceMax && value >= 0) {
                                  setFilters(prev => ({ ...prev, priceMin: value }));
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className={`flex-1 px-1 py-1 border rounded text-center text-xs font-semibold focus:ring-1 focus:ring-primary-500 focus:border-transparent w-full ${theme === 'dark' ? 'bg-white/5 border-white/20 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (filters.priceMin < filters.priceMax) {
                                  setFilters(prev => ({ ...prev, priceMin: prev.priceMin + 10 }));
                                }
                              }}
                              className={`w-6 h-7 border rounded text-xs font-bold transition-colors flex items-center justify-center ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'}`}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Max Price */}
                        <div>
                          <label className={`text-[10px] mb-1 block ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Max</label>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (filters.priceMax > filters.priceMin) {
                                  setFilters(prev => ({ ...prev, priceMax: prev.priceMax - 10 }));
                                }
                              }}
                              className={`w-6 h-7 border rounded text-xs font-bold transition-colors flex items-center justify-center ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'}`}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min={filters.priceMin}
                              max="500"
                              value={filters.priceMax}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 500;
                                if (value >= filters.priceMin && value <= 500) {
                                  setFilters(prev => ({ ...prev, priceMax: value }));
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className={`flex-1 px-1 py-1 border rounded text-center text-xs font-semibold focus:ring-1 focus:ring-primary-500 focus:border-transparent w-full ${theme === 'dark' ? 'bg-white/5 border-white/20 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (filters.priceMax < 500) {
                                  setFilters(prev => ({ ...prev, priceMax: prev.priceMax + 10 }));
                                }
                              }}
                              className={`w-6 h-7 border rounded text-xs font-bold transition-colors flex items-center justify-center ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price Range Display */}
                      <div className="text-center">
                        <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Range</div>
                        <div className="text-sm font-bold text-primary-400">
                          ${filters.priceMin} - ${filters.priceMax}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Trigger filter update (already reactive, but this provides visual feedback)
                        }}
                        className="w-full py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </FilterSection>

                  {/* Tech Stack */}
                  <FilterSection title="Tech Stack" category="tech">
                    {filterOptions.techStack.map(tech => (
                      <label key={tech} className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                        <input
                          type="checkbox"
                          checked={filters.techStack.includes(tech)}
                          onChange={() => handleFilterChange('techStack', tech)}
                          className={`w-4 h-4 text-primary-600 rounded focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                        />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{tech}</span>
                      </label>
                    ))}
                  </FilterSection>

                  {/* Features */}
                  <FilterSection title="Features" category="features">
                    {filterOptions.features.map(feature => (
                      <label key={feature} className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                        <input
                          type="checkbox"
                          checked={filters.features.includes(feature)}
                          onChange={() => handleFilterChange('features', feature)}
                          className={`w-4 h-4 text-primary-600 rounded focus:ring-primary-500 focus:ring-offset-0 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-300'}`}
                        />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{feature}</span>
                      </label>
                    ))}
                  </FilterSection>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">


              {/* Results Count */}
              <div className="mb-4">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                  Showing <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{startIndex + 1}-{Math.min(endIndex, filteredAgents.length)}</span> of <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{filteredAgents.length}</span> agents
                </p>
              </div>

              {/* Agent Grid */}
              {/* Agents Grid */}
              {currentAgents.length > 0 ? (
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${viewMode === 'list' ? 'flex flex-col' : ''}`}>
                  {currentAgents.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => handleAuthenticatedAction(() => navigate(`/agentx/hub/agent/${agent.id}`), agent.id)}
                      className={`group relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col p-6 ${theme === 'dark'
                        ? 'bg-[#1e293b]/50 border-white/5 hover:border-primary-500/50 hover:bg-[#1e293b]'
                        : 'bg-white border-slate-200 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/5'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3">
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
                            {agent.icon}
                          </div>

                          {/* Title & Owner */}
                          <div>
                            <h3 className={`text-base font-bold mb-0.5 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{agent.name}</h3>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`}>by</span>
                              <span className={`text-[10px] font-semibold ${agent.owner === 'Obsolio' ? 'text-primary-400' : (theme === 'dark' ? 'text-gray-300' : 'text-slate-600')}`}>
                                {agent.owner}
                              </span>
                              {agent.owner === 'Obsolio' && (
                                <div className="px-1.5 py-0.5 bg-primary-500/20 text-primary-400 text-[10px] font-bold rounded uppercase">
                                  Official
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          <div className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{agent.pricingLabel}</div>
                          <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>per month</div>
                        </div>
                      </div>

                      <p className={`text-sm mb-4 line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{agent.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        {renderStars(agent.rating)}
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{agent.rating}</span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>({agent.reviews})</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {agent.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className={`px-2 py-1 text-xs rounded-lg font-medium border ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className={`flex items-center gap-4 mb-4 pb-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                        <div className={`flex items-center gap-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                          <Download className="w-4 h-4" />
                          <span>{agent.deployments.toLocaleString()}</span>
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{agent.category}</div>
                      </div>

                      {/* Footer Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAuthenticatedAction(
                              () => navigate(`/agentx/hub/checkout/${agent.id}`),
                              agent.id
                            );
                          }}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm"
                        >
                          {isAuthenticated ? 'Deploy' : 'Login to Deploy'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAuthenticatedAction(() => { }, agent.id);
                          }}
                          className={`px-3 py-2 border-2 rounded-xl hover:border-primary-500 hover:bg-primary-500/10 transition-colors group ${theme === 'dark' ? 'border-white/20' : 'border-slate-200'}`}
                          title="Contact Owner"
                        >
                          <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-primary-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`border rounded-3xl p-12 text-center ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No agents found</h3>
                  <p className={`mb-6 max-w-md mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                    Try adjusting your filters or search query to find the perfect agent for your needs
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                  {/* Items Per Page Selector */}
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page
                      }}
                      className={`px-2 py-1 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer ${theme === 'dark'
                        ? 'bg-[#1e293b] border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-700'
                        }`}
                    >
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={48}>48</option>
                    </select>
                  </div>

                  {/* Page Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      Previous
                    </button>

                    <span className={`text-sm font-medium mx-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MarketplacePage;
