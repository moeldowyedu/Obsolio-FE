import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../common/Button/Button';
import Badge from '../common/Badge/Badge';
import Card from '../common/Card/Card';
import { ENGINES, HITL_MODES } from '../../utils/constants';

const AgentBuilderWizard = ({ steps = [], onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [agentConfig, setAgentConfig] = useState({
    name: '',
    description: '',
    selectedEngines: [],
    hitlMode: 'hitl',
    settings: {
      maxProcessingTime: 30,
      confidenceThreshold: 0.8,
      batchSize: 10,
    },
    schema: {
      inputType: 'text',
      outputFormat: 'json',
      fields: []
    },
    testResults: null
  });

  const defaultSteps = [
    'Select Engines',
    'Configure Settings',
    'Set HITL Mode',
    'Define Schema',
    'Test Agent',
    'Deploy'
  ];

  const wizardSteps = steps.length > 0 ? steps : defaultSteps;

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(agentConfig);
    }
  };

  const updateConfig = (updates) => {
    setAgentConfig({ ...agentConfig, ...updates });
  };

  const toggleEngine = (engineId) => {
    const isSelected = agentConfig.selectedEngines.includes(engineId);
    const newEngines = isSelected
      ? agentConfig.selectedEngines.filter(id => id !== engineId)
      : [...agentConfig.selectedEngines, engineId];
    updateConfig({ selectedEngines: newEngines });
  };

  const runTest = () => {
    // Mock test execution
    setTimeout(() => {
      updateConfig({
        testResults: {
          status: 'success',
          processingTime: '2.3s',
          accuracy: '96.8%',
          sampleOutput: {
            confidence: 0.968,
            result: 'Test completed successfully',
            timestamp: new Date().toISOString()
          }
        }
      });
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Select Engines
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Agent Name *
              </label>
              <input
                type="text"
                value={agentConfig.name}
                onChange={(e) => updateConfig({ name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Customer Support AI"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Description *
              </label>
              <textarea
                value={agentConfig.description}
                onChange={(e) => updateConfig({ description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
                placeholder="Describe what your agent does..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-3">
                Select Precision Engines *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ENGINES.map((engine) => (
                  <div
                    key={engine.id}
                    onClick={() => toggleEngine(engine.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      agentConfig.selectedEngines.includes(engine.id)
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{engine.icon}</span>
                      <div className="flex-grow">
                        <p className="font-semibold text-secondary-900 text-sm">{engine.shortName}</p>
                        <p className="text-xs text-secondary-600">{engine.category}</p>
                      </div>
                      {agentConfig.selectedEngines.includes(engine.id) && (
                        <Check className="w-5 h-5 text-primary-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-secondary-600 mt-2">
                Selected: {agentConfig.selectedEngines.length} engine(s)
              </p>
            </div>
          </div>
        );

      case 1: // Configure Settings
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Max Processing Time (seconds)
              </label>
              <input
                type="range"
                min="5"
                max="120"
                value={agentConfig.settings.maxProcessingTime}
                onChange={(e) => updateConfig({
                  settings: { ...agentConfig.settings, maxProcessingTime: parseInt(e.target.value) }
                })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-secondary-600">
                <span>5s</span>
                <span className="font-semibold text-primary-600">
                  {agentConfig.settings.maxProcessingTime}s
                </span>
                <span>120s</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Confidence Threshold
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={agentConfig.settings.confidenceThreshold * 100}
                onChange={(e) => updateConfig({
                  settings: { ...agentConfig.settings, confidenceThreshold: parseInt(e.target.value) / 100 }
                })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-secondary-600">
                <span>0%</span>
                <span className="font-semibold text-primary-600">
                  {(agentConfig.settings.confidenceThreshold * 100).toFixed(0)}%
                </span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Batch Size
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={agentConfig.settings.batchSize}
                onChange={(e) => updateConfig({
                  settings: { ...agentConfig.settings, batchSize: parseInt(e.target.value) }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-sm text-secondary-600 mt-1">
                Number of items to process in parallel
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900 font-semibold mb-2">Performance Estimation</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700">Est. Throughput</p>
                  <p className="font-semibold text-blue-900">
                    {Math.round((agentConfig.settings.batchSize / agentConfig.settings.maxProcessingTime) * 60)} items/min
                  </p>
                </div>
                <div>
                  <p className="text-blue-700">Resource Usage</p>
                  <p className="font-semibold text-blue-900">
                    {agentConfig.selectedEngines.length * agentConfig.settings.batchSize > 20 ? 'High' : 'Medium'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Set HITL Mode
        return (
          <div className="space-y-4">
            <p className="text-sm text-secondary-600 mb-4">
              Choose how much human oversight your agent requires
            </p>
            <div className="space-y-3">
              {HITL_MODES.map((mode) => (
                <div
                  key={mode.id}
                  onClick={() => updateConfig({ hitlMode: mode.id })}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    agentConfig.hitlMode === mode.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 flex-grow">
                      <span className="text-2xl">{mode.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-secondary-900">{mode.name}</p>
                          {mode.badge && (
                            <Badge variant="success" size="sm">{mode.badge}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-secondary-600">{mode.description}</p>
                      </div>
                    </div>
                    {agentConfig.hitlMode === mode.id && (
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Define Schema
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Input Type
                </label>
                <select
                  value={agentConfig.schema.inputType}
                  onChange={(e) => updateConfig({
                    schema: { ...agentConfig.schema, inputType: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="file">File</option>
                  <option value="url">URL</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Output Format
                </label>
                <select
                  value={agentConfig.schema.outputFormat}
                  onChange={(e) => updateConfig({
                    schema: { ...agentConfig.schema, outputFormat: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="json">JSON</option>
                  <option value="text">Text</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Schema Definition
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                rows={12}
                placeholder={`{
  "input": {
    "type": "text",
    "required": true
  },
  "output": {
    "confidence": "number",
    "result": "string",
    "metadata": "object"
  }
}`}
              />
              <p className="text-sm text-secondary-600 mt-1">
                Define your input/output schema in JSON format
              </p>
            </div>
          </div>
        );

      case 4: // Test Agent
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Test Input
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder="Enter test data here..."
              />
            </div>

            <Button onClick={runTest} className="w-full">
              Run Test
            </Button>

            {agentConfig.testResults && (
              <Card className="bg-green-50 border-green-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-green-900">Test Successful ✓</p>
                    <Badge variant="success">{agentConfig.testResults.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-700">Processing Time</p>
                      <p className="font-semibold text-green-900">{agentConfig.testResults.processingTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Accuracy</p>
                      <p className="font-semibold text-green-900">{agentConfig.testResults.accuracy}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-green-700 mb-1">Sample Output</p>
                    <pre className="bg-white p-3 rounded border border-green-200 text-xs overflow-x-auto">
                      {JSON.stringify(agentConfig.testResults.sampleOutput, null, 2)}
                    </pre>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );

      case 5: // Deploy
        return (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
              <h3 className="text-xl font-bold font-heading text-secondary-900 mb-4">
                Ready to Deploy
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-secondary-700">Agent Name</span>
                  <span className="font-semibold text-secondary-900">{agentConfig.name || 'Unnamed Agent'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-secondary-700">Engines Selected</span>
                  <span className="font-semibold text-secondary-900">{agentConfig.selectedEngines.length}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-secondary-700">HITL Mode</span>
                  <span className="font-semibold text-secondary-900">
                    {HITL_MODES.find(m => m.id === agentConfig.hitlMode)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-secondary-700">Test Status</span>
                  <Badge variant={agentConfig.testResults ? 'success' : 'warning'}>
                    {agentConfig.testResults ? 'Passed' : 'Not Tested'}
                  </Badge>
                </div>
              </div>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-yellow-900">
                <strong>Note:</strong> Once deployed, your agent will be available in your private agent library.
                You can modify settings or unpublish it at any time.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return agentConfig.name && agentConfig.description && agentConfig.selectedEngines.length > 0;
      case 4:
        return agentConfig.testResults !== null;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {wizardSteps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  index < currentStep
                    ? 'bg-primary-600 text-white'
                    : index === currentStep
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <p
                className={`text-xs mt-2 text-center ${
                  index === currentStep ? 'font-semibold text-gray-900' : 'text-gray-600'
                }`}
              >
                {step}
              </p>
            </div>
            {index < wizardSteps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="min-h-[400px]">
        <h2 className="text-2xl font-bold font-heading text-secondary-900 mb-6">
          {wizardSteps[currentStep]}
        </h2>
        {renderStepContent()}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {currentStep < wizardSteps.length - 1 ? (
          <Button onClick={handleNext} disabled={!canProceed()}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleComplete} disabled={!canProceed()}>
            Deploy Agent
          </Button>
        )}
      </div>
    </div>
  );
};

export default AgentBuilderWizard;
