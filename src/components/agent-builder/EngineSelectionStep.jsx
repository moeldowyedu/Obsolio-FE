import { Card, Badge } from '../common';
import { ENGINES } from '../../utils/constants';
import * as Icons from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const EngineSelectionStep = ({ data, onChange }) => {
  const selectedEngines = data.engines || [];

  const toggleEngine = (engineId) => {
    const newEngines = selectedEngines.includes(engineId)
      ? selectedEngines.filter((id) => id !== engineId)
      : [...selectedEngines, engineId];
    onChange({ ...data, engines: newEngines });
  };

  const getIcon = (iconName) => {
    const iconMap = {
      'eye': 'Eye',
      'mic': 'Mic',
      'type': 'Type',
      'code': 'Code',
      'file-text': 'FileText',
      'database': 'Database',
      'globe': 'Globe',
    };
    const IconComponent = Icons[iconMap[iconName]] || Icons.Sparkles;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="space-y-6">
      <Card padding="md">
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
          Select Precision AI Engines
        </h2>
        <p className="text-gray-600 mb-6">
          Choose one or more engines to power your agent. You can combine multiple engines for advanced functionality.
        </p>

        <div className="mb-4">
          <Badge variant="primary" size="md">
            {selectedEngines.length} engine{selectedEngines.length !== 1 ? 's' : ''} selected
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ENGINES.map((engine) => {
            const isSelected = selectedEngines.includes(engine.id);

            return (
              <div
                key={engine.id}
                onClick={() => toggleEngine(engine.id)}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-6 h-6 text-primary-500" />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: engine.color }}
                  >
                    {getIcon(engine.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {engine.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {engine.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {engine.capabilities.slice(0, 2).map((cap, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-white border border-gray-200 text-gray-600 rounded"
                        >
                          {cap}
                        </span>
                      ))}
                      {engine.capabilities.length > 2 && (
                        <span className="text-xs px-2 py-0.5 text-gray-500">
                          +{engine.capabilities.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {selectedEngines.length > 0 && (
        <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Multi-Engine Capabilities
              </h3>
              <p className="text-sm text-gray-700">
                You've selected {selectedEngines.length} engine{selectedEngines.length !== 1 ? 's' : ''}. Your agent will be able to combine their capabilities for more powerful automation.
              </p>
            </div>
          </div>
        </Card>
      )}

      {selectedEngines.length === 0 && (
        <Card padding="md" className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">⚠️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                No Engines Selected
              </h3>
              <p className="text-sm text-gray-700">
                Please select at least one engine to continue building your agent.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EngineSelectionStep;
