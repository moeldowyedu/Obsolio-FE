import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  //User, // unused
  Shield,
  //Building, // unused
  Search,
  CheckCircle,
  Eye,
  UserCog,
  Users,
  //Award, // unused
  Trash2,
  //ListFilter // unused
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { tenantService } from '../../services/tenantService';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import MainLayout from '../../components/layout/MainLayout';

const AllUsersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // State
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modal States
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected User for Actions
  const [selectedUser, setSelectedUser] = useState(null);

  // Constants
  const roles = ['admin', 'manager', 'editor', 'viewer']; // Align with backend roles

  // Fetch Users
  const fetchUsers = async () => {
    if (!user?.tenant_id) return;

    try {
      setIsLoading(true);
      const data = await tenantService.getTenantUsers(user.tenant_id);
      // Ensure we handle both array or { data: [] } response formats
      let userList = Array.isArray(data) ? data : (data.data || []);

      // Safety check: Ensure current user is in the list
      const currentUserExists = userList.some(u => u.id === user.id || u.email === user.email);

      // If the list is empty or current user is missing, manualy add them
      if (!currentUserExists && user) {
        const currentUserDisplay = {
          id: user.id,
          name: user.name || user.full_name || 'Me',
          email: user.email,
          role: user.role || 'admin',
          status: 'active',
          created_at: new Date().toISOString()
        };
        userList = [currentUserDisplay, ...userList];
      }

      setUsers(userList);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Fallback
      if (user) {
        setUsers([{
          id: user.id || 999,
          name: user.name || user.full_name || 'Me',
          email: user.email,
          role: user.role || 'admin',
          status: 'active',
          created_at: new Date().toISOString()
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user?.tenant_id]);

  // Handlers
  const handleInviteUser = async (formData) => {
    try {
      setIsLoading(true);
      await tenantService.inviteUser(user.tenant_id, formData.email, formData.role);
      await fetchUsers();
      setIsInviteModalOpen(false);
    } catch (error) {
      console.error('Invite failed:', error);
      alert(error.response?.data?.message || 'Failed to invite user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRole = async (formData) => {
    if (!selectedUser) return;
    try {
      setIsLoading(true);
      await tenantService.updateUserRole(user.tenant_id, selectedUser.id, formData.role);
      await fetchUsers();
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update user role');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    // Safety check: Prevent deleting self
    if (selectedUser.id === user.id) {
      alert("You cannot remove yourself from the workspace.");
      return;
    }

    try {
      setIsLoading(true);
      await tenantService.removeUser(user.tenant_id, selectedUser.id);
      await fetchUsers();
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to remove user');
    } finally {
      setIsLoading(false);
    }
  };

  // derived state
  const filteredUsers = users.filter(u => {
    const matchesSearch = (u.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.length
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'manager': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'editor': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Header - Dark Text for White Theme */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
            <p className="text-gray-500 mt-1">Manage access and roles for your organization</p>
          </div>
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Invite Member
          </Button>
        </div>

        {/* Stats Cards - White Background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Members</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Administrators</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.admins}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Now</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters & Search - White Background Inputs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          {/* Native Select for easier styling control on light mode */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Roles</option>
            {roles.map(r => (
              <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Users Table - White Background */}
        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex justify-center mb-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                      </div>
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((teamMember) => (
                    <tr key={teamMember.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            {teamMember.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{teamMember.name}</div>
                            <div className="text-sm text-gray-500">{teamMember.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(teamMember.role)}`}>
                          {teamMember.role?.charAt(0).toUpperCase() + teamMember.role?.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-sm text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teamMember.created_at ? new Date(teamMember.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* View Action - Available for everyone */}
                          <button
                            onClick={() => navigate(`/team-users/${teamMember.id}`)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit & Delete - Hidden for self */}
                          {teamMember.id !== user?.id && (
                            <>
                              <button
                                onClick={() => { setSelectedUser(teamMember); setIsEditModalOpen(true); }}
                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Edit Role"
                              >
                                <UserCog className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => { setSelectedUser(teamMember); setIsDeleteModalOpen(true); }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Invite Modal */}
        <FormModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          title="Invite Team Member"
          isLoading={isLoading}
          onSubmit={handleInviteUser}
          initialData={{ email: '', role: 'viewer' }}
        >
          {(data, handleChange) => (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="colleague@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <Select
                  name="role"
                  value={data.role}
                  onChange={handleChange}
                  options={roles.map(r => ({ value: r, label: r.charAt(0).toUpperCase() + r.slice(1) }))}
                />
              </div>
            </div>
          )}
        </FormModal>

        {/* Edit Role Modal */}
        {selectedUser && (
          <FormModal
            isOpen={isEditModalOpen}
            onClose={() => { setIsEditModalOpen(false); setSelectedUser(null); }}
            title={`Edit Role for ${selectedUser.name}`}
            isLoading={isLoading}
            onSubmit={handleUpdateRole}
            initialData={{ role: selectedUser.role || 'viewer' }}
          >
            {(data, handleChange) => (
              <div className="space-y-4">
                <Select
                  label="Role"
                  name="role"
                  value={data.role}
                  onChange={handleChange}
                  options={roles.map(r => ({ value: r, label: r.charAt(0).toUpperCase() + r.slice(1) }))}
                />
              </div>
            )}
          </FormModal>
        )}

        {/* Delete Confirmation */}
        {selectedUser && (
          <ConfirmDialog
            isOpen={isDeleteModalOpen}
            onClose={() => { setIsDeleteModalOpen(false); setSelectedUser(null); }}
            onConfirm={handleDeleteUser}
            title="Remove User?"
            message={`Are you sure you want to remove ${selectedUser.name} from this organization? They will lose all access immediately.`}
            confirmText="Remove User"
            confirmVariant="danger"
            isLoading={isLoading}
          />
        )}

      </div>
    </MainLayout>
  );
};

export default AllUsersPage;
