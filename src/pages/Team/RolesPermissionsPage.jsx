import { useState } from 'react';
import {
  Shield,
  Edit,
  Plus,
  Users,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import { useUserManagementStore } from '../../store/userManagementStore';
import MainLayout from '../../components/layout/MainLayout';

const RolesPermissionsPage = () => {
  const { roles } = useUserManagementStore();
  const [selectedRole, setSelectedRole] = useState('admin');

  const permissions = [
    {
      id: 'canViewAllAgents',
      name: 'View All Agents',
      description: 'Access to view all AI agents in the organization',
      category: 'Agents',
    },
    {
      id: 'canCreateAgents',
      name: 'Create Agents',
      description: 'Permission to create and configure new AI agents',
      category: 'Agents',
    },
    {
      id: 'canDeployAgents',
      name: 'Deploy Agents',
      description: 'Permission to deploy and schedule AI agents',
      category: 'Agents',
    },
    {
      id: 'canApproveHITL',
      name: 'Approve HITL Tasks',
      description: 'Access to HITL approval queue and decision-making',
      category: 'HITL',
    },
    {
      id: 'canInviteUsers',
      name: 'Invite Users',
      description: 'Permission to invite new team members',
      category: 'Users',
    },
    {
      id: 'canModifyOrgStructure',
      name: 'Modify Organization Structure',
      description: 'Permission to edit branches, departments, projects, and teams',
      category: 'Organization',
    },
    {
      id: 'canManageBilling',
      name: 'Manage Billing',
      description: 'Access to billing, subscriptions, and payment settings',
      category: 'Billing',
    },
    {
      id: 'canConfigureIntegrations',
      name: 'Configure Integrations',
      description: 'Permission to connect and manage third-party integrations',
      category: 'Integrations',
    },
  ];

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) {
      acc[perm.category] = [];
    }
    acc[perm.category].push(perm);
    return acc;
  }, {});

  const currentRole = roles[selectedRole];

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Roles & Permissions</h1>
          <p className="text-secondary-600 mt-1">
            Manage user roles and their permissions
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
          Create Custom Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-secondary-900">Available Roles</h2>
          {Object.keys(roles).map((roleKey) => {
            const role = roles[roleKey];
            const isSelected = selectedRole === roleKey;
            return (
              <Card
                key={roleKey}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-primary-500 bg-primary-50'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedRole(roleKey)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
                      <h3 className={`font-semibold ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                        {role.name}
                      </h3>
                    </div>
                    <p className="text-sm text-secondary-600 mb-3">{role.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>12 users</span>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Permissions Detail */}
        <div className="lg:col-span-2 space-y-6">
          {/* Role Header */}
          <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary-900 mb-2">
                  {currentRole.name}
                </h2>
                <p className="text-primary-700">{currentRole.description}</p>
              </div>
              <Button variant="outline" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
                Edit Role
              </Button>
            </div>
          </Card>

          {/* Permissions by Category */}
          {Object.keys(groupedPermissions).map((category) => (
            <Card key={category}>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700">
                  {category}
                </Badge>
              </h3>
              <div className="space-y-3">
                {groupedPermissions[category].map((permission) => {
                  const hasPermission = currentRole.defaultPermissions[permission.id];
                  return (
                    <div
                      key={permission.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        hasPermission
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      {hasPermission ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium ${hasPermission ? 'text-green-900' : 'text-gray-700'}`}>
                          {permission.name}
                        </p>
                        <p className={`text-sm ${hasPermission ? 'text-green-700' : 'text-gray-600'}`}>
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}

          {/* Permission Summary */}
          <Card className="bg-gray-50">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Permission Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {Object.values(currentRole.defaultPermissions).filter(Boolean).length}
                </div>
                <div className="text-sm text-secondary-600">Permissions Granted</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-3xl font-bold text-secondary-600 mb-1">
                  {Object.values(currentRole.defaultPermissions).filter((v) => !v).length}
                </div>
                <div className="text-sm text-secondary-600">Permissions Denied</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default RolesPermissionsPage;
