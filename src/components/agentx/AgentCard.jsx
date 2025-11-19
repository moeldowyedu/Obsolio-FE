import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import Button from '../common/Button/Button';

const AgentCard = ({ agent, onSelect, onDeploy }) => {
  const {
    id,
    name,
    icon,
    description,
    category,
    industry,
    pricing,
    rating,
    deployments,
    isPublic,
    tags
  } = agent;

  const handleClick = () => {
    if (onSelect) {
      onSelect(agent);
    }
  };

  return (
    <Card hover className="h-full flex flex-col cursor-pointer" onClick={handleClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl">
          {icon || '🤖'}
        </div>
        <div className="flex gap-2">
          {isPublic ? (
            <Badge variant="success" size="sm">Public</Badge>
          ) : (
            <Badge variant="default" size="sm">Private</Badge>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-secondary-900 mb-2">{name}</h3>
      <p className="text-secondary-600 text-sm mb-3 flex-grow line-clamp-3">{description}</p>

      <div className="flex items-center gap-2 mb-3">
        <Badge variant="primary" size="sm">{category}</Badge>
        <Badge variant="info" size="sm">{industry}</Badge>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500">Rating</p>
          <p className="text-sm font-semibold text-secondary-900">⭐ {rating || 'N/A'}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Deployments</p>
          <p className="text-sm font-semibold text-secondary-900">{deployments?.toLocaleString() || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Pricing</p>
          <p className="text-sm font-semibold text-secondary-900">{pricing || 'Free'}</p>
        </div>
      </div>

      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="outline"
          className="flex-grow"
          size="sm"
          onClick={handleClick}
        >
          View Details
        </Button>
        {onDeploy && (
          <Button onClick={() => onDeploy(agent)} className="flex-grow" size="sm">
            Deploy
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AgentCard;
