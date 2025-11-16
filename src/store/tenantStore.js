import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import tenantService from '../services/tenantService';

export const useTenantStore = create(
  persist(
    (set, get) => ({
      tenants: [],
      currentTenant: null,
      tenantSettings: null,
      tenantUsers: [],
      isLoading: false,
      error: null,

      // Fetch all tenants
      fetchTenants: async () => {
        set({ isLoading: true, error: null });
        try {
          const tenants = await tenantService.getTenants();
          set({ tenants, isLoading: false });
          return tenants;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to fetch tenants',
            isLoading: false,
          });
          throw error;
        }
      },

      // Set current tenant
      setCurrentTenant: async (tenantId) => {
        set({ isLoading: true, error: null });
        try {
          await tenantService.switchTenant(tenantId);
          const tenant = await tenantService.getTenant(tenantId);
          set({ currentTenant: tenant, isLoading: false });
          return tenant;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to switch tenant',
            isLoading: false,
          });
          throw error;
        }
      },

      // Create tenant
      createTenant: async (tenantData) => {
        set({ isLoading: true, error: null });
        try {
          const tenant = await tenantService.createTenant(tenantData);
          set((state) => ({
            tenants: [...state.tenants, tenant],
            isLoading: false,
          }));
          return tenant;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to create tenant',
            isLoading: false,
          });
          throw error;
        }
      },

      // Update tenant
      updateTenant: async (tenantId, tenantData) => {
        set({ isLoading: true, error: null });
        try {
          const tenant = await tenantService.updateTenant(tenantId, tenantData);
          set((state) => ({
            tenants: state.tenants.map((t) =>
              t.id === tenantId ? tenant : t
            ),
            currentTenant:
              state.currentTenant?.id === tenantId
                ? tenant
                : state.currentTenant,
            isLoading: false,
          }));
          return tenant;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to update tenant',
            isLoading: false,
          });
          throw error;
        }
      },

      // Fetch tenant settings
      fetchTenantSettings: async (tenantId) => {
        set({ isLoading: true, error: null });
        try {
          const settings = await tenantService.getTenantSettings(tenantId);
          set({ tenantSettings: settings, isLoading: false });
          return settings;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to fetch settings',
            isLoading: false,
          });
          throw error;
        }
      },

      // Update tenant settings
      updateTenantSettings: async (tenantId, settings) => {
        set({ isLoading: true, error: null });
        try {
          const updatedSettings = await tenantService.updateTenantSettings(
            tenantId,
            settings
          );
          set({ tenantSettings: updatedSettings, isLoading: false });
          return updatedSettings;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to update settings',
            isLoading: false,
          });
          throw error;
        }
      },

      // Fetch tenant users
      fetchTenantUsers: async (tenantId) => {
        set({ isLoading: true, error: null });
        try {
          const users = await tenantService.getTenantUsers(tenantId);
          set({ tenantUsers: users, isLoading: false });
          return users;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to fetch users',
            isLoading: false,
          });
          throw error;
        }
      },

      // Invite user
      inviteUser: async (tenantId, email, role) => {
        set({ isLoading: true, error: null });
        try {
          await tenantService.inviteUser(tenantId, email, role);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to invite user',
            isLoading: false,
          });
          throw error;
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'aasim-tenant-storage',
      partialize: (state) => ({
        currentTenant: state.currentTenant,
      }),
    }
  )
);
