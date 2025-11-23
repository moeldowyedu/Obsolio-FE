import { useNavigate } from 'react-router-dom';
import { Card, Badge } from '../common';
import { Star, Download, DollarSign, User, Zap } from 'lucide-react';

const AgentCard = ({ agent, featured = false }) => {
  const navigate = useNavigate();

  const getPriceDisplay = () => {
    if (agent.price === 0 || agent.price === 'free') {
      return 'Free';
    }
    return `$${agent.price}`;
  };

  const getEngineColor = (engineId) => {
    const colors = {
      vision: '#3b82f6',
      audio: '#8b5cf6',
      text: '#06b6d4',
      code: '#14b8a6',
      document: '#f59e0b',
      data: '#10b981',
      web: '#ec4899',
    };
    return colors[engineId] || '#6b7280';
  };

  return (
    <Card
      onClick={() => navigate(`/agentx/marketplace/agent/${agent.id}`)}
      padding="none"
      hover
      className={`cursor-pointer transition-all duration-300 overflow-hidden ${
        featured ? 'ring-2 ring-primary-500 shadow-lg' : ''
      }`}
    >
      {/* Image/Banner */}
      <div
        className="h-40 bg-gradient-to-br from-primary-500 to-secondary-500 relative"
        style={{
          backgroundImage: agent.banner
            ? `url(${agent.banner})`
            : 'linear-gradient(135deg, #3b82f6 0%, #22c55e 100%)',
        }}
      >
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="warning" size="sm" className="font-semibold">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge
            variant={agent.price === 0 ? 'success' : 'default'}
            size="md"
            className="font-semibold"
          >
            {getPriceDisplay()}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        {/* Title and Author */}
        <div className="mb-3">
          <h3 className="text-lg font-heading font-bold text-secondary-900 mb-1 line-clamp-1">
            {agent.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <User className="w-4 h-4" />
            <span>{agent.author}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
          {agent.description}
        </p>

        {/* Engines */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {agent.engines?.slice(0, 3).map((engineId, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded text-white font-medium"
                style={{ backgroundColor: getEngineColor(engineId) }}
              >
                {engineId}
              </span>
            ))}
            {agent.engines?.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-secondary-600 rounded">
                +{agent.engines.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-secondary-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{agent.rating || '5.0'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{agent.downloads || 0}</span>
            </div>
          </div>

          {agent.category && (
            <Badge variant="default" size="sm">
              {agent.category}
            </Badge>
          )}
        </div>

        {/* Quick Deploy */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle quick deploy
          }}
          className="w-full mt-4 py-2 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Quick Deploy
        </button>
      </div>
    </Card>
  );
};

export default AgentCard;
