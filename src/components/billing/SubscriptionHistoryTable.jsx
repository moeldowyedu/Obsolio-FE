import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import SubscriptionStatusBadge from './SubscriptionStatusBadge';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * SubscriptionHistoryTable - Compact paginated table
 */
const SubscriptionHistoryTable = ({
    history = [],
    currentPage = 1,
    lastPage = 1,
    total = 0,
    onPageChange,
    loading = false,
}) => {
    const { theme } = useTheme();

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200 shadow-sm'
            }`}>
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Subscription History
                    </h3>
                    {total > 0 && (
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                            {total} records
                        </p>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className={`text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-slate-50 text-slate-500'
                        }`}>
                        <tr>
                            <th className="px-4 py-2.5">Plan</th>
                            <th className="px-4 py-2.5">Status</th>
                            <th className="px-4 py-2.5">Cycle</th>
                            <th className="px-4 py-2.5">Start</th>
                            <th className="px-4 py-2.5">End</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5 text-gray-300' : 'divide-slate-100 text-slate-600'
                        }`}>
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <tr key={i}>
                                    {[...Array(5)].map((_, j) => (
                                        <td key={j} className="px-4 py-2.5">
                                            <div className={`h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'
                                                } animate-pulse`} style={{ width: `${60 + Math.random() * 40}%` }} />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : history.length > 0 ? (
                            history.map((item) => (
                                <tr key={item.id} className={`${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                                    } transition-colors`}>
                                    <td className="px-4 py-2.5 whitespace-nowrap">
                                        <span className="font-medium text-primary-500">
                                            {item.plan?.name || item.plan_name || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2.5 whitespace-nowrap">
                                        <SubscriptionStatusBadge
                                            status={item.status}
                                            isOnTrial={item.status === 'trialing'}
                                            size="sm"
                                        />
                                    </td>
                                    <td className="px-4 py-2.5 whitespace-nowrap capitalize">
                                        {item.billing_cycle || '-'}
                                    </td>
                                    <td className="px-4 py-2.5 whitespace-nowrap">
                                        {formatDate(item.starts_at || item.created_at)}
                                    </td>
                                    <td className="px-4 py-2.5 whitespace-nowrap">
                                        {item.canceled_at ? (
                                            <span className="text-red-500">{formatDate(item.canceled_at)}</span>
                                        ) : item.ends_at ? (
                                            formatDate(item.ends_at)
                                        ) : (
                                            <span className="text-emerald-500 font-medium">Current</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center">
                                    <Clock className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-600' : 'text-slate-300'
                                        }`} />
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                        No subscription history available
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {lastPage > 1 && (
                <div className={`px-4 py-2.5 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'
                    } flex items-center justify-between`}>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                        Page {currentPage} of {lastPage}
                    </p>
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={() => onPageChange?.(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className={`p-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark'
                                    ? 'hover:bg-white/10 text-gray-400'
                                    : 'hover:bg-slate-100 text-slate-500'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onPageChange?.(currentPage + 1)}
                            disabled={currentPage >= lastPage}
                            className={`p-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark'
                                    ? 'hover:bg-white/10 text-gray-400'
                                    : 'hover:bg-slate-100 text-slate-500'
                                }`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionHistoryTable;
