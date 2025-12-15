import api from './api';

/**
 * Activities Service
 * Handles user activity tracking and session management
 */
const activitiesService = {
  // ========== User Activities ==========

  /**
   * Get all activities
   */
  getActivities: async (params = {}) => {
    // const response = await api.get('/activities', { params });
    // return response.data;
    return Promise.resolve({
      data: [
        { id: '1', action: 'login', user: 'John Doe', timestamp: new Date().toISOString() },
        { id: '2', action: 'page_view', user: 'Jane Smith', timestamp: new Date().toISOString() }
      ]
    });
  },

  /**
   * Get activity by ID
   */
  getActivityById: async (activityId) => {
    return Promise.resolve({ data: { id: activityId, action: 'mock_action' } });
  },

  /**
   * Get activities by user
   */
  getActivitiesByUser: async (userId, params = {}) => {
    return Promise.resolve({ data: [] });
  },

  /**
   * Export activities
   */
  exportActivities: async (params = {}) => {
    return Promise.resolve(new Blob(['id,action,timestamp\n1,login,2023-01-01'], { type: 'text/csv' }));
  },

  // ========== Session Management ==========

  /**
   * Get all sessions
   */
  getSessions: async (params = {}) => {
    // const response = await api.get('/sessions', { params });
    // return response.data;
    return Promise.resolve({
      data: [
        { id: 'sess_1', ip: '192.168.1.1', device: 'Chrome / Windows', last_active: 'Just now' }
      ]
    });
  },

  /**
   * Get active sessions
   */
  getActiveSessions: async () => {
    return Promise.resolve({ data: [{ id: 'sess_current', current: true }] });
  },

  /**
   * Terminate session
   */
  terminateSession: async (sessionId) => {
    return Promise.resolve({ success: true });
  },
};

export default activitiesService;
