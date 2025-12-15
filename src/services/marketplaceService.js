import api from './api';

const MOCK_MARKETPLACE_AGENTS = [
  {
    id: '1',
    name: 'Customer Support Pro',
    icon: '💬',
    description: 'AI-powered customer support agent that handles inquiries 24/7.',
    category: 'Support',
    industry: 'Tech',
    pricing: 99,
    price: 99,
    rating: 4.8,
    reviews: 342,
    deployments: 1250,
    owner: 'Obsolio',
    features: ['Multi-channel', 'Sentiment Analysis'],
  },
  {
    id: '2',
    name: 'Sales Outreach Bot',
    icon: '📧',
    description: 'Automated sales outreach and follow-up agent.',
    category: 'Sales',
    industry: 'Marketing',
    pricing: 149,
    price: 149,
    rating: 4.6,
    reviews: 120,
    deployments: 800,
    owner: 'SalesFlow',
    features: ['Email Automation', 'CRM Integration'],
  }
];

const marketplaceService = {
  // Browse marketplace agents
  browseAgents: async (params = {}) => {
    // const response = await api.get('/marketplace/agents', { params });
    // return response.data;
    console.log('Using mock browseAgents', params);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: MOCK_MARKETPLACE_AGENTS }), 500);
    });
  },

  // Get marketplace agent details
  getMarketplaceAgent: async (agentId) => {
    // const response = await api.get(`/marketplace/agents/${agentId}`);
    // return response.data;
    console.log(`Using mock getMarketplaceAgent ${agentId}`);
    const agent = MOCK_MARKETPLACE_AGENTS.find(a => a.id === agentId) || MOCK_MARKETPLACE_AGENTS[0];
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        data: {
          ...agent,
          longDescription: agent.description + ' Extended description details here.',
          techStack: [{ name: 'GPT-4', category: 'AI Model' }],
          reviewsList: []
        }
      }), 500);
    });
  },

  // Search marketplace
  searchAgents: async (query, filters = {}) => {
    // const response = await api.get('/marketplace/search', { params: ... });
    console.log('Using mock searchAgents', query);
    return new Promise((resolve) => {
      const results = MOCK_MARKETPLACE_AGENTS.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
      setTimeout(() => resolve({ data: results }), 400);
    });
  },

  // Get featured agents
  getFeaturedAgents: async () => {
    console.log('Using mock getFeaturedAgents');
    return Promise.resolve({ data: MOCK_MARKETPLACE_AGENTS.slice(0, 1) });
  },

  // Get popular agents
  getPopularAgents: async (limit = 10) => {
    console.log('Using mock getPopularAgents');
    return Promise.resolve({ data: MOCK_MARKETPLACE_AGENTS });
  },

  // Get agents by category
  getAgentsByCategory: async (category, params = {}) => {
    return Promise.resolve({ data: MOCK_MARKETPLACE_AGENTS.filter(a => a.category === category) });
  },

  // Get agents by industry
  getAgentsByIndustry: async (industry, params = {}) => {
    return Promise.resolve({ data: MOCK_MARKETPLACE_AGENTS.filter(a => a.industry === industry) });
  },

  // Purchase/deploy agent
  purchaseAgent: async (agentId, purchaseData = {}) => {
    console.log('Using mock purchaseAgent', agentId);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, transactionId: 'txn_mock_123' }), 1000);
    });
  },

  // Get my purchased agents
  getMyPurchases: async () => {
    return Promise.resolve({ data: [] });
  },

  // Get agent reviews
  getAgentReviews: async (agentId, params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Submit agent review
  submitReview: async (agentId, reviewData) => {
    return Promise.resolve({ success: true, data: reviewData });
  },

  // Update review
  updateReview: async (agentId, reviewId, reviewData) => {
    return Promise.resolve({ success: true, data: reviewData });
  },

  // Delete review
  deleteReview: async (agentId, reviewId) => {
    return Promise.resolve({ success: true });
  },

  // Get my listings (as seller)
  getMyListings: async () => {
    return Promise.resolve({ data: [] });
  },

  // Get listing analytics
  getListingAnalytics: async (agentId) => {
    return Promise.resolve({ data: { views: 100, sales: 5 } });
  },

  // Get seller dashboard stats
  getSellerStats: async () => {
    return Promise.resolve({ data: { totalSales: 500, totalRevenue: 5000 } });
  },

  // Get revenue data
  getRevenue: async (params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Get sales history
  getSalesHistory: async (params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Get payout history
  getPayoutHistory: async () => {
    return Promise.resolve({ data: [] });
  },

  // Request payout
  requestPayout: async (amount) => {
    return Promise.resolve({ success: true });
  },

  // Update listing pricing
  updatePricing: async (agentId, pricingData) => {
    return Promise.resolve({ success: true });
  },

  // Update listing visibility
  updateVisibility: async (agentId, isPublic) => {
    return Promise.resolve({ success: true });
  },
};

export default marketplaceService;
