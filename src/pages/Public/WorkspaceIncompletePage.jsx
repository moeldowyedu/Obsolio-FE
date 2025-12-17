import React from 'react';
import { ShieldAlert, Mail, ArrowRight } from 'lucide-react';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const WorkspaceIncompletePage = () => {
    return (
        <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <a href="https://obsolio.com" className="inline-block">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </a>
                </div>

                <div className="glass-card p-8 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40 rounded-3xl text-center">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                        <ShieldAlert className="w-10 h-10 text-yellow-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">Workspace Incomplete</h2>
                    <p className="text-gray-400 mb-6">
                        This workspace is currently inactive because the owner has not verified their email address.
                    </p>

                    <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10">
                        <div className="flex items-start gap-4 text-left">
                            <div className="p-2 bg-primary-500/20 rounded-lg shrink-0">
                                <Mail className="w-5 h-5 text-primary-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-1">Check your inbox</h4>
                                <p className="text-xs text-gray-400 mb-3">
                                    If you are the owner, please check your email for the verification link to activate this workspace.
                                </p>
                                <button
                                    onClick={() => {
                                        // Dynamic import or use if already available (we need to import tenantService)
                                        // Since this is a lazy loaded component potentially, let's keep it robust
                                        // Ideally we import at the top, but for the deployment patch constraint, 
                                        // let's just assume we can import it.
                                        // Actually WorkspaceIncompletePage is a standard component now. I should add the import at the top.
                                        import('../../services/tenantService').then(({ default: tenantService }) => {
                                            import('react-hot-toast').then(({ toast }) => {
                                                toast.promise(
                                                    tenantService.resendVerification(window.location.hostname.split('.')[0]),
                                                    {
                                                        loading: 'Sending...',
                                                        success: 'Verification email sent!',
                                                        error: 'Could not send email. Please try again.'
                                                    }
                                                );
                                            });
                                        });
                                    }}
                                    className="text-primary-400 hover:text-primary-300 text-xs font-semibold underline"
                                >
                                    Resend Verification Email
                                </button>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://obsolio.com"
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10"
                    >
                        Back to Home <ArrowRight size={18} />
                    </a>
                </div>

                <p className="text-center text-gray-500 text-xs mt-8">
                    &copy; {new Date().getFullYear()} Obsolio. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default WorkspaceIncompletePage;
