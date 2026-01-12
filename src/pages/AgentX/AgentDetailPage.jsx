import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
import {
  Star, Download, Shield, Zap, CheckCircle, Clock,
  TrendingUp, Award, MessageCircle, Share2, Heart,
  ChevronRight, Globe, Code, Layers, AlertCircle, ShoppingCart
} from 'lucide-react';

import MainLayout from '../../components/layout/MainLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { tenantService } from '../../services/tenantService';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';
import Tabs from '../../components/common/Tabs/Tabs';
import Skeleton from '../../components/common/Skeleton/Skeleton'; // Assuming Skeleton exists
import { useAuthStore } from '../../store/authStore';

const AgentDetailPage = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuthStore();

  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAgent = async () => {
      setLoading(true);
      try {
        const response = await tenantService.getAgent(agentId);
        if (response.success) {
          // Map new API fields to expected fields
          const agentData = response.data;
          setAgent({
            ...agentData,
            // Map base_price to monthly_price for pricing display
            monthly_price: agentData.base_price || 0,
            annual_price: agentData.base_price ? Math.round(agentData.base_price * 10) : 0,
            // Ensure category is available from categories array
            category: agentData.categories?.[0]?.name || agentData.categories?.[0] || 'General',
            // Default review_count if not provided
            review_count: agentData.review_count || 0,
            // Default version if not provided
            version: agentData.version || '1.0.0',
          });
        } else {
          setError("Failed to load agent details.");
        }
      } catch (err) {
        console.error("Error fetching agent details:", err);
        setError("An error occurred while loading the agent.");
      } finally {
        setLoading(false);
      }
    };

    if (agentId) {
      fetchAgent();
    }
  }, [agentId]);

  const handleInstall = () => {
    if (!isAuthenticated) {
      navigate(`/login?returnUrl=/agentx/hub/agent/${agentId}`);
      return;
    }
    // Redirect to checkout or install logic
    console.log("Installing agent:", agentId, isAnnual ? 'Annual' : 'Monthly');
    navigate(`/agentx/hub/checkout/${agentId}?billing=${isAnnual ? 'annual' : 'monthly'}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
            <div className="h-64 rounded-3xl bg-gray-200 dark:bg-gray-800 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
              <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !agent) {
    return (
      <MainLayout>
        <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Error Loading Agent</h2>
            <p className="text-gray-500 mb-6">{error || "Agent not found"}</p>
            <Button onClick={() => navigate('/agentx/hub')}>Back to Marketplace</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const price = isAnnual ? agent.annual_price : agent.monthly_price;
  const priceLabel = isAnnual ? '/year' : '/month';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' }
  ];

  return (
    <MainLayout>
      <div className={`min-h-screen pb-20 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>

        {/* Banner / Hero Section */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90" />
          {agent.banner_url && (
            <img
              src={agent.banner_url}
              alt={`${agent.name} banner`}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white p-2 shadow-2xl flex-shrink-0 relative z-10 -mb-12 md:-mb-16">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-4xl text-white overflow-hidden">
                  {agent.icon_url ? <img src={agent.icon_url} alt={agent.name} className="w-full h-full object-cover" /> : (agent.icon || agent.name[0])}
                </div>
              </div>

              <div className="flex-grow pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-primary-500/20 text-primary-300 border-primary-500/30 uppercase text-xs font-bold px-2 py-0.5">
                    {agent.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{agent.rating}</span>
                    <span className="text-gray-400 font-normal">({agent.review_count} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Download className="w-4 h-4" />
                    <span>{agent.total_installs} installs</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{agent.name}</h1>
                <p className="text-gray-300 max-w-2xl line-clamp-1">{agent.description}</p>
              </div>

              <div className="flex flex-col items-end gap-3 pb-2 ml-auto">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">${price}</span>
                  <span className="text-gray-400">{priceLabel}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setIsAnnual(false)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${!isAnnual ? 'bg-primary-600 text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsAnnual(true)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${isAnnual ? 'bg-primary-600 text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    Annual
                  </button>
                </div>
                <Button size="lg" className="w-full md:w-auto shadow-lg shadow-primary-500/25" onClick={handleInstall}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Install Agent
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-6 mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content (Tabs) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Custom Tab Implementation or use Tabs component */}
            <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className={`space-y-8 animate-in fade-in duration-300`}>
                <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>About this Agent</h3>
                  <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : 'prose-slate'}`}>
                    {/* <ReactMarkdown>{agent.long_description || agent.description}</ReactMarkdown> */}
                    <div className="whitespace-pre-wrap">{agent.long_description || agent.description}</div>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                  <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agent.capabilities?.map((cap, idx) => (
                      <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className={`p-8 rounded-2xl border space-y-6 animate-in fade-in duration-300 ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Technical Features</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center gap-4">
                    <Globe className="w-6 h-6 text-primary-500" />
                    <div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Supported Languages</h4>
                      <div className="flex gap-2 mt-1">
                        {agent.supported_languages?.map(lang => (
                          <Badge key={lang} variant="outline" className="uppercase">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Add more feature details if available in API */}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className={`p-8 rounded-2xl border space-y-6 animate-in fade-in duration-300 ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>User Reviews</h3>
                  <Button variant="outline" size="sm">Write a Review</Button>
                </div>
                {agent.review_count > 0 ? (
                  <div className="divide-y dark:divide-gray-800">
                    {/* Placeholder for reviews list - would map through reviews fetched separately if needed */}
                    <div className="py-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">JD</div>
                          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>John Doe</span>
                        </div>
                        <span className="text-gray-500 text-sm">2 days ago</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 mb-2">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                      </div>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>Great agent! Really helped streamline our workflow.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No reviews yet. Be the first to review this agent!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className={`p-8 rounded-2xl border animate-in fade-in duration-300 ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Pricing Plans</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Monthly Subscription</h4>
                    <div className="text-3xl font-bold text-primary-500 mb-4">${agent.monthly_price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                    <Button onClick={() => { setIsAnnual(false); handleInstall(); }} className="w-full">Select Monthly</Button>
                  </div>
                  <div className={`p-6 rounded-xl border relative overflow-hidden ${theme === 'dark' ? 'bg-primary-900/10 border-primary-500/30' : 'bg-primary-50 border-primary-100'}`}>
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">SAVE 17%</div>
                    <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Annual Subscription</h4>
                    <div className="text-3xl font-bold text-primary-500 mb-4">${agent.annual_price}<span className="text-sm text-gray-500 font-normal">/yr</span></div>
                    <Button onClick={() => { setIsAnnual(true); handleInstall(); }} className="w-full" variant="outline">Select Annual</Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Info */}
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b]/50 border-white/5' : 'bg-white border-slate-200'}`}>
              <h3 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Key Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Version</span>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{agent.version || '1.0.0'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Last Updated</span>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{agent.updated_at ? new Date(agent.updated_at).toLocaleDateString() : 'Recently'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">License</span>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Standard</span>
                </div>
              </div>
            </div>

            {/* Developer Info */}
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b]/50 border-white/5' : 'bg-white border-slate-200'}`}>
              <h3 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Developer</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" /> {/* Placeholder avatar */}
                <div>
                  <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Obsolio Team</div>
                  <div className="text-xs text-green-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified Publisher</div>
                </div>
              </div>
              <Button variant="outline" className="w-full text-sm">Contact Developer</Button>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default AgentDetailPage;
