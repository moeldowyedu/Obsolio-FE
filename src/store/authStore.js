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
          // Call authService to clear server session and local data
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
          // Continue with local cleanup even if service call fails
        } finally {
          // Import and use deleteAllAuthCookies for cross-domain cleanup
          const { deleteAllAuthCookies } = await import('../utils/cookieUtils');
          deleteAllAuthCookies();

          // Reset Zustand state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });

          // Navigate to marketing page login
          // Check if we're on a tenant subdomain or marketing domain
          const hostname = window.location.hostname;
          const isLocalhost = hostname.includes('localhost') || hostname === '127.0.0.1';

          if (isLocalhost) {
            // Development: just go to /login
            window.location.href = '/login';
          } else {
            // Production: redirect to marketing domain
            const parts = hostname.split('.');
            const isTenantSubdomain = parts.length > 2; // e.g., tenant.obsolio.com

            if (isTenantSubdomain) {
              // Redirect to marketing domain login
              const rootDomain = parts.slice(-2).join('.'); // obsolio.com
              window.location.href = `https://${rootDomain}/login`;
            } else {
              // Already on marketing domain
              window.location.href = '/login';
            }
          }
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
