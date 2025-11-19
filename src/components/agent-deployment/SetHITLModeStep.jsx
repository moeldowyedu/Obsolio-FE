import { useState } from 'react';
import { Shield, User, Eye, Users, AlertCircle, Plus, X } from 'lucide-react';
import Select from '../common/Input/Select';
import Input from '../common/Input/Input';
import Toggle from '../common/Toggle/Toggle';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import { useAgentDeploymentStore } from '../../store/agentDeploymentStore';
import { HITL_MODES } from '../../utils/constants';

const SetHITLModeStep = ({ onNext, onBack }) => {
  const { hitlConfig, updateHITLConfig, addSupervisor, removeSupervisor } = useAgentDeploymentStore();
  const [selectedMode, setSelectedMode] = useState(hitlConfig.mode);

  // Mock users - would come from organization store
  const availableUsers = [
    { id: 1, name: 'John Smith', role: 'Legal Manager', department: 'Legal' },
    { id: 2, name: 'Jane Doe', role: 'HR Director', department: 'HR' },
    { id: 3, name: 'Bob Johnson', role: 'Finance Manager', department: 'Finance' },
    { id: 4, name: 'Alice Williams', role: 'Operations Lead', department: 'Operations' },
  ];

  const approvalRoutingOptions = [
    { value: 'single', label: 'Single Approver (any supervisor can approve)' },
    { value: 'multi-stage', label: 'Multi-Stage (sequential approval required)' },
    { value: 'round-robin', label: 'Round Robin (distribute evenly among supervisors)' },
  ];

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    updateHITLConfig({ mode });
  };

  const handleAddSupervisor = (userId) => {
    if (!hitlConfig.supervisorIds.includes(userId)) {
      addSupervisor(userId);
    }
  };

  const handleRemoveSupervisor = (userId) => {
    removeSupervisor(userId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const getModeIcon = (modeId) => {
    switch (modeId) {
      case 'fully-ai':
        return Shield;
      case 'hitl':
        return User;
      case 'standby':
        return Eye;
      case 'in-charge':
        return Shield;
      case 'hybrid':
        return Users;
      default:
        return Shield;
    }
  };

  const getModeColor = (modeId) => {
    const colorMap = {
      'fully-ai': 'bg-blue-500',
      'hitl': 'bg-green-500',
      'standby': 'bg-yellow-500',
      'in-charge': 'bg-red-500',
      'hybrid': 'bg-purple-500',
    };
    return colorMap[modeId] || 'bg-gray-500';
  };

  const requiresSupervisor = ['hitl', 'standby', 'in-charge', 'hybrid'].includes(selectedMode);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Set HITL Mode & Supervisor</h2>
        <p className="text-secondary-600">
          Configure human oversight and approval requirements for this agent
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* HITL Mode Selection */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">Choose Oversight Mode</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HITL_MODES.map((mode) => {
              const Icon = getModeIcon(mode.id);
              const isSelected = selectedMode === mode.id;

              return (
                <Card
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'border-2 border-primary-600 shadow-lg'
                      : 'border border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${getModeColor(mode.id)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary-900 mb-1">{mode.name}</h4>
                      <p className="text-sm text-secondary-600 mb-2">{mode.description}</p>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Use case:</span> {mode.useCase}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Supervisor Selection */}
        {requiresSupervisor && (
          <div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">Assign Supervisors</h3>

            {/* Selected Supervisors */}
            {hitlConfig.supervisorIds.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-secondary-700 mb-2">Selected Supervisors</h4>
                <div className="flex flex-wrap gap-2">
                  {hitlConfig.supervisorIds.map((userId) => {
                    const user = availableUsers.find((u) => u.id === userId);
                    return user ? (
                      <div
                        key={userId}
                        className="flex items-center gap-2 px-3 py-2 bg-primary-50 border border-primary-200 rounded-lg"
                      >
                        <User className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-medium text-primary-900">{user.name}</span>
                        <span className="text-xs text-primary-600">({user.role})</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSupervisor(userId)}
                          className="ml-2 p-0.5 hover:bg-primary-100 rounded"
                        >
                          <X className="w-4 h-4 text-primary-600" />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Add Supervisor */}
            <Select
              label="Add Supervisor"
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  handleAddSupervisor(parseInt(e.target.value));
                  e.target.value = '';
                }
              }}
              options={[
                { value: '', label: 'Select a user to add as supervisor' },
                ...availableUsers
                  .filter((u) => !hitlConfig.supervisorIds.includes(u.id))
                  .map((u) => ({
                    value: u.id,
                    label: `${u.name} - ${u.role} (${u.department})`,
                  })),
              ]}
              fullWidth
            />

            {hitlConfig.supervisorIds.length === 0 && (
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Please add at least one supervisor for this HITL mode.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Approval Configuration */}
        {requiresSupervisor && hitlConfig.supervisorIds.length > 1 && (
          <div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">Approval Routing</h3>
            <Select
              label="Approval Type"
              value={hitlConfig.approvalRouting}
              onChange={(e) => updateHITLConfig({ approvalRouting: e.target.value })}
              options={approvalRoutingOptions}
              helperText="How should approvals be handled with multiple supervisors?"
              fullWidth
            />
          </div>
        )}

        {/* Escalation Rules */}
        {requiresSupervisor && (
          <div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">Escalation Rules</h3>
            <Input
              label="Escalation Time (hours)"
              type="number"
              min="1"
              max="168"
              value={hitlConfig.escalationHours}
              onChange={(e) => updateHITLConfig({ escalationHours: parseInt(e.target.value) })}
              helperText="Escalate to next level if no approval within specified hours"
              fullWidth
            />
          </div>
        )}

        {/* Notification Preferences */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-secondary-900">Notify on Pending Approval</h4>
                <p className="text-sm text-secondary-600">Alert supervisors when approval is needed</p>
              </div>
              <Toggle
                checked={hitlConfig.notifyOnPendingApproval}
                onChange={(checked) => updateHITLConfig({ notifyOnPendingApproval: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-secondary-900">Notify on Completion</h4>
                <p className="text-sm text-secondary-600">Alert when agent completes a task</p>
              </div>
              <Toggle
                checked={hitlConfig.notifyOnCompletion}
                onChange={(checked) => updateHITLConfig({ notifyOnCompletion: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-secondary-900">Notify on Error</h4>
                <p className="text-sm text-secondary-600">Alert when agent encounters an error</p>
              </div>
              <Toggle
                checked={hitlConfig.notifyOnError}
                onChange={(checked) => updateHITLConfig({ notifyOnError: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-secondary-900">Daily Summary Report</h4>
                <p className="text-sm text-secondary-600">Send daily activity summary to supervisors</p>
              </div>
              <Toggle
                checked={hitlConfig.dailySummary}
                onChange={(checked) => updateHITLConfig({ dailySummary: checked })}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={requiresSupervisor && hitlConfig.supervisorIds.length === 0}
            className="min-w-[200px]"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SetHITLModeStep;
