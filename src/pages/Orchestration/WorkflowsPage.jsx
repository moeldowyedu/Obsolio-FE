import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Play, Edit, Trash2, Copy } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const WorkflowsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [workflows] = useState([
    {
      id: 1,
      name: 'Customer Onboarding Flow',
      description: 'Automated workflow for new customer onboarding',
      status: 'active',
      agents: 3,
      executions: 127,
      successRate: 94,
      lastRun: '2 hours ago'
    },
    {
      id: 2,
      name: 'Document Processing Pipeline',
      description: 'Extract and process documents automatically',
      status: 'active',
      agents: 5,
      executions: 450,
      successRate: 98,
      lastRun: '15 minutes ago'
    },
    {
      id: 3,
      name: 'Support Ticket Triage',
      description: 'Classify and route support tickets',
      status: 'paused',
      agents: 2,
      executions: 89,
      successRate: 91,
      lastRun: '1 day ago'
    }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'green',
      paused: 'yellow',
      draft: 'gray'
    };
    return colors[status] || 'gray';
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Workflows</h1>
          <p className="text-secondary-600">
            Orchestrate multiple agents in automated workflows
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
            Filter
          </Button>
          <Button
            onClick={() => navigate('/orchestration/builder')}
            icon={<Plus className="w-4 h-4" />}
          >
            Create Workflow
          </Button>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 gap-6">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-secondary-900">
                        {workflow.name}
                      </h3>
                      <Badge color={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                    </div>
                    <p className="text-secondary-600">{workflow.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Agents</p>
                    <p className="text-lg font-semibold text-secondary-900">
                      {workflow.agents}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Executions</p>
                    <p className="text-lg font-semibold text-secondary-900">
                      {workflow.executions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                    <p className="text-lg font-semibold text-green-600">
                      {workflow.successRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Run</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {workflow.lastRun}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <Button size="sm" icon={<Play className="w-4 h-4" />}>
                    Run Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/orchestration/builder')}
                    icon={<Edit className="w-4 h-4" />}
                  >
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" icon={<Copy className="w-4 h-4" />}>
                    Duplicate
                  </Button>
                  <Button size="sm" variant="outline" icon={<Trash2 className="w-4 h-4" />}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default WorkflowsPage;
