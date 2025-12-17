import apiClient from './apiClient';

export const tenantService = {
  /**
   * Find tenant by subdomain (public endpoint, no auth required)
   */
  findBySubdomain: async (subdomain) => {
    try {
      console.log('🌐 API Call: Finding tenant by subdomain:', subdomain);
      const response = await apiClient.get(`/tenants/find-by-subdomain/${subdomain}`);
      console.log('✅ API Response:', response.data);
      return response.data;
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
  }
};