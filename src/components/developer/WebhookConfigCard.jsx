import { Card, Badge, Button, Toggle } from '../common';
import { Send, Trash2, Edit, CheckCircle, XCircle, Clock, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

const WebhookConfigCard = ({ webhook, onTest, onEdit, onDelete, onToggleStatus }) => {
  const handleTest = async () => {
    try {
      await onTest(webhook.id);
      toast.success('Test payload sent successfully');
    } catch (error) {
      toast.error('Failed to send test payload');
    }
  };

  const handleToggle = () => {
    onToggleStatus(webhook.id);
    toast.success(`Webhook ${webhook.isActive ? 'disabled' : 'enabled'}`);
  };

  const getStatusVariant = (status) => {
    const variants = {
      healthy: 'success',
      failing: 'danger',
      warning: 'warning',
    };
    return variants[status] || 'default';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card padding="md" className="hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-secondary-900">{webhook.name}</h3>
            <Badge variant={getStatusVariant(webhook.status)} size="sm">
              {webhook.status}
            </Badge>
            {!webhook.isActive && (
              <Badge variant="default" size="sm">
                Disabled
              </Badge>
            )}
          </div>
          {webhook.description && (
            <p className="text-sm text-secondary-600">{webhook.description}</p>
          )}
        </div>
        <Toggle checked={webhook.isActive} onChange={handleToggle} />
      </div>

      {/* URL */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs text-secondary-600 mb-1">Endpoint URL</p>
        <code className="text-sm font-mono text-secondary-900 break-all">
          {webhook.url}
        </code>
      </div>

      {/* Events */}
      <div className="mb-4">
        <p className="text-xs text-secondary-600 mb-2">Subscribed Events</p>
        <div className="flex flex-wrap gap-2">
          {webhook.events.map((event) => (
            <Badge key={event} variant="default" size="sm">
              {event}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-secondary-600 mb-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Success</span>
          </div>
          <p className="text-lg font-bold text-green-600">
            {webhook.stats?.successCount || 0}
          </p>
          <p className="text-xs text-gray-500">
            {webhook.stats?.successRate || 0}% rate
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-secondary-600 mb-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Failed</span>
          </div>
          <p className="text-lg font-bold text-red-600">
            {webhook.stats?.failureCount || 0}
          </p>
          <p className="text-xs text-gray-500">Last 24h</p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-secondary-600 mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Avg Time</span>
          </div>
          <p className="text-lg font-bold text-secondary-900">
            {webhook.stats?.avgResponseTime || 0}ms
          </p>
          <p className="text-xs text-gray-500">Response</p>
        </div>
      </div>

      {/* Last Delivery */}
      {webhook.lastDelivery && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-600 mb-0.5">Last Delivery</p>
              <p className="text-sm font-medium text-secondary-900">
                {formatDate(webhook.lastDelivery.timestamp)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  webhook.lastDelivery.status === 'success' ? 'success' : 'danger'
                }
                size="sm"
              >
                {webhook.lastDelivery.status}
              </Badge>
              <span className="text-xs text-secondary-600">
                {webhook.lastDelivery.responseTime}ms
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleTest}
          variant="outline"
          size="sm"
          className="flex-1"
          disabled={!webhook.isActive}
        >
          <Send className="w-4 h-4 mr-1" />
          Test Webhook
        </Button>
        <Button onClick={() => onEdit(webhook.id)} variant="outline" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => onDelete(webhook.id)}
          variant="outline"
          size="sm"
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default WebhookConfigCard;
