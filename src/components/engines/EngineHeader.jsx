import Badge from '../common/Badge/Badge';
import Button from '../common/Button/Button';
import { STATUS_VARIANTS } from '../../utils/constants';

const EngineHeader = ({ name, icon, status, description }) => {
  const statusVariant = STATUS_VARIANTS[status] || 'default';

  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-4xl">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold font-heading text-secondary-900">
                {name}
              </h1>
              <Badge variant={statusVariant} size="md">
                {status}
              </Badge>
            </div>
            {description && (
              <p className="text-secondary-600 max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            View Documentation
          </Button>
          <Button>
            Run Test
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-primary-100">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-secondary-600 mb-1">Processed Today</p>
          <p className="text-2xl font-bold text-secondary-900">{Math.floor(Math.random() * 50000) + 5000}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-secondary-600 mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-secondary-900">{(96 + Math.random() * 3).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-secondary-600 mb-1">Avg Processing Time</p>
          <p className="text-2xl font-bold text-secondary-900">{(Math.random() * 3 + 1).toFixed(1)}s</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-secondary-600 mb-1">Active Rubrics</p>
          <p className="text-2xl font-bold text-secondary-900">{Math.floor(Math.random() * 10) + 3}</p>
        </div>
      </div>
    </div>
  );
};

export default EngineHeader;
