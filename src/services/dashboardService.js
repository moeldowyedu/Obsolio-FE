/**
 * Dashboard Service
 * API service for dashboard statistics
 *
 * DEPRECATED: /dashboard/stats endpoint does not exist
 * Use specific statistics endpoints from adminService instead:
 * - adminService.getTenantStatistics()
 * - adminService.getOrganizationStatistics()
 * - adminService.getSubscriptionStatistics()
 * - adminService.getAgentRunsStatistics()
 */

import api from './api';

const dashboardService = {
  /**
   * Get dashboard statistics
   * @deprecated This endpoint does not exist - use specific statistics endpoints instead
   * @returns {Promise} Dashboard stats
   */
  getStats: async () => {
    console.warn('dashboardService.getStats() is deprecated - /dashboard/stats endpoint does not exist');
    throw new Error('This endpoint does not exist. Use specific statistics endpoints from adminService instead.');
  },
};

export default dashboardService;
