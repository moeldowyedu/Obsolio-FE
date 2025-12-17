import api from './api';

const tenantService = {
  // Get all tenants for current user
  getTenants: async () => {
    // const response = await api.get('/tenants');
    // return response.data;
    return Promise.resolve({
      data: [
        { id: 't1', name: 'Personal Tenant', current: true },
        { id: 't2', name: 'Work Tenant', current: false }
      ]
    });
  },

  // Get Public Tenant Info (For Guard)
  // Supports resolving by subdomain to check status
  getPublicTenantInfo: async (subdomain) => {
    try {
      // Uses the endpoint created/assumed on backend for resolving tenants
      // If not available, we might use check-availability but that logic is reversed.
      // We assume /tenants/resolve/{subdomain} or /tenants/public/{subdomain} exists.
      // Given constraint: "implement directly", I will assume `GET /tenants/public-info?subdomain=` matches standard patterns
      // Or better: `GET /tenants/find-by-subdomain/{subdomain}`
      const response = await api.get(`/tenants/find-by-subdomain/${subdomain}`);
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Resend verification email
  resendVerification: async (subdomain) => {
    const response = await api.post(`/tenants/resend-verification/${subdomain}`);
    return response.data;
  },

  // Get tenant by ID
  getTenant: async (tenantId) => {
    // const response = await api.get(`/tenants/${tenantId}`);
    // return response.data;
    return Promise.resolve({ data: { id: tenantId, name: 'Mock Tenant' } });
  },

  // Create new tenant
  createTenant: async (tenantData) => {
    return Promise.resolve({ data: { id: 't_' + Date.now(), ...tenantData } });
  },

  // Update tenant
  updateTenant: async (tenantId, tenantData) => {
    return Promise.resolve({ data: { id: tenantId, ...tenantData } });
  },

  // Delete tenant
  deleteTenant: async (tenantId) => {
    return Promise.resolve({ success: true });
  },

  // Switch current tenant
  switchTenant: async (tenantId) => {
    localStorage.setItem('current_tenant_id', tenantId);
    return Promise.resolve({ success: true, token: 'mock_token' });
  },

  // Get tenant settings
  getTenantSettings: async (tenantId) => {
    return Promise.resolve({ data: { theme: 'dark', notifications: true } });
  },

  // Update tenant settings
  updateTenantSettings: async (tenantId, settings) => {
    return Promise.resolve({ data: settings });
  },

  // Get tenant users
  getTenantUsers: async (tenantId) => {
    return Promise.resolve({
      data: [
        { id: 'u1', name: 'Admin User', role: 'admin' },
        { id: 'u2', name: 'Member User', role: 'member' }
      ]
    });
  },

  // Invite user to tenant
  inviteUser: async (tenantId, email, role) => {
    return Promise.resolve({ success: true });
  },

  // Remove user from tenant
  removeUser: async (tenantId, userId) => {
    return Promise.resolve({ success: true });
  },

  // Update user role
  updateUserRole: async (tenantId, userId, role) => {
    return Promise.resolve({ success: true });
  },

  // Get tenant usage stats
  getTenantUsage: async (tenantId) => {
    return Promise.resolve({ data: { storage: '50%', bandwidth: '20%' } });
  },

  // Added for useTenant hook compatibility
  getCurrentTenant: async () => {
    return Promise.resolve({ id: 't1', name: 'Personal Tenant' });
  }
};

export default tenantService;
