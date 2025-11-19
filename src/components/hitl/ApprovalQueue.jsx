import { useState } from 'react';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import Button from '../common/Button/Button';

const ApprovalQueue = ({ items, onApprove, onReject }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const getPriorityVariant = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'default'
    };
    return variants[priority] || 'default';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Queue List */}
      <div className="lg:col-span-2 space-y-3">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Pending Approvals ({items.length})
        </h3>

        {items.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500">No pending approvals</p>
          </Card>
        ) : (
          items.map((item) => (
            <Card
              key={item.id}
              hover
              onClick={() => setSelectedItem(item)}
              className={`cursor-pointer ${
                selectedItem?.id === item.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-secondary-900">{item.title}</h4>
                    <Badge variant={getPriorityVariant(item.priority)} size="sm">
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-secondary-600 mb-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Agent: {item.agent}</span>
                    <span>•</span>
                    <span>Confidence: {item.confidence}%</span>
                    <span>•</span>
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Details Panel */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Details</h3>
        {selectedItem ? (
          <Card>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-secondary-900 mb-2">{selectedItem.title}</h4>
                <Badge variant={getPriorityVariant(selectedItem.priority)} size="sm">
                  {selectedItem.priority} priority
                </Badge>
              </div>

              <div>
                <p className="text-sm text-secondary-600">{selectedItem.description}</p>
              </div>

              <div className="space-y-2 py-3 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Agent:</span>
                  <span className="font-medium">{selectedItem.agent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Confidence:</span>
                  <span className="font-medium">{selectedItem.confidence}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Requested:</span>
                  <span className="font-medium">
                    {new Date(selectedItem.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedItem.details && (
                <div className="py-3 border-t border-gray-200">
                  <h5 className="text-sm font-semibold text-secondary-900 mb-2">Additional Details</h5>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto max-h-48">
                    {JSON.stringify(selectedItem.details, null, 2)}
                  </pre>
                </div>
              )}

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <Button
                  variant="success"
                  className="flex-1"
                  onClick={() => onApprove(selectedItem)}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  onClick={() => onReject(selectedItem)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-500">Select an item to view details</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApprovalQueue;
