import api from './api';

const hitlService = {
  // Get approval queue
  getApprovalQueue: async (params = {}) => {
    const response = await api.get('/hitl/approvals', { params });
    return response.data;
  },

  // Get approval by ID
  getApproval: async (approvalId) => {
    const response = await api.get(`/hitl/approvals/${approvalId}`);
    return response.data;
  },

  // Approve execution
  approve: async (approvalId, notes = '') => {
    const response = await api.post(`/hitl/approvals/${approvalId}/approve`, {
      notes,
    });
    return response.data;
  },

  // Reject execution
  reject: async (approvalId, reason) => {
    const response = await api.post(`/hitl/approvals/${approvalId}/reject`, {
      reason,
    });
    return response.data;
  },

  // Request changes
  requestChanges: async (approvalId, changes) => {
    const response = await api.post(`/hitl/approvals/${approvalId}/request-changes`, {
      changes,
    });
    return response.data;
  },

  // Get activity log
  getActivityLog: async (params = {}) => {
    const response = await api.get('/hitl/activity-log', { params });
    return response.data;
  },

  // Get HITL settings
  getHITLSettings: async () => {
    const response = await api.get('/hitl/settings');
    return response.data;
  },

  // Update HITL settings
  updateHITLSettings: async (settings) => {
    const response = await api.put('/hitl/settings', settings);
    return response.data;
  },

  // Get approval routing rules
  getRoutingRules: async () => {
    const response = await api.get('/hitl/routing-rules');
    return response.data;
  },

  // Create routing rule
  createRoutingRule: async (ruleData) => {
    const response = await api.post('/hitl/routing-rules', ruleData);
    return response.data;
  },

  // Update routing rule
  updateRoutingRule: async (ruleId, ruleData) => {
    const response = await api.put(`/hitl/routing-rules/${ruleId}`, ruleData);
    return response.data;
  },

  // Delete routing rule
  deleteRoutingRule: async (ruleId) => {
    const response = await api.delete(`/hitl/routing-rules/${ruleId}`);
    return response.data;
  },

  // Get approval stats
  getApprovalStats: async (params = {}) => {
    const response = await api.get('/hitl/stats', { params });
    return response.data;
  },
};

export default hitlService;
