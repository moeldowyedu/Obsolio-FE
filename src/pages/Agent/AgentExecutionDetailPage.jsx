import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Badge, Card, Tabs } from '../../components/common';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  PlayCircle,
  AlertCircle,
  Download,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AgentExecutionDetailPage = () => {
  const { agentId, executionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock execution data
  const execution = {
    id: executionId,
    executionNumber: 1247,
    status: 'success',
    startedAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 3540000).toISOString(),
    duration: 2340,
    triggeredBy: 'Manual',
    triggeredByUser: 'john.doe@example.com',
    itemsProcessed: 15,
    input: {
      message: 'Hello, I need help with my order #12345',
      channel: 'email',
      priority: 'high',
      metadata: {
        customerId: 'CUST-789',
        orderDate: '2025-01-15',
      },
    },
    output: {
      response: 'I\'ve located your order #12345. It was shipped on January 16th and is currently in transit. Expected delivery is January 18th.',
      confidence: 0.94,
      sentiment: 'positive',
      suggestedActions: ['track_package', 'send_confirmation_email'],
    },
    logs: [
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        level: 'info',
        message: 'Execution started',
      },
      {
        timestamp: new Date(Date.now() - 3598000).toISOString(),
        level: 'info',
        message: 'Processing input data',
      },
      {
        timestamp: new Date(Date.now() - 3595000).toISOString(),
        level: 'info',
        message: 'Invoking Text Engine for sentiment analysis',
      },
      {
        timestamp: new Date(Date.now() - 3590000).toISOString(),
        level: 'info',
        message: 'Sentiment detected: neutral',
      },
      {
        timestamp: new Date(Date.now() - 3585000).toISOString(),
        level: 'info',
        message: 'Querying order database',
      },
      {
        timestamp: new Date(Date.now() - 3580000).toISOString(),
        level: 'info',
        message: 'Order found: #12345',
      },
      {
        timestamp: new Date(Date.now() - 3575000).toISOString(),
        level: 'info',
        message: 'Generating response',
      },
      {
        timestamp: new Date(Date.now() - 3570000).toISOString(),
        level: 'info',
        message: 'Response generated with 94% confidence',
      },
      {
        timestamp: new Date(Date.now() - 3565000).toISOString(),
        level: 'info',
        message: 'Execution completed successfully',
      },
    ],
    metrics: {
      cpuUsage: 45,
      memoryUsage: 128,
      apiCalls: 3,
      tokensUsed: 456,
    },
  };

  const getStatusConfig = (status) => {
    const configs = {
      success: {
        icon: CheckCircle,
        color: 'text-green-500',
        bg: 'bg-green-50',
        border: 'border-green-200',
        variant: 'success',
      },
      failed: {
        icon: XCircle,
        color: 'text-red-500',
        bg: 'bg-red-50',
        border: 'border-red-200',
        variant: 'danger',
      },
      running: {
        icon: PlayCircle,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        variant: 'info',
      },
      pending: {
        icon: Clock,
        color: 'text-yellow-500',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        variant: 'warning',
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const handleRetry = () => {
    toast.success('Execution retried');
  };

  const handleDownloadLogs = () => {
    const logsText = execution.logs
      .map((log) => `[${formatTimestamp(log.timestamp)}] ${log.level.toUpperCase()}: ${log.message}`)
      .join('\n');
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `execution-${executionId}-logs.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const config = getStatusConfig(execution.status);
  const StatusIcon = config.icon;

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Input/Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Input</h3>
              <pre className="text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                {JSON.stringify(execution.input, null, 2)}
              </pre>
            </Card>

            <Card padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Output</h3>
              <pre className="text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                {JSON.stringify(execution.output, null, 2)}
              </pre>
            </Card>
          </div>

          {/* Metrics */}
          <Card padding="md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Usage</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">CPU Usage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {execution.metrics.cpuUsage}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Memory</p>
                <p className="text-2xl font-bold text-gray-900">
                  {execution.metrics.memoryUsage}MB
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">API Calls</p>
                <p className="text-2xl font-bold text-gray-900">
                  {execution.metrics.apiCalls}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tokens Used</p>
                <p className="text-2xl font-bold text-gray-900">
                  {execution.metrics.tokensUsed}
                </p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'logs',
      label: 'Execution Logs',
      badge: execution.logs.length.toString(),
      content: (
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Execution Logs</h3>
            <Button onClick={handleDownloadLogs} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Logs
            </Button>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-auto max-h-[600px]">
            {execution.logs.map((log, index) => (
              <div
                key={index}
                className={`mb-1 ${
                  log.level === 'error'
                    ? 'text-red-400'
                    : log.level === 'warning'
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                <span className="text-gray-500">[{formatTimestamp(log.timestamp)}]</span>{' '}
                <span
                  className={`font-semibold ${
                    log.level === 'error'
                      ? 'text-red-400'
                      : log.level === 'warning'
                      ? 'text-yellow-400'
                      : 'text-blue-400'
                  }`}
                >
                  {log.level.toUpperCase()}:
                </span>{' '}
                {log.message}
              </div>
            ))}
          </div>
        </Card>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Button onClick={() => navigate(`/agents/${agentId}`)} variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-heading font-bold text-gray-900">
                  Execution #{execution.executionNumber}
                </h1>
                <Badge variant={config.variant} size="lg">
                  <StatusIcon className="w-4 h-4 mr-1" />
                  {execution.status}
                </Badge>
              </div>
              <p className="text-lg text-gray-600">
                Triggered by {execution.triggeredByUser || execution.triggeredBy}
              </p>
            </div>
          </div>
          {execution.status === 'failed' && (
            <Button onClick={handleRetry} variant="primary">
              <RefreshCw className="w-5 h-5 mr-2" />
              Retry Execution
            </Button>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-600">Duration</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatDuration(execution.duration)}
            </p>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-2 mb-2">
              <PlayCircle className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-600">Started At</p>
            </div>
            <p className="text-lg font-medium text-gray-900">
              {new Date(execution.startedAt).toLocaleTimeString()}
            </p>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-600">Completed At</p>
            </div>
            <p className="text-lg font-medium text-gray-900">
              {execution.completedAt
                ? new Date(execution.completedAt).toLocaleTimeString()
                : 'N/A'}
            </p>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-600">Items Processed</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{execution.itemsProcessed}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} defaultTab="overview" variant="default" />
      </div>
    </MainLayout>
  );
};

export default AgentExecutionDetailPage;
