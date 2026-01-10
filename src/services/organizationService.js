import api from './api';

const organizationService = {
  // ========== Organizations ==========
  organizations: {
    /**
     * Get all organizations
     * GET /api/v1/organizations
     */
    list: async (params = {}) => {
      const response = await api.get('/organizations', { params });
      return response.data;
    },

    /**
     * Get current organization
     * GET /api/v1/tenant/organization
     */
    getCurrent: async () => {
      const response = await api.get('/tenant/organization');
      return response.data;
    },

    /**
     * Update current organization
     * POST /api/v1/tenant/organization (using POST for FormData/PUT simulation)
     */
    updateCurrent: async (data) => {
      const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const response = await api.post('/tenant/organization', data, config);
      return response.data;
    },

    /**
     * Get organization by ID
     * GET /api/v1/organizations/{organization}
     */
    get: async (id) => {
      const response = await api.get(`/organizations/${id}`);
      return response.data;
    },

    /**
     * Create new organization
     * POST /api/v1/organizations
     */
    create: async (data) => {
      const response = await api.post('/organizations', data);
      return response.data;
    },

    /**
     * Update organization
     * PUT/PATCH /api/v1/organizations/{organization}
     */
    update: async (id, data) => {
      const response = await api.put(`/organizations/${id}`, data);
      return response.data;
    },

    /**
     * Delete organization
     * DELETE /api/v1/organizations/{organization}
     */
    delete: async (id) => {
      const response = await api.delete(`/organizations/${id}`);
      return response.data;
    },

    /**
     * Get organization dashboard
     * GET /api/v1/organizations/{id}/dashboard
     */
    getDashboard: async (id) => {
      const response = await api.get(`/organizations/${id}/dashboard`);
      return response.data;
    },

    /**
     * Get branches by organization
     * GET /api/v1/organizations/{organizationId}/branches
     */
    getBranches: async (organizationId) => {
      const response = await api.get(`/organizations/${organizationId}/branches`);
      return response.data;
    },

    /**
     * Get departments by organization
     * GET /api/v1/organizations/{organizationId}/departments
     */
    getDepartments: async (organizationId) => {
      const response = await api.get(`/organizations/${organizationId}/departments`);
      return response.data;
    }
  },

  // ========== Branches ==========
  branches: {
    list: async (filters = {}) => {
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page);
      if (filters.per_page) params.append('per_page', filters.per_page);

      const response = await api.get(`/branches?${params.toString()}`);
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/branches/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/branches', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/branches/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/branches/${id}`);
      return response.data;
    },

    /**
     * Get departments by branch
     * GET /api/v1/branches/{branchId}/departments
     */
    getDepartments: async (branchId) => {
      const response = await api.get(`/branches/${branchId}/departments`);
      return response.data;
    }
  },

  // ========== Departments ==========
  departments: {
    list: async () => {
      const response = await api.get('/departments');
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/departments/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/departments', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/departments/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/departments/${id}`);
      return response.data;
    },

    /**
     * Get projects by department
     * GET /api/v1/departments/{departmentId}/projects
     */
    getProjects: async (departmentId) => {
      const response = await api.get(`/departments/${departmentId}/projects`);
      return response.data;
    }
  },

  // ========== Projects ==========
  projects: {
    list: async (filters = {}) => {
      const params = new URLSearchParams();

      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.department_id) params.append('department_id', filters.department_id);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.page) params.append('page', filters.page);
      if (filters.per_page) params.append('per_page', filters.per_page);

      const response = await api.get(`/projects?${params.toString()}`);
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/projects', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/projects/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    },

    /**
     * Update project status
     * PUT /api/v1/projects/{id}/status
     */
    updateStatus: async (id, status) => {
      const response = await api.put(`/projects/${id}/status`, { status });
      return response.data;
    }
  },

  // ========== Teams ==========
  teams: {
    list: async (filters = {}) => {
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page);
      if (filters.per_page) params.append('per_page', filters.per_page);

      const response = await api.get(`/teams?${params.toString()}`);
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/teams/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/teams', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/teams/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/teams/${id}`);
      return response.data;
    },

    /**
     * Add member to team
     * POST /api/v1/teams/{id}/members
     */
    addMember: async (teamId, memberData) => {
      const response = await api.post(`/teams/${teamId}/members`, memberData);
      return response.data;
    },

    /**
     * Remove member from team
     * DELETE /api/v1/teams/{id}/members/{userId}
     */
    removeMember: async (teamId, userId) => {
      const response = await api.delete(`/teams/${teamId}/members/${userId}`);
      return response.data;
    }
  }
};

export default organizationService;
