import { Card, Badge } from '../common';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Clock, CheckCircle, XCircle } from 'lucide-react';

const AgentAnalytics = ({ analytics }) => {
  // Mock data if not provided
  const executionTrend = analytics?.executionTrend || [
    { date: 'Jan 10', runs: 12, success: 10, failed: 2 },
    { date: 'Jan 11', runs: 18, success: 16, failed: 2 },
    { date: 'Jan 12', runs: 15, success: 14, failed: 1 },
    { date: 'Jan 13', runs: 22, success: 20, failed: 2 },
    { date: 'Jan 14', runs: 25, success: 23, failed: 2 },
    { date: 'Jan 15', runs: 30, success: 28, failed: 2 },
    { date: 'Jan 16', runs: 28, success: 27, failed: 1 },
  ];

  const durationData = analytics?.durationData || [
    { time: '00:00', avg: 2.3 },
    { time: '04:00', avg: 1.8 },
    { time: '08:00', avg: 3.2 },
    { time: '12:00', avg: 4.1 },
    { time: '16:00', avg: 3.5 },
    { time: '20:00', avg: 2.9 },
  ];

  const statusDistribution = analytics?.statusDistribution || [
    { name: 'Success', value: 245, color: '#22c55e' },
    { name: 'Failed', value: 15, color: '#ef4444' },
    { name: 'Timeout', value: 8, color: '#f59e0b' },
  ];

  const metrics = analytics?.metrics || {
    totalExecutions: 268,
    successRate: 91.4,
    avgDuration: 3.2,
    trend: {
      executions: 12.5,
      successRate: 2.3,
      duration: -5.2,
    },
  };

  const getTrendIcon = (value) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getTrendColor = (value) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card padding="md">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            {metrics.trend.executions !== undefined && (
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.trend.executions)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.trend.executions)}`}>
                  {metrics.trend.executions > 0 ? '+' : ''}
                  {metrics.trend.executions}%
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-secondary-600 mb-1">Total Executions</p>
          <p className="text-3xl font-bold text-secondary-900">
            {metrics.totalExecutions.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </Card>

        <Card padding="md">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            {metrics.trend.successRate !== undefined && (
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.trend.successRate)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.trend.successRate)}`}>
                  {metrics.trend.successRate > 0 ? '+' : ''}
                  {metrics.trend.successRate}%
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-secondary-600 mb-1">Success Rate</p>
          <p className="text-3xl font-bold text-green-600">{metrics.successRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </Card>

        <Card padding="md">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            {metrics.trend.duration !== undefined && (
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.trend.duration)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.trend.duration)}`}>
                  {metrics.trend.duration > 0 ? '+' : ''}
                  {metrics.trend.duration}%
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-secondary-600 mb-1">Avg Duration</p>
          <p className="text-3xl font-bold text-secondary-900">{metrics.avgDuration}s</p>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </Card>
      </div>

      {/* Execution Trend */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Execution Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={executionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="runs"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Total Runs"
              dot={{ fill: '#3b82f6', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="success"
              stroke="#22c55e"
              strokeWidth={2}
              name="Successful"
              dot={{ fill: '#22c55e', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={2}
              name="Failed"
              dot={{ fill: '#ef4444', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Average Duration by Time */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Avg Duration by Time of Day
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={durationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="avg" fill="#8b5cf6" name="Avg Duration (s)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Status Distribution */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-secondary-700">{item.name}</span>
                </div>
                <span className="font-medium text-secondary-900">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgentAnalytics;
