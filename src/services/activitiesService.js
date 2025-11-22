import api from './api';

/**
 * Activities Service
 * Handles user activity tracking and session management
 */
const activitiesService = {
  // ========== User Activities ==========

  /**
   * Get all activities
   * GET /api/v1/activities
   */
  getActivities: async (params = {}) => {
    const response = await api.get('/activities', { params });
    return response.data;
  },

  /**
   * Get activity by ID
   * GET /api/v1/activities/{id}
   */
  getActivityById: async (activityId) => {
    const response = await api.get(`/activities/${activityId}`);
    return response.data;
  },

  /**
   * Get activities by user
   * GET /api/v1/activities/user/{userId}
   */
  getActivitiesByUser: async (userId, params = {}) => {
    const response = await api.get(`/activities/user/${userId}`, { params });
    return response.data;
  },

  /**
   * Export activities
   * GET /api/v1/activities/export
   */
  exportActivities: async (params = {}) => {
    const response = await api.get('/activities/export', {
      params,
      responseType: 'blob' // For file download
    });
    return response.data;
  },

  // ========== Session Management ==========

  /**
   * Get all sessions
   * GET /api/v1/sessions
   */
  getSessions: async (params = {}) => {
    const response = await api.get('/sessions', { params });
    return response.data;
  },

  /**
   * Get active sessions
   * GET /api/v1/sessions/active
   */
  getActiveSessions: async () => {
    const response = await api.get('/sessions/active');
    return response.data;
  },

  /**
   * Terminate session
   * POST /api/v1/sessions/{id}/terminate
   */
  terminateSession: async (sessionId) => {
    const response = await api.post(`/sessions/${sessionId}/terminate`);
    return response.data;
  },
};

export default activitiesService;
