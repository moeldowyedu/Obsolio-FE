import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Bot,
  Calendar,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Select from '../../components/common/Input/Select';
import Badge from '../../components/common/Badge/Badge';
import MainLayout from '../../components/layout/MainLayout';

const AgentPerformancePage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const overallStats = {
    totalTasks: 4765,
    tasksChange: 12.5,
    successRate: 94.8,
    successRateChange: 2.3,
    avgResponseTime: '2.1 min',
    responseTimeChange: -8.2, // negative is good (faster)
    agentsActive: 6,
    agentsActiveChange: 0,
  };

  const topPerformers = [
    {
      id: 2,
      name: 'Alex Morgan',
      jobTitle: 'Invoice Processing Specialist',
      department: 'Finance',
      tasksCompleted: 2340,
      successRate: 98,
      avgResponseTime: '1.2 min',
      improvement: 5.2,
    },
    {
      id: 5,
      name: 'Casey Johnson',
      jobTitle: 'Report Generator',
      department: 'Finance',
      tasksCompleted: 678,
      successRate: 97,
      avgResponseTime: '0.8 min',
      improvement: 3.1,
    },
    {
      id: 4,
      name: 'Taylor Swift',
      jobTitle: 'Data Entry Clerk',
      department: 'Operations',
      tasksCompleted: 445,
      successRate: 96,
      avgResponseTime: '1.8 min',
      improvement: 1.8,
    },
  ];

  const departmentStats = [
    {
      department: 'Finance',
      agents: 2,
      tasksCompleted: 3018,
      successRate: 97.5,
      avgResponseTime: '1.0 min',
      trend: 'up',
    },
    {
      department: 'Human Resources',
      agents: 1,
      tasksCompleted: 156,
      successRate: 94,
      avgResponseTime: '2.5 min',
      trend: 'up',
    },
    {
      department: 'Customer Service',
      agents: 1,
      tasksCompleted: 892,
      successRate: 91,
      avgResponseTime: '3.1 min',
      trend: 'stable',
    },
    {
      department: 'Operations',
      agents: 1,
      tasksCompleted: 445,
      successRate: 96,
      avgResponseTime: '1.8 min',
      trend: 'up',
    },
    {
      department: 'Marketing',
      agents: 1,
      tasksCompleted: 234,
      successRate: 88,
      avgResponseTime: '4.2 min',
      trend: 'down',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      agent: 'Alex Morgan',
      action: 'Completed 50 invoices',
      timestamp: '2 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      agent: 'Casey Johnson',
      action: 'Generated weekly report',
      timestamp: '15 minutes ago',
      status: 'success',
    },
    {
      id: 3,
      agent: 'Jordan Lee',
      action: 'Escalated complex query',
      timestamp: '32 minutes ago',
      status: 'warning',
    },
    {
      id: 4,
      agent: 'Sarah Chen',
      action: 'Completed candidate screening',
      timestamp: '1 hour ago',
      status: 'success',
    },
    {
      id: 5,
      agent: 'Morgan Davis',
      action: 'Failed email campaign task',
      timestamp: '2 hours ago',
      status: 'error',
    },
  ];

  const getStatusIcon = (status) => {
    const icons = {
      success: <CheckCircle className="w-4 h-4 text-green-600" />,
      warning: <AlertTriangle className="w-4 h-4 text-yellow-600" />,
      error: <XCircle className="w-4 h-4 text-red-600" />,
    };
    return icons[status] || icons.success;
  };

  const getStatusColor = (status) => {
    const colors = {
      success: 'bg-green-50 border-green-200',
      warning: 'bg-yellow-50 border-yellow-200',
      error: 'bg-red-50 border-red-200',
    };
    return colors[status] || colors.success;
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <TrendingUp className="w-4 h-4 text-gray-400" />;
  };

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Performance</h1>
          <p className="text-gray-600 mt-1">
            Monitor and analyze AI agent performance metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            options={[
              { value: 'all', label: 'All Departments' },
              { value: 'finance', label: 'Finance' },
              { value: 'hr', label: 'Human Resources' },
              { value: 'customer-service', label: 'Customer Service' },
              { value: 'operations', label: 'Operations' },
              { value: 'marketing', label: 'Marketing' },
            ]}
            className="min-w-[200px]"
          />
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            options={[
              { value: '24h', label: 'Last 24 Hours' },
              { value: '7d', label: 'Last 7 Days' },
              { value: '30d', label: 'Last 30 Days' },
              { value: '90d', label: 'Last 90 Days' },
            ]}
            className="min-w-[180px]"
          />
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-blue-700">Total Tasks</div>
            <Bot className="w-8 h-8 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-900 mb-1">
            {overallStats.totalTasks.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">
              {overallStats.tasksChange}%
            </span>
            <span className="text-blue-700">vs last period</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-green-700">Success Rate</div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-900 mb-1">
            {overallStats.successRate}%
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">
              {overallStats.successRateChange}%
            </span>
            <span className="text-green-700">improvement</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-purple-700">Avg Response Time</div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-900 mb-1">
            {overallStats.avgResponseTime}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">
              {Math.abs(overallStats.responseTimeChange)}%
            </span>
            <span className="text-purple-700">faster</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-orange-700">Active Agents</div>
            <Bot className="w-8 h-8 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-900 mb-1">
            {overallStats.agentsActive}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-orange-700">Currently deployed</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-500" />
            Top Performers
          </h2>
          <div className="space-y-3">
            {topPerformers.map((agent, index) => (
              <div
                key={agent.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <Badge className="bg-green-100 text-green-700">
                      +{agent.improvement}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{agent.jobTitle}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Tasks:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {agent.tasksCompleted.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Success:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {agent.successRate}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Speed:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {agent.avgResponseTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            Recent Activity
          </h2>
          <div className="space-y-2">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-start gap-3 p-3 rounded-lg border ${getStatusColor(
                  activity.status
                )}`}
              >
                <div className="mt-0.5">{getStatusIcon(activity.status)}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.agent}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Department Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Department
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Agents
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Tasks Completed
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Success Rate
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Avg Response
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((dept) => (
                <tr
                  key={dept.department}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{dept.department}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{dept.agents}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {dept.tasksCompleted.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{dept.successRate}%</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{dept.avgResponseTime}</td>
                  <td className="py-3 px-4">{getTrendIcon(dept.trend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      </div>
    </MainLayout>
  );
};

export default AgentPerformancePage;
