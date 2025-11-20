import { useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuthStore } from '../../store/authStore';
import { useBillingStore } from '../../store/billingStore';
import { Badge } from '../../components/common';
import { StatCard, QuickActions, RecentActivity, UsageChart, MyAgents } from '../../components/dashboard';
import { PLANS } from '../../utils/constants';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { currentSubscription, fetchSubscription } = useBillingStore();

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Get current plan details
  const currentPlan = currentSubscription
    ? PLANS.find((p) => p.id === currentSubscription.plan_id)
    : PLANS[0]; // Default to Starter

  return (
    <MainLayout>
      <div className="py-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-secondary-900 mb-2 tracking-tight">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-secondary-600 font-medium">
              Here's what's happening with your Precision AI Agents today
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-secondary-600 font-semibold">Current Plan</p>
                <Badge variant="primary" size="lg">
                  {currentPlan?.name || 'Starter'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Agents"
            value="12"
            icon={<span className="text-2xl">🤖</span>}
            color="primary"
            trend="up"
            trendValue="3"
          />
          <StatCard
            title="Runs This Month"
            value="458"
            icon={<span className="text-2xl">▶️</span>}
            color="secondary"
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Active Workflows"
            value="6"
            icon={<span className="text-2xl">🎼</span>}
            color="purple"
            trend="up"
            trendValue="2"
          />
          <StatCard
            title="Marketplace Sales"
            value="$1,240"
            icon={<span className="text-2xl">💰</span>}
            color="orange"
            trend="up"
            trendValue="$340"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4 tracking-tight">
            Quick Actions
          </h2>
          <QuickActions />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <UsageChart />
          </div>

          {/* Recent Activity - Takes 1 column */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* My Agents */}
        <div>
          <MyAgents />
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💡</span>
              </div>
              <h3 className="font-heading font-semibold text-secondary-900">
                Precision AI Engines
              </h3>
            </div>
            <p className="text-sm text-secondary-700 mb-4">
              Access 7 powerful engines to build custom agents
            </p>
            <a
              href="/engines"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Explore Engines →
            </a>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏪</span>
              </div>
              <h3 className="font-heading font-semibold text-secondary-900">
                AgentX Hub
              </h3>
            </div>
            <p className="text-sm text-secondary-700 mb-4">
              Discover & deploy agents. Earn 70% revenue share
            </p>
            <a
              href="/agentx/marketplace"
              className="text-sm font-medium text-secondary-600 hover:text-secondary-700"
            >
              Visit Marketplace →
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
              <h3 className="font-heading font-semibold text-secondary-900">
                HITL Mode
              </h3>
            </div>
            <p className="text-sm text-secondary-700 mb-4">
              Human-in-the-Loop oversight for critical tasks
            </p>
            <a
              href="/hitl"
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Configure HITL →
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
