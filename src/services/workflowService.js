import api from './api';

/**
 * Workflow Service
 * Handles workflow management and execution API endpoints
 */
const workflowService = {
  /**
   * Get all workflows
   */
  getWorkflows: async (params = {}) => {
    // const response = await api.get('/workflows', { params });
    // return response.data;
    return Promise.resolve({
      data: [
        { id: '1', name: 'Document Processor', status: 'active', runs: 45 },
        { id: '2', name: 'Email Automation', status: 'inactive', runs: 12 }
      ]
    });
  },

  /**
   * Get workflow by ID
   */
  getWorkflowById: async (workflowId) => {
    return Promise.resolve({ data: { id: workflowId, name: 'Mock Workflow', steps: [] } });
  },

  /**
   * Create new workflow
   */
  createWorkflow: async (workflowData) => {
    return Promise.resolve({ data: { id: 'wf_' + Date.now(), ...workflowData } });
  },

  /**
   * Update workflow
   */
  updateWorkflow: async (workflowId, workflowData) => {
    return Promise.resolve({ data: { id: workflowId, ...workflowData } });
  },

  /**
   * Delete workflow
   */
  deleteWorkflow: async (workflowId) => {
    return Promise.resolve({ success: true });
  },

  /**
   * Execute workflow
   */
  executeWorkflow: async (workflowId, executionData = {}) => {
    return Promise.resolve({ data: { executionId: 'exe_' + Date.now(), status: 'queued' } });
  },

  /**
   * Get workflow executions
   */
  getWorkflowExecutions: async (workflowId, params = {}) => {
    return Promise.resolve({ data: [] });
  },

  /**
   * Get execution details
   */
  getExecutionDetails: async (executionId) => {
    return Promise.resolve({ data: { id: executionId, status: 'completed', result: {} } });
  },
};

export default workflowService;
