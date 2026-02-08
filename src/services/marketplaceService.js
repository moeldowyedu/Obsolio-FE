import api from './api';
import notify from '../utils/toast';

/**
 * Marketplace Service
 * Connects to OBSOLIO Backend API for Agent Marketplace
 * Base URL: https://api.obsolio.com/api/v1
 */
const marketplaceService = {
  /**
   * Public Agent Catalog (No Auth required)
   * Endpoint: GET /pricing/agents/catalog
   * @returns {Promise} Agents grouped by Tier
   */
  getPublicCatalog: async () => {
    try {
      const response = await api.get('/pricing/agents/catalog');
      return response.data;
    } catch (error) {
      console.error('Error fetching public catalog:', error);
      throw error;
    }
  },

  /**
   * Browse Agents (Tenant Context)
   * Endpoint: GET /pricing/agents/marketplace
   * @param {Object} params - Query parameters
   * @returns {Promise} Agents grouped by Tier with subscription status
   */
  browseAgents: async (params = {}) => {
    try {
      const response = await api.get('/pricing/agents/marketplace', { params });
      return response.data;
    } catch (error) {
      console.error('Error browsing agents:', error);
      throw error;
    }
  },

  /**
   * Get Agent Details
   * Endpoint: GET /pricing/agents/marketplace/{agent_id}
   * @param {string} agentId - Agent UUID
   * @returns {Promise} Detailed agent information
   */
  getMarketplaceAgent: async (agentId) => {
    try {
      const response = await api.get(`/pricing/agents/marketplace/${agentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Search marketplace agents (Client-side filtering recommended for now due to grouped response)
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise} Search results
   */
  searchAgents: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const response = await api.get('/pricing/agents/marketplace', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching agents:', error);
      throw error;
    }
  },

  /**
   * Get featured agents
   * @returns {Promise} Featured agents list
   */
  getFeaturedAgents: async () => {
    try {
      const response = await api.get('/pricing/agents/marketplace', { params: { featured: true } });
      return response.data;
    } catch (error) {
      console.error('Error getting featured agents:', error);
      throw error;
    }
  },

  /**
   * Get popular agents
   * @param {number} limit - Number of agents to return
   * @returns {Promise} Popular agents
   */
  getPopularAgents: async (limit = 10) => {
    try {
      const response = await api.get('/pricing/agents/marketplace', {
        params: { limit, sort: 'popular' }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting popular agents:', error);
      throw error;
    }
  },

  /**
   * Get agents by category
   * @param {string} category - Category name
   * @param {Object} params - Additional parameters
   * @returns {Promise} Agents in category
   */
  getAgentsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/pricing/agents/marketplace`, { params: { ...params, category } });
      return response.data;
    } catch (error) {
      console.error(`Error getting agents in category ${category}:`, error);
      throw error;
    }
  },

  /**
   * Install an agent (Example with Toast)
   * @param {string} agentId 
   * @returns {Promise}
   */
  installAgent: async (agentId) => {
    const promise = api.post(`/marketplace/${agentId}/install`);

    return notify.promise(promise, {
      loading: 'Installing agent...',
      success: 'Agent installed successfully!',
      error: (err) => err.response?.data?.message || 'Failed to install agent.'
    }).then(response => response.data);
  },

  /**
   * Get all marketplace categories
   * @returns {Promise} Categories list with counts
   */
  getCategories: async () => {
    try {
      // If there isn't a dedicated categories endpoint, we might need to derive this from the catalog
      // or check if there is a specific endpoint. Assuming /pricing/agents/categories for now or leaving as is if existing
      const response = await api.get('/marketplace/categories');
      return response.data;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },

  /**
   * Get marketplace statistics
   * @returns {Promise} Marketplace stats
   */
  getStats: async () => {
    try {
      const response = await api.get('/marketplace/stats');
      return response.data;
    } catch (error) {
      console.error('Error getting marketplace stats:', error);
      throw error;
    }
  },

  /**
   * Get agents by industry (mapped from category)
   * @param {string} industry - Industry name
   * @param {Object} params - Additional parameters
   * @returns {Promise} Agents in industry
   */
  getAgentsByIndustry: async (industry, params = {}) => {
    // Industry is same as category in backend
    return marketplaceService.getAgentsByCategory(industry, params);
  },

  /**
   * Purchase/Install agent (will be implemented with Stripe)
   * @param {string} agentId - Agent UUID
   * @param {Object} purchaseData - Purchase details
   * @returns {Promise} Transaction result
   */
  purchaseAgent: async (agentId, purchaseData = {}) => {
    try {
      const response = await api.post(`/agents/${agentId}/install`, purchaseData);
      return response.data;
    } catch (error) {
      console.error(`Error purchasing agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Get my purchased agents (redirects to agentService)
   * @returns {Promise} User's agents
   */
  getMyPurchases: async () => {
    try {
      const response = await api.get('/agents');
      return response.data;
    } catch (error) {
      console.error('Error getting my purchases:', error);
      throw error;
    }
  },

  /**
   * Get agent reviews (placeholder - will be implemented)
   * @param {string} agentId - Agent UUID
   * @param {Object} params - Query parameters
   * @returns {Promise} Reviews list
   */
  getAgentReviews: async (agentId, params = {}) => {
    try {
      // TODO: Implement reviews endpoint in backend
      const response = await api.get(`/marketplace/${agentId}/reviews`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error getting reviews for agent ${agentId}:`, error);
      // Return empty array if endpoint not implemented yet
      return { data: [] };
    }
  },

  /**
   * Submit review (placeholder - will be implemented)
   * @param {string} agentId - Agent UUID
   * @param {Object} reviewData - Review content
   * @returns {Promise} Created review
   */
  submitReview: async (agentId, reviewData) => {
    try {
      // TODO: Implement reviews endpoint in backend
      const response = await api.post(`/marketplace/${agentId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error(`Error submitting review for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Update review (placeholder - will be implemented)
   * @param {string} agentId - Agent UUID
   * @param {string} reviewId - Review ID
   * @param {Object} reviewData - Updated review content
   * @returns {Promise} Updated review
   */
  updateReview: async (agentId, reviewId, reviewData) => {
    try {
      const response = await api.put(`/marketplace/${agentId}/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      console.error(`Error updating review ${reviewId}:`, error);
      throw error;
    }
  },

  /**
   * Delete review (placeholder - will be implemented)
   * @param {string} agentId - Agent UUID
   * @param {string} reviewId - Review ID
   * @returns {Promise} Deletion confirmation
   */
  deleteReview: async (agentId, reviewId) => {
    try {
      const response = await api.delete(`/marketplace/${agentId}/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting review ${reviewId}:`, error);
      throw error;
    }
  },

  // Seller/Developer Portal methods (for future implementation)

  /**
   * Get my listings as seller (placeholder)
   */
  getMyListings: async () => {
    try {
      // TODO: Implement seller dashboard
      const response = await api.get('/developer/agents');
      return response.data;
    } catch (error) {
      console.error('Error getting my listings:', error);
      return { data: [] };
    }
  },

  /**
   * Get listing analytics (placeholder)
   */
  getListingAnalytics: async (agentId) => {
    try {
      const response = await api.get(`/developer/agents/${agentId}/analytics`);
      return response.data;
    } catch (error) {
      console.error('Error getting listing analytics:', error);
      return { data: { views: 0, sales: 0 } };
    }
  },

  /**
   * Get seller dashboard stats (placeholder)
   */
  getSellerStats: async () => {
    try {
      const response = await api.get('/developer/stats');
      return response.data;
    } catch (error) {
      console.error('Error getting seller stats:', error);
      return { data: { totalSales: 0, totalRevenue: 0 } };
    }
  },

  /**
   * Get revenue data (placeholder)
   */
  getRevenue: async (params = {}) => {
    try {
      const response = await api.get('/developer/revenue', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting revenue data:', error);
      return { data: [] };
    }
  },

  /**
   * Get sales history (placeholder)
   */
  getSalesHistory: async (params = {}) => {
    try {
      const response = await api.get('/developer/sales', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting sales history:', error);
      return { data: [] };
    }
  },

  /**
   * Get payout history (placeholder)
   */
  getPayoutHistory: async () => {
    try {
      const response = await api.get('/developer/payouts');
      return response.data;
    } catch (error) {
      console.error('Error getting payout history:', error);
      return { data: [] };
    }
  },

  /**
   * Request payout (placeholder)
   */
  requestPayout: async (amount) => {
    try {
      const response = await api.post('/developer/payouts', { amount });
      return response.data;
    } catch (error) {
      console.error('Error requesting payout:', error);
      throw error;
    }
  },

  /**
   * Update listing pricing (placeholder)
   */
  updatePricing: async (agentId, pricingData) => {
    try {
      const response = await api.put(`/developer/agents/${agentId}/pricing`, pricingData);
      return response.data;
    } catch (error) {
      console.error('Error updating pricing:', error);
      throw error;
    }
  },

  /**
   * Update listing visibility (placeholder)
   */
  updateVisibility: async (agentId, isPublic) => {
    try {
      const response = await api.put(`/developer/agents/${agentId}/visibility`, { is_public: isPublic });
      return response.data;
    } catch (error) {
      console.error('Error updating visibility:', error);
      throw error;
    }
  },
};

export default marketplaceService;
