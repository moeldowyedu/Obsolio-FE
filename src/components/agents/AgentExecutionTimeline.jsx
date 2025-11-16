import { Badge, Card, EmptyState } from '../common';
import {
  CheckCircle,
  XCircle,
  Clock,
  PlayCircle,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AgentExecutionTimeline = ({ executions = [], agentId }) => {
  const navigate = useNavigate();

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
      timeout: {
        icon: AlertCircle,
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        variant: 'warning',
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (ms) => {
    if (!ms) return 'N/A';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  if (executions.length === 0) {
    return (
      <EmptyState
        icon={PlayCircle}
        title="No Executions Yet"
        description="This agent hasn't been run yet. Click 'Run Now' to execute it."
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Execution items */}
        <div className="space-y-6">
          {executions.map((execution, index) => {
            const config = getStatusConfig(execution.status);
            const StatusIcon = config.icon;

            return (
              <div key={execution.id} className="relative flex gap-4">
                {/* Timeline dot */}
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${config.bg} ${config.border} border-2`}
                >
                  <StatusIcon className={`w-6 h-6 ${config.color}`} />
                </div>

                {/* Content */}
                <Card padding="md" className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          Execution #{execution.executionNumber || execution.id.slice(0, 8)}
                        </h4>
                        <Badge variant={config.variant} size="sm">
                          {execution.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {formatDate(execution.startedAt)}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/agents/${agentId}/executions/${execution.id}`)}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Eye className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Duration</p>
                      <p className="font-medium text-gray-900">
                        {formatDuration(execution.duration)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Triggered By</p>
                      <p className="font-medium text-gray-900">
                        {execution.triggeredBy || 'Manual'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Items Processed</p>
                      <p className="font-medium text-gray-900">
                        {execution.itemsProcessed || 0}
                      </p>
                    </div>
                  </div>

                  {/* Error message if failed */}
                  {execution.status === 'failed' && execution.errorMessage && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">
                        <span className="font-medium">Error: </span>
                        {execution.errorMessage}
                      </p>
                    </div>
                  )}

                  {/* Input/Output preview */}
                  {execution.inputPreview && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-1">Input</p>
                      <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-200 overflow-x-auto">
                        {JSON.stringify(execution.inputPreview, null, 2)}
                      </pre>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgentExecutionTimeline;
