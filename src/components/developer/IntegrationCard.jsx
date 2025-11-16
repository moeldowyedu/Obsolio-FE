import { Card, Badge, Button } from '../common';
import { Plus, CheckCircle, ExternalLink, Star } from 'lucide-react';

const IntegrationCard = ({ integration, isInstalled, onInstall, onConfigure, onViewDocs }) => {
  return (
    <Card padding="md" className="hover:shadow-lg transition-shadow">
      {/* Header with Logo */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          {integration.logo ? (
            <img
              src={integration.logo}
              alt={integration.name}
              className="w-16 h-16 rounded-lg border border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
              {integration.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {integration.name}
            </h3>
            {isInstalled && (
              <Badge variant="success" size="sm">
                <CheckCircle className="w-3 h-3 mr-1" />
                Installed
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{integration.provider}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {integration.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{integration.rating}</span>
              </div>
            )}
            {integration.installs && (
              <span>{integration.installs.toLocaleString()} installs</span>
            )}
            {integration.category && (
              <Badge variant="default" size="sm">
                {integration.category}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
        {integration.description}
      </p>

      {/* Features */}
      {integration.features && integration.features.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-1">
            {integration.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {integration.tags && integration.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {integration.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
        {onViewDocs && (
          <Button
            onClick={() => onViewDocs(integration.id)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Docs
          </Button>
        )}
        {isInstalled ? (
          <Button
            onClick={() => onConfigure(integration.id)}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            Configure
          </Button>
        ) : (
          <Button
            onClick={() => onInstall(integration.id)}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            <Plus className="w-4 h-4 mr-1" />
            Install
          </Button>
        )}
      </div>
    </Card>
  );
};

export default IntegrationCard;
