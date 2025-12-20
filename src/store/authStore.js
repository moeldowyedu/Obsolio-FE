import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';
import { setCookie, getCookie, deleteCookie } from '../utils/cookieUtils';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.login(credentials);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Store token in cookie for cross-domain access
          setCookie('obsolio_auth_token', data.token, 7);
          setCookie('obsolio_user', JSON.stringify(data.user), 7);

          return data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      // Register action
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.register(userData);
          // Auto-login after successful registration
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Store token in cookie for cross-domain access
          setCookie('obsolio_auth_token', data.token, 7);
          setCookie('obsolio_user', JSON.stringify(data.user), 7);

          return data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      // Logout action
      logout: async () => {
        try {
          await authService.logout();
        } finally {
          // Clear cookies
          deleteCookie('obsolio_auth_token');
          deleteCookie('obsolio_user');

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      // Update user profile
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // Fetch current user
      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const user = await authService.getCurrentUser();
          set({ user, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Update profile
      updateProfile: async (profileData) => {
        set({ isLoading: true });
        try {
          const user = await authService.updateProfile(profileData);
          set({ user, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Change password
      changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true });
        try {
          await authService.changePassword(currentPassword, newPassword);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Resend Verification
      resendVerification: async (email) => {
        try {
          const result = await authService.resendVerificationEmail(email);
          return result;
        } catch (error) {
          console.error('Resend verification failed:', error);
          throw error;
        }
      },

      // Check Domain Availability
      checkDomainAvailability: async (slug) => {
        // Don't set global loading state to avoid blocking UI
        try {
          return await authService.checkDomainAvailability(slug);
        } catch (error) {
          throw error;
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Set token
      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: 'obsolio-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
