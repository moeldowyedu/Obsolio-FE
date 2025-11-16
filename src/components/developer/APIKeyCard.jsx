import { useState } from 'react';
import { Card, Badge, Button } from '../common';
import { Copy, Eye, EyeOff, Trash2, RefreshCw, Calendar, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

const APIKeyCard = ({ apiKey, onRotate, onDelete, onCopy }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const maskKey = (key) => {
    if (!key) return '';
    return `${key.slice(0, 8)}${'•'.repeat(24)}${key.slice(-8)}`;
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(apiKey.key);
      toast.success('API key copied to clipboard');
      if (onCopy) onCopy(apiKey.id);
    }
  };

  const handleRotate = () => {
    if (confirm('Rotating this key will invalidate the old key. Continue?')) {
      onRotate(apiKey.id);
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      onDelete(apiKey.id);
    }
  };

  const getStatusVariant = (status) => {
    const variants = {
      active: 'success',
      expired: 'danger',
      revoked: 'default',
    };
    return variants[status] || 'default';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntilExpiry = () => {
    if (!apiKey.expiresAt) return null;
    const days = Math.ceil((new Date(apiKey.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysUntilExpiry = getDaysUntilExpiry();
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 30 && daysUntilExpiry > 0;

  return (
    <Card padding="md" className="hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
            <Badge variant={getStatusVariant(apiKey.status)} size="sm">
              {apiKey.status}
            </Badge>
            {isExpiringSoon && (
              <Badge variant="warning" size="sm">
                Expiring Soon
              </Badge>
            )}
          </div>
          {apiKey.description && (
            <p className="text-sm text-gray-600">{apiKey.description}</p>
          )}
        </div>
      </div>

      {/* API Key Display */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm font-mono text-gray-900 overflow-hidden">
            {isRevealed ? apiKey.key : maskKey(apiKey.key)}
          </code>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              title={isRevealed ? 'Hide key' : 'Reveal key'}
            >
              {isRevealed ? (
                <EyeOff className="w-4 h-4 text-gray-600" />
              ) : (
                <Eye className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Created</span>
          </div>
          <p className="text-sm font-medium text-gray-900">{formatDate(apiKey.createdAt)}</p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Expires</span>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {apiKey.expiresAt ? formatDate(apiKey.expiresAt) : 'Never'}
          </p>
          {daysUntilExpiry !== null && daysUntilExpiry > 0 && (
            <p className="text-xs text-gray-500 mt-0.5">
              {daysUntilExpiry} days remaining
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Last Used</span>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {apiKey.lastUsed ? formatDate(apiKey.lastUsed) : 'Never'}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Total Requests</span>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {apiKey.requestCount?.toLocaleString() || 0}
          </p>
        </div>
      </div>

      {/* Permissions/Scopes */}
      {apiKey.scopes && apiKey.scopes.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-2">Scopes</p>
          <div className="flex flex-wrap gap-2">
            {apiKey.scopes.map((scope) => (
              <Badge key={scope} variant="default" size="sm">
                {scope}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleRotate}
          variant="outline"
          size="sm"
          className="flex-1"
          disabled={apiKey.status !== 'active'}
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Rotate Key
        </Button>
        <Button
          onClick={handleDelete}
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

export default APIKeyCard;
