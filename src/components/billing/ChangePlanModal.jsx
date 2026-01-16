import { useState, useEffect } from 'react';
import { X, Check, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../common/Button/Button';
import subscriptionsService from '../../services/subscriptionsService';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/formatters';

const ChangePlanModal = ({ isOpen, onClose, currentPlanId, onPlanChanged }) => {
    const { theme } = useTheme();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [billingCycle, setBillingCycle] = useState('monthly');

    useEffect(() => {
        if (isOpen) {
            const fetchPlans = async () => {
                try {
                    setLoading(true);
                    const response = await subscriptionsService.getPlans();

                    // Handle various API response formats
                    // API returns: { success: true, data: { Enterprise: [...], Professional: [...], Starter: [...] } }
                    let plansData = [];
                    const rawData = response?.data || response;

                    if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
                        // Check if it's a grouped structure (keys are tier names like Enterprise, Professional, etc)
                        const keys = Object.keys(rawData);
                        const isGrouped = keys.some(key => Array.isArray(rawData[key]));

                        if (isGrouped) {
                            // Flatten grouped structure: { Starter: [...], Professional: [...] } -> [...]
                            Object.values(rawData).forEach(tierPlans => {
                                if (Array.isArray(tierPlans)) {
                                    plansData.push(...tierPlans);
                                }
                            });
                        } else if (rawData.data && Array.isArray(rawData.data)) {
                            plansData = rawData.data;
                        }
                    } else if (Array.isArray(rawData)) {
                        plansData = rawData;
                    }

                    // Sort by display_order then by base_price
                    plansData.sort((a, b) => {
                        const orderA = a.display_order || 999;
                        const orderB = b.display_order || 999;
                        if (orderA !== orderB) return orderA - orderB;

                        const priceA = parseFloat(a.base_price) || parseFloat(a.price_monthly) || 0;
                        const priceB = parseFloat(b.base_price) || parseFloat(b.price_monthly) || 0;
                        return priceA - priceB;
                    });

                    setPlans(plansData);
                } catch (error) {
                    console.error("Failed to load plans", error);
                    toast.error("Failed to load plans");
                    setPlans([]);
                } finally {
                    setLoading(false);
                }
            };
            fetchPlans();
            setSelectedPlanId(null); // Reset selection when modal opens
        }
    }, [isOpen]);

    const handlePlanSelect = (planId) => {
        if (planId !== currentPlanId) {
            setSelectedPlanId(planId);
        }
    };

    const handleSubmit = async () => {
        if (!selectedPlanId) return;

        setProcessing(true);
        try {
            await subscriptionsService.changePlan({
                plan_id: selectedPlanId,
                billing_cycle: billingCycle
            });
            toast.success("Plan changed successfully!");
            if (onPlanChanged) onPlanChanged();
            onClose();
        } catch (error) {
            console.error("Failed to change plan", error);
            toast.error(error.response?.data?.message || "Failed to change plan");
        } finally {
            setProcessing(false);
        }
    };

    // Determine if selected plan is upgrade or downgrade
    const getActionType = () => {
        if (!selectedPlanId || !currentPlanId) return 'select';
        const currentPlan = plans.find(p => p.id === currentPlanId);
        const selectedPlan = plans.find(p => p.id === selectedPlanId);
        if (!currentPlan || !selectedPlan) return 'change';

        const currentPrice = currentPlan.base_price || currentPlan.price_monthly || 0;
        const selectedPrice = selectedPlan.base_price || selectedPlan.price_monthly || 0;

        if (selectedPrice > currentPrice) return 'upgrade';
        if (selectedPrice < currentPrice) return 'downgrade';
        return 'change';
    };

    const actionType = getActionType();
    const actionLabels = {
        select: 'Select Plan',
        change: 'Confirm Change',
        upgrade: 'Upgrade Plan',
        downgrade: 'Downgrade Plan',
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-[#0B0E14] border border-white/10' : 'bg-white'
                }`}>

                {/* Header */}
                <div className={`sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b ${theme === 'dark' ? 'bg-[#0B0E14] border-white/5' : 'bg-white border-slate-100'
                    }`}>
                    <div>
                        <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Change Plan
                        </h2>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                            Choose a plan that fits your needs
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-slate-100 text-slate-500'
                            }`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-5">
                        <div className={`p-1 rounded-lg flex items-center ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'
                            }`}>
                            <button
                                type="button"
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${billingCycle === 'monthly'
                                    ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white text-slate-900 shadow-sm')
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                type="button"
                                onClick={() => setBillingCycle('annual')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${billingCycle === 'annual'
                                    ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white text-slate-900 shadow-sm')
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                Annual <span className="text-emerald-500 text-xs ml-1">Save 17%</span>
                            </button>
                        </div>
                    </div>

                    {/* Plans Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-64 rounded-xl bg-gray-100 dark:bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : plans.length === 0 ? (
                        <div className={`text-center py-12 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                            }`}>
                            <Sparkles className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>
                                No plans available at the moment
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {plans
                                .filter(plan => {
                                    // Filter plans to show only ones matching selected billing cycle
                                    const planCycle = plan.billing_cycle?.code || (plan.price_monthly ? 'monthly' : 'annual');
                                    return planCycle === billingCycle;
                                })
                                .map((plan) => {
                                    const isCurrent = plan.id === currentPlanId;
                                    const isSelected = plan.id === selectedPlanId;

                                    // Get price based on billing cycle
                                    const monthlyPrice = plan.base_price || plan.price_monthly || plan.final_price || 0;
                                    const annualPrice = plan.price_annual || (monthlyPrice * 10); // 2 months free
                                    const displayPrice = billingCycle === 'annual' ? annualPrice : monthlyPrice;

                                    // Get features
                                    const features = plan.features || [];

                                    return (
                                        <div
                                            key={plan.id}
                                            onClick={() => handlePlanSelect(plan.id)}
                                            className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isCurrent
                                                ? (theme === 'dark'
                                                    ? 'bg-white/5 border-gray-600 cursor-default opacity-60'
                                                    : 'bg-gray-50 border-gray-300 cursor-default opacity-60')
                                                : isSelected
                                                    ? 'border-primary-500 bg-primary-500/5 ring-2 ring-primary-500/20'
                                                    : (theme === 'dark'
                                                        ? 'bg-[#1e293b]/50 border-white/10 hover:border-white/30'
                                                        : 'bg-white border-slate-200 hover:border-primary-300')
                                                }`}
                                        >
                                            {/* Badge */}
                                            {isCurrent && (
                                                <div className="absolute top-3 right-3">
                                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                        Current
                                                    </span>
                                                </div>
                                            )}
                                            {isSelected && !isCurrent && (
                                                <div className="absolute top-3 right-3">
                                                    <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                            {plan.is_popular && !isCurrent && !isSelected && (
                                                <div className="absolute top-3 right-3">
                                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-500 text-white">
                                                        Popular
                                                    </span>
                                                </div>
                                            )}

                                            {/* Plan Name */}
                                            <h3 className={`text-base font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                                }`}>
                                                {plan.name}
                                            </h3>

                                            {/* Description */}
                                            {plan.description && (
                                                <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                                                    }`}>
                                                    {plan.description}
                                                </p>
                                            )}

                                            {/* Price */}
                                            <div className="mb-4">
                                                <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                                    }`}>
                                                    {formatCurrency(displayPrice)}
                                                </span>
                                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                                                    }`}>
                                                    /{billingCycle === 'annual' ? 'yr' : 'mo'}
                                                </span>
                                            </div>

                                            {/* Features */}
                                            {features.length > 0 && (
                                                <ul className="space-y-1.5">
                                                    {features.slice(0, 5).map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-xs">
                                                            <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                            <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    ))}
                                                    {features.length > 5 && (
                                                        <li className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                                                            +{features.length - 5} more features
                                                        </li>
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`sticky bottom-0 px-5 py-4 border-t flex items-center justify-between ${theme === 'dark' ? 'bg-[#0B0E14] border-white/5' : 'bg-white border-slate-100'
                    }`}>
                    <div>
                        {selectedPlanId && (
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                {actionType === 'upgrade' && (
                                    <span className="flex items-center gap-1 text-emerald-500">
                                        <TrendingUp className="w-4 h-4" /> Upgrading to a better plan
                                    </span>
                                )}
                                {actionType === 'downgrade' && (
                                    <span className="flex items-center gap-1 text-amber-500">
                                        <TrendingDown className="w-4 h-4" /> Downgrading to a smaller plan
                                    </span>
                                )}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark'
                                ? 'text-gray-300 hover:bg-white/10'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!selectedPlanId || processing || selectedPlanId === currentPlanId}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${actionType === 'downgrade'
                                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                : 'bg-primary-500 hover:bg-primary-600 text-white'
                                }`}
                        >
                            {processing ? (
                                <span className="animate-spin">⏳</span>
                            ) : actionType === 'upgrade' ? (
                                <TrendingUp className="w-4 h-4" />
                            ) : actionType === 'downgrade' ? (
                                <TrendingDown className="w-4 h-4" />
                            ) : null}
                            {actionLabels[actionType]}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePlanModal;
