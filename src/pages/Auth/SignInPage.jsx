import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowRight, Loader, Mail, AlertCircle, Building, User } from 'lucide-react';
import toast from 'react-hot-toast';
import tenantLookupService from '../../services/tenantLookupService';
import { redirectToTenantLogin } from '../../utils/tenantDetection';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const SignInPage = () => {
    // const [step, setStep] = useState('lookup'); // Removed step state
    const [loading, setLoading] = useState(false);
    // const [tenants, setTenants] = useState([]); // Removed tenants state
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Added navigate

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLookup = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await tenantLookupService.findTenant(data.email);

            if (response.success) {
                if (response.tenants.length === 0) {
                    setError('No workspace related to that account');
                } else if (response.tenants.length === 1) {
                    // Auto-redirect
                    toast.success(`Found your workspace: ${response.tenants[0].name}`);
                    redirectToTenantLogin(response.tenants[0].slug);
                } else {
                    // Redirect to selection page
                    navigate('/workspace-selection', { state: { tenants: response.tenants } });
                }
            } else {
                setError('No workspace related to that account');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Ambience (Same as LoginPage) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="text-center mb-6">
                    {/* Logo */}
                    <Link to="/" className="inline-block mb-4">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Find your workspace
                    </h2>
                    <p className="text-gray-400">
                        Enter your email to sign in.
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 text-red-400 p-4 rounded-xl flex items-center gap-2 text-sm border border-red-500/20 mb-6"
                    >
                        <AlertCircle size={16} />
                        {error}
                    </motion.div>
                )}

                <div className="glass-card p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40 rounded-xl">
                    {/* Decor glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                    <form className="space-y-6" onSubmit={handleSubmit(handleLookup)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus // Added autoFocus
                                    className={`appearance-none block w-full pl-10 px-3 py-3 border ${errors.email ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-white/10 focus:ring-primary-500 focus:border-primary-500'} rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-1 sm:text-sm bg-white/5 text-white transition-all caret-primary-500`}
                                    placeholder="you@company.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-primary-500/20 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? <Loader className="animate-spin h-5 w-5" /> : 'Continue'}
                            </button>
                        </div>
                    </form>

                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                            Get started for free
                        </Link>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
