import { Link } from 'react-router-dom';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import Button from '../common/Button/Button';
import { formatRelativeTime } from '../../utils/formatters';

const HITLQueuePreview = () => {
  const queueItems = [
    {
      id: 1,
      title: 'High-value contract approval needed',
      agent: 'Legal Document Analyzer',
      priority: 'high',
      confidence: 72,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      description: 'Contract value exceeds $100K threshold'
    },
    {
      id: 2,
      title: 'Content moderation decision',
      agent: 'Content Moderation AI',
      priority: 'medium',
      confidence: 68,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      description: 'Borderline content requires human judgment'
    },
    {
      id: 3,
      title: 'Customer complaint escalation',
      agent: 'Customer Support AI',
      priority: 'high',
      confidence: 45,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      description: 'Complex issue beyond AI capability'
    }
  ];

  const getPriorityVariant = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'default'
    };
    return variants[priority] || 'default';
  };

  return (
    <Card>
      {queueItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">✓</div>
          <p className="text-gray-500">No pending approvals</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {queueItems.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-secondary-900 text-sm">
                        {item.title}
                      </h4>
                      <Badge variant={getPriorityVariant(item.priority)} size="sm">
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-secondary-600">{item.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-secondary-900">
                      {item.confidence}%
                    </div>
                    <div className="text-xs text-gray-500">confidence</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">{item.agent}</span> • {formatRelativeTime(item.timestamp)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <Link to="/hitl/approvals">
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All Pending Approvals ({queueItems.length}) →
              </button>
            </Link>
          </div>
        </>
      )}
    </Card>
  );
};

export default HITLQueuePreview;
