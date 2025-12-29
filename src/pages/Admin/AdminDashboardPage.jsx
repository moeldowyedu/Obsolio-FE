import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card } from '../../components/common'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'
import { useTheme } from '../../contexts/ThemeContext'
import dashboardService from '../../services/dashboardService'
import toast from 'react-hot-toast'
import {
  Users, UploadCloud, CheckCircle, Cloud,
  DollarSign, TrendingUp, TrendingDown,
  UserPlus, Rocket, Star, Bug,
  Activity, Database, Server, HardDrive
} from 'lucide-react'

const AdminDashboardPage = () => {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const t = translations[language]
  const [selectedPeriod, setSelectedPeriod] = useState('7days')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardStats()

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardStats = async () => {
    try {
      setLoading(true)
      const response = await dashboardService.getStats()
      setStats(response.data || response)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
      if (!stats) {
        toast.error('Failed to load dashboard statistics')
      }
    } finally {
      setLoading(false)
    }
  }

  const h1Class = `text-4xl font-bold mb-2 font-heading ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`;
  const pClass = theme === 'dark' ? 'text-gray-400' : 'text-slate-600';

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';

  // Constants
  const COLORS = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-500/20', lightText: 'text-blue-400', paleBg: 'bg-blue-100', paleText: 'text-blue-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', lightBg: 'bg-purple-500/20', lightText: 'text-purple-400', paleBg: 'bg-purple-100', paleText: 'text-purple-600' },
    green: { bg: 'bg-green-500', text: 'text-green-500', lightBg: 'bg-green-500/20', lightText: 'text-green-400', paleBg: 'bg-green-100', paleText: 'text-green-600' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', lightBg: 'bg-indigo-500/20', lightText: 'text-indigo-400', paleBg: 'bg-indigo-100', paleText: 'text-indigo-600' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', lightBg: 'bg-yellow-500/20', lightText: 'text-yellow-400', paleBg: 'bg-yellow-100', paleText: 'text-yellow-600' },
    red: { bg: 'bg-red-500', text: 'text-red-500', lightBg: 'bg-red-500/20', lightText: 'text-red-400', paleBg: 'bg-red-100', paleText: 'text-red-600' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', lightBg: 'bg-orange-500/20', lightText: 'text-orange-400', paleBg: 'bg-orange-100', paleText: 'text-orange-600' },
  }

  // Helper to get color classes based on theme
  const getColor = (colorName) => {
    const pal = COLORS[colorName] || COLORS.blue
    return theme === 'dark'
      ? { bg: pal.lightBg, text: pal.lightText, raw: pal.bg }
      : { bg: pal.paleBg, text: pal.paleText, raw: pal.bg }
  }

  const revenueStats = stats ? [
    { label: 'Monthly Revenue', value: `$${(stats.monthly_revenue || 0).toLocaleString()}`, change: `+${stats.revenue_growth || 15.3}%`, trend: 'up' },
    { label: 'Avg. Revenue Per User', value: `$${(stats.arpu || 0).toFixed(2)}`, change: `+${stats.arpu_growth || 3.8}%`, trend: 'up' },
    { label: 'Active Subscriptions', value: (stats.active_subscriptions || 0).toLocaleString(), change: `+${stats.new_subscriptions || 0}`, trend: 'up' },
    { label: 'Churn Rate', value: `${(stats.churn_rate || 0).toFixed(1)}%`, change: '-0.5%', trend: 'up' }
  ] : [
    { label: 'Monthly Revenue', value: '$24,580', change: '+15.3%', trend: 'up' },
    { label: 'Avg. Revenue Per User', value: '$19.70', change: '+3.8%', trend: 'up' },
    { label: 'Active Subscriptions', value: '847', change: '+67', trend: 'up' },
    { label: 'Churn Rate', value: '2.4%', change: '-0.5%', trend: 'up' } // up meaning good (down)
  ];

  const recentActivity = stats?.recent_activity || [
    { id: 1, user: 'Sarah Johnson', action: 'registered a new account', time: '2 mins ago', icon: UserPlus, color: 'green' },
    { id: 2, user: 'Mike Chen', action: 'deployed a new agent', time: '15 mins ago', icon: Rocket, color: 'blue' },
    { id: 3, user: 'Emma Davis', action: 'upgraded to Premium', time: '1 hour ago', icon: Star, color: 'yellow' },
    { id: 4, user: 'Alex Wilson', action: 'reported an issue', time: '2 hours ago', icon: Bug, color: 'red' },
  ];

  const industryBreakdown = stats?.industry_breakdown || [
    { name: 'Technology', count: 2845, percentage: 45, color: 'blue' },
    { name: 'Healthcare', count: 1850, percentage: 30, color: 'green' },
    { name: 'Finance', count: 950, percentage: 15, color: 'purple' },
    { name: 'Education', count: 450, percentage: 10, color: 'orange' },
  ];

  const topUsers = stats?.top_users || [
    { id: 1, name: 'John Doe', email: 'john@example.com', submissions: 145, score: 98, status: 'Premium' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', submissions: 120, score: 95, status: 'Basic' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', submissions: 98, score: 92, status: 'Premium' },
  ];

  const systemHealth = stats?.system_health || [
    { name: 'API Gateway', status: 'healthy', uptime: '99.99%', responseTime: '45ms', color: 'green' },
    { name: 'Database Cluster', status: 'healthy', uptime: '99.95%', responseTime: '12ms', color: 'green' },
    { name: 'AI Engine Nodes', status: 'healthy', uptime: '99.90%', responseTime: '250ms', color: 'green' },
    { name: 'Storage Service', status: 'warning', uptime: '99.50%', responseTime: '150ms', color: 'yellow' },
  ];

  // Force AdminLayout for Console Dashboard
  const Layout = AdminLayout;

  // Use real stats or fallback to mock data
  const systemStats = stats ? [
    { label: 'Total Users', value: (stats.total_users || 0).toLocaleString(), change: `+${stats.new_users_this_month || 0}`, trend: 'up', icon: Users, color: 'blue', percentage: `+${((stats.new_users_this_month || 0) / (stats.total_users || 1) * 100).toFixed(1)}%` },
    { label: 'Total Submissions', value: (stats.total_submissions || 0).toLocaleString(), change: `+${stats.new_submissions_this_month || 0}`, trend: 'up', icon: UploadCloud, color: 'purple', percentage: `+${((stats.new_submissions_this_month || 0) / (stats.total_submissions || 1) * 100).toFixed(1)}%` },
    { label: 'Completed Evaluations', value: (stats.completed_evaluations || 0).toLocaleString(), change: `+${stats.completed_this_month || 0}`, trend: 'up', icon: CheckCircle, color: 'green', percentage: `+${((stats.completed_this_month || 0) / (stats.completed_evaluations || 1) * 100).toFixed(1)}%` },
    { label: 'System Uptime', value: `${(stats.system_uptime || 99.98).toFixed(2)}%`, change: '+0.02%', trend: 'up', icon: Cloud, color: 'indigo', percentage: 'Last 30 days' },
  ] : [
    { label: 'Total Users', value: '0', change: '+0', trend: 'up', icon: Users, color: 'blue', percentage: '+0%' },
    { label: 'Total Submissions', value: '0', change: '+0', trend: 'up', icon: UploadCloud, color: 'purple', percentage: '+0%' },
    { label: 'Completed Evaluations', value: '0', change: '+0', trend: 'up', icon: CheckCircle, color: 'green', percentage: '+0%' },
    { label: 'System Uptime', value: '99.98%', change: '+0.02%', trend: 'up', icon: Cloud, color: 'indigo', percentage: 'Last 30 days' },
  ];

  if (loading && !stats) {
    return (
      <Layout>
        <div className="py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className={h1Class}>{t.adminDashboardTitle}</h1>
            <p className={pClass}>{t.adminDashboardDesc}</p>
          </div>
          <button
            onClick={loadDashboardStats}
            disabled={loading}
            className={`mt-4 md:mt-0 px-4 py-2 rounded-lg font-semibold transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <div className="mt-4 md:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={`px-4 py-2 rounded-xl font-semibold border ${theme === 'dark'
                ? 'glass-input text-gray-300 border-white/20 bg-white/5'
                : 'bg-white text-slate-700 border-slate-300 focus:ring-2 focus:ring-primary-500'
                }`}
            >
              <option className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'} value="24hours">{t.last24HoursOption}</option>
              <option className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'} value="7days">{t.last7DaysOption2}</option>
              <option className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'} value="30days">{t.last30DaysOption2}</option>
              <option className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'} value="90days">{t.last90DaysOption2}</option>
            </select>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const colors = getColor(stat.color)
            return (
              <Card key={index} hover className="transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg}`}>
                    <stat.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div className={`flex items-center text-sm font-semibold ${stat.trend === 'up'
                    ? 'text-green-500'
                    : 'text-red-500'
                    }`}>
                    <span className="mr-1">
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    </span>
                    {stat.percentage}
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</h3>
                <p className={`text-sm font-medium mb-1 ${textSecondary}`}>{stat.label}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{stat.change} from last period</p>
              </Card>
            )
          })}
        </div>

        {/* Revenue Stats */}
        <Card className="mb-8" padding="lg">
          <h2 className={`text-2xl font-bold mb-6 flex items-center ${textPrimary}`}>
            <DollarSign className="w-6 h-6 text-green-500 mr-2" />
            {t.revenueOverviewTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {revenueStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</div>
                <div className={`text-sm font-medium mb-2 ${textSecondary}`}>{stat.label}</div>
                <div className={`text-sm font-semibold ${stat.trend === 'up'
                  ? 'text-green-500'
                  : 'text-red-500'
                  }`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.recentActivityTitle}</h2>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const colors = getColor(activity.color)
                  return (
                    <div key={activity.id} className={`flex items-start space-x-4 pb-4 border-b last:border-0 ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'
                      }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                        <activity.icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${textPrimary}`}>
                          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activity.user}</span> {activity.action}
                        </p>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Industry Breakdown */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <h2 className={`text-2xl font-bold mb-6 ${textPrimary}`}>{t.industryBreakdownTitle}</h2>
              <div className="space-y-6">
                {industryBreakdown.map((industry, index) => {
                  const colors = getColor(industry.color)
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${textPrimary}`}>{industry.name}</span>
                        <span className={`text-sm font-bold ${textPrimary}`}>{industry.count}</span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`}>
                        <div
                          className={`h-2 rounded-full ${colors.raw}`}
                          style={{ width: `${industry.percentage}%` }}
                        />
                      </div>
                      <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{industry.percentage}%</div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Top Users */}
        <Card className="mb-8" padding="none">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.topUsersTitle}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-slate-50 text-slate-500'}`}>
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderUser}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderEmail}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderSubmissions}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderAvgScore}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderStatus}</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderActions}</th>
                </tr>
              </thead>
              <tbody className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>
                {topUsers.map((user) => (
                  <tr key={user.id} className={`border-b border-gray-100 dark:border-gray-800 transition-colors ${theme === 'dark'
                    ? 'hover:bg-white/5'
                    : 'hover:bg-slate-50'
                    }`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-primary-500/20' : 'bg-primary-100'
                          }`}>
                          <span className={`font-semibold ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'
                            }`}>{user.name[0]}</span>
                        </div>
                        <span className={`font-semibold ${textPrimary}`}>{user.name}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${textSecondary}`}>{user.email}</td>
                    <td className={`py-4 px-4 font-semibold ${textPrimary}`}>{user.submissions}</td>
                    <td className="py-4 px-4">
                      <span className={`font-bold ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>{user.score}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'Premium'
                        ? (theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700')
                        : (theme === 'dark' ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-600')
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className={`font-semibold text-sm ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
                        }`}>
                        {t.viewDetailsButton}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </Layout>
  )
}

export default AdminDashboardPage
