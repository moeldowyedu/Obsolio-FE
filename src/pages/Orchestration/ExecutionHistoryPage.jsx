import { useState } from 'react';
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';

const ExecutionHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [executions] = useState([
    {
      id: 1,
      workflowName: 'Customer Onboarding Flow',
      status: 'completed',
      duration: '2m 34s',
      startTime: '2024-01-15 10:30:00',
      endTime: '2024-01-15 10:32:34',
      stepsCompleted: 5,
      totalSteps: 5
    },
    {
      id: 2,
      workflowName: 'Document Processing Pipeline',
      status: 'completed',
      duration: '1m 12s',
      startTime: '2024-01-15 10:15:00',
      endTime: '2024-01-15 10:16:12',
      stepsCompleted: 7,
      totalSteps: 7
    },
    {
      id: 3,
      workflowName: 'Support Ticket Triage',
      status: 'failed',
      duration: '45s',
      startTime: '2024-01-15 09:45:00',
      endTime: '2024-01-15 09:45:45',
      stepsCompleted: 2,
      totalSteps: 4,
      error: 'Agent timeout'
    },
    {
      id: 4,
      workflowName: 'Customer Onboarding Flow',
      status: 'running',
      duration: '1m 05s',
      startTime: '2024-01-15 10:40:00',
      stepsCompleted: 3,
      totalSteps: 5
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'green',
      failed: 'red',
      running: 'blue'
    };
    return colors[status] || 'gray';
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Execution History</h1>
          <p className="text-secondary-600">
            View all workflow execution logs and results
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search executions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
            Filter
          </Button>
          <Button variant="outline" icon={<Calendar className="w-4 h-4" />}>
            Date Range
          </Button>
        </div>

        {/* Execution List */}
        <div className="space-y-4">
          {executions.map((execution) => (
            <Card key={execution.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {getStatusIcon(execution.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-secondary-900">
                          {execution.workflowName}
                        </h3>
                        <Badge color={getStatusColor(execution.status)}>
                          {execution.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Started</p>
                          <p className="font-medium text-secondary-900">{execution.startTime}</p>
                        </div>
                        {execution.endTime && (
                          <div>
                            <p className="text-gray-500">Ended</p>
                            <p className="font-medium text-secondary-900">{execution.endTime}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium text-secondary-900">{execution.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Progress</p>
                          <p className="font-medium text-secondary-900">
                            {execution.stepsCompleted}/{execution.totalSteps} steps
                          </p>
                        </div>
                      </div>
                      {execution.error && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Error:</strong> {execution.error}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        execution.status === 'failed'
                          ? 'bg-red-500'
                          : execution.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${(execution.stepsCompleted / execution.totalSteps) * 100}%`
                      }}
                    ></div>
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

export default ExecutionHistoryPage;
