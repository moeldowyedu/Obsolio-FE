import { create } from 'zustand';
import marketplaceService from '../services/marketplaceService';

export const useMarketplaceStore = create((set, get) => ({
  agents: [],
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

  // Browse agents
  browseAgents: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const agents = await marketplaceService.browseAgents(params);
      set({ agents, isLoading: false });
      return agents;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to browse agents',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get marketplace agent
  getMarketplaceAgent: async (agentId) => {
    set({ isLoading: true, error: null });
    try {
      const agent = await marketplaceService.getMarketplaceAgent(agentId);
      set({ currentAgent: agent, isLoading: false });
      return agent;
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
      const agents = await marketplaceService.searchAgents(query, filters);
      set({ agents, isLoading: false });
      return agents;
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
      const agents = await marketplaceService.getFeaturedAgents();
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
      const agents = await marketplaceService.getPopularAgents(limit);
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
