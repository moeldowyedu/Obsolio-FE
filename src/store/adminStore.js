import { create } from 'zustand';
import adminService from '../services/adminService';

export const useAdminStore = create((set, get) => ({
    tenants: [],
    stats: null,
    isLoading: false,
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    },

    // Fetch all tenants
    fetchAllTenants: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
            const response = await adminService.getAllTenants(params);

            // Handle Laravel pagination structure or raw array
            const tenantsData = response.data || response;
            const meta = response.meta || {};

            set({
                tenants: Array.isArray(tenantsData) ? tenantsData : [],
                pagination: {
                    currentPage: meta.current_page || 1,
                    totalPages: meta.last_page || 1,
                    totalItems: meta.total || (Array.isArray(tenantsData) ? tenantsData.length : 0),
                    itemsPerPage: meta.per_page || 10
                },
                isLoading: false
            });
            return tenantsData;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch system tenants',
                isLoading: false,
            });
            throw error;
        }
    },

    // Fetch stats
    fetchSystemStats: async () => {
        try {
            const stats = await adminService.getSystemStats();
            set({ stats });
            return stats;
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            // Don't set global error for stats failure to avoid blocking UI
        }
    },

    // Tenant Actions
    suspendTenant: async (tenantId) => {
        set({ isLoading: true });
        try {
            await adminService.suspendTenant(tenantId);
            // Optimistic update
            set((state) => ({
                tenants: state.tenants.map(t =>
                    t.id === tenantId ? { ...t, status: 'Suspended' } : t
                ),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to suspend tenant' });
            throw error;
        }
    },

    activateTenant: async (tenantId) => {
        set({ isLoading: true });
        try {
            await adminService.activateTenant(tenantId);
            // Optimistic update
            set((state) => ({
                tenants: state.tenants.map(t =>
                    t.id === tenantId ? { ...t, status: 'Active' } : t
                ),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to activate tenant' });
            throw error;
        }
    },

    updateTenant: async (tenantId, data) => {
        set({ isLoading: true });
        try {
            const updatedTenant = await adminService.updateTenant(tenantId, data);

            // Check if response is the tenant object or wrapped
            const finalTenant = updatedTenant.data || updatedTenant;

            set((state) => ({
                tenants: state.tenants.map(t =>
                    t.id === tenantId ? { ...t, ...finalTenant } : t
                ),
                isLoading: false
            }));
            return finalTenant;
        } catch (error) {
            set({ isLoading: false, error: 'Failed to update tenant' });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
