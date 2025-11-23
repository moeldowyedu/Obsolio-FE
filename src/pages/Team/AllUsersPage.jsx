import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  User,
  Mail,
  Shield,
  Building,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserX,
  CheckCircle,
  Eye,
  UserCog,
  Users,
  Award,
} from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dropdown Options - Define these first before using in state
  const roles = ['admin', 'manager', 'operator', 'reviewer', 'viewer'];
  const departments = ['Management', 'Human Resources', 'Finance', 'Customer Service', 'IT', 'Sales', 'Marketing'];
  const branches = ['Headquarters', 'West Coast Office', 'East Coast Office', 'Europe Office', 'Asia Pacific Office'];
  const statuses = ['active', 'inactive'];

  // CRUD States
  const [isLoading, setIsLoading] = useState(false);

  // Edit User States
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Delete User States
  const [deletingUser, setDeletingUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Deactivate User States
  const [deactivatingUser, setDeactivatingUser] = useState(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  // Invite User States
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteFormData, setInviteFormData] = useState({
    email: '',
    role: 'viewer',
    department: departments[0],
    branch: branches[0],
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'admin',
      department: 'Management',
      branch: 'Headquarters',
      status: 'active',
      lastActive: '5 minutes ago',
      joinedDate: '2020-01-15',
      permissions: ['view_all', 'create', 'deploy', 'approve', 'invite', 'modify', 'billing', 'integrations'],
      accessScope: 'organization',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'manager',
      department: 'Human Resources',
      branch: 'Headquarters',
      status: 'active',
      lastActive: '1 hour ago',
      joinedDate: '2021-03-20',
      permissions: ['view_all', 'create', 'deploy', 'approve', 'invite'],
      accessScope: 'department',
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'manager',
      department: 'Finance',
      branch: 'Headquarters',
      status: 'active',
      lastActive: '30 minutes ago',
      joinedDate: '2021-06-10',
      permissions: ['view_all', 'create', 'deploy', 'approve', 'invite'],
      accessScope: 'department',
    },
    {
      id: 4,
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@company.com',
      role: 'operator',
      department: 'Customer Service',
      branch: 'West Coast Office',
      status: 'active',
      lastActive: '2 hours ago',
      joinedDate: '2022-01-15',
      permissions: ['view_all', 'create', 'deploy'],
      accessScope: 'branch',
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'reviewer',
      department: 'Human Resources',
      branch: 'Headquarters',
      status: 'active',
      lastActive: '10 minutes ago',
      joinedDate: '2022-05-20',
      permissions: ['view_all', 'approve'],
      accessScope: 'department',
    },
    {
      id: 6,
      name: 'Lisa Martinez',
      email: 'lisa.martinez@company.com',
      role: 'operator',
      department: 'Customer Service',
      branch: 'West Coast Office',
      status: 'active',
      lastActive: '5 hours ago',
      joinedDate: '2022-08-10',
      permissions: ['view_all', 'create', 'deploy'],
      accessScope: 'project',
    },
    {
      id: 7,
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      role: 'viewer',
      department: 'Operations',
      branch: 'European Hub',
      status: 'inactive',
      lastActive: '3 days ago',
      joinedDate: '2023-02-14',
      permissions: ['view_all'],
      accessScope: 'project',
    },
  ]);



  const departmentFilters = ['all', ...new Set(users.map((u) => u.department))];

  // CRUD Functions

  // Edit User
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (formData) => {
    // Validation
    if (!formData.name || !formData.name.trim()) {
      alert('Name is required');
      return;
    }

    if (!formData.email || !formData.email.trim()) {
      alert('Email is required');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setUsers(users.map(user =>
        user.id === editingUser.id
          ? { ...user, ...formData }
          : user
      ));

      setIsLoading(false);
      setIsEditModalOpen(false);
      setEditingUser(null);
    }, 500);
  };

  // Delete User
  const handleDeleteUser = (user) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setUsers(users.filter(user => user.id !== deletingUser.id));

      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
    }, 500);
  };

  // Deactivate/Activate User
  const handleDeactivateUser = (user) => {
    setDeactivatingUser(user);
    setIsDeactivateModalOpen(true);
  };

  const handleConfirmDeactivate = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setUsers(users.map(user =>
        user.id === deactivatingUser.id
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      ));

      setIsLoading(false);
      setIsDeactivateModalOpen(false);
      setDeactivatingUser(null);
    }, 500);
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-700 border-red-300',
      manager: 'bg-blue-100 text-blue-700 border-blue-300',
      operator: 'bg-green-100 text-green-700 border-green-300',
      reviewer: 'bg-purple-100 text-purple-700 border-purple-300',
      viewer: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[role] || colors.viewer;
  };

  const getRoleIcon = (role) => {
    const icons = {
      admin: Shield,
      manager: UserCog,
      operator: Users,
      reviewer: Award,
      viewer: Eye,
    };
    return icons[role] || User;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    return colors[status] || colors.inactive;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesDepartment =
      departmentFilter === 'all' || user.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === 'active').length,
    admins: users.filter((u) => u.role === 'admin').length,
    managers: users.filter((u) => u.role === 'manager').length,
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">All Users</h1>
            <p className="text-secondary-600 mt-1">
              Manage team members and their access
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => setIsInviteModalOpen(true)}
          >
            Invite User
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
                <div className="text-sm text-blue-700">Total Users</div>
              </div>
              <User className="w-10 h-10 text-blue-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.active}</div>
                <div className="text-sm text-green-700">Active</div>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-900">{stats.admins}</div>
                <div className="text-sm text-red-700">Admins</div>
              </div>
              <Shield className="w-10 h-10 text-red-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-900">{stats.managers}</div>
                <div className="text-sm text-purple-700">Managers</div>
              </div>
              <Building className="w-10 h-10 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
                fullWidth
              />
            </div>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'admin', label: 'Admin' },
                { value: 'manager', label: 'Manager' },
                { value: 'operator', label: 'Operator' },
                { value: 'reviewer', label: 'Reviewer' },
                { value: 'viewer', label: 'Viewer' },
              ]}
              className="min-w-[180px]"
            />
            <Select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              options={departmentFilters.map((dept) => ({
                value: dept,
                label: dept === 'all' ? 'All Departments' : dept,
              }))}
              className="min-w-[200px]"
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' },
              ]}
              className="min-w-[180px]"
            />
          </div>
        </Card>

        {/* Users Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                    Access Scope
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-secondary-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{user.name}</p>
                          <p className="text-sm text-secondary-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const IconComponent = getRoleIcon(user.role);
                          return <IconComponent className="w-4 h-4" />;
                        })()}
                        <Badge className={getRoleColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-secondary-900">
                        <Building className="w-4 h-4 text-gray-400" />
                        {user.department}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary-900 capitalize">
                        {user.accessScope.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary-600">{user.lastActive}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/team-users/${user.id}`)}
                          disabled={isLoading}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          disabled={isLoading}
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeactivateUser(user)}
                          disabled={isLoading}
                          title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          <UserX className="w-4 h-4 text-orange-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredUsers.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">No Users Found</h3>
              <p className="text-secondary-600">
                {searchTerm || roleFilter !== 'all' || departmentFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by inviting your first team member'}
              </p>
            </div>
          </Card>
        )}

        {/* Edit User Modal */}
        {isEditModalOpen && editingUser && (
          <FormModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingUser(null);
            }}
            title="Edit User"
            onSubmit={handleUpdateUser}
            initialData={{
              name: editingUser.name,
              email: editingUser.email,
              role: editingUser.role,
              department: editingUser.department,
              branch: editingUser.branch,
              status: editingUser.status,
            }}
            isLoading={isLoading}
          >
            {(formData, handleChange) => (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors capitalize"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role} className="capitalize">
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Branch
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  >
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors capitalize"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status} className="capitalize">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </FormModal>
        )}

        {/* Delete User Confirmation Dialog */}
        {isDeleteModalOpen && deletingUser && (
          <ConfirmDialog
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setDeletingUser(null);
            }}
            onConfirm={handleConfirmDelete}
            title="Delete User"
            message={
              <>
                Are you sure you want to delete{' '}
                <strong className="text-secondary-900">{deletingUser.name}</strong>?{' '}
                This action cannot be undone and will remove all associated data.
              </>
            }
            confirmText="Delete User"
            confirmVariant="danger"
            isLoading={isLoading}
          />
        )}

        {/* Deactivate/Activate User Confirmation Dialog */}
        {isDeactivateModalOpen && deactivatingUser && (
          <ConfirmDialog
            isOpen={isDeactivateModalOpen}
            onClose={() => {
              setIsDeactivateModalOpen(false);
              setDeactivatingUser(null);
            }}
            onConfirm={handleConfirmDeactivate}
            title={deactivatingUser.status === 'active' ? 'Deactivate User' : 'Activate User'}
            message={
              deactivatingUser.status === 'active' ? (
                <>
                  Are you sure you want to deactivate{' '}
                  <strong className="text-secondary-900">{deactivatingUser.name}</strong>?{' '}
                  They will lose access to all systems immediately.
                </>
              ) : (
                <>
                  Are you sure you want to activate{' '}
                  <strong className="text-secondary-900">{deactivatingUser.name}</strong>?{' '}
                  They will regain access to all previously assigned systems.
                </>
              )
            }
            confirmText={deactivatingUser.status === 'active' ? 'Deactivate' : 'Activate'}
            confirmVariant={deactivatingUser.status === 'active' ? 'warning' : 'primary'}
            isLoading={isLoading}
          />
        )}
        {/* Invite User Modal */}
        <FormModal
          isOpen={isInviteModalOpen}
          onClose={() => {
            setIsInviteModalOpen(false);
            setInviteFormData({
              email: '',
              role: 'viewer',
              department: departments[0],
              branch: branches[0],
            });
          }}
          title="Invite User"
          onSubmit={(formData) => {
            // Validation
            if (!formData.email || !formData.email.trim()) {
              alert('Email is required');
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
              alert('Please enter a valid email address');
              return;
            }

            setIsLoading(true);

            // Simulate API call
            setTimeout(() => {
              const newUser = {
                id: Math.max(...users.map(u => u.id), 0) + 1,
                name: formData.email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                email: formData.email,
                role: formData.role,
                department: formData.department,
                branch: formData.branch,
                status: 'pending',
                lastActive: 'Never',
                joinedDate: new Date().toISOString().split('T')[0],
                permissions: [],
                accessScope: 'project',
              };

              setUsers([...users, newUser]);
              setIsLoading(false);
              setIsInviteModalOpen(false);
              setInviteFormData({
                email: '',
                role: 'viewer',
                department: departments[0],
                branch: branches[0],
              });
            }, 500);
          }}
          initialData={inviteFormData}
          isLoading={isLoading}
        >
          {(formData, handleChange) => (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="user@company.com"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">An invitation email will be sent to this address</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors capitalize"
                >
                  {roles.map((role) => (
                    <option key={role} value={role} className="capitalize">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Branch
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                >
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </FormModal>
      </div>
    </MainLayout>
  );
};

export default AllUsersPage;
