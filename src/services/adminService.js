import api from './api';

const adminService = {
    // Get all system tenants (Godfather only)
    getAllTenants: async (params = {}) => {
        // const queryString = new URLSearchParams(params).toString();
        // const endpoint = queryString ? `/admin/tenants?${queryString}` : '/admin/tenants';
        // const response = await api.get(endpoint);
        // return response.data;
        return Promise.resolve({
            data: [
                { id: 1, name: 'Tenant A', email: 'admin@tenant-a.com', status: 'active' },
                { id: 2, name: 'Tenant B', email: 'admin@tenant-b.com', status: 'active' }
            ]
        });
    },

    // Get system stats
    getSystemStats: async () => {
        // const response = await api.get('/admin/stats');
        // return response.data;
        return Promise.resolve({
            data: {
                total_tenants: 2,
                active_users: 150,
                revenue_mtd: 5000
            }
        });
    },

    // Suspend tenant
    suspendTenant: async (tenantId) => {
        return Promise.resolve({ success: true, message: 'Tenant suspended' });
    },

    // Activate tenant
    activateTenant: async (tenantId) => {
        return Promise.resolve({ success: true, message: 'Tenant activated' });
    },

    // Update tenant (e.g. subscription)
    updateTenant: async (tenantId, data) => {
        return Promise.resolve({ data: { id: tenantId, ...data } });
    }
};

export default adminService;
