import api from './api';

const schedulerService = {
  // Get all scheduled jobs
  getScheduledJobs: async (params = {}) => {
    const response = await api.get('/scheduler/jobs', { params });
    return response.data;
  },

  // Get scheduled job by ID
  getScheduledJob: async (jobId) => {
    const response = await api.get(`/scheduler/jobs/${jobId}`);
    return response.data;
  },

  // Create scheduled job
  createScheduledJob: async (jobData) => {
    const response = await api.post('/scheduler/jobs', jobData);
    return response.data;
  },

  // Update scheduled job
  updateScheduledJob: async (jobId, jobData) => {
    const response = await api.put(`/scheduler/jobs/${jobId}`, jobData);
    return response.data;
  },

  // Delete scheduled job
  deleteScheduledJob: async (jobId) => {
    const response = await api.delete(`/scheduler/jobs/${jobId}`);
    return response.data;
  },

  // Enable/disable scheduled job
  toggleScheduledJob: async (jobId, enabled) => {
    const response = await api.patch(`/scheduler/jobs/${jobId}/toggle`, {
      enabled,
    });
    return response.data;
  },

  // Trigger job manually
  triggerJob: async (jobId) => {
    const response = await api.post(`/scheduler/jobs/${jobId}/trigger`);
    return response.data;
  },

  // Get job execution history
  getJobHistory: async (jobId, params = {}) => {
    const response = await api.get(`/scheduler/jobs/${jobId}/history`, {
      params,
    });
    return response.data;
  },

  // Get next scheduled run
  getNextRun: async (jobId) => {
    const response = await api.get(`/scheduler/jobs/${jobId}/next-run`);
    return response.data;
  },

  // Validate cron expression
  validateCron: async (cronExpression) => {
    const response = await api.post('/scheduler/validate-cron', {
      cron: cronExpression,
    });
    return response.data;
  },

  // Get cron suggestions
  getCronSuggestions: async () => {
    const response = await api.get('/scheduler/cron-suggestions');
    return response.data;
  },
};

export default schedulerService;
