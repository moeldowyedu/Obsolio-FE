import { useState, useEffect } from 'react';
import subscriptionsService from '../../services/subscriptionsService';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from '../common/Button/Button';

const PaymobCheckout = ({ plan, billingCycle, onPaymentSuccess, onPaymentError }) => {
    const [loading, setLoading] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(null);
    const [error, setError] = useState(null);

    const initiatePayment = async () => {
        if (!plan) return;

        setLoading(true);
        setError(null);
        setIframeUrl(null);

        try {
            const response = await subscriptionsService.initiatePaymobPayment({
                plan_id: plan.id,
                billing_cycle: billingCycle,
            });

            if (response.success) {
                setIframeUrl(response.data.iframe_url);
            } else {
                const msg = 'Failed to initiate payment';
                setError(msg);
                if (onPaymentError) onPaymentError(msg);
            }
        } catch (err) {
            console.error('Payment initialization error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            setError(errorMessage);
            if (onPaymentError) onPaymentError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Trigger payment initiation when props are stable
        if (plan && billingCycle) {
            initiatePayment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plan.id, billingCycle]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center p-12 min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <span className="text-gray-600 font-medium">Initializing Secure Payment...</span>
                <span className="text-gray-400 text-sm mt-2">Connecting to Paymob</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-red-600 dark:text-red-400 font-medium mb-1">Payment Initialization Failed</p>
                <p className="text-sm text-red-500/80 mb-6">{error}</p>
                <Button
                    onClick={initiatePayment}
                    variant="outline"
                    className="gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                    <RotateCcw className="w-4 h-4" />
                    Retry Payment
                </Button>
            </div>
        );
    }

    if (iframeUrl) {
        return (
            <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                <iframe
                    src={iframeUrl}
                    className="w-full h-[650px] md:h-[750px] border-0"
                    title="Paymob Checkout"
                    allow="payment"
                />
            </div>
        );
    }

    return null;
};

export default PaymobCheckout;
