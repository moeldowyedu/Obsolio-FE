import { useState } from 'react';
import { UserPlus, Shield, Mail, MoreVertical, Search, Filter } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const UsersRolesPage = () => {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Admin',
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 15),
      avatar: 'https://i.pravatar.cc/150?img=1',
      agentsManaged: 12
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Developer',
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
      avatar: 'https://i.pravatar.cc/150?img=12',
      agentsManaged: 8
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@company.com',
      role: 'Reviewer',
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 30),
      avatar: 'https://i.pravatar.cc/150?img=45',
      agentsManaged: 5
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Viewer',
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
      avatar: 'https://i.pravatar.cc/150?img=33',
      agentsManaged: 0
    },
    {
      id: '5',
      name: 'Lisa Williams',
      email: 'lisa.w@company.com',
      role: 'Developer',
      status: 'invited',
      lastActive: null,
      avatar: 'https://i.pravatar.cc/150?img=49',
      agentsManaged: 0
    }
  ]);

  const roles = [
    {
      name: 'Admin',
      color: 'bg-red-100 text-red-700 border-red-200',
      permissions: ['Full access', 'User management', 'Billing', 'All agents'],
      count: users.filter(u => u.role === 'Admin').length
    },
    {
      name: 'Developer',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      permissions: ['Create agents', 'Modify agents', 'Deploy agents', 'API access'],
      count: users.filter(u => u.role === 'Developer').length
    },
    {
      name: 'Reviewer',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      permissions: ['View agents', 'HITL approvals', 'Activity logs', 'Reports'],
      count: users.filter(u => u.role === 'Reviewer').length
    },
    {
      name: 'Viewer',
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      permissions: ['View agents', 'View reports', 'Read-only access'],
      count: users.filter(u => u.role === 'Viewer').length
    }
  ];

  const getRoleBadge = (role) => {
    const roleConfig = roles.find(r => r.name === role);
    if (!roleConfig) return null;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${roleConfig.color}`}>
        {role}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
          Active
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
        Invited
      </span>
    );
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary-600" />
                Users & Roles
              </h1>
              <p className="text-gray-600 mt-2">
                Manage team members, roles, and permissions
              </p>
            </div>
            <button className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Invite User
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Users</div>
            <div className="text-3xl font-bold text-gray-900">{users.length}</div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Active Users</div>
            <div className="text-3xl font-bold text-green-600">
              {users.filter(u => u.status === 'active').length}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Pending Invites</div>
            <div className="text-3xl font-bold text-yellow-600">
              {users.filter(u => u.status === 'invited').length}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Roles</div>
            <div className="text-3xl font-bold text-gray-900">{roles.length}</div>
          </div>
        </div>

        {/* Roles Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Roles & Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <div key={role.name} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{role.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${role.color}`}>
                    {role.count} users
                  </span>
                </div>
                <ul className="space-y-2">
                  {role.permissions.map((permission, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="glass-input w-full pl-10"
            />
          </div>
          <button className="glass-btn-secondary rounded-xl px-4 py-3 inline-flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Users Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Agents Managed
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{user.agentsManaged}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {user.lastActive ? user.lastActive.toLocaleString() : 'Never'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="glass-btn-secondary rounded-lg px-3 py-2 inline-flex items-center">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 glass-card rounded-2xl p-6 bg-gradient-to-r from-primary-50 to-purple-50">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">🔒 Role-Based Access Control</h4>
              <p className="text-gray-700 text-sm">
                Control exactly what each team member can see and do with granular role-based permissions.
                Admins have full access, Developers can create and manage agents, Reviewers handle HITL approvals,
                and Viewers have read-only access to reports and analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UsersRolesPage;
