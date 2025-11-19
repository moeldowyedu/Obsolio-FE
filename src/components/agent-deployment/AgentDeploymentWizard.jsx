import { useNavigate } from 'react-router-dom';
import { useAgentDeploymentStore } from '../../store/agentDeploymentStore';
import WizardSteps from '../wizard/WizardSteps';
import SelectAgentSourceStep from './SelectAgentSourceStep';
import DefineJobDetailsStep from './DefineJobDetailsStep';
import SetScheduleStep from './SetScheduleStep';
import ConfigureInputOutputStep from './ConfigureInputOutputStep';
import SetHITLModeStep from './SetHITLModeStep';
import SetPermissionsStep from './SetPermissionsStep';
import ReviewDeployStep from './ReviewDeployStep';
import MainLayout from '../layout/MainLayout';

const AgentDeploymentWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    isLoading,
  } = useAgentDeploymentStore();

  const wizardSteps = [
    {
      id: 'agent-source',
      title: 'Agent Source',
      description: 'Select agent',
    },
    {
      id: 'job-details',
      title: 'Job Details',
      description: 'Define role',
    },
    {
      id: 'schedule',
      title: 'Schedule',
      description: 'Set timing',
    },
    {
      id: 'input-output',
      title: 'Input/Output',
      description: 'Configure flow',
    },
    {
      id: 'hitl-mode',
      title: 'HITL Mode',
      description: 'Set oversight',
    },
    {
      id: 'permissions',
      title: 'Permissions',
      description: 'Access control',
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Deploy',
    },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectAgentSourceStep onNext={nextStep} />;
      case 2:
        return <DefineJobDetailsStep onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <SetScheduleStep onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <ConfigureInputOutputStep onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <SetHITLModeStep onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <SetPermissionsStep onNext={nextStep} onBack={prevStep} />;
      case 7:
        return <ReviewDeployStep onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-full p-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-secondary-900 mb-2">Deploy AI Agent</h1>
            <p className="text-secondary-600">
              Set up your AI agent as a virtual employee in your organization
            </p>
          </div>

          {/* Wizard Steps Progress */}
          <div className="mb-8">
            <WizardSteps steps={wizardSteps} currentStep={currentStep} />
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
                  <p className="text-secondary-600">Processing...</p>
                </div>
              </div>
            ) : (
              renderStep()
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Need help?{' '}
              <a href="/docs/agent-deployment" className="text-primary-600 hover:text-primary-600">
                View Documentation
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgentDeploymentWizard;
