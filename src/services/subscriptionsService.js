import api from './api';

/**
 * Subscriptions Service
 * Handles subscription and billing management
 */
const subscriptionsService = {
  /**
   * Get all subscriptions
   * GET /api/v1/subscriptions
   */
  getSubscriptions: async (params = {}) => {
    const response = await api.get('/subscriptions', { params });
    return response.data;
  },

  /**
   * Get current subscription
   * GET /api/v1/subscriptions/current
   */
  getCurrentSubscription: async () => {
    const response = await api.get('/subscriptions/current');
    return response.data;
  },

  /**
   * Subscribe to plan
   * POST /api/v1/subscriptions/subscribe
   */
  subscribe: async (subscriptionData) => {
    const response = await api.post('/subscriptions/subscribe', subscriptionData);
    return response.data;
  },

  /**
   * Cancel subscription
   * POST /api/v1/subscriptions/cancel
   */
  cancelSubscription: async (cancelData = {}) => {
    const response = await api.post('/subscriptions/cancel', cancelData);
    return response.data;
  },

  /**
   * Get usage statistics
   * GET /api/v1/subscriptions/usage
   */
  getUsage: async (params = {}) => {
    const response = await api.get('/subscriptions/usage', { params });
    return response.data;
  },

  /**
   * Get usage by date
   * GET /api/v1/subscriptions/usage/{date}
   */
  getUsageByDate: async (date) => {
    const response = await api.get(`/subscriptions/usage/${date}`);
    return response.data;
  },
};

export default subscriptionsService;
