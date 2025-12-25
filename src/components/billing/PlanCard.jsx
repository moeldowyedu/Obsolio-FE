import { motion } from 'framer-motion';
import { Check, Info, Star } from 'lucide-react';
import Button from '../common/Button/Button';
import Badge from '../common/Badge/Badge';
import { useTheme } from '../../contexts/ThemeContext';

const PlanCard = ({ plan, isAnnual, onSubscribe, isCurrentPlan, isPopular }) => {
    const { theme } = useTheme();

    const price = isAnnual ? plan.price_annual : plan.price_monthly;
    const period = isAnnual ? '/year' : '/month';

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 hover:border-primary-500/50 hover:bg-gray-800'
                    : 'bg-white border-slate-200 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10'
                } ${isPopular ? 'ring-2 ring-primary-500 border-transparent' : ''}`}
        >
            {/* Featured Badge */}
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-0 shadow-lg px-4 py-1">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Most Popular
                    </Badge>
                </div>
            )}

            {/* Header */}
            <div className="mb-6 text-center">
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        ${price}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                        {period}
                    </span>
                </div>
                {isAnnual && (
                    <span className="text-xs text-green-500 font-medium mt-1 block">
                        Save ${(plan.price_monthly * 12 - plan.price_annual).toFixed(0)} yearly
                    </span>
                )}
            </div>

            {/* Features */}
            <div className="flex-1 mb-8">
                <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <div className={`mt-1 rounded-full p-0.5 ${theme === 'dark' ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-50 text-primary-600'}`}>
                                <Check className="w-3 h-3" />
                            </div>
                            <span className={`text-sm leading-tight ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Limits Summary (Optional visualization of limits) */}
                {plan.limits && (
                    <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-slate-100'}`}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{plan.limits.max_agents || plan.max_agents}</div>
                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>Agents</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{plan.limits.max_users || plan.max_users}</div>
                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>Users</div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Action Button */}
            <Button
                variant={isCurrentPlan ? 'outline' : 'primary'}
                disabled={isCurrentPlan}
                onClick={() => onSubscribe(plan)}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${isCurrentPlan
                        ? 'opacity-75 cursor-default'
                        : isPopular
                            ? 'shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
                            : ''
                    }`}
            >
                {isCurrentPlan ? 'Current Plan' : 'Subscribe Now'}
            </Button>
        </motion.div>
    );
};

export default PlanCard;
