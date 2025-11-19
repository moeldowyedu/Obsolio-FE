import { useState } from 'react';
import {
  Save,
  Users,
  Clock,
  Bell,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Select from '../../components/common/Input/Select';
import Input from '../../components/common/Input/Input';
import { HITL_MODES } from '../../utils/constants';
import MainLayout from '../../components/layout/MainLayout';

const HITLConfigurationPage = () => {
  const [config, setConfig] = useState({
    defaultMode: 'human-in-the-loop',
    autoEscalateAfter: 24,
    notifyOnNewTask: true,
    notifyOnEscalation: true,
    notifyOnOverdue: true,
    emailNotifications: true,
    slackNotifications: false,
    requireComments: true,
    allowBulkApproval: false,
    maxPendingTasks: 50,
    approvalTimeout: 48,
    escalationChain: ['supervisor', 'manager', 'department-head'],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">HITL Configuration</h1>
          <p className="text-secondary-600 mt-1">
            Configure Human-in-the-Loop workflow settings
          </p>
        </div>
        <div className="flex gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-2 text-green-600 font-medium">
              <AlertTriangle className="w-5 h-5" />
              Settings saved successfully
            </span>
          )}
          <Button
            variant="primary"
            leftIcon={<Save className="w-5 h-5" />}
            onClick={handleSave}
            loading={isSaving}
            disabled={isSaving}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Default Settings */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-600" />
          Default HITL Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Default HITL Mode
            </label>
            <Select
              value={config.defaultMode}
              onChange={(e) => setConfig({ ...config, defaultMode: e.target.value })}
              options={Object.keys(HITL_MODES).map((key) => ({
                value: key,
                label: HITL_MODES[key].name,
              }))}
              fullWidth
            />
            <p className="mt-2 text-sm text-secondary-600">
              {HITL_MODES[config.defaultMode]?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Auto-Escalate After (hours)
              </label>
              <Input
                type="number"
                value={config.autoEscalateAfter}
                onChange={(e) => setConfig({ ...config, autoEscalateAfter: parseInt(e.target.value) })}
                min="1"
                fullWidth
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Approval Timeout (hours)
              </label>
              <Input
                type="number"
                value={config.approvalTimeout}
                onChange={(e) => setConfig({ ...config, approvalTimeout: parseInt(e.target.value) })}
                min="1"
                fullWidth
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Max Pending Tasks per Supervisor
            </label>
            <Input
              type="number"
              value={config.maxPendingTasks}
              onChange={(e) => setConfig({ ...config, maxPendingTasks: parseInt(e.target.value) })}
              min="1"
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary-600" />
          Notification Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-secondary-900">Notify on New Task</p>
              <p className="text-sm text-secondary-600">
                Send notification when a new task requires approval
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.notifyOnNewTask}
                onChange={(e) => setConfig({ ...config, notifyOnNewTask: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-secondary-900">Notify on Escalation</p>
              <p className="text-sm text-secondary-600">
                Send notification when a task is escalated
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.notifyOnEscalation}
                onChange={(e) => setConfig({ ...config, notifyOnEscalation: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-secondary-900">Notify on Overdue</p>
              <p className="text-sm text-secondary-600">
                Send notification when approval is overdue
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.notifyOnOverdue}
                onChange={(e) => setConfig({ ...config, notifyOnOverdue: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-secondary-900 mb-3">Notification Channels</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary-900">Email Notifications</p>
                  <p className="text-sm text-secondary-600">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.emailNotifications}
                    onChange={(e) => setConfig({ ...config, emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary-900">Slack Notifications</p>
                  <p className="text-sm text-secondary-600">Receive notifications via Slack</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.slackNotifications}
                    onChange={(e) => setConfig({ ...config, slackNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Approval Settings */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          Approval Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-secondary-900">Require Comments</p>
              <p className="text-sm text-secondary-600">
                Supervisors must provide comments for all decisions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.requireComments}
                onChange={(e) => setConfig({ ...config, requireComments: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-secondary-900">Allow Bulk Approval</p>
              <p className="text-sm text-secondary-600">
                Enable supervisors to approve multiple tasks at once
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.allowBulkApproval}
                onChange={(e) => setConfig({ ...config, allowBulkApproval: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Escalation Chain */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-600" />
          Escalation Chain
        </h2>
        <p className="text-sm text-secondary-600 mb-4">
          Define the escalation path when tasks are not approved within the timeout period
        </p>
        <div className="space-y-3">
          {config.escalationChain.map((level, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {index + 1}
              </div>
              <span className="font-medium text-secondary-900 capitalize">
                {level.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </Card>
      </div>
    </MainLayout>
  );
};

export default HITLConfigurationPage;
