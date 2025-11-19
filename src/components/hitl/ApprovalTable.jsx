import { useState } from 'react';
import { Check, X, Eye, Clock, AlertCircle } from 'lucide-react';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import Button from '../common/Button/Button';
import Modal from '../common/Modal/Modal';
import { formatRelativeTime } from '../../utils/formatters';

const ApprovalTable = () => {
  const [approvals, setApprovals] = useState([
    {
      id: '1',
      agent: 'Legal Document Analyzer',
      agentIcon: '⚖️',
      task: 'Contract compliance review',
      input: 'Employment Agreement - Section 3.2 Non-Compete Clause',
      aiDecision: 'Flagged for review',
      confidence: 72,
      priority: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      metadata: {
        documentType: 'Employment Contract',
        sections: ['3.2', '3.3', '5.1'],
        riskLevel: 'Medium-High'
      }
    },
    {
      id: '2',
      agent: 'Financial Audit AI',
      agentIcon: '💰',
      task: 'Transaction validation',
      input: 'Wire transfer $125,000 to vendor #4521',
      aiDecision: 'Approve with conditions',
      confidence: 68,
      priority: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      metadata: {
        amount: '$125,000',
        vendor: 'TechSupply Corp',
        riskFactors: ['High amount', 'New vendor']
      }
    },
    {
      id: '3',
      agent: 'Content Moderation AI',
      agentIcon: '🛡️',
      task: 'User content review',
      input: 'Post ID: 89234 - Political discussion thread',
      aiDecision: 'Borderline violation',
      confidence: 65,
      priority: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      metadata: {
        contentType: 'Discussion Post',
        violationType: 'Potential harassment',
        userHistory: 'Clean record'
      }
    },
    {
      id: '4',
      agent: 'HR Recruitment Assistant',
      agentIcon: '👥',
      task: 'Candidate screening',
      input: 'Application #5421 - Senior Developer position',
      aiDecision: 'Strong match - recommend interview',
      confidence: 88,
      priority: 'low',
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      metadata: {
        matchScore: '88%',
        experience: '8 years',
        skills: ['React', 'Node.js', 'AWS']
      }
    },
    {
      id: '5',
      agent: 'Customer Support AI',
      agentIcon: '💬',
      task: 'Escalation decision',
      input: 'Ticket #7823 - Refund request for $450',
      aiDecision: 'Approve partial refund',
      confidence: 75,
      priority: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 48),
      metadata: {
        requestAmount: '$450',
        recommendedAmount: '$315',
        customerTier: 'Premium'
      }
    }
  ]);

  const [selectedApproval, setSelectedApproval] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleApprove = (id) => {
    console.log('Approving:', id);
    setApprovals(approvals.filter(a => a.id !== id));
    if (selectedApproval?.id === id) {
      setSelectedApproval(null);
    }
  };

  const handleReject = (id) => {
    console.log('Rejecting:', id);
    setApprovals(approvals.filter(a => a.id !== id));
    if (selectedApproval?.id === id) {
      setSelectedApproval(null);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredApprovals = filter === 'all'
    ? approvals
    : approvals.filter(a => a.priority === filter);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({approvals.length})
          </Button>
          <Button
            variant={filter === 'high' ? 'danger' : 'outline'}
            size="sm"
            onClick={() => setFilter('high')}
          >
            High Priority ({approvals.filter(a => a.priority === 'high').length})
          </Button>
          <Button
            variant={filter === 'medium' ? 'outline' : 'outline'}
            size="sm"
            onClick={() => setFilter('medium')}
          >
            Medium ({approvals.filter(a => a.priority === 'medium').length})
          </Button>
          <Button
            variant={filter === 'low' ? 'outline' : 'outline'}
            size="sm"
            onClick={() => setFilter('low')}
          >
            Low ({approvals.filter(a => a.priority === 'low').length})
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        {filteredApprovals.length === 0 ? (
          <div className="text-center py-12">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-secondary-600 text-lg font-semibold mb-2">No pending approvals!</p>
            <p className="text-gray-500">All tasks have been reviewed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Agent & Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Input
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    AI Decision
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApprovals.map((approval) => (
                  <tr key={approval.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{approval.agentIcon}</span>
                        <div>
                          <p className="text-sm font-semibold text-secondary-900">{approval.agent}</p>
                          <p className="text-xs text-secondary-600">{approval.task}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-secondary-900 max-w-xs truncate" title={approval.input}>
                        {approval.input}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-secondary-900">{approval.aiDecision}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-2">
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
                        <span className={`text-sm font-semibold ${getConfidenceColor(approval.confidence)}`}>
                          {approval.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getPriorityColor(approval.priority)}>
                        {approval.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-secondary-600">
                        <Clock className="w-4 h-4" />
                        {formatRelativeTime(approval.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApproval(approval)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(approval.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleReject(approval.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      {selectedApproval && (
        <Modal isOpen={true} onClose={() => setSelectedApproval(null)} size="lg">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <span className="text-4xl">{selectedApproval.agentIcon}</span>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold font-heading text-secondary-900">{selectedApproval.agent}</h2>
                <p className="text-secondary-600">{selectedApproval.task}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant={getPriorityColor(selectedApproval.priority)}>
                    {selectedApproval.priority} priority
                  </Badge>
                  <span className="text-sm text-secondary-600">
                    {formatRelativeTime(selectedApproval.timestamp)}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <Card className="bg-gray-50">
                <h3 className="text-sm font-semibold text-secondary-700 mb-2">Input</h3>
                <p className="text-secondary-900">{selectedApproval.input}</p>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">AI Decision</h3>
                <p className="text-blue-900 font-medium mb-3">{selectedApproval.aiDecision}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-700">Confidence:</span>
                  <div className="flex-grow max-w-xs bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${selectedApproval.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-blue-900">
                    {selectedApproval.confidence}%
                  </span>
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-secondary-700 mb-3">Additional Metadata</h3>
                <div className="space-y-2">
                  {Object.entries(selectedApproval.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                      <span className="text-sm text-secondary-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-medium text-secondary-900">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {selectedApproval.confidence < 75 && (
                <Card className="bg-yellow-50 border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-yellow-900 mb-1">Low Confidence Warning</h3>
                      <p className="text-sm text-yellow-800">
                        This decision has below-threshold confidence. Please review carefully before approving.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setSelectedApproval(null)}>
                Close
              </Button>
              <Button variant="danger" onClick={() => handleReject(selectedApproval.id)}>
                <X className="w-4 h-4 mr-1" />
                Reject
              </Button>
              <Button variant="success" onClick={() => handleApprove(selectedApproval.id)}>
                <Check className="w-4 h-4 mr-1" />
                Approve
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApprovalTable;
