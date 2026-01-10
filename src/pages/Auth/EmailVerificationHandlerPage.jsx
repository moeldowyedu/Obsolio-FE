import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * EmailVerificationHandlerPage
 *
 * Handles email verification links with query parameters format:
 * /verify-email?id=2&hash=xxx&expires=xxx&signature=xxx
 *
 * This component redirects the browser to the backend verification endpoint.
 * The backend will process the verification and redirect back to:
 * - /verification-success?workspace={url} (on success)
 * - /verification-failed?reason={reason} (on failure)
 */
const EmailVerificationHandlerPage = () => {
    const [searchParams] = useSearchParams();
    const { theme } = useTheme();

    useEffect(() => {
        // Extract all query parameters
        const id = searchParams.get('id');
        const hash = searchParams.get('hash');
        const expires = searchParams.get('expires');
        const signature = searchParams.get('signature');

        // Validate required parameters
        if (!id || !hash || !expires || !signature) {
            console.error('Missing verification parameters');
            window.location.href = '/verification-failed?reason=invalid_link';
            return;
        }

        // Construct the backend verification URL
        // The backend will handle verification and redirect back to the frontend
        const backendUrl = `https://api.obsolio.com/api/v1/auth/verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`;

        console.log('Redirecting to backend for verification:', backendUrl);

        // Redirect browser to backend (backend will redirect back to frontend)
        window.location.href = backendUrl;

    }, [searchParams]);

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                {theme === 'dark' ? (
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30"></div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-200/40 via-transparent to-transparent opacity-80" />
                )}
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                </div>

                {/* Card */}
                <div className={`rounded-3xl p-8 text-center transition-all duration-300 ${theme === 'dark'
                    ? 'glass-card shadow-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/40'
                    : 'bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>

                    {/* Loading State */}
                    <div className="py-8">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className={`absolute inset-0 border-4 rounded-full ${theme === 'dark' ? 'border-primary-500/30' : 'border-primary-200'}`}></div>
                            <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Verifying Your Email
                        </h2>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>
                            Please wait while we verify your email address...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationHandlerPage;
