import { useState } from 'react';
import { X, AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '../common/Button/Button';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * CancelSubscriptionModal
 * Confirmation modal for canceling subscription with optional reason
 */
const CancelSubscriptionModal = ({
    isOpen,
    onClose,
    onConfirm,
    subscriptionEndDate,
    loading = false,
}) => {
    const { theme } = useTheme();
    const [reason, setReason] = useState('');
    const [selectedReason, setSelectedReason] = useState('');

    const cancellationReasons = [
        { value: 'too_expensive', label: 'Too expensive' },
        { value: 'not_using', label: 'Not using it enough' },
        { value: 'missing_features', label: 'Missing features I need' },
        { value: 'switching_competitor', label: 'Switching to a competitor' },
        { value: 'temporary', label: 'Just need a break' },
        { value: 'other', label: 'Other reason' },
    ];

    const handleConfirm = () => {
        onConfirm?.({
            reason: selectedReason,
            feedback: reason,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-[#0B0E14] border border-white/10' : 'bg-white'
                }`}>
                {/* Header */}
                <div className={`p-6 border-b ${theme === 'dark'
                        ? 'border-white/10 bg-gradient-to-br from-red-500/10 to-orange-500/5'
                        : 'border-slate-100 bg-gradient-to-br from-red-50 to-orange-50'
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
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                Cancel Subscription?
                            </h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                We're sorry to see you go
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Warning */}
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-100'
                        }`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-800'}`}>
                            Your subscription will remain active until{' '}
                            <strong>
                                {subscriptionEndDate
                                    ? new Date(subscriptionEndDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })
                                    : 'the end of your billing period'}
                            </strong>.
                            After that, you'll lose access to premium features.
                        </p>
                    </div>

                    {/* Reason Selection */}
                    <div>
                        <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                            }`}>
                            Why are you canceling? (Optional)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {cancellationReasons.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setSelectedReason(item.value)}
                                    className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${selectedReason === item.value
                                            ? 'bg-primary-500/10 border-primary-500 text-primary-500 border-2'
                                            : theme === 'dark'
                                                ? 'bg-white/5 border border-white/10 text-gray-300 hover:border-white/20'
                                                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Additional Feedback */}
                    {selectedReason === 'other' && (
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                                }`}>
                                Tell us more
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="What could we do better?"
                                rows={3}
                                className={`w-full px-4 py-3 rounded-xl border transition-colors ${theme === 'dark'
                                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-primary-500'
                                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-500'
                                    } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`p-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                    <div className="flex gap-3">
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="flex-1"
                            disabled={loading}
                        >
                            Keep Subscription
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            variant="primary"
                            className="flex-1 bg-red-500 hover:bg-red-600 shadow-red-500/25"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Canceling...
                                </>
                            ) : (
                                'Confirm Cancel'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelSubscriptionModal;
