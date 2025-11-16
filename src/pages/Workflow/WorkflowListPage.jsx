import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Tabs, Card, Badge, EmptyState } from '../../components/common';
import { WorkflowTemplateCard } from '../../components/workflow';
import { Plus, Search, GitBranch, Zap, TrendingUp } from 'lucide-react';

const WorkflowListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock workflow templates
  const templates = [
    {
      id: '1',
      name: 'Sequential Processing',
      description: 'Process data through multiple agents in sequence',
      nodeCount: 5,
      usageCount: 245,
      category: 'Data Processing',
      isPopular: true,
      tags: ['sequential', 'data', 'processing'],
      nodes: [
        { type: 'trigger' },
        { type: 'agent' },
        { type: 'agent' },
        { type: 'agent' },
        { type: 'merge' },
      ],
    },
    {
      id: '2',
      name: 'Conditional Customer Support',
      description: 'Route customer queries based on sentiment and priority',
      nodeCount: 7,
      usageCount: 189,
      category: 'Customer Service',
      isPopular: true,
      tags: ['conditional', 'support', 'routing'],
      nodes: [
        { type: 'trigger' },
        { type: 'agent' },
        { type: 'condition' },
        { type: 'agent' },
        { type: 'agent' },
      ],
    },
    {
      id: '3',
      name: 'Document Analysis Pipeline',
      description: 'Extract, classify, and store document data automatically',
      nodeCount: 6,
      usageCount: 156,
      category: 'Document Processing',
      tags: ['documents', 'ocr', 'classification'],
      nodes: [
        { type: 'trigger' },
        { type: 'agent' },
        { type: 'filter' },
        { type: 'agent' },
        { type: 'merge' },
      ],
    },
    {
      id: '4',
      name: 'Parallel Market Research',
      description: 'Run multiple research agents in parallel and merge results',
      nodeCount: 8,
      usageCount: 92,
      category: 'Research',
      tags: ['parallel', 'research', 'analysis'],
      nodes: [
        { type: 'trigger' },
        { type: 'agent' },
        { type: 'agent' },
        { type: 'agent' },
        { type: 'merge' },
      ],
    },
    {
      id: '5',
      name: 'Iterative Content Generation',
      description: 'Generate and refine content through multiple iterations',
      nodeCount: 5,
      usageCount: 78,
      category: 'Content',
      tags: ['loop', 'content', 'generation'],
      nodes: [
        { type: 'trigger' },
        { type: 'agent' },
        { type: 'loop' },
        { type: 'agent' },
      ],
    },
    {
      id: '6',
      name: 'Email Campaign Automation',
      description: 'Automated email processing with sentiment analysis and routing',
      nodeCount: 9,
      usageCount: 134,
      category: 'Marketing',
      tags: ['email', 'automation', 'marketing'],
      nodes: [
        { type: 'trigger' },
        { type: 'agent' },
        { type: 'filter' },
        { type: 'condition' },
        { type: 'agent' },
      ],
    },
  ];

  // Mock user workflows
  const userWorkflows = [
    {
      id: 'w1',
      name: 'My Custom Support Flow',
      description: 'Custom workflow for handling priority customer support',
      nodeCount: 6,
      lastRun: new Date(Date.now() - 3600000).toISOString(),
      status: 'active',
      executions: 45,
    },
    {
      id: 'w2',
      name: 'Document Processing v2',
      description: 'Enhanced document processing with validation',
      nodeCount: 8,
      lastRun: new Date(Date.now() - 7200000).toISOString(),
      status: 'active',
      executions: 123,
    },
    {
      id: 'w3',
      name: 'Test Workflow',
      description: 'Testing new agent configurations',
      nodeCount: 3,
      lastRun: new Date(Date.now() - 86400000).toISOString(),
      status: 'draft',
      executions: 5,
    },
  ];

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(templates.map((t) => t.category))];

  const handleUseTemplate = (templateId) => {
    navigate(`/workflows/builder?template=${templateId}`);
  };

  const handleViewTemplate = (templateId) => {
    navigate(`/workflows/${templateId}`);
  };

  const getStatusVariant = (status) => {
    const variants = {
      active: 'success',
      draft: 'default',
      paused: 'warning',
    };
    return variants[status] || 'default';
  };

  const myWorkflowsTab = {
    id: 'my-workflows',
    label: 'My Workflows',
    icon: <GitBranch className="w-4 h-4" />,
    badge: userWorkflows.length.toString(),
    content: (
      <div className="space-y-4">
        {userWorkflows.length === 0 ? (
          <EmptyState
            icon={GitBranch}
            title="No Workflows Yet"
            description="Create your first workflow from scratch or use a template"
            action={
              <Button onClick={() => navigate('/workflows/builder')} variant="primary">
                <Plus className="w-5 h-5 mr-2" />
                Create Workflow
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userWorkflows.map((workflow) => (
              <Card key={workflow.id} padding="md" className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/workflows/${workflow.id}`)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {workflow.name}
                    </h3>
                    <p className="text-sm text-gray-600">{workflow.description}</p>
                  </div>
                  <Badge variant={getStatusVariant(workflow.status)} size="sm">
                    {workflow.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Nodes</p>
                    <p className="text-lg font-bold text-gray-900">{workflow.nodeCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Executions</p>
                    <p className="text-lg font-bold text-gray-900">{workflow.executions}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Last run: {new Date(workflow.lastRun).toLocaleString()}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    ),
  };

  const templatesTab = {
    id: 'templates',
    label: 'Templates',
    icon: <Zap className="w-4 h-4" />,
    badge: templates.length.toString(),
    content: (
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <WorkflowTemplateCard
              key={template.id}
              template={template}
              onUse={handleUseTemplate}
              onView={handleViewTemplate}
            />
          ))}
        </div>
      </div>
    ),
  };

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
              Workflow Orchestrator
            </h1>
            <p className="text-lg text-gray-600">
              Build and manage multi-agent workflows
            </p>
          </div>
          <Button onClick={() => navigate('/workflows/builder')} variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Create Workflow
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <GitBranch className="w-8 h-8 text-blue-600" />
              <Badge variant="info" size="lg">
                {userWorkflows.length}
              </Badge>
            </div>
            <p className="text-sm text-blue-600 font-medium">Active Workflows</p>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-green-600" />
              <Badge variant="success" size="lg">
                {templates.length}
              </Badge>
            </div>
            <p className="text-sm text-green-600 font-medium">Templates Available</p>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <Badge variant="default" size="lg">
                {userWorkflows.reduce((sum, w) => sum + w.executions, 0)}
              </Badge>
            </div>
            <p className="text-sm text-purple-600 font-medium">Total Executions</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[myWorkflowsTab, templatesTab]}
          defaultTab="my-workflows"
          variant="default"
        />
      </div>
    </MainLayout>
  );
};

export default WorkflowListPage;
