import { useTheme } from '../../contexts/ThemeContext';

/**
 * UsageProgressBar - Compact usage progress component
 */
const UsageProgressBar = ({
    label,
    used = 0,
    total = 0,
    icon: Icon,
    colorScheme = 'primary',
}) => {
    const { theme } = useTheme();

    const percentage = total > 0 ? Math.min((used / total) * 100, 100) : 0;
    const isUnlimited = total === 0 || total === null || total === undefined;
    const isWarning = percentage >= 80;
    const isCritical = percentage >= 95;

    const gradients = {
        primary: 'from-primary-500 to-indigo-500',
        blue: 'from-blue-500 to-cyan-400',
        purple: 'from-purple-500 to-pink-400',
        emerald: 'from-emerald-500 to-teal-400',
    };

    const iconColors = {
        primary: 'bg-primary-500/10 text-primary-500',
        blue: 'bg-blue-500/10 text-blue-500',
        purple: 'bg-purple-500/10 text-purple-500',
        emerald: 'bg-emerald-500/10 text-emerald-500',
    };

    const gradient = isCritical
        ? 'from-red-500 to-orange-500'
        : isWarning
            ? 'from-amber-500 to-orange-400'
            : gradients[colorScheme];

    return (
        <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#1e293b]/50 border-white/5' : 'bg-white border-slate-200 shadow-sm'
            }`}>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {Icon && (
                        <div className={`p-1.5 rounded-lg ${iconColors[colorScheme]}`}>
                            <Icon className="w-4 h-4" />
                        </div>
                    )}
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        {label}
                    </span>
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                    <span className="font-semibold">{used.toLocaleString()}</span>
                    <span className="mx-1">/</span>
                    <span>{isUnlimited ? '∞' : total.toLocaleString()}</span>
                </div>
            </div>

            {!isUnlimited && (
                <div className="w-full bg-gray-200 dark:bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                    <div
                        className={`bg-gradient-to-r ${gradient} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default UsageProgressBar;
