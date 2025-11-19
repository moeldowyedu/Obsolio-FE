import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import { formatRelativeTime } from '../../utils/formatters';

const AgentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      agent: 'Customer Support AI',
      action: 'Processed 145 customer inquiries',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'success',
      icon: '💬'
    },
    {
      id: 2,
      agent: 'Legal Document Analyzer',
      action: 'Reviewed 8 contracts for compliance',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'success',
      icon: '⚖️'
    },
    {
      id: 3,
      agent: 'Sales Forecasting AI',
      action: 'Generated Q4 revenue predictions',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      status: 'success',
      icon: '📈'
    },
    {
      id: 4,
      agent: 'HR Recruitment Assistant',
      action: 'Screened 23 candidate applications',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      status: 'pending',
      icon: '👥'
    },
    {
      id: 5,
      agent: 'Content Moderation AI',
      action: 'Flagged 12 posts for review',
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
      status: 'warning',
      icon: '🛡️'
    }
  ];

  const statusVariants = {
    success: 'success',
    pending: 'warning',
    warning: 'warning',
    error: 'danger'
  };

  return (
    <Card>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl flex-shrink-0">
              {activity.icon}
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-secondary-900 text-sm truncate">
                    {activity.agent}
                  </p>
                  <p className="text-sm text-secondary-600 mt-0.5">
                    {activity.action}
                  </p>
                </div>
                <Badge variant={statusVariants[activity.status]} size="sm">
                  {activity.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatRelativeTime(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All Activity →
        </button>
      </div>
    </Card>
  );
};

export default AgentActivityFeed;
