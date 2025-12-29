import { useState, useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card } from '../../components/common'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'
import { useTheme } from '../../contexts/ThemeContext'
import adminService from '../../services/adminService'
import toast from 'react-hot-toast'
import { safeFormatNumber } from '../../utils/numberFormatter'
import {
  Users, Building2, CreditCard, Bot,
  Activity, TrendingUp, TrendingDown,
  Building, UserCog, DollarSign, Package,
  Play, CheckCircle
} from 'lucide-react'

const AdminDashboardPage = () => {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const t = translations[language]
  const [stats, setStats] = useState({
    tenants: null,
    organizations: null,
    subscriptions: null,
    agentRuns: null,
    users: null,
  })
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

      // Fetch all statistics in parallel
      const [tenantsRes, orgsRes, subsRes, runsRes, usersRes] = await Promise.allSettled([
        adminService.getTenantStatistics(),
        adminService.getOrganizationStatistics(),
        adminService.getSubscriptionStatistics(),
        adminService.getAgentRunsStatistics(),
        adminService.getAllUsers({ per_page: 1 }), // Just get count
      ])

      setStats({
        tenants: tenantsRes.status === 'fulfilled' ? (tenantsRes.value.data || tenantsRes.value) : null,
        organizations: orgsRes.status === 'fulfilled' ? (orgsRes.value.data || orgsRes.value) : null,
        subscriptions: subsRes.status === 'fulfilled' ? (subsRes.value.data || subsRes.value) : null,
        agentRuns: runsRes.status === 'fulfilled' ? (runsRes.value.data || runsRes.value) : null,
        users: usersRes.status === 'fulfilled' ? (usersRes.value.data || usersRes.value) : null,
      })
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
      if (!stats.tenants) {
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
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-500', lightBg: 'bg-cyan-500/20', lightText: 'text-cyan-400', paleBg: 'bg-cyan-100', paleText: 'text-cyan-600' },
  }

  // Helper to get color classes based on theme
  const getColor = (colorName) => {
    const pal = COLORS[colorName] || COLORS.blue
    return theme === 'dark'
      ? { bg: pal.lightBg, text: pal.lightText, raw: pal.bg }
      : { bg: pal.paleBg, text: pal.paleText, raw: pal.bg }
  }

  // Calculate console users stats (with safe fallbacks to prevent undefined errors)
  // Ensure all values are numbers to prevent toLocaleString errors
  const totalConsoleUsers = Number(stats.users?.total || stats.users?.meta?.total || 0)
  const systemAdmins = Number(stats.users?.data?.filter(u => u.role === 'system_admin' || u.is_system_admin)?.length || 0)
  const tenantAdmins = Number(stats.users?.data?.filter(u => u.role === 'tenant_admin')?.length || 0)

  // Build system stats from real data
  const systemStats = [
    {
      label: 'Total Tenants',
      value: safeFormatNumber(stats.tenants?.total_tenants),
      change: `${stats.tenants?.active_tenants || 0} active`,
      trend: 'up',
      icon: Building2,
      color: 'blue',
      link: '/tenants'
    },
    {
      label: 'Organizations',
      value: safeFormatNumber(stats.organizations?.total_organizations),
      change: `${stats.organizations?.active_organizations || 0} active`,
      trend: 'up',
      icon: Building,
      color: 'purple',
      link: '/organizations'
    },
    {
      label: 'Console Users',
      value: safeFormatNumber(totalConsoleUsers),
      change: `${systemAdmins} admins`,
      trend: 'up',
      icon: UserCog,
      color: 'indigo',
      link: '/console-users'
    },
    {
      label: 'Subscriptions',
      value: safeFormatNumber(stats.subscriptions?.total_subscriptions),
      change: `${stats.subscriptions?.active_subscriptions || 0} active`,
      trend: 'up',
      icon: CreditCard,
      color: 'green',
      link: '/active-subscriptions'
    },
  ];

  const agentStats = [
    {
      label: 'Total Agent Runs',
      value: safeFormatNumber(stats.agentRuns?.total_runs),
      change: `${stats.agentRuns?.successful_runs || 0} successful`,
      trend: 'up',
      icon: Play,
      color: 'cyan',
      link: '/agent-runs'
    },
    {
      label: 'Active Agents',
      value: safeFormatNumber(stats.agentRuns?.active_agents),
      change: `${stats.agentRuns?.total_agents || 0} total`,
      trend: 'up',
      icon: Bot,
      color: 'orange',
      link: '/agents'
    },
    {
      label: 'Success Rate',
      value: `${((stats.agentRuns?.successful_runs || 0) / (stats.agentRuns?.total_runs || 1) * 100).toFixed(1)}%`,
      change: `${stats.agentRuns?.failed_runs || 0} failed`,
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      link: '/agent-runs'
    },
    {
      label: 'Running Now',
      value: safeFormatNumber(stats.agentRuns?.running_agents),
      change: 'live status',
      trend: 'up',
      icon: Activity,
      color: 'yellow',
      link: '/active-agents'
    },
  ];

  // Subscription breakdown stats
  const subscriptionStats = stats.subscriptions ? [
    { label: 'Active', value: stats.subscriptions.active_subscriptions || 0, color: 'green' },
    { label: 'Trialing', value: stats.subscriptions.trialing_subscriptions || 0, color: 'blue' },
    { label: 'Canceled', value: stats.subscriptions.canceled_subscriptions || 0, color: 'red' },
    { label: 'Past Due', value: stats.subscriptions.past_due_subscriptions || 0, color: 'yellow' },
    { label: 'Expired', value: stats.subscriptions.expired_subscriptions || 0, color: 'orange' },
  ] : [];

  // Tenant breakdown
  const tenantStats = stats.tenants ? [
    { label: 'Active', value: stats.tenants.active_tenants || 0, color: 'green' },
    { label: 'Suspended', value: stats.tenants.suspended_tenants || 0, color: 'red' },
    { label: 'This Month', value: stats.tenants.new_tenants_this_month || 0, color: 'blue' },
  ] : [];

  if (loading && !stats.tenants) {
    return (
      <AdminLayout>
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
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className={h1Class}>Console Dashboard</h1>
            <p className={pClass}>System-wide statistics and monitoring</p>
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
        </div>

        {/* Main System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const colors = getColor(stat.color)
            return (
              <Card key={index} hover className="transition-all duration-300 cursor-pointer" onClick={() => window.location.href = stat.link}>
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
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</h3>
                <p className={`text-sm font-medium mb-1 ${textSecondary}`}>{stat.label}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{stat.change}</p>
              </Card>
            )
          })}
        </div>

        {/* Agent Stats */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${textPrimary}`}>Agent Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agentStats.map((stat, index) => {
              const colors = getColor(stat.color)
              return (
                <Card key={index} hover className="transition-all duration-300 cursor-pointer" onClick={() => window.location.href = stat.link}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg}`}>
                      <stat.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold mb-1 ${textPrimary}`}>{stat.value}</h3>
                  <p className={`text-sm font-medium mb-1 ${textSecondary}`}>{stat.label}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{stat.change}</p>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Subscription Breakdown */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold flex items-center ${textPrimary}`}>
                <CreditCard className="w-6 h-6 text-purple-500 mr-2" />
                Subscription Status
              </h2>
              <div className={`text-sm font-semibold ${textPrimary}`}>
                Total: {stats.subscriptions?.total_subscriptions || 0}
              </div>
            </div>
            <div className="space-y-4">
              {subscriptionStats.map((stat, index) => {
                const colors = getColor(stat.color)
                const percentage = stats.subscriptions?.total_subscriptions
                  ? (stat.value / stats.subscriptions.total_subscriptions * 100).toFixed(1)
                  : 0
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${textPrimary}`}>{stat.label}</span>
                      <span className={`text-sm font-bold ${textPrimary}`}>{stat.value}</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`}>
                      <div
                        className={`h-2 rounded-full ${colors.raw}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{percentage}%</div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Tenant Breakdown */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold flex items-center ${textPrimary}`}>
                <Building2 className="w-6 h-6 text-blue-500 mr-2" />
                Tenant Status
              </h2>
              <div className={`text-sm font-semibold ${textPrimary}`}>
                Total: {stats.tenants?.total_tenants || 0}
              </div>
            </div>
            <div className="space-y-4">
              {tenantStats.map((stat, index) => {
                const colors = getColor(stat.color)
                const percentage = stats.tenants?.total_tenants
                  ? (stat.value / stats.tenants.total_tenants * 100).toFixed(1)
                  : 0
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${textPrimary}`}>{stat.label}</span>
                      <span className={`text-sm font-bold ${textPrimary}`}>{stat.value}</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`}>
                      <div
                        className={`h-2 rounded-full ${colors.raw}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{percentage}%</div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Revenue Overview */}
        {stats.subscriptions && (
          <Card className="mb-8" padding="lg">
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${textPrimary}`}>
              <DollarSign className="w-6 h-6 text-green-500 mr-2" />
              Revenue Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>
                  ${safeFormatNumber((stats.subscriptions?.monthly_recurring_revenue || 0) / 100)}
                </div>
                <div className={`text-sm font-medium mb-2 ${textSecondary}`}>Monthly Recurring Revenue</div>
                <div className="text-sm font-semibold text-green-500">MRR</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>
                  ${safeFormatNumber((stats.subscriptions?.total_revenue || 0) / 100)}
                </div>
                <div className={`text-sm font-medium mb-2 ${textSecondary}`}>Total Revenue</div>
                <div className="text-sm font-semibold text-green-500">All Time</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>
                  {stats.subscriptions?.active_subscriptions || 0}
                </div>
                <div className={`text-sm font-medium mb-2 ${textSecondary}`}>Active Subscriptions</div>
                <div className="text-sm font-semibold text-blue-500">Paying</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>
                  {stats.subscriptions.trialing_subscriptions || 0}
                </div>
                <div className={`text-sm font-medium mb-2 ${textSecondary}`}>Trial Subscriptions</div>
                <div className="text-sm font-semibold text-yellow-500">Trialing</div>
              </div>
            </div>
          </Card>
        )}

        {/* User Breakdown */}
        {stats.users && (
          <Card className="mb-8">
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${textPrimary}`}>
              <Users className="w-6 h-6 text-indigo-500 mr-2" />
              Console Users Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className={`text-3xl font-bold mb-1 text-purple-500`}>{systemAdmins}</div>
                <div className={`text-sm font-medium ${textSecondary}`}>System Admins</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className={`text-3xl font-bold mb-1 text-blue-500`}>{tenantAdmins}</div>
                <div className={`text-sm font-medium ${textSecondary}`}>Tenant Admins</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-500/10 border border-gray-500/20">
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>{totalConsoleUsers}</div>
                <div className={`text-sm font-medium ${textSecondary}`}>Total Console Users</div>
              </div>
            </div>
          </Card>
        )}

      </div>
    </AdminLayout>
  )
}

export default AdminDashboardPage
