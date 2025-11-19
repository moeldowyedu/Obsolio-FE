import { useEffect, useState } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Clock,
  Filter,
  Search,
  Download,
  Calendar,
  User,
  TrendingUp,
  FileText,
} from 'lucide-react';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import Select from '../common/Input/Select';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import { useHITLApprovalStore } from '../../store/hitlApprovalStore';

const HITLActivityLogs = () => {
  const { approvalHistory, fetchApprovalHistory, isLoading } = useHITLApprovalStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    action: 'all',
    dateRange: 'all',
    approver: 'all',
  });

  useEffect(() => {
    fetchApprovalHistory();
  }, []);

  const getActionIcon = (action) => {
    const icons = {
      approved: <CheckCircle className="w-5 h-5 text-green-600" />,
      rejected: <XCircle className="w-5 h-5 text-red-600" />,
      escalated: <AlertTriangle className="w-5 h-5 text-orange-600" />,
      modified: <Edit className="w-5 h-5 text-blue-600" />,
    };
    return icons[action] || <Clock className="w-5 h-5 text-secondary-600" />;
  };

  const getActionColor = (action) => {
    const colors = {
      approved: 'bg-green-100 text-green-700 border-green-300',
      rejected: 'bg-red-100 text-red-700 border-red-300',
      escalated: 'bg-orange-100 text-orange-700 border-orange-300',
      modified: 'bg-blue-100 text-blue-700 border-blue-300',
    };
    return colors[action] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDateRangeFilter = (log) => {
    const logDate = new Date(log.approvedAt || log.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now - logDate) / (1000 * 60 * 60 * 24));

    if (filters.dateRange === 'all') return true;
    if (filters.dateRange === 'today' && diffDays === 0) return true;
    if (filters.dateRange === 'week' && diffDays <= 7) return true;
    if (filters.dateRange === 'month' && diffDays <= 30) return true;
    return false;
  };

  const filteredLogs = approvalHistory.filter((log) => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        log.taskName?.toLowerCase().includes(searchLower) ||
        log.agentName?.toLowerCase().includes(searchLower) ||
        log.approverName?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Action filter
    if (filters.action !== 'all' && log.action !== filters.action) {
      return false;
    }

    // Date range filter
    if (!getDateRangeFilter(log)) {
      return false;
    }

    return true;
  });

  const getStatistics = () => {
    const total = approvalHistory.length;
    const approved = approvalHistory.filter((log) => log.action === 'approved').length;
    const rejected = approvalHistory.filter((log) => log.action === 'rejected').length;
    const modified = approvalHistory.filter((log) => log.action === 'modified').length;
    const escalated = approvalHistory.filter((log) => log.action === 'escalated').length;

    return { total, approved, rejected, modified, escalated };
  };

  const stats = getStatistics();

  const exportToCSV = () => {
    const headers = ['Date', 'Task', 'Agent', 'Action', 'Approver', 'Comments'];
    const rows = filteredLogs.map((log) => [
      formatDate(log.approvedAt || log.createdAt),
      log.taskName,
      log.agentName,
      log.action,
      log.approverName,
      log.comments || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hitl-activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-secondary-900">{stats.total}</div>
              <div className="text-sm text-secondary-700">Total Actions</div>
            </div>
            <TrendingUp className="w-10 h-10 text-gray-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.approved}</div>
              <div className="text-sm text-green-700">Approved</div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-900">{stats.rejected}</div>
              <div className="text-sm text-red-700">Rejected</div>
            </div>
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.modified}</div>
              <div className="text-sm text-blue-700">Modified</div>
            </div>
            <Edit className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-900">{stats.escalated}</div>
              <div className="text-sm text-orange-700">Escalated</div>
            </div>
            <AlertTriangle className="w-10 h-10 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Filters and Export */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by task, agent, or approver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>

          <Select
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
            options={[
              { value: 'all', label: 'All Actions' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'modified', label: 'Modified' },
              { value: 'escalated', label: 'Escalated' },
            ]}
            className="min-w-[160px]"
          />

          <Select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'Last 7 Days' },
              { value: 'month', label: 'Last 30 Days' },
            ]}
            className="min-w-[160px]"
          />

          <Button
            variant="outline"
            onClick={exportToCSV}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
        </div>
      </Card>

      {/* Activity Logs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-secondary-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-600" />
          Activity History ({filteredLogs.length})
        </h2>

        {isLoading ? (
          <Card>
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600 mx-auto mb-4"></div>
              <p className="text-secondary-600">Loading activity logs...</p>
            </div>
          </Card>
        ) : filteredLogs.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">No Activity Found</h3>
              <p className="text-secondary-600">
                {searchTerm || filters.action !== 'all' || filters.dateRange !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No HITL activity has been logged yet'}
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <Card
                key={log.id}
                className="hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Action Icon */}
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getActionIcon(log.action)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-secondary-900">{log.taskName}</h3>
                          <Badge className={getActionColor(log.action)}>
                            {log.action.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-secondary-600">
                          Agent: {log.agentName} • {log.agentJobTitle || 'AI Agent'}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(log.approvedAt || log.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      {/* Approver */}
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-secondary-600">
                          {log.action === 'approved' ? 'Approved' : log.action === 'rejected' ? 'Rejected' : log.action === 'modified' ? 'Modified' : 'Escalated'} by:
                        </span>
                        <span className="font-medium text-secondary-900">{log.approverName || 'Unknown'}</span>
                      </div>

                      {/* Comments/Reason */}
                      {(log.comments || log.reason) && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 uppercase mb-1">
                            {log.action === 'rejected' ? 'Rejection Reason' : log.action === 'escalated' ? 'Escalation Reason' : 'Comments'}
                          </p>
                          <p className="text-sm text-secondary-700">{log.comments || log.reason}</p>
                        </div>
                      )}

                      {/* Modified Decision */}
                      {log.action === 'modified' && log.newDecision && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-xs text-blue-700 uppercase mb-1">New Decision</p>
                          <p className="text-sm font-medium text-blue-900 capitalize">
                            {log.newDecision.replace('_', ' ')}
                          </p>
                          {log.newReasoning && (
                            <p className="text-sm text-blue-700 mt-1">{log.newReasoning}</p>
                          )}
                        </div>
                      )}

                      {/* Escalation Target */}
                      {log.action === 'escalated' && log.escalateTo && (
                        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                          <p className="text-xs text-orange-700 uppercase mb-1">Escalated To</p>
                          <p className="text-sm font-medium text-orange-900 capitalize">
                            {log.escalateTo.replace('-', ' ')}
                          </p>
                        </div>
                      )}

                      {/* AI Decision Info */}
                      {log.originalAIDecision && (
                        <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-200">
                          <span>Original AI Decision: <span className="font-medium text-secondary-700 capitalize">{log.originalAIDecision.action?.replace('_', ' ')}</span></span>
                          <span>AI Confidence: <span className="font-medium text-secondary-700">{log.originalAIDecision.confidence ? Math.round(log.originalAIDecision.confidence * 100) : 0}%</span></span>
                          {log.rubricScore && <span>Rubric Score: <span className="font-medium text-secondary-700">{log.rubricScore}/100</span></span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Pagination (placeholder for future implementation) */}
      {filteredLogs.length > 20 && (
        <Card>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <span className="px-4 py-2 text-secondary-600">Page 1 of 1</span>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HITLActivityLogs;
