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
    const response = await api.get('/admin/tenants', { params });
    return response.data;
  },

  /**
   * 2. Get Tenant Statistics
   * Get dashboard statistics for all tenants
   * @returns {Promise} TenantStatisticsResponse
   */
  getTenantStatistics: async () => {
    const response = await api.get('/admin/tenants/statistics');
    return response.data;
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
   * @param {string} tenantId - Tenant UUID
   * @param {Object} data - UpdateTenantStatusRequest
   * @returns {Promise} TenantDetailResponse
   */
  updateTenantStatus: async (tenantId, data) => {
    const response = await api.patch(`/admin/tenants/${tenantId}/status`, data);
    return response.data;
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
