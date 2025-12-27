import api from './api';

/**
 * Admin Service
 *
 * Handles all admin-level operations for managing tenants, subscriptions, agents, and system-wide data.
 * Based on OpenAPI spec from https://api.obsolio.com/docs?api-docs.json
 * Most endpoints require the user to have is_system_admin: true
 */

const adminService = {
    // ==================== TENANT MANAGEMENT ====================

    /**
     * Get all tenants (admin view)
     * @param {Object} params - Query parameters (page, per_page, type, status, search)
     */
    getAllTenants: async (params = {}) => {
        // Use /tenants endpoint - admin will see all tenants
        const response = await api.get('/tenants', { params });
        return response.data;
    },

    /**
     * Get current tenant details
     */
    getTenantDetails: async () => {
        const response = await api.get('/tenant');
        return response.data;
    },

    /**
     * Update tenant details
     * @param {Object} data - Updated tenant data (name, short_name)
     */
    updateTenant: async (data) => {
        const response = await api.put('/tenant', data);
        return response.data;
    },

    /**
     * Create new tenant
     * @param {Object} data - { name, type, short_name, slug }
     */
    createTenant: async (data) => {
        const response = await api.post('/tenants', data);
        return response.data;
    },

    /**
     * Switch active tenant context
     * @param {string} tenantId - Tenant ID
     */
    switchTenant: async (tenantId) => {
        const response = await api.post(`/tenants/${tenantId}/switch`);
        return response.data;
    },

    // ==================== ORGANIZATION MANAGEMENT ====================

    /**
     * Get all organizations (paginated)
     * @param {Object} params - Query parameters (per_page)
     */
    getAllOrganizations: async (params = {}) => {
        const response = await api.get('/organizations', { params });
        return response.data;
    },

    /**
     * Get organization details
     * @param {string} organizationId - Organization UUID
     */
    getOrganization: async (organizationId) => {
        const response = await api.get(`/organizations/${organizationId}`);
        return response.data;
    },

    /**
     * Create new organization
     * @param {Object} data - Organization data (name, short_name, phone, industry, etc.)
     */
    createOrganization: async (data) => {
        const response = await api.post('/organizations', data);
        return response.data;
    },

    /**
     * Update organization
     * @param {string} organizationId - Organization UUID
     * @param {Object} data - Updated organization data
     */
    updateOrganization: async (organizationId, data) => {
        const response = await api.put(`/organizations/${organizationId}`, data);
        return response.data;
    },

    /**
     * Delete organization
     * @param {string} organizationId - Organization UUID
     */
    deleteOrganization: async (organizationId) => {
        const response = await api.delete(`/organizations/${organizationId}`);
        return response.data;
    },

    /**
     * Switch organization context
     * @param {string} organizationId - Organization UUID
     */
    switchOrganization: async (organizationId) => {
        const response = await api.post(`/organizations/${organizationId}/switch`);
        return response.data;
    },

    // ==================== AGENT MANAGEMENT ====================

    /**
     * Execute agent asynchronously
     * @param {string} agentId - Agent UUID
     * @param {Object} input - Input data for agent execution
     */
    executeAgent: async (agentId, input) => {
        const response = await api.post(`/agents/${agentId}/run`, { input });
        return response.data;
    },

    /**
     * Get agent execution status
     * @param {string} runId - Run UUID
     */
    getAgentRun: async (runId) => {
        const response = await api.get(`/agent-runs/${runId}`);
        return response.data;
    },

    /**
     * Get all agent runs (to be implemented in backend)
     * @param {Object} params - Query parameters (page, per_page, agent_id, status, date_from, date_to)
     */
    getAllAgentRuns: async (params = {}) => {
        // TODO: Implement in backend API
        const response = await api.get('/admin/agent-runs', { params });
        return response.data;
    },

    // Note: The OpenAPI spec doesn't include CRUD endpoints for agents themselves
    // These would need to be added to the backend API
    // Placeholder methods for future implementation:

    /**
     * Get all agents (to be implemented in backend)
     * @param {Object} params - Query parameters (page, per_page, status, category, runtime_type, search)
     */
    getAllAgents: async (params = {}) => {
        // TODO: Implement in backend API
        const response = await api.get('/admin/agents', { params });
        return response.data;
    },

    /**
     * Get agent details (to be implemented in backend)
     * @param {string} agentId - Agent UUID
     */
    getAgent: async (agentId) => {
        // TODO: Implement in backend API
        const response = await api.get(`/admin/agents/${agentId}`);
        return response.data;
    },

    /**
     * Create new agent (to be implemented in backend)
     * @param {Object} data - Agent data
     */
    createAgent: async (data) => {
        // TODO: Implement in backend API
        const response = await api.post('/admin/agents', data);
        return response.data;
    },

    /**
     * Update agent (to be implemented in backend)
     * @param {string} agentId - Agent UUID
     * @param {Object} data - Updated agent data
     */
    updateAgent: async (agentId, data) => {
        // TODO: Implement in backend API
        const response = await api.put(`/admin/agents/${agentId}`, data);
        return response.data;
    },

    /**
     * Delete agent (to be implemented in backend)
     * @param {string} agentId - Agent UUID
     */
    deleteAgent: async (agentId) => {
        // TODO: Implement in backend API
        const response = await api.delete(`/admin/agents/${agentId}`);
        return response.data;
    },

    /**
     * Get agent categories (to be implemented in backend)
     */
    getAgentCategories: async () => {
        // TODO: Implement in backend API
        const response = await api.get('/admin/agent-categories');
        return response.data;
    },

    /**
     * Create agent category (to be implemented in backend)
     * @param {Object} data - Category data (name, slug, description, icon, display_order)
     */
    createAgentCategory: async (data) => {
        // TODO: Implement in backend API
        const response = await api.post('/admin/agent-categories', data);
        return response.data;
    },

    /**
     * Update agent category (to be implemented in backend)
     * @param {string} categoryId - Category ID
     * @param {Object} data - Updated category data
     */
    updateAgentCategory: async (categoryId, data) => {
        // TODO: Implement in backend API
        const response = await api.put(`/admin/agent-categories/${categoryId}`, data);
        return response.data;
    },

    /**
     * Delete agent category (to be implemented in backend)
     * @param {string} categoryId - Category ID
     */
    deleteAgentCategory: async (categoryId) => {
        // TODO: Implement in backend API
        const response = await api.delete(`/admin/agent-categories/${categoryId}`);
        return response.data;
    },

    // ==================== AGENT ENDPOINTS MANAGEMENT ====================

    /**
     * Get all agent endpoints (to be implemented in backend)
     * @param {Object} params - Query parameters (page, per_page, search, status, method)
     */
    getAgentEndpoints: async (params = {}) => {
        // TODO: Implement in backend API
        const response = await api.get('/admin/agent-endpoints', { params });
        return response.data;
    },

    /**
     * Get agent endpoint details (to be implemented in backend)
     * @param {string} endpointId - Endpoint ID
     */
    getAgentEndpoint: async (endpointId) => {
        // TODO: Implement in backend API
        const response = await api.get(`/admin/agent-endpoints/${endpointId}`);
        return response.data;
    },

    /**
     * Create agent endpoint (to be implemented in backend)
     * @param {Object} data - Endpoint data (name, slug, path, method, description, etc.)
     */
    createAgentEndpoint: async (data) => {
        // TODO: Implement in backend API
        const response = await api.post('/admin/agent-endpoints', data);
        return response.data;
    },

    /**
     * Update agent endpoint (to be implemented in backend)
     * @param {string} endpointId - Endpoint ID
     * @param {Object} data - Updated endpoint data
     */
    updateAgentEndpoint: async (endpointId, data) => {
        // TODO: Implement in backend API
        const response = await api.put(`/admin/agent-endpoints/${endpointId}`, data);
        return response.data;
    },

    /**
     * Delete agent endpoint (to be implemented in backend)
     * @param {string} endpointId - Endpoint ID
     */
    deleteAgentEndpoint: async (endpointId) => {
        // TODO: Implement in backend API
        const response = await api.delete(`/admin/agent-endpoints/${endpointId}`);
        return response.data;
    },

    // ==================== ROLES AND PERMISSIONS ====================

    /**
     * Get all permissions (grouped by category)
     */
    getPermissions: async () => {
        const response = await api.get('/permissions');
        return response.data;
    },

    /**
     * Get all permissions (flat list)
     */
    getPermissionsList: async () => {
        const response = await api.get('/permissions/list');
        return response.data;
    },

    /**
     * Get all roles
     * @param {Object} params - Query parameters (type: system/custom)
     */
    getRoles: async (params = {}) => {
        const response = await api.get('/roles', { params });
        return response.data;
    },

    /**
     * Get role details
     * @param {string} roleId - Role ID
     */
    getRole: async (roleId) => {
        const response = await api.get(`/roles/${roleId}`);
        return response.data;
    },

    /**
     * Create custom role
     * @param {Object} data - Role data
     */
    createRole: async (data) => {
        const response = await api.post('/roles', data);
        return response.data;
    },

    /**
     * Update role
     * @param {string} roleId - Role ID
     * @param {Object} data - Updated role data
     */
    updateRole: async (roleId, data) => {
        const response = await api.put(`/roles/${roleId}`, data);
        return response.data;
    },

    /**
     * Delete role
     * @param {string} roleId - Role ID
     */
    deleteRole: async (roleId) => {
        const response = await api.delete(`/roles/${roleId}`);
        return response.data;
    },

    // ==================== ACTIVITIES AND SESSIONS ====================

    /**
     * Get activity logs (paginated)
     * @param {Object} params - Query parameters (per_page)
     */
    getActivities: async (params = {}) => {
        const response = await api.get('/activities', { params });
        return response.data;
    },

    /**
     * Get active sessions
     */
    getSessions: async () => {
        const response = await api.get('/sessions');
        return response.data;
    },

    /**
     * Terminate session
     * @param {string} sessionId - Session UUID
     */
    terminateSession: async (sessionId) => {
        const response = await api.post(`/sessions/${sessionId}/terminate`);
        return response.data;
    },

    // ==================== DASHBOARD STATISTICS ====================

    /**
     * Get dashboard statistics
     */
    getDashboardStats: async () => {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },

    // ==================== SUBSCRIPTION PLANS MANAGEMENT ====================
    // Note: These endpoints are not in the OpenAPI spec and need to be implemented in the backend

    /**
     * Get all subscription plans (to be implemented in backend)
     * @param {Object} params - Query parameters (type, status, is_published)
     */
    getAllPlans: async (params = {}) => {
        // TODO: Implement in backend API
        const response = await api.get('/admin/subscription-plans', { params });
        return response.data;
    },

    /**
     * Create new subscription plan (to be implemented in backend)
     * @param {Object} data - Plan data
     */
    createPlan: async (data) => {
        // TODO: Implement in backend API
        const response = await api.post('/admin/subscription-plans', data);
        return response.data;
    },

    /**
     * Update subscription plan (to be implemented in backend)
     * @param {string} planId - Plan ID
     * @param {Object} data - Updated plan data
     */
    updatePlan: async (planId, data) => {
        // TODO: Implement in backend API
        const response = await api.put(`/admin/subscription-plans/${planId}`, data);
        return response.data;
    },

    /**
     * Delete subscription plan (to be implemented in backend)
     * @param {string} planId - Plan ID
     */
    deletePlan: async (planId) => {
        // TODO: Implement in backend API
        const response = await api.delete(`/admin/subscription-plans/${planId}`);
        return response.data;
    },

    // ==================== PAYMENT TRANSACTIONS ====================
    // Note: These endpoints are not in the OpenAPI spec and need to be implemented in the backend

    /**
     * Get all payment transactions (to be implemented in backend)
     * @param {Object} params - Query parameters (status, date_range, tenant_id)
     */
    getPaymentTransactions: async (params = {}) => {
        // TODO: Implement in backend API
        const response = await api.get('/admin/payment-transactions', { params });
        return response.data;
    },

    /**
     * Issue refund for payment transaction (to be implemented in backend)
     * @param {string} transactionId - Transaction ID
     * @param {Object} data - { reason }
     */
    issueRefund: async (transactionId, data) => {
        // TODO: Implement in backend API
        const response = await api.post(`/admin/payment-transactions/${transactionId}/refund`, data);
        return response.data;
    },

    // ==================== USER MANAGEMENT ====================
    // Note: These endpoints are not in the OpenAPI spec and need to be implemented in the backend

    /**
     * Get all users (to be implemented in backend)
     * @param {Object} params - Query parameters (page, per_page, role, status, search)
     */
    getAllUsers: async (params = {}) => {
        // TODO: Implement in backend API
        const response = await api.get('/admin/users', { params });
        return response.data;
    },

    /**
     * Get user details (to be implemented in backend)
     * @param {string} userId - User ID
     */
    getUser: async (userId) => {
        // TODO: Implement in backend API
        const response = await api.get(`/admin/users/${userId}`);
        return response.data;
    },

    /**
     * Update user (to be implemented in backend)
     * @param {string} userId - User ID
     * @param {Object} data - Updated user data
     */
    updateUser: async (userId, data) => {
        // TODO: Implement in backend API
        const response = await api.put(`/admin/users/${userId}`, data);
        return response.data;
    },

    /**
     * Delete user (to be implemented in backend)
     * @param {string} userId - User ID
     */
    deleteUser: async (userId) => {
        // TODO: Implement in backend API
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    },

    /**
     * Suspend user account (to be implemented in backend)
     * @param {string} userId - User ID
     * @param {Object} data - { reason }
     */
    suspendUser: async (userId, data = {}) => {
        // TODO: Implement in backend API
        const response = await api.post(`/admin/users/${userId}/suspend`, data);
        return response.data;
    },

    /**
     * Activate user account (to be implemented in backend)
     * @param {string} userId - User ID
     */
    activateUser: async (userId) => {
        // TODO: Implement in backend API
        const response = await api.post(`/admin/users/${userId}/activate`);
        return response.data;
    },

    /**
     * Check subdomain availability
     * @param {string} subdomain - Subdomain to check
     */
    checkSubdomainAvailability: async (subdomain) => {
        const response = await api.get(`/tenants/check-availability/${subdomain}`);
        return response.data;
    },

    /**
     * Lookup tenant by user identifier
     * @param {string} identifier - Email or phone
     */
    lookupTenant: async (identifier) => {
        const response = await api.post('/auth/lookup-tenant', { identifier });
        return response.data;
    },

    // ==================== ANALYTICS ====================

    /**
     * Get analytics overview
     * High-level statistics for the admin dashboard
     */
    getAnalyticsOverview: async () => {
        const response = await api.get('/admin/analytics/overview');
        return response.data;
    },

    /**
     * Get revenue analytics
     * @param {Object} params - Query parameters (period: day | week | month | year)
     */
    getRevenueAnalytics: async (params = {}) => {
        const response = await api.get('/admin/analytics/revenue', { params });
        return response.data;
    },

    /**
     * Get agent analytics
     * Analytics by category and top performing agents
     */
    getAgentAnalytics: async () => {
        const response = await api.get('/admin/analytics/agents');
        return response.data;
    },

    // ==================== ACTIVITY & AUDIT LOGS ====================

    /**
     * Get activity logs with filters
     * @param {Object} params - Query parameters (user_id, action, page)
     */
    getActivityLogs: async (params = {}) => {
        const response = await api.get('/admin/activity-logs', { params });
        return response.data;
    },

    /**
     * Get impersonation logs
     * @param {Object} params - Query parameters (page)
     */
    getImpersonationLogs: async (params = {}) => {
        const response = await api.get('/admin/impersonation-logs', { params });
        return response.data;
    },

    // ==================== AGENT RUNS STATISTICS ====================

    /**
     * Get agent runs statistics
     * @param {Object} params - Query parameters (agent_id, date_from, date_to)
     */
    getAgentRunsStatistics: async (params = {}) => {
        const response = await api.get('/admin/agent-runs/statistics', { params });
        return response.data;
    },

    // ==================== BULK ACTIONS ====================

    /**
     * Bulk activate agents
     * @param {Array} agentIds - Array of agent UUIDs
     */
    bulkActivateAgents: async (agentIds) => {
        const response = await api.post('/admin/agents/bulk-activate', { agent_ids: agentIds });
        return response.data;
    },

    /**
     * Bulk deactivate agents
     * @param {Array} agentIds - Array of agent UUIDs
     */
    bulkDeactivateAgents: async (agentIds) => {
        const response = await api.post('/admin/agents/bulk-deactivate', { agent_ids: agentIds });
        return response.data;
    },
};

export default adminService;
