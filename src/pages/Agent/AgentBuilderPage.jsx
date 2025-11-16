import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button } from '../../components/common';
import { WizardSteps } from '../../components/wizard';
import {
  BasicInfoStep,
  EngineSelectionStep,
  ConfigurationStep,
  HITLModeStep,
  ReviewStep,
} from '../../components/agent-builder';
import { useAgentStore } from '../../store/agentStore';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const AgentBuilderPage = () => {
  const navigate = useNavigate();
  const { createAgent } = useAgentStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [agentData, setAgentData] = useState({
    name: '',
    description: '',
    industry: '',
    tags: '',
    visibility: 'private',
    engines: [],
    inputSchema: [{ name: '', type: 'string', required: true, description: '' }],
    outputSchema: [{ name: '', type: 'string', description: '' }],
    timeout: 300,
    errorHandling: 'retry',
    enableLogging: true,
    hitlMode: '',
    hitlConfig: {
      approvalRequired: [],
      notificationMethod: 'email',
    },
  });

  const wizardSteps = [
    {
      id: 'basic-info',
      title: 'Basic Info',
      description: 'Name & details',
    },
    {
      id: 'engines',
      title: 'Select Engines',
      description: 'AI capabilities',
    },
    {
      id: 'configuration',
      title: 'Configuration',
      description: 'Input/Output',
    },
    {
      id: 'hitl',
      title: 'HITL Mode',
      description: 'Oversight',
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Confirm & create',
    },
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, wizardSteps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepEdit = (step) => {
    setCurrentStep(step);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!agentData.name.trim()) {
          toast.error('Agent name is required');
          return false;
        }
        if (!agentData.description.trim()) {
          toast.error('Description is required');
          return false;
        }
        if (!agentData.industry) {
          toast.error('Please select an industry');
          return false;
        }
        break;
      case 2:
        if (agentData.engines.length === 0) {
          toast.error('Please select at least one engine');
          return false;
        }
        break;
      case 3:
        const hasValidInput = agentData.inputSchema.some(
          (field) => field.name.trim()
        );
        const hasValidOutput = agentData.outputSchema.some(
          (field) => field.name.trim()
        );
        if (!hasValidInput || !hasValidOutput) {
          toast.error('Please define at least one input and output field');
          return false;
        }
        break;
      case 4:
        if (!agentData.hitlMode) {
          toast.error('Please select a HITL mode');
          return false;
        }
        break;
    }
    return true;
  };

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      // Call the createAgent function from agentStore
      const newAgent = await createAgent(agentData);
      toast.success('Agent created successfully!');
      // Navigate to the agent detail page or agents list
      navigate(`/agents/${newAgent.id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create agent');
    } finally {
      setIsCreating(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep data={agentData} onChange={setAgentData} />;
      case 2:
        return <EngineSelectionStep data={agentData} onChange={setAgentData} />;
      case 3:
        return <ConfigurationStep data={agentData} onChange={setAgentData} />;
      case 4:
        return <HITLModeStep data={agentData} onChange={setAgentData} />;
      case 5:
        return <ReviewStep data={agentData} onEdit={handleStepEdit} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="py-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/agents')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </button>
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
            Create Precision AI Agent
          </h1>
          <p className="text-lg text-gray-600">
            Build a custom AI agent tailored to your specific needs
          </p>
        </div>

        {/* Wizard Steps */}
        <WizardSteps steps={wizardSteps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="mb-8">{renderCurrentStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between bg-white border-t border-gray-200 py-6 sticky bottom-0">
          <div>
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/agents')}
            >
              Cancel
            </Button>

            {currentStep < wizardSteps.length ? (
              <Button
                variant="primary"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleCreate}
                loading={isCreating}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {isCreating ? 'Creating Agent...' : 'Create Agent'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgentBuilderPage;
