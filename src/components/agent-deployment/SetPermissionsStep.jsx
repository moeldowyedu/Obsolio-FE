import { Eye, Lock, Play, Shield, Users, Building2, FolderKanban } from 'lucide-react';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import { useAgentDeploymentStore } from '../../store/agentDeploymentStore';

const SetPermissionsStep = ({ onNext, onBack }) => {
  const { permissions, updatePermissions } = useAgentDeploymentStore();

  const visibilityOptions = [
    {
      id: 'private',
      title: 'Private (Only Me)',
      description: 'Only you can see this agent and its results',
      icon: Lock,
      color: 'bg-gray-500',
    },
    {
      id: 'department',
      title: 'Department',
      description: 'All members of the assigned department can view',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: 'project',
      title: 'Project Team',
      description: 'Members of the assigned project can view',
      icon: FolderKanban,
      color: 'bg-purple-500',
    },
    {
      id: 'branch',
      title: 'Branch',
      description: 'All staff in the assigned branch can view',
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      id: 'organization',
      title: 'Organization-Wide',
      description: 'Everyone in the organization can view',
      icon: Eye,
      color: 'bg-orange-500',
    },
  ];

  const modifyPermissionOptions = [
    {
      id: 'creator',
      title: 'Creator Only',
      description: 'Only you can modify agent configuration',
      icon: Lock,
    },
    {
      id: 'managers',
      title: 'Department Managers',
      description: 'Department managers can modify settings',
      icon: Users,
    },
    {
      id: 'admins',
      title: 'Admins Only',
      description: 'Only organization admins can modify',
      icon: Shield,
    },
  ];

  const triggerPermissionOptions = [
    {
      id: 'supervisor',
      title: 'Supervisor Only',
      description: 'Only assigned supervisors can trigger',
      icon: Shield,
    },
    {
      id: 'department',
      title: 'Department Members',
      description: 'Anyone in the department can trigger',
      icon: Users,
    },
    {
      id: 'operators',
      title: 'Agent Operators',
      description: 'Anyone with Agent Operator role',
      icon: Play,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Set Permissions & Visibility</h2>
        <p className="text-secondary-600">
          Control who can see, modify, and trigger this agent
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Visibility */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary-600" />
            Who Can View This Agent?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibilityOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = permissions.visibility === option.id;

              return (
                <Card
                  key={option.id}
                  onClick={() => updatePermissions({ visibility: option.id })}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'border-2 border-primary-600 shadow-lg'
                      : 'border border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">{option.title}</h4>
                      <p className="text-sm text-secondary-600">{option.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Modify Permissions */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary-600" />
            Who Can Modify This Agent?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modifyPermissionOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = permissions.canModify === option.id;

              return (
                <Card
                  key={option.id}
                  onClick={() => updatePermissions({ canModify: option.id })}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'border-2 border-primary-600 shadow-lg'
                      : 'border border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className={`w-12 h-12 ${isSelected ? 'bg-primary-600' : 'bg-gray-200'} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                    </div>
                    <h4 className="font-semibold text-secondary-900 mb-1">{option.title}</h4>
                    <p className="text-sm text-secondary-600">{option.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trigger Permissions */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-primary-600" />
            Who Can Trigger Manual Runs?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {triggerPermissionOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = permissions.canTrigger === option.id;

              return (
                <Card
                  key={option.id}
                  onClick={() => updatePermissions({ canTrigger: option.id })}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'border-2 border-primary-600 shadow-lg'
                      : 'border border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className={`w-12 h-12 ${isSelected ? 'bg-primary-600' : 'bg-gray-200'} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                    </div>
                    <h4 className="font-semibold text-secondary-900 mb-1">{option.title}</h4>
                    <p className="text-sm text-secondary-600">{option.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-3">Permission Summary</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <span className="font-medium">Visibility:</span>{' '}
              {visibilityOptions.find((o) => o.id === permissions.visibility)?.title}
            </p>
            <p>
              <span className="font-medium">Can Modify:</span>{' '}
              {modifyPermissionOptions.find((o) => o.id === permissions.canModify)?.title}
            </p>
            <p>
              <span className="font-medium">Can Trigger:</span>{' '}
              {triggerPermissionOptions.find((o) => o.id === permissions.canTrigger)?.title}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="primary" size="lg" className="min-w-[200px]">
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SetPermissionsStep;
