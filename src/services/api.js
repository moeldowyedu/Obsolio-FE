import axios from 'axios';
import notify from '../utils/toast';

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

    // Add tenant ID to requests if available, BUT skip if on console domain
    const tenantId = localStorage.getItem('current_tenant_id');
    const isConsole = window.location.hostname.startsWith('console.');

    // Exclude tenant headers for auth endpoints to prevent context confusion
    const isAuthRoute = config.url?.includes('/auth/register') ||
      config.url?.includes('/auth/login') ||
      config.url?.includes('/auth/forgot-password') ||
      config.url?.includes('/auth/reset-password') ||
      config.url?.includes('/auth/resend-verification');

    if (tenantId && !isConsole && !isAuthRoute) {
      config.headers['X-Tenant-ID'] = tenantId;
    }

    // Debug logging for specific problematic endpoints
    if (config.url?.includes('/tenant/organization')) {
      console.log('🚀 API Request: /tenant/organization', {
        headers: config.headers,
        tenantId,
        isAuthRoute
      });
    }

    // Add current subdomain to headers
    const subdomain = window.location.hostname.split('.')[0];
    const isLocalhost = window.location.hostname.includes('localhost');
    const appDomain = import.meta.env.VITE_APP_DOMAIN || 'localhost';

    // Simple extraction logic inline to avoid circular dependencies
    // If not on main domain (and not www), send subdomain
    if (window.location.hostname !== appDomain &&
      window.location.hostname !== `www.${appDomain}` &&
      // For localhost, check if we have a subdomain part
      (!isLocalhost || (window.location.hostname.split('.').length > 1 && window.location.hostname !== 'localhost'))) {

      // Extract subdomain
      let currentSubdomain;
      if (isLocalhost) {
        currentSubdomain = window.location.hostname.split('.')[0];
      } else {
        const parts = window.location.hostname.split('.');
        // Start from end, remove domain parts. 
        // Simplified: just take first part if not main domain
        currentSubdomain = parts[0];
      }

      if (currentSubdomain && currentSubdomain !== 'www' && currentSubdomain !== 'console' && !isAuthRoute) {
        config.headers['X-Tenant-Subdomain'] = currentSubdomain;
      }
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
      // Check if the request explicitly skipped global error handling
      if (!error.config?.skipErrorToast) {
        switch (error.response.status) {
          case 401:
            // Unauthorized - clear token and redirect to login
            console.error('🔒 Unauthorized access');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            localStorage.removeItem('obsolio-auth-storage');
            localStorage.removeItem('obsolio-tenant-storage');
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
            break;
          case 403:
            notify.error(error.response.data?.message || 'Access Denied');
            break;
          case 404:
            // notify.error('Resource not found'); // Optional
            console.error('🔍 Resource not found:', error.response.data);
            break;
          case 422:
            const firstError = error.response.data.errors ? Object.values(error.response.data.errors)[0]?.[0] : null;
            notify.error(firstError || error.response.data?.message || 'Validation Error');
            break;
          case 429:
            notify.error('Too many requests. Please try again later.');
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            notify.error('Server Error: Something went wrong.');
            break;
          default:
            notify.error(error.response.data?.message || 'An unexpected error occurred.');
        }
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
