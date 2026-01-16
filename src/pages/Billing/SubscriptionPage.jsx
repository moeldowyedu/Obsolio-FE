import { useState, useEffect } from 'react';
import { Activity, Shield, Zap, RefreshCw, AlertCircle, ChevronRight } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { useTheme } from '../../contexts/ThemeContext';
import subscriptionsService from '../../services/subscriptionsService';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';

// Billing Components
import CurrentSubscriptionCard from '../../components/billing/CurrentSubscriptionCard';
import TrialBanner from '../../components/billing/TrialBanner';
import UsageProgressBar from '../../components/billing/UsageProgressBar';
import SubscriptionHistoryTable from '../../components/billing/SubscriptionHistoryTable';
import ChangePlanModal from '../../components/billing/ChangePlanModal';
import CancelSubscriptionModal from '../../components/billing/CancelSubscriptionModal';
import PlanDetailsModal from '../../components/billing/PlanDetailsModal';

const SubscriptionPage = () => {
  const { theme } = useTheme();

  // State
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // History state with pagination
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [historyPagination, setHistoryPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });
  const [historyLoading, setHistoryLoading] = useState(false);

  // Trial info
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(null);
  const [isOnTrial, setIsOnTrial] = useState(false);

  // Modals
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPlanDetailsOpen, setIsPlanDetailsOpen] = useState(false);

  // Fetch current subscription
  const fetchCurrentSubscription = async () => {
    try {
      const response = await subscriptionsService.getCurrentSubscription();

      if (response.success && response.data) {
        // Handle nested structure: data.subscription
        const subData = response.data.subscription || response.data;
        setSubscription(subData);

        // Set trial info from response
        setTrialDaysRemaining(response.data.trial_days_remaining ?? null);
        setIsOnTrial(response.data.is_on_trial ?? subData.status === 'trialing');
      } else if (response.data) {
        // Direct data structure
        setSubscription(response.data);
      }
    } catch (error) {
      console.error('Failed to load subscription:', error);
      // Don't toast on initial load failure
    }
  };

  // Fetch subscription history with pagination
  const fetchSubscriptionHistory = async (page = 1) => {
    setHistoryLoading(true);
    try {
      const response = await subscriptionsService.getHistory({ page, per_page: 10 });

      if (response.success && response.data) {
        // Handle paginated response
        const historyData = response.data.data || response.data;
        setSubscriptionHistory(Array.isArray(historyData) ? historyData : []);
        setHistoryPagination({
          currentPage: response.data.current_page || page,
          lastPage: response.data.last_page || 1,
          total: response.data.total || historyData.length || 0,
        });
      } else if (Array.isArray(response)) {
        setSubscriptionHistory(response);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
      setSubscriptionHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Initial data fetch
  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      fetchCurrentSubscription(),
      fetchSubscriptionHistory(1),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle cancel subscription
  const handleCancel = async (cancelData) => {
    setActionLoading('cancel');
    try {
      await subscriptionsService.cancelSubscription(cancelData);
      toast.success('Subscription canceled successfully');
      setIsCancelModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle resume subscription
  const handleResume = async () => {
    setActionLoading('resume');
    try {
      await subscriptionsService.resumeSubscription();
      toast.success('Subscription resumed successfully');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resume subscription');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle page change for history
  const handleHistoryPageChange = (page) => {
    fetchSubscriptionHistory(page);
  };

  return (
    <MainLayout>
      <div className={`min-h-screen p-4 md:p-6 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto space-y-4">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Subscription & Billing
              </h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>
                Manage your plan, billing details, and subscription history.
              </p>
            </div>
            <Button
              onClick={fetchData}
              variant="outline"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {loading ? (
            // Loading skeleton
            <div className="space-y-6">
              <div className="h-64 rounded-3xl bg-gray-200 dark:bg-white/5 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 rounded-2xl bg-gray-200 dark:bg-white/5 animate-pulse" />
                ))}
              </div>
            </div>
          ) : subscription ? (
            <>
              {/* Trial Banner */}
              {isOnTrial && (
                <TrialBanner
                  trialDaysRemaining={trialDaysRemaining}
                  trialEndsAt={subscription.trial_ends_at}
                  onUpgrade={() => setIsChangePlanModalOpen(true)}
                />
              )}

              {/* Current Subscription Card */}
              <CurrentSubscriptionCard
                subscription={subscription}
                onChangePlan={() => setIsChangePlanModalOpen(true)}
                onCancel={() => setIsCancelModalOpen(true)}
                onResume={handleResume}
                onViewDetails={() => setIsPlanDetailsOpen(true)}
                actionLoading={actionLoading}
              />

              {/* Usage Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UsageProgressBar
                  label="Executions"
                  used={subscription.executions_used || 0}
                  total={subscription.execution_quota || 0}
                  icon={Activity}
                  colorScheme="blue"
                />
                <UsageProgressBar
                  label="Storage"
                  used={subscription.usage?.storage_gb || 0}
                  total={subscription.plan?.max_storage_gb || 0}
                  icon={Shield}
                  colorScheme="purple"
                />
                <UsageProgressBar
                  label="Active Agents"
                  used={subscription.usage?.active_agents || 0}
                  total={subscription.plan?.max_agents || 0}
                  icon={Zap}
                  colorScheme="emerald"
                />
              </div>

              {/* Subscription History */}
              <SubscriptionHistoryTable
                history={subscriptionHistory}
                currentPage={historyPagination.currentPage}
                lastPage={historyPagination.lastPage}
                total={historyPagination.total}
                onPageChange={handleHistoryPageChange}
                loading={historyLoading}
              />
            </>
          ) : (
            // No subscription state
            <div className={`text-center py-20 rounded-3xl border ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'
              }`}>
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                No Active Subscription
              </h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                You don't have an active subscription. Choose a plan to get started.
              </p>
              <Button
                onClick={() => setIsChangePlanModalOpen(true)}
                variant="primary"
                className="shadow-lg"
              >
                Choose a Plan <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ChangePlanModal
        isOpen={isChangePlanModalOpen}
        onClose={() => setIsChangePlanModalOpen(false)}
        currentPlanId={subscription?.plan?.id || subscription?.plan_id}
        onPlanChanged={fetchData}
      />

      <CancelSubscriptionModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancel}
        subscriptionEndDate={subscription?.current_period_end}
        loading={actionLoading === 'cancel'}
      />

      {/* Plan Details Modal */}
      {isPlanDetailsOpen && subscription && (
        <PlanDetailsModal
          isOpen={isPlanDetailsOpen}
          onClose={() => setIsPlanDetailsOpen(false)}
          subscription={subscription}
          onChangePlan={() => {
            setIsPlanDetailsOpen(false);
            setIsChangePlanModalOpen(true);
          }}
        />
      )}
    </MainLayout>
  );
};

export default SubscriptionPage;
