import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import AgentBuilderWizard from '../../components/agentx/AgentBuilderWizard';

const AgentBuilderPage = () => {
  const navigate = useNavigate();

  const steps = [
    'Select Engines',
    'Configure Settings',
    'Set HITL Mode',
    'Define Schema',
    'Test Agent',
    'Deploy'
  ];

  const handleComplete = async (agentConfig) => {
    console.log('Agent configuration:', agentConfig);

    // TODO: Send to API
    // await agentService.createPrivateAgent(agentConfig);

    // Show success message and redirect
    alert('Agent deployed successfully!');
    navigate('/agentx/my-agents');
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-secondary-900">Create Private Agent</h1>
          <p className="text-secondary-600 mt-2">
            Build a custom AI agent tailored to your specific use case using our Precision Engines
          </p>
        </div>

        <AgentBuilderWizard steps={steps} onComplete={handleComplete} />
      </div>
    </MainLayout>
  );
};

export default AgentBuilderPage;
