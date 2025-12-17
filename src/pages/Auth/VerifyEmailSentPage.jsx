import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const VerifyEmailSentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, workspacePreview } = location.state || {};

    return (
        <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Ambience (Matched to RegisterPage) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-lg relative z-10 animate-fade-in my-4">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                {/* Content Card */}
                <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40">
                    {/* Decor glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                    <div className="text-center">
                        {/* Animated Icon */}
                        <div className="mx-auto w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mb-6 border border-primary-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] animate-pulse-slow">
                            <Mail className="w-10 h-10 text-primary-400" />
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-3">
                            Check Your Email
                        </h1>

                        <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                            We've sent a verification link to<br />
                            <span className="text-white font-medium bg-white/5 px-3 py-1 rounded-lg mt-2 inline-block border border-white/5">
                                {email || 'your email address'}
                            </span>
                        </p>

                        {/* Workspace Preview */}
                        {workspacePreview && (
                            <div className="bg-[#0f172a]/60 border border-white/10 rounded-xl p-5 mb-8 text-left relative overflow-hidden group hover:border-primary-500/30 transition-colors">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Mail className="w-24 h-24" />
                                </div>
                                <p className="text-xs text-primary-400 uppercase tracking-wider font-bold mb-1">Target Workspace</p>
                                <p className="text-gray-300 font-mono text-sm truncate relative z-10">
                                    {workspacePreview}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            {/* Button Removed as per request */}

                            <div className="flex items-center justify-between text-sm px-1 pt-2">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </button>

                                <p className="text-gray-500">
                                    Didn't receive it?{' '}
                                    <Link
                                        to="/resend-verification"
                                        state={{ email }}
                                        className="text-primary-400 hover:text-primary-300 font-medium hover:underline transition-all"
                                    >
                                        Resend
                                    </Link>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Help */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    Need help? <a href="mailto:support@obsolio.com" className="text-gray-400 hover:text-white transition-colors">Contact Support</a>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailSentPage;
