import api from './api';

/**
 * User Service
 * Handles all user management API endpoints
 */
const userService = {
  /**
   * Get all users
   * GET /api/v1/users
   */
  getUsers: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  /**
   * Get user by ID
   * GET /api/v1/users/{user}
   */
  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Create new user
   * POST /api/v1/users
   */
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  /**
   * Update user
   * PUT/PATCH /api/v1/users/{user}
   */
  updateUser: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },

  /**
   * Delete user
   * DELETE /api/v1/users/{user}
   */
  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },

  /**
   * Assign user to entity (project, department, etc.)
   * POST /api/v1/users/{id}/assign
   */
  assignUser: async (userId, assignmentData) => {
    const response = await api.post(`/users/${userId}/assign`, assignmentData);
    return response.data;
  },

  /**
   * Get user assignments
   * GET /api/v1/users/{id}/assignments
   */
  getUserAssignments: async (userId) => {
    const response = await api.get(`/users/${userId}/assignments`);
    return response.data;
  },

  /**
   * Update user status
   * PUT /api/v1/users/{id}/status
   */
  updateUserStatus: async (userId, status) => {
    const response = await api.put(`/users/${userId}/status`, { status });
    return response.data;
  },
};

export default userService;
