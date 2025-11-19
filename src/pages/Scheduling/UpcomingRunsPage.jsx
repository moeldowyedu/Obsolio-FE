import { Clock, Calendar } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const UpcomingRunsPage = () => {
  const upcomingRuns = [
    {
      id: 1,
      jobName: 'Daily Report Generation',
      agent: 'Report Agent',
      scheduledTime: '2024-01-16 09:00:00',
      timeUntil: 'in 12 hours',
      priority: 'high'
    },
    {
      id: 2,
      jobName: 'Data Sync',
      agent: 'Sync Agent',
      scheduledTime: '2024-01-16 14:00:00',
      timeUntil: 'in 17 hours',
      priority: 'medium'
    },
    {
      id: 3,
      jobName: 'Email Campaign',
      agent: 'Email Agent',
      scheduledTime: '2024-01-16 16:00:00',
      timeUntil: 'in 19 hours',
      priority: 'low'
    },
    {
      id: 4,
      jobName: 'Weekly Backup',
      agent: 'Backup Agent',
      scheduledTime: '2024-01-22 02:00:00',
      timeUntil: 'in 6 days',
      priority: 'high'
    },
    {
      id: 5,
      jobName: 'Customer Survey',
      agent: 'Survey Agent',
      scheduledTime: '2024-01-19 17:00:00',
      timeUntil: 'in 4 days',
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'red',
      medium: 'yellow',
      low: 'gray'
    };
    return colors[priority] || 'gray';
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Upcoming Runs</h1>
          <p className="text-secondary-600">
            View all scheduled jobs that are coming up
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Next 24 Hours</p>
                  <p className="text-2xl font-bold text-secondary-900">3</p>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600">This Week</p>
                  <p className="text-2xl font-bold text-secondary-900">5</p>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600">High Priority</p>
                  <p className="text-2xl font-bold text-secondary-900">2</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Runs List */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Scheduled Runs</h2>
            <div className="space-y-4">
              {upcomingRuns.map((run) => (
                <div
                  key={run.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        {run.jobName}
                      </h3>
                      <p className="text-sm text-secondary-600">Agent: {run.agent}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-secondary-600">Scheduled for</p>
                      <p className="font-medium text-secondary-900">{run.scheduledTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-secondary-600">Time until run</p>
                      <p className="font-semibold text-primary-600">{run.timeUntil}</p>
                    </div>
                    <Badge color={getPriorityColor(run.priority)}>
                      {run.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UpcomingRunsPage;
