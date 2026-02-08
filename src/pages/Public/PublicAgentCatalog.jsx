import React, { useEffect } from 'react';
import { useMarketplaceStore } from '../../store/marketplaceStore';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Bot, Sparkles, Star } from 'lucide-react';

const PublicAgentCatalog = () => {
    const { tieredAgents, getPublicCatalog, isLoading } = useMarketplaceStore();
    const { theme } = useTheme();

    useEffect(() => {
        getPublicCatalog();
    }, [getPublicCatalog]);

    const isDark = theme === 'dark';

    if (isLoading) {
        return (
            <div className={`min-h-screen pt-24 pb-12 px-6 flex items-center justify-center ${isDark ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
            </div>
        );
    }

    // Sort groups if needed, usually Standard first, then Premium. 
    // Assuming the object keys order or we map manually if specific order is required.
    // For now iterating entries with safety check.
    const tiers = tieredAgents ? Object.entries(tieredAgents) : [];

    return (
        <div className={`min-h-screen pt-24 pb-12 px-6 ${isDark ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-semibold">
                        <Sparkles className="w-4 h-4" />
                        <span>AgentX Hub</span>
                    </div>
                    <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500">Digital Workforce</span>
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        Browse our catalog of specialized AI agents designed to automate tasks and elevate your business operations.
                    </p>
                </div>

                {tiers.length === 0 ? (
                    <div className="text-center py-20">
                        <p className={`text-xl ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>No agents found in the catalog currently.</p>
                    </div>
                ) : (
                    <div className="space-y-20">
                        {tiers.map(([tierName, agents]) => (
                            <div key={tierName} className="relative">
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{tierName} Agents</h2>
                                    <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {agents.map((agent) => (
                                        <div
                                            key={agent.id}
                                            className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                        ${isDark
                                                    ? 'bg-[#151921] border-white/5 hover:border-brand-blue/50'
                                                    : 'bg-white border-slate-200 hover:border-brand-blue/50'
                                                }`}
                                        >
                                            {/* Agent Icon/Header */}
                                            <div className={`p-6 ${isDark ? 'bg-white/5' : 'bg-slate-50/50'} border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg
                            ${isDark ? 'bg-[#0B0E14] border border-white/10' : 'bg-white border border-slate-100'}`}>
                                                        {agent.icon_url ? (
                                                            <img src={agent.icon_url} alt={agent.name} className="w-10 h-10 object-contain" />
                                                        ) : (
                                                            <Bot className="w-8 h-8 text-brand-blue" />
                                                        )}
                                                    </div>
                                                    {agent.is_featured && (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase tracking-wider border border-yellow-500/20">
                                                            <Star className="w-3 h-3 fill-current" /> Featured
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{agent.name}</h3>
                                                <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                                    {agent.description}
                                                </p>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="mb-6 space-y-3">
                                                    {agent.capabilities && Array.isArray(agent.capabilities) && agent.capabilities.slice(0, 3).map((cap, idx) => (
                                                        <div key={idx} className="flex items-start gap-2">
                                                            <div className="mt-1 w-4 h-4 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                                                                <Check className="w-2.5 h-2.5 text-brand-blue" />
                                                            </div>
                                                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{typeof cap === 'string' ? cap : cap.name || cap}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <div>
                                                        <p className={`text-xs uppercase tracking-wider font-semibold mb-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Starting at</p>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                                ${agent.monthly_price || '0'}
                                                            </span>
                                                            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>/mo</span>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        to="/register"
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all
                               ${isDark
                                                                ? 'bg-white text-black hover:bg-gray-200'
                                                                : 'bg-black text-white hover:bg-gray-800'
                                                            }`}
                                                    >
                                                        Get Started <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicAgentCatalog;
