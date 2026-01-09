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
    // Check if we need to send as FormData (only if there's a file)
    const hasFile = userData.organizationLogo instanceof File;

    if (hasFile) {
      console.log('📤 Sending registration as FormData (Multipart)');
      const formData = new FormData();

      // Core Fields
      formData.append('fullName', userData.fullName || userData.firstName + ' ' + userData.lastName);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('password_confirmation', userData.password_confirmation || userData.password); // Ensure confirmation is sent
      formData.append('subdomain', userData.tenantUrl || userData.slug || userData.subdomain);

      // Extended Fields
      if (userData.country) formData.append('country', userData.country);
      if (userData.phone) formData.append('phone', userData.phone);
      // Removed 'plan' and 'type' - handled by backend

      // Organization Specific Fields
      const orgFullName = userData.organizationFullName || userData.organizationName;
      if (orgFullName) formData.append('organizationFullName', orgFullName);
      if (userData.organizationShortName) formData.append('organizationShortName', userData.organizationShortName);
      if (userData.organizationLogo) formData.append('organizationLogo', userData.organizationLogo);

      const response = await api.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Backend does NOT return token on registration anymore (requires verification)
      // Return response data directly
      return response.data;

    } else {
      console.log('📤 Sending registration as JSON');
      const payload = {
        fullName: userData.fullName || (userData.firstName + ' ' + userData.lastName),
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation || userData.password,
        subdomain: userData.tenantUrl || userData.slug || userData.subdomain,
        country: userData.country,
        phone: userData.phone,
        // Removed 'plan' and 'type'
      };

      const orgFullName = userData.organizationFullName || userData.organizationName;
      if (orgFullName) payload.organizationFullName = orgFullName;
      if (userData.organizationShortName) payload.organizationShortName = userData.organizationShortName;

      const response = await api.post('/auth/register', payload);

      // Backend does NOT return token on registration anymore (requires verification)
      // Return response data directly
      return response.data;
    }
  },

  // Logout
  logout: async () => {
    // IMPORTANT: Clear local state FIRST for instant logout UX
    // Then call server in background (fire and forget)

    // Step 1: Clear all localStorage items immediately
    const authKeys = ['auth_token', 'user', 'current_tenant_id', 'obsolio-auth-storage'];
    authKeys.forEach(key => {
      localStorage.removeItem(key);
    });

    // Step 2: Clear all auth cookies immediately
    const { deleteAllAuthCookies } = await import('../utils/cookieUtils');
    deleteAllAuthCookies();

    console.log('✅ Local session cleared instantly (localStorage + cookies)');

    // Step 3: Call server logout in background (don't await - fire and forget)
    // This ensures fast logout even if server is slow
    api.post('/auth/logout')
      .then(() => {
        console.log('✅ Server session destroyed');
      })
      .catch((error) => {
        console.warn('⚠️ Server logout failed (non-blocking):', error);
      });

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
  // Note: /dashboard/stats endpoint does not exist
  // This method is deprecated - use specific statistics endpoints from adminService instead
};

export default authService;
