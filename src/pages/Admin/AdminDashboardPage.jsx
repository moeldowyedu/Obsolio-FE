import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import AdminLayout from '../../components/layout/AdminLayout'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'

const AdminDashboardPage = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [selectedPeriod, setSelectedPeriod] = useState('7days')

  const location = useLocation();
  const isGodfather = location.pathname.startsWith('/godfather');
  const isSystemAdminPath = isGodfather || location.pathname.includes('/system-admin');
  const Layout = isSystemAdminPath ? AdminLayout : MainLayout;

  const systemStats = [
    {
      label: 'Total Users',
      value: '1,247',
      change: '+125',
      trend: 'up',
      percentage: '+11.2%',
      icon: 'people',
      color: 'blue'
    },
    {
      label: 'Total Submissions',
      value: '8,456',
      change: '+892',
      trend: 'up',
      percentage: '+11.8%',
      icon: 'upload_file',
      color: 'purple'
    },
    {
      label: 'Completed Evaluations',
      value: '7,234',
      change: '+756',
      trend: 'up',
      percentage: '+11.7%',
      icon: 'check_circle',
      color: 'green'
    },
    {
      label: 'System Uptime',
      value: '99.98%',
      change: '+0.02%',
      trend: 'up',
      percentage: 'Last 30 days',
      icon: 'cloud_done',
      color: 'indigo'
    },
  ]

  const revenueStats = [
    { label: 'Monthly Revenue', value: '$24,580', change: '+15.3%', trend: 'up' },
    { label: 'Avg. Revenue Per User', value: '$19.70', change: '+3.8%', trend: 'up' },
    { label: 'Active Subscriptions', value: '847', change: '+67', trend: 'up' },
    { label: 'Churn Rate', value: '2.4%', change: '-0.5%', trend: 'down' },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'new_user',
      user: 'Sarah Johnson',
      action: 'registered a new account',
      time: '5 minutes ago',
      icon: 'person_add',
      color: 'green'
    },
    {
      id: 2,
      type: 'evaluation_complete',
      user: 'John Doe',
      action: 'completed evaluation #8456',
      time: '12 minutes ago',
      icon: 'check_circle',
      color: 'blue'
    },
    {
      id: 3,
      type: 'subscription',
      user: 'Mike Chen',
      action: 'upgraded to Premium plan',
      time: '1 hour ago',
      icon: 'star',
      color: 'yellow'
    },
    {
      id: 4,
      type: 'error',
      user: 'System',
      action: 'API rate limit exceeded',
      time: '2 hours ago',
      icon: 'warning',
      color: 'red'
    },
    {
      id: 5,
      type: 'submission',
      user: 'Emily Davis',
      action: 'submitted new evaluation request',
      time: '3 hours ago',
      icon: 'upload',
      color: 'purple'
    },
  ]

  const topUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', submissions: 45, score: 87, status: 'Premium' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', submissions: 38, score: 91, status: 'Premium' },
    { id: 3, name: 'Mike Chen', email: 'mike@example.com', submissions: 32, score: 85, status: 'Free' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', submissions: 28, score: 89, status: 'Premium' },
    { id: 5, name: 'Tom Wilson', email: 'tom@example.com', submissions: 24, score: 83, status: 'Free' },
  ]

  const systemHealth = [
    { name: 'API Server', status: 'healthy', uptime: '99.99%', responseTime: '45ms', color: 'green' },
    { name: 'Database', status: 'healthy', uptime: '99.98%', responseTime: '12ms', color: 'green' },
    { name: 'File Storage', status: 'healthy', uptime: '99.95%', responseTime: '230ms', color: 'green' },
    { name: 'AI Processing', status: 'warning', uptime: '98.50%', responseTime: '2.1s', color: 'yellow' },
  ]

  const industryBreakdown = [
    { name: 'Technology', count: 2845, percentage: 34, color: 'blue' },
    { name: 'Education', count: 1892, percentage: 22, color: 'green' },
    { name: 'Business', count: 1567, percentage: 19, color: 'purple' },
    { name: 'Healthcare', count: 1234, percentage: 15, color: 'red' },
    { name: 'Law', count: 918, percentage: 10, color: 'indigo' },
  ]

  // Styles
  const cardClass = isGodfather
    ? 'bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all'
    : 'glass-card rounded-2xl p-6 hover:shadow-xl transition-all';

  const textPrimary = isGodfather ? 'text-gray-900' : 'text-secondary-900';
  const textSecondary = isGodfather ? 'text-gray-500' : 'text-secondary-600';
  const tableHeaderBg = isGodfather ? 'bg-gray-50 text-gray-500' : 'bg-gray-50/80 text-secondary-700'; // Note: Original was bg-gray-50/80 too, likely need to check if that looks OK in dark mode or if it was dark themed. Original assumes light mode dashboard? 
  // Wait, if existing dashboard is light, then I don't need to change much?
  // User said "make the /godfather all pages inside in light mode". 
  // If the previous dashboard was dark mode (implied by "glass-card" usually on dark bg), then I need to ensure light mode.
  // Actually, MainLayout and AdminLayout were dark gradients.
  // glass-card usually implies translucency over that gradient.
  // So replacing glass-card with solid white is correct for light mode.

  return (
    <Layout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 font-heading ${textPrimary}`}>{t.adminDashboardTitle}</h1>
            <p className={textSecondary}>{t.adminDashboardDesc}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={`px-4 py-2 rounded-xl font-semibold border ${isGodfather
                  ? 'bg-white border-gray-200 text-gray-900'
                  : 'glass-input'
                }`}
            >
              <option value="24hours">{t.last24HoursOption}</option>
              <option value="7days">{t.last7DaysOption2}</option>
              <option value="30days">{t.last30DaysOption2}</option>
              <option value="90days">{t.last90DaysOption2}</option>
            </select>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
            <div key={index} className={cardClass}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                  <span className={`material-icons text-2xl text-${stat.color}-600`}>{stat.icon}</span>
                </div>
                <div className={`flex items-center text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  <span className="material-icons text-sm mr-1">
                    {stat.trend === 'up' ? 'trending_up' : 'trending_down'}
                  </span>
                  {stat.percentage}
                </div>
              </div>
              <h3 className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</h3>
              <p className={`text-sm font-medium mb-1 ${textSecondary}`}>{stat.label}</p>
              <p className="text-gray-500 text-xs">{stat.change} from last period</p>
            </div>
          ))}
        </div>

        {/* Revenue Stats */}
        <div className={`${cardClass} mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center ${textPrimary}`}>
            <span className="material-icons text-green-600 mr-2">attach_money</span>
            {t.revenueOverviewTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {revenueStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</div>
                <div className={`text-sm font-medium mb-2 ${textSecondary}`}>{stat.label}</div>
                <div className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className={cardClass}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.recentActivityTitle}</h2>
                <Link to="/admin/users" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                  {t.viewAllLink}
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className={`w-10 h-10 rounded-lg bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <span className={`material-icons text-${activity.color}-600 text-sm`}>
                        {activity.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${textPrimary}`}>
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry Breakdown */}
          <div className="lg:col-span-1">
            <div className={cardClass}>
              <h2 className={`text-2xl font-bold mb-6 ${textPrimary}`}>{t.industryBreakdownTitle}</h2>
              <div className="space-y-4">
                {industryBreakdown.map((industry, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${textPrimary}`}>{industry.name}</span>
                      <span className={`text-sm font-bold ${textPrimary}`}>{industry.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${industry.color}-500 h-2 rounded-full`}
                        style={{ width: `${industry.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{industry.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Users */}
        <div className={`${cardClass} mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.topUsersTitle}</h2>
            <Link to="/admin/users" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
              {t.manageUsersLink}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={tableHeaderBg}>
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderUser}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderEmail}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderSubmissions}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderAvgScore}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderStatus}</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderActions}</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <span className="text-primary-600 font-semibold">{user.name[0]}</span>
                        </div>
                        <span className={`font-semibold ${textPrimary}`}>{user.name}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${textSecondary}`}>{user.email}</td>
                    <td className={`py-4 px-4 font-semibold ${textPrimary}`}>{user.submissions}</td>
                    <td className="py-4 px-4">
                      <span className="text-primary-600 font-bold">{user.score}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'Premium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                        {t.viewDetailsButton}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className={cardClass}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center ${textPrimary}`}>
            <span className="material-icons text-blue-600 mr-2">monitor_heart</span>
            {t.systemHealthTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemHealth.map((service, index) => (
              <div key={index} className={`rounded-xl p-4 ${isGodfather ? 'bg-gray-50' : 'glass-card'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-semibold ${textPrimary}`}>{service.name}</h3>
                  <span className={`w-3 h-3 rounded-full bg-${service.color}-500`}></span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={textSecondary}>{t.statusLabel}</span>
                    <span className={`font-semibold capitalize ${service.status === 'healthy' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textSecondary}>{t.uptimeLabel}</span>
                    <span className={`font-semibold ${textPrimary}`}>{service.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textSecondary}>{t.responseLabel}</span>
                    <span className={`font-semibold ${textPrimary}`}>{service.responseTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Link
            to="/admin/users"
            className={`${isGodfather ? 'bg-white border border-gray-200 hover:shadow-md' : 'glass-card-hover'} rounded-2xl p-6 group transition-all`}
          >
            <span className="material-icons text-4xl text-primary-600 mb-3">people</span>
            <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>{t.manageUsersCard}</h3>
            <p className={`${textSecondary} text-sm`}>{t.manageUsersCardDesc}</p>
          </Link>
          <Link
            to="/admin/analytics"
            className={`${isGodfather ? 'bg-white border border-gray-200 hover:shadow-md' : 'glass-card-hover'} rounded-2xl p-6 group transition-all`}
          >
            <span className="material-icons text-4xl text-green-600 mb-3">analytics</span>
            <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>{t.viewAnalyticsCard}</h3>
            <p className={`${textSecondary} text-sm`}>{t.viewAnalyticsCardDesc}</p>
          </Link>
          <Link
            to="/admin/webhooks"
            className={`${isGodfather ? 'bg-white border border-gray-200 hover:shadow-md' : 'glass-card-hover'} rounded-2xl p-6 group transition-all`}
          >
            <span className="material-icons text-4xl text-orange-600 mb-3">webhook</span>
            <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>{t.webhooksTab}</h3>
            <p className={`${textSecondary} text-sm`}>{t.webhooksCardDesc}</p>
          </Link>
          <Link
            to="/settings/rubrics"
            className={`${isGodfather ? 'bg-white border border-gray-200 hover:shadow-md' : 'glass-card-hover'} rounded-2xl p-6 group transition-all`}
          >
            <span className="material-icons text-4xl text-purple-600 mb-3">tune</span>
            <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>{t.criteria}</h3>
            <p className={`${textSecondary} text-sm`}>{t.manageCriteriaCardDesc}</p>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboardPage
