import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Badge, Tabs, Card, Alert } from '../../components/common';
import {
  AgentExecutionTimeline,
  AgentAnalytics,
  AgentSettings,
} from '../../components/agents';
import { useAgentStore } from '../../store/agentStore';
import {
  ArrowLeft,
  Play,
  Pause,
  Edit,
  Share2,
  Clock,
  TrendingUp,
  Activity,
  Settings as SettingsIcon,
  BarChart3,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ENGINES } from '../../utils/constants';

const AgentDetailPage = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const {
    currentAgent,
    agentHistory,
    fetchAgent,
    fetchAgentHistory,
    runAgent,
    updateAgent,
    deleteAgent,
    updateAgentStatus,
    isLoading,
  } = useAgentStore();

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAgentData();
  }, [agentId]);

  const loadAgentData = async () => {
    try {
      await fetchAgent(agentId);
      await fetchAgentHistory(agentId);
    } catch (error) {
      toast.error('Failed to load agent data');
      navigate('/agents');
    }
  };

  const handleRunAgent = async () => {
    try {
      await runAgent(agentId, {});
      toast.success('Agent execution started');
      await fetchAgentHistory(agentId);
    } catch (error) {
      toast.error('Failed to start agent execution');
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = currentAgent.status === 'active' ? 'paused' : 'active';
    try {
      await updateAgentStatus(agentId, newStatus);
      toast.success(`Agent ${newStatus === 'active' ? 'activated' : 'paused'}`);
    } catch (error) {
      toast.error('Failed to update agent status');
    }
  };

  const handleUpdateAgent = async (agentId, data) => {
    await updateAgent(agentId, data);
  };

  const handleDeleteAgent = async (agentId) => {
    await deleteAgent(agentId);
    navigate('/agents');
  };

  const getStatusVariant = (status) => {
    const variants = {
      active: 'success',
      inactive: 'default',
      error: 'danger',
      paused: 'warning',
    };
    return variants[status] || 'default';
  };

  // Mock data if no agent
  const agent = currentAgent || {
    id: agentId,
    name: 'Customer Support Assistant',
    description: 'AI-powered customer support agent with multi-language support and sentiment analysis',
    status: 'active',
    engines: ['text', 'vision'],
    industry: 'customer-service',
    hitlMode: 'confidence',
    stats: {
      totalRuns: 1247,
      successRate: 94.2,
      avgDuration: 2.3,
    },
    createdAt: new Date().toISOString(),
    lastRun: new Date().toISOString(),
  };

  const executions = agentHistory.length > 0 ? agentHistory : [
    {
      id: 'exec-1',
      executionNumber: 1247,
      status: 'success',
      startedAt: new Date(Date.now() - 3600000).toISOString(),
      duration: 2340,
      triggeredBy: 'Manual',
      itemsProcessed: 15,
      inputPreview: { message: 'Hello, I need help with my order' },
    },
    {
      id: 'exec-2',
      executionNumber: 1246,
      status: 'success',
      startedAt: new Date(Date.now() - 7200000).toISOString(),
      duration: 1980,
      triggeredBy: 'Webhook',
      itemsProcessed: 8,
    },
    {
      id: 'exec-3',
      executionNumber: 1245,
      status: 'failed',
      startedAt: new Date(Date.now() - 10800000).toISOString(),
      duration: 890,
      triggeredBy: 'Schedule',
      itemsProcessed: 0,
      errorMessage: 'Rate limit exceeded on external API',
    },
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Activity className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Agent Info */}
          <Card padding="md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-gray-900">{agent.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <Badge variant={getStatusVariant(agent.status)}>{agent.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">HITL Mode</p>
                  <Badge variant="default">{agent.hitlMode || 'none'}</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Enabled Engines</p>
                <div className="flex flex-wrap gap-2">
                  {agent.engines?.map((engineId) => {
                    const engine = ENGINES.find((e) => e.id === engineId);
                    return (
                      <Badge key={engineId} variant="default">
                        {engine?.icon} {engine?.name || engineId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Created</p>
                  <p className="text-gray-900">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Run</p>
                  <p className="text-gray-900">
                    {agent.lastRun
                      ? new Date(agent.lastRun).toLocaleDateString()
                      : 'Never'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card padding="md">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Total Runs</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {agent.stats?.totalRuns?.toLocaleString() || 0}
              </p>
            </Card>

            <Card padding="md">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {agent.stats?.successRate || 0}%
              </p>
            </Card>

            <Card padding="md">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Avg Duration</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {agent.stats?.avgDuration || 0}s
              </p>
            </Card>
          </div>

          {/* Recent Executions */}
          <Card padding="md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Executions</h3>
            <AgentExecutionTimeline executions={executions.slice(0, 5)} agentId={agentId} />
          </Card>
        </div>
      ),
    },
    {
      id: 'executions',
      label: 'Execution History',
      icon: <Clock className="w-4 h-4" />,
      badge: executions.length.toString(),
      content: <AgentExecutionTimeline executions={executions} agentId={agentId} />,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
      content: <AgentAnalytics analytics={agent.analytics} />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon className="w-4 h-4" />,
      content: (
        <AgentSettings agent={agent} onUpdate={handleUpdateAgent} onDelete={handleDeleteAgent} />
      ),
    },
  ];

  if (isLoading && !currentAgent) {
    return (
      <MainLayout>
        <div className="py-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading agent...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Button onClick={() => navigate('/agents')} variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-heading font-bold text-gray-900">
                  {agent.name}
                </h1>
                <Badge variant={getStatusVariant(agent.status)} size="lg">
                  {agent.status}
                </Badge>
              </div>
              <p className="text-lg text-gray-600">{agent.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleToggleStatus} variant="outline">
              {agent.status === 'active' ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Activate
                </>
              )}
            </Button>
            <Button
              onClick={handleRunAgent}
              variant="primary"
              disabled={agent.status !== 'active'}
            >
              <Play className="w-5 h-5 mr-2" />
              Run Now
            </Button>
          </div>
        </div>

        {/* Alert if paused */}
        {agent.status === 'paused' && (
          <Alert variant="warning" title="Agent Paused">
            This agent is currently paused. Activate it to enable executions.
          </Alert>
        )}

        {/* Tabs */}
        <Tabs tabs={tabs} defaultTab="overview" onChange={setActiveTab} variant="default" />
      </div>
    </MainLayout>
  );
};

export default AgentDetailPage;
