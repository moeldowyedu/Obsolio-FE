import { Card, Badge } from '../common';
import { ENGINES, INDUSTRIES, HITL_MODES } from '../../utils/constants';
import { CheckCircle, Edit } from 'lucide-react';

const ReviewStep = ({ data, onEdit }) => {
  const selectedEngines = ENGINES.filter((e) =>
    data.engines?.includes(e.id)
  );
  const selectedIndustry = INDUSTRIES.find((i) => i.id === data.industry);
  const selectedHITL = HITL_MODES.find((m) => m.id === data.hitlMode);

  const Section = ({ title, onEditClick, children }) => (
    <Card padding="md" className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>
      {children}
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold">
              Review Your Agent
            </h2>
            <p className="text-primary-100">
              Review all settings before creating your Precision AI Agent
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <Section title="Basic Information" onEditClick={() => onEdit(1)}>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Agent Name</p>
            <p className="text-base font-medium text-gray-900">{data.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-base text-gray-700">{data.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="text-base font-medium text-gray-900">
                {selectedIndustry?.name || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Visibility</p>
              <Badge variant="primary" size="sm">
                {data.visibility || 'private'}
              </Badge>
            </div>
          </div>
          {data.tags && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {data.tags.split(',').map((tag, idx) => (
                  <Badge key={idx} variant="default" size="sm">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Selected Engines */}
      <Section title="Precision AI Engines" onEditClick={() => onEdit(2)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {selectedEngines.map((engine) => (
            <div
              key={engine.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: engine.color }}
              >
                <span className="text-lg">{engine.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">
                  {engine.name}
                </p>
                <p className="text-xs text-gray-600">{engine.category}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedEngines.length === 0 && (
          <p className="text-sm text-gray-500">No engines selected</p>
        )}
      </Section>

      {/* Input/Output Configuration */}
      <Section title="Configuration" onEditClick={() => onEdit(3)}>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Input Fields ({data.inputSchema?.length || 0})
            </p>
            <div className="space-y-2">
              {data.inputSchema?.map((field, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      {field.name}
                    </span>
                    {field.required && (
                      <Badge variant="danger" size="sm" className="ml-2">
                        Required
                      </Badge>
                    )}
                  </div>
                  <Badge variant="default" size="sm">
                    {field.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Output Fields ({data.outputSchema?.length || 0})
            </p>
            <div className="space-y-2">
              {data.outputSchema?.map((field, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {field.name}
                  </span>
                  <Badge variant="default" size="sm">
                    {field.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div>
              <p className="text-xs text-gray-500">Timeout</p>
              <p className="text-sm font-medium text-gray-900">
                {data.timeout || 300} seconds
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Error Handling</p>
              <p className="text-sm font-medium text-gray-900">
                {data.errorHandling || 'Retry'}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* HITL Mode */}
      <Section title="HITL Oversight" onEditClick={() => onEdit(4)}>
        {selectedHITL ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                  selectedHITL.color === 'blue'
                    ? 'bg-blue-500'
                    : selectedHITL.color === 'green'
                    ? 'bg-green-500'
                    : selectedHITL.color === 'yellow'
                    ? 'bg-yellow-500'
                    : selectedHITL.color === 'red'
                    ? 'bg-red-500'
                    : 'bg-purple-500'
                }`}
              >
                <span className="text-lg">{selectedHITL.icon}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedHITL.name}</p>
                <p className="text-sm text-gray-600">{selectedHITL.description}</p>
              </div>
            </div>

            {data.hitlConfig?.approvalRequired?.length > 0 && (
              <div className="pt-3 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Approval Required For:
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.hitlConfig.approvalRequired.map((item, idx) => (
                    <Badge key={idx} variant="warning" size="sm">
                      {item.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {data.hitlConfig?.notificationMethod && (
              <div>
                <p className="text-sm text-gray-500">Notification Method</p>
                <Badge variant="info" size="sm">
                  {data.hitlConfig.notificationMethod}
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No HITL mode selected</p>
        )}
      </Section>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card padding="md" className="text-center">
          <p className="text-2xl font-bold text-primary-600">
            {selectedEngines.length}
          </p>
          <p className="text-sm text-gray-600">Engines</p>
        </Card>
        <Card padding="md" className="text-center">
          <p className="text-2xl font-bold text-secondary-600">
            {data.inputSchema?.length || 0}
          </p>
          <p className="text-sm text-gray-600">Inputs</p>
        </Card>
        <Card padding="md" className="text-center">
          <p className="text-2xl font-bold text-purple-600">
            {data.outputSchema?.length || 0}
          </p>
          <p className="text-sm text-gray-600">Outputs</p>
        </Card>
      </div>
    </div>
  );
};

export default ReviewStep;
