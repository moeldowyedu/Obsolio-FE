import { create } from 'zustand';
import { userService } from '../services';

export const useUserStore = create((set, get) => ({
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  pagination: null,

  // Fetch all users
  fetchUsers: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.getUsers(params);
      set({
        users: response.data || response,
        pagination: response.meta || response.pagination,
        isLoading: false
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch users',
        isLoading: false
      });
      throw error;
    }
  },

  // Get user by ID
  fetchUserById: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.getUserById(userId);
      set({
        currentUser: response.data || response,
        isLoading: false
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch user',
        isLoading: false
      });
      throw error;
    }
  },

  // Create user
  createUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.createUser(userData);
      const newUser = response.data || response;
      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false
      }));
      return newUser;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to create user',
        isLoading: false
      });
      throw error;
    }
  },

  // Update user
  updateUser: async (userId, userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.updateUser(userId, userData);
      const updatedUser = response.data || response;
      set((state) => ({
        users: state.users.map((u) => (u.id === userId ? updatedUser : u)),
        currentUser: state.currentUser?.id === userId ? updatedUser : state.currentUser,
        isLoading: false
      }));
      return updatedUser;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update user',
        isLoading: false
      });
      throw error;
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await userService.deleteUser(userId);
      set((state) => ({
        users: state.users.filter((u) => u.id !== userId),
        currentUser: state.currentUser?.id === userId ? null : state.currentUser,
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete user',
        isLoading: false
      });
      throw error;
    }
  },

  // Update user status
  updateUserStatus: async (userId, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.updateUserStatus(userId, status);
      const updatedUser = response.data || response;
      set((state) => ({
        users: state.users.map((u) => (u.id === userId ? updatedUser : u)),
        isLoading: false
      }));
      return updatedUser;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update user status',
        isLoading: false
      });
      throw error;
    }
  },

  // Assign user
  assignUser: async (userId, assignmentData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.assignUser(userId, assignmentData);
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to assign user',
        isLoading: false
      });
      throw error;
    }
  },

  // Get user assignments
  getUserAssignments: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.getUserAssignments(userId);
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch assignments',
        isLoading: false
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Clear current user
  clearCurrentUser: () => set({ currentUser: null }),
}));
