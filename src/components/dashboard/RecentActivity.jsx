import { Card, Badge } from '../common';
import { formatDistanceToNow } from 'date-fns';

const RecentActivity = ({ activities = [] }) => {
  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      running: 'info',
      failed: 'danger',
      pending: 'warning',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: '✓',
      running: '⟳',
      failed: '✗',
      pending: '⏱',
    };
    return icons[status] || '•';
  };

  // Mock data if empty
  const mockActivities = activities.length > 0 ? activities : [
    {
      id: 1,
      agentName: 'Document Analyzer',
      action: 'Execution completed',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    },
    {
      id: 2,
      agentName: 'Vision Classifier',
      action: 'Running analysis',
      status: 'running',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    },
    {
      id: 3,
      agentName: 'Text Summarizer',
      action: 'Execution completed',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: 4,
      agentName: 'Code Reviewer',
      action: 'Awaiting approval',
      status: 'pending',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
  ];

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-secondary-900">
          Recent Activity
        </h3>
        <a
          href="/history"
          className="text-sm text-primary-600 hover:text-primary-600 font-medium"
        >
          View all →
        </a>
      </div>

      <div className="space-y-3">
        {mockActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              <Badge variant={getStatusColor(activity.status)} size="sm">
                {getStatusIcon(activity.status)}
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary-900 truncate">
                {activity.agentName}
              </p>
              <p className="text-sm text-secondary-600">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {mockActivities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No recent activity</p>
          <p className="text-sm text-gray-400 mt-1">
            Your agent executions will appear here
          </p>
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
