import { Link } from 'react-router-dom';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import { ENGINES } from '../../utils/constants';
import { formatNumber } from '../../utils/formatters';

const EngineStatusGrid = () => {
  const engines = ENGINES.map(engine => ({
    ...engine,
    status: 'active',
    processedToday: Math.floor(Math.random() * 50000) + 5000,
    accuracy: (96 + Math.random() * 3).toFixed(1) + '%',
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {engines.map((engine) => (
        <Link key={engine.id} to={`/engines/${engine.id}`}>
          <Card hover className="h-full">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${engine.color} flex items-center justify-center text-xl`}>
                {engine.icon}
              </div>
              <Badge variant="success" size="sm">Active</Badge>
            </div>

            <h3 className="font-semibold text-secondary-900 mb-1 text-sm">
              {engine.shortName}
            </h3>

            <div className="space-y-1 text-xs text-secondary-600">
              <div className="flex justify-between">
                <span>Processed:</span>
                <span className="font-medium">{formatNumber(engine.processedToday)}</span>
              </div>
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span className="font-medium">{engine.accuracy}</span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default EngineStatusGrid;
