/**
 * Admin Tenants Service
 * Complete API service for tenant management based on FRONTEND_TENANT_MANAGEMENT.md
 * Base Path: /api/v1/admin/tenants
 * Authentication: JWT Bearer Token + System Admin Role
 * Guard: console
 */

import api from './api';

const adminTenantsService = {
  /**
   * 1. List Tenants
   * Get paginated list of tenants with filtering and search
   * @param {Object} params - Query parameters
   * @returns {Promise} TenantListResponse
   */
  listTenants: async (params = {}) => {
    // Backend uses /tenants endpoint (returns all tenants for system admin)
    const response = await api.get('/tenants', { params });
    return response.data;
  },

  /**
   * 2. Get Tenant Statistics
   * Get dashboard statistics for all tenants
   * Note: Backend doesn't have /admin/tenants/statistics yet
   * Using organization and subscription statistics as fallback
   * @returns {Promise} TenantStatisticsResponse
   */
  getTenantStatistics: async () => {
    try {
      // Try to get combined statistics from multiple endpoints
      const [tenantsResponse, orgStatsResponse, subStatsResponse] = await Promise.allSettled([
        api.get('/tenants'),
        api.get('/admin/organizations/statistics'),
        api.get('/admin/subscriptions/statistics')
      ]);

      const tenants = tenantsResponse.status === 'fulfilled' ? tenantsResponse.value.data.data : [];
      const orgStats = orgStatsResponse.status === 'fulfilled' ? orgStatsResponse.value.data : {};
      const subStats = subStatsResponse.status === 'fulfilled' ? subStatsResponse.value.data : {};

      // Calculate statistics from tenant list
      const total_tenants = tenants.length || 0;
      const active_tenants = tenants.filter(t => t.status === 'active').length || 0;
      const suspended_tenants = tenants.filter(t => t.status === 'suspended').length || 0;
      const inactive_tenants = tenants.filter(t => t.status === 'inactive').length || 0;

      // Use subscription stats if available
      const trial_tenants = subStats.trial_subscriptions || 0;
      const paid_tenants = subStats.active_subscriptions || 0;

      // Calculate new tenants this month
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const new_tenants_this_month = tenants.filter(t =>
        new Date(t.created_at) >= thisMonth
      ).length || 0;

      return {
        success: true,
        data: {
          total_tenants,
          active_tenants,
          suspended_tenants,
          inactive_tenants,
          trial_tenants,
          paid_tenants,
          new_tenants_this_month,
          revenue_this_month: subStats.monthly_revenue || 0,
          churn_rate: subStats.churn_rate || 0,
          by_plan: subStats.by_plan || []
        }
      };
    } catch (error) {
      console.error('Error fetching tenant statistics:', error);
      // Return empty statistics instead of throwing
      return {
        success: false,
        data: {
          total_tenants: 0,
          active_tenants: 0,
          suspended_tenants: 0,
          inactive_tenants: 0,
          trial_tenants: 0,
          paid_tenants: 0,
          new_tenants_this_month: 0,
          revenue_this_month: 0,
          churn_rate: 0,
          by_plan: []
        }
      };
    }
  },

  /**
   * 3. Get Single Tenant
   * Get detailed information about a specific tenant
   * @param {string} tenantId - Tenant UUID
   * @returns {Promise} TenantDetailResponse
   */
  getTenant: async (tenantId) => {
    const response = await api.get(`/admin/tenants/${tenantId}`);
    return response.data;
  },

  /**
   * 4. Create Tenant
   * Create a new tenant
   * @param {Object} data - CreateTenantRequest
   * @returns {Promise} TenantDetailResponse
   */
  createTenant: async (data) => {
    const response = await api.post('/admin/tenants', data);
    return response.data;
  },

  /**
   * 5. Update Tenant
   * Update tenant information
   * @param {string} tenantId - Tenant UUID
   * @param {Object} data - UpdateTenantRequest
   * @returns {Promise} TenantDetailResponse
   */
  updateTenant: async (tenantId, data) => {
    const response = await api.put(`/admin/tenants/${tenantId}`, data);
    return response.data;
  },

  /**
   * 6. Update Tenant Status
   * Update tenant status (active/inactive/suspended)
   * Note: Backend doesn't have PATCH /status endpoint
   * Use deactivate/reactivate endpoints instead
   * @param {string} tenantId - Tenant UUID
   * @param {Object} data - UpdateTenantStatusRequest
   * @returns {Promise} TenantDetailResponse
   */
  updateTenantStatus: async (tenantId, data) => {
    const { status, reason } = data;

    if (status === 'active') {
      return adminTenantsService.reactivateTenant(tenantId);
    } else if (status === 'suspended' || status === 'inactive') {
      return adminTenantsService.deactivateTenant(tenantId, { reason });
    }

    throw new Error(`Unsupported status: ${status}`);
  },

  /**
   * 7. Deactivate Tenant
   * Deactivate a tenant (soft delete)
   * @param {string} tenantId - Tenant UUID
   * @param {Object} data - { reason?: string }
   * @returns {Promise} ApiResponse
   */
  deactivateTenant: async (tenantId, data = {}) => {
    const response = await api.post(`/admin/tenants/${tenantId}/deactivate`, data);
    return response.data;
  },

  /**
   * 8. Reactivate Tenant
   * Reactivate a deactivated tenant
   * @param {string} tenantId - Tenant UUID
   * @returns {Promise} TenantDetailResponse
   */
  reactivateTenant: async (tenantId) => {
    const response = await api.post(`/admin/tenants/${tenantId}/reactivate`);
    return response.data;
  },

  /**
   * 9. Change Subscription
   * Change tenant's subscription plan
   * @param {string} tenantId - Tenant UUID
   * @param {Object} data - ChangeSubscriptionRequest
   * @returns {Promise} ApiResponse
   */
  changeSubscription: async (tenantId, data) => {
    const response = await api.post(`/admin/tenants/${tenantId}/subscription`, data);
    return response.data;
  },

  /**
   * 10. Get Subscription History
   * Get tenant's subscription change history
   * @param {string} tenantId - Tenant UUID
   * @param {Object} params - Query parameters (page, per_page)
   * @returns {Promise} SubscriptionHistoryResponse
   */
  getSubscriptionHistory: async (tenantId, params = {}) => {
    const response = await api.get(`/admin/tenants/${tenantId}/subscription-history`, { params });
    return response.data;
  },

  /**
   * 11. Extend Trial
   * Extend tenant's trial period
   * @param {string} tenantId - Tenant UUID
   * @param {Object} data - ExtendTrialRequest
   * @returns {Promise} TenantDetailResponse
   */
  extendTrial: async (tenantId, data) => {
    const response = await api.post(`/admin/tenants/${tenantId}/extend-trial`, data);
    return response.data;
  },

  /**
   * 12. Delete Tenant
   * Delete a tenant (soft or hard delete)
   * @param {string} tenantId - Tenant UUID
   * @param {Object} data - DeleteTenantRequest
   * @returns {Promise} ApiResponse
   */
  deleteTenant: async (tenantId, data = {}) => {
    const response = await api.delete(`/admin/tenants/${tenantId}`, { data });
    return response.data;
  },

  // ===== Additional Helper Methods =====

  /**
   * Check if subdomain is available
   * @param {string} subdomain - Subdomain to check
   * @returns {Promise} { available: boolean }
   */
  checkSubdomainAvailability: async (subdomain) => {
    const response = await api.get(`/admin/tenants/check-subdomain/${subdomain}`);
    return response.data;
  },

  /**
   * Suspend Tenant (alias for updateTenantStatus with suspended status)
   * @param {string} tenantId - Tenant UUID
   * @param {Object} data - { reason?: string }
   * @returns {Promise} TenantDetailResponse
   */
  suspendTenant: async (tenantId, data = {}) => {
    return adminTenantsService.updateTenantStatus(tenantId, {
      status: 'suspended',
      reason: data.reason
    });
  },

  /**
   * Activate Tenant (alias for updateTenantStatus with active status)
   * @param {string} tenantId - Tenant UUID
   * @returns {Promise} TenantDetailResponse
   */
  activateTenant: async (tenantId) => {
    return adminTenantsService.updateTenantStatus(tenantId, {
      status: 'active'
    });
  },

  /**
   * Export Tenants (CSV/Excel)
   * @param {Object} params - Filter parameters
   * @param {string} format - 'csv' | 'excel'
   * @returns {Promise} Blob
   */
  exportTenants: async (params = {}, format = 'csv') => {
    const response = await api.get('/admin/tenants/export', {
      params: { ...params, format },
      responseType: 'blob'
    });
    return response.data;
  },

  /**
   * Bulk Update Tenants
   * @param {Array} tenantIds - Array of tenant UUIDs
   * @param {Object} data - Update data
   * @returns {Promise} ApiResponse
   */
  bulkUpdateTenants: async (tenantIds, data) => {
    const response = await api.post('/admin/tenants/bulk-update', {
      tenant_ids: tenantIds,
      ...data
    });
    return response.data;
  },

  /**
   * Bulk Change Status
   * @param {Array} tenantIds - Array of tenant UUIDs
   * @param {string} status - New status
   * @returns {Promise} ApiResponse
   */
  bulkChangeStatus: async (tenantIds, status) => {
    return adminTenantsService.bulkUpdateTenants(tenantIds, { status });
  }
};

export default adminTenantsService;
