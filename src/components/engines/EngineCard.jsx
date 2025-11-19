import { Link } from 'react-router-dom';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import Button from '../common/Button/Button';

const EngineCard = ({ engine }) => {
  const {
    id,
    name,
    icon,
    description,
    status,
    category,
    processedToday,
    accuracy,
    color
  } = engine;

  const statusVariants = {
    active: 'success',
    inactive: 'default',
    maintenance: 'warning'
  };

  return (
    <Card hover className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <Badge variant={statusVariants[status]} size="sm">
          {status}
        </Badge>
      </div>

      <h3 className="text-xl font-semibold text-secondary-900 mb-2">{name}</h3>
      <p className="text-secondary-600 text-sm mb-4 flex-grow">{description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-gray-100">
        <div>
          <p className="text-gray-500 text-xs mb-1">Processed Today</p>
          <p className="text-lg font-semibold text-secondary-900">{processedToday?.toLocaleString() || 0}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Accuracy</p>
          <p className="text-lg font-semibold text-secondary-900">{accuracy || 'N/A'}</p>
        </div>
      </div>

      <Link to={`/engines/${id}`}>
        <Button variant="outline" className="w-full">
          View Engine
        </Button>
      </Link>
    </Card>
  );
};

export default EngineCard;
