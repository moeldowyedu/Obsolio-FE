/**
 * Dashboard Service
 * API service for dashboard statistics
 */

import api from './api';

const dashboardService = {
  /**
   * Get dashboard statistics
   * @returns {Promise} Dashboard stats
   */
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
};

export default dashboardService;
