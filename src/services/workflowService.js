import api from './api';

/**
 * Workflow Service
 * Handles workflow management and execution API endpoints
 */
const workflowService = {
  /**
   * Get all workflows
   * GET /api/v1/workflows
   */
  getWorkflows: async (params = {}) => {
    const response = await api.get('/workflows', { params });
    return response.data;
  },

  /**
   * Get workflow by ID
   * GET /api/v1/workflows/{workflow}
   */
  getWorkflowById: async (workflowId) => {
    const response = await api.get(`/workflows/${workflowId}`);
    return response.data;
  },

  /**
   * Create new workflow
   * POST /api/v1/workflows
   */
  createWorkflow: async (workflowData) => {
    const response = await api.post('/workflows', workflowData);
    return response.data;
  },

  /**
   * Update workflow
   * PUT/PATCH /api/v1/workflows/{workflow}
   */
  updateWorkflow: async (workflowId, workflowData) => {
    const response = await api.put(`/workflows/${workflowId}`, workflowData);
    return response.data;
  },

  /**
   * Delete workflow
   * DELETE /api/v1/workflows/{workflow}
   */
  deleteWorkflow: async (workflowId) => {
    const response = await api.delete(`/workflows/${workflowId}`);
    return response.data;
  },

  /**
   * Execute workflow
   * POST /api/v1/workflows/{id}/execute
   */
  executeWorkflow: async (workflowId, executionData = {}) => {
    const response = await api.post(`/workflows/${workflowId}/execute`, executionData);
    return response.data;
  },

  /**
   * Get workflow executions
   * GET /api/v1/workflows/{id}/executions
   */
  getWorkflowExecutions: async (workflowId, params = {}) => {
    const response = await api.get(`/workflows/${workflowId}/executions`, { params });
    return response.data;
  },

  /**
   * Get execution details
   * GET /api/v1/workflows/executions/{executionId}
   */
  getExecutionDetails: async (executionId) => {
    const response = await api.get(`/workflows/executions/${executionId}`);
    return response.data;
  },
};

export default workflowService;
