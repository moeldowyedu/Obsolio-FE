import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Badge, EmptyState, Alert } from '../../components/common';
import { HITLApprovalCard, HITLDecisionModal } from '../../components/hitl';
import {
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Bell,
  Clock,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

const HITLQueuePage = () => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([]);
  const [filteredApprovals, setFilteredApprovals] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterAgent, setFilterAgent] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadApprovals();
  }, []);

  useEffect(() => {
    filterAndSortApprovals();
  }, [approvals, searchQuery, filterPriority, filterAgent, sortBy]);

  const loadApprovals = async () => {
    // Mock data - in real app, fetch from API
    const mockApprovals = [
      {
        id: '1',
        agentId: 'agent-1',
        agentName: 'Customer Support Assistant',
        executionId: 'exec-12345678',
        description: 'Response requires human verification due to sensitive topic',
        priority: 'urgent',
        confidence: 0.65,
        hitlMode: 'confidence',
        createdAt: new Date(Date.now() - 600000).toISOString(),
        input: {
          message: 'I want to cancel my subscription and get a refund',
          customerId: 'CUST-789',
        },
        output: {
          response: 'I can help you with that. Let me process your refund request.',
          actions: ['cancel_subscription', 'process_refund'],
        },
        reason: 'Confidence below threshold (65%)',
      },
      {
        id: '2',
        agentId: 'agent-2',
        agentName: 'Document Processor',
        executionId: 'exec-87654321',
        description: 'Document classification uncertain',
        priority: 'high',
        confidence: 0.72,
        hitlMode: 'uncertainty',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        input: {
          documentType: 'invoice',
          fileName: 'document-2024.pdf',
        },
        output: {
          classification: 'invoice',
          extractedData: { total: 1234.56, date: '2024-01-15' },
        },
        reason: 'Multiple classification candidates with similar scores',
      },
      {
        id: '3',
        agentId: 'agent-3',
        agentName: 'Market Research Analyst',
        executionId: 'exec-11223344',
        description: 'High-value transaction requires approval',
        priority: 'high',
        confidence: 0.89,
        hitlMode: 'critical',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        input: {
          transaction: 'Purchase order for $50,000',
          vendor: 'ACME Corp',
        },
        output: {
          recommendation: 'approve',
          analysis: 'Vendor has good track record',
        },
        reason: 'Transaction amount exceeds $10,000 threshold',
      },
      {
        id: '4',
        agentId: 'agent-1',
        agentName: 'Customer Support Assistant',
        executionId: 'exec-99887766',
        description: 'Sentiment analysis flagged negative sentiment',
        priority: 'medium',
        confidence: 0.78,
        hitlMode: 'sentiment',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        input: {
          message: 'This service is terrible and I am very frustrated!',
          customerId: 'CUST-456',
        },
        output: {
          response: 'I sincerely apologize for your frustration. Let me help resolve this.',
          sentiment: 'negative',
          escalate: true,
        },
        reason: 'Strong negative sentiment detected',
      },
    ];

    setApprovals(mockApprovals);
    setIsLoading(false);
  };

  const filterAndSortApprovals = () => {
    let filtered = [...approvals];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (approval) =>
          approval.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          approval.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          approval.executionId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter((a) => a.priority === filterPriority);
    }

    // Agent filter
    if (filterAgent !== 'all') {
      filtered = filtered.filter((a) => a.agentId === filterAgent);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priority':
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'confidence':
          return a.confidence - b.confidence;
        default:
          return 0;
      }
    });

    setFilteredApprovals(filtered);
  };

  const handleApprove = (approvalId) => {
    const approval = approvals.find((a) => a.id === approvalId);
    setSelectedApproval(approval);
    setIsModalOpen(true);
  };

  const handleReject = (approvalId) => {
    const approval = approvals.find((a) => a.id === approvalId);
    setSelectedApproval(approval);
    setIsModalOpen(true);
  };

  const handleDecision = async (approvalId, decision, comment) => {
    try {
      // In real app, make API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setApprovals((prev) => prev.filter((a) => a.id !== approvalId));
      toast.success(
        `Execution ${decision === 'approve' ? 'approved' : 'rejected'} successfully`
      );
    } catch (error) {
      toast.error('Failed to process decision');
      throw error;
    }
  };

  const handleViewDetails = (approvalId) => {
    const approval = approvals.find((a) => a.id === approvalId);
    if (approval && approval.agentId && approval.executionId) {
      navigate(`/agents/${approval.agentId}/executions/${approval.executionId}`);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return;

    try {
      // In real app, make API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setApprovals((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
      setSelectedIds([]);
      toast.success(`${selectedIds.length} executions approved`);
    } catch (error) {
      toast.error('Failed to bulk approve');
    }
  };

  const uniqueAgents = [...new Set(approvals.map((a) => a.agentName))];
  const urgentCount = approvals.filter((a) => a.priority === 'urgent').length;
  const highCount = approvals.filter((a) => a.priority === 'high').length;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="py-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading approval queue...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
              HITL Approval Queue
            </h1>
            <p className="text-lg text-gray-600">
              Review and approve pending agent executions
            </p>
          </div>
          <Button onClick={() => navigate('/hitl/activity')} variant="outline">
            <Clock className="w-5 h-5 mr-2" />
            View Activity Log
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Bell className="w-8 h-8 text-blue-600" />
              <Badge variant="info" size="lg">
                {approvals.length}
              </Badge>
            </div>
            <p className="text-sm text-blue-600 font-medium">Pending Approvals</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <Badge variant="danger" size="lg">
                {urgentCount}
              </Badge>
            </div>
            <p className="text-sm text-red-600 font-medium">Urgent Priority</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <Badge variant="warning" size="lg">
                {highCount}
              </Badge>
            </div>
            <p className="text-sm text-yellow-600 font-medium">High Priority</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Filter className="w-8 h-8 text-purple-600" />
              <Badge variant="default" size="lg">
                {uniqueAgents.length}
              </Badge>
            </div>
            <p className="text-sm text-purple-600 font-medium">Active Agents</p>
          </div>
        </div>

        {/* Alert for urgent items */}
        {urgentCount > 0 && (
          <Alert variant="warning" title={`${urgentCount} Urgent Approval${urgentCount !== 1 ? 's' : ''} Pending`}>
            You have urgent approvals that require immediate attention. Please review as
            soon as possible.
          </Alert>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by agent, execution ID, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Agents</option>
              {uniqueAgents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">By Priority</option>
              <option value="confidence">By Confidence</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900">
              {selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setSelectedIds([])}
                variant="outline"
                size="sm"
              >
                Clear Selection
              </Button>
              <Button
                onClick={handleBulkApprove}
                variant="primary"
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Selected
              </Button>
            </div>
          </div>
        )}

        {/* Approvals Grid */}
        {filteredApprovals.length === 0 ? (
          <EmptyState
            icon={approvals.length === 0 ? CheckCircle : Search}
            title={approvals.length === 0 ? 'No Pending Approvals' : 'No Results Found'}
            description={
              approvals.length === 0
                ? 'All agent executions are running smoothly. New approvals will appear here.'
                : 'Try adjusting your search or filter criteria'
            }
            action={
              searchQuery || filterPriority !== 'all' || filterAgent !== 'all' ? (
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterPriority('all');
                    setFilterAgent('all');
                  }}
                  variant="primary"
                >
                  Clear Filters
                </Button>
              ) : null
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApprovals.map((approval) => (
              <HITLApprovalCard
                key={approval.id}
                approval={approval}
                onApprove={handleApprove}
                onReject={handleReject}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Decision Modal */}
        <HITLDecisionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedApproval(null);
          }}
          approval={selectedApproval}
          onDecide={handleDecision}
        />
      </div>
    </MainLayout>
  );
};

export default HITLQueuePage;
