import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building, User } from 'lucide-react';
import { redirectToTenantLogin } from '../../utils/tenantDetection';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const WorkspaceSelectionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        if (location.state?.tenants) {
            setTenants(location.state.tenants);
        } else {
            // If accessed directly without state, redirect to signin
            navigate('/signin');
        }
    }, [location, navigate]);

    const handleSelectTenant = (tenant) => {
        redirectToTenantLogin(tenant.slug);
    };

    if (tenants.length === 0) {
        return null; // Or a loading spinner, but usually redirects fast
    }

    return (
        <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Ambience */}
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
                        Select your workspace
                    </h2>
                    <p className="text-gray-400">
                        Found {tenants.length} workspaces for your email.
                    </p>
                </div>

                <div className="glass-card p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40 rounded-xl">
                    {/* Decor glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                    <div className="space-y-4">
                        {tenants.map(tenant => {
                            const fullUrl = `${tenant.slug}.${window.location.hostname.includes('localhost') ? 'localhost:5173' : 'obsolio.com'}`;

                            return (
                                <motion.button
                                    key={tenant.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => handleSelectTenant(tenant)}
                                    className="w-full flex items-center justify-between p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group text-left bg-white/5"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`p-2 rounded-lg ${tenant.type === 'ORGANIZATION' ? 'bg-purple-500/20 text-purple-400' : 'bg-primary-500/20 text-primary-400'}`}>
                                            {tenant.type === 'ORGANIZATION' ? <Building size={20} /> : <User size={20} />}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white">{tenant.name}</h3>
                                            <p className="text-sm text-primary-400 group-hover:text-primary-300 transition-colors font-mono">
                                                {fullUrl}
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className="text-gray-500 group-hover:text-primary-400 transform group-hover:translate-x-1 transition-all" />
                                </motion.button>
                            );
                        })}

                        <Link
                            to="/signin"
                            className="block w-full mt-4 text-center text-sm text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            Use a different email
                        </Link>
                    </div>

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

export default WorkspaceSelectionPage;
