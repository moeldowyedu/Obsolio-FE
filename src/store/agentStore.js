import { create } from 'zustand';
import agentService from '../services/agentService';

export const useAgentStore = create((set, get) => ({
  agents: [],
  currentAgent: null,
  agentHistory: [],
  isLoading: false,
  error: null,

  // Fetch all agents
  fetchAgents: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const agents = await agentService.getAgents(params);
      set({ agents, isLoading: false });
      return agents;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch agents',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch agent by ID
  fetchAgent: async (agentId) => {
    set({ isLoading: true, error: null });
    try {
      const agent = await agentService.getAgent(agentId);
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

  // Create agent
  createAgent: async (agentData) => {
    set({ isLoading: true, error: null });
    try {
      const agent = await agentService.createAgent(agentData);
      set((state) => ({
        agents: [...state.agents, agent],
        currentAgent: agent,
        isLoading: false,
      }));
      return agent;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to create agent',
        isLoading: false,
      });
      throw error;
    }
  },

  // Update agent
  updateAgent: async (agentId, agentData) => {
    set({ isLoading: true, error: null });
    try {
      const agent = await agentService.updateAgent(agentId, agentData);
      set((state) => ({
        agents: state.agents.map((a) => (a.id === agentId ? agent : a)),
        currentAgent:
          state.currentAgent?.id === agentId ? agent : state.currentAgent,
        isLoading: false,
      }));
      return agent;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update agent',
        isLoading: false,
      });
      throw error;
    }
  },

  // Delete agent
  deleteAgent: async (agentId) => {
    set({ isLoading: true, error: null });
    try {
      await agentService.deleteAgent(agentId);
      set((state) => ({
        agents: state.agents.filter((a) => a.id !== agentId),
        currentAgent:
          state.currentAgent?.id === agentId ? null : state.currentAgent,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete agent',
        isLoading: false,
      });
      throw error;
    }
  },

  // Run agent
  runAgent: async (agentId, inputData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await agentService.runAgent(agentId, inputData);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to run agent',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch agent history
  fetchAgentHistory: async (agentId, params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const history = await agentService.getAgentHistory(agentId, params);
      set({ agentHistory: history, isLoading: false });
      return history;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch history',
        isLoading: false,
      });
      throw error;
    }
  },

  // Update agent status
  updateAgentStatus: async (agentId, status) => {
    set({ isLoading: true, error: null });
    try {
      const agent = await agentService.updateAgentStatus(agentId, status);
      set((state) => ({
        agents: state.agents.map((a) => (a.id === agentId ? agent : a)),
        currentAgent:
          state.currentAgent?.id === agentId ? agent : state.currentAgent,
        isLoading: false,
      }));
      return agent;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update status',
        isLoading: false,
      });
      throw error;
    }
  },

  // Publish agent
  publishAgent: async (agentId, publishData) => {
    set({ isLoading: true, error: null });
    try {
      const agent = await agentService.publishToMarketplace(
        agentId,
        publishData
      );
      set((state) => ({
        agents: state.agents.map((a) => (a.id === agentId ? agent : a)),
        currentAgent:
          state.currentAgent?.id === agentId ? agent : state.currentAgent,
        isLoading: false,
      }));
      return agent;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to publish agent',
        isLoading: false,
      });
      throw error;
    }
  },

  // Clear current agent
  clearCurrentAgent: () => set({ currentAgent: null }),

  // Clear error
  clearError: () => set({ error: null }),
}));
