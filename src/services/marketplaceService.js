import api from './api';

const marketplaceService = {
  // Browse marketplace agents
  browseAgents: async (params = {}) => {
    const response = await api.get('/marketplace/agents', { params });
    return response.data;
  },

  // Get marketplace agent details
  getMarketplaceAgent: async (agentId) => {
    const response = await api.get(`/marketplace/agents/${agentId}`);
    return response.data;
  },

  // Search marketplace
  searchAgents: async (query, filters = {}) => {
    const response = await api.get('/marketplace/search', {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  // Get featured agents
  getFeaturedAgents: async () => {
    const response = await api.get('/marketplace/featured');
    return response.data;
  },

  // Get popular agents
  getPopularAgents: async (limit = 10) => {
    const response = await api.get('/marketplace/popular', {
      params: { limit },
    });
    return response.data;
  },

  // Get agents by category
  getAgentsByCategory: async (category, params = {}) => {
    const response = await api.get(`/marketplace/categories/${category}`, {
      params,
    });
    return response.data;
  },

  // Get agents by industry
  getAgentsByIndustry: async (industry, params = {}) => {
    const response = await api.get(`/marketplace/industries/${industry}`, {
      params,
    });
    return response.data;
  },

  // Purchase/deploy agent
  purchaseAgent: async (agentId, purchaseData = {}) => {
    const response = await api.post(`/marketplace/agents/${agentId}/purchase`, purchaseData);
    return response.data;
  },

  // Get my purchased agents
  getMyPurchases: async () => {
    const response = await api.get('/marketplace/purchases');
    return response.data;
  },

  // Get agent reviews
  getAgentReviews: async (agentId, params = {}) => {
    const response = await api.get(`/marketplace/agents/${agentId}/reviews`, {
      params,
    });
    return response.data;
  },

  // Submit agent review
  submitReview: async (agentId, reviewData) => {
    const response = await api.post(`/marketplace/agents/${agentId}/reviews`, reviewData);
    return response.data;
  },

  // Update review
  updateReview: async (agentId, reviewId, reviewData) => {
    const response = await api.put(`/marketplace/agents/${agentId}/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // Delete review
  deleteReview: async (agentId, reviewId) => {
    const response = await api.delete(`/marketplace/agents/${agentId}/reviews/${reviewId}`);
    return response.data;
  },

  // Get my listings (as seller)
  getMyListings: async () => {
    const response = await api.get('/marketplace/my-listings');
    return response.data;
  },

  // Get listing analytics
  getListingAnalytics: async (agentId) => {
    const response = await api.get(`/marketplace/listings/${agentId}/analytics`);
    return response.data;
  },

  // Get seller dashboard stats
  getSellerStats: async () => {
    const response = await api.get('/marketplace/seller/stats');
    return response.data;
  },

  // Get revenue data
  getRevenue: async (params = {}) => {
    const response = await api.get('/marketplace/seller/revenue', { params });
    return response.data;
  },

  // Get sales history
  getSalesHistory: async (params = {}) => {
    const response = await api.get('/marketplace/seller/sales', { params });
    return response.data;
  },

  // Get payout history
  getPayoutHistory: async () => {
    const response = await api.get('/marketplace/seller/payouts');
    return response.data;
  },

  // Request payout
  requestPayout: async (amount) => {
    const response = await api.post('/marketplace/seller/payouts/request', { amount });
    return response.data;
  },

  // Update listing pricing
  updatePricing: async (agentId, pricingData) => {
    const response = await api.put(`/marketplace/listings/${agentId}/pricing`, pricingData);
    return response.data;
  },

  // Update listing visibility
  updateVisibility: async (agentId, isPublic) => {
    const response = await api.patch(`/marketplace/listings/${agentId}/visibility`, {
      is_public: isPublic,
    });
    return response.data;
  },
};

export default marketplaceService;
