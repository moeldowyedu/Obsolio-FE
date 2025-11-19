import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Play, ArrowLeft } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';

const WorkflowBuilderPage = () => {
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');

  return (
    <MainLayout>
      <div className="p-8 min-h-full bg-gray-50">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate('/orchestration/workflows')}
            >
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Workflow Builder</h1>
              <p className="text-secondary-600">Design your automated workflow</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" icon={<Save className="w-4 h-4" />}>
              Save Draft
            </Button>
            <Button icon={<Play className="w-4 h-4" />}>
              Test Run
            </Button>
          </div>
        </div>

        {/* Workflow Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Workflow Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Workflow Name
              </label>
              <input
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="e.g., Customer Onboarding Flow"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={workflowDescription}
                onChange={(e) => setWorkflowDescription(e.target.value)}
                placeholder="Brief description of workflow purpose"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Workflow Canvas</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔀</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Build Your Workflow
              </h3>
              <p className="text-secondary-600 mb-6">
                Drag and drop agents, add conditions, and connect steps to create your automated workflow.
              </p>
              <p className="text-sm text-gray-500">
                Visual workflow builder coming soon. For now, you can use the existing WorkflowBuilderPage component.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WorkflowBuilderPage;
