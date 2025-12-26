import api from './api';

/**
 * Admin Service
 *
 * Handles all admin-level operations for managing tenants, subscriptions, and system-wide data.
 * All endpoints require the user to have is_system_admin: true
 */

const adminService = {
    // ==================== TENANT MANAGEMENT ====================

    /**
     * Get all system tenants (paginated)
     * @param {Object} params - Query parameters (page, per_page, type, status, plan, search)
     */
    getAllTenants: async (params = {}) => {
        const response = await api.get('/admin/tenants', { params });
        return response.data;
    },

    /**
     * Get tenant details by ID
     * @param {string} tenantId - Tenant ID
     */
    getTenantDetails: async (tenantId) => {
        const response = await api.get(`/admin/tenants/${tenantId}`);
        return response.data;
    },

    /**
     * Update tenant details
     * @param {string} tenantId - Tenant ID
     * @param {Object} data - Updated tenant data
     */
    updateTenant: async (tenantId, data) => {
        const response = await api.put(`/admin/tenants/${tenantId}`, data);
        return response.data;
    },

    /**
     * Change tenant subscription
     * @param {string} tenantId - Tenant ID
     * @param {Object} data - { plan_id, billing_cycle, starts_immediately, reason }
     */
    changeTenantSubscription: async (tenantId, data) => {
        const response = await api.put(`/admin/tenants/${tenantId}/subscription`, data);
        return response.data;
    },

    /**
     * Extend tenant trial period
     * @param {string} tenantId - Tenant ID
     * @param {Object} data - { days, reason }
     */
    extendTrial: async (tenantId, data) => {
        const response = await api.post(`/admin/tenants/${tenantId}/extend-trial`, data);
        return response.data;
    },

    /**
     * Suspend tenant account
     * @param {string} tenantId - Tenant ID
     * @param {Object} data - { reason } (optional)
     */
    suspendTenant: async (tenantId, data = {}) => {
        const response = await api.post(`/admin/tenants/${tenantId}/suspend`, data);
        return response.data;
    },

    /**
     * Activate suspended tenant
     * @param {string} tenantId - Tenant ID
     */
    activateTenant: async (tenantId) => {
        const response = await api.post(`/admin/tenants/${tenantId}/activate`);
        return response.data;
    },

    /**
     * Get tenant statistics
     */
    getTenantStatistics: async () => {
        const response = await api.get('/admin/tenants/statistics');
        return response.data;
    },

    // ==================== SUBSCRIPTION PLANS MANAGEMENT ====================

    /**
     * Get all subscription plans (including unpublished)
     * @param {Object} params - Query parameters (type, status, is_published)
     */
    getAllPlans: async (params = {}) => {
        const response = await api.get('/admin/subscription-plans', { params });
        return response.data;
    },

    /**
     * Create new subscription plan
     * @param {Object} data - Plan data (name, type, tier, description, prices, limits, features, etc.)
     */
    createPlan: async (data) => {
        const response = await api.post('/admin/subscription-plans', data);
        return response.data;
    },

    /**
     * Update subscription plan
     * @param {string} planId - Plan ID
     * @param {Object} data - Updated plan data
     */
    updatePlan: async (planId, data) => {
        const response = await api.put(`/admin/subscription-plans/${planId}`, data);
        return response.data;
    },

    /**
     * Delete subscription plan
     * @param {string} planId - Plan ID
     */
    deletePlan: async (planId) => {
        const response = await api.delete(`/admin/subscription-plans/${planId}`);
        return response.data;
    },

    // ==================== PAYMENT TRANSACTIONS ====================

    /**
     * Get all payment transactions
     * @param {Object} params - Query parameters (status, date_range, tenant_id)
     */
    getPaymentTransactions: async (params = {}) => {
        const response = await api.get('/admin/payment-transactions', { params });
        return response.data;
    },

    /**
     * Issue refund for payment transaction
     * @param {string} transactionId - Transaction ID
     * @param {Object} data - { reason }
     */
    issueRefund: async (transactionId, data) => {
        const response = await api.post(`/admin/payment-transactions/${transactionId}/refund`, data);
        return response.data;
    },

    // ==================== SYSTEM STATISTICS ====================

    /**
     * Get system-wide statistics
     */
    getSystemStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },
};

export default adminService;
