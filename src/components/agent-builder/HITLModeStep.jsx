import { Card, Badge } from '../common';
import { HITL_MODES } from '../../utils/constants';
import * as Icons from 'lucide-react';

const HITLModeStep = ({ data, onChange }) => {
  const selectedMode = data.hitlMode || '';

  const getIcon = (iconName) => {
    const iconMap = {
      'zap': 'Zap',
      'user-check': 'UserCheck',
      'eye': 'Eye',
      'shield': 'Shield',
      'layers': 'Layers',
    };
    const IconComponent = Icons[iconMap[iconName]] || Icons.Circle;
    return <IconComponent className="w-6 h-6" />;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500',
        border: 'border-blue-500',
        borderLight: 'border-blue-300',
        bgLight: 'bg-blue-50',
      },
      green: {
        bg: 'bg-green-500',
        border: 'border-green-500',
        borderLight: 'border-green-300',
        bgLight: 'bg-green-50',
      },
      yellow: {
        bg: 'bg-yellow-500',
        border: 'border-yellow-500',
        borderLight: 'border-yellow-300',
        bgLight: 'bg-yellow-50',
      },
      red: {
        bg: 'bg-red-500',
        border: 'border-red-500',
        borderLight: 'border-red-300',
        bgLight: 'bg-red-50',
      },
      purple: {
        bg: 'bg-purple-500',
        border: 'border-purple-500',
        borderLight: 'border-purple-300',
        bgLight: 'bg-purple-50',
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      <Card padding="md">
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
          Human-in-the-Loop (HITL) Oversight
        </h2>
        <p className="text-gray-600 mb-6">
          Choose how humans will oversee and control your AI agent's operations
        </p>

        <div className="space-y-4">
          {HITL_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            const colors = getColorClasses(mode.color);

            return (
              <div
                key={mode.id}
                onClick={() => onChange({ ...data, hitlMode: mode.id })}
                className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? `${colors.border} ${colors.bgLight} shadow-md`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {getIcon(mode.icon)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {mode.name}
                      </h3>
                      {isSelected && (
                        <Badge variant="success" size="sm">
                          Selected
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {mode.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">
                        Best for:
                      </span>
                      <span className="text-xs px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded">
                        {mode.useCase}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full flex-shrink-0">
                      <Icons.Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* HITL Configuration */}
      {selectedMode && selectedMode !== 'fully-ai' && (
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            HITL Configuration
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Required For
              </label>
              <div className="space-y-2">
                {[
                  { id: 'high-value', label: 'High-value transactions (>$1000)' },
                  { id: 'sensitive-data', label: 'Sensitive data processing' },
                  { id: 'external-actions', label: 'External API calls' },
                  { id: 'all-actions', label: 'All agent actions' },
                ].map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={option.id}
                      checked={
                        data.hitlConfig?.approvalRequired?.includes(option.id) ||
                        false
                      }
                      onChange={(e) => {
                        const current =
                          data.hitlConfig?.approvalRequired || [];
                        const newRequired = e.target.checked
                          ? [...current, option.id]
                          : current.filter((id) => id !== option.id);
                        onChange({
                          ...data,
                          hitlConfig: {
                            ...data.hitlConfig,
                            approvalRequired: newRequired,
                          },
                        });
                      }}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <label htmlFor={option.id} className="text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Method
              </label>
              <select
                value={data.hitlConfig?.notificationMethod || 'email'}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hitlConfig: {
                      ...data.hitlConfig,
                      notificationMethod: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="email">Email</option>
                <option value="slack">Slack</option>
                <option value="teams">Microsoft Teams</option>
                <option value="webhook">Custom Webhook</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* Info Card */}
      <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icons.Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Why HITL Matters
            </h3>
            <p className="text-sm text-gray-700">
              Human-in-the-Loop oversight ensures AI agents operate safely and
              align with your business rules. You maintain control while
              benefiting from AI automation.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HITLModeStep;
