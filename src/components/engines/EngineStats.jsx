import Card from '../common/Card/Card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EngineStats = ({ stats }) => {
  const { processedData, accuracyData, performanceMetrics } = stats;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Processing Volume */}
      <Card>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Processing Volume</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Accuracy Trend */}
      <Card>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Accuracy Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Metrics */}
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {performanceMetrics?.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-secondary-900">{metric.value}</p>
              <p className="text-sm text-secondary-600 mt-1">{metric.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EngineStats;
