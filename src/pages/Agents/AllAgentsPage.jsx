import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Bot,
  Search,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import MainLayout from '../../components/layout/MainLayout';

const AllAgentsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [agents] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      jobTitle: 'Recruitment Coordinator',
      department: 'Human Resources',
      status: 'active',
      employmentType: 'full-time',
      tasksCompleted: 156,
      successRate: 94,
      avgResponseTime: '2.5 min',
      lastActive: '5 minutes ago',
      hitlMode: 'human-in-the-loop',
      schedule: 'Daily at 9:00 AM',
    },
    {
      id: 2,
      name: 'Alex Morgan',
      jobTitle: 'Invoice Processing Specialist',
      department: 'Finance',
      status: 'active',
      employmentType: 'full-time',
      tasksCompleted: 2340,
      successRate: 98,
      avgResponseTime: '1.2 min',
      lastActive: '2 minutes ago',
      hitlMode: 'fully-ai',
      schedule: 'Hourly',
    },
    {
      id: 3,
      name: 'Jordan Lee',
      jobTitle: 'Customer Support Agent',
      department: 'Customer Service',
      status: 'active',
      employmentType: 'part-time',
      tasksCompleted: 892,
      successRate: 91,
      avgResponseTime: '3.1 min',
      lastActive: '10 minutes ago',
      hitlMode: 'human-on-standby',
      schedule: 'Mon-Fri 9-5',
    },
    {
      id: 4,
      name: 'Taylor Swift',
      jobTitle: 'Data Entry Clerk',
      department: 'Operations',
      status: 'paused',
      employmentType: 'on-demand',
      tasksCompleted: 445,
      successRate: 96,
      avgResponseTime: '1.8 min',
      lastActive: '2 hours ago',
      hitlMode: 'human-in-charge',
      schedule: 'On-demand',
    },
    {
      id: 5,
      name: 'Casey Johnson',
      jobTitle: 'Report Generator',
      department: 'Finance',
      status: 'active',
      employmentType: 'full-time',
      tasksCompleted: 678,
      successRate: 97,
      avgResponseTime: '0.8 min',
      lastActive: '1 minute ago',
      hitlMode: 'fully-ai',
      schedule: 'Weekly on Monday',
    },
    {
      id: 6,
      name: 'Morgan Davis',
      jobTitle: 'Email Campaign Manager',
      department: 'Marketing',
      status: 'inactive',
      employmentType: 'full-time',
      tasksCompleted: 234,
      successRate: 88,
      avgResponseTime: '4.2 min',
      lastActive: '3 days ago',
      hitlMode: 'hybrid',
      schedule: 'Not scheduled',
    },
  ]);

  const departments = ['all', ...new Set(agents.map((a) => a.department))];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-300',
      paused: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      inactive: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[status] || colors.inactive;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: <CheckCircle className="w-4 h-4" />,
      paused: <Clock className="w-4 h-4" />,
      inactive: <AlertCircle className="w-4 h-4" />,
    };
    return icons[status] || icons.inactive;
  };

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'all' || agent.department === departmentFilter;

    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const stats = {
    total: agents.length,
    active: agents.filter((a) => a.status === 'active').length,
    tasksCompleted: agents.reduce((sum, a) => sum + a.tasksCompleted, 0),
    avgSuccessRate: Math.round(
      agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length
    ),
  };

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Agents</h1>
          <p className="text-gray-600 mt-1">
            View and manage all AI agents across your organization
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-5 h-5" />}
          onClick={() => navigate('/agents/deploy')}
        >
          Deploy New Agent
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
              <div className="text-sm text-blue-700">Total Agents</div>
            </div>
            <Bot className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.active}</div>
              <div className="text-sm text-green-700">Active Agents</div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {stats.tasksCompleted.toLocaleString()}
              </div>
              <div className="text-sm text-purple-700">Tasks Completed</div>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-900">{stats.avgSuccessRate}%</div>
              <div className="text-sm text-orange-700">Avg Success Rate</div>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search agents by name or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
          <Select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            options={departments.map((dept) => ({
              value: dept,
              label: dept === 'all' ? 'All Departments' : dept,
            }))}
            className="min-w-[200px]"
          />
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
        </div>
      </Card>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card
            key={agent.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/agents/${agent.id}`)}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {agent.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-600">{agent.jobTitle}</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-700">
                    {agent.department}
                  </Badge>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(agent.status)}>
                  {getStatusIcon(agent.status)}
                  <span className="ml-1">{agent.status.toUpperCase()}</span>
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  {agent.employmentType}
                </Badge>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tasks Completed</p>
                  <p className="text-lg font-bold text-gray-900">
                    {agent.tasksCompleted.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                  <p className="text-lg font-bold text-green-600">{agent.successRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Avg Response</p>
                  <p className="text-sm font-medium text-gray-900">{agent.avgResponseTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Active</p>
                  <p className="text-sm font-medium text-gray-900">{agent.lastActive}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">HITL Mode:</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {agent.hitlMode.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Schedule:</span>
                  <span className="font-medium text-gray-900">{agent.schedule}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Agents Found</h3>
            <p className="text-gray-600">
              {searchTerm || departmentFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by deploying your first AI agent'}
            </p>
          </div>
        </Card>
      )}
      </div>
    </MainLayout>
  );
};

export default AllAgentsPage;
