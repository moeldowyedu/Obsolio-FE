import api from './api';

/**
 * Tenant Subscription Service
 * Handles subscription and billing management with OBSOLIO Backend
 * Base Path: /api/v1/tenant/subscription
 */
const subscriptionsService = {
  /**
   * Get all available subscription plans
   * @param {Object} params - Query parameters
   * @returns {Promise} Subscription plans list
   */
  getPlans: async (params = {}) => {
    try {
      const response = await api.get('/pricing/plans', { params });
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
      const response = await api.get(`/pricing/plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting plan ${planId}:`, error);
      throw error;
    }
  },

  /**
   * Get current tenant subscription
   * Endpoint: GET /tenant/subscription/current
   * @returns {Promise} Current subscription details with plan, trial status
   */
  getCurrentSubscription: async () => {
    try {
      const response = await api.get('/tenant/subscription/current');
      return response.data;
    } catch (error) {
      console.error('Error getting current subscription:', error);
      throw error;
    }
  },

  /**
   * Get subscription history (paginated)
   * Endpoint: GET /tenant/subscription/history
   * @param {Object} params - Query parameters (page, per_page)
   * @returns {Promise} Paginated subscription history
   */
  getHistory: async (params = {}) => {
    try {
      const response = await api.get('/tenant/subscription/history', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting subscription history:', error);
      throw error;
    }
  },

  /**
   * Create a new subscription
   * Endpoint: POST /tenant/subscription/subscribe
   * @param {Object} subscriptionData - { plan_id, billing_cycle }
   * @returns {Promise} New subscription result
   */
  subscribe: async (subscriptionData) => {
    try {
      const response = await api.post('/tenant/subscription/subscribe', subscriptionData);
      return response.data;
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      throw error;
    }
  },

  /**
   * Change subscription plan
   * Endpoint: PUT /tenant/subscription/change-plan
   * @param {Object} planData - { plan_id, billing_cycle }
   * @returns {Promise} Updated subscription
   */
  changePlan: async (planData) => {
    try {
      const response = await api.put('/tenant/subscription/change-plan', planData);
      return response.data;
    } catch (error) {
      console.error('Error changing subscription plan:', error);
      throw error;
    }
  },

  /**
   * Cancel current subscription
   * Endpoint: POST /tenant/subscription/cancel
   * @param {Object} cancelData - Optional cancellation reason/feedback
   * @returns {Promise} Cancellation confirmation
   */
  cancelSubscription: async (cancelData = {}) => {
    try {
      const response = await api.post('/tenant/subscription/cancel', cancelData);
      return response.data;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  },

  /**
   * Resume cancelled subscription
   * Endpoint: POST /tenant/subscription/resume
   * @returns {Promise} Resumed subscription
   */
  resumeSubscription: async () => {
    try {
      const response = await api.post('/tenant/subscription/resume');
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
      const response = await api.get('/invoices');
      return response.data;
    } catch (error) {
      console.error('Error getting billing history:', error);
      return { data: [] };
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
