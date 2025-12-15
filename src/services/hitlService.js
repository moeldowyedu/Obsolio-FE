import api from './api';

const hitlService = {
  // Get all HITL approvals
  getApprovals: async (params = {}) => {
    // const response = await api.get('/hitl-approvals', { params });
    // return response.data;
    return Promise.resolve({ data: [] });
  },

  // Get approval queue (alias)
  getApprovalQueue: async (params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Get pending approvals
  getPendingApprovals: async () => {
    return Promise.resolve({ data: [] });
  },

  // Get approval by ID
  getApproval: async (approvalId) => {
    return Promise.resolve({ data: { id: approvalId, status: 'pending' } });
  },

  // Approve execution
  approve: async (approvalId, notes = '') => {
    return Promise.resolve({ success: true });
  },

  // Reject execution
  reject: async (approvalId, reason) => {
    return Promise.resolve({ success: true });
  },

  // Escalate approval
  escalate: async (approvalId, escalationData = {}) => {
    return Promise.resolve({ success: true });
  },

  // Request changes
  requestChanges: async (approvalId, changes) => {
    return Promise.resolve({ success: true });
  },

  // Get activity log
  getActivityLog: async (params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Get HITL settings
  getHITLSettings: async () => {
    return Promise.resolve({ data: { enabled: true, autoApprove: false } });
  },

  // Update HITL settings
  updateHITLSettings: async (settings) => {
    return Promise.resolve({ data: settings });
  },

  // Get approval routing rules
  getRoutingRules: async () => {
    return Promise.resolve({ data: [] });
  },

  // Create routing rule
  createRoutingRule: async (ruleData) => {
    return Promise.resolve({ data: { id: 'rule_' + Date.now(), ...ruleData } });
  },

  // Update routing rule
  updateRoutingRule: async (ruleId, ruleData) => {
    return Promise.resolve({ data: { id: ruleId, ...ruleData } });
  },

  // Delete routing rule
  deleteRoutingRule: async (ruleId) => {
    return Promise.resolve({ success: true });
  },

  // Get approval stats
  getApprovalStats: async (params = {}) => {
    return Promise.resolve({ data: { pending: 0, approved: 10, rejected: 2 } });
  },

  // Oversight Config (Added for useHITL.js compatibility)
  getOversightConfig: async () => {
    return Promise.resolve({ data: { mode: 'standard' } });
  },
  setOversightMode: async (modeId, modeConfig) => {
    return Promise.resolve({ success: true });
  },
  approveItem: async (itemId, feedback) => { return Promise.resolve({ success: true }); },
  rejectItem: async (itemId, reason) => { return Promise.resolve({ success: true }); },
  bulkApprove: async (itemIds) => { return Promise.resolve({ success: true }); },
  bulkReject: async (itemIds, reason) => { return Promise.resolve({ success: true }); },
  getHITLStats: async (params) => { return Promise.resolve({ data: { accuracy: '99%' } }); }
};

export default hitlService;
