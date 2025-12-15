import api from './api';

const billingService = {
  // Get subscription plans
  getPlans: async () => {
    // const response = await api.get('/billing/plans');
    // return response.data;
    return Promise.resolve({
      data: [
        { id: 'free', name: 'Free', price: 0, features: ['Basic Agents', 'Community Support'] },
        { id: 'pro', name: 'Pro', price: 29, features: ['Unlimited Agents', 'Priority Support'] }
      ]
    });
  },

  // Get current subscription
  getCurrentSubscription: async () => {
    // const response = await api.get('/billing/subscription');
    // return response.data;
    return Promise.resolve({
      data: {
        plan: { id: 'pro', name: 'Pro' },
        status: 'active',
        current_period_end: '2024-12-31'
      }
    });
  },

  // Subscribe to plan
  subscribe: async (planId, paymentMethodId) => {
    return Promise.resolve({ success: true, message: 'Subscribed successfully' });
  },

  // Update subscription
  updateSubscription: async (planId) => {
    return Promise.resolve({ success: true, message: 'Subscription updated' });
  },

  // Cancel subscription
  cancelSubscription: async (reason = '') => {
    return Promise.resolve({ success: true, message: 'Subscription cancelled' });
  },

  // Resume subscription
  resumeSubscription: async () => {
    return Promise.resolve({ success: true, message: 'Subscription resumed' });
  },

  // Get usage data
  getUsage: async (params = {}) => {
    return Promise.resolve({ data: { agents: 5, runs: 120, storage: '1.2GB' } });
  },

  // Get invoices
  getInvoices: async (params = {}) => {
    return Promise.resolve({
      data: [
        { id: 'inv_1', amount: 2900, status: 'paid', date: '2023-11-01', pdf_url: '#' },
        { id: 'inv_2', amount: 2900, status: 'paid', date: '2023-12-01', pdf_url: '#' }
      ]
    });
  },

  // Get invoice by ID
  getInvoice: async (invoiceId) => {
    return Promise.resolve({ data: { id: invoiceId, amount: 2900, status: 'paid' } });
  },

  // Download invoice PDF
  downloadInvoice: async (invoiceId) => {
    return Promise.resolve(new Blob(['Mock PDF Content'], { type: 'application/pdf' }));
  },

  // Get payment methods
  getPaymentMethods: async () => {
    return Promise.resolve({
      data: [
        { id: 'pm_1', brand: 'visa', last4: '4242', exp_month: 12, exp_year: 2025 }
      ]
    });
  },

  // Add payment method
  addPaymentMethod: async (paymentMethodData) => {
    return Promise.resolve({ success: true });
  },

  // Update payment method
  updatePaymentMethod: async (paymentMethodId, paymentMethodData) => {
    return Promise.resolve({ success: true });
  },

  // Delete payment method
  deletePaymentMethod: async (paymentMethodId) => {
    return Promise.resolve({ success: true });
  },

  // Set default payment method
  setDefaultPaymentMethod: async (paymentMethodId) => {
    return Promise.resolve({ success: true });
  },

  // Get billing history
  getBillingHistory: async (params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Preview plan change
  previewPlanChange: async (planId) => {
    return Promise.resolve({ data: { immediate_charge: 0, next_charge: 2900 } });
  },
};

export default billingService;
