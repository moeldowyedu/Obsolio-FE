import api from './api';

/**
 * API Keys Service
 * Handles API key management endpoints
 */
const apiKeysService = {
  /**
   * Get all API keys
   * GET /api/v1/api-keys
   */
  getApiKeys: async (params = {}) => {
    const response = await api.get('/api-keys', { params });
    return response.data;
  },

  /**
   * Get API key by ID
   * GET /api/v1/api-keys/{api_key}
   */
  getApiKeyById: async (apiKeyId) => {
    const response = await api.get(`/api-keys/${apiKeyId}`);
    return response.data;
  },

  /**
   * Create new API key
   * POST /api/v1/api-keys
   */
  createApiKey: async (apiKeyData) => {
    const response = await api.post('/api-keys', apiKeyData);
    return response.data;
  },

  /**
   * Update API key
   * PUT/PATCH /api/v1/api-keys/{api_key}
   */
  updateApiKey: async (apiKeyId, apiKeyData) => {
    const response = await api.put(`/api-keys/${apiKeyId}`, apiKeyData);
    return response.data;
  },

  /**
   * Delete API key
   * DELETE /api/v1/api-keys/{api_key}
   */
  deleteApiKey: async (apiKeyId) => {
    const response = await api.delete(`/api-keys/${apiKeyId}`);
    return response.data;
  },

  /**
   * Regenerate API key
   * POST /api/v1/api-keys/{id}/regenerate
   */
  regenerateApiKey: async (apiKeyId) => {
    const response = await api.post(`/api-keys/${apiKeyId}/regenerate`);
    return response.data;
  },

  /**
   * Toggle API key status (enable/disable)
   * POST /api/v1/api-keys/{id}/toggle
   */
  toggleApiKey: async (apiKeyId) => {
    const response = await api.post(`/api-keys/${apiKeyId}/toggle`);
    return response.data;
  },
};

export default apiKeysService;
