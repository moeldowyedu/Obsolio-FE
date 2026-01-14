import api from '../services/api';

/**
 * API Health Check Utility
 *
 * Provides utilities to verify backend API connectivity and health
 */

/**
 * Check if the backend API is reachable
 * @returns {Promise<{success: boolean, status: string, message: string, responseTime: number}>}
 */
export const checkAPIHealth = async () => {
  const startTime = performance.now();

  try {
    // Try to reach a common health endpoint
    const response = await api.get('/health', {
      timeout: 5000, // 5 second timeout
    });

    const responseTime = Math.round(performance.now() - startTime);

    return {
      success: true,
      status: 'healthy',
      message: 'Backend API is reachable and healthy',
      responseTime,
      data: response.data
    };
  } catch (error) {
    const responseTime = Math.round(performance.now() - startTime);

    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        status: 'timeout',
        message: 'API request timed out',
        responseTime,
        error: error.message
      };
    }

    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        status: 'error',
        message: `API returned ${error.response.status}: ${error.response.statusText}`,
        responseTime,
        statusCode: error.response.status,
        error: error.response.data
      };
    }

    if (error.request) {
      // Request made but no response received
      return {
        success: false,
        status: 'unreachable',
        message: 'Cannot reach the backend API. Make sure the backend server is running.',
        responseTime,
        error: error.message
      };
    }

    // Something else happened
    return {
      success: false,
      status: 'error',
      message: `API health check failed: ${error.message}`,
      responseTime,
      error: error.message
    };
  }
};

/**
 * Get the configured API base URL
 * @returns {string}
 */
export const getAPIBaseURL = () => {
  return import.meta.env.VITE_API_BASE_URL || 'https://api.obsolio.com//api/v1';
};

/**
 * Check authentication status
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

/**
 * Get current user from local storage
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

/**
 * Get current tenant ID
 * @returns {string|null}
 */
export const getCurrentTenantId = () => {
  return localStorage.getItem('current_tenant_id');
};

/**
 * Comprehensive API diagnostics
 * @returns {Promise<object>}
 */
export const runAPIDiagnostics = async () => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    apiBaseURL: getAPIBaseURL(),
    isAuthenticated: isAuthenticated(),
    currentUser: getCurrentUser(),
    currentTenantId: getCurrentTenantId(),
    healthCheck: null
  };

  // Run health check
  diagnostics.healthCheck = await checkAPIHealth();

  return diagnostics;
};

/**
 * Test a specific API endpoint
 * @param {string} endpoint - Endpoint to test (e.g., '/agents')
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {object} data - Request data for POST/PUT requests
 * @returns {Promise<{success: boolean, response: any, error: any}>}
 */
export const testEndpoint = async (endpoint, method = 'GET', data = null) => {
  try {
    let response;

    switch (method.toUpperCase()) {
      case 'GET':
        response = await api.get(endpoint);
        break;
      case 'POST':
        response = await api.post(endpoint, data);
        break;
      case 'PUT':
        response = await api.put(endpoint, data);
        break;
      case 'DELETE':
        response = await api.delete(endpoint);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return {
      success: true,
      response: response.data,
      statusCode: response.status
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
      statusCode: error.response?.status
    };
  }
};

export default {
  checkAPIHealth,
  getAPIBaseURL,
  isAuthenticated,
  getCurrentUser,
  getCurrentTenantId,
  runAPIDiagnostics,
  testEndpoint
};
