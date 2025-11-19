import { AlertTriangle, CheckCircle, Settings, TrendingUp } from 'lucide-react';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import { HITL_MODES } from '../../utils/constants';

const ModeDescriptionPanel = ({ mode }) => {
  const modeData = HITL_MODES.find(m => m.id === mode);

  if (!modeData) return null;

  const modeDetails = {
    'full-auto': {
      useCases: [
        'High-volume, low-risk content processing',
        'Established workflows with proven accuracy',
        'Time-sensitive operations requiring maximum speed',
        'Repetitive tasks with clear decision criteria'
      ],
      risks: [
        'No human verification before execution',
        'Potential for cascading errors',
        'Requires high confidence in AI accuracy'
      ],
      metrics: {
        speed: 100,
        accuracy: 85,
        oversight: 0,
        cost: 30
      },
      settings: {
        confidenceThreshold: 0.95,
        errorHandling: 'Auto-retry',
        logging: 'Full'
      }
    },
    'spot-check': {
      useCases: [
        'Medium-volume operations with established patterns',
        'Quality assurance on automated processes',
        'Detecting drift in AI performance',
        'Compliance monitoring'
      ],
      risks: [
        'Errors may occur between spot checks',
        'Sample bias if not properly randomized',
        'Delayed error detection'
      ],
      metrics: {
        speed: 85,
        accuracy: 92,
        oversight: 25,
        cost: 45
      },
      settings: {
        sampleRate: 10,
        randomSampling: true,
        alertThreshold: 0.85
      }
    },
    'hitl': {
      useCases: [
        'Medium-risk decisions requiring validation',
        'New workflows being established',
        'Complex edge cases',
        'Regulatory compliance requirements'
      ],
      risks: [
        'Moderate processing delays',
        'Requires human availability',
        'Potential for approval bottlenecks'
      ],
      metrics: {
        speed: 60,
        accuracy: 97,
        oversight: 60,
        cost: 70
      },
      settings: {
        confidenceThreshold: 0.80,
        autoApproveAbove: 0.95,
        escalationPath: 'Enabled'
      }
    },
    'full-review': {
      useCases: [
        'High-risk or high-value decisions',
        'Legal or financial transactions',
        'Sensitive content moderation',
        'Critical infrastructure operations'
      ],
      risks: [
        'Significant processing delays',
        'High human resource requirements',
        'Potential for human error or bias'
      ],
      metrics: {
        speed: 30,
        accuracy: 99,
        oversight: 100,
        cost: 95
      },
      settings: {
        requireApproval: true,
        multiReviewer: false,
        timeLimit: '24 hours'
      }
    },
    'consensus': {
      useCases: [
        'Mission-critical decisions',
        'High-stakes medical or legal analysis',
        'Dispute resolution',
        'Quality control for critical systems'
      ],
      risks: [
        'Slowest processing time',
        'Highest resource requirements',
        'Potential for reviewer disagreement',
        'Expensive to maintain'
      ],
      metrics: {
        speed: 15,
        accuracy: 99.5,
        oversight: 100,
        cost: 100
      },
      settings: {
        reviewersRequired: 3,
        consensusThreshold: '2/3',
        disagreementResolution: 'Escalate to senior reviewer'
      }
    }
  };

  const details = modeDetails[mode];

  const getMetricColor = (value) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricBgColor = (value) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Mode Overview */}
      <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{modeData.icon}</div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold font-heading text-secondary-900">{modeData.name}</h2>
              {modeData.badge && (
                <Badge variant="success">{modeData.badge}</Badge>
              )}
            </div>
            <p className="text-secondary-700">{modeData.description}</p>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <h3 className="text-lg font-semibold font-heading text-secondary-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(details.metrics).map(([key, value]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary-600 capitalize">{key}</span>
                <span className={`text-sm font-semibold ${getMetricColor(value)}`}>
                  {value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getMetricBgColor(value)}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Use Cases */}
        <Card>
          <h3 className="text-lg font-semibold font-heading text-secondary-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Ideal Use Cases
          </h3>
          <ul className="space-y-2">
            {details.useCases.map((useCase, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-secondary-700 text-sm">{useCase}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Risks */}
        <Card>
          <h3 className="text-lg font-semibold font-heading text-secondary-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Risks & Considerations
          </h3>
          <ul className="space-y-2">
            {details.risks.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">⚠</span>
                <span className="text-secondary-700 text-sm">{risk}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Configuration Settings */}
      <Card>
        <h3 className="text-lg font-semibold font-heading text-secondary-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary-600" />
          Default Configuration
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(details.settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-secondary-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm font-semibold text-secondary-900">
                  {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
                  {typeof value === 'number' && key.includes('Rate') && '%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recommendation */}
      <Card className={`border-2 ${
        mode === 'full-auto' ? 'border-red-200 bg-red-50' :
        mode === 'consensus' ? 'border-blue-200 bg-blue-50' :
        'border-green-200 bg-green-50'
      }`}>
        <h3 className="font-semibold text-secondary-900 mb-2">Recommendation</h3>
        <p className="text-sm text-secondary-700">
          {mode === 'full-auto' &&
            'Best suited for high-volume, low-risk operations where speed is critical. Ensure robust monitoring and fallback mechanisms are in place.'}
          {mode === 'spot-check' &&
            'Good balance for most production workflows. Provides quality assurance while maintaining reasonable throughput.'}
          {mode === 'hitl' &&
            'Recommended for most new deployments. Allows you to build confidence in the system while maintaining control.'}
          {mode === 'full-review' &&
            'Essential for high-stakes decisions. Plan for adequate human resources to avoid processing bottlenecks.'}
          {mode === 'consensus' &&
            'Only use for mission-critical decisions where accuracy is paramount. Consider the significant time and cost implications.'}
        </p>
      </Card>
    </div>
  );
};

export default ModeDescriptionPanel;
