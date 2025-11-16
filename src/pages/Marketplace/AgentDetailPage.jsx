import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import {
  ArrowLeft,
  Star,
  Download,
  DollarSign,
  User,
  Zap,
  Shield,
  Check,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AgentDetailPage = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  // Mock agent data - in real app, fetch from API
  const agent = {
    id: agentId,
    name: 'Invoice Processing Agent',
    author: 'FinTech Solutions',
    authorVerified: true,
    description:
      'Automatically extract, validate, and process invoices from emails and documents with 99% accuracy. Supports multiple currencies, tax calculations, and integrates with major accounting platforms.',
    longDescription:
      'This powerful invoice processing agent leverages advanced Vision and Document AI engines to automatically extract data from invoices in any format. It validates the extracted information, performs calculations, handles currency conversions, and can directly integrate with your accounting software. Perfect for businesses processing hundreds of invoices monthly.',
    price: 99,
    yearlyPrice: 990,
    rating: 4.9,
    downloads: 1523,
    reviews: 234,
    engines: ['vision', 'document', 'data'],
    category: 'finance',
    capabilities: [
      'Automatic data extraction from PDFs and images',
      'Multi-currency support with real-time conversion',
      'Tax calculation and validation',
      'Duplicate invoice detection',
      'Integration with QuickBooks, Xero, and NetSuite',
      'Custom approval workflows',
      'Audit trail and compliance logging',
      'OCR with 99%+ accuracy',
    ],
    features: [
      {
        title: 'High Accuracy OCR',
        description:
          'Advanced OCR technology ensures 99%+ accuracy in data extraction',
        icon: 'target',
      },
      {
        title: 'Multi-Format Support',
        description:
          'Process invoices in PDF, PNG, JPEG, and other formats',
        icon: 'file',
      },
      {
        title: 'Real-Time Processing',
        description:
          'Process invoices in seconds, not hours',
        icon: 'zap',
      },
      {
        title: 'Compliance Ready',
        description:
          'Built-in audit trails and SOC 2 compliant',
        icon: 'shield',
      },
    ],
    useCases: [
      {
        title: 'Accounts Payable Automation',
        description:
          'Reduce manual data entry by 95% and process invoices 10x faster',
      },
      {
        title: 'Vendor Management',
        description:
          'Track vendor performance and payment terms automatically',
      },
      {
        title: 'Expense Management',
        description:
          'Streamline employee expense reimbursements',
      },
    ],
    requirements: {
      engines: ['Vision Engine', 'Document Engine', 'Data Engine'],
      plan: 'Pro or higher',
      integrations: 'Email, Accounting Software (optional)',
    },
    changelog: [
      {
        version: '2.1.0',
        date: '2024-02-15',
        changes: [
          'Added support for European invoice formats',
          'Improved accuracy for handwritten invoices',
          'New integration with SAP',
        ],
      },
      {
        version: '2.0.0',
        date: '2024-01-10',
        changes: [
          'Complete UI redesign',
          'Multi-currency support',
          'Real-time validation engine',
        ],
      },
    ],
  };

  const getEngineDetails = (engineId) => {
    return ENGINES.find((e) => e.id === engineId);
  };

  const handleDeploy = () => {
    toast.success(`Deploying ${agent.name}...`);
    // Navigate to configuration
    setTimeout(() => {
      navigate('/agents/create', { state: { template: agent } });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/marketplace')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card padding="md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white flex-shrink-0">
                  <DollarSign className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-heading font-bold text-gray-900">
                      {agent.name}
                    </h1>
                    {agent.authorVerified && (
                      <Shield className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <User className="w-4 h-4" />
                    <span>by {agent.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{agent.rating}</span>
                      <span className="text-gray-500 text-sm">
                        ({agent.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{agent.downloads} deployments</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-700">{agent.description}</p>
            </Card>

            {/* Overview */}
            <Card padding="md">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {agent.longDescription}
              </p>
            </Card>

            {/* Capabilities */}
            <Card padding="md">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {agent.capabilities.map((capability, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{capability}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card padding="md">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.features.map((feature, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Use Cases */}
            <Card padding="md">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Use Cases
              </h2>
              <div className="space-y-4">
                {agent.useCases.map((useCase, idx) => (
                  <div key={idx} className="border-l-4 border-primary-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-gray-600">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Requirements */}
            <Card padding="md">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Requirements
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Required Engines:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {agent.engines.map((engineId) => {
                      const engine = getEngineDetails(engineId);
                      return engine ? (
                        <Badge
                          key={engineId}
                          variant="primary"
                          size="md"
                          style={{ backgroundColor: engine.color }}
                        >
                          {engine.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Minimum Plan:
                  </p>
                  <Badge variant="default" size="md">
                    {agent.requirements.plan}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Integrations:
                  </p>
                  <p className="text-sm text-gray-600">
                    {agent.requirements.integrations}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Pricing Card */}
              <Card padding="md">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <button
                      onClick={() => setSelectedPlan('monthly')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedPlan === 'monthly'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setSelectedPlan('yearly')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedPlan === 'yearly'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    ${selectedPlan === 'monthly' ? agent.price : agent.yearlyPrice}
                  </div>
                  <div className="text-sm text-gray-600">
                    per {selectedPlan === 'monthly' ? 'month' : 'year'}
                  </div>
                  {selectedPlan === 'yearly' && (
                    <Badge variant="success" size="sm" className="mt-2">
                      Save ${agent.price * 12 - agent.yearlyPrice}
                    </Badge>
                  )}
                </div>

                <Button
                  onClick={handleDeploy}
                  variant="primary"
                  className="w-full mb-3"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Deploy Now
                </Button>
                <Button variant="outline" className="w-full">
                  Try Free Trial
                </Button>

                <div className="mt-4 pt-4 border-t space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Unlimited executions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Priority support</span>
                  </div>
                </div>
              </Card>

              {/* Author Info */}
              <Card padding="md">
                <h3 className="font-semibold text-gray-900 mb-3">Publisher</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                      {agent.author}
                      {agent.authorVerified && (
                        <Shield className="w-4 h-4 text-blue-500" />
                      )}
                    </p>
                    <p className="text-sm text-gray-600">Verified Publisher</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Agents:</span>
                    <span className="font-medium text-gray-900">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Downloads:</span>
                    <span className="font-medium text-gray-900">12,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Rating:</span>
                    <span className="font-medium text-gray-900">4.8 ⭐</span>
                  </div>
                </div>
              </Card>

              {/* Support */}
              <Card padding="md">
                <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
                <div className="space-y-2 text-sm">
                  <a
                    href="#"
                    className="block text-primary-600 hover:text-primary-700"
                  >
                    📚 Documentation
                  </a>
                  <a
                    href="#"
                    className="block text-primary-600 hover:text-primary-700"
                  >
                    💬 Community Forum
                  </a>
                  <a
                    href="#"
                    className="block text-primary-600 hover:text-primary-700"
                  >
                    📧 Contact Support
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgentDetailPage;
