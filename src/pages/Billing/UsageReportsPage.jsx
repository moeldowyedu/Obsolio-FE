import { Calendar, Download } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const UsageReportsPage = () => {
  const currentUsage = {
    agents: { used: 18, limit: 25 },
    executions: { used: 7543, limit: 10000 },
    storage: { used: 6.2, limit: 10 }
  };

  const monthlyUsage = [
    { month: 'January 2024', agents: 18, executions: 8234, storage: 5.8 },
    { month: 'December 2023', agents: 15, executions: 6892, storage: 5.2 },
    { month: 'November 2023', agents: 12, executions: 5643, storage: 4.5 }
  ];

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Usage Reports</h1>
          <p className="text-secondary-600">
            Monitor your resource usage and consumption
          </p>
        </div>

        {/* Current Usage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <h3 className="text-sm font-medium text-secondary-600 mb-2">AI Agents</h3>
              <p className="text-3xl font-bold text-secondary-900 mb-2">
                {currentUsage.agents.used} / {currentUsage.agents.limit}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(currentUsage.agents.used / currentUsage.agents.limit) * 100}%` }}
                ></div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-sm font-medium text-secondary-600 mb-2">Executions</h3>
              <p className="text-3xl font-bold text-secondary-900 mb-2">
                {currentUsage.executions.used.toLocaleString()} / {currentUsage.executions.limit.toLocaleString()}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(currentUsage.executions.used / currentUsage.executions.limit) * 100}%` }}
                ></div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-sm font-medium text-secondary-600 mb-2">Storage</h3>
              <p className="text-3xl font-bold text-secondary-900 mb-2">
                {currentUsage.storage.used} GB / {currentUsage.storage.limit} GB
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(currentUsage.storage.used / currentUsage.storage.limit) * 100}%` }}
                ></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Historical Usage */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Historical Usage</h2>
              <div className="flex gap-3">
                <Button variant="outline" icon={<Calendar className="w-4 h-4" />}>
                  Date Range
                </Button>
                <Button variant="outline" icon={<Download className="w-4 h-4" />}>
                  Export
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Month</th>
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">AI Agents</th>
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Executions</th>
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Storage (GB)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyUsage.map((usage, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-secondary-900">{usage.month}</td>
                      <td className="py-3 px-4 text-secondary-700">{usage.agents}</td>
                      <td className="py-3 px-4 text-secondary-700">{usage.executions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-secondary-700">{usage.storage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UsageReportsPage;
