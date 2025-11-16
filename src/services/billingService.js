import api from './api';

const billingService = {
  // Get subscription plans
  getPlans: async () => {
    const response = await api.get('/billing/plans');
    return response.data;
  },

  // Get current subscription
  getCurrentSubscription: async () => {
    const response = await api.get('/billing/subscription');
    return response.data;
  },

  // Subscribe to plan
  subscribe: async (planId, paymentMethodId) => {
    const response = await api.post('/billing/subscribe', {
      plan_id: planId,
      payment_method_id: paymentMethodId,
    });
    return response.data;
  },

  // Update subscription
  updateSubscription: async (planId) => {
    const response = await api.put('/billing/subscription', {
      plan_id: planId,
    });
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async (reason = '') => {
    const response = await api.post('/billing/subscription/cancel', {
      reason,
    });
    return response.data;
  },

  // Resume subscription
  resumeSubscription: async () => {
    const response = await api.post('/billing/subscription/resume');
    return response.data;
  },

  // Get usage data
  getUsage: async (params = {}) => {
    const response = await api.get('/billing/usage', { params });
    return response.data;
  },

  // Get invoices
  getInvoices: async (params = {}) => {
    const response = await api.get('/billing/invoices', { params });
    return response.data;
  },

  // Get invoice by ID
  getInvoice: async (invoiceId) => {
    const response = await api.get(`/billing/invoices/${invoiceId}`);
    return response.data;
  },

  // Download invoice PDF
  downloadInvoice: async (invoiceId) => {
    const response = await api.get(`/billing/invoices/${invoiceId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Get payment methods
  getPaymentMethods: async () => {
    const response = await api.get('/billing/payment-methods');
    return response.data;
  },

  // Add payment method
  addPaymentMethod: async (paymentMethodData) => {
    const response = await api.post('/billing/payment-methods', paymentMethodData);
    return response.data;
  },

  // Update payment method
  updatePaymentMethod: async (paymentMethodId, paymentMethodData) => {
    const response = await api.put(`/billing/payment-methods/${paymentMethodId}`, paymentMethodData);
    return response.data;
  },

  // Delete payment method
  deletePaymentMethod: async (paymentMethodId) => {
    const response = await api.delete(`/billing/payment-methods/${paymentMethodId}`);
    return response.data;
  },

  // Set default payment method
  setDefaultPaymentMethod: async (paymentMethodId) => {
    const response = await api.post(`/billing/payment-methods/${paymentMethodId}/set-default`);
    return response.data;
  },

  // Get billing history
  getBillingHistory: async (params = {}) => {
    const response = await api.get('/billing/history', { params });
    return response.data;
  },

  // Preview plan change
  previewPlanChange: async (planId) => {
    const response = await api.post('/billing/preview-plan-change', {
      plan_id: planId,
    });
    return response.data;
  },
};

export default billingService;
