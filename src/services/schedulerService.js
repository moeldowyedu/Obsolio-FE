import api from './api';

const schedulerService = {
  // Get all scheduled jobs
  getScheduledJobs: async (params = {}) => {
    // const response = await api.get('/scheduler/jobs', { params });
    // return response.data;
    return Promise.resolve({
      data: [
        { id: 'job_1', name: 'Database Cleanup', cron: '0 0 * * SUN', enabled: true }
      ]
    });
  },

  // Get scheduled job by ID
  getScheduledJob: async (jobId) => {
    return Promise.resolve({ data: { id: jobId, name: 'Mock Job', enabled: true } });
  },

  // Create scheduled job
  createScheduledJob: async (jobData) => {
    return Promise.resolve({ data: { id: 'job_' + Date.now(), ...jobData } });
  },

  // Update scheduled job
  updateScheduledJob: async (jobId, jobData) => {
    return Promise.resolve({ data: { id: jobId, ...jobData } });
  },

  // Delete scheduled job
  deleteScheduledJob: async (jobId) => {
    return Promise.resolve({ success: true });
  },

  // Enable/disable scheduled job
  toggleScheduledJob: async (jobId, enabled) => {
    return Promise.resolve({ data: { id: jobId, enabled } });
  },

  // Trigger job manually
  triggerJob: async (jobId) => {
    return Promise.resolve({ success: true, message: 'Job triggered' });
  },

  // Get job execution history
  getJobHistory: async (jobId, params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Get next scheduled run
  getNextRun: async (jobId) => {
    return Promise.resolve({ data: { nextRun: new Date().toISOString() } });
  },

  // Validate cron expression
  validateCron: async (cronExpression) => {
    return Promise.resolve({ data: { valid: true, description: 'Every day at midnight' } });
  },

  // Get cron suggestions
  getCronSuggestions: async () => {
    return Promise.resolve({ data: ['0 0 * * *', '0 * * * *'] });
  },
};

export default schedulerService;
