import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader, Mail } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            if (!token) {
                setError('Invalid verification link');
                setStatus('error');
                return;
            }

            try {
                const apiUrl = atob(token);
                console.log('Verifying email via:', apiUrl);

                // Using fetch directly as requested by the user logic
                // We use 'manual' redirect to inspect response if possible, OR just let browser handle it.
                // User guide says: "The API will return a redirect response with `workspace` parameter... Parse the redirect location"
                // Standard JS fetch follows redirects transparently. 
                // If the backend returns a 302 to a new URL, `response.url` will be that new URL.
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    // credentials: 'include', // Ensure cookies are sent if needed
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Scenario A: Backend returns 200 OK with JSON containing workspace_url
                    const data = await response.json().catch(() => ({}));
                    setStatus('success');

                    const targetUrl = data.workspace_url || data.url || response.url; // Fallback to response URL if it changed

                    setTimeout(() => {
                        if (targetUrl && targetUrl !== window.location.href) {
                            window.location.href = targetUrl;
                        } else {
                            navigate('/login');
                        }
                    }, 2000);
                } else if (response.redirected) {
                    // Scenario B: Backend redirected (302) and fetch followed it to a success page
                    setStatus('success');
                    setTimeout(() => {
                        window.location.href = response.url;
                    }, 2000);
                } else {
                    // Scenario C: Error
                    const data = await response.json().catch(() => ({}));
                    setError(data.message || 'Verification failed. Please try again.');
                    setStatus('error');
                }

            } catch (err) {
                console.error('Verification error:', err);
                setError('An error occurred during verification.');
                setStatus('error');
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

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

                    {status === 'verifying' && (
                        <div className="text-center py-8">
                            <Loader className={`w-12 h-12 animate-spin mx-auto mb-4 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
                            <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Verifying your email...</h2>
                            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Please wait a moment</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="text-center py-8">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'}`}>
                                <CheckCircle className={`w-8 h-8 ${theme === 'dark' ? 'text-green-500' : 'text-green-600'}`} />
                            </div>
                            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Email Verified!</h2>
                            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                                Your email has been successfully verified. Redirecting you to your workspace...
                            </p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="text-center py-8">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'}`}>
                                <XCircle className={`w-8 h-8 ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`} />
                            </div>
                            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Verification Failed</h2>
                            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                                {error}
                            </p>
                            <Link
                                to="/resend-verification"
                                className={`inline-block px-6 py-2 rounded-lg font-medium transition-colors ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
                            >
                                Resend Verification Link
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
