import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, ArrowRight, Loader, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import authService from '../../services/authService';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { useTheme } from '../../contexts/ThemeContext';

const ResendVerificationPage = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { theme } = useTheme();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState('');

    const navigate = useNavigate();

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
            // Handle "Email already verified" specifically
            if (error.response?.status === 400 && error.response?.data?.message?.includes('already verified')) {
                toast.success('Email already verified. Please sign in.', { duration: 4000 });
                navigate('/login');
                return;
            }
            toast.error(error.response?.data?.message || 'Failed to resend email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                {theme === 'dark' ? (
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30"></div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-200/40 via-transparent to-transparent opacity-80" />
                )}
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                <div className={`p-8 rounded-2xl relative overflow-hidden transition-all duration-300 ${theme === 'dark'
                    ? 'glass-card shadow-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/40'
                    : 'bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>

                    {/* Decor glow (Dark Only) */}
                    {theme === 'dark' && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
                    )}

                    {!success ? (
                        <>
                            <h2 className={`text-2xl font-bold mb-2 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Resend Verification</h2>
                            <p className={`mb-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                                Enter your email address and we'll send you a new verification link.
                            </p>

                            <form onSubmit={onSubmit} className="space-y-6">
                                <Input
                                    theme={theme}
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
                                <Link to="/login" className={`text-sm hover:text-gray-300 transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400 hover:text-slate-600'}`}>
                                    Back to Sign In
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100 shadow-sm'}`}>
                                <Mail className={`w-8 h-8 ${theme === 'dark' ? 'text-green-500' : 'text-green-600'}`} />
                            </div>
                            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Email Sent!</h2>
                            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                                Please check your inbox for the verification link.
                            </p>
                            <Link
                                to="/login"
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
