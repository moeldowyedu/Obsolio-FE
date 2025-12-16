import { useLocation, Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const VerifyEmailSentPage = () => {
    const location = useLocation();
    const { email, workspacePreview } = location.state || {};

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-white/10 glass-card">
                <div className="text-center">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="OBSOLIO" className="h-12" />
                    </div>

                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-primary-900/40 rounded-full flex items-center justify-center mb-6 border border-primary-500/30">
                        <Mail className="w-8 h-8 text-primary-400" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white mb-3">
                        Check Your Email
                    </h1>

                    {/* Message */}
                    <p className="text-gray-400 mb-6">
                        We've sent a verification link to:
                    </p>
                    <p className="text-lg font-semibold text-white mb-6 bg-white/5 py-2 px-4 rounded-lg inline-block">
                        {email || 'your email address'}
                    </p>

                    {workspacePreview && (
                        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-400 mb-2">
                                Your workspace will be available at:
                            </p>
                            <p className="font-mono text-blue-400 truncate">
                                {workspacePreview}
                            </p>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="text-left bg-gray-900/50 rounded-lg p-4 mb-6 border border-white/5">
                        <p className="text-sm text-gray-400 mb-2 font-semibold">
                            Next steps:
                        </p>
                        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                            <li>Check your email inbox</li>
                            <li>Click the verification link</li>
                            <li>Start using your workspace</li>
                        </ol>
                    </div>

                    {/* Resend Link */}
                    <p className="text-sm text-gray-400 mb-6">
                        Didn't receive the email?{' '}
                        <Link
                            to="/resend-verification"
                            state={{ email }}
                            className="text-primary-400 hover:text-primary-300 hover:underline transition-colors"
                        >
                            Resend verification email
                        </Link>
                    </p>

                    {/* Back to Home */}
                    <Button
                        variant="outline"
                        className="w-full text-white border-white/10 hover:bg-white/5"
                        onClick={() => window.location.href = '/'}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailSentPage;
