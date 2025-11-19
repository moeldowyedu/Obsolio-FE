import Card from '../Card/Card';

const MetricsRow = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-secondary-900">{metric.value}</p>
              {metric.change && (
                <p className={`text-sm mt-1 ${
                  metric.change > 0 ? 'text-secondary-500' : 'text-red-500'
                }`}>
                  {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                </p>
              )}
            </div>
            {metric.icon && (
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <span className="text-2xl text-primary-600">{metric.icon}</span>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsRow;
