import api from './api';

const orchestrationService = {
  // Get all workflows
  getWorkflows: async (params = {}) => {
    const response = await api.get('/workflows', { params });
    return response.data;
  },

  // Get workflow by ID
  getWorkflow: async (workflowId) => {
    const response = await api.get(`/workflows/${workflowId}`);
    return response.data;
  },

  // Create workflow
  createWorkflow: async (workflowData) => {
    const response = await api.post('/workflows', workflowData);
    return response.data;
  },

  // Update workflow
  updateWorkflow: async (workflowId, workflowData) => {
    const response = await api.put(`/workflows/${workflowId}`, workflowData);
    return response.data;
  },

  // Delete workflow
  deleteWorkflow: async (workflowId) => {
    const response = await api.delete(`/workflows/${workflowId}`);
    return response.data;
  },

  // Execute workflow
  executeWorkflow: async (workflowId, inputData = {}) => {
    const response = await api.post(`/workflows/${workflowId}/execute`, inputData);
    return response.data;
  },

  // Get workflow execution history
  getWorkflowHistory: async (workflowId, params = {}) => {
    const response = await api.get(`/workflows/${workflowId}/history`, { params });
    return response.data;
  },

  // Get workflow execution details
  getWorkflowExecution: async (workflowId, executionId) => {
    const response = await api.get(`/workflows/${workflowId}/executions/${executionId}`);
    return response.data;
  },

  // Cancel workflow execution
  cancelWorkflowExecution: async (workflowId, executionId) => {
    const response = await api.post(`/workflows/${workflowId}/executions/${executionId}/cancel`);
    return response.data;
  },

  // Get workflow stats
  getWorkflowStats: async (workflowId) => {
    const response = await api.get(`/workflows/${workflowId}/stats`);
    return response.data;
  },

  // Validate workflow
  validateWorkflow: async (workflowData) => {
    const response = await api.post('/workflows/validate', workflowData);
    return response.data;
  },

  // Duplicate workflow
  duplicateWorkflow: async (workflowId) => {
    const response = await api.post(`/workflows/${workflowId}/duplicate`);
    return response.data;
  },

  // Export workflow
  exportWorkflow: async (workflowId) => {
    const response = await api.get(`/workflows/${workflowId}/export`);
    return response.data;
  },

  // Import workflow
  importWorkflow: async (workflowData) => {
    const response = await api.post('/workflows/import', workflowData);
    return response.data;
  },
};

export default orchestrationService;
