import { useState } from 'react';
import {
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  FileText,
  Download,
  Eye,
  Clock,
  TrendingUp,
  User,
  Briefcase,
  Building2,
} from 'lucide-react';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import Badge from '../common/Badge/Badge';
import Card from '../common/Card/Card';
import { useHITLApprovalStore } from '../../store/hitlApprovalStore';

const TaskReviewModal = ({ task, onClose }) => {
  const { approveTask, rejectTask, escalateTask, modifyDecision, isLoading } =
    useHITLApprovalStore();

  const [activeAction, setActiveAction] = useState(null); // 'approve', 'reject', 'modify', 'escalate'
  const [formData, setFormData] = useState({
    comments: '',
    reason: '',
    modifications: {},
    newDecision: '',
    newReasoning: '',
    escalateTo: '',
    escalationReason: '',
  });

  const [actionInProgress, setActionInProgress] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);

  if (!task) return null;

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-700 border-red-300',
      high: 'bg-orange-100 text-orange-700 border-orange-300',
      normal: 'bg-blue-100 text-blue-700 border-blue-300',
      low: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[priority] || colors.normal;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-blue-600';
    if (confidence >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 24) {
      return `${Math.floor(diffHours / 24)} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffMins} minutes ago`;
    }
  };

  const handleApprove = async () => {
    setActionInProgress(true);
    try {
      await approveTask(task.id, formData.comments, formData.modifications);
      setActionSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      alert('Failed to approve task. Please try again.');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleReject = async () => {
    if (!formData.reason) {
      alert('Please provide a reason for rejection');
      return;
    }
    setActionInProgress(true);
    try {
      await rejectTask(task.id, formData.reason, formData.comments);
      setActionSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      alert('Failed to reject task. Please try again.');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleModify = async () => {
    if (!formData.newDecision || !formData.newReasoning) {
      alert('Please provide both new decision and reasoning');
      return;
    }
    setActionInProgress(true);
    try {
      await modifyDecision(task.id, formData.newDecision, formData.newReasoning);
      setActionSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      alert('Failed to modify decision. Please try again.');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleEscalate = async () => {
    if (!formData.escalateTo || !formData.escalationReason) {
      alert('Please provide escalation target and reason');
      return;
    }
    setActionInProgress(true);
    try {
      await escalateTask(task.id, formData.escalateTo, formData.escalationReason);
      setActionSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      alert('Failed to escalate task. Please try again.');
    } finally {
      setActionInProgress(false);
    }
  };

  const renderActionForm = () => {
    if (!activeAction) return null;

    if (activeAction === 'approve') {
      return (
        <Card className="bg-green-50 border-green-200">
          <h4 className="font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Approve Task
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                placeholder="Add any comments or notes..."
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleApprove}
                loading={actionInProgress}
                disabled={actionInProgress}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Confirm Approval
              </Button>
              <Button variant="outline" onClick={() => setActiveAction(null)} disabled={actionInProgress}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    if (activeAction === 'reject') {
      return (
        <Card className="bg-red-50 border-red-200">
          <h4 className="font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Reject Task
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Reason for Rejection <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
                placeholder="Explain why this decision is being rejected..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="2"
                placeholder="Add any additional notes..."
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="danger"
                onClick={handleReject}
                loading={actionInProgress}
                disabled={actionInProgress}
                className="flex-1"
              >
                Confirm Rejection
              </Button>
              <Button variant="outline" onClick={() => setActiveAction(null)} disabled={actionInProgress}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    if (activeAction === 'modify') {
      return (
        <Card className="bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-600" />
            Modify AI Decision
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                New Decision <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.newDecision}
                onChange={(e) => setFormData({ ...formData, newDecision: e.target.value })}
              >
                <option value="">Select new decision...</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
                <option value="pending_review">Pending Review</option>
                <option value="request_more_info">Request More Information</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Reasoning for Change <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Explain why you're modifying the AI's decision..."
                value={formData.newReasoning}
                onChange={(e) => setFormData({ ...formData, newReasoning: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleModify}
                loading={actionInProgress}
                disabled={actionInProgress}
                className="flex-1"
              >
                Save Modified Decision
              </Button>
              <Button variant="outline" onClick={() => setActiveAction(null)} disabled={actionInProgress}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    if (activeAction === 'escalate') {
      return (
        <Card className="bg-orange-50 border-orange-200">
          <h4 className="font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Escalate Task
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Escalate To <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.escalateTo}
                onChange={(e) => setFormData({ ...formData, escalateTo: e.target.value })}
              >
                <option value="">Select supervisor...</option>
                <option value="senior-manager">Senior Manager</option>
                <option value="department-head">Department Head</option>
                <option value="executive">Executive</option>
                <option value="compliance-team">Compliance Team</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Escalation Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows="4"
                placeholder="Explain why this task needs escalation..."
                value={formData.escalationReason}
                onChange={(e) => setFormData({ ...formData, escalationReason: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleEscalate}
                loading={actionInProgress}
                disabled={actionInProgress}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                Escalate Task
              </Button>
              <Button variant="outline" onClick={() => setActiveAction(null)} disabled={actionInProgress}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      );
    }
  };

  if (actionSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 mb-2">Action Completed!</h3>
          <p className="text-secondary-600">
            Your decision has been recorded and the agent has been notified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-secondary-900">{task.taskName}</h2>
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-secondary-600">
              Submitted {getTimeAgo(task.submittedAt)} • Task ID: {task.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-secondary-600 transition-colors"
            disabled={actionInProgress}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Agent Information */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {task.agentName.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {task.agentName}
                </h3>
                <div className="text-sm text-secondary-600 mt-1 space-y-1">
                  <p className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {task.agentJobTitle}
                  </p>
                  <p className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {task.department}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Rubric Score</div>
                <div className="text-2xl font-bold text-secondary-900">{task.rubricScore}/100</div>
              </div>
            </div>
          </Card>

          {/* AI Decision */}
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              AI Decision Analysis
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-secondary-600">Recommended Action:</span>
                  <span className="ml-2 font-semibold text-secondary-900 capitalize">
                    {task.aiDecision.action.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-secondary-600">Confidence:</span>
                  <span className={`text-lg font-bold ${getConfidenceColor(task.aiDecision.confidence)}`}>
                    {Math.round(task.aiDecision.confidence * 100)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-secondary-700 mb-1">Reasoning:</p>
                <p className="text-sm text-secondary-600">{task.aiDecision.reasoning}</p>
              </div>
            </div>
          </Card>

          {/* Task Data */}
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Task Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(task.data).map(([key, value]) => (
                <div key={key} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="font-medium text-secondary-900">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Supporting Documents */}
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              Supporting Documents ({task.supportingDocuments.length})
            </h3>
            <div className="space-y-2">
              {task.supportingDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-secondary-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.type.toUpperCase()} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Form */}
          {renderActionForm()}
        </div>

        {/* Footer - Action Buttons */}
        {!activeAction && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-4 gap-3">
              <Button
                variant="primary"
                onClick={() => setActiveAction('approve')}
                leftIcon={<CheckCircle className="w-5 h-5" />}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => setActiveAction('reject')}
                leftIcon={<XCircle className="w-5 h-5" />}
              >
                Reject
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveAction('modify')}
                leftIcon={<Edit className="w-5 h-5" />}
              >
                Modify
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveAction('escalate')}
                leftIcon={<AlertTriangle className="w-5 h-5" />}
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                Escalate
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskReviewModal;
