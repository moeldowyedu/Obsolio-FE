import { useState } from 'react';
import { Shield, Plus, Trash2, Check } from 'lucide-react';
import Input from '../../common/Input/Input';
import Toggle from '../../common/Toggle/Toggle';
import Button from '../../common/Button/Button';
import { useRegistrationWizardStore } from '../../../store/registrationWizardStore';

const RolesPermissionsStep = ({ onNext, onBack }) => {
  const { organizationData, setRolePermissions, addCustomRole, removeCustomRole } =
    useRegistrationWizardStore();

  const [selectedRole, setSelectedRole] = useState('admin');
  const [isAddingCustomRole, setIsAddingCustomRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  // Default roles with their permissions
  const defaultRoles = [
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full access to all features and settings',
      icon: '👑',
      color: 'bg-red-100 text-red-700',
      defaultPermissions: {
        canCreateAgents: true,
        canDeployAgents: true,
        canApproveHITL: true,
        canViewAllData: true,
        canInviteUsers: true,
        canModifyOrgStructure: true,
        canManageBilling: true,
        canConfigureIntegrations: true,
      },
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Department or branch-level management',
      icon: '👔',
      color: 'bg-blue-100 text-blue-700',
      defaultPermissions: {
        canCreateAgents: true,
        canDeployAgents: true,
        canApproveHITL: true,
        canViewAllData: false,
        canInviteUsers: true,
        canModifyOrgStructure: false,
        canManageBilling: false,
        canConfigureIntegrations: false,
      },
    },
    {
      id: 'team-lead',
      name: 'Team Lead',
      description: 'Team-level access and collaboration',
      icon: '🎯',
      color: 'bg-green-100 text-green-700',
      defaultPermissions: {
        canCreateAgents: true,
        canDeployAgents: false,
        canApproveHITL: true,
        canViewAllData: false,
        canInviteUsers: false,
        canModifyOrgStructure: false,
        canManageBilling: false,
        canConfigureIntegrations: false,
      },
    },
    {
      id: 'operator',
      name: 'Agent Operator',
      description: 'Can run agents and view results',
      icon: '⚙️',
      color: 'bg-purple-100 text-purple-700',
      defaultPermissions: {
        canCreateAgents: false,
        canDeployAgents: false,
        canApproveHITL: false,
        canViewAllData: false,
        canInviteUsers: false,
        canModifyOrgStructure: false,
        canManageBilling: false,
        canConfigureIntegrations: false,
      },
    },
    {
      id: 'reviewer',
      name: 'Reviewer',
      description: 'HITL approver with review permissions',
      icon: '✅',
      color: 'bg-yellow-100 text-yellow-700',
      defaultPermissions: {
        canCreateAgents: false,
        canDeployAgents: false,
        canApproveHITL: true,
        canViewAllData: false,
        canInviteUsers: false,
        canModifyOrgStructure: false,
        canManageBilling: false,
        canConfigureIntegrations: false,
      },
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to assigned resources',
      icon: '👁️',
      color: 'bg-gray-100 text-gray-700',
      defaultPermissions: {
        canCreateAgents: false,
        canDeployAgents: false,
        canApproveHITL: false,
        canViewAllData: false,
        canInviteUsers: false,
        canModifyOrgStructure: false,
        canManageBilling: false,
        canConfigureIntegrations: false,
      },
    },
  ];

  const [rolePermissions, setRolePermissionsState] = useState(() => {
    const initial = {};
    defaultRoles.forEach((role) => {
      initial[role.id] = organizationData.roles[role.id] || role.defaultPermissions;
    });
    return initial;
  });

  const permissionsList = [
    {
      id: 'canCreateAgents',
      label: 'Create Agents',
      description: 'Ability to create and configure new AI agents',
    },
    {
      id: 'canDeployAgents',
      label: 'Deploy Agents',
      description: 'Permission to deploy agents to production',
    },
    {
      id: 'canApproveHITL',
      label: 'Approve HITL Tasks',
      description: 'Can approve or reject Human-in-the-Loop requests',
    },
    {
      id: 'canViewAllData',
      label: 'View All Data',
      description: 'Access to view all organizational data',
    },
    {
      id: 'canInviteUsers',
      label: 'Invite Users',
      description: 'Ability to invite and manage users',
    },
    {
      id: 'canModifyOrgStructure',
      label: 'Modify Organization Structure',
      description: 'Can modify departments, branches, and teams',
    },
    {
      id: 'canManageBilling',
      label: 'Manage Billing',
      description: 'Access to billing and subscription settings',
    },
    {
      id: 'canConfigureIntegrations',
      label: 'Configure Integrations',
      description: 'Set up and manage third-party integrations',
    },
  ];

  const handlePermissionToggle = (roleId, permissionId) => {
    setRolePermissionsState((prev) => {
      const updated = {
        ...prev,
        [roleId]: {
          ...prev[roleId],
          [permissionId]: !prev[roleId][permissionId],
        },
      };
      setRolePermissions(roleId, updated[roleId]);
      return updated;
    });
  };

  const handleAddCustomRole = () => {
    if (newRoleName.trim()) {
      addCustomRole({
        name: newRoleName,
        description: newRoleDescription,
        permissions: {
          canCreateAgents: false,
          canDeployAgents: false,
          canApproveHITL: false,
          canViewAllData: false,
          canInviteUsers: false,
          canModifyOrgStructure: false,
          canManageBilling: false,
          canConfigureIntegrations: false,
        },
      });
      setNewRoleName('');
      setNewRoleDescription('');
      setIsAddingCustomRole(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const currentRole = defaultRoles.find((r) => r.id === selectedRole);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">User Roles & Permissions</h2>
        <p className="text-secondary-600">
          Configure access levels for different user roles in your organization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Role Selection Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-secondary-900 mb-3">Roles</h3>
          <div className="space-y-2">
            {defaultRoles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedRole === role.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{role.icon}</span>
                  <span className="font-medium text-secondary-900">{role.name}</span>
                </div>
                <p className="text-xs text-secondary-600">{role.description}</p>
              </button>
            ))}

            {/* Custom Roles */}
            {organizationData.customRoles.map((role) => (
              <div
                key={role.id}
                className="p-3 rounded-lg border-2 border-gray-200 bg-white flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-secondary-900">{role.name}</span>
                  </div>
                  {role.description && (
                    <p className="text-xs text-secondary-600">{role.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeCustomRole(role.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add Custom Role */}
            {isAddingCustomRole ? (
              <div className="p-3 rounded-lg border-2 border-primary-600 bg-primary-50 space-y-2">
                <Input
                  placeholder="Role name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  fullWidth
                />
                <Input
                  placeholder="Description (optional)"
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  fullWidth
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleAddCustomRole}
                    leftIcon={<Check className="w-3.5 h-3.5" />}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsAddingCustomRole(false);
                      setNewRoleName('');
                      setNewRoleDescription('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingCustomRole(true)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-secondary-600 hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Custom Role</span>
              </button>
            )}
          </div>
        </div>

        {/* Permissions Panel */}
        <div className="lg:col-span-2">
          {currentRole && (
            <>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`px-4 py-2 rounded-lg ${currentRole.color} text-2xl`}>
                    {currentRole.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900">{currentRole.name}</h3>
                    <p className="text-sm text-secondary-600">{currentRole.description}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-secondary-900 mb-4">Permissions</h4>
                <div className="space-y-4">
                  {permissionsList.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 mr-4">
                        <h5 className="font-medium text-secondary-900 mb-1">{permission.label}</h5>
                        <p className="text-sm text-secondary-600">{permission.description}</p>
                      </div>
                      <Toggle
                        checked={rolePermissions[selectedRole]?.[permission.id] || false}
                        onChange={() => handlePermissionToggle(selectedRole, permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
        <div className="flex-shrink-0">
          <Shield className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Role-Based Access Control</h4>
          <p className="text-sm text-blue-700">
            Roles determine what users can do in your organization. You can use the default roles
            or create custom ones. Permissions can be adjusted at any time after setup. The first
            user (you) will automatically be assigned the Admin role.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack} type="button">
            Back
          </Button>
          <Button type="submit" variant="primary" size="lg" className="min-w-[200px]">
            Continue to Plan Selection
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RolesPermissionsStep;
