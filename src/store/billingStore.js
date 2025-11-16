import { create } from 'zustand';
import billingService from '../services/billingService';
import { PLANS } from '../utils/constants';

export const useBillingStore = create((set, get) => ({
  plans: PLANS,
  currentSubscription: null,
  usage: null,
  invoices: [],
  paymentMethods: [],
  isLoading: false,
  error: null,

  // Fetch current subscription
  fetchSubscription: async () => {
    set({ isLoading: true, error: null });
    try {
      const subscription = await billingService.getCurrentSubscription();
      set({ currentSubscription: subscription, isLoading: false });
      return subscription;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch subscription',
        isLoading: false,
      });
      throw error;
    }
  },

  // Subscribe to plan
  subscribe: async (planId, paymentMethodId) => {
    set({ isLoading: true, error: null });
    try {
      const subscription = await billingService.subscribe(
        planId,
        paymentMethodId
      );
      set({ currentSubscription: subscription, isLoading: false });
      return subscription;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Subscription failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Update subscription
  updateSubscription: async (planId) => {
    set({ isLoading: true, error: null });
    try {
      const subscription = await billingService.updateSubscription(planId);
      set({ currentSubscription: subscription, isLoading: false });
      return subscription;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update subscription',
        isLoading: false,
      });
      throw error;
    }
  },

  // Cancel subscription
  cancelSubscription: async (reason = '') => {
    set({ isLoading: true, error: null });
    try {
      await billingService.cancelSubscription(reason);
      set((state) => ({
        currentSubscription: {
          ...state.currentSubscription,
          status: 'canceled',
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to cancel subscription',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch usage
  fetchUsage: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const usage = await billingService.getUsage(params);
      set({ usage, isLoading: false });
      return usage;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch usage',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch invoices
  fetchInvoices: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const invoices = await billingService.getInvoices(params);
      set({ invoices, isLoading: false });
      return invoices;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch invoices',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch payment methods
  fetchPaymentMethods: async () => {
    set({ isLoading: true, error: null });
    try {
      const methods = await billingService.getPaymentMethods();
      set({ paymentMethods: methods, isLoading: false });
      return methods;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch payment methods',
        isLoading: false,
      });
      throw error;
    }
  },

  // Add payment method
  addPaymentMethod: async (paymentMethodData) => {
    set({ isLoading: true, error: null });
    try {
      const method = await billingService.addPaymentMethod(paymentMethodData);
      set((state) => ({
        paymentMethods: [...state.paymentMethods, method],
        isLoading: false,
      }));
      return method;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to add payment method',
        isLoading: false,
      });
      throw error;
    }
  },

  // Delete payment method
  deletePaymentMethod: async (paymentMethodId) => {
    set({ isLoading: true, error: null });
    try {
      await billingService.deletePaymentMethod(paymentMethodId);
      set((state) => ({
        paymentMethods: state.paymentMethods.filter(
          (m) => m.id !== paymentMethodId
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete payment method',
        isLoading: false,
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
