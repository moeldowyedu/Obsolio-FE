import { useState } from 'react';
import ModeSelector from '../../components/hitl/ModeSelector';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { HITL_MODES } from '../../utils/constants';
import { formatNumber } from '../../utils/formatters';

const OversightModesPage = () => {
  const [selectedMode, setSelectedMode] = useState('threshold');
  const [modeConfig, setModeConfig] = useState({
    threshold: 0.85,
    sampleRate: 10,
    autoApproveThreshold: 0.95
  });

  const handleSaveConfiguration = () => {
    console.log('Saving configuration:', { mode: selectedMode, config: modeConfig });
    // TODO: Implement actual save logic
  };

  const modeDescriptions = {
    'full-auto': {
      title: 'Full Automation',
      description: 'AI operates completely autonomously with no human intervention required.',
      useCases: [
        'High-volume, low-risk tasks',
        'Well-established processes',
        'Scenarios with high AI confidence'
      ],
      risks: [
        'No human oversight',
        'Potential for uncaught errors',
        'Not suitable for sensitive operations'
      ]
    },
    'spot-check': {
      title: 'Spot Check Sampling',
      description: 'Random sampling of AI decisions for quality assurance.',
      useCases: [
        'Quality monitoring',
        'Training validation',
        'Periodic audits'
      ],
      risks: [
        'May miss systematic errors',
        'Sample size dependent'
      ]
    },
    'threshold': {
      title: 'Confidence Threshold',
      description: 'Human review required when AI confidence falls below threshold.',
      useCases: [
        'Balanced automation and oversight',
        'Variable complexity tasks',
        'Learning scenarios'
      ],
      risks: [
        'Threshold calibration required',
        'May create review bottlenecks'
      ]
    },
    'pre-approval': {
      title: 'Pre-Approval Required',
      description: 'All AI actions require human approval before execution.',
      useCases: [
        'High-stakes decisions',
        'Compliance-critical operations',
        'Sensitive customer interactions'
      ],
      risks: [
        'Slower processing',
        'Higher human resource requirements'
      ]
    },
    'co-pilot': {
      title: 'Co-Pilot Mode',
      description: 'Real-time human-AI collaboration with interactive decision-making.',
      useCases: [
        'Complex problem-solving',
        'Creative tasks',
        'Learning and training'
      ],
      risks: [
        'Most resource-intensive',
        'Requires skilled operators'
      ]
    }
  };

  const currentModeInfo = modeDescriptions[selectedMode];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-gray-900">Human-in-the-Loop Oversight Modes</h1>
        <p className="text-gray-600 mt-2">
          Configure AI oversight levels to balance automation with human control
        </p>
      </div>

      {/* Mode Selector */}
      <div>
        <h2 className="text-xl font-semibold font-heading text-gray-900 mb-4">Select Oversight Mode</h2>
        <ModeSelector
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
        />
      </div>

      {/* Mode Details */}
      {currentModeInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold font-heading text-gray-900 mb-3">
              {currentModeInfo.title}
            </h3>
            <p className="text-gray-600 mb-4">{currentModeInfo.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Use Cases</h4>
                <ul className="space-y-1">
                  {currentModeInfo.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-secondary-500 mt-1">✓</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Considerations</h4>
                <ul className="space-y-1">
                  {currentModeInfo.risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-yellow-500 mt-1">⚠</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Configuration Panel */}
          <Card className="hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold font-heading text-gray-900 mb-4">
              Configuration
            </h3>

            <div className="space-y-4">
              {selectedMode === 'threshold' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confidence Threshold
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={modeConfig.threshold}
                      onChange={(e) => setModeConfig({ ...modeConfig, threshold: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Current: {(modeConfig.threshold * 100).toFixed(0)}%
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto-Approve Threshold
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={modeConfig.autoApproveThreshold}
                      onChange={(e) => setModeConfig({ ...modeConfig, autoApproveThreshold: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Current: {(modeConfig.autoApproveThreshold * 100).toFixed(0)}%
                    </p>
                  </div>
                </>
              )}

              {selectedMode === 'spot-check' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sample Rate (%)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={modeConfig.sampleRate}
                    onChange={(e) => setModeConfig({ ...modeConfig, sampleRate: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Review {modeConfig.sampleRate}% of all decisions
                  </p>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button onClick={handleSaveConfiguration} className="w-full">
                  Save Configuration
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Total Decisions Today</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(12450)}</p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Auto-Approved</p>
          <p className="text-3xl font-bold text-secondary-500">{formatNumber(10234)}</p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-600">{formatNumber(1890)}</p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Human Interventions</p>
          <p className="text-3xl font-bold text-primary-500">{formatNumber(326)}</p>
        </Card>
      </div>
    </div>
  );
};

export default OversightModesPage;
