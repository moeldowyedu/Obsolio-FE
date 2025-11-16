import { useState } from 'react';
import { Modal, Button, Textarea, Badge, Alert } from '../common';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const HITLDecisionModal = ({ isOpen, onClose, approval, onDecide }) => {
  const [decision, setDecision] = useState(null); // 'approve' or 'reject'
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!decision) return;

    setIsSubmitting(true);
    try {
      await onDecide(approval.id, decision, comment);
      handleClose();
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setDecision(null);
    setComment('');
    onClose();
  };

  if (!approval) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="HITL Decision Required"
      size="lg"
    >
      <div className="space-y-6">
        {/* Agent Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {approval.agentName}
            </h3>
            <Badge variant="default" size="sm">
              Execution #{approval.executionId?.slice(0, 8) || 'N/A'}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{approval.description}</p>
        </div>

        {/* Confidence Warning */}
        {approval.confidence < 0.7 && (
          <Alert variant="warning" title="Low Confidence Score">
            This execution has a confidence score of{' '}
            {(approval.confidence * 100).toFixed(1)}%. Please review carefully
            before making a decision.
          </Alert>
        )}

        {/* Reason for Review */}
        {approval.reason && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900 mb-1">
                  Reason for Review
                </p>
                <p className="text-sm text-yellow-800">{approval.reason}</p>
              </div>
            </div>
          </div>
        )}

        {/* Input/Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approval.input && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Input Data</p>
              <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-auto max-h-48">
                {JSON.stringify(approval.input, null, 2)}
              </pre>
            </div>
          )}
          {approval.output && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Proposed Output
              </p>
              <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-auto max-h-48">
                {JSON.stringify(approval.output, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Decision Selection */}
        <div>
          <p className="text-sm font-medium text-gray-900 mb-3">Your Decision</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDecision('approve')}
              className={`p-4 rounded-lg border-2 transition-all ${
                decision === 'approve'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle
                  className={`w-6 h-6 ${
                    decision === 'approve' ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`font-semibold ${
                    decision === 'approve' ? 'text-green-900' : 'text-gray-700'
                  }`}
                >
                  Approve
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Approve and continue execution
              </p>
            </button>

            <button
              onClick={() => setDecision('reject')}
              className={`p-4 rounded-lg border-2 transition-all ${
                decision === 'reject'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <XCircle
                  className={`w-6 h-6 ${
                    decision === 'reject' ? 'text-red-600' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`font-semibold ${
                    decision === 'reject' ? 'text-red-900' : 'text-gray-700'
                  }`}
                >
                  Reject
                </span>
              </div>
              <p className="text-xs text-gray-600">Reject and halt execution</p>
            </button>
          </div>
        </div>

        {/* Comment */}
        <div>
          <Textarea
            label={`Comment ${decision ? '(Required)' : '(Optional)'}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              decision === 'approve'
                ? 'Explain why you approved this execution...'
                : decision === 'reject'
                ? 'Explain why you rejected this execution...'
                : 'Add a comment about your decision...'
            }
            rows={4}
            required={!!decision}
          />
          {decision && !comment.trim() && (
            <p className="text-xs text-red-600 mt-1">
              A comment is required for your decision
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Button onClick={handleClose} variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            disabled={!decision || !comment.trim() || isSubmitting}
            className={
              decision === 'approve'
                ? 'bg-green-600 hover:bg-green-700'
                : decision === 'reject'
                ? 'bg-red-600 hover:bg-red-700'
                : ''
            }
          >
            {isSubmitting ? (
              'Submitting...'
            ) : decision === 'approve' ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Execution
              </>
            ) : decision === 'reject' ? (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                Reject Execution
              </>
            ) : (
              'Make Decision'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HITLDecisionModal;
