import { useState } from 'react';
import {
  CheckCircle, XCircle, Clock, AlertCircle, Search, Filter,
  ChevronDown, MessageSquare, User, Calendar, TrendingUp,
  AlertTriangle, Eye, FileText, MoreVertical, Check, X
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';

const ApprovalWorkflowsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApprovals, setSelectedApprovals] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock approval data
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      agentName: 'Legal Document Analyzer',
      agentIcon: '⚖️',
      actionType: 'Contract Approval',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      requester: 'Sarah Johnson',
      requesterEmail: 'sarah.j@company.com',
      priority: 'high',
      status: 'pending',
      confidence: 72,
      decision: 'Approve contract with minor amendments',
      details: {
        documentName: 'Vendor_Agreement_2024.pdf',
        contractValue: '$125,000',
        parties: ['Acme Corp', 'Vendor Solutions Inc'],
        issues: ['Non-standard payment terms', 'Missing liability clause'],
        aiRecommendation: 'Approve with amendments to sections 3.2 and 5.4'
      },
      description: 'AI flagged non-standard payment terms and missing liability clause in vendor agreement'
    },
    {
      id: 2,
      agentName: 'Financial Audit AI',
      agentIcon: '💰',
      actionType: 'Transaction Validation',
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      requester: 'Michael Chen',
      requesterEmail: 'michael.c@company.com',
      priority: 'high',
      status: 'pending',
      confidence: 68,
      decision: 'Flag transaction for manual review',
      details: {
        transactionId: 'TXN-2024-10847',
        amount: '$45,320.00',
        vendor: 'TechSupply Co',
        reason: 'Vendor not on approved list',
        history: '3 previous transactions with this vendor',
        aiRecommendation: 'Reject or add vendor to approved list first'
      },
      description: 'High-value transaction with unapproved vendor requires authorization'
    },
    {
      id: 3,
      agentName: 'Content Moderation AI',
      agentIcon: '🛡️',
      actionType: 'Content Review',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      requester: 'Emma Rodriguez',
      requesterEmail: 'emma.r@company.com',
      priority: 'medium',
      status: 'pending',
      confidence: 65,
      decision: 'Borderline policy violation',
      details: {
        contentId: 'POST-89234',
        contentType: 'User Comment',
        category: 'Community Guidelines',
        flags: ['Potentially offensive language', 'Borderline harassment'],
        context: 'Response to heated political discussion',
        aiRecommendation: 'Warning or 24-hour suspension'
      },
      description: 'User content falls into gray area of community guidelines'
    },
    {
      id: 4,
      agentName: 'HR Recruitment Assistant',
      agentIcon: '👥',
      actionType: 'Candidate Screening',
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      requester: 'David Kim',
      requesterEmail: 'david.k@company.com',
      priority: 'low',
      status: 'pending',
      confidence: 88,
      decision: 'Strong match - recommend interview',
      details: {
        candidateName: 'Alex Thompson',
        position: 'Senior Software Engineer',
        matchScore: '88%',
        strengths: ['10+ years experience', 'Relevant tech stack', 'Strong portfolio'],
        concerns: ['Gaps in employment history'],
        aiRecommendation: 'Schedule technical interview'
      },
      description: 'Candidate shows strong technical fit but has employment gaps to discuss'
    },
    {
      id: 5,
      agentName: 'Customer Support AI',
      agentIcon: '💬',
      actionType: 'Refund Authorization',
      timestamp: new Date(Date.now() - 1000 * 60 * 48),
      requester: 'Lisa Martinez',
      requesterEmail: 'lisa.m@company.com',
      priority: 'medium',
      status: 'pending',
      confidence: 75,
      decision: 'Approve partial refund',
      details: {
        ticketId: 'SUP-45678',
        customer: 'Premium Customer (3 years)',
        orderValue: '$899.00',
        issue: 'Product defect reported after 45 days',
        refundAmount: '$450.00',
        aiRecommendation: '50% refund as goodwill gesture'
      },
      description: 'Loyal customer requesting refund outside standard policy window'
    },
    {
      id: 6,
      agentName: 'Compliance Monitor',
      agentIcon: '📋',
      actionType: 'Policy Exception',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      requester: 'James Wilson',
      requesterEmail: 'james.w@company.com',
      priority: 'high',
      status: 'pending',
      confidence: 70,
      decision: 'Escalate to compliance team',
      details: {
        policyId: 'POL-DATA-001',
        requestType: 'Data Access Exception',
        requester: 'Engineering Team',
        reason: 'Production debugging requirements',
        riskLevel: 'Medium',
        aiRecommendation: 'Require senior approval and audit trail'
      },
      description: 'Request for temporary elevated data access for debugging'
    },
    {
      id: 7,
      agentName: 'Invoice Validator',
      agentIcon: '📄',
      actionType: 'Payment Approval',
      timestamp: new Date(Date.now() - 1000 * 60 * 75),
      requester: 'Rachel Green',
      requesterEmail: 'rachel.g@company.com',
      priority: 'low',
      status: 'pending',
      confidence: 92,
      decision: 'Approve payment',
      details: {
        invoiceId: 'INV-2024-3421',
        vendor: 'Office Supplies Plus',
        amount: '$2,847.50',
        poMatch: '98%',
        discrepancy: 'Minor quantity variance (5 items)',
        aiRecommendation: 'Approve - within acceptable variance'
      },
      description: 'Invoice matches PO with minor acceptable variance'
    },
    {
      id: 8,
      agentName: 'Code Review Assistant',
      agentIcon: '💻',
      actionType: 'Deployment Approval',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      requester: 'Kevin Brown',
      requesterEmail: 'kevin.b@company.com',
      priority: 'medium',
      status: 'pending',
      confidence: 78,
      decision: 'Minor security concerns',
      details: {
        prNumber: 'PR-1247',
        repository: 'main-app',
        branch: 'feature/user-auth',
        issues: ['Potential SQL injection in search', 'Unvalidated user input'],
        testCoverage: '84%',
        aiRecommendation: 'Fix security issues before merge'
      },
      description: 'Pull request has security vulnerabilities that need addressing'
    }
  ]);

  // Stats
  const stats = {
    pending: approvals.filter(a => a.status === 'pending').length,
    avgResponseTime: '2.3 min',
    approvalRate: 92.4,
    totalToday: 156
  };

  // Filter approvals
  const filteredApprovals = approvals.filter(approval => {
    const matchesFilter = selectedFilter === 'all' || approval.status === selectedFilter ||
                         (selectedFilter === 'priority-high' && approval.priority === 'high') ||
                         (selectedFilter === 'priority-medium' && approval.priority === 'medium') ||
                         (selectedFilter === 'priority-low' && approval.priority === 'low');

    const matchesSearch = searchQuery === '' ||
                         approval.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         approval.actionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         approval.requester.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Handle approval actions
  const handleApprove = (approval) => {
    setApprovals(approvals.map(a =>
      a.id === approval.id ? { ...a, status: 'approved' } : a
    ));
    setSelectedApprovals(selectedApprovals.filter(id => id !== approval.id));
    setActiveDropdown(null);
  };

  const handleReject = (approval) => {
    setApprovals(approvals.map(a =>
      a.id === approval.id ? { ...a, status: 'rejected' } : a
    ));
    setSelectedApprovals(selectedApprovals.filter(id => id !== approval.id));
    setActiveDropdown(null);
  };

  const handleRequestInfo = (approval) => {
    setSelectedApproval(approval);
    setShowMoreInfoModal(true);
    setActiveDropdown(null);
  };

  const handleBulkApprove = () => {
    if (selectedApprovals.length === 0) {
      alert('Please select approvals first');
      return;
    }
    setApprovals(approvals.map(a =>
      selectedApprovals.includes(a.id) ? { ...a, status: 'approved' } : a
    ));
    setSelectedApprovals([]);
  };

  const handleBulkReject = () => {
    if (selectedApprovals.length === 0) {
      alert('Please select approvals first');
      return;
    }
    setApprovals(approvals.map(a =>
      selectedApprovals.includes(a.id) ? { ...a, status: 'rejected' } : a
    ));
    setSelectedApprovals([]);
  };

  const handleSelectAll = () => {
    if (selectedApprovals.length === filteredApprovals.filter(a => a.status === 'pending').length) {
      setSelectedApprovals([]);
    } else {
      setSelectedApprovals(filteredApprovals.filter(a => a.status === 'pending').map(a => a.id));
    }
  };

  const handleViewDetails = (approval) => {
    setSelectedApproval(approval);
    setShowDetailModal(true);
    setActiveDropdown(null);
  };

  const getPriorityBadge = (priority) => {
    const configs = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${configs[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Rejected' }
    };
    const config = configs[status];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 flex items-center gap-3">
                <Eye className="w-8 h-8 text-primary-600" />
                Approval Workflows
              </h1>
              <p className="text-secondary-600 mt-2">
                Review and approve AI decisions that require human oversight
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-secondary-600">Pending Approvals</p>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-sm text-secondary-600">Approval Rate</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.approvalRate}%</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-secondary-600">Avg Response Time</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.avgResponseTime}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-secondary-600" />
              <p className="text-sm text-secondary-600">Total Today</p>
            </div>
            <p className="text-3xl font-bold text-secondary-900">{stats.totalToday}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-grow w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by agent, action, or requester..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setSelectedFilter('approved')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'approved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setSelectedFilter('rejected')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'rejected'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedApprovals.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4">
              <span className="text-sm text-secondary-600">
                {selectedApprovals.length} selected
              </span>
              <button
                onClick={handleBulkApprove}
                className="glass-btn-primary rounded-lg px-4 py-2 text-sm inline-flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Approve All
              </button>
              <button
                onClick={handleBulkReject}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 text-sm inline-flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Reject All
              </button>
              <button
                onClick={() => setSelectedApprovals([])}
                className="text-sm text-secondary-600 hover:text-secondary-900"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>

        {/* Approvals List */}
        <div className="space-y-4">
          {filteredApprovals.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-secondary-600 font-medium">No approvals found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredApprovals.map((approval) => (
              <div
                key={approval.id}
                className={`glass-card rounded-2xl p-6 transition-all ${
                  selectedApprovals.includes(approval.id) ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  {approval.status === 'pending' && (
                    <input
                      type="checkbox"
                      checked={selectedApprovals.includes(approval.id)}
                      onChange={() => {
                        if (selectedApprovals.includes(approval.id)) {
                          setSelectedApprovals(selectedApprovals.filter(id => id !== approval.id));
                        } else {
                          setSelectedApprovals([...selectedApprovals, approval.id]);
                        }
                      }}
                      className="mt-1 w-5 h-5 text-primary-600 rounded"
                    />
                  )}

                  {/* Icon */}
                  <div className="text-4xl">{approval.agentIcon}</div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-secondary-900">{approval.agentName}</h3>
                        <p className="text-sm text-secondary-600">{approval.actionType}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(approval.priority)}
                        {getStatusBadge(approval.status)}
                      </div>
                    </div>

                    <p className="text-secondary-700 mb-4">{approval.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-secondary-600 mb-1">AI Confidence</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-grow bg-gray-200 rounded-full h-2 max-w-[80px]">
                            <div
                              className={`h-2 rounded-full ${
                                approval.confidence >= 80
                                  ? 'bg-green-500'
                                  : approval.confidence >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${approval.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-secondary-900">{approval.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-600 mb-1">Requester</p>
                        <p className="text-sm font-semibold text-secondary-900">{approval.requester}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-600 mb-1">Time</p>
                        <p className="text-sm font-semibold text-secondary-900">{getTimeAgo(approval.timestamp)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-600 mb-1">AI Decision</p>
                        <p className="text-sm font-semibold text-secondary-900">{approval.decision}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    {approval.status === 'pending' && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleApprove(approval)}
                          className="glass-btn-primary rounded-lg px-6 py-2 inline-flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(approval)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-2 inline-flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleRequestInfo(approval)}
                          className="glass-btn-secondary rounded-lg px-6 py-2 inline-flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Request Info
                        </button>
                        <button
                          onClick={() => handleViewDetails(approval)}
                          className="glass-btn-secondary rounded-lg px-6 py-2 inline-flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results count */}
        {filteredApprovals.length > 0 && (
          <div className="mt-6 text-sm text-secondary-600 text-center">
            Showing {filteredApprovals.length} of {approvals.length} approvals
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Approval Details"
        size="lg"
      >
        {selectedApproval && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-4xl">{selectedApproval.agentIcon}</span>
              <div>
                <h3 className="font-bold text-secondary-900 text-lg">{selectedApproval.agentName}</h3>
                <p className="text-secondary-600">{selectedApproval.actionType}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-secondary-900">Details</h4>
              {Object.entries(selectedApproval.details).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200">
                  <span className="font-semibold text-secondary-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="col-span-2 text-secondary-900">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">AI Recommendation</h4>
              <p className="text-blue-800">{selectedApproval.details.aiRecommendation}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Request More Info Modal */}
      <Modal
        isOpen={showMoreInfoModal}
        onClose={() => setShowMoreInfoModal(false)}
        title="Request More Information"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowMoreInfoModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              alert('Information request sent!');
              setShowMoreInfoModal(false);
            }}>
              Send Request
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Message to Requester
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="What additional information do you need?"
            />
          </div>
        </div>
      </Modal>

      {/* Close dropdowns on outside click */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </MainLayout>
  );
};

export default ApprovalWorkflowsPage;
