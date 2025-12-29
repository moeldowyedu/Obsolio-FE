import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building, User, Loader, Sun, Moon } from 'lucide-react';
import { redirectToTenantLogin } from '../../utils/tenantDetection';
import { useAuthStore } from '../../store/authStore';
import tenantLookupService from '../../services/tenantLookupService';
import logo from '../../assets/imgs/OBSOLIO-logo-light.png';
import logoDark from '../../assets/imgs/OBSOLIO-logo-new.png'; // Updated asset name
import { useTheme } from '../../contexts/ThemeContext';

const WorkspaceSelectionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const loadTenants = async () => {
            // If tenants passed via state (from sign-in flow), use them
            if (location.state?.tenants) {
                setTenants(location.state.tenants);
                setLoading(false);
                return;
            }

            // If user is authenticated, fetch their tenants
            if (isAuthenticated && user?.email) {
                try {
                    setLoading(true);
                    const response = await tenantLookupService.findTenant(user.email);

                    if (response.success && response.tenants?.length > 0) {
                        setTenants(response.tenants);
                    } else {
                        setError('No workspaces found for your account');
                    }
                } catch (err) {
                    console.error('Failed to fetch tenants:', err);
                    setError('Failed to load workspaces');
                } finally {
                    setLoading(false);
                }
            } else {
                // Not authenticated and no state - redirect to signin
                navigate('/signin');
            }
        };

        loadTenants();
    }, [location, navigate, isAuthenticated, user]);

    const handleSelectTenant = (tenant) => {
        redirectToTenantLogin(tenant.slug);
    };

    // Show loading state
    if (loading) {
        return (
            <div className={`min-h-screen relative flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
                <div className="text-center">
                    <Loader className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Loading your workspaces...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className={`absolute top-6 right-6 p-2 rounded-lg transition-all z-50 ${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Background Ambience */}
            {theme === 'dark' ? (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
            ) : (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-60 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
                </div>
            )}

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    {/* Logo */}
                    <div className="inline-block mb-4">
                        <img src={theme === 'dark' ? logoDark : logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </div>
                    <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Select your workspace
                    </h2>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                        Found {tenants.length} workspaces for your email.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-400 p-4 rounded-xl flex items-center gap-2 text-sm border border-red-500/20 mb-6">
                        <span>{error}</span>
                    </div>
                )}

                <div className={`p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl rounded-xl transition-all ${theme === 'dark' ? 'glass-card border border-white/10 bg-[#1e293b]/40' : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'}`}>
                    {/* Decor glow - Only Dark */}
                    {theme === 'dark' && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
                    )}

                    <div className="space-y-4">
                        {tenants.map(tenant => {
                            const fullUrl = `${tenant.slug}.${window.location.hostname.includes('localhost') ? 'localhost:5173' : 'obsolio.com'}`;

                            return (
                                <motion.button
                                    key={tenant.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => handleSelectTenant(tenant)}
                                    className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all group text-left
                                        ${theme === 'dark'
                                            ? 'border-white/10 bg-white/5 hover:bg-white/10'
                                            : 'border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:-translate-y-0.5'
                                        }`}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`p-2 rounded-lg ${tenant.type === 'ORGANIZATION' ? 'bg-purple-500/20 text-purple-400' : 'bg-primary-500/20 text-primary-400'}`}>
                                            {tenant.type === 'ORGANIZATION' ? <Building size={20} /> : <User size={20} />}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{tenant.name}</h3>
                                            <p className={`text-sm transition-colors font-mono ${theme === 'dark' ? 'text-primary-400 group-hover:text-primary-300' : 'text-slate-500 group-hover:text-primary-600'}`}>
                                                {fullUrl}
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className={`transform transition-all group-hover:translate-x-1 ${theme === 'dark' ? 'text-gray-500 group-hover:text-primary-400' : 'text-slate-400 group-hover:text-primary-600'}`} />
                                </motion.button>
                            );
                        })}

                        <Link
                            to="/signin"
                            className={`block w-full mt-4 text-center text-sm transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-gray-300' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Use a different email
                        </Link>
                    </div>

                </div>

                <div className="mt-4 text-center">
                    <Link to="/" className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-600 hover:text-gray-400' : 'text-slate-400 hover:text-slate-600'}`}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceSelectionPage;
