import api from './api';

/**
 * Connected Apps Service
 * Handles third-party app integration endpoints
 */
const connectedAppsService = {
  /**
   * Get all connected apps
   * GET /api/v1/connected-apps
   */
  getConnectedApps: async (params = {}) => {
    const response = await api.get('/connected-apps', { params });
    return response.data;
  },

  /**
   * Get connected app by ID
   * GET /api/v1/connected-apps/{connected_app}
   */
  getConnectedAppById: async (appId) => {
    const response = await api.get(`/connected-apps/${appId}`);
    return response.data;
  },

  /**
   * Create new connected app
   * POST /api/v1/connected-apps
   */
  createConnectedApp: async (appData) => {
    const response = await api.post('/connected-apps', appData);
    return response.data;
  },

  /**
   * Update connected app
   * PUT/PATCH /api/v1/connected-apps/{connected_app}
   */
  updateConnectedApp: async (appId, appData) => {
    const response = await api.put(`/connected-apps/${appId}`, appData);
    return response.data;
  },

  /**
   * Delete connected app
   * DELETE /api/v1/connected-apps/{connected_app}
   */
  deleteConnectedApp: async (appId) => {
    const response = await api.delete(`/connected-apps/${appId}`);
    return response.data;
  },

  /**
   * Test connection to app
   * POST /api/v1/connected-apps/{id}/test
   */
  testConnection: async (appId) => {
    const response = await api.post(`/connected-apps/${appId}/test`);
    return response.data;
  },

  /**
   * Sync data with app
   * POST /api/v1/connected-apps/{id}/sync
   */
  syncApp: async (appId, syncData = {}) => {
    const response = await api.post(`/connected-apps/${appId}/sync`, syncData);
    return response.data;
  },

  /**
   * Refresh app token
   * POST /api/v1/connected-apps/{id}/refresh-token
   */
  refreshToken: async (appId) => {
    const response = await api.post(`/connected-apps/${appId}/refresh-token`);
    return response.data;
  },

  /**
   * Revoke app access
   * POST /api/v1/connected-apps/{id}/revoke
   */
  revokeAccess: async (appId) => {
    const response = await api.post(`/connected-apps/${appId}/revoke`);
    return response.data;
  },

  /**
   * Get app logs
   * GET /api/v1/connected-apps/{id}/logs
   */
  getAppLogs: async (appId, params = {}) => {
    const response = await api.get(`/connected-apps/${appId}/logs`, { params });
    return response.data;
  },
};

export default connectedAppsService;
