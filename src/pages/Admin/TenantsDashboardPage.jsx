import { useState, useEffect } from 'react';
import { Users, Activity, Clock, DollarSign, TrendingUp, Building2 } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminTenantsStore } from '../../store/adminTenantsStore';
import StatCard from '../../components/admin/tenants/StatCard';
import { useTheme } from '../../contexts/ThemeContext';
import { Card } from '../../components/common';
import toast from 'react-hot-toast';

/**
 * TenantsDashboardPage
 * Statistics overview for all tenants
 * Based on FRONTEND_TENANT_MANAGEMENT.md specification
 */
const TenantsDashboardPage = () => {
  const { theme } = useTheme();
  const { statistics, fetchStatistics, loading } = useAdminTenantsStore();
  const [refreshInterval, setRefreshInterval] = useState(null);

  useEffect(() => {
    loadStatistics();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadStatistics, 30000);
    setRefreshInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const loadStatistics = async () => {
    try {
      await fetchStatistics();
    } catch (error) {
      console.error('Error loading statistics:', error);
      if (!statistics) {
        toast.error('Failed to load tenant statistics');
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-600';

  if (loading && !statistics) {
    return (
      <AdminLayout>
        <div className="py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-32 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Provide safe defaults for all statistics
  const stats = {
    total_tenants: statistics?.total_tenants ?? 0,
    active_tenants: statistics?.active_tenants ?? 0,
    suspended_tenants: statistics?.suspended_tenants ?? 0,
    trial_tenants: statistics?.trial_tenants ?? 0,
    paid_tenants: statistics?.paid_tenants ?? 0,
    new_tenants_this_month: statistics?.new_tenants_this_month ?? 0,
    revenue_this_month: statistics?.revenue_this_month ?? 0,
    churn_rate: statistics?.churn_rate ?? 0,
    by_plan: statistics?.by_plan ?? [],
  };

  return (
    <AdminLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 font-heading ${textPrimary}`}>
              Tenant Management
            </h1>
            <p className={textSecondary}>
              Overview of all tenants and subscriptions
            </p>
          </div>
          <button
            onClick={loadStatistics}
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Tenants"
            value={(stats.total_tenants || 0).toLocaleString()}
            color="blue"
          />

          <StatCard
            icon={Activity}
            label="Active Tenants"
            value={(stats.active_tenants || 0).toLocaleString()}
            color="green"
          />

          <StatCard
            icon={Building2}
            label="Suspended Tenants"
            value={(stats.suspended_tenants || 0).toLocaleString()}
            color="red"
          />

          <StatCard
            icon={Clock}
            label="Trial Tenants"
            value={(stats.trial_tenants || 0).toLocaleString()}
            color="yellow"
          />

          <StatCard
            icon={DollarSign}
            label="Paid Tenants"
            value={(stats.paid_tenants || 0).toLocaleString()}
            color="purple"
          />

          <StatCard
            icon={TrendingUp}
            label="New This Month"
            value={(stats.new_tenants_this_month || 0).toLocaleString()}
            color="teal"
          />
        </div>

        {/* Revenue & Churn */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card padding="lg">
            <h2 className={`text-2xl font-bold mb-4 ${textPrimary}`}>
              Revenue This Month
            </h2>
            <div className="flex items-baseline gap-3">
              <div className={`text-4xl font-bold ${textPrimary}`}>
                {formatCurrency(stats.revenue_this_month)}
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5%</span>
              </div>
            </div>
            <p className={`mt-2 text-sm ${textSecondary}`}>
              Compared to last month
            </p>
          </Card>

          <Card padding="lg">
            <h2 className={`text-2xl font-bold mb-4 ${textPrimary}`}>
              Churn Rate
            </h2>
            <div className="flex items-baseline gap-3">
              <div className={`text-4xl font-bold ${textPrimary}`}>
                {(stats.churn_rate || 0).toFixed(1)}%
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>-0.3%</span>
              </div>
            </div>
            <p className={`mt-2 text-sm ${textSecondary}`}>
              Lower is better
            </p>
          </Card>
        </div>

        {/* Tenants by Plan */}
        <Card padding="lg">
          <h2 className={`text-2xl font-bold mb-6 ${textPrimary}`}>
            Tenants by Subscription Plan
          </h2>
          <div className="space-y-4">
            {stats.by_plan && stats.by_plan.length > 0 ? (
              stats.by_plan.map((plan, index) => {
                const percentage = stats.total_tenants > 0
                  ? (plan.count / stats.total_tenants) * 100
                  : 0;

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${textPrimary}`}>
                        {plan.plan_name}
                      </span>
                      <span className={`text-sm font-bold ${textPrimary}`}>
                        {plan.count.toLocaleString()} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div
                      className={`w-full rounded-full h-3 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={textSecondary}>No plan data available</p>
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default TenantsDashboardPage;
