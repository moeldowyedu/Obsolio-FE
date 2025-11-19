import { X, Star, Users, TrendingUp, Shield, Zap, Settings } from 'lucide-react';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import Badge from '../common/Badge/Badge';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useState } from 'react';
import DeploymentModal from './DeploymentModal';

const AgentDetailModal = ({ agent, onClose }) => {
  const [showDeployment, setShowDeployment] = useState(false);

  if (!agent) return null;

  const handleDeploy = () => {
    setShowDeployment(true);
  };

  const features = [
    { icon: <Zap className="w-5 h-5" />, label: 'Fast Processing', value: agent.processingSpeed || '< 2s avg' },
    { icon: <Shield className="w-5 h-5" />, label: 'Security', value: agent.securityLevel || 'Enterprise Grade' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Accuracy', value: agent.accuracy || '98.5%' },
    { icon: <Users className="w-5 h-5" />, label: 'Active Users', value: formatNumber(agent.deployments || 0) },
  ];

  const reviews = agent.reviews || [
    {
      author: 'Sarah Johnson',
      company: 'TechCorp',
      rating: 5,
      comment: 'Exceptional accuracy and speed. Reduced our processing time by 70%.',
      date: '2 weeks ago'
    },
    {
      author: 'Michael Chen',
      company: 'DataFlow Inc',
      rating: 5,
      comment: 'Best-in-class agent for our use case. Highly recommended!',
      date: '1 month ago'
    },
    {
      author: 'Emily Rodriguez',
      company: 'Analytics Pro',
      rating: 4,
      comment: 'Great performance, would love to see more customization options.',
      date: '1 month ago'
    }
  ];

  return (
    <>
      <Modal isOpen={true} onClose={onClose} size="xl">
        <div className="relative max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between z-10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-3xl shadow-md">
                {agent.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading text-secondary-900">{agent.name}</h2>
                <p className="text-secondary-600 mt-1">{agent.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="primary">{agent.category}</Badge>
                  <Badge variant="default">{agent.industry}</Badge>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold text-secondary-900">{agent.rating}</span>
                    <span className="text-gray-500 text-sm">({formatNumber(agent.reviews?.length || 156)} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-secondary-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold font-heading mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="text-primary-600">{feature.icon}</div>
                    <div>
                      <p className="text-sm text-secondary-600">{feature.label}</p>
                      <p className="font-semibold text-secondary-900">{feature.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <h3 className="text-lg font-semibold font-heading mb-4">Capabilities</h3>
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <ul className="space-y-3">
                  {(agent.capabilities || [
                    'Multi-language support (50+ languages)',
                    'Real-time processing and analysis',
                    'Custom rubric integration',
                    'Batch processing support',
                    'API and webhook integrations',
                    'Advanced analytics and reporting'
                  ]).map((capability, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-secondary-500 mt-1">✓</span>
                      <span className="text-secondary-700">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Engines Used */}
            <div>
              <h3 className="text-lg font-semibold font-heading mb-4">Precision Engines Used</h3>
              <div className="flex flex-wrap gap-2">
                {(agent.engines || ['Vision', 'Text', 'Data']).map((engine, index) => (
                  <Badge key={index} variant="primary" className="text-sm">
                    {engine} Engine
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-semibold font-heading mb-4">Pricing</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-sm text-secondary-600 mb-1">Per Request</p>
                  <p className="text-2xl font-bold text-secondary-900">{formatCurrency(agent.pricing?.perRequest || 0.05)}</p>
                </div>
                <div className="p-4 bg-primary-50 rounded-xl text-center border-2 border-primary-600">
                  <p className="text-sm text-primary-700 mb-1">Monthly</p>
                  <p className="text-2xl font-bold text-primary-900">{formatCurrency(agent.pricing?.monthly || 299)}</p>
                  <p className="text-xs text-primary-600 mt-1">Most Popular</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-sm text-secondary-600 mb-1">Enterprise</p>
                  <p className="text-lg font-semibold text-secondary-900">Custom</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-lg font-semibold font-heading mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-secondary-900">{review.author}</p>
                        <p className="text-sm text-secondary-600">{review.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-secondary-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div>
              <h3 className="text-lg font-semibold font-heading mb-4">Configuration Options</h3>
              <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-secondary-600" />
                    <div>
                      <p className="font-semibold text-secondary-900">HITL Mode</p>
                      <p className="text-sm text-secondary-600">Configure human oversight level</p>
                    </div>
                  </div>
                  <Badge variant="info">Configurable</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-secondary-600" />
                    <div>
                      <p className="font-semibold text-secondary-900">Custom Rubrics</p>
                      <p className="text-sm text-secondary-600">Add your own evaluation criteria</p>
                    </div>
                  </div>
                  <Badge variant="success">Supported</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-secondary-600" />
                    <div>
                      <p className="font-semibold text-secondary-900">Webhooks</p>
                      <p className="text-sm text-secondary-600">Real-time notifications</p>
                    </div>
                  </div>
                  <Badge variant="success">Supported</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600">Starting at</p>
              <p className="text-2xl font-bold text-secondary-900">
                {formatCurrency(agent.pricing?.monthly || 299)}<span className="text-base text-secondary-600">/mo</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleDeploy}>
                Deploy Agent
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {showDeployment && (
        <DeploymentModal
          agent={agent}
          onClose={() => setShowDeployment(false)}
          onDeploy={(config) => {
            console.log('Deploying agent with config:', config);
            setShowDeployment(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default AgentDetailModal;
