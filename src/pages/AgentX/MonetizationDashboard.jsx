import { useState } from 'react';
import { DollarSign, TrendingUp, Download, Eye, Star, Calendar, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const MonetizationDashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedAgent, setSelectedAgent] = useState('all');

  // Mock data for published agents
  const publishedAgents = [
    {
      id: '1',
      name: 'Customer Support Pro',
      icon: '💬',
      totalEarnings: 12450,
      monthlyEarnings: 2890,
      deployments: 47,
      rating: 4.8,
      reviews: 23,
      revenue: [
        { month: 'Jan', amount: 1200 },
        { month: 'Feb', amount: 1850 },
        { month: 'Mar', amount: 2340 },
        { month: 'Apr', amount: 2890 },
      ],
      recentSales: [
        { date: '2025-01-15', customer: 'TechCorp Inc', amount: 99, plan: 'Monthly' },
        { date: '2025-01-14', customer: 'StartupXYZ', amount: 99, plan: 'Monthly' },
        { date: '2025-01-12', customer: 'Enterprise Co', amount: 990, plan: 'Yearly' },
      ]
    },
    {
      id: '2',
      name: 'Data Analytics AI',
      icon: '📊',
      totalEarnings: 8760,
      monthlyEarnings: 1920,
      deployments: 32,
      rating: 4.7,
      reviews: 18,
      revenue: [
        { month: 'Jan', amount: 980 },
        { month: 'Feb', amount: 1240 },
        { month: 'Mar', amount: 1580 },
        { month: 'Apr', amount: 1920 },
      ],
      recentSales: [
        { date: '2025-01-16', customer: 'DataCo', amount: 149, plan: 'Monthly' },
        { date: '2025-01-13', customer: 'AnalyticsPro', amount: 149, plan: 'Monthly' },
      ]
    }
  ];

  const totalEarnings = publishedAgents.reduce((sum, agent) => sum + agent.totalEarnings, 0);
  const monthlyEarnings = publishedAgents.reduce((sum, agent) => sum + agent.monthlyEarnings, 0);
  const totalDeployments = publishedAgents.reduce((sum, agent) => sum + agent.deployments, 0);
  const avgRating = (publishedAgents.reduce((sum, agent) => sum + agent.rating, 0) / publishedAgents.length).toFixed(1);

  // Calculate growth
  const lastMonthEarnings = 3890;
  const earningsGrowth = ((monthlyEarnings - lastMonthEarnings) / lastMonthEarnings * 100).toFixed(1);

  const renderAgentRevenue = (agent) => {
    return (
      <div key={agent.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
            {agent.icon}
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-secondary-900 mb-1">{agent.name}</h3>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-secondary-900">{agent.rating}</span>
                <span className="text-secondary-600">({agent.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-secondary-600">
                <Download className="w-4 h-4" />
                <span>{agent.deployments} deployments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="text-sm text-secondary-600 mb-1">Total Earnings</div>
            <div className="text-2xl font-bold text-secondary-900">${agent.totalEarnings.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-secondary-600 mb-1">This Month</div>
            <div className="text-2xl font-bold text-primary-600">${agent.monthlyEarnings.toLocaleString()}</div>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-secondary-700 mb-2">Recent Sales</div>
          <div className="space-y-2">
            {agent.recentSales.map((sale, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-medium text-secondary-900">{sale.customer}</div>
                  <div className="text-xs text-secondary-600">{sale.date} • {sale.plan}</div>
                </div>
                <div className="font-bold text-green-600">${sale.amount}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full py-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors">
            View Detailed Analytics →
          </button>
        </div>
      </div>
    );
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2 tracking-tight">Agent Monetization</h1>
            <p className="text-secondary-600 font-medium">
              Track your earnings and performance from published agents
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${earningsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {earningsGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(earningsGrowth)}%
              </div>
            </div>
            <div className="text-sm text-secondary-600 mb-1 font-medium">Total Earnings</div>
            <div className="text-3xl font-bold text-secondary-900 tracking-tight">${totalEarnings.toLocaleString()}</div>
            <div className="text-xs text-secondary-600 mt-2">You earn 70% revenue share</div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="text-sm text-secondary-600 mb-1 font-medium">This Month</div>
            <div className="text-3xl font-bold text-secondary-900 tracking-tight">${monthlyEarnings.toLocaleString()}</div>
            <div className="text-xs text-secondary-600 mt-2">Expected payout on Feb 1st</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-secondary-600 mb-1 font-medium">Total Deployments</div>
            <div className="text-3xl font-bold text-secondary-900 tracking-tight">{totalDeployments}</div>
            <div className="text-xs text-secondary-600 mt-2">Across all published agents</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-secondary-600 mb-1 font-medium">Average Rating</div>
            <div className="text-3xl font-bold text-secondary-900 tracking-tight">{avgRating}</div>
            <div className="text-xs text-secondary-600 mt-2">Based on customer reviews</div>
          </div>
        </div>

        {/* Payout Information */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">Next Payout</h3>
              <p className="text-primary-100 mb-4">
                Your earnings will be automatically paid out on the 1st of every month to your connected bank account
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sm text-primary-100">Pending Amount</div>
                  <div className="text-2xl font-bold">${monthlyEarnings.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-primary-100">Payout Date</div>
                  <div className="text-2xl font-bold">Feb 1, 2025</div>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-colors">
              Payout Settings
            </button>
          </div>
        </div>

        {/* Agent Filter */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-secondary-600" />
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Agents ({publishedAgents.length})</option>
            {publishedAgents.map(agent => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </select>
        </div>

        {/* Individual Agent Revenue */}
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-4 tracking-tight">Agent Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishedAgents
              .filter(agent => selectedAgent === 'all' || agent.id === selectedAgent)
              .map(agent => renderAgentRevenue(agent))}
          </div>
        </div>

        {/* Empty State for users with no published agents */}
        {publishedAgents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">No Published Agents Yet</h3>
            <p className="text-secondary-600 mb-6">
              Start monetizing by publishing your first AI agent on AgentX Hub
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-lg transition-shadow">
              Publish Your First Agent
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MonetizationDashboard;
