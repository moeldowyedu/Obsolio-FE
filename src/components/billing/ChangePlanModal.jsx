import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../common/Button/Button';
import subscriptionsService from '../../services/subscriptionsService';
import toast from 'react-hot-toast';

const ChangePlanModal = ({ isOpen, onClose, currentPlanId, onPlanChanged }) => {
    const { theme } = useTheme();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

    useEffect(() => {
        if (isOpen) {
            const fetchPlans = async () => {
                try {
                    setLoading(true);
                    const response = await subscriptionsService.getPlans();
                    if (response.success) {
                        setPlans(response.data);
                    }
                } catch (error) {
                    console.error("Failed to load plans", error);
                    toast.error("Failed to load plans");
                } finally {
                    setLoading(false);
                }
            };
            fetchPlans();
        }
    }, [isOpen]);

    const handlePlanSelect = (planId) => {
        setSelectedPlanId(planId);
    };

    const handleSubmit = async () => {
        if (!selectedPlanId) return;

        setProcessing(true);
        try {
            await subscriptionsService.changePlan({
                planId: selectedPlanId,
                billingCycle: billingCycle
            });
            toast.success("Plan updated successfully");
            if (onPlanChanged) onPlanChanged();
            onClose();
        } catch (error) {
            console.error("Failed to change plan", error);
            toast.error("Failed to update plan");
        } finally {
            setProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${theme === 'dark' ? 'bg-[#0B0E14] border border-white/10' : 'bg-white'}`}>

                {/* Header */}
                <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'bg-[#0B0E14] border-white/5' : 'bg-white border-slate-100'}`}>
                    <div>
                        <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Change Subscription Plan</h2>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Choose a plan that fits your needs</p>
                    </div>
                    <button onClick={onClose} className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors`}>
                        <X className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-8">
                        <div className={`p-1 rounded-xl flex items-center ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${billingCycle === 'monthly'
                                    ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm')
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${billingCycle === 'annual'
                                    ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm')
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                                Annual
                            </button>
                        </div>
                    </div>

                    {/* Plans Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => <div key={i} className="h-96 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {plans.map(plan => {
                                const isCurrent = plan.id === currentPlanId;
                                const isSelected = plan.id === selectedPlanId;
                                const price = billingCycle === 'annual' ? plan.price_annual : plan.price_monthly; // Adjust based on API field names

                                return (
                                    <div
                                        key={plan.id}
                                        onClick={() => !isCurrent && handlePlanSelect(plan.id)}
                                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isCurrent
                                                ? (theme === 'dark' ? 'bg-white/5 border-gray-600 opacity-60' : 'bg-gray-50 border-gray-300 opacity-60 cursor-default')
                                                : isSelected
                                                    ? 'border-primary-500 bg-primary-500/5 ring-4 ring-primary-500/10'
                                                    : (theme === 'dark' ? 'bg-[#1e293b]/50 border-white/5 hover:border-white/20' : 'bg-white border-slate-200 hover:border-primary-200')
                                            }`}
                                    >
                                        {isCurrent && (
                                            <div className="absolute top-4 right-4">
                                                <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300`}>Current</span>
                                            </div>
                                        )}
                                        {isSelected && (
                                            <div className="absolute top-4 right-4">
                                                <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}

                                        <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                                        <div className="mb-4">
                                            <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>${price}</span>
                                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>/{billingCycle === 'annual' ? 'yr' : 'mo'}</span>
                                        </div>

                                        <ul className="space-y-3 mb-8">
                                            {plan.features?.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm">
                                                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`p-6 border-t flex items-center justify-end gap-3 ${theme === 'dark' ? 'bg-[#0B0E14] border-white/5' : 'bg-white border-slate-100'}`}>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedPlanId || processing || selectedPlanId === currentPlanId}
                        isLoading={processing}
                    >
                        Confirm Change
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChangePlanModal;
