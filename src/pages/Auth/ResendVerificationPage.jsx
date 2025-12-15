import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, ArrowRight, Loader, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import authService from '../../services/authService';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';

const ResendVerificationPage = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm(); // Using react-hook-form conceptually or manual state

    // Simplification: Manual state for specific input component compatibility if needed, 
    // but here sticking to standard 'react-hook-form' pattern used in other files if Input component supports ref forwarding.
    // If Input component is controlled, we might use state. Let's use controlled state matching standard form pattern.
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        if (!email) {
            setValidationError('Email is required');
            return;
        }

        setLoading(true);
        try {
            await authService.resendVerificationEmail(email);
            setSuccess(true);
            toast.success('Verification email sent!');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to resend email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                <div className="glass-card p-8 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40 rounded-2xl">
                    {/* Decor glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                    {!success ? (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2 text-center">Resend Verification</h2>
                            <p className="text-gray-400 mb-8 text-center">
                                Enter your email address and we'll send you a new verification link.
                            </p>

                            <form onSubmit={onSubmit} className="space-y-6">
                                <Input
                                    theme="dark"
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    icon={Mail}
                                    error={validationError}
                                    required
                                    fullWidth
                                    autoFocus
                                />

                                <Button
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                    size="lg"
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Send Verification Link
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link to="/signin" className="text-sm text-gray-500 hover:text-gray-300">
                                    Back to Sign In
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Email Sent!</h2>
                            <p className="text-gray-400 mb-8">
                                Please check your inbox for the verification link.
                            </p>
                            <Link
                                to="/signin"
                                className="block w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all"
                            >
                                Back to Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResendVerificationPage;
