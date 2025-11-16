import { Card, Badge, EmptyState } from '../common';
import { CheckCircle, XCircle, User, Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HITLActivityLog = ({ activities = [], compact = false }) => {
  const navigate = useNavigate();

  const getDecisionConfig = (decision) => {
    const configs = {
      approved: {
        icon: CheckCircle,
        color: 'text-green-500',
        bg: 'bg-green-50',
        border: 'border-green-200',
        variant: 'success',
        label: 'Approved',
      },
      rejected: {
        icon: XCircle,
        color: 'text-red-500',
        bg: 'bg-red-50',
        border: 'border-red-200',
        variant: 'danger',
        label: 'Rejected',
      },
      auto_approved: {
        icon: CheckCircle,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        variant: 'info',
        label: 'Auto-Approved',
      },
    };
    return configs[decision] || configs.approved;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  if (activities.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="No HITL Activity Yet"
        description="HITL decisions will appear here once approvals are processed"
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        {!compact && (
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        )}

        {/* Activity items */}
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const config = getDecisionConfig(activity.decision);
            const DecisionIcon = config.icon;

            return (
              <div
                key={activity.id}
                className={`relative flex gap-4 ${compact ? '' : ''}`}
              >
                {/* Timeline dot */}
                {!compact && (
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${config.bg} ${config.border} border-2`}
                  >
                    <DecisionIcon className={`w-6 h-6 ${config.color}`} />
                  </div>
                )}

                {/* Content */}
                <Card padding="md" className={`flex-1 ${compact ? '' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {activity.agentName}
                        </h4>
                        <Badge variant={config.variant} size="sm">
                          {compact && <DecisionIcon className="w-3 h-3 mr-1" />}
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Execution #{activity.executionId?.slice(0, 8) || 'N/A'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{activity.decidedBy || 'System'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(activity.decidedAt)}</span>
                        </div>
                        {activity.duration && (
                          <div>
                            <span className="font-medium">
                              Response time: {formatDuration(activity.duration)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {activity.executionId && (
                      <button
                        onClick={() => {
                          if (activity.agentId && activity.executionId) {
                            navigate(
                              `/agents/${activity.agentId}/executions/${activity.executionId}`
                            );
                          }
                        }}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                    )}
                  </div>

                  {/* Decision reason */}
                  {activity.comment && (
                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Decision Comment
                      </p>
                      <p className="text-sm text-gray-700">{activity.comment}</p>
                    </div>
                  )}

                  {/* Metrics if available */}
                  {!compact && activity.metrics && (
                    <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Confidence</p>
                        <p className="text-sm font-medium text-gray-900">
                          {(activity.metrics.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Priority</p>
                        <Badge variant="default" size="sm">
                          {activity.priority || 'medium'}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">HITL Mode</p>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.hitlMode || 'N/A'}
                        </p>
                      </div>
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

export default HITLActivityLog;
