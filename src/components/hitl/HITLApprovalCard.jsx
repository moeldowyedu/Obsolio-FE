import { useState } from 'react';
import { Card, Badge, Button } from '../common';
import { CheckCircle, XCircle, Clock, AlertCircle, Eye, User } from 'lucide-react';
import { HITL_MODES } from '../../utils/constants';

const HITLApprovalCard = ({ approval, onApprove, onReject, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityVariant = (priority) => {
    const variants = {
      urgent: 'danger',
      high: 'warning',
      medium: 'info',
      low: 'default',
    };
    return variants[priority] || 'default';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  };

  const hitlMode = HITL_MODES.find((m) => m.id === approval.hitlMode);

  return (
    <Card padding="md" className="hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{approval.agentName}</h3>
            <Badge variant={getPriorityVariant(approval.priority)} size="sm">
              {approval.priority}
            </Badge>
            {approval.hitlMode && (
              <Badge variant="default" size="sm">
                {hitlMode?.name || approval.hitlMode}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{approval.description || 'Awaiting approval'}</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-600 mb-1">Execution ID</p>
          <p className="text-sm font-medium text-gray-900 font-mono">
            #{approval.executionId?.slice(0, 8) || 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Confidence</p>
          <p className={`text-sm font-bold ${getConfidenceColor(approval.confidence)}`}>
            {(approval.confidence * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Created</p>
          <p className="text-sm text-gray-900">{formatDate(approval.createdAt)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Waiting</p>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <p className="text-sm text-gray-900">{getTimeAgo(approval.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {approval.input && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Input Data</p>
              <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-auto max-h-40">
                {JSON.stringify(approval.input, null, 2)}
              </pre>
            </div>
          )}
          {approval.output && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Proposed Output</p>
              <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-auto max-h-40">
                {JSON.stringify(approval.output, null, 2)}
              </pre>
            </div>
          )}
          {approval.reason && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Reason for Review</p>
              <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <p className="text-sm text-yellow-800">{approval.reason}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onViewDetails && (
          <Button
            onClick={() => onViewDetails(approval.id)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        )}
        <Button
          onClick={() => onReject(approval.id)}
          variant="outline"
          size="sm"
          className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
        >
          <XCircle className="w-4 h-4 mr-1" />
          Reject
        </Button>
        <Button
          onClick={() => onApprove(approval.id)}
          variant="primary"
          size="sm"
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          Approve
        </Button>
      </div>
    </Card>
  );
};

export default HITLApprovalCard;
