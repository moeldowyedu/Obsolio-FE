import api from './api';

/**
 * Roles & Permissions Service
 * Handles role-based access control (RBAC) API endpoints
 */
const rolesPermissionsService = {
  // ============ ROLES ============

  /**
   * Get all roles
   * GET /api/v1/roles
   */
  getRoles: async (params = {}) => {
    const response = await api.get('/roles', { params });
    return response.data;
  },

  /**
   * Get role by ID
   * GET /api/v1/roles/{role}
   */
  getRoleById: async (roleId) => {
    const response = await api.get(`/roles/${roleId}`);
    return response.data;
  },

  /**
   * Create new role
   * POST /api/v1/roles
   */
  createRole: async (roleData) => {
    const response = await api.post('/roles', roleData);
    return response.data;
  },

  /**
   * Update role
   * PUT/PATCH /api/v1/roles/{role}
   */
  updateRole: async (roleId, roleData) => {
    const response = await api.put(`/roles/${roleId}`, roleData);
    return response.data;
  },

  /**
   * Delete role
   * DELETE /api/v1/roles/{role}
   */
  deleteRole: async (roleId) => {
    const response = await api.delete(`/roles/${roleId}`);
    return response.data;
  },

  // ============ PERMISSIONS ============

  /**
   * Get all permissions
   * GET /api/v1/permissions
   */
  getPermissions: async (params = {}) => {
    const response = await api.get('/permissions', { params });
    return response.data;
  },

  /**
   * Get permissions list (simplified)
   * GET /api/v1/permissions/list
   */
  getPermissionsList: async () => {
    const response = await api.get('/permissions/list');
    return response.data;
  },

  /**
   * Get permission by ID
   * GET /api/v1/permissions/{id}
   */
  getPermissionById: async (permissionId) => {
    const response = await api.get(`/permissions/${permissionId}`);
    return response.data;
  },
};

export default rolesPermissionsService;
