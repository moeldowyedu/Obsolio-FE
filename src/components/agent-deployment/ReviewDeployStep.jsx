import { useState } from 'react';
import {
  CheckCircle,
  Bot,
  Briefcase,
  Clock,
  ArrowRight,
  Shield,
  Eye,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import { useAgentDeploymentStore } from '../../store/agentDeploymentStore';

const ReviewDeployStep = ({ onBack }) => {
  const {
    agentSource,
    jobDetails,
    schedule,
    inputOutput,
    hitlConfig,
    permissions,
    getDeploymentConfig,
    completeDeployment,
    setLoading,
  } = useAgentDeploymentStore();

  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentSuccess, setDeploymentSuccess] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setLoading(true);

    try {
      // Simulate deployment API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, this would call the actual API
      // const config = getDeploymentConfig();
      // await deployAgent(config);

      completeDeployment();
      setDeploymentSuccess(true);
    } catch (error) {
      console.error('Deployment failed:', error);
      alert('Deployment failed. Please try again.');
    } finally {
      setIsDeploying(false);
      setLoading(false);
    }
  };

  if (deploymentSuccess) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-secondary-900 mb-4">Agent Deployed Successfully!</h2>
        <p className="text-secondary-600 mb-8">
          Your agent is now live and will start running according to the configured schedule.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <Bot className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h4 className="font-semibold text-secondary-900 mb-1">{jobDetails.jobTitle}</h4>
            <p className="text-sm text-secondary-600">Agent Name</p>
          </Card>
          <Card className="text-center">
            <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-secondary-900 mb-1">{schedule.frequency}</h4>
            <p className="text-sm text-secondary-600">Schedule</p>
          </Card>
          <Card className="text-center">
            <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-secondary-900 mb-1">{hitlConfig.mode}</h4>
            <p className="text-sm text-secondary-600">HITL Mode</p>
          </Card>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = '/agentx/my-agents')}
          >
            View All Agents
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => (window.location.href = `/agents/${agentSource.agentId}`)}
          >
            View Agent Details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Review & Deploy</h2>
        <p className="text-secondary-600">
          Review your configuration before deploying the agent
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Agent Source */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Agent Source</h3>
              <div className="space-y-1 text-sm text-secondary-600">
                <p>
                  <span className="font-medium text-secondary-700">Type:</span>{' '}
                  {agentSource.type === 'existing' ? 'Existing Agent' : agentSource.type === 'marketplace' ? 'Marketplace' : 'New Agent'}
                </p>
                {agentSource.agentData && (
                  <p>
                    <span className="font-medium text-secondary-700">Agent:</span> {agentSource.agentData.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Job Details */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Job Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-secondary-600">
                <p><span className="font-medium text-secondary-700">Job Title:</span> {jobDetails.jobTitle}</p>
                <p><span className="font-medium text-secondary-700">Employment:</span> {jobDetails.employmentType}</p>
                <p><span className="font-medium text-secondary-700">Department:</span> Department #{jobDetails.departmentId}</p>
                {jobDetails.branchId && <p><span className="font-medium text-secondary-700">Branch:</span> Branch #{jobDetails.branchId}</p>}
              </div>
            </div>
          </div>
        </Card>

        {/* Schedule */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Schedule</h3>
              <div className="space-y-1 text-sm text-secondary-600">
                <p><span className="font-medium text-secondary-700">Frequency:</span> {schedule.frequency}</p>
                {schedule.time && (
                  <p>
                    <span className="font-medium text-secondary-700">Time:</span> {schedule.time} ({schedule.timezone})
                  </p>
                )}
                <p><span className="font-medium text-secondary-700">Retry on Failure:</span> {schedule.retryOnFailure ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Input/Output */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Input/Output</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-secondary-700 mb-1">Input Source:</p>
                  <p className="text-sm text-secondary-600 capitalize">{inputOutput.inputSource.type || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-700 mb-1">Output Destination:</p>
                  <p className="text-sm text-secondary-600 capitalize">{inputOutput.outputDestination.type || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* HITL Configuration */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">HITL Configuration</h3>
              <div className="space-y-1 text-sm text-secondary-600">
                <p><span className="font-medium text-secondary-700">Mode:</span> {hitlConfig.mode}</p>
                <p><span className="font-medium text-secondary-700">Supervisors:</span> {hitlConfig.supervisorIds.length} assigned</p>
                {hitlConfig.supervisorIds.length > 1 && (
                  <p><span className="font-medium text-secondary-700">Routing:</span> {hitlConfig.approvalRouting}</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Permissions */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Permissions</h3>
              <div className="space-y-1 text-sm text-secondary-600">
                <p><span className="font-medium text-secondary-700">Visibility:</span> {permissions.visibility}</p>
                <p><span className="font-medium text-secondary-700">Can Modify:</span> {permissions.canModify}</p>
                <p><span className="font-medium text-secondary-700">Can Trigger:</span> {permissions.canTrigger}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Cost Estimate */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Estimated Cost</h3>
              <p className="text-sm text-secondary-600 mb-2">
                Based on your configuration, estimated monthly cost:
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-secondary-900">$49</span>
                <span className="text-secondary-600">/month</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Includes {schedule.frequency} runs, HITL supervision, and data storage
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 mb-8">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-yellow-900 mb-1">Before You Deploy</h4>
          <p className="text-sm text-yellow-800">
            Make sure all configurations are correct. You can modify settings after deployment, but
            changes may require re-approval depending on your organization's policies.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <Button variant="outline" size="lg" onClick={onBack} disabled={isDeploying}>
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleDeploy}
          loading={isDeploying}
          disabled={isDeploying}
          className="min-w-[200px]"
        >
          {isDeploying ? 'Deploying...' : 'Deploy Agent'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewDeployStep;
