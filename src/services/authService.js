import api from './api';

const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    // Laravel backend returns { success: true, data: { user, token } }
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      // Store tenant ID if available to ensure X-Tenant-ID header is sent
      if (response.data.data.user.tenant_id) {
        localStorage.setItem('current_tenant_id', response.data.data.user.tenant_id);
      }
    }
    return response.data.data;
  },

  // Register
  register: async (userData) => {
    // Create FormData for file upload support
    const formData = new FormData();

    // Core Fields
    formData.append('type', userData.type || 'personal');
    formData.append('fullName', userData.fullName || userData.firstName + ' ' + userData.lastName);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('password_confirmation', userData.password); // Laravel confirmation
    // Subdomain is now required for ALL types
    formData.append('subdomain', userData.tenantUrl || userData.slug || userData.subdomain);

    // Extended Fields
    if (userData.country) formData.append('country', userData.country);
    if (userData.phone) formData.append('phone', userData.phone);

    // Organization Specific Fields
    if (userData.type === 'organization') {
      if (userData.organizationName) {
        formData.append('organizationFullName', userData.organizationName);
      }
      if (userData.organizationShortName) {
        formData.append('organizationShortName', userData.organizationShortName);
      }
      // Handle file upload
      if (userData.organizationLogo instanceof File) {
        formData.append('organizationLogo', userData.organizationLogo);
      }
      // Legacy/Optional domain field if still used by backend
      if (userData.organizationDomain) {
        formData.append('organizationDomain', userData.organizationDomain);
      }
    }

    console.log('📤 Sending registration FormData');

    // Send as multipart/form-data (axios handles this automatically with FormData)
    const response = await api.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Check if email verification is required
    if (response.data.emailVerificationRequired) {
      return {
        emailVerificationRequired: true,
        ...response.data
      };
    }

    // Auto-login after registration by saving token and user
    if (response.data?.success && response.data?.data?.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data;
    }

    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('current_tenant_id');
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset Password
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      token,
      password: newPassword,
    });
    return response.data;
  },

  // Verify Email
  verifyEmail: async (id, hash) => {
    // If backend uses /email/verify/{id}/{hash}, we construct url. 
    // Or if it uses ?token=... we use that.
    // Based on user request context: "GET /api/email/verify/{id}/{hash}"
    const response = await api.get(`/email/verify/${id}/${hash}`);
    return response.data;
  },

  // Resend Verification Email
  resendVerificationEmail: async (email) => {
    try {
      const response = await api.post('/auth/email/resend', { email });
      return response.data;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  },

  // Get Current User
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data.data;
    }
    return response.data.data;
  },

  // Update Profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data.data;
    }
    return response.data.data;
  },

  // Change Password
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },

  // Refresh Token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  // Check Domain Availability
  checkDomainAvailability: async (subdomain) => {
    try {
      const response = await api.get(`/tenants/check-availability/${subdomain}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // If 404, usually means not found, which might mean available? 
        // Or if the endpoint creates/checks, it depends.
        // Assuming strict availability check endpoint: returns { available: boolean }
        return { available: false, message: 'Availability check failed' };
      }
      throw error;
    }
  },

  // Get Dashboard Stats
  getDashboardStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
};

export default authService;
