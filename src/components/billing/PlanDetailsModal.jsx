import { X, Crown, Check, Sparkles, Calendar } from 'lucide-react';
import Button from '../common/Button/Button';
import SubscriptionStatusBadge from './SubscriptionStatusBadge';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/formatters';

/**
 * PlanDetailsModal
 * Shows detailed information about the current subscription plan
 */
const PlanDetailsModal = ({
    isOpen,
    onClose,
    subscription,
    onChangePlan,
}) => {
    const { theme } = useTheme();

    if (!isOpen || !subscription) return null;

    const plan = subscription.plan || {};
    const isOnTrial = subscription.status === 'trialing' || subscription.is_on_trial;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-[#0B0E14] border border-white/10' : 'bg-white'
                }`}>
                {/* Header */}
                <div className={`relative p-6 border-b ${theme === 'dark'
                        ? 'border-white/10 bg-gradient-to-br from-primary-500/10 to-purple-500/5'
                        : 'border-slate-100 bg-gradient-to-br from-primary-50 to-purple-50'
                    }`}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-slate-100 text-slate-500'
                            }`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <Crown className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    {plan.name || 'Current Plan'}
                                </h3>
                                <SubscriptionStatusBadge status={subscription.status} isOnTrial={isOnTrial} size="sm" />
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                {plan.description || 'Your active subscription plan'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                    {/* Subscription Info Grid */}
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>Status</p>
                                <p className={`font-semibold capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                                    {subscription.status}
                                </p>
                            </div>
                            <div>
                                <p className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>Billing Cycle</p>
                                <p className={`font-semibold capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                                    {subscription.billing_cycle || 'Monthly'}
                                </p>
                            </div>
                            <div>
                                <p className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>Started</p>
                                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                                    {subscription.starts_at
                                        ? new Date(subscription.starts_at).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>
                                    {subscription.canceled_at ? 'Ends' : 'Renews'}
                                </p>
                                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                                    {subscription.current_period_end
                                        ? new Date(subscription.current_period_end).toLocaleDateString()
                                        : subscription.ends_at
                                            ? new Date(subscription.ends_at).toLocaleDateString()
                                            : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Trial Info */}
                    {subscription.trial_ends_at && (
                        <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'
                            }`}>
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                                        Trial Period
                                    </p>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                        Ends on {new Date(subscription.trial_ends_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pricing */}
                    {(plan.base_price || plan.final_price) && (
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    {formatCurrency(plan.final_price || plan.base_price || 0)}
                                </span>
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>
                                    /{subscription.billing_cycle === 'annual' ? 'year' : 'month'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Plan Features */}
                    {plan.features && plan.features.length > 0 && (
                        <div>
                            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                                }`}>
                                Plan Features
                            </h4>
                            <ul className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-emerald-500" />
                                        </div>
                                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Execution Usage */}
                    {(subscription.execution_quota > 0 || subscription.executions_used > 0) && (
                        <div>
                            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                                }`}>
                                Execution Usage
                            </h4>
                            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>
                                        {(subscription.executions_used || 0).toLocaleString()} used
                                    </span>
                                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>
                                        of {(subscription.execution_quota || 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700/50 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-primary-500 to-purple-500 h-full rounded-full transition-all"
                                        style={{
                                            width: `${Math.min((subscription.executions_used || 0) / (subscription.execution_quota || 1) * 100, 100)}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Auto Renew */}
                    <div className="flex items-center justify-between">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>Auto-Renew</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${subscription.auto_renew !== false
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : 'bg-red-500/10 text-red-500'
                            }`}>
                            {subscription.auto_renew !== false ? 'Enabled' : 'Disabled'}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className={`p-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                    <div className="flex gap-3">
                        <Button onClick={onClose} variant="outline" className="flex-1">
                            Close
                        </Button>
                        <Button onClick={onChangePlan} variant="primary" className="flex-1">
                            Change Plan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDetailsModal;
