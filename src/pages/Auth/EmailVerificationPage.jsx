import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import authService from '../../services/authService';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { motion } from 'framer-motion';

const EmailVerificationPage = () => {
    const { id, hash } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email address...');

    const [targetUrl, setTargetUrl] = useState('/dashboard');

    useEffect(() => {
        const verify = async () => {
            if (!id || !hash) {
                setStatus('error');
                setMessage('Invalid verification link.');
                return;
            }

            try {
                // Pass query params (expires, signature) to the service
                const response = await authService.verifyEmail(id, hash, location.search);
                setStatus('success');
                setMessage('Email verified successfully! You can now access your workspace.');

                // Determine redirect URL
                // Backend might return workspace_url, or we construct it if we have tenant context
                const url = response.workspace_url || response?.data?.workspace_url || '/login';
                setTargetUrl(url);

                // Optional: Auto-redirect after short delay
                setTimeout(() => {
                    window.location.href = url;
                }, 3000);

            } catch (error) {
                console.error("Verification failed", error);
                setStatus('error');
                // Check for specific error reasons if returned
                setMessage(error.response?.data?.message || 'Verification failed. The link may have expired.');
            }
        };

        verify();
    }, [id, hash, navigate, location.search]);

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

                <div className="glass-card p-8 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40 rounded-3xl text-center">
                    {/* Decor glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                    {status === 'verifying' && (
                        <div className="py-8">
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className="absolute inset-0 border-4 border-primary-500/30 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Verifying...</h2>
                            <p className="text-gray-400">Validating your security token</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-4">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Verified!</h2>
                            <p className="text-gray-300 mb-8">{message}</p>

                            <button
                                onClick={() => window.location.href = targetUrl}
                                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/25"
                            >
                                Continue to Workspace <ArrowRight size={18} />
                            </button>

                            <p className="text-xs text-gray-500 mt-4">
                                Redirecting automatically...
                            </p>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-4">
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
                            <p className="text-red-300 mb-8">{message}</p>

                            <Link
                                to="/resend-verification"
                                className="block w-full py-3.5 px-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10"
                            >
                                Resend Verification Link
                            </Link>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
