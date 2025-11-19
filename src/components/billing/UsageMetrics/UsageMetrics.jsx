import { Card, Progress, Badge, Alert } from '../../common';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const UsageMetrics = ({ usage, limits, plan }) => {
  const getUsagePercentage = (used, limit) => {
    if (limit === -1) return 0; // Unlimited
    return (used / limit) * 100;
  };

  const getProgressVariant = (percentage) => {
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  const metrics = [
    {
      label: 'Agents Created',
      current: usage.agents,
      limit: limits.maxAgents,
      icon: '🤖',
    },
    {
      label: 'Agent Runs This Month',
      current: usage.runs,
      limit: limits.maxRuns,
      icon: '▶️',
      trend: usage.runsTrend,
    },
    {
      label: 'Active Workflows',
      current: usage.workflows,
      limit: limits.maxWorkflows,
      icon: '🎼',
    },
    {
      label: 'Scheduled Jobs',
      current: usage.schedules,
      limit: limits.maxSchedules,
      icon: '📅',
    },
  ];

  const getTrendIcon = (trend) => {
    if (!trend) return null;
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Badge */}
      <Card padding="md" className="bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-secondary-600 mb-1">Current Plan</p>
            <h3 className="text-2xl font-bold text-secondary-900">{plan.name}</h3>
          </div>
          <Badge variant="primary" size="lg">
            ${plan.price}/month
          </Badge>
        </div>
      </Card>

      {/* Usage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const percentage = getUsagePercentage(metric.current, metric.limit);
          const isUnlimited = metric.limit === -1;
          const isNearLimit = percentage >= 75;

          return (
            <Card key={metric.label} padding="md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{metric.icon}</div>
                  <div>
                    <p className="text-sm text-secondary-600">{metric.label}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold text-secondary-900">
                        {metric.current.toLocaleString()}
                      </p>
                      {metric.trend && (
                        <div className="flex items-center gap-1">
                          {getTrendIcon(metric.trend)}
                          <span
                            className={`text-xs font-medium ${
                              metric.trend > 0
                                ? 'text-green-600'
                                : metric.trend < 0
                                ? 'text-red-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {metric.trend > 0 ? '+' : ''}
                            {metric.trend}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {!isUnlimited && isNearLimit && (
                  <Badge variant="warning" size="sm">
                    Near Limit
                  </Badge>
                )}
              </div>

              {isUnlimited ? (
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm">
                    Unlimited
                  </Badge>
                  <p className="text-xs text-secondary-600">No limits on this plan</p>
                </div>
              ) : (
                <>
                  <Progress
                    value={metric.current}
                    max={metric.limit}
                    variant={getProgressVariant(percentage)}
                    size="md"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-secondary-600">
                      {metric.current.toLocaleString()} of{' '}
                      {metric.limit.toLocaleString()}
                    </p>
                    <p className="text-xs font-medium text-secondary-900">
                      {Math.round(percentage)}% used
                    </p>
                  </div>
                </>
              )}
            </Card>
          );
        })}
      </div>

      {/* Upgrade Alert */}
      {metrics.some((m) => getUsagePercentage(m.current, m.limit) >= 90) && (
        <Alert variant="warning" title="Approaching Usage Limits">
          You're approaching your plan limits. Consider upgrading to avoid service
          interruption.
        </Alert>
      )}

      {/* Billing Cycle Info */}
      <Card padding="md" className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-secondary-600 mb-1">Billing Period</p>
            <p className="font-medium text-secondary-900">
              {new Date().toLocaleDateString()} -{' '}
              {new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              ).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary-600 mb-1">Next Billing Date</p>
            <p className="font-medium text-secondary-900">
              {new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              ).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary-600 mb-1">Total This Month</p>
            <p className="font-medium text-secondary-900 text-xl">
              ${plan.price}.00
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UsageMetrics;
