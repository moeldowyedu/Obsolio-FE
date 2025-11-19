import { useState } from 'react';
import { Plus, Search, Filter, Play, Pause, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';

const ScheduledJobsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [jobs] = useState([
    {
      id: 1,
      name: 'Daily Report Generation',
      agent: 'Report Agent',
      schedule: 'Every day at 9:00 AM',
      status: 'active',
      nextRun: '2024-01-16 09:00:00',
      lastRun: '2024-01-15 09:00:00',
      successRate: 98
    },
    {
      id: 2,
      name: 'Weekly Data Backup',
      agent: 'Backup Agent',
      schedule: 'Every Monday at 2:00 AM',
      status: 'active',
      nextRun: '2024-01-22 02:00:00',
      lastRun: '2024-01-15 02:00:00',
      successRate: 100
    },
    {
      id: 3,
      name: 'Customer Survey Send',
      agent: 'Email Agent',
      schedule: 'Every Friday at 5:00 PM',
      status: 'paused',
      nextRun: '-',
      lastRun: '2024-01-12 17:00:00',
      successRate: 95
    }
  ]);

  const getStatusColor = (status) => {
    return status === 'active' ? 'green' : 'gray';
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Scheduled Jobs</h1>
          <p className="text-secondary-600">
            Manage automated job schedules for your agents
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search scheduled jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
            Filter
          </Button>
          <Button icon={<Plus className="w-4 h-4" />}>
            Create Schedule
          </Button>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-secondary-900">
                        {job.name}
                      </h3>
                      <Badge color={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-secondary-600">Agent: {job.agent}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Schedule</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {job.schedule}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Next Run</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {job.nextRun}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Run</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {job.lastRun}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                    <p className="text-sm font-semibold text-green-600">
                      {job.successRate}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <Button size="sm" icon={<Play className="w-4 h-4" />}>
                    Run Now
                  </Button>
                  {job.status === 'active' ? (
                    <Button size="sm" variant="outline" icon={<Pause className="w-4 h-4" />}>
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" icon={<Play className="w-4 h-4" />}>
                      Resume
                    </Button>
                  )}
                  <Button size="sm" variant="outline" icon={<Edit className="w-4 h-4" />}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" icon={<Trash2 className="w-4 h-4" />}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ScheduledJobsPage;
