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

  // Styles
  const cardClass = 'glass-card rounded-2xl p-6 hover:shadow-xl transition-all';

  const textPrimary = 'text-secondary-900';
  const textSecondary = 'text-secondary-600'; // Or generic gray
  // Dark mode adjustment: glass-card on dark bg usually implies white text.
  // This dashboard page seems to rely on some light/dark context. 
  // Let's assume standard "Dashboard" styles for consistency.
  // Actually, MainLayout and AdminLayout provide dark backgrounds.
  // So text should be white/gray-300.

  const textPrimaryDark = 'text-white';
  const textSecondaryDark = 'text-gray-400';

  // Overriding for safety if context is dark (which AdminLayout is)
  const isDark = true;

  const h1Class = `text-4xl font-bold mb-2 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`;
  const pClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardClassDark = 'glass-card rounded-2xl p-6 hover:shadow-xl transition-all border border-white/10 bg-[#1e293b]/40';


  return (
  // Since AdminDashboardPage is used by different Routers, we might need Layout handling.
  // But AdminRouter wraps it in <Outlet>? No, AdminRouter renders <AdminDashboardPage>.
  // AdminDashboardPage uses <Layout>.
  // We should just use a fragment or div because the Router (AdminRouter) should ideally provide the layout?
  // Checking AdminRouter:
  /*
            <Route path="/" element={
                <ProtectedRoute requireSystemAdmin>
                    <AdminDashboardPage />
                </ProtectedRoute>
            } />
  */
  // It renders the page directly. So the page MUST render the Layout.
  // Previously logic was: `const Layout = isSystemAdminPath ? AdminLayout : MainLayout;`
  // If we assume this page is ONLY used for Admin now (per router check), we can force AdminLayout.
  // But routes.jsx also imports it.

  // Let's rely on simple check: if we are in AdminRouter, we want AdminLayout.
  // We can default to AdminLayout if we are just refactoring for console.
  
  const Layout = AdminLayout; // Forced for Console rewrite

  return (
    <Layout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className={h1Class}>{t.adminDashboardTitle}</h1>
            <p className={pClass}>{t.adminDashboardDesc}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 rounded-xl font-semibold border glass-input text-gray-300"
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
            <div key={index} className={cardClassDark}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <span className={`material-icons text-2xl text-${stat.color}-400`}>{stat.icon}</span>
                </div>
                <div className={`flex items-center text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                  <span className="material-icons text-sm mr-1">
                    {stat.trend === 'up' ? 'trending_up' : 'trending_down'}
                  </span>
                  {stat.percentage}
                </div>
              </div>
              <h3 className={`text-3xl font-bold mb-1 ${textPrimaryDark}`}>{stat.value}</h3>
              <p className={`text-sm font-medium mb-1 ${textSecondaryDark}`}>{stat.label}</p>
              <p className="text-gray-500 text-xs">{stat.change} from last period</p>
            </div>
          ))}
        </div>

        {/* Revenue Stats */}
        <div className={`${cardClassDark} mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center ${textPrimaryDark}`}>
            <span className="material-icons text-green-500 mr-2">attach_money</span>
            {t.revenueOverviewTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {revenueStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold mb-1 ${textPrimaryDark}`}>{stat.value}</div>
                <div className={`text-sm font-medium mb-2 ${textSecondaryDark}`}>{stat.label}</div>
                <div className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
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
            <div className={cardClassDark}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textPrimaryDark}`}>{t.recentActivityTitle}</h2>
                <Link to="/admin/users" className="text-primary-400 hover:text-primary-300 font-semibold text-sm">
                  {t.viewAllLink}
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b border-white/10 last:border-0">
                    <div className={`w-10 h-10 rounded-lg bg-${activity.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                      <span className={`material-icons text-${activity.color}-400 text-sm`}>
                        {activity.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${textPrimaryDark}`}>
                        <span className="font-semibold text-white">{activity.user}</span> {activity.action}
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
            <div className={cardClassDark}>
              <h2 className={`text-2xl font-bold mb-6 ${textPrimaryDark}`}>{t.industryBreakdownTitle}</h2>
              <div className="space-y-4">
                {industryBreakdown.map((industry, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${textPrimaryDark}`}>{industry.name}</span>
                      <span className={`text-sm font-bold ${textPrimaryDark}`}>{industry.count}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
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
        <div className={`${cardClassDark} mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textPrimaryDark}`}>{t.topUsersTitle}</h2>
            <Link to="/admin/users" className="text-primary-400 hover:text-primary-300 font-semibold text-sm">
              {t.manageUsersLink}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 text-gray-400">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderUser}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderEmail}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderSubmissions}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderAvgScore}</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderStatus}</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase">{t.tableHeaderActions}</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {topUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                          <span className="text-primary-400 font-semibold">{user.name[0]}</span>
                        </div>
                        <span className={`font-semibold ${textPrimaryDark}`}>{user.name}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${textSecondaryDark}`}>{user.email}</td>
                    <td className={`py-4 px-4 font-semibold ${textPrimaryDark}`}>{user.submissions}</td>
                    <td className="py-4 px-4">
                      <span className="text-primary-400 font-bold">{user.score}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'Premium'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-gray-500/20 text-gray-300'
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-primary-400 hover:text-primary-300 font-semibold text-sm">
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
        <div className={cardClassDark}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center ${textPrimaryDark}`}>
            <span className="material-icons text-blue-500 mr-2">monitor_heart</span>
            {t.systemHealthTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemHealth.map((service, index) => (
              <div key={index} className="rounded-xl p-4 bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-semibold ${textPrimaryDark}`}>{service.name}</h3>
                  <span className={`w-3 h-3 rounded-full bg-${service.color}-500`}></span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={textSecondaryDark}>{t.statusLabel}</span>
                    <span className={`font-semibold capitalize ${service.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textSecondaryDark}>{t.uptimeLabel}</span>
                    <span className={`font-semibold ${textPrimaryDark}`}>{service.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textSecondaryDark}>{t.responseLabel}</span>
                    <span className={`font-semibold ${textPrimaryDark}`}>{service.responseTime}</span>
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
            className={`${cardClassDark} group`}
            style={{}} // Override previous styles
          >
            <span className="material-icons text-4xl text-primary-500 mb-3">people</span>
            <h3 className={`text-xl font-bold mb-2 ${textPrimaryDark}`}>{t.manageUsersCard}</h3>
            <p className={`${textSecondaryDark} text-sm`}>{t.manageUsersCardDesc}</p>
          </Link>
          <Link
            to="/admin/analytics"
            className={`${cardClassDark} group`}
          >
            <span className="material-icons text-4xl text-green-500 mb-3">analytics</span>
            <h3 className={`text-xl font-bold mb-2 ${textPrimaryDark}`}>{t.viewAnalyticsCard}</h3>
            <p className={`${textSecondaryDark} text-sm`}>{t.viewAnalyticsCardDesc}</p>
          </Link>
          <Link
            to="/admin/webhooks"
            className={`${cardClassDark} group`}
          >
            <span className="material-icons text-4xl text-orange-500 mb-3">webhook</span>
            <h3 className={`text-xl font-bold mb-2 ${textPrimaryDark}`}>{t.webhooksTab}</h3>
            <p className={`${textSecondaryDark} text-sm`}>{t.webhooksCardDesc}</p>
          </Link>
          <Link
            to="/settings/rubrics"
            className={`${cardClassDark} group`}
          >
            <span className="material-icons text-4xl text-purple-500 mb-3">tune</span>
            <h3 className={`text-xl font-bold mb-2 ${textPrimaryDark}`}>{t.criteria}</h3>
            <p className={`${textSecondaryDark} text-sm`}>{t.manageCriteriaCardDesc}</p>
          </Link>
        </div>
      </div>
    </Layout>
  )  )
}

export default AdminDashboardPage
