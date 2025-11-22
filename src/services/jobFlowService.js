import api from './api';

/**
 * Job Flow Service
 * Handles job flow scheduling and execution API endpoints
 */
const jobFlowService = {
  /**
   * Get all job flows
   * GET /api/v1/job-flows
   */
  getJobFlows: async (params = {}) => {
    const response = await api.get('/job-flows', { params });
    return response.data;
  },

  /**
   * Get job flow by ID
   * GET /api/v1/job-flows/{job_flow}
   */
  getJobFlowById: async (jobFlowId) => {
    const response = await api.get(`/job-flows/${jobFlowId}`);
    return response.data;
  },

  /**
   * Create new job flow
   * POST /api/v1/job-flows
   */
  createJobFlow: async (jobFlowData) => {
    const response = await api.post('/job-flows', jobFlowData);
    return response.data;
  },

  /**
   * Update job flow
   * PUT/PATCH /api/v1/job-flows/{job_flow}
   */
  updateJobFlow: async (jobFlowId, jobFlowData) => {
    const response = await api.put(`/job-flows/${jobFlowId}`, jobFlowData);
    return response.data;
  },

  /**
   * Delete job flow
   * DELETE /api/v1/job-flows/{job_flow}
   */
  deleteJobFlow: async (jobFlowId) => {
    const response = await api.delete(`/job-flows/${jobFlowId}`);
    return response.data;
  },

  /**
   * Trigger job flow execution
   * POST /api/v1/job-flows/{id}/trigger
   */
  triggerJobFlow: async (jobFlowId, triggerData = {}) => {
    const response = await api.post(`/job-flows/${jobFlowId}/trigger`, triggerData);
    return response.data;
  },

  /**
   * Update job flow status
   * PUT /api/v1/job-flows/{id}/status
   */
  updateJobFlowStatus: async (jobFlowId, status) => {
    const response = await api.put(`/job-flows/${jobFlowId}/status`, { status });
    return response.data;
  },

  /**
   * Get job flow statistics
   * GET /api/v1/job-flows/{id}/stats
   */
  getJobFlowStats: async (jobFlowId) => {
    const response = await api.get(`/job-flows/${jobFlowId}/stats`);
    return response.data;
  },
};

export default jobFlowService;
