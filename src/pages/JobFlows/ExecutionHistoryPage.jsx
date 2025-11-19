import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Bot,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import MainLayout from '../../components/layout/MainLayout';

const ExecutionHistoryPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [agentFilter, setAgentFilter] = useState('all');

  const [executions] = useState([
    {
      id: 1,
      jobFlowId: 1,
      jobFlowName: 'Daily Invoice Processing',
      agent: 'Alex Morgan',
      status: 'completed',
      startTime: '2025-11-17 09:00:00',
      endTime: '2025-11-17 09:02:15',
      duration: '2m 15s',
      tasksProcessed: 45,
      successRate: 100,
      errors: 0,
    },
    {
      id: 2,
      jobFlowId: 3,
      jobFlowName: 'Candidate Screening',
      agent: 'Sarah Chen',
      status: 'completed',
      startTime: '2025-11-17 10:00:00',
      endTime: '2025-11-17 10:03:45',
      duration: '3m 45s',
      tasksProcessed: 12,
      successRate: 100,
      errors: 0,
    },
    {
      id: 3,
      jobFlowId: 4,
      jobFlowName: 'Customer Support Triage',
      agent: 'Jordan Lee',
      status: 'completed',
      startTime: '2025-11-17 14:00:00',
      endTime: '2025-11-17 14:05:20',
      duration: '5m 20s',
      tasksProcessed: 28,
      successRate: 96,
      errors: 1,
    },
    {
      id: 4,
      jobFlowId: 1,
      jobFlowName: 'Daily Invoice Processing',
      agent: 'Alex Morgan',
      status: 'failed',
      startTime: '2025-11-16 09:00:00',
      endTime: '2025-11-16 09:00:45',
      duration: '45s',
      tasksProcessed: 5,
      successRate: 0,
      errors: 5,
      errorMessage: 'Database connection timeout',
    },
    {
      id: 5,
      jobFlowId: 2,
      jobFlowName: 'Weekly Report Generation',
      agent: 'Casey Johnson',
      status: 'completed',
      startTime: '2025-11-11 08:00:00',
      endTime: '2025-11-11 08:12:30',
      duration: '12m 30s',
      tasksProcessed: 1,
      successRate: 100,
      errors: 0,
    },
    {
      id: 6,
      jobFlowId: 4,
      jobFlowName: 'Customer Support Triage',
      agent: 'Jordan Lee',
      status: 'running',
      startTime: '2025-11-17 15:00:00',
      endTime: null,
      duration: 'In progress',
      tasksProcessed: 15,
      successRate: 100,
      errors: 0,
    },
  ]);

  const agents = ['all', ...new Set(executions.map((e) => e.agent))];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700 border-green-300',
      failed: 'bg-red-100 text-red-700 border-red-300',
      running: 'bg-blue-100 text-blue-700 border-blue-300',
      cancelled: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[status] || colors.completed;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <CheckCircle className="w-4 h-4" />,
      failed: <XCircle className="w-4 h-4" />,
      running: <Clock className="w-4 h-4 animate-spin" />,
      cancelled: <AlertTriangle className="w-4 h-4" />,
    };
    return icons[status] || icons.completed;
  };

  const filteredExecutions = executions.filter((exec) => {
    const matchesSearch =
      exec.jobFlowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exec.agent.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || exec.status === statusFilter;
    const matchesAgent = agentFilter === 'all' || exec.agent === agentFilter;

    return matchesSearch && matchesStatus && matchesAgent;
  });

  const stats = {
    total: executions.length,
    completed: executions.filter((e) => e.status === 'completed').length,
    failed: executions.filter((e) => e.status === 'failed').length,
    running: executions.filter((e) => e.status === 'running').length,
  };

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Execution History</h1>
          <p className="text-secondary-600 mt-1">
            View past job flow executions and performance
          </p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Download className="w-5 h-5" />}
          onClick={() => {/* Export to CSV */}}
        >
          Export
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
              <div className="text-sm text-blue-700">Total Executions</div>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-900">{stats.failed}</div>
              <div className="text-sm text-red-700">Failed</div>
            </div>
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">{stats.running}</div>
              <div className="text-sm text-purple-700">Running</div>
            </div>
            <Clock className="w-10 h-10 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by job flow or agent..."
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
              { value: 'completed', label: 'Completed' },
              { value: 'failed', label: 'Failed' },
              { value: 'running', label: 'Running' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            className="min-w-[180px]"
          />
          <Select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            options={agents.map((agent) => ({
              value: agent,
              label: agent === 'all' ? 'All Agents' : agent,
            }))}
            className="min-w-[200px]"
          />
        </div>
      </Card>

      {/* Execution History Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                  Job Flow
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                  Tasks
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-secondary-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredExecutions.map((execution) => (
                <tr key={execution.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-secondary-900">{execution.jobFlowName}</div>
                    <div className="text-xs text-gray-500">ID: {execution.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-secondary-900">{execution.agent}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-secondary-900">
                      {new Date(execution.startTime).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-secondary-900">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {execution.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-secondary-900">{execution.tasksProcessed}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm font-semibold ${
                      execution.successRate >= 95 ? 'text-green-600' :
                      execution.successRate >= 80 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {execution.successRate}%
                    </div>
                    {execution.errors > 0 && (
                      <div className="text-xs text-red-600">{execution.errors} errors</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(execution.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(execution.status)}
                        {execution.status.toUpperCase()}
                      </span>
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {/* View details */}}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredExecutions.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              No Execution History Found
            </h3>
            <p className="text-secondary-600">
              {searchTerm || statusFilter !== 'all' || agentFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Job flow executions will appear here once they run'}
            </p>
          </div>
        </Card>
      )}
      </div>
    </MainLayout>
  );
};

export default ExecutionHistoryPage;
