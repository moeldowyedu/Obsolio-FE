import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import authService from '../../services/authService';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { motion } from 'framer-motion';

const EmailVerificationPage = () => {
    const { id, hash } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email address...');

    useEffect(() => {
        const verify = async () => {
            if (!id || !hash) {
                setStatus('error');
                setMessage('Invalid verification link.');
                return;
            }

            try {
                // Laravel typically uses /email/verify/{id}/{hash} signed route structure
                // We assume authService.verifyEmail handles passing these or forming the URL
                // If authService expects a token, we might need to adjust or pass id/hash as object
                // Let's assume we pass them or a combined URL. 
                // Based on standard Laravel: POST /email/verify typically needs ID and Hash. 
                // Or GET usually. Let's send them to the service.

                await authService.verifyEmail(id, hash);
                setStatus('success');
                setMessage('Email verified successfully! Redirecting to dashboard...');

                // Redirect after success
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } catch (error) {
                console.error("Verification failed", error);
                setStatus('error');
                setMessage(error.response?.data?.message || 'Verification failed. The link may have expired.');
            }
        };

        verify();
    }, [id, hash, navigate]);

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

                <div className="glass-card p-8 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40 rounded-2xl text-center">
                    {/* Decor glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                    {status === 'verifying' && (
                        <div className="py-8">
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className="absolute inset-0 border-4 border-primary-500/30 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Verifying...</h2>
                            <p className="text-gray-400">{message}</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-8">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Verified!</h2>
                            <p className="text-gray-300 mb-6">{message}</p>

                            <Link
                                to="/dashboard"
                                className="inline-flex items-center gap-2 py-3 px-6 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all"
                            >
                                Go to Dashboard <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-8">
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
                            <p className="text-red-300 mb-8">{message}</p>

                            <Link
                                to="/resend-verification"
                                className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10"
                            >
                                Resend Verification Email
                            </Link>

                            <Link
                                to="/signin"
                                className="block mt-4 text-sm text-gray-400 hover:text-white"
                            >
                                Back to Sign In
                            </Link>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
