import api from './api';

/**
 * Subscriptions Service
 * Handles subscription and billing management with OBSOLIO Backend
 */
const subscriptionsService = {
  /**
   * Get all available subscription plans
   * @param {Object} params - Query parameters
   * @returns {Promise} Subscription plans list
   */
  getPlans: async (params = {}) => {
    try {
      const response = await api.get('/subscription-plans', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting subscription plans:', error);
      throw error;
    }
  },

  /**
   * Get specific subscription plan by ID
   * @param {string} planId - Plan UUID
   * @returns {Promise} Plan details
   */
  getPlanById: async (planId) => {
    try {
      const response = await api.get(`/subscription-plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting plan ${planId}:`, error);
      throw error;
    }
  },

  /**
   * Get plan recommendations based on tenant usage
   * @returns {Promise} Recommended plans
   */
  getRecommendations: async () => {
    try {
      const response = await api.get('/subscription-plans/recommendations');
      return response.data;
    } catch (error) {
      console.error('Error getting plan recommendations:', error);
      throw error;
    }
  },

  /**
   * Get current tenant subscription
   * @returns {Promise} Current subscription details
   */
  getCurrentSubscription: async () => {
    try {
      const response = await api.get('/subscriptions/current');
      return response.data;
    } catch (error) {
      console.error('Error getting current subscription:', error);
      throw error;
    }
  },

  /**
   * Get all subscriptions (history)
   * @param {Object} params - Query parameters
   * @returns {Promise} Subscriptions list
   */
  getSubscriptions: async (params = {}) => {
    try {
      const response = await api.get('/subscriptions/history', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting subscriptions:', error);
      throw error;
    }
  },

  /**
   * Subscribe to a plan
   * @param {Object} subscriptionData - Subscription details
   * @returns {Promise} Subscription result
   */
  subscribe: async (subscriptionData) => {
    try {
      const response = await api.post('/subscriptions', subscriptionData);
      return response.data;
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      throw error;
    }
  },

  /**
   * Change subscription plan
   * @param {Object} planData - New plan details (planId, billingCycle)
   * @returns {Promise} Updated subscription
   */
  changePlan: async (planData) => {
    try {
      const response = await api.put('/subscriptions/change-plan', planData);
      return response.data;
    } catch (error) {
      console.error('Error changing subscription plan:', error);
      throw error;
    }
  },

  /**
   * Cancel subscription
   * @returns {Promise} Cancellation confirmation
   */
  cancelSubscription: async () => {
    try {
      const response = await api.post('/subscriptions/cancel');
      return response.data;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  },

  /**
   * Resume subscription
   * @returns {Promise} Resumed subscription
   */
  resumeSubscription: async () => {
    try {
      const response = await api.post('/subscriptions/resume');
      return response.data;
    } catch (error) {
      console.error('Error resuming subscription:', error);
      throw error;
    }
  },

  /**
   * Get billing history (invoices)
   * @returns {Promise} Billing history list
   */
  getBillingHistory: async () => {
    try {
      const response = await api.get('/invoices'); // Common convention
      return response.data;
    } catch (error) {
      console.error('Error getting billing history:', error);
      return { data: [] };
    }
  },
  changePlan: async (planData) => {
    try {
      const response = await api.put('/subscriptions/change-plan', planData);
      return response.data;
    } catch (error) {
      console.error('Error changing plan:', error);
      throw error;
    }
  },

  /**
   * Cancel current subscription
   * @param {Object} cancelData - Cancellation reason/feedback
   * @returns {Promise} Cancellation confirmation
   */
  cancelSubscription: async (cancelData = {}) => {
    try {
      const response = await api.post('/subscriptions/cancel', cancelData);
      return response.data;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  },

  /**
   * Resume canceled subscription
   * @returns {Promise} Resumed subscription
   */
  resumeSubscription: async () => {
    try {
      const response = await api.post('/subscriptions/resume');
      return response.data;
    } catch (error) {
      console.error('Error resuming subscription:', error);
      throw error;
    }
  },

  /**
   * Get usage statistics for current period
   * @param {Object} params - Query parameters
   * @returns {Promise} Usage data
   */
  getUsage: async (params = {}) => {
    try {
      const response = await api.get('/usage', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting usage:', error);
      throw error;
    }
  },

  /**
   * Get usage by specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise} Daily usage
   */
  getUsageByDate: async (date) => {
    try {
      const response = await api.get('/usage/date', {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error(`Error getting usage for ${date}:`, error);
      throw error;
    }
  },

  /**
   * Get subscription history
   * @returns {Promise} Subscription history
   */
  getHistory: async () => {
    try {
      const response = await api.get('/subscriptions/history');
      return response.data;
    } catch (error) {
      console.error('Error getting subscription history:', error);
      throw error;
    }
  },
  /**
   * Initiate Paymob Payment
   * @param {Object} data - { plan_id, billing_cycle }
   * @returns {Promise} Payment data (iframe_url)
   */
  initiatePaymobPayment: async (data) => {
    try {
      const response = await api.post('/payments/subscription', data);
      return response.data;
    } catch (error) {
      console.error('Error initiating Paymob payment:', error);
      throw error;
    }
  },
};

export default subscriptionsService;
