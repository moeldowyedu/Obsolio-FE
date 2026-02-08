import { create } from 'zustand';
import marketplaceService from '../services/marketplaceService';

export const useMarketplaceStore = create((set, get) => ({
  agents: [],
  tieredAgents: {}, // Stores agents grouped by tier (Standard, Premium, etc.)
  featuredAgents: [],
  popularAgents: [],
  currentAgent: null,
  myListings: [],
  myPurchases: [],
  filters: {
    category: 'all',
    industry: null,
    priceRange: null,
    rating: null,
    searchQuery: '',
  },
  isLoading: false,
  error: null,

  // Helper to flatten tiered agents for list views
  _flattenAgents: (tieredData) => {
    let allAgents = [];
    if (tieredData) {
      Object.values(tieredData).forEach(tierGroup => {
        if (Array.isArray(tierGroup)) {
          allAgents = [...allAgents, ...tierGroup];
        }
      });
    }
    return allAgents;
  },

  // Browse agents (Tenant Context)
  browseAgents: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await marketplaceService.browseAgents(params);
      // Response structure: { success: true, data: { "Standard": [...], "Premium": [...] } }
      const tieredData = response.data || {};
      const flatAgents = get()._flattenAgents(tieredData);

      set({
        tieredAgents: tieredData,
        agents: flatAgents,
        isLoading: false
      });
      return tieredData;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to browse agents',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get Public Catalog (No Auth)
  getPublicCatalog: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await marketplaceService.getPublicCatalog();
      const tieredData = response.data || {};
      const flatAgents = get()._flattenAgents(tieredData);

      set({
        tieredAgents: tieredData,
        agents: flatAgents,
        isLoading: false
      });
      return tieredData;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch public catalog',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get marketplace agent
  getMarketplaceAgent: async (agentId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await marketplaceService.getMarketplaceAgent(agentId);
      // Response structure: { success: true, data: { agent: {...}, is_subscribed: ... } }
      // We want to store the agent details. 
      // API docs say: data: { agent: {...}, ... }
      const agentData = response.data?.agent || response.data;

      set({ currentAgent: agentData, isLoading: false });
      return agentData;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch agent',
        isLoading: false,
      });
      throw error;
    }
  },

  // Search agents
  searchAgents: async (query, filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await marketplaceService.searchAgents(query, filters);
      // Search might return flat list or tiered. Assuming same structure as browse for now.
      // If search returns flat list in future, we can adjust. 
      // Current doc says "Response Structure: Same grouping as public catalog"
      const tieredData = response.data || {};
      const flatAgents = get()._flattenAgents(tieredData);

      set({
        tieredAgents: tieredData,
        agents: flatAgents,
        isLoading: false
      });
      return flatAgents;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Search failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch featured agents
  fetchFeaturedAgents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await marketplaceService.getFeaturedAgents();
      // Assuming featured returns similar structure or just list?
      // Service calls /pricing/agents/marketplace with param. Likely returns tiered.
      // We might want to extract just the agents marked 'is_featured' from the tiered response?
      // Or maybe the backend filters it. 
      // For safety, let's flatten whatever we get.
      const data = response.data || {};
      let agents = [];
      if (Array.isArray(data)) {
        agents = data;
      } else {
        agents = get()._flattenAgents(data);
      }

      set({ featuredAgents: agents, isLoading: false });
      return agents;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch featured agents',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch popular agents
  fetchPopularAgents: async (limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await marketplaceService.getPopularAgents(limit);
      const data = response.data || {};
      let agents = [];
      if (Array.isArray(data)) {
        agents = data;
      } else {
        agents = get()._flattenAgents(data);
      }

      set({ popularAgents: agents, isLoading: false });
      return agents;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch popular agents',
        isLoading: false,
      });
      throw error;
    }
  },

  // Purchase agent
  purchaseAgent: async (agentId, purchaseData = {}) => {
    set({ isLoading: true, error: null });
    try {
      const result = await marketplaceService.purchaseAgent(
        agentId,
        purchaseData
      );
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Purchase failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch my purchases
  fetchMyPurchases: async () => {
    set({ isLoading: true, error: null });
    try {
      const purchases = await marketplaceService.getMyPurchases();
      set({ myPurchases: purchases, isLoading: false });
      return purchases;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch purchases',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch my listings (seller)
  fetchMyListings: async () => {
    set({ isLoading: true, error: null });
    try {
      const listings = await marketplaceService.getMyListings();
      set({ myListings: listings, isLoading: false });
      return listings;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch listings',
        isLoading: false,
      });
      throw error;
    }
  },

  // Submit review
  submitReview: async (agentId, reviewData) => {
    set({ isLoading: true, error: null });
    try {
      const review = await marketplaceService.submitReview(agentId, reviewData);
      set({ isLoading: false });
      return review;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to submit review',
        isLoading: false,
      });
      throw error;
    }
  },

  // Set filters
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  // Clear filters
  clearFilters: () => {
    set({
      filters: {
        category: 'all',
        industry: null,
        priceRange: null,
        rating: null,
        searchQuery: '',
      },
    });
  },

  // Clear current agent
  clearCurrentAgent: () => set({ currentAgent: null }),

  // Clear error
  clearError: () => set({ error: null }),
}));
