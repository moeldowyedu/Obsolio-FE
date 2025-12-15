import api from './api';

// Mock Data
const MOCK_AGENTS = [
  {
    id: '1',
    name: 'Customer Support Pro',
    description: 'AI-powered customer support agent that handles inquiries 24/7.',
    status: 'active',
    pricing: 49,
    deployments: 120,
    rating: 4.8,
    category: 'Support',
    updated_at: '2023-12-01T10:00:00Z',
    icon: 'CustomerService',
  },
  {
    id: '2',
    name: 'Data Analyst Bot',
    description: 'Advanced data analysis and visualization assistant.',
    status: 'draft',
    pricing: 99,
    deployments: 45,
    rating: 4.5,
    category: 'Analytics',
    updated_at: '2023-12-05T14:30:00Z',
    icon: 'BarChart',
  }
];

const agentService = {
  // Get all agents
  getAgents: async (params = {}) => {
    // const response = await api.get('/agents', { params });
    // return response.data;
    console.log('Using mock getAgents');
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: MOCK_AGENTS }), 500);
    });
  },

  // Get agent by ID
  getAgent: async (agentId) => {
    // const response = await api.get(`/agents/${agentId}`);
    // return response.data;
    console.log(`Using mock getAgent for ${agentId}`);
    const agent = MOCK_AGENTS.find(a => a.id === agentId) || MOCK_AGENTS[0];
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: agent }), 500);
    });
  },

  // Create new agent
  createAgent: async (agentData) => {
    // const response = await api.post('/agents', agentData);
    // return response.data;
    console.log('Using mock createAgent', agentData);
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        data: { ...agentData, id: String(Date.now()), status: 'draft', updated_at: new Date().toISOString() }
      }), 800);
    });
  },

  // Update agent
  updateAgent: async (agentId, agentData) => {
    // const response = await api.put(`/agents/${agentId}`, agentData);
    // return response.data;
    console.log('Using mock updateAgent', agentId, agentData);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: { ...agentData, id: agentId } }), 600);
    });
  },

  // Delete agent
  deleteAgent: async (agentId) => {
    // const response = await api.delete(`/agents/${agentId}`);
    // return response.data;
    console.log('Using mock deleteAgent', agentId);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 500);
    });
  },

  // Clone agent
  cloneAgent: async (agentId, cloneData = {}) => {
    console.log('Using mock cloneAgent', agentId);
    return new Promise((resolve) => resolve({ data: { ...MOCK_AGENTS[0], id: 'new-clone', name: 'Cloned Agent' } }));
  },

  // Duplicate agent (alias for clone)
  duplicateAgent: async (agentId) => {
    return agentService.cloneAgent(agentId);
  },

  // Get agent configuration
  getAgentConfig: async (agentId) => {
    return Promise.resolve({ data: { model: 'gpt-4', temperature: 0.7 } });
  },

  // Update agent configuration
  updateAgentConfig: async (agentId, config) => {
    return Promise.resolve({ data: config });
  },

  // Test agent
  testAgent: async (agentId, testData) => {
    return Promise.resolve({ data: { output: 'Mock test response' } });
  },

  // Execute agent
  executeAgent: async (agentId, inputData) => {
    return Promise.resolve({ data: { output: 'Mock execution result' } });
  },

  // Run agent once (alias for execute)
  runAgent: async (agentId, inputData) => {
    return agentService.executeAgent(agentId, inputData);
  },

  // Get agent executions
  getAgentExecutions: async (agentId, params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Get agent execution history (alias)
  getAgentHistory: async (agentId, params = {}) => {
    return agentService.getAgentExecutions(agentId, params);
  },

  // Get agent execution by ID
  getExecution: async (agentId, executionId) => {
    return Promise.resolve({ data: { id: executionId, status: 'completed' } });
  },

  // Cancel agent execution
  cancelExecution: async (agentId, executionId) => {
    return Promise.resolve({ success: true });
  },

  // Get agent stats
  getAgentStats: async (agentId) => {
    return Promise.resolve({ data: { runs: 150, uptime: '99.9%' } });
  },

  // Publish agent to marketplace
  publishToMarketplace: async (agentId, publishData) => {
    return Promise.resolve({ success: true });
  },

  // Unpublish agent from marketplace
  unpublishFromMarketplace: async (agentId) => {
    return Promise.resolve({ success: true });
  },

  // Update agent status (active, inactive, archived)
  updateAgentStatus: async (agentId, status) => {
    return Promise.resolve({ data: { id: agentId, status } });
  },

  // Get agent rubrics
  getAgentRubrics: async (agentId) => {
    return Promise.resolve({ data: [] });
  },

  // Update agent rubrics
  updateAgentRubrics: async (agentId, rubrics) => {
    return Promise.resolve({ data: rubrics });
  },

  // Get agent schema
  getAgentSchema: async (agentId) => {
    return Promise.resolve({ data: {} });
  },

  // Update agent schema
  updateAgentSchema: async (agentId, schema) => {
    return Promise.resolve({ data: schema });
  },

  // Get agent HITL settings
  getAgentHITL: async (agentId) => {
    return Promise.resolve({ data: { enabled: false } });
  },

  // Update agent HITL settings
  updateAgentHITL: async (agentId, hitlSettings) => {
    return Promise.resolve({ data: hitlSettings });
  },

  // Get agents analytics
  getAgentsAnalytics: async (params = {}) => {
    return Promise.resolve({ data: { total_agents: 2, total_runs: 165 } });
  },
};

export default agentService;
