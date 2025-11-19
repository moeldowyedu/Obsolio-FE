import { useEffect, useState } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Filter,
  Search,
  Eye,
} from 'lucide-react';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import Select from '../common/Input/Select';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import { useHITLApprovalStore } from '../../store/hitlApprovalStore';

const HITLApprovalQueue = ({ onTaskSelect }) => {
  const {
    fetchPendingApprovals,
    getFilteredApprovals,
    getStatistics,
    updateFilters,
    filters,
    isLoading,
  } = useHITLApprovalStore();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const approvals = getFilteredApprovals();
  const stats = getStatistics();

  const filteredApprovals = approvals.filter((approval) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      approval.agentName.toLowerCase().includes(searchLower) ||
      approval.taskName.toLowerCase().includes(searchLower) ||
      approval.data.applicantName?.toLowerCase().includes(searchLower) ||
      approval.data.candidateName?.toLowerCase().includes(searchLower)
    );
  });

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      normal: 'bg-blue-100 text-blue-700',
      low: 'bg-gray-100 text-gray-700',
    };
    return colors[priority] || colors.normal;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 24) {
      return `${Math.floor(diffHours / 24)}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return `${diffMins}m ago`;
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-blue-600';
    if (confidence >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.pending.total}</div>
              <div className="text-sm text-blue-700">Pending Approvals</div>
            </div>
            <Clock className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-900">{stats.pending.urgent}</div>
              <div className="text-sm text-red-700">Urgent Tasks</div>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.history.approved}</div>
              <div className="text-sm text-green-700">Approved Today</div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {stats.history.approved > 0
                  ? Math.round((stats.history.approved / stats.history.total) * 100)
                  : 0}
                %
              </div>
              <div className="text-sm text-purple-700">Approval Rate</div>
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
              placeholder="Search by agent, task, or applicant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>

          <Select
            value={filters.urgency}
            onChange={(e) => updateFilters({ urgency: e.target.value })}
            options={[
              { value: 'all', label: 'All Priorities' },
              { value: 'urgent', label: 'Urgent Only' },
              { value: 'normal', label: 'Normal Only' },
            ]}
            className="min-w-[180px]"
          />

          <Select
            value={filters.status}
            onChange={(e) => updateFilters({ status: e.target.value })}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'pending', label: 'Pending' },
              { value: 'escalated', label: 'Escalated' },
            ]}
            className="min-w-[180px]"
          />
        </div>
      </Card>

      {/* Approval Queue */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-secondary-900 flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-600" />
          Approval Queue ({filteredApprovals.length})
        </h2>

        {isLoading ? (
          <Card>
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600 mx-auto mb-4"></div>
              <p className="text-secondary-600">Loading approvals...</p>
            </div>
          </Card>
        ) : filteredApprovals.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">All Caught Up!</h3>
              <p className="text-secondary-600">No pending approvals at the moment.</p>
            </div>
          </Card>
        ) : (
          filteredApprovals.map((task) => (
            <Card
              key={task.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onTaskSelect(task)}
            >
              <div className="flex items-start gap-4">
                {/* Priority Indicator */}
                <div
                  className={`w-1 h-full absolute left-0 top-0 rounded-l-lg ${
                    task.priority === 'urgent' || task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'normal'
                      ? 'bg-blue-500'
                      : 'bg-gray-400'
                  }`}
                />

                {/* Content */}
                <div className="flex-1 ml-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-secondary-900">{task.taskName}</h3>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-secondary-600">
                        Agent: {task.agentName} • {task.agentJobTitle}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-500">Submitted {getTimeAgo(task.submittedAt)}</div>
                      <div className="text-xs text-gray-500">{task.department}</div>
                    </div>
                  </div>

                  {/* AI Decision */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-sm font-medium text-secondary-700">AI Decision: </span>
                        <span className="text-sm font-semibold text-secondary-900 capitalize">
                          {task.aiDecision.action.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-secondary-600">Confidence:</span>
                        <span className={`text-sm font-bold ${getConfidenceColor(task.aiDecision.confidence)}`}>
                          {Math.round(task.aiDecision.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600">{task.aiDecision.reasoning}</p>
                  </div>

                  {/* Key Data */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    {Object.entries(task.data).slice(0, 6).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                        <span className="font-medium text-secondary-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-secondary-600">
                      <div>Rubric Score: <span className="font-semibold text-secondary-900">{task.rubricScore}/100</span></div>
                      <div>{task.supportingDocuments.length} Documents</div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTaskSelect(task);
                      }}
                      leftIcon={<Eye className="w-4 h-4" />}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HITLApprovalQueue;
