import { CheckCircle, Clock, XCircle, AlertCircle, Sparkles } from 'lucide-react';

/**
 * SubscriptionStatusBadge
 * Displays subscription status with appropriate color and icon
 * Statuses: trialing, active, canceled, past_due, suspended
 */
const SubscriptionStatusBadge = ({ status, isOnTrial = false, size = 'md' }) => {
    const configs = {
        trialing: {
            bg: 'bg-blue-500/10',
            text: 'text-blue-500',
            border: 'border-blue-500/20',
            icon: Sparkles,
            label: 'Trial'
        },
        active: {
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-500',
            border: 'border-emerald-500/20',
            icon: CheckCircle,
            label: 'Active'
        },
        canceled: {
            bg: 'bg-gray-500/10',
            text: 'text-gray-500',
            border: 'border-gray-500/20',
            icon: XCircle,
            label: 'Canceled'
        },
        past_due: {
            bg: 'bg-red-500/10',
            text: 'text-red-500',
            border: 'border-red-500/20',
            icon: AlertCircle,
            label: 'Past Due'
        },
        suspended: {
            bg: 'bg-amber-500/10',
            text: 'text-amber-500',
            border: 'border-amber-500/20',
            icon: Clock,
            label: 'Suspended'
        },
    };

    // Override status if on trial
    const displayStatus = isOnTrial ? 'trialing' : status;
    const config = configs[displayStatus] || configs.active;
    const Icon = config.icon;

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-2.5 py-1 text-xs gap-1.5',
        lg: 'px-3 py-1.5 text-sm gap-2',
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-3.5 h-3.5',
        lg: 'w-4 h-4',
    };

    return (
        <span className={`inline-flex items-center rounded-full font-bold uppercase tracking-wide border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}>
            <Icon className={iconSizes[size]} />
            {config.label}
        </span>
    );
};

export default SubscriptionStatusBadge;
