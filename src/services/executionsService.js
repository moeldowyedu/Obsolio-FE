import api from './api';

/**
 * Executions Service
 * Handles agent execution management and monitoring
 */
const executionsService = {
  /**
   * Get all executions
   * GET /api/v1/executions
   */
  getExecutions: async (params = {}) => {
    const response = await api.get('/executions', { params });
    return response.data;
  },

  /**
   * Get execution by ID
   * GET /api/v1/executions/{id}
   */
  getExecutionById: async (executionId) => {
    const response = await api.get(`/executions/${executionId}`);
    return response.data;
  },

  /**
   * Cancel execution
   * POST /api/v1/executions/{id}/cancel
   */
  cancelExecution: async (executionId) => {
    const response = await api.post(`/executions/${executionId}/cancel`);
    return response.data;
  },

  /**
   * Get execution logs
   * GET /api/v1/executions/{id}/logs
   */
  getExecutionLogs: async (executionId, params = {}) => {
    const response = await api.get(`/executions/${executionId}/logs`, { params });
    return response.data;
  },

  /**
   * Get analytics for executions
   * GET /api/v1/analytics/executions
   */
  getExecutionAnalytics: async (params = {}) => {
    const response = await api.get('/analytics/executions', { params });
    return response.data;
  },
};

export default executionsService;
