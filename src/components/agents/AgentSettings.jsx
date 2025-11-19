import { useState } from 'react';
import { Card, Input, Textarea, Button, Alert, Toggle, Badge, Select } from '../common';
import { Save, Trash2, Upload, AlertTriangle } from 'lucide-react';
import { ENGINES, HITL_MODES, INDUSTRIES } from '../../utils/constants';
import toast from 'react-hot-toast';

const AgentSettings = ({ agent, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    name: agent?.name || '',
    description: agent?.description || '',
    industry: agent?.industry || '',
    engines: agent?.engines || [],
    hitlMode: agent?.hitlMode || 'none',
    timeout: agent?.timeout || 300,
    retryAttempts: agent?.retryAttempts || 3,
    isPublic: agent?.isPublic || false,
    enableLogging: agent?.enableLogging !== false,
    enableNotifications: agent?.enableNotifications !== false,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEngineToggle = (engineId) => {
    setFormData((prev) => ({
      ...prev,
      engines: prev.engines.includes(engineId)
        ? prev.engines.filter((id) => id !== engineId)
        : [...prev.engines, engineId],
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Agent name is required');
      return;
    }

    if (formData.engines.length === 0) {
      toast.error('Select at least one engine');
      return;
    }

    setIsSaving(true);
    try {
      await onUpdate(agent.id, formData);
      toast.success('Agent settings updated successfully');
    } catch (error) {
      toast.error('Failed to update agent settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(agent.id);
      toast.success('Agent deleted successfully');
    } catch (error) {
      toast.error('Failed to delete agent');
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Basic Settings</h3>
        <div className="space-y-4">
          <Input
            label="Agent Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter agent name"
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe what this agent does"
            rows={3}
          />

          <Select
            label="Industry"
            value={formData.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {/* Engine Selection */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Precision AI Engines</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ENGINES.map((engine) => (
            <button
              key={engine.id}
              onClick={() => handleEngineToggle(engine.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.engines.includes(engine.id)
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{engine.icon}</div>
              <p className="font-medium text-sm text-secondary-900">{engine.name}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* HITL Configuration */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Human-in-the-Loop Configuration
        </h3>
        <Select
          label="HITL Mode"
          value={formData.hitlMode}
          onChange={(e) => handleChange('hitlMode', e.target.value)}
        >
          {HITL_MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.name} - {mode.description}
            </option>
          ))}
        </Select>
        {formData.hitlMode !== 'none' && (
          <Alert variant="info" className="mt-3">
            HITL mode is enabled. Human approval will be required based on the selected mode.
          </Alert>
        )}
      </Card>

      {/* Execution Settings */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Execution Settings</h3>
        <div className="space-y-4">
          <Input
            label="Timeout (seconds)"
            type="number"
            value={formData.timeout}
            onChange={(e) => handleChange('timeout', parseInt(e.target.value) || 300)}
            min={10}
            max={3600}
          />

          <Input
            label="Retry Attempts"
            type="number"
            value={formData.retryAttempts}
            onChange={(e) => handleChange('retryAttempts', parseInt(e.target.value) || 0)}
            min={0}
            max={10}
          />
        </div>
      </Card>

      {/* Advanced Settings */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Advanced Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-secondary-900">Public Agent</p>
              <p className="text-sm text-secondary-600">
                Make this agent available in the marketplace
              </p>
            </div>
            <Toggle
              checked={formData.isPublic}
              onChange={(checked) => handleChange('isPublic', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-secondary-900">Enable Logging</p>
              <p className="text-sm text-secondary-600">
                Store execution logs for debugging and analytics
              </p>
            </div>
            <Toggle
              checked={formData.enableLogging}
              onChange={(checked) => handleChange('enableLogging', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-secondary-900">Enable Notifications</p>
              <p className="text-sm text-secondary-600">
                Receive notifications for execution results
              </p>
            </div>
            <Toggle
              checked={formData.enableNotifications}
              onChange={(checked) => handleChange('enableNotifications', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setShowDeleteConfirm(true)}
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Agent
        </Button>

        <Button onClick={handleSave} variant="primary" disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Alert variant="warning" className="border-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-secondary-900 mb-1">Delete Agent?</p>
              <p className="text-sm text-secondary-600 mb-3">
                This action cannot be undone. All execution history and configurations will be
                permanently deleted.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button onClick={handleDelete} variant="primary" size="sm" className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete Permanently
                </Button>
              </div>
            </div>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default AgentSettings;
