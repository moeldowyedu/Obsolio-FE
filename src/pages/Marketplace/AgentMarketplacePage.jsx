import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Input, Select } from '../../components/common';
import { AgentCard, MarketplaceFilters } from '../../components/marketplace';
import { Search, TrendingUp } from 'lucide-react';

const AgentMarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    category: 'all',
    engines: [],
    priceRange: null,
    minRating: null,
  });

  // Mock marketplace agents
  const marketplaceAgents = [
    {
      id: 'invoice-processor',
      name: 'Invoice Processing Agent',
      author: 'FinTech Solutions',
      description: 'Automatically extract, validate, and process invoices from emails and documents with 99% accuracy',
      price: 99,
      rating: 4.9,
      downloads: 1523,
      engines: ['vision', 'document', 'data'],
      category: 'finance',
      banner: null,
    },
    {
      id: 'customer-sentiment',
      name: 'Customer Sentiment Analyzer',
      author: 'DataWise Inc',
      description: 'Real-time customer sentiment analysis across support tickets, emails, and chat conversations',
      price: 0,
      rating: 4.8,
      downloads: 3421,
      engines: ['text'],
      category: 'customer-service',
      banner: null,
    },
    {
      id: 'resume-screener',
      name: 'AI Resume Screening Agent',
      author: 'HR Tech Labs',
      description: 'Screen and rank resumes based on job requirements, eliminating bias and saving 80% of recruiting time',
      price: 149,
      rating: 4.7,
      downloads: 892,
      engines: ['document', 'text'],
      category: 'hr',
      banner: null,
    },
    {
      id: 'code-reviewer',
      name: 'Automated Code Reviewer',
      author: 'DevTools Pro',
      description: 'Comprehensive code review agent that checks for bugs, security issues, and best practices violations',
      price: 129,
      rating: 5.0,
      downloads: 2156,
      engines: ['code'],
      category: 'technology',
      banner: null,
    },
    {
      id: 'contract-analyzer',
      name: 'Legal Contract Analyzer',
      author: 'LegalTech AI',
      description: 'Review contracts for risks, compliance issues, and unfavorable terms with lawyer-grade accuracy',
      price: 199,
      rating: 4.9,
      downloads: 678,
      engines: ['document', 'text'],
      category: 'legal',
      banner: null,
    },
    {
      id: 'social-media-monitor',
      name: 'Social Media Brand Monitor',
      author: 'MarketPulse',
      description: 'Monitor brand mentions, sentiment, and trends across all major social media platforms',
      price: 79,
      rating: 4.6,
      downloads: 1876,
      engines: ['web', 'text'],
      category: 'marketing',
      banner: null,
    },
    {
      id: 'medical-report-analyzer',
      name: 'Medical Report Analyzer',
      author: 'HealthAI Systems',
      description: 'Extract insights from medical reports, lab results, and patient records with HIPAA compliance',
      price: 249,
      rating: 4.9,
      downloads: 534,
      engines: ['document', 'text', 'vision'],
      category: 'healthcare',
      banner: null,
    },
    {
      id: 'ecommerce-product-classifier',
      name: 'E-commerce Product Classifier',
      author: 'RetailBot Co',
      description: 'Automatically categorize and tag products with descriptions and specifications',
      price: 0,
      rating: 4.5,
      downloads: 2987,
      engines: ['vision', 'text'],
      category: 'retail',
      banner: null,
    },
    {
      id: 'financial-audit-agent',
      name: 'Financial Audit Assistant',
      author: 'AuditPro AI',
      description: 'Comprehensive financial statement analysis with fraud detection and compliance checking',
      price: 179,
      rating: 4.8,
      downloads: 445,
      engines: ['data', 'document'],
      category: 'finance',
      banner: null,
    },
    {
      id: 'content-moderator',
      name: 'Content Moderation Agent',
      author: 'SafeSpace Tech',
      description: 'Real-time content moderation for text, images, and videos across multiple platforms',
      price: 99,
      rating: 4.7,
      downloads: 1654,
      engines: ['vision', 'text'],
      category: 'customer-service',
      banner: null,
    },
    {
      id: 'research-paper-analyzer',
      name: 'Research Paper Analyzer',
      author: 'AcademicAI',
      description: 'Analyze research papers for methodology, citations, and contribution to the field',
      price: 0,
      rating: 4.9,
      downloads: 3211,
      engines: ['document', 'text'],
      category: 'education',
      banner: null,
    },
    {
      id: 'property-valuation',
      name: 'Property Valuation Agent',
      author: 'RealEstateAI',
      description: 'AI-powered property valuation using market data, images, and local trends',
      price: 159,
      rating: 4.6,
      downloads: 723,
      engines: ['vision', 'data', 'web'],
      category: 'real-estate',
      banner: null,
    },
  ];

  // Filter agents
  const filteredAgents = marketplaceAgents.filter((agent) => {
    // Search filter
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.author.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      filters.category === 'all' ||
      filters.category === 'featured' ||
      filters.category === 'popular' ||
      filters.category === 'new' ||
      agent.category === filters.category;

    // Engine filter
    const matchesEngines =
      filters.engines.length === 0 ||
      filters.engines.some((engineId) => agent.engines.includes(engineId));

    // Price filter
    const matchesPrice =
      !filters.priceRange ||
      (agent.price >= filters.minPrice && agent.price <= filters.maxPrice);

    // Rating filter
    const matchesRating =
      !filters.minRating || agent.rating >= filters.minRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesEngines &&
      matchesPrice &&
      matchesRating
    );
  });

  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return 0; // Would use creation date
      default:
        return 0;
    }
  });

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      engines: [],
      priceRange: null,
      minRating: null,
    });
    setSearchQuery('');
  };

  return (
    <MainLayout>
      <div className="py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-6 h-6" />
              <span className="text-primary-100 font-medium">
                AgentX Hub Marketplace
              </span>
            </div>
            <h1 className="text-4xl font-heading font-bold mb-3">
              Discover & Deploy Precision AI Agents
            </h1>
            <p className="text-xl text-primary-100 mb-6">
              Browse {marketplaceAgents.length} ready-to-deploy agents or publish your own and earn 70% revenue share
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span>Instant Deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span>70% Revenue Share</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span>Verified Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search agents by name, description, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-5 h-5 text-gray-400" />}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <strong>{sortedAgents.length}</strong> of{' '}
            <strong>{marketplaceAgents.length}</strong> agents
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <MarketplaceFilters
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Agent Grid */}
          <div className="lg:col-span-3">
            {sortedAgents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedAgents.map((agent, index) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    featured={index === 0 && filters.category === 'all'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No agents found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgentMarketplacePage;
