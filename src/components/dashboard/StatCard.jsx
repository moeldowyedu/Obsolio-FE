import { Card } from '../common';
import { clsx } from 'clsx';

const StatCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
  };

  return (
    <Card padding="md" hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 mb-1">{title}</p>
          <p className="text-3xl font-heading font-bold text-secondary-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={clsx(
                  'text-sm font-medium',
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={clsx(
              'p-3 rounded-lg text-white',
              colorClasses[color]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
