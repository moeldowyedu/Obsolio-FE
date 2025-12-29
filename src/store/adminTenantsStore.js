/**
 * Admin Tenants Store
 * Zustand store for managing all tenants in the admin console
 * Based on FRONTEND_TENANT_MANAGEMENT.md specification
 */

import { create } from 'zustand';
import adminTenantsService from '../services/adminTenantsService';

export const useAdminTenantsStore = create((set, get) => ({
  // State
  tenants: [],
  currentTenant: null,
  statistics: null,
  filters: {
    search: '',
    status: null,
    plan_id: null,
    type: null,
    sort_by: 'created_at',
    sort_order: 'desc',
  },
  pagination: {
    page: 1,
    per_page: 15,
    total: 0,
    last_page: 1,
  },
  loading: false,
  error: null,
  selectedTenants: [], // For bulk actions

  // ===== Actions =====

  /**
   * Fetch tenants list with filters and pagination
   */
  fetchTenants: async () => {
    set({ loading: true, error: null });
    try {
      const { filters, pagination } = get();
      const params = {
        page: pagination.page,
        per_page: pagination.per_page,
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.plan_id && { plan_id: filters.plan_id }),
        ...(filters.type && { type: filters.type }),
        ...(filters.sort_by && { sort_by: filters.sort_by }),
        ...(filters.sort_order && { sort_order: filters.sort_order }),
      };

      const response = await adminTenantsService.listTenants(params);

      set({
        tenants: response.data.data,
        pagination: {
          page: response.data.current_page,
          per_page: response.data.per_page,
          total: response.data.total,
          last_page: response.data.last_page,
        },
        loading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch tenants',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Fetch tenant statistics for dashboard
   */
  fetchStatistics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await adminTenantsService.getTenantStatistics();
      set({ statistics: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch statistics',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Fetch single tenant details
   */
  fetchTenant: async (tenantId) => {
    set({ loading: true, error: null });
    try {
      const response = await adminTenantsService.getTenant(tenantId);
      set({ currentTenant: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch tenant',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Create new tenant
   */
  createTenant: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await adminTenantsService.createTenant(data);

      // Refresh the list
      await get().fetchTenants();

      set({ loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to create tenant',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Update tenant
   */
  updateTenant: async (tenantId, data) => {
    set({ loading: true, error: null });
    try {
      const response = await adminTenantsService.updateTenant(tenantId, data);

      // Update in list
      set((state) => ({
        tenants: state.tenants.map((t) =>
          t.id === tenantId ? response.data : t
        ),
        currentTenant: state.currentTenant?.id === tenantId
          ? response.data
          : state.currentTenant,
        loading: false,
      }));

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update tenant',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Update tenant status
   */
  updateTenantStatus: async (tenantId, status, reason) => {
    set({ loading: true, error: null });
    try {
      const response = await adminTenantsService.updateTenantStatus(tenantId, {
        status,
        reason,
      });

      // Update in list
      set((state) => ({
        tenants: state.tenants.map((t) =>
          t.id === tenantId ? { ...t, status } : t
        ),
        loading: false,
      }));

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update status',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Suspend tenant
   */
  suspendTenant: async (tenantId, reason) => {
    return get().updateTenantStatus(tenantId, 'suspended', reason);
  },

  /**
   * Activate tenant
   */
  activateTenant: async (tenantId) => {
    return get().updateTenantStatus(tenantId, 'active');
  },

  /**
   * Deactivate tenant
   */
  deactivateTenant: async (tenantId, reason) => {
    set({ loading: true, error: null });
    try {
      await adminTenantsService.deactivateTenant(tenantId, { reason });

      // Refresh the list
      await get().fetchTenants();

      set({ loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to deactivate tenant',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Reactivate tenant
   */
  reactivateTenant: async (tenantId) => {
    set({ loading: true, error: null });
    try {
      const response = await adminTenantsService.reactivateTenant(tenantId);

      // Update in list
      set((state) => ({
        tenants: state.tenants.map((t) =>
          t.id === tenantId ? response.data : t
        ),
        loading: false,
      }));

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to reactivate tenant',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Change subscription
   */
  changeSubscription: async (tenantId, planId, billingCycle, startsImmediately = true) => {
    set({ loading: true, error: null });
    try {
      await adminTenantsService.changeSubscription(tenantId, {
        plan_id: planId,
        billing_cycle: billingCycle,
        starts_immediately: startsImmediately,
      });

      // Refresh tenant details
      if (get().currentTenant?.id === tenantId) {
        await get().fetchTenant(tenantId);
      }

      set({ loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to change subscription',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Extend trial
   */
  extendTrial: async (tenantId, days, reason) => {
    set({ loading: true, error: null });
    try {
      const response = await adminTenantsService.extendTrial(tenantId, {
        days,
        reason,
      });

      // Update in list
      set((state) => ({
        tenants: state.tenants.map((t) =>
          t.id === tenantId ? response.data : t
        ),
        loading: false,
      }));

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to extend trial',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Delete tenant
   */
  deleteTenant: async (tenantId, hardDelete = false, reason) => {
    set({ loading: true, error: null });
    try {
      await adminTenantsService.deleteTenant(tenantId, {
        hard_delete: hardDelete,
        reason,
      });

      // Remove from list
      set((state) => ({
        tenants: state.tenants.filter((t) => t.id !== tenantId),
        currentTenant: state.currentTenant?.id === tenantId
          ? null
          : state.currentTenant,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete tenant',
        loading: false,
      });
      throw error;
    }
  },

  // ===== Filter & Pagination Actions =====

  /**
   * Set filters
   */
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 }, // Reset to page 1
    }));
  },

  /**
   * Clear filters
   */
  clearFilters: () => {
    set({
      filters: {
        search: '',
        status: null,
        plan_id: null,
        type: null,
        sort_by: 'created_at',
        sort_order: 'desc',
      },
      pagination: {
        page: 1,
        per_page: 15,
        total: 0,
        last_page: 1,
      },
    });
  },

  /**
   * Set pagination
   */
  setPagination: (newPagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...newPagination },
    }));
  },

  /**
   * Go to page
   */
  goToPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, page },
    }));
  },

  /**
   * Set page size
   */
  setPageSize: (perPage) => {
    set((state) => ({
      pagination: { ...state.pagination, per_page: perPage, page: 1 },
    }));
  },

  // ===== Bulk Actions =====

  /**
   * Select tenants for bulk actions
   */
  selectTenants: (tenantIds) => {
    set({ selectedTenants: tenantIds });
  },

  /**
   * Clear selected tenants
   */
  clearSelection: () => {
    set({ selectedTenants: [] });
  },

  /**
   * Bulk change status
   */
  bulkChangeStatus: async (status) => {
    const { selectedTenants } = get();
    if (selectedTenants.length === 0) return;

    set({ loading: true, error: null });
    try {
      await adminTenantsService.bulkChangeStatus(selectedTenants, status);

      // Refresh the list
      await get().fetchTenants();
      get().clearSelection();

      set({ loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update tenants',
        loading: false,
      });
      throw error;
    }
  },

  // ===== Utility Actions =====

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Set loading
   */
  setLoading: (loading) => {
    set({ loading });
  },

  /**
   * Reset store
   */
  reset: () => {
    set({
      tenants: [],
      currentTenant: null,
      statistics: null,
      filters: {
        search: '',
        status: null,
        plan_id: null,
        type: null,
        sort_by: 'created_at',
        sort_order: 'desc',
      },
      pagination: {
        page: 1,
        per_page: 15,
        total: 0,
        last_page: 1,
      },
      loading: false,
      error: null,
      selectedTenants: [],
    });
  },
}));

export default useAdminTenantsStore;
