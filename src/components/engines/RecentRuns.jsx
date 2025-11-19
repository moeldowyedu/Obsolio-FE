import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import { formatRelativeTime } from '../../utils/formatters';

const RecentRuns = ({ engineId }) => {
  // Mock recent runs data
  const runs = [
    {
      id: 1,
      input: 'customer_complaint_analysis.txt',
      status: 'completed',
      score: 92,
      rubric: 'Standard Quality Assessment',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      processingTime: 2.3
    },
    {
      id: 2,
      input: 'product_review_batch_001.csv',
      status: 'completed',
      score: 88,
      rubric: 'Compliance Check',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      processingTime: 1.8
    },
    {
      id: 3,
      input: 'legal_document_v2.pdf',
      status: 'in_progress',
      score: null,
      rubric: 'Advanced Evaluation',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      processingTime: null
    },
    {
      id: 4,
      input: 'content_moderation_queue.json',
      status: 'completed',
      score: 95,
      rubric: 'Standard Quality Assessment',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      processingTime: 3.1
    },
    {
      id: 5,
      input: 'email_campaign_draft.html',
      status: 'failed',
      score: null,
      rubric: 'Compliance Check',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      processingTime: null
    }
  ];

  const getStatusVariant = (status) => {
    const variants = {
      completed: 'success',
      in_progress: 'warning',
      failed: 'danger',
      pending: 'default'
    };
    return variants[status] || 'default';
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold font-heading text-secondary-900">
            Recent Runs
          </h2>
          <p className="text-sm text-secondary-600 mt-1">
            Latest processing jobs for this engine
          </p>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All History →
        </button>
      </div>

      <div className="space-y-3">
        {runs.map((run) => (
          <div
            key={run.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
          >
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-secondary-900 truncate">{run.input}</h3>
                <Badge variant={getStatusVariant(run.status)} size="sm">
                  {run.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-secondary-600">
                <span>Rubric: {run.rubric}</span>
                <span>•</span>
                <span>{formatRelativeTime(run.timestamp)}</span>
                {run.processingTime && (
                  <>
                    <span>•</span>
                    <span>{run.processingTime}s</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
              {run.score !== null && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary-900">{run.score}</div>
                  <div className="text-xs text-gray-500">score</div>
                </div>
              )}
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentRuns;
