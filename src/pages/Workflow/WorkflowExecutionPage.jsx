import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Badge, Card, Tabs } from '../../components/common';
import { WorkflowCanvas } from '../../components/workflow';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Download,
  RefreshCw,
} from 'lucide-react';

const WorkflowExecutionPage = () => {
  const navigate = useNavigate();
  const { workflowId, executionId } = useParams();

  // Mock workflow execution data
  const execution = {
    id: executionId,
    workflowId: workflowId,
    workflowName: 'Document Processing Pipeline',
    status: 'success',
    startedAt: new Date(Date.now() - 120000).toISOString(),
    completedAt: new Date(Date.now() - 60000).toISOString(),
    duration: 60000,
    triggeredBy: 'webhook',
  };

  // Mock nodes with execution status
  const nodes = [
    {
      id: 'node-1',
      type: 'trigger',
      label: 'Webhook Trigger',
      description: 'Document uploaded',
    },
    {
      id: 'node-2',
      type: 'agent',
      label: 'OCR Extraction',
      agentName: 'Document Processor',
      description: 'Extract text from document',
    },
    {
      id: 'node-3',
      type: 'condition',
      label: 'Check Confidence',
      condition: 'confidence > 0.8',
      description: 'Validate extraction quality',
    },
    {
      id: 'node-4',
      type: 'agent',
      label: 'Classification',
      agentName: 'Document Classifier',
      description: 'Classify document type',
    },
    {
      id: 'node-5',
      type: 'agent',
      label: 'Store Results',
      agentName: 'Data Storage',
      description: 'Save to database',
    },
  ];

  const executionStatuses = {
    'node-1': 'success',
    'node-2': 'success',
    'node-3': 'success',
    'node-4': 'success',
    'node-5': 'success',
  };

  // Mock execution logs
  const logs = [
    {
      timestamp: new Date(Date.now() - 120000).toISOString(),
      level: 'info',
      nodeId: 'node-1',
      message: 'Workflow triggered by webhook event',
    },
    {
      timestamp: new Date(Date.now() - 115000).toISOString(),
      level: 'info',
      nodeId: 'node-2',
      message: 'Starting OCR extraction',
    },
    {
      timestamp: new Date(Date.now() - 110000).toISOString(),
      level: 'info',
      nodeId: 'node-2',
      message: 'OCR extraction completed with 95% confidence',
    },
    {
      timestamp: new Date(Date.now() - 105000).toISOString(),
      level: 'info',
      nodeId: 'node-3',
      message: 'Confidence threshold met (95% > 80%)',
    },
    {
      timestamp: new Date(Date.now() - 100000).toISOString(),
      level: 'info',
      nodeId: 'node-4',
      message: 'Starting document classification',
    },
    {
      timestamp: new Date(Date.now() - 90000).toISOString(),
      level: 'info',
      nodeId: 'node-4',
      message: 'Document classified as: Invoice',
    },
    {
      timestamp: new Date(Date.now() - 70000).toISOString(),
      level: 'info',
      nodeId: 'node-5',
      message: 'Storing results in database',
    },
    {
      timestamp: new Date(Date.now() - 60000).toISOString(),
      level: 'info',
      nodeId: 'node-5',
      message: 'Workflow execution completed successfully',
    },
  ];

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
        icon: Play,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        variant: 'info',
      },
    };
    return configs[status] || configs.success;
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

  const handleDownloadLogs = () => {
    const logsText = logs
      .map((log) => `[${formatTimestamp(log.timestamp)}] [${log.nodeId}] ${log.level.toUpperCase()}: ${log.message}`)
      .join('\n');
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-${executionId}-logs.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRetry = () => {
    navigate(`/workflows/${workflowId}/execute`);
  };

  const config = getStatusConfig(execution.status);
  const StatusIcon = config.icon;

  const tabs = [
    {
      id: 'visualization',
      label: 'Workflow Visualization',
      content: (
        <div className="h-[600px]">
          <WorkflowCanvas
            nodes={nodes}
            executionStatuses={executionStatuses}
            isExecuting={execution.status === 'running'}
            readOnly={true}
          />
        </div>
      ),
    },
    {
      id: 'logs',
      label: 'Execution Logs',
      badge: logs.length.toString(),
      content: (
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Execution Logs</h3>
            <Button onClick={handleDownloadLogs} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Logs
            </Button>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-auto max-h-[500px]">
            {logs.map((log, index) => (
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
                <span className="text-purple-400">[{log.nodeId}]</span>{' '}
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
            <Button onClick={() => navigate(`/workflows/${workflowId}`)} variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-heading font-bold text-gray-900">
                  {execution.workflowName}
                </h1>
                <Badge variant={config.variant} size="lg">
                  <StatusIcon className="w-4 h-4 mr-1" />
                  {execution.status}
                </Badge>
              </div>
              <p className="text-lg text-gray-600">
                Execution #{executionId?.slice(0, 8) || 'N/A'}
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
              <Play className="w-5 h-5 text-gray-500" />
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
              <Play className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-600">Nodes Executed</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{nodes.length}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} defaultTab="visualization" variant="default" />
      </div>
    </MainLayout>
  );
};

export default WorkflowExecutionPage;
