import api from './api';

const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    // Laravel backend returns { success: true, data: { user, token } }
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data.data;
  },

  // Register
  register: async (userData) => {
    // Transform frontend data to match backend API expectations
    // Only send fields that backend database supports
    const requestData = {
      name: userData.firstName && userData.lastName
        ? `${userData.firstName} ${userData.lastName}`.trim()
        : userData.name || userData.email?.split('@')[0] || 'User',
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password, // Laravel expects this
      phone: userData.phone, // Required field
    };

    // Only add optional fields if backend supports them
    // Note: tenant_type, plan removed - database doesn't have these columns

    console.log('📤 Sending registration data:', requestData);

    const response = await api.post('/auth/register', requestData);

    // Auto-login after registration by saving token and user
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data.data;
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
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
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

  // Get Dashboard Stats
  getDashboardStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
};

export default authService;
