import { useState } from 'react';
import {
  Shield, Settings, Zap, Eye, CheckCircle, AlertTriangle,
  Info, Save, TrendingUp, Clock, Target, Activity
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const OversightModesPage = () => {
  const [selectedMode, setSelectedMode] = useState('hitl');
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock stats
  const stats = {
    pendingApprovals: 24,
    autoApproved: 1847,
    manualReviews: 126,
    totalDecisions: 1997,
    approvalRate: 92.4,
    avgResponseTime: '2.3 min'
  };

  // Oversight modes
  const modes = [
    {
      id: 'automated',
      name: 'Fully Automated',
      icon: Zap,
      color: 'blue',
      recommended: false,
      description: 'AI makes all decisions independently without human oversight',
      useCases: [
        'High-volume routine tasks',
        'Well-established processes',
        'Low-risk operations',
        'Mature AI models with proven accuracy'
      ],
      pros: [
        'Maximum efficiency and speed',
        'Zero human bottlenecks',
        'Scales infinitely',
        '24/7 operation'
      ],
      cons: [
        'No human oversight',
        'Potential for unchecked errors',
        'Less adaptable to edge cases',
        'Requires high confidence models'
      ],
      configOptions: {
        confidenceThreshold: 95,
        autoEscalation: true,
        logAllDecisions: true
      }
    },
    {
      id: 'hitl',
      name: 'Human-in-the-Loop (HITL)',
      icon: Eye,
      color: 'green',
      recommended: true,
      description: 'AI handles routine decisions, humans review critical or uncertain cases',
      useCases: [
        'Critical business decisions',
        'Compliance-sensitive operations',
        'Customer-facing actions',
        'Learning and improving AI models'
      ],
      pros: [
        'Balanced automation and oversight',
        'Error prevention through review',
        'Continuous model improvement',
        'Regulatory compliance'
      ],
      cons: [
        'Requires human resources',
        'Slight delays for flagged items',
        'Need clear escalation rules',
        'Potential approval bottlenecks'
      ],
      configOptions: {
        confidenceThreshold: 75,
        autoApproveAbove: 90,
        requireApprovalBelow: 75,
        escalateToSenior: 50
      }
    },
    {
      id: 'manual',
      name: 'Full Human Control',
      icon: Shield,
      color: 'purple',
      recommended: false,
      description: 'Humans review and approve all AI recommendations before execution',
      useCases: [
        'High-stakes decisions',
        'Regulatory requirements',
        'New or untested processes',
        'Training and validation phases'
      ],
      pros: [
        'Complete human oversight',
        'Maximum accuracy and safety',
        'Full transparency',
        'Ideal for compliance'
      ],
      cons: [
        'Significant time investment',
        'Limited scalability',
        'Human decision fatigue',
        'Slower processing'
      ],
      configOptions: {
        requireApprovalAll: true,
        allowBulkApproval: true,
        approvalTimeout: 24
      }
    }
  ];

  const selectedModeData = modes.find(m => m.id === selectedMode);

  const handleSaveConfiguration = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    console.log('Saving configuration:', {
      mode: selectedMode,
      config: selectedModeData.configOptions
    });
  };

  const getColorClasses = (color, variant = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        icon: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 flex items-center gap-3">
                <Settings className="w-8 h-8 text-primary-600" />
                HITL Oversight Modes
              </h1>
              <p className="text-secondary-600 mt-2">
                Configure the level of human oversight for your AI agents
              </p>
            </div>
            {showSuccess && (
              <div className="glass-card rounded-xl px-6 py-3 bg-green-50 border-green-200 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Configuration saved successfully!</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-secondary-600">Pending</p>
            </div>
            <p className="text-3xl font-bold text-secondary-900">{stats.pendingApprovals}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-secondary-600">Auto-Approved</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.autoApproved}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-secondary-600">Manual Reviews</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.manualReviews}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-secondary-600" />
              <p className="text-sm text-secondary-600">Total Today</p>
            </div>
            <p className="text-3xl font-bold text-secondary-900">{stats.totalDecisions}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <p className="text-sm text-secondary-600">Approval Rate</p>
            </div>
            <p className="text-3xl font-bold text-primary-600">{stats.approvalRate}%</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-secondary-600">Avg Response</p>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.avgResponseTime}</p>
          </div>
        </div>

        {/* Mode Selection Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-secondary-900 mb-4">Select Oversight Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modes.map((mode) => {
              const colors = getColorClasses(mode.color);
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;

              return (
                <div
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`glass-card rounded-2xl p-6 cursor-pointer transition-all ${
                    isSelected
                      ? `${colors.bg} ${colors.border} border-2 shadow-lg transform scale-105`
                      : 'hover:shadow-lg hover:scale-102 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    {mode.recommended && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                        Recommended
                      </span>
                    )}
                    {isSelected && (
                      <div className={`w-8 h-8 rounded-full ${colors.button} flex items-center justify-center`}>
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-secondary-900 mb-2">{mode.name}</h3>
                  <p className="text-sm text-secondary-600 mb-4">{mode.description}</p>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                        isSelected
                          ? `${colors.button} text-white`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? 'Current Mode' : 'Select Mode'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Information for Selected Mode */}
        {selectedModeData && (
          <div className="glass-card rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              {React.createElement(selectedModeData.icon, {
                className: `w-10 h-10 ${getColorClasses(selectedModeData.color).icon}`
              })}
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">{selectedModeData.name}</h2>
                <p className="text-secondary-600">{selectedModeData.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Use Cases */}
              <div>
                <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Ideal Use Cases
                </h3>
                <ul className="space-y-3">
                  {selectedModeData.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-secondary-700">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Advantages
                  </h3>
                  <ul className="space-y-2">
                    {selectedModeData.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-secondary-700">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Considerations
                  </h3>
                  <ul className="space-y-2">
                    {selectedModeData.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-secondary-700">
                        <span className="text-orange-600 mt-1">!</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-secondary-700" />
                Configuration Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(selectedModeData.configOptions).map(([key, value]) => (
                  <div key={key} className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    {typeof value === 'boolean' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={value}
                          readOnly
                          className="w-4 h-4 text-primary-600 rounded"
                        />
                        <span className="text-sm text-secondary-600">
                          {value ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    ) : typeof value === 'number' ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          readOnly
                          className="flex-grow"
                        />
                        <span className="font-bold text-secondary-900 w-12 text-right">{value}%</span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-secondary-700"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="glass-card rounded-2xl overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-primary-50 to-purple-50">
            <h2 className="text-2xl font-bold text-secondary-900">Mode Comparison</h2>
            <p className="text-secondary-600 mt-1">Compare all oversight modes at a glance</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-secondary-700">Feature</th>
                  {modes.map(mode => (
                    <th key={mode.id} className="px-6 py-4 text-center text-sm font-bold text-secondary-700">
                      {mode.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-secondary-900">Human Oversight</td>
                  <td className="px-6 py-4 text-center text-secondary-600">None</td>
                  <td className="px-6 py-4 text-center text-secondary-600">Selective</td>
                  <td className="px-6 py-4 text-center text-secondary-600">Complete</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-secondary-900">Processing Speed</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Instant
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      Fast
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                      Slower
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-secondary-900">Scalability</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">Unlimited</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-bold">High</td>
                  <td className="px-6 py-4 text-center text-orange-600 font-bold">Limited</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-secondary-900">Error Prevention</td>
                  <td className="px-6 py-4 text-center text-orange-600 font-bold">Low</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">High</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">Highest</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-secondary-900">Resource Requirements</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">Minimal</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-bold">Moderate</td>
                  <td className="px-6 py-4 text-center text-orange-600 font-bold">Significant</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-secondary-900">Best For</td>
                  <td className="px-6 py-4 text-center text-sm text-secondary-600">High-volume tasks</td>
                  <td className="px-6 py-4 text-center text-sm text-secondary-600">Critical operations</td>
                  <td className="px-6 py-4 text-center text-sm text-secondary-600">High-stakes decisions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Configuration Button */}
        <div className="flex items-center justify-between glass-card rounded-2xl p-6 bg-gradient-to-r from-primary-50 to-purple-50">
          <div>
            <h3 className="font-bold text-secondary-900 text-lg">Ready to apply changes?</h3>
            <p className="text-secondary-600 text-sm mt-1">
              This will update the oversight mode for all active agents
            </p>
          </div>
          <button
            onClick={handleSaveConfiguration}
            className="glass-btn-primary rounded-xl px-8 py-4 font-semibold inline-flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
          >
            <Save className="w-5 h-5" />
            Save Configuration
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default OversightModesPage;
