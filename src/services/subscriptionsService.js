import api from './api';

/**
 * Subscriptions Service
 * Handles subscription and billing management
 */
const subscriptionsService = {
  /**
   * Get all subscriptions
   */
  getSubscriptions: async (params = {}) => {
    // const response = await api.get('/subscriptions', { params });
    // return response.data;
    return Promise.resolve({ data: [] });
  },

  /**
   * Get current subscription
   */
  getCurrentSubscription: async () => {
    // const response = await api.get('/subscriptions/current');
    // return response.data;
    return Promise.resolve({
      data: {
        id: 'sub_mock',
        status: 'active',
        plan: { name: 'Pro Plan' }
      }
    });
  },

  /**
   * Subscribe to plan
   */
  subscribe: async (subscriptionData) => {
    return Promise.resolve({ success: true });
  },

  /**
   * Cancel subscription
   */
  cancelSubscription: async (cancelData = {}) => {
    return Promise.resolve({ success: true });
  },

  /**
   * Get usage statistics
   */
  getUsage: async (params = {}) => {
    return Promise.resolve({ data: { used: 50, limit: 100 } });
  },

  /**
   * Get usage by date
   */
  getUsageByDate: async (date) => {
    return Promise.resolve({ data: { date, count: 10 } });
  },
};

export default subscriptionsService;
