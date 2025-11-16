import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Alert } from '../../components/common';
import { WorkflowCanvas, WorkflowSidebar } from '../../components/workflow';
import { ArrowLeft, Save, Play, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const WorkflowBuilderPage = () => {
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [nodes, setNodes] = useState([
    {
      id: 'node-1',
      type: 'trigger',
      label: 'Webhook Trigger',
      description: 'Start workflow on webhook event',
    },
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestRunning, setIsTestRunning] = useState(false);

  // Mock available agents
  const availableAgents = [
    { id: 'agent-1', name: 'Customer Support Assistant' },
    { id: 'agent-2', name: 'Document Processor' },
    { id: 'agent-3', name: 'Market Research Analyst' },
  ];

  const handleAddNodeType = (nodeType) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: nodeType,
      label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node`,
      description: '',
    };

    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
    toast.success(`${nodeType} node added`);
  };

  const handleAddNodeAt = (index) => {
    // Add a default agent node at the specified position
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'agent',
      label: 'New Agent Node',
      description: '',
    };

    const newNodes = [...nodes];
    newNodes.splice(index, 0, newNode);
    setNodes(newNodes);
    setSelectedNodeId(newNode.id);
  };

  const handleUpdateNode = (updatedNode) => {
    setNodes(nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node)));
    toast.success('Node updated');
  };

  const handleDeleteNode = (nodeId) => {
    if (nodes.length === 1) {
      toast.error('Cannot delete the last node');
      return;
    }

    setNodes(nodes.filter((node) => node.id !== nodeId));
    setSelectedNodeId(null);
    toast.success('Node deleted');
  };

  const handleSave = async () => {
    if (!workflowName.trim()) {
      toast.error('Please enter a workflow name');
      return;
    }

    if (nodes.length === 0) {
      toast.error('Workflow must have at least one node');
      return;
    }

    setIsSaving(true);
    try {
      // In real app, save to API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Workflow saved successfully');
    } catch (error) {
      toast.error('Failed to save workflow');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestRun = async () => {
    setIsTestRunning(true);
    try {
      // In real app, trigger test execution
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Test run completed successfully');
    } catch (error) {
      toast.error('Test run failed');
    } finally {
      setIsTestRunning(false);
    }
  };

  const handlePreview = () => {
    navigate('/workflows/preview', { state: { nodes, workflowName } });
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Button
              onClick={() => navigate('/workflows')}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <Input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="max-w-md"
              placeholder="Enter workflow name"
            />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{nodes.length} nodes</span>
              <span>•</span>
              <span className="text-green-600">Saved</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handlePreview} variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>

            <Button
              onClick={handleTestRun}
              variant="outline"
              size="sm"
              disabled={isTestRunning}
            >
              <Play className="w-4 h-4 mr-2" />
              {isTestRunning ? 'Running...' : 'Test Run'}
            </Button>

            <Button
              onClick={handleSave}
              variant="primary"
              size="sm"
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="px-6 pt-4">
        <Alert variant="info" title="Workflow Builder">
          Add nodes from the sidebar, configure them, and connect them to build your workflow.
          Click nodes to edit their settings.
        </Alert>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 p-6 overflow-auto">
          <WorkflowCanvas
            nodes={nodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            onConfigureNode={setSelectedNodeId}
            onAddNode={handleAddNodeAt}
          />
        </div>

        {/* Sidebar */}
        <WorkflowSidebar
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
          onAddNodeType={handleAddNodeType}
          availableAgents={availableAgents}
        />
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>Zoom: 100%</span>
            <span>•</span>
            <span>Auto-save enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Need help?</span>
            <Button variant="link" size="sm">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilderPage;
