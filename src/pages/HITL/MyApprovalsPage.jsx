import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Search,
  Filter,
  Calendar,
  Clock,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import MainLayout from '../../components/layout/MainLayout';

const MyApprovalsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');

  // Mock approval history for current user
  const [myApprovals] = useState([
    {
      id: 1,
      taskName: 'Vendor Agreement Review',
      agentName: 'Legal Document Analyzer',
      submittedAt: '2025-11-17 08:30:00',
      reviewedAt: '2025-11-17 08:45:00',
      action: 'approved',
      comments: 'Reviewed manually - clauses acceptable',
      aiDecision: 'approve',
      aiConfidence: 72,
      modifications: null,
    },
    {
      id: 2,
      taskName: 'Transaction Validation',
      agentName: 'Financial Audit AI',
      submittedAt: '2025-11-16 14:20:00',
      reviewedAt: '2025-11-16 14:25:00',
      action: 'rejected',
      comments: 'Requires vendor approval first',
      reason: 'Vendor not on approved list',
      aiDecision: 'reject',
      aiConfidence: 68,
    },
    {
      id: 3,
      taskName: 'Content Moderation',
      agentName: 'Content Moderation AI',
      submittedAt: '2025-11-16 11:00:00',
      reviewedAt: '2025-11-16 11:10:00',
      action: 'approved',
      comments: 'Context shows no violation',
      aiDecision: 'flag',
      aiConfidence: 65,
    },
    {
      id: 4,
      taskName: 'Candidate Screening - Alex Thompson',
      agentName: 'HR Recruitment Assistant',
      submittedAt: '2025-11-15 09:15:00',
      reviewedAt: '2025-11-15 09:20:00',
      action: 'approved',
      comments: 'Strong technical background',
      aiDecision: 'approve',
      aiConfidence: 88,
    },
    {
      id: 5,
      taskName: 'Refund Authorization',
      agentName: 'Customer Support AI',
      submittedAt: '2025-11-15 16:45:00',
      reviewedAt: '2025-11-15 17:05:00',
      action: 'escalated',
      comments: 'Requires manager approval for partial refund',
      escalateTo: 'Senior Manager',
      aiDecision: 'escalate',
      aiConfidence: 75,
    },
    {
      id: 6,
      taskName: 'Invoice Payment Approval',
      agentName: 'Invoice Validator',
      submittedAt: '2025-11-14 10:30:00',
      reviewedAt: '2025-11-14 10:35:00',
      action: 'approved',
      comments: 'PO match verified',
      aiDecision: 'approve',
      aiConfidence: 92,
    },
    {
      id: 7,
      taskName: 'Security Code Review',
      agentName: 'Code Review Assistant',
      submittedAt: '2025-11-13 15:20:00',
      reviewedAt: '2025-11-13 15:40:00',
      action: 'rejected',
      comments: 'Critical vulnerabilities must be addressed',
      reason: 'SQL injection risk and unvalidated input',
      aiDecision: 'reject',
      aiConfidence: 78,
    },
    {
      id: 8,
      taskName: 'Policy Exception Request',
      agentName: 'Compliance Monitor',
      submittedAt: '2025-11-12 13:00:00',
      reviewedAt: '2025-11-12 13:15:00',
      action: 'modified',
      comments: 'Temporary access granted with audit trail',
      newDecision: 'Approved with conditions',
      aiDecision: 'approve',
      aiConfidence: 84,
    },
  ]);

  const getActionColor = (action) => {
    const colors = {
      approved: 'bg-green-100 text-green-700 border-green-300',
      rejected: 'bg-red-100 text-red-700 border-red-300',
      escalated: 'bg-orange-100 text-orange-700 border-orange-300',
      modified: 'bg-blue-100 text-blue-700 border-blue-300',
    };
    return colors[action] || colors.approved;
  };

  const getActionIcon = (action) => {
    const icons = {
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
      escalated: <AlertTriangle className="w-4 h-4" />,
      modified: <Edit className="w-4 h-4" />,
    };
    return icons[action] || icons.approved;
  };

  const filterByDateRange = (approval) => {
    if (dateRangeFilter === 'all') return true;

    const reviewDate = new Date(approval.reviewedAt);
    const now = new Date();
    const daysDiff = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));

    if (dateRangeFilter === 'today') return daysDiff === 0;
    if (dateRangeFilter === 'week') return daysDiff <= 7;
    if (dateRangeFilter === 'month') return daysDiff <= 30;
    return true;
  };

  const filteredApprovals = myApprovals.filter((approval) => {
    const matchesSearch =
      approval.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.agentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = actionFilter === 'all' || approval.action === actionFilter;
    const matchesDate = filterByDateRange(approval);

    return matchesSearch && matchesAction && matchesDate;
  });

  const stats = {
    total: myApprovals.length,
    approved: myApprovals.filter((a) => a.action === 'approved').length,
    rejected: myApprovals.filter((a) => a.action === 'rejected').length,
    modified: myApprovals.filter((a) => a.action === 'modified').length,
  };

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">My Approvals</h1>
        <p className="text-secondary-600 mt-1">
          Your HITL approval history and decisions
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-secondary-900">{stats.total}</div>
              <div className="text-sm text-secondary-700">Total Approvals</div>
            </div>
            <Calendar className="w-10 h-10 text-gray-500" />
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
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by task or agent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
          <Select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Actions' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'modified', label: 'Modified' },
              { value: 'escalated', label: 'Escalated' },
            ]}
            className="min-w-[180px]"
          />
          <Select
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'Last 7 Days' },
              { value: 'month', label: 'Last 30 Days' },
            ]}
            className="min-w-[180px]"
          />
        </div>
      </Card>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredApprovals.map((approval) => (
          <Card key={approval.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Action Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                approval.action === 'approved' ? 'bg-green-100' :
                approval.action === 'rejected' ? 'bg-red-100' :
                approval.action === 'escalated' ? 'bg-orange-100' :
                'bg-blue-100'
              }`}>
                {getActionIcon(approval.action)}
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-secondary-900 text-lg mb-1">
                      {approval.taskName}
                    </h3>
                    <p className="text-sm text-secondary-600">Agent: {approval.agentName}</p>
                  </div>
                  <Badge className={getActionColor(approval.action)}>
                    <span className="flex items-center gap-1">
                      {getActionIcon(approval.action)}
                      {approval.action.toUpperCase()}
                    </span>
                  </Badge>
                </div>

                {/* AI Decision */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 uppercase">AI Decision:</span>
                      <span className="ml-2 text-sm font-medium text-secondary-900 capitalize">
                        {approval.aiDecision.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase">Confidence:</span>
                      <span className="ml-2 text-sm font-semibold text-secondary-900">
                        {approval.aiConfidence}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comments/Reason */}
                {(approval.comments || approval.reason) && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-3 border border-blue-200">
                    <p className="text-xs text-blue-700 uppercase mb-1">
                      {approval.action === 'rejected' ? 'Rejection Reason' :
                       approval.action === 'escalated' ? 'Escalation Reason' :
                       'Your Comments'}
                    </p>
                    <p className="text-sm text-blue-900">
                      {approval.comments || approval.reason}
                    </p>
                  </div>
                )}

                {/* Modified Decision */}
                {approval.newDecision && (
                  <div className="bg-purple-50 rounded-lg p-3 mb-3 border border-purple-200">
                    <p className="text-xs text-purple-700 uppercase mb-1">Modified Decision</p>
                    <p className="text-sm font-medium text-purple-900">{approval.newDecision}</p>
                  </div>
                )}

                {/* Timestamps */}
                <div className="flex items-center gap-6 text-xs text-gray-500 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Submitted: {new Date(approval.submittedAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Reviewed: {new Date(approval.reviewedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredApprovals.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              No Approvals Found
            </h3>
            <p className="text-secondary-600">
              {searchTerm || actionFilter !== 'all' || dateRangeFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Your approval history will appear here'}
            </p>
          </div>
        </Card>
      )}
      </div>
    </MainLayout>
  );
};

export default MyApprovalsPage;
