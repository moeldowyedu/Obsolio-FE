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
      // Call server logout endpoint to destroy session
      await api.post('/auth/logout');
      console.log('✅ Server session destroyed');
    } catch (error) {
      // Don't block logout if server call fails
      console.warn('⚠️ Server logout failed, clearing local session anyway', error);
    }

    // Clear all localStorage items related to auth
    const authKeys = ['auth_token', 'user', 'current_tenant_id', 'obsolio-auth-storage'];
    authKeys.forEach(key => {
      localStorage.removeItem(key);
    });

    // Clear all auth cookies (cross-domain)
    // Import deleteAllAuthCookies at the top of the file
    const { deleteAllAuthCookies } = await import('../utils/cookieUtils');
    deleteAllAuthCookies();

    console.log('✅ Local session cleared (localStorage + cookies)');

    // Note: We don't redirect here - let the caller handle navigation
    // This allows different contexts (tenant vs marketing) to redirect appropriately
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
  verifyEmail: async (id, hash, query) => {
    // Backend uses /auth/email/verify/{id}/{hash} for signed URLs
    // We also add X-Forwarded-Host to ensure the signature validates against the frontend domain
    const response = await api.get(`/verify-email/${id}/${hash}${query || ''}`, {
      headers: {
        'X-Forwarded-Host': window.location.host
      }
    });
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
      // Backend now supports GET /tenants/check-availability/{subdomain}
      const response = await api.get(`/tenants/check-availability/${subdomain}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // If the endpoint returns 404 for a specific subdomain check, 
        // it logically means "not found" -> "available".
        return { available: true, message: 'Domain is available' };
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
