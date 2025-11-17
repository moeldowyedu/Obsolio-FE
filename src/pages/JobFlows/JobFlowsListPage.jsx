import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Bot,
  Calendar,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Play,
  Pause,
  Eye,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const JobFlowsListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const [jobFlows] = useState([
    {
      id: 1,
      name: 'Daily Invoice Processing',
      agent: 'Alex Morgan - Invoice Processing Specialist',
      jobTitle: 'Invoice Processor',
      department: 'Finance',
      branch: 'Headquarters',
      schedule: 'Daily at 9:00 AM',
      frequency: 'daily',
      status: 'active',
      lastRun: '2025-11-17 09:00:00',
      nextRun: '2025-11-18 09:00:00',
      tasksCompleted: 2340,
      successRate: 98,
      hitlMode: 'fully-ai',
    },
    {
      id: 2,
      name: 'Weekly Report Generation',
      agent: 'Casey Johnson - Report Generator',
      jobTitle: 'Report Generator',
      department: 'Finance',
      branch: 'Headquarters',
      schedule: 'Weekly on Monday at 8:00 AM',
      frequency: 'weekly',
      status: 'active',
      lastRun: '2025-11-11 08:00:00',
      nextRun: '2025-11-18 08:00:00',
      tasksCompleted: 678,
      successRate: 97,
      hitlMode: 'fully-ai',
    },
    {
      id: 3,
      name: 'Candidate Screening',
      agent: 'Sarah Chen - Recruitment Coordinator',
      jobTitle: 'Recruitment Coordinator',
      department: 'Human Resources',
      branch: 'Headquarters',
      schedule: 'Daily at 10:00 AM',
      frequency: 'daily',
      status: 'active',
      lastRun: '2025-11-17 10:00:00',
      nextRun: '2025-11-18 10:00:00',
      tasksCompleted: 156,
      successRate: 94,
      hitlMode: 'human-in-the-loop',
    },
    {
      id: 4,
      name: 'Customer Support Triage',
      agent: 'Jordan Lee - Customer Support Agent',
      jobTitle: 'Customer Support Agent',
      department: 'Customer Service',
      branch: 'West Coast Office',
      schedule: 'Hourly',
      frequency: 'hourly',
      status: 'active',
      lastRun: '2025-11-17 14:00:00',
      nextRun: '2025-11-17 15:00:00',
      tasksCompleted: 892,
      successRate: 91,
      hitlMode: 'human-on-standby',
    },
    {
      id: 5,
      name: 'Monthly Expense Review',
      agent: 'Taylor Swift - Data Entry Clerk',
      jobTitle: 'Data Entry Clerk',
      department: 'Operations',
      branch: 'Headquarters',
      schedule: 'Monthly on 1st',
      frequency: 'monthly',
      status: 'paused',
      lastRun: '2025-11-01 09:00:00',
      nextRun: '2025-12-01 09:00:00',
      tasksCompleted: 445,
      successRate: 96,
      hitlMode: 'human-in-charge',
    },
    {
      id: 6,
      name: 'Email Campaign Scheduler',
      agent: 'Morgan Davis - Email Campaign Manager',
      jobTitle: 'Email Campaign Manager',
      department: 'Marketing',
      branch: 'Headquarters',
      schedule: 'Weekly on Thursday',
      frequency: 'weekly',
      status: 'inactive',
      lastRun: '2025-11-07 10:00:00',
      nextRun: null,
      tasksCompleted: 234,
      successRate: 88,
      hitlMode: 'hybrid',
    },
  ]);

  const departments = ['all', ...new Set(jobFlows.map((jf) => jf.department))];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-300',
      paused: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      inactive: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[status] || colors.inactive;
  };

  const getFrequencyIcon = (frequency) => {
    const icons = {
      hourly: '⏱️',
      daily: '📅',
      weekly: '📆',
      monthly: '🗓️',
      quarterly: '📊',
      'half-yearly': '📈',
      yearly: '📉',
    };
    return icons[frequency] || '📅';
  };

  const filteredJobFlows = jobFlows.filter((jf) => {
    const matchesSearch =
      jf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jf.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jf.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || jf.status === statusFilter;
    const matchesDepartment =
      departmentFilter === 'all' || jf.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const stats = {
    total: jobFlows.length,
    active: jobFlows.filter((jf) => jf.status === 'active').length,
    paused: jobFlows.filter((jf) => jf.status === 'paused').length,
    totalTasks: jobFlows.reduce((sum, jf) => sum + jf.tasksCompleted, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Flows</h1>
          <p className="text-gray-600 mt-1">
            Manage AI agent job assignments and schedules
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            leftIcon={<Calendar className="w-5 h-5" />}
            onClick={() => navigate('/job-flows/calendar')}
          >
            Calendar View
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => navigate('/agents/deploy')}
          >
            Create Job Flow
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
              <div className="text-sm text-blue-700">Total Job Flows</div>
            </div>
            <Bot className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.active}</div>
              <div className="text-sm text-green-700">Active</div>
            </div>
            <Play className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-900">{stats.paused}</div>
              <div className="text-sm text-yellow-700">Paused</div>
            </div>
            <Pause className="w-10 h-10 text-yellow-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {stats.totalTasks.toLocaleString()}
              </div>
              <div className="text-sm text-purple-700">Tasks Completed</div>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search job flows by name, agent, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'paused', label: 'Paused' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            className="min-w-[180px]"
          />
          <Select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            options={departments.map((dept) => ({
              value: dept,
              label: dept === 'all' ? 'All Departments' : dept,
            }))}
            className="min-w-[200px]"
          />
        </div>
      </Card>

      {/* Job Flows List */}
      <div className="space-y-4">
        {filteredJobFlows.map((jobFlow) => (
          <Card
            key={jobFlow.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/job-flows/${jobFlow.id}`)}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">{getFrequencyIcon(jobFlow.frequency)}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {jobFlow.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <Bot className="w-4 h-4 inline mr-1" />
                      {jobFlow.agent}
                    </p>
                  </div>
                  <Badge className={getStatusColor(jobFlow.status)}>
                    {jobFlow.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Department</p>
                    <p className="text-sm font-medium text-gray-900">{jobFlow.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Schedule</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {jobFlow.schedule}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                    <p className="text-sm font-bold text-green-600">{jobFlow.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tasks Completed</p>
                    <p className="text-sm font-medium text-gray-900">
                      {jobFlow.tasksCompleted.toLocaleString()}
                    </p>
                  </div>
                </div>

                {jobFlow.nextRun && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Next run: {new Date(jobFlow.nextRun).toLocaleString()}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/job-flows/${jobFlow.id}`);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                {jobFlow.status === 'active' ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle pause
                    }}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle resume
                    }}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredJobFlows.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Job Flows Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' || departmentFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by creating your first job flow'}
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus className="w-5 h-5" />}
              onClick={() => navigate('/agents/deploy')}
            >
              Create Job Flow
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default JobFlowsListPage;
