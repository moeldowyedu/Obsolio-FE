import { Calendar, Crown, TrendingUp, XCircle, CheckCircle, RefreshCw, Info } from 'lucide-react';
import SubscriptionStatusBadge from './SubscriptionStatusBadge';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/formatters';

/**
 * CurrentSubscriptionCard - Compact subscription info card
 */
const CurrentSubscriptionCard = ({
    subscription,
    onChangePlan,
    onCancel,
    onResume,
    onViewDetails,
    actionLoading = null,
}) => {
    const { theme } = useTheme();

    if (!subscription) return null;

    const plan = subscription.plan || {};
    const isCanceled = !!subscription.canceled_at;
    const isOnTrial = subscription.status === 'trialing' || subscription.is_on_trial;
    const price = subscription.billing_cycle === 'annual'
        ? (plan.final_price || plan.base_price || 0)
        : (plan.final_price || plan.base_price || 0);

    return (
        <div className={`relative overflow-hidden rounded-2xl border p-5 ${theme === 'dark'
                ? 'bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/80 border-white/10'
                : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
            }`}>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 via-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                {/* Left: Plan Details */}
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20 flex-shrink-0">
                        <Crown className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {plan.name || 'Current Plan'}
                            </h2>
                            {onViewDetails && (
                                <button
                                    type="button"
                                    onClick={onViewDetails}
                                    className={`p-1 rounded transition-colors ${theme === 'dark'
                                            ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                                            : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                                        }`}
                                    title="View plan details"
                                >
                                    <Info className="w-4 h-4" />
                                </button>
                            )}
                            <SubscriptionStatusBadge status={subscription.status} isOnTrial={isOnTrial} size="sm" />
                        </div>
                        <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                            {plan.description || 'Your active subscription plan'}
                        </p>
                    </div>
                </div>

                {/* Center: Price & Date */}
                <div className="flex items-center gap-6 flex-wrap">
                    <div className={`inline-flex items-baseline gap-1 px-3 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                        }`}>
                        <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {formatCurrency(price)}
                        </span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                            /{subscription.billing_cycle === 'annual' ? 'yr' : 'mo'}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>
                            {isCanceled ? 'Expires' : 'Renews'}{' '}
                            <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-slate-700'}`}>
                                {subscription.current_period_end
                                    ? new Date(subscription.current_period_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                    : subscription.next_billing_date
                                        ? new Date(subscription.next_billing_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        : 'N/A'}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onChangePlan}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary-500 hover:bg-primary-600 text-white transition-colors"
                    >
                        <TrendingUp className="w-3.5 h-3.5" />
                        {isOnTrial ? 'Upgrade Plan' : 'Change Plan'}
                    </button>

                    {subscription.status === 'active' && !isCanceled ? (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={actionLoading === 'cancel'}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 ${theme === 'dark'
                                    ? 'border-red-900/50 text-red-400 hover:bg-red-900/20'
                                    : 'border-red-200 text-red-600 hover:bg-red-50'
                                }`}
                        >
                            {actionLoading === 'cancel' ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <XCircle className="w-3.5 h-3.5" />
                            )}
                            Cancel
                        </button>
                    ) : isCanceled ? (
                        <button
                            type="button"
                            onClick={onResume}
                            disabled={actionLoading === 'resume'}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 ${theme === 'dark'
                                    ? 'border-emerald-900/50 text-emerald-400 hover:bg-emerald-900/20'
                                    : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                                }`}
                        >
                            {actionLoading === 'resume' ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                            )}
                            Resume
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default CurrentSubscriptionCard;
