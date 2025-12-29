import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import AdminLayout from '../../components/layout/AdminLayout';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';
import {
  Shield, Plus, Search, Edit, Trash2, X, Check, Users, Lock
} from 'lucide-react';

const RBACManagementPage = () => {
  const { theme } = useTheme();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await adminService.getRoles();
      const rolesData = response.data?.data || response.data || response || [];
      setRoles(rolesData);
    } catch (error) {
      console.error('Error fetching roles:', error);
      notify.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await adminService.getPermissions();
      const permsData = response.data?.data || response.data || response || [];
      setPermissions(permsData);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.createRole(formData);
      notify.success('Role created successfully');
      setShowCreateModal(false);
      resetForm();
      fetchRoles();
    } catch (error) {
      console.error('Error creating role:', error);
      notify.error('Failed to create role');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.updateRole(selectedRole.id, formData);
      notify.success('Role updated successfully');
      setShowEditModal(false);
      resetForm();
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      notify.error('Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (!confirm('Are you sure you want to delete this role?')) return;

    setLoading(true);
    try {
      await adminService.deleteRole(roleId);
      notify.success('Role deleted successfully');
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      notify.error('Failed to delete role');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description || '',
      permissions: role.permissions?.map(p => p.id) || [],
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      permissions: [],
    });
    setSelectedRole(null);
  };

  const togglePermission = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-purple-500" />
                <h1
                  className={`text-3xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  RBAC Management
                </h1>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Manage console admin roles and permissions
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Role
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Roles
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {roles.length}
                </p>
              </div>
              <Shield className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Permissions
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {permissions.length}
                </p>
              </div>
              <Lock className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Admin Users
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {roles.reduce((sum, role) => sum + (role.users_count || 0), 0)}
                </p>
              </div>
              <Users className="w-10 h-10 text-green-500" />
            </div>
          </div>
        </div>

        {/* Roles List */}
        <div
          className={`rounded-xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          {loading && roles.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : roles.length === 0 ? (
            <div className="text-center py-12">
              <Shield
                className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`}
              />
              <p
                className={`text-lg ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                No roles found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className={
                    theme === 'dark'
                      ? 'bg-gray-900/50 border-b border-gray-700'
                      : 'bg-gray-50 border-b border-gray-200'
                  }
                >
                  <tr>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Role Name
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Description
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Permissions
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Users
                    </th>
                    <th
                      className={`px-6 py-4 text-right text-xs font-semibold uppercase ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {roles.map((role) => (
                    <tr
                      key={role.id}
                      className={`${
                        theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div
                              className={`font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {role.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {role.description || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions?.slice(0, 3).map((perm) => (
                            <span
                              key={perm.id}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                theme === 'dark'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {perm.name}
                            </span>
                          ))}
                          {role.permissions?.length > 3 && (
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                theme === 'dark'
                                  ? 'bg-gray-700 text-gray-400'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              +{role.permissions.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {role.users_count || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(role)}
                            className={`p-2 rounded-lg ${
                              theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {!role.is_system && (
                            <button
                              onClick={() => handleDeleteRole(role.id)}
                              className={`p-2 rounded-lg ${
                                theme === 'dark'
                                  ? 'hover:bg-red-900/30 text-gray-400 hover:text-red-400'
                                  : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
                              }`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create/Edit Role Modal */}
        {(showCreateModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              className={`w-full max-w-2xl rounded-2xl ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Modal Header */}
              <div
                className={`px-6 py-4 border-b flex items-center justify-between ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <h3
                  className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {showCreateModal ? 'Create New Role' : 'Edit Role'}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={showCreateModal ? handleCreateRole : handleUpdateRole} className="p-6 space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Role Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="e.g., System Administrator"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Brief description of this role..."
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Permissions
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-3 rounded-lg border border-gray-600">
                    {permissions.map((permission) => (
                      <label
                        key={permission.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                          formData.permissions.includes(permission.id)
                            ? 'bg-purple-500/20'
                            : theme === 'dark'
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="rounded"
                        />
                        <span
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {permission.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 font-medium"
                  >
                    {loading ? 'Saving...' : showCreateModal ? 'Create Role' : 'Update Role'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RBACManagementPage;
