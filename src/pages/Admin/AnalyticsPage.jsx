import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days')
  const [selectedMetric, setSelectedMetric] = useState('submissions')

  const overviewStats = [
    {
      label: 'Total Revenue',
      value: '$87,540',
      change: '+22.5%',
      trend: 'up',
      icon: 'attach_money',
      color: 'green'
    },
    {
      label: 'New Users',
      value: '1,247',
      change: '+18.2%',
      trend: 'up',
      icon: 'person_add',
      color: 'blue'
    },
    {
      label: 'Active Sessions',
      value: '3,842',
      change: '+12.8%',
      trend: 'up',
      icon: 'trending_up',
      color: 'purple'
    },
    {
      label: 'Conversion Rate',
      value: '4.8%',
      change: '+0.9%',
      trend: 'up',
      icon: 'conversion_path',
      color: 'orange'
    },
  ]

  const topIndustries = [
    { name: 'Technology', submissions: 2845, revenue: '$28,450', growth: '+15%' },
    { name: 'Education', submissions: 1892, revenue: '$18,920', growth: '+22%' },
    { name: 'Business', submissions: 1567, revenue: '$15,670', growth: '+8%' },
    { name: 'Healthcare', submissions: 1234, revenue: '$12,340', growth: '+19%' },
    { name: 'Law', submissions: 918, revenue: '$9,180', growth: '+12%' },
  ]

  const agentPerformance = [
    { name: 'Source Code Assessment', usage: 3245, avgScore: 87, satisfaction: 4.6 },
    { name: 'Documents and Images Review', usage: 2856, avgScore: 89, satisfaction: 4.7 },
    { name: 'Video & Audio Analysis', usage: 1432, avgScore: 85, satisfaction: 4.5 },
    { name: 'Custom Evaluation Criteria', usage: 923, avgScore: 91, satisfaction: 4.8 },
  ]

  const userEngagementData = [
    { day: 'Mon', submissions: 120, users: 45 },
    { day: 'Tue', submissions: 135, users: 52 },
    { day: 'Wed', submissions: 150, users: 58 },
    { day: 'Thu', submissions: 142, users: 54 },
    { day: 'Fri', submissions: 165, users: 62 },
    { day: 'Sat', submissions: 95, users: 38 },
    { day: 'Sun', submissions: 85, users: 32 },
  ]

  const revenueBreakdown = [
    { category: 'Premium Subscriptions', amount: 45680, percentage: 52 },
    { category: 'Per-Evaluation Fees', amount: 28450, percentage: 32 },
    { category: 'Enterprise Contracts', amount: 13410, percentage: 16 },
  ]

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Analytics Dashboard</h1>
            <p className="text-gray-600">Platform performance and insights</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="glass-input px-4 py-2 rounded-xl font-semibold"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">Last Year</option>
            </select>
            <button className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center">
              <span className="material-icons mr-2">download</span>
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <div key={index} className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                  <span className={`material-icons text-2xl text-${stat.color}-600`}>{stat.icon}</span>
                </div>
                <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* User Engagement Chart */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">User Engagement Trends</h2>
            <div className="flex space-x-2">
              {['submissions', 'users', 'revenue'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedMetric === metric
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {userEngagementData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '100%' }}>
                  <div
                    className="w-full bg-gradient-to-t from-primary-500 to-primary-600 rounded-t-lg absolute bottom-0"
                    style={{ height: `${(data.submissions / 165) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2 font-semibold">{data.day}</div>
                <div className="text-xs text-gray-500">{data.submissions}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Industries */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Industries</h2>
            <div className="space-y-4">
              {topIndustries.map((industry, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{industry.name}</span>
                      <span className="text-sm font-bold text-gray-900">{industry.revenue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{industry.submissions} submissions</span>
                      <span className="text-green-600 font-semibold">{industry.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Breakdown</h2>
            <div className="space-y-6">
              {revenueBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    <span className="text-sm font-bold text-gray-900">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.percentage}% of total revenue</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Total Revenue</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${revenueBreakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Agent Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Agent</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Usage Count</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Avg. Score</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Satisfaction</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Performance</th>
                </tr>
              </thead>
              <tbody>
                {agentPerformance.map((agent, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{agent.name}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{agent.usage.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="text-primary-600 font-bold">{agent.avgScore}</div>
                        <div className="text-gray-500 text-sm ml-1">/100</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
                        <span className="font-semibold text-gray-900">{agent.satisfaction}</span>
                        <span className="text-gray-500 text-sm ml-1">/5</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                          style={{ width: `${agent.avgScore}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="material-icons text-primary-600 mr-2">insights</span>
            Key Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-green-50 to-white">
              <span className="material-icons text-green-600 text-3xl mb-3">trending_up</span>
              <h3 className="font-bold text-gray-900 mb-2">Growing Revenue</h3>
              <p className="text-sm text-gray-700">Monthly revenue increased by 22.5% compared to last month, driven by premium subscriptions.</p>
            </div>
            <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-blue-50 to-white">
              <span className="material-icons text-blue-600 text-3xl mb-3">people</span>
              <h3 className="font-bold text-gray-900 mb-2">User Growth</h3>
              <p className="text-sm text-gray-700">New user registrations up 18.2%. Education and Technology sectors show highest growth.</p>
            </div>
            <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-purple-50 to-white">
              <span className="material-icons text-purple-600 text-3xl mb-3">psychology</span>
              <h3 className="font-bold text-gray-900 mb-2">AI Performance</h3>
              <p className="text-sm text-gray-700">Custom Evaluation agent shows highest satisfaction rating at 4.8/5 with 91 avg. score.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AnalyticsPage
