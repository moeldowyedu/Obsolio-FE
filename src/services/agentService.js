import api from './api';

/**
 * Agent Service
 * Handles tenant's installed agents management
 */
const agentService = {
  /**
   * Get all tenant's installed agents
   * @param {Object} params - Query parameters
   * @returns {Promise} Installed agents list
   */
  getAgents: async (params = {}) => {
    try {
      const response = await api.get('/agents', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting agents:', error);
      throw error;
    }
  },

  /**
   * Get specific agent details
   * @param {string} agentId - Agent UUID
   * @returns {Promise} Agent details
   */
  getAgent: async (agentId) => {
    try {
      const response = await api.get(`/agents/${agentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Install agent from marketplace
   * @param {string} agentId - Agent UUID
   * @param {Object} installData - Installation configuration
   * @returns {Promise} Installation result
   */
  installAgent: async (agentId, installData = {}) => {
    try {
      const response = await api.post(`/agents/${agentId}/install`, installData);
      return response.data;
    } catch (error) {
      console.error(`Error installing agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Uninstall agent
   * @param {string} agentId - Agent UUID
   * @returns {Promise} Uninstallation confirmation
   */
  uninstallAgent: async (agentId) => {
    try {
      const response = await api.delete(`/agents/${agentId}/uninstall`);
      return response.data;
    } catch (error) {
      console.error(`Error uninstalling agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Delete agent (alias for uninstall)
   */
  deleteAgent: async (agentId) => {
    return agentService.uninstallAgent(agentId);
  },
  /**
   * Toggle agent status
   * @param {string} agentId - Agent UUID
   * @returns {Promise} Updated status
   */
  toggleAgentStatus: async (agentId) => {
    try {
      const response = await api.post(`/agents/${agentId}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling agent ${agentId} status:`, error);
      throw error;
    }
  },

  /**
   * Record agent usage
   * @param {string} agentId - Agent UUID
   * @returns {Promise} Usage record confirmation
   */
  recordUsage: async (agentId) => {
    try {
      const response = await api.post(`/agents/${agentId}/record-usage`);
      return response.data;
    } catch (error) {
      console.error(`Error recording usage for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Update agent configuration
   * @param {string} agentId - Agent UUID
   * @param {Object} config - Configuration object
   * @returns {Promise} Updated configuration
   */
  updateAgentConfig: async (agentId, config) => {
    try {
      const response = await api.put(`/agents/${agentId}/config`, config);
      return response.data;
    } catch (error) {
      console.error(`Error updating config for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Get agent configuration
   * @param {string} agentId - Agent UUID
   * @returns {Promise} Agent configuration
   */
  getAgentConfig: async (agentId) => {
    try {
      const response = await api.get(`/agents/${agentId}/config`);
      return response.data;
    } catch (error) {
      console.error(`Error getting config for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Test agent execution
   * @param {string} agentId - Agent UUID
   * @param {Object} testData - Test input data
   * @returns {Promise} Test execution result
   */
  testAgent: async (agentId, testData) => {
    try {
      const response = await api.post(`/agents/${agentId}/test`, testData);
      return response.data;
    } catch (error) {
      console.error(`Error testing agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Execute agent
   * @param {string} agentId - Agent UUID
   * @param {Object} inputData - Execution input
   * @returns {Promise} Execution result
   */
  executeAgent: async (agentId, inputData) => {
    try {
      const response = await api.post(`/agents/${agentId}/execute`, inputData);
      return response.data;
    } catch (error) {
      console.error(`Error executing agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Run agent once (alias for executeAgent)
   */
  runAgent: async (agentId, inputData) => {
    return agentService.executeAgent(agentId, inputData);
  },

  /**
   * Get agent execution history
   * @param {string} agentId - Agent UUID
   * @param {Object} params - Query parameters
   * @returns {Promise} Execution history
   */
  getAgentExecutions: async (agentId, params = {}) => {
    try {
      const response = await api.get(`/agents/${agentId}/executions`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error getting executions for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Get agent history (alias for getAgentExecutions)
   */
  getAgentHistory: async (agentId, params = {}) => {
    return agentService.getAgentExecutions(agentId, params);
  },

  /**
   * Get specific execution details
   * @param {string} agentId - Agent UUID
   * @param {string} executionId - Execution ID
   * @returns {Promise} Execution details
   */
  getExecution: async (agentId, executionId) => {
    try {
      const response = await api.get(`/agents/${agentId}/executions/${executionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting execution ${executionId}:`, error);
      throw error;
    }
  },

  /**
   * Cancel running execution
   * @param {string} agentId - Agent UUID
   * @param {string} executionId - Execution ID
   * @returns {Promise} Cancellation confirmation
   */
  cancelExecution: async (agentId, executionId) => {
    try {
      const response = await api.post(`/agents/${agentId}/executions/${executionId}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling execution ${executionId}:`, error);
      throw error;
    }
  },

  /**
   * Get agent statistics
   * @param {string} agentId - Agent UUID
   * @returns {Promise} Agent stats
   */
  getAgentStats: async (agentId) => {
    try {
      const response = await api.get(`/agents/${agentId}/stats`);
      return response.data;
    } catch (error) {
      console.error(`Error getting stats for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Get analytics for all tenant agents
   * @param {Object} params - Query parameters
   * @returns {Promise} Analytics data
   */
  getAgentsAnalytics: async (params = {}) => {
    try {
      const response = await api.get('/agents/analytics', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting agents analytics:', error);
      throw error;
    }
  },

  // Developer/Admin specific methods (for future implementation)

  /**
   * Create new agent (Developer Portal)
   */
  createAgent: async (agentData) => {
    try {
      const response = await api.post('/developer/agents', agentData);
      return response.data;
    } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }
  },

  /**
   * Update agent (Developer Portal)
   */
  updateAgent: async (agentId, agentData) => {
    try {
      const response = await api.put(`/developer/agents/${agentId}`, agentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Delete agent (Developer Portal)
   */
  deleteAgent: async (agentId) => {
    try {
      const response = await api.delete(`/developer/agents/${agentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Clone agent
   */
  cloneAgent: async (agentId, cloneData = {}) => {
    try {
      const response = await api.post(`/agents/${agentId}/clone`, cloneData);
      return response.data;
    } catch (error) {
      console.error(`Error cloning agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Duplicate agent (alias for clone)
   */
  duplicateAgent: async (agentId) => {
    return agentService.cloneAgent(agentId);
  },

  /**
   * Publish agent to marketplace
   */
  publishToMarketplace: async (agentId, publishData) => {
    try {
      const response = await api.post(`/developer/agents/${agentId}/publish`, publishData);
      return response.data;
    } catch (error) {
      console.error(`Error publishing agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Unpublish agent from marketplace
   */
  unpublishFromMarketplace: async (agentId) => {
    try {
      const response = await api.post(`/developer/agents/${agentId}/unpublish`);
      return response.data;
    } catch (error) {
      console.error(`Error unpublishing agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Update agent status
   */
  updateAgentStatus: async (agentId, status) => {
    try {
      const response = await api.put(`/developer/agents/${agentId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Get agent rubrics (Quality criteria)
   */
  getAgentRubrics: async (agentId) => {
    try {
      const response = await api.get(`/agents/${agentId}/rubrics`);
      return response.data;
    } catch (error) {
      console.error(`Error getting rubrics for agent ${agentId}:`, error);
      return { data: [] };
    }
  },

  /**
   * Update agent rubrics
   */
  updateAgentRubrics: async (agentId, rubrics) => {
    try {
      const response = await api.put(`/agents/${agentId}/rubrics`, { rubrics });
      return response.data;
    } catch (error) {
      console.error(`Error updating rubrics for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Get agent schema
   */
  getAgentSchema: async (agentId) => {
    try {
      const response = await api.get(`/agents/${agentId}/schema`);
      return response.data;
    } catch (error) {
      console.error(`Error getting schema for agent ${agentId}:`, error);
      return { data: {} };
    }
  },

  /**
   * Update agent schema
   */
  updateAgentSchema: async (agentId, schema) => {
    try {
      const response = await api.put(`/agents/${agentId}/schema`, { schema });
      return response.data;
    } catch (error) {
      console.error(`Error updating schema for agent ${agentId}:`, error);
      throw error;
    }
  },

  /**
   * Get agent HITL settings
   */
  getAgentHITL: async (agentId) => {
    try {
      const response = await api.get(`/agents/${agentId}/hitl`);
      return response.data;
    } catch (error) {
      console.error(`Error getting HITL settings for agent ${agentId}:`, error);
      return { data: { enabled: false } };
    }
  },

  /**
   * Update agent HITL settings
   */
  updateAgentHITL: async (agentId, hitlSettings) => {
    try {
      const response = await api.put(`/agents/${agentId}/hitl`, hitlSettings);
      return response.data;
    } catch (error) {
      console.error(`Error updating HITL settings for agent ${agentId}:`, error);
      throw error;
    }
  },
};

export default agentService;
