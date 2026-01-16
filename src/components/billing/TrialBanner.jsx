import { Sparkles, ArrowUpRight, Clock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * TrialBanner - Compact trial information banner
 */
const TrialBanner = ({ trialDaysRemaining, trialEndsAt, onUpgrade }) => {
    const { theme } = useTheme();

    if (trialDaysRemaining === null || trialDaysRemaining === undefined) return null;

    const isUrgent = trialDaysRemaining <= 3;
    const isExpired = trialDaysRemaining <= 0;

    return (
        <div className={`relative overflow-hidden rounded-xl px-4 py-3 ${isUrgent
                ? 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20'
                : 'bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20'
            }`}>
            <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isUrgent ? 'bg-amber-500/20' : 'bg-blue-500/20'}`}>
                        {isExpired ? (
                            <Clock className={`w-4 h-4 ${isUrgent ? 'text-amber-500' : 'text-blue-500'}`} />
                        ) : (
                            <Sparkles className={`w-4 h-4 ${isUrgent ? 'text-amber-500' : 'text-blue-500'}`} />
                        )}
                    </div>
                    <div>
                        <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {isExpired
                                ? 'Your trial has expired!'
                                : trialDaysRemaining === 1
                                    ? 'Last day of your trial!'
                                    : `${trialDaysRemaining} days left in your trial`}
                        </h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                            {isExpired || isUrgent
                                ? 'Upgrade now to keep all your features.'
                                : 'Explore all premium features before your trial ends.'}
                            {trialEndsAt && (
                                <span className="ml-2 opacity-70">
                                    Trial ends: {new Date(trialEndsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onUpgrade}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isUrgent
                            ? 'bg-amber-500 hover:bg-amber-600 text-white'
                            : 'bg-primary-500 hover:bg-primary-600 text-white'
                        }`}
                >
                    Upgrade Now
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};

export default TrialBanner;
