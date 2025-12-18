import apiClient from './apiClient';

export const tenantService = {
  /**
   * Find tenant by subdomain (public endpoint, no auth required)
   */
  findBySubdomain: async (subdomain) => {
    try {
      console.log('🌐 API Call: Finding tenant by subdomain:', subdomain);
      const response = await apiClient.get(`/tenants/find-by-subdomain/${subdomain}`);
      // Unwrapping logic: Backend returns { success: true, data: { ... } }
      const payload = response.data?.data || response.data;
      console.log('✅ API Response Payload:', payload);
      return payload;
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  },

  /**
   * Resend verification email
   */
  resendVerification: async (subdomain) => {
    try {
      const response = await apiClient.post(`/tenants/resend-verification/${subdomain}`);
      return response.data;
    } catch (error) {
      console.error('Failed to resend verification:', error);
      throw error;
    }
  },

  /**
   * Get all tenants for current user
   */
  getTenants: async () => {
    const response = await apiClient.get('/tenants');
    return response.data?.data || response.data;
  },

  /**
   * Get specific tenant details
   */
  getTenant: async (id) => {
    const response = await apiClient.get(`/tenants/${id}`);
    return response.data?.data || response.data;
  },

  /**
   * Create new tenant
   */
  createTenant: async (data) => {
    const response = await apiClient.post('/tenants', data);
    return response.data?.data || response.data;
  },

  /**
   * Update tenant details
   */
  updateTenant: async (id, data) => {
    // If data is FormData, let axios handle headers, otherwise JSON
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const response = await apiClient.post(`/tenants/${id}`, data, config); // Using POST with _method=PUT often for files
    return response.data?.data || response.data;
  },

  /**
   * Switch current tenant context
   */
  switchTenant: async (id) => {
    const response = await apiClient.post(`/tenants/${id}/switch`);
    return response.data?.data || response.data;
  },

  /**
   * Get tenant settings
   */
  getTenantSettings: async (id) => {
    const response = await apiClient.get(`/tenants/${id}/settings`);
    return response.data?.data || response.data;
  },

  /**
   * Update tenant settings
   */
  updateTenantSettings: async (id, settings) => {
    const response = await apiClient.put(`/tenants/${id}/settings`, settings);
    return response.data?.data || response.data;
  },

  /**
   * Get tenant users
   */
  getTenantUsers: async (id) => {
    const response = await apiClient.get(`/tenants/${id}/users`);
    return response.data?.data || response.data;
  },

  /**
   * Invite user to tenant
   */
  inviteUser: async (id, email, role) => {
    const response = await apiClient.post(`/tenants/${id}/users/invite`, { email, role });
    return response.data; // Usually just success message?
  },

  /**
   * Remove user from tenant
   */
  removeUser: async (tenantId, userId) => {
    const response = await apiClient.delete(`/tenants/${tenantId}/users/${userId}`);
    return response.data;
  },

  /**
   * Update user role in tenant
   */
  updateUserRole: async (tenantId, userId, role) => {
    const response = await apiClient.put(`/tenants/${tenantId}/users/${userId}/role`, { role });
    return response.data?.data || response.data;
  }
};