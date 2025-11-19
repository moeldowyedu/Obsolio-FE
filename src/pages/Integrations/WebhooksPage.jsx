import { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';

const WebhooksPage = () => {
  const [webhooks] = useState([
    {
      id: 1,
      name: 'Job Completion Notification',
      url: 'https://example.com/webhooks/job-complete',
      events: ['job.completed', 'job.failed'],
      status: 'active',
      lastTriggered: '2 hours ago'
    },
    {
      id: 2,
      name: 'Approval Request',
      url: 'https://example.com/webhooks/approval',
      events: ['approval.requested'],
      status: 'active',
      lastTriggered: '1 day ago'
    },
    {
      id: 3,
      name: 'Error Alerts',
      url: 'https://example.com/webhooks/errors',
      events: ['error.occurred'],
      status: 'inactive',
      lastTriggered: 'Never'
    }
  ]);

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Webhooks</h1>
          <p className="text-secondary-600">
            Configure webhooks to receive real-time notifications
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <Button icon={<Plus className="w-4 h-4" />}>
            Create Webhook
          </Button>
        </div>

        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <Card key={webhook.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {webhook.name}
                      </h3>
                      <Badge color={webhook.status === 'active' ? 'green' : 'gray'}>
                        {webhook.status}
                      </Badge>
                      {webhook.status === 'active' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <code className="text-sm text-secondary-600 bg-gray-100 px-2 py-1 rounded">
                      {webhook.url}
                    </code>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Events:</p>
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event, idx) => (
                      <Badge key={idx} color="blue">{event}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-secondary-600">
                    Last triggered: <span className="font-medium text-secondary-900">{webhook.lastTriggered}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" icon={<Edit className="w-4 h-4" />}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" icon={<Trash2 className="w-4 h-4" />}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default WebhooksPage;
