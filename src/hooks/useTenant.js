import { useState, useEffect } from 'react';
import { tenantService } from '../services/tenantService';

export const useTenants = () => {
  const [tenants, setTenants] = useState([]);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTenants();
    fetchCurrentTenant();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const data = await tenantService.getTenants();
      setTenants(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentTenant = async () => {
    try {
      const data = await tenantService.getCurrentTenant();
      setCurrentTenant(data);
    } catch (err) {
      console.error('Failed to fetch current tenant:', err);
    }
  };

  const switchTenant = async (tenantId) => {
    try {
      const data = await tenantService.switchTenant(tenantId);
      setCurrentTenant(data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    tenants,
    currentTenant,
    loading,
    error,
    switchTenant,
    refetch: fetchTenants
  };
};

export const useTenantSettings = (tenantId) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tenantId) {
      fetchSettings();
    }
  }, [tenantId]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await tenantService.getTenantSettings(tenantId);
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const result = await tenantService.updateTenantSettings(tenantId, newSettings);
      setSettings(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
    refetch: fetchSettings
  };
};

export const useTenantUsers = (tenantId) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tenantId) {
      fetchUsers();
    }
  }, [tenantId]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await tenantService.getTenantUsers(tenantId);
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inviteUser = async (userData) => {
    try {
      await tenantService.inviteUser(tenantId, userData);
      await fetchUsers(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  const removeUser = async (userId) => {
    try {
      await tenantService.removeUser(tenantId, userId);
      await fetchUsers(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  const updateUserRole = async (userId, role) => {
    try {
      await tenantService.updateUserRole(tenantId, userId, role);
      await fetchUsers(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    inviteUser,
    removeUser,
    updateUserRole,
    refetch: fetchUsers
  };
};
