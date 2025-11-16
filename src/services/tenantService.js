import api from './api';

const tenantService = {
  // Get all tenants for current user
  getTenants: async () => {
    const response = await api.get('/tenants');
    return response.data;
  },

  // Get tenant by ID
  getTenant: async (tenantId) => {
    const response = await api.get(`/tenants/${tenantId}`);
    return response.data;
  },

  // Create new tenant
  createTenant: async (tenantData) => {
    const response = await api.post('/tenants', tenantData);
    return response.data;
  },

  // Update tenant
  updateTenant: async (tenantId, tenantData) => {
    const response = await api.put(`/tenants/${tenantId}`, tenantData);
    return response.data;
  },

  // Delete tenant
  deleteTenant: async (tenantId) => {
    const response = await api.delete(`/tenants/${tenantId}`);
    return response.data;
  },

  // Switch current tenant
  switchTenant: async (tenantId) => {
    localStorage.setItem('current_tenant_id', tenantId);
    const response = await api.post(`/tenants/${tenantId}/switch`);
    return response.data;
  },

  // Get tenant settings
  getTenantSettings: async (tenantId) => {
    const response = await api.get(`/tenants/${tenantId}/settings`);
    return response.data;
  },

  // Update tenant settings
  updateTenantSettings: async (tenantId, settings) => {
    const response = await api.put(`/tenants/${tenantId}/settings`, settings);
    return response.data;
  },

  // Get tenant users
  getTenantUsers: async (tenantId) => {
    const response = await api.get(`/tenants/${tenantId}/users`);
    return response.data;
  },

  // Invite user to tenant
  inviteUser: async (tenantId, email, role) => {
    const response = await api.post(`/tenants/${tenantId}/users/invite`, {
      email,
      role,
    });
    return response.data;
  },

  // Remove user from tenant
  removeUser: async (tenantId, userId) => {
    const response = await api.delete(`/tenants/${tenantId}/users/${userId}`);
    return response.data;
  },

  // Update user role
  updateUserRole: async (tenantId, userId, role) => {
    const response = await api.put(`/tenants/${tenantId}/users/${userId}/role`, {
      role,
    });
    return response.data;
  },

  // Get tenant usage stats
  getTenantUsage: async (tenantId) => {
    const response = await api.get(`/tenants/${tenantId}/usage`);
    return response.data;
  },
};

export default tenantService;
