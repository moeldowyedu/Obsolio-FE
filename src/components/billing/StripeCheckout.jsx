import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../common/Button/Button';
import subscriptionsService from '../../services/subscriptionsService';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { AlertCircle, Lock } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ clientSecret, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const { theme } = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL where Stripe redirects after payment
                return_url: `${window.location.origin}/billing/callback`,
            },
            redirect: 'if_required', // Handle success without redirect if possible (optional)
        });

        if (error) {
            setMessage(error.message);
            // On error also call backend if needed? Usually not for simple declines.
            if (onError) onError(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Success
            toast.success("Payment successful!");
            if (onSuccess) onSuccess(paymentIntent);
        } else {
            // Other status
            setMessage("Payment processing...");
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PaymentElement
                options={{
                    theme: theme === 'dark' ? 'night' : 'stripe',
                    variables: {
                        colorPrimary: '#3b82f6',
                        colorBackground: theme === 'dark' ? '#1e293b' : '#ffffff',
                        colorText: theme === 'dark' ? '#ffffff' : '#1e293b',
                    }
                }}
            />

            {message && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {message}
                </div>
            )}

            <Button
                type="submit"
                disabled={!stripe || processing}
                className="w-full mt-6"
                isLoading={processing}
            >
                <Lock className="w-4 h-4 mr-2" />
                {processing ? 'Processing...' : 'Pay Now'}
            </Button>

            <div className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Payments secured by Stripe
            </div>
        </form>
    );
};

const StripeCheckout = ({ amount, currency = 'usd', planId, onSuccess }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (planId) {
            subscriptionsService.createPaymentIntent({ planId, amount, currency })
                .then(data => setClientSecret(data.clientSecret))
                .catch(err => setError("Failed to initialize payment"));
        }
    }, [planId, amount, currency]);

    const handleSuccess = async (paymentIntent) => {
        // Confirm on backend
        try {
            await subscriptionsService.confirmPayment(paymentIntent.id);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Failed to confirm payment on backend", err);
            toast.error("Payment confirmation failed.");
        }
    };

    if (error) {
        return (
            <div className="text-center p-6 text-red-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p>{error}</p>
            </div>
        );
    }

    if (!clientSecret) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    const options = {
        clientSecret,
        appearance: {
            theme: theme === 'dark' ? 'night' : 'stripe',
        },
    };

    return (
        <div className={`w-full max-w-md mx-auto p-6 rounded-2xl border shadow-lg ${theme === 'dark' ? 'bg-[#0B0E14] border-white/10' : 'bg-white border-slate-200'}`}>
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} onSuccess={handleSuccess} />
            </Elements>
        </div>
    );
};

export default StripeCheckout;
