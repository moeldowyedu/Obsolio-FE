import { useNavigate } from 'react-router-dom';
import { Card, Badge } from '../common';

const MyAgents = ({ agents = [] }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      inactive: 'default',
      draft: 'warning',
    };
    return colors[status] || 'default';
  };

  // Mock data if empty
  const mockAgents = agents.length > 0 ? agents : [
    {
      id: 1,
      name: 'Document Analyzer',
      status: 'active',
      runs: 234,
      lastRun: '2 hours ago',
      engines: ['document', 'text'],
    },
    {
      id: 2,
      name: 'Vision Classifier',
      status: 'active',
      runs: 156,
      lastRun: '5 minutes ago',
      engines: ['vision'],
    },
    {
      id: 3,
      name: 'Code Reviewer',
      status: 'draft',
      runs: 0,
      lastRun: 'Never',
      engines: ['code', 'text'],
    },
  ];

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-secondary-900">
          My Agents
        </h3>
        <button
          onClick={() => navigate('/agents/create')}
          className="text-sm text-primary-600 hover:text-primary-600 font-medium"
        >
          + New Agent
        </button>
      </div>

      <div className="space-y-2">
        {mockAgents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => navigate(`/agents/${agent.id}`)}
            className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-secondary-900">{agent.name}</h4>
              <Badge variant={getStatusColor(agent.status)} size="sm">
                {agent.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-secondary-600">
              <span>{agent.runs} runs</span>
              <span>•</span>
              <span>Last: {agent.lastRun}</span>
            </div>
            <div className="flex gap-1 mt-2">
              {agent.engines.map((engine, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-gray-100 text-secondary-700 rounded"
                >
                  {engine}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {mockAgents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No agents yet</p>
          <button
            onClick={() => navigate('/agents/create')}
            className="mt-2 text-sm text-primary-600 hover:text-primary-600 font-medium"
          >
            Create your first agent →
          </button>
        </div>
      )}
    </Card>
  );
};

export default MyAgents;
