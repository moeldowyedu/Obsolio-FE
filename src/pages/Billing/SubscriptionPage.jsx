import { useState, useEffect } from 'react';
import {
  CreditCard, Calendar, Activity, AlertCircle, CheckCircle, Clock,
  Download, FileText, TrendingUp, Shield, Zap
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { useTheme } from '../../contexts/ThemeContext';
import subscriptionsService from '../../services/subscriptionsService';
import Button from '../../components/common/Button/Button';
import ChangePlanModal from '../../components/billing/ChangePlanModal';
import toast from 'react-hot-toast';
import { formatNumber, formatCurrency } from '../../utils/formatters'; // Ensure exist

const SubscriptionPage = () => {
  const { theme } = useTheme();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);
  const [billingHistory, setBillingHistory] = useState([]);

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Parallel fetch: Current Subscription and History
      const [subRes, historyRes] = await Promise.all([
        subscriptionsService.getCurrentSubscription(),
        subscriptionsService.getBillingHistory().catch(() => ({ data: [] })) // Swallow error if mocks not ready
      ]);

      if (subRes.success) {
        setSubscription(subRes.data);
      }
      if (historyRes && Array.isArray(historyRes.data)) {
        setBillingHistory(historyRes.data);
      } else if (Array.isArray(historyRes)) {
        setBillingHistory(historyRes);
      }

    } catch (error) {
      console.error("Failed to load subscription data", error);
      // toast.error("Failed to load subscription details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel your subscription? You will lose access to premium features at the end of the billing period.")) {
      try {
        await subscriptionsService.cancelSubscription();
        toast.success("Subscription canceled successfully");
        fetchData();
      } catch (error) {
        toast.error("Failed to cancel subscription");
      }
    }
  };

  const handleResume = async () => {
    try {
      await subscriptionsService.resumeSubscription();
      toast.success("Subscription resumed successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to resume subscription");
    }
  };

  return (
    <MainLayout>
      <div className={`min-h-screen p-6 md:p-8 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>

        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Subscription & Billing</h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Manage your plan, billing details, and invoices.</p>
          </div>

          {loading ? (
            <div className="h-64 rounded-3xl bg-gray-200 dark:bg-white/5 animate-pulse" />
          ) : subscription ? (
            <>
              {/* Current Plan Card */}
              <div className={`relative overflow-hidden rounded-3xl border p-8 ${theme === 'dark' ? 'bg-[#1e293b]/50 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="absolute top-0 right-0 p-32 bg-primary-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                  {/* Left: Plan Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-primary-500/20">
                        <Zap className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{subscription.plan?.name}</h2>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${subscription.status === 'active'
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                            }`}>
                            {subscription.status}
                          </span>
                        </div>
                        <p className="text-gray-500">{subscription.plan?.description || 'Premium Plan Tier'}</p>
                      </div>
                    </div>

                    <div className="flex items-end gap-1">
                      <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {formatCurrency(subscription.plan?.price_monthly || subscription.plan?.price || 0)}
                      </span>
                      <span className="text-gray-500 mb-1.5">/{subscription.billing_cycle || 'mo'}</span>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Renews on <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}</span></span>
                      </div>
                      {subscription.canceled_at && (
                        <div className="flex items-center gap-2 text-red-400">
                          <AlertCircle className="w-4 h-4" />
                          <span>Cancels on {new Date(subscription.current_period_end).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-3 justify-center min-w-[200px]">
                    <Button
                      onClick={() => setIsChangePlanModalOpen(true)}
                      variant="primary"
                      className="w-full justify-center shadow-lg shadow-primary-500/20"
                    >
                      Change Plan
                    </Button>

                    {subscription.status === 'active' && !subscription.canceled_at ? (
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="w-full justify-center border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/10"
                      >
                        Cancel Subscription
                      </Button>
                    ) : subscription.canceled_at ? (
                      <Button
                        onClick={handleResume}
                        variant="outline"
                        className="w-full justify-center border-green-200 text-green-600 hover:bg-green-50 dark:border-green-900/30 dark:hover:bg-green-900/10"
                      >
                        Resume Subscription
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Usage Stats (Mock/Placeholder if not in API) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Activity className="w-5 h-5" /></div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Agent Executions</div>
                  </div>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>12,450 <span className="text-xs font-normal text-gray-500">/ 20,000</span></div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>
                <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><Shield className="w-5 h-5" /></div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Storage Used</div>
                  </div>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>4.2 GB <span className="text-xs font-normal text-gray-500">/ 10 GB</span></div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
                <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-500"><CheckCircle className="w-5 h-5" /></div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Active Agents</div>
                  </div>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>8 <span className="text-xs font-normal text-gray-500">/ Unlimited</span></div>
                </div>
              </div>

              {/* Billing History */}
              <div className={`rounded-3xl border overflow-hidden ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Billing History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5 text-gray-300' : 'divide-gray-100 text-slate-600'}`}>
                      {billingHistory.length > 0 ? (
                        billingHistory.map((invoice) => (
                          <tr key={invoice.id} className={`${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'} transition-colors`}>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(invoice.date || invoice.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{formatCurrency(invoice.amount || 0)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${invoice.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                {invoice.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button className="flex items-center gap-1 text-primary-500 hover:text-primary-600">
                                <FileText className="w-4 h-4" /> PDF
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                            No billing history available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </>
          ) : (
            <div className="text-center py-20">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-500">Failed to load subscription</h3>
              <p className="text-gray-500">Something went wrong. Please try again later.</p>
              <Button onClick={fetchData} className="mt-4">Retry</Button>
            </div>
          )}
        </div>
      </div>

      <ChangePlanModal
        isOpen={isChangePlanModalOpen}
        onClose={() => setIsChangePlanModalOpen(false)}
        currentPlanId={subscription?.plan?.id}
        onPlanChanged={fetchData}
      />

    </MainLayout>
  );
};

export default SubscriptionPage;
