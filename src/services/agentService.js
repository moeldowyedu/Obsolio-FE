import api from './api';

const agentService = {
  // Get all agents
  getAgents: async (params = {}) => {
    const response = await api.get('/agents', { params });
    return response.data;
  },

  // Get agent by ID
  getAgent: async (agentId) => {
    const response = await api.get(`/agents/${agentId}`);
    return response.data;
  },

  // Create new agent
  createAgent: async (agentData) => {
    const response = await api.post('/agents', agentData);
    return response.data;
  },

  // Update agent
  updateAgent: async (agentId, agentData) => {
    const response = await api.put(`/agents/${agentId}`, agentData);
    return response.data;
  },

  // Delete agent
  deleteAgent: async (agentId) => {
    const response = await api.delete(`/agents/${agentId}`);
    return response.data;
  },

  // Duplicate agent
  duplicateAgent: async (agentId) => {
    const response = await api.post(`/agents/${agentId}/duplicate`);
    return response.data;
  },

  // Get agent configuration
  getAgentConfig: async (agentId) => {
    const response = await api.get(`/agents/${agentId}/config`);
    return response.data;
  },

  // Update agent configuration
  updateAgentConfig: async (agentId, config) => {
    const response = await api.put(`/agents/${agentId}/config`, config);
    return response.data;
  },

  // Test agent
  testAgent: async (agentId, testData) => {
    const response = await api.post(`/agents/${agentId}/test`, testData);
    return response.data;
  },

  // Run agent once
  runAgent: async (agentId, inputData) => {
    const response = await api.post(`/agents/${agentId}/run`, inputData);
    return response.data;
  },

  // Get agent execution history
  getAgentHistory: async (agentId, params = {}) => {
    const response = await api.get(`/agents/${agentId}/history`, { params });
    return response.data;
  },

  // Get agent execution by ID
  getExecution: async (agentId, executionId) => {
    const response = await api.get(`/agents/${agentId}/executions/${executionId}`);
    return response.data;
  },

  // Cancel agent execution
  cancelExecution: async (agentId, executionId) => {
    const response = await api.post(`/agents/${agentId}/executions/${executionId}/cancel`);
    return response.data;
  },

  // Get agent stats
  getAgentStats: async (agentId) => {
    const response = await api.get(`/agents/${agentId}/stats`);
    return response.data;
  },

  // Publish agent to marketplace
  publishToMarketplace: async (agentId, publishData) => {
    const response = await api.post(`/agents/${agentId}/publish`, publishData);
    return response.data;
  },

  // Unpublish agent from marketplace
  unpublishFromMarketplace: async (agentId) => {
    const response = await api.post(`/agents/${agentId}/unpublish`);
    return response.data;
  },

  // Update agent status (active, inactive, archived)
  updateAgentStatus: async (agentId, status) => {
    const response = await api.patch(`/agents/${agentId}/status`, { status });
    return response.data;
  },

  // Get agent rubrics
  getAgentRubrics: async (agentId) => {
    const response = await api.get(`/agents/${agentId}/rubrics`);
    return response.data;
  },

  // Update agent rubrics
  updateAgentRubrics: async (agentId, rubrics) => {
    const response = await api.put(`/agents/${agentId}/rubrics`, rubrics);
    return response.data;
  },

  // Get agent schema
  getAgentSchema: async (agentId) => {
    const response = await api.get(`/agents/${agentId}/schema`);
    return response.data;
  },

  // Update agent schema
  updateAgentSchema: async (agentId, schema) => {
    const response = await api.put(`/agents/${agentId}/schema`, schema);
    return response.data;
  },

  // Get agent HITL settings
  getAgentHITL: async (agentId) => {
    const response = await api.get(`/agents/${agentId}/hitl`);
    return response.data;
  },

  // Update agent HITL settings
  updateAgentHITL: async (agentId, hitlSettings) => {
    const response = await api.put(`/agents/${agentId}/hitl`, hitlSettings);
    return response.data;
  },
};

export default agentService;
