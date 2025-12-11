import axios from 'axios';

// Get API base URL from environment
// Force relative path to use Vite proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

console.log('🌐 API Configuration:', {
  baseURL: API_BASE_URL,
  environment: import.meta.env.MODE
});

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function for exponential backoff
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to determine if request should be retried
const shouldRetry = (error) => {
  // Don't retry on authentication errors or client errors
  if (error.response && error.response.status >= 400 && error.response.status < 500) {
    return false;
  }
  // Retry on network errors or 5xx server errors
  if (!error.response) return true;
  if (error.response.status >= 500) return true;
  if (error.response.status === 429) return true; // Rate limiting
  return false;
};

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add tenant ID to requests if available
    const tenantId = localStorage.getItem('current_tenant_id');
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally with retry logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    // Initialize retry count
    if (!config.__retryCount) {
      config.__retryCount = 0;
    }

    // Check if we should retry this request
    if (config.__retryCount < MAX_RETRIES && shouldRetry(error)) {
      config.__retryCount += 1;

      // Calculate exponential backoff delay
      const retryDelay = RETRY_DELAY * Math.pow(2, config.__retryCount - 1);

      console.warn(
        `🔄 Retrying request (${config.__retryCount}/${MAX_RETRIES}) after ${retryDelay}ms:`,
        config.url
      );

      // Wait before retrying
      await delay(retryDelay);

      // Retry the request
      return api(config);
    }

    // Handle specific error status codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          console.error('🔒 Unauthorized access - redirecting to login');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          localStorage.removeItem('obsolio-auth-storage');
          localStorage.removeItem('obsolio-tenant-storage');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden - insufficient permissions
          console.error('⛔ Access forbidden:', error.response.data);
          break;
        case 404:
          // Not found
          console.error('🔍 Resource not found:', error.response.data);
          break;
        case 429:
          // Too many requests - rate limiting
          console.error('⏱️ Rate limit exceeded:', error.response.data);
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          console.error('🔥 Server error:', error.response.status, error.response.data);
          break;
        default:
          console.error('❌ API error:', error.response.status, error.response.data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('🌐 Network error - Cannot reach backend API:', error.message);
      console.error('💡 Make sure the backend server is running at:', API_BASE_URL);
    } else {
      // Error in request configuration
      console.error('⚙️ Request configuration error:', error.message);
    }

    // Add user-friendly error message
    if (!error.response && error.message === 'Network Error') {
      error.userMessage = `Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running.`;
    }

    return Promise.reject(error);
  }
);

export default api;
