import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Users, Building2,
  Sparkles, Bot, Workflow, Eye, DollarSign, Database, FileText,
  Code, Mic, Video, Globe, Activity, Briefcase, GraduationCap, Quote,
  Search, Settings, Heart, Factory, Gavel, Stethoscope, Landmark,
  LineChart, FileCheck, Brain, Calculator, Languages, FileSearch
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import ObsolioLogo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import DrHebaImage from '../../assets/imgs/heba-saleh.png';
import AhmedSalahImage from '../../assets/imgs/ahmed-salah.jpg';
import TypingEffect from '../../components/common/TypingEffect';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { translations } from '../../translations';

const HomePage = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  return (
    <MainLayout showSidebar={false} showFooter={true}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0B0E14] text-white' : 'bg-slate-50 text-slate-900'} selection:bg-primary-500/30 font-body`}>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">

          {/* Light Mode Subtle Gradient - Optional Depth */}
          {theme !== 'dark' && (
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-60"></div>
          )}

          {/* Content - Top Layer (z-10) */}
          <div className="w-full px-6 md:px-12 lg:px-20 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">

              {/* Text Content */}
              <div className={`lg:w-1/2 text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
                <div className={`inline-flex items-center gap-2 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-primary-50 border-primary-200'} border px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-md`}>
                  <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
                  <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                    {t.industrySpecializedAgents || 'Industry-Specialized AI Agents'}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight font-heading">
                  <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent font-thin">
                    OBSOLIO
                  </span>
                  <span className={`block text-xl sm:text-2xl md:text-3xl mt-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'} font-light tracking-wide`}>
                    <TypingEffect text={t.landingHeroTagline} speed={40} delay={500} />
                  </span>
                </h1>

                <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'} mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light tracking-wide`}>
                  {t.landingHeroDescription}
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 justify-center ${language === 'ar' ? 'lg:justify-start' : 'lg:justify-start'}`}>
                  <Link to="/agentx/hub" className="glass-btn-primary group flex items-center justify-center gap-3">
                    {t.exploreAgentxHub}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="#industries" className={`glass-btn ${theme === 'dark' ? 'hover:bg-white/10 text-white' : 'bg-white text-slate-700 border border-slate-200 shadow-sm hover:border-primary-300 hover:shadow-md'} flex items-center justify-center gap-2 transition-all`}>
                    {t.viewAllIndustries}
                  </a>
                </div>

                <div className={`mt-8 flex items-center justify-center ${language === 'ar' ? 'lg:justify-start' : 'lg:justify-start'} gap-6 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span>{t.domainExpertAi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span>{t.enterpriseGrade}</span>
                  </div>
                </div>
              </div>

              {/* Animation / Graphic */}
              <div className="lg:w-1/2 relative">
                {/* Orbital Animation Container */}
                <div className="relative w-[500px] h-[500px] mx-auto hidden md:flex items-center justify-center">
                  {/* Orbits */}
                  <div className={`absolute inset-0 border ${theme === 'dark' ? 'border-white/5' : 'border-gray-300/30'} rounded-full animate-[spin_10s_linear_infinite]`}></div>
                  <div className={`absolute inset-12 border ${theme === 'dark' ? 'border-white/5' : 'border-gray-300/30'} rounded-full animate-[spin_15s_linear_infinite_reverse]`}></div>
                  <div className={`absolute inset-24 border ${theme === 'dark' ? 'border-white/10' : 'border-gray-400/40'} rounded-full animate-[spin_20s_linear_infinite]`}></div>

                  {/* Central Logo */}
                  <div className={`relative z-20 ${theme === 'dark' ? 'bg-[#0B0E14] border-white/10' : 'bg-white border-slate-100'} p-8 rounded-full border shadow-[0_0_50px_rgba(14,165,233,0.3)]`}>
                    <img src={ObsolioLogo} alt="Obsolio Logo" className="w-32 h-32 object-contain" />
                  </div>

                  {/* Floating Agents */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 ${theme === 'dark' ? 'bg-gray-900/80 border-white/10' : 'bg-white border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'} backdrop-blur border p-3 rounded-xl flex items-center gap-3 animate-float`}>
                    <div className="p-2 bg-blue-500/10 rounded-lg"><LineChart className="w-5 h-5 text-blue-600" /></div>
                    <div className="text-xs">
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.financialAgent || 'Financial Agent'}</div>
                      <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{t.competitionAnalysis || 'Competition Analysis...'}</div>
                    </div>
                  </div>

                  <div className={`absolute bottom-10 right-0 ${theme === 'dark' ? 'bg-gray-900/80 border-white/10' : 'bg-white border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'} backdrop-blur border p-3 rounded-xl flex items-center gap-3 animate-float`} style={{ animationDelay: '1s' }}>
                    <div className="p-2 bg-purple-500/10 rounded-lg"><Languages className="w-5 h-5 text-purple-600" /></div>
                    <div className="text-xs">
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.cefrAgentTitle || 'CEFR Agent'}</div>
                      <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{t.oralAssessment || 'Oral Assessment'}</div>
                    </div>
                  </div>


                  <div className={`absolute bottom-10 left-0 ${theme === 'dark' ? 'bg-gray-900/80 border-white/10' : 'bg-white border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'} backdrop-blur border p-3 rounded-xl flex items-center gap-3 animate-float`} style={{ animationDelay: '2s' }}>
                    <div className="p-2 bg-green-500/10 rounded-lg"><FileSearch className="w-5 h-5 text-green-600" /></div>
                    <div className="text-xs">
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.admissionsAgent || 'Admissions Agent'}</div>
                      <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{t.reviewingApp || 'Reviewing App...'}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* AgentX HUB Marketplace Section (Featured Agents) */}
        <section className={`py-24 px-6 relative overflow-hidden ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent -z-10"></div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 px-3 py-1 rounded-full text-xs font-bold text-primary-300 mb-6">
                <Sparkles className="w-3 h-3" /> {t.agentxHub || 'AgentX HUB'}
              </div>
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 font-heading ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {t.agentxHubMarketplaceTitle}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                {t.agentxHubMarketplaceSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

              {/* Card 1: Precision AI Judge Agent */}
              {/* Card 1: Precision AI Judge Agent */}
              <div className={`p-8 group relative overflow-hidden transition-all rounded-2xl ${theme === 'dark' ? 'glass-card hover:border-blue-500/50' : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1'}`}>
                {/* Active Status Indicator */}
                <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${theme === 'dark' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700'}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Processing
                </div>

                <div className="flex justify-between items-start mb-6 mt-2">
                  <div className={`relative p-3 rounded-xl ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                    <div className={`absolute inset-0 rounded-xl ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-200/50'} animate-ping opacity-20`}></div>
                    <LineChart className={`relative w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                </div>

                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.precisionJudgeAgentTitle}</h3>
                <p className={`text-sm mb-4 leading-relaxed font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.precisionJudgeAgentDesc}
                </p>

                {/* Terminal-style Output */}
                <div className={`font-mono text-xs p-3 rounded-lg mb-6 border ${theme === 'dark' ? 'bg-black/40 border-white/5 text-blue-300' : 'bg-slate-50 border-slate-100 text-blue-700'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="opacity-50">{">"}</span> <span>Analyzing legal precedents...</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="opacity-50">{">"}</span> <span>Verifying judgments...</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <span className="opacity-50">{">"}</span> <span>99.8% Accuracy Achieved</span>
                  </div>
                </div>

                <div className={`text-xs pt-4 border-t ${theme === 'dark' ? 'text-gray-500 border-white/5' : 'text-slate-400 border-slate-100'}`}>
                  {t.precisionJudgeRequestedBy}
                </div>
              </div>

              {/* Card 2: CEFR Assessment */}
              <div className={`p-8 group relative overflow-hidden transition-all rounded-2xl ${theme === 'dark' ? 'glass-card hover:border-purple-500/50' : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1'}`}>
                {/* Active Status Indicator */}
                <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${theme === 'dark' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700'}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Active
                </div>

                <div className="flex justify-between items-start mb-6 mt-2">
                  <div className={`relative p-3 rounded-xl ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                    <div className={`absolute inset-0 rounded-xl ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-200/50'} animate-ping opacity-20`}></div>
                    <Languages className={`relative w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.cefrAgentTitle}</h3>
                <p className={`text-sm mb-4 leading-relaxed font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.cefrAgentDesc}
                </p>

                {/* Terminal-style Output */}
                <div className={`font-mono text-xs p-3 rounded-lg mb-6 border ${theme === 'dark' ? 'bg-black/40 border-white/5 text-purple-300' : 'bg-slate-50 border-slate-100 text-purple-700'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="opacity-50">{">"}</span> <span>Calibrating linguistic models...</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="opacity-50">{">"}</span> <span>Assessing proficiency...</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <span className="opacity-50">{">"}</span> <span>Certification Ready</span>
                  </div>
                </div>

                <div className={`text-xs pt-4 border-t ${theme === 'dark' ? 'text-gray-500 border-white/5' : 'text-slate-400 border-slate-100'}`}>
                  {t.cefrUsedFor}
                </div>
              </div>

              {/* Card 3: Precision AI Files Agent */}
              <div className={`p-8 group relative overflow-hidden transition-all rounded-2xl ${theme === 'dark' ? 'glass-card hover:border-green-500/50' : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1'}`}>
                {/* Active Status Indicator */}
                <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${theme === 'dark' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700'}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Indexing
                </div>

                <div className="flex justify-between items-start mb-6 mt-2">
                  <div className={`relative p-3 rounded-xl ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-50'}`}>
                    <div className={`absolute inset-0 rounded-xl ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-200/50'} animate-ping opacity-20`}></div>
                    <FileSearch className={`relative w-8 h-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.precisionFilesAgentTitle}</h3>
                <p className={`text-sm mb-4 leading-relaxed font-light ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                  {t.precisionFilesAgentDesc}
                </p>

                {/* Terminal-style Output */}
                <div className={`font-mono text-xs p-3 rounded-lg mb-6 border ${theme === 'dark' ? 'bg-black/40 border-white/5 text-green-300' : 'bg-slate-50 border-slate-100 text-green-700'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="opacity-50">{">"}</span> <span>Scanning document structure...</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="opacity-50">{">"}</span> <span>Extracting key entities...</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <span className="opacity-50">{">"}</span> <span>Indexing Complete</span>
                  </div>
                </div>

                <div className={`text-xs pt-4 border-t ${theme === 'dark' ? 'text-gray-500 border-white/5' : 'text-slate-400 border-slate-100'}`}>
                  {t.precisionFilesRequestedBy}
                </div>
              </div>

            </div>

            <div className="text-center">
              <Link to="/agentx/hub" className="glass-btn-primary inline-flex items-center gap-2">
                {t.exploreAllAgentsButton}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section - Enterprise Dashboard Design */}
        <section id="features" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto z-10 relative">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
                {t.whyChooseTitle}
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t.whyChooseSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Sparkles,
                  color: "text-blue-400",
                  bg: "bg-blue-400/10",
                  title: t.domainExpertiseTitle,
                  desc: t.domainExpertiseDesc,
                  metricLabel: "Knowledge Base",
                  metricValue: "100%",
                  metricColor: "bg-blue-500"
                },
                {
                  icon: Zap,
                  color: "text-cyan-400",
                  bg: "bg-cyan-400/10",
                  title: t.deployMinutesTitle,
                  desc: t.deployMinutesDesc,
                  metricLabel: "Avg. Setup Time",
                  metricValue: "120s",
                  metricColor: "bg-cyan-500"
                },
                {
                  icon: Shield,
                  color: "text-green-400",
                  bg: "bg-green-400/10",
                  title: t.regulatoryComplianceTitle,
                  desc: t.regulatoryComplianceDesc,
                  metricLabel: "Audit Status",
                  metricValue: "PASSED",
                  metricColor: "bg-green-500"
                },
                {
                  icon: Eye,
                  color: "text-purple-400",
                  bg: "bg-purple-400/10",
                  title: t.humanInLoopTitle,
                  desc: t.humanInLoopDesc,
                  metricLabel: "Oversight Mode",
                  metricValue: "ACTIVE",
                  metricColor: "bg-purple-500"
                },
                {
                  icon: Users,
                  color: "text-orange-400",
                  bg: "bg-orange-400/10",
                  title: t.noBiasBadDaysTitle,
                  desc: t.noBiasBadDaysDesc,
                  metricLabel: "Fairness Score",
                  metricValue: "99.9%",
                  metricColor: "bg-orange-500"
                },
                {
                  icon: DollarSign,
                  color: "text-emerald-400",
                  bg: "bg-emerald-400/10",
                  title: t.transparentRoiTitle,
                  desc: t.transparentRoiDesc,
                  metricLabel: "Cost Savings",
                  metricValue: "+80%",
                  metricColor: "bg-emerald-500"
                },
              ].map((item, idx) => (
                <div key={idx} className={`relative p-6 rounded-xl border transition-all duration-300 group ${theme === 'dark' ? 'bg-white/[0.03] border-white/5 hover:border-white/10' : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200'}`}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-lg ${item.bg}`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    {/* Enterprise "Widget" Controls */}
                    <div className="flex gap-1">
                      <div className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-white/20' : 'bg-slate-300'}`}></div>
                      <div className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-white/20' : 'bg-slate-300'}`}></div>
                      <div className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-white/20' : 'bg-slate-300'}`}></div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-lg font-bold mb-2 font-heading ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-sm mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{item.desc}</p>

                  {/* "Data" Footer */}
                  <div className={`mt-auto pt-4 border-t flex justify-between items-center ${theme === 'dark' ? 'border-white/5 bg-white/[0.02] -mx-6 -mb-6 px-6 py-3' : 'border-slate-50 bg-slate-50/50 -mx-6 -mb-6 px-6 py-3'}`}>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                      {item.metricLabel}
                    </span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
                      {item.metricValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className={`py-24 px-6 border-y ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 font-heading ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.howItWorksTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector Lines */}
              <div className={`hidden md:block absolute top-12 left-[20%] w-[25%] h-0.5 border-t border-dashed ${theme === 'dark' ? 'border-gray-700' : 'border-slate-300'}`}></div>
              <div className={`hidden md:block absolute top-12 right-[20%] w-[25%] h-0.5 border-t border-dashed ${theme === 'dark' ? 'border-gray-700' : 'border-slate-300'}`}></div>

              {/* Step 1 */}
              <div className="text-center relative z-10">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 border-primary-500/30 shadow-[0_0_30px_rgba(14,165,233,0.1)] ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border border-slate-100'}`}>
                  <Search className="w-10 h-10 text-primary-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white border border-black">1</div>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.browseAgentxHubTitle}</h3>
                <p className={`leading-relaxed px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {t.browseAgentxHubDesc}
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center relative z-10">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)] ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border border-slate-100'}`}>
                  <Settings className="w-10 h-10 text-purple-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white border border-black">2</div>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.customizeTitle}</h3>
                <p className={`leading-relaxed px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {t.customizeDesc}
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center relative z-10">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)] ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border border-slate-100'}`}>
                  <Activity className="w-10 h-10 text-green-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center font-bold text-white border border-black">3</div>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.processImproveTitle}</h3>
                <p className={`leading-relaxed px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {t.processImproveDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section - Concise */}
        <section id="industries" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
                {t.trustedAcrossIndustriesTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: LineChart, label: t.techFinanceLabel, desc: t.techFinanceDesc, metric: t.techFinanceMetric },
                { icon: GraduationCap, label: t.educationLabel, desc: t.educationDesc, metric: t.educationMetric },
                { icon: Gavel, label: t.legalServicesLabel, desc: t.legalServicesDesc, metric: t.legalServicesMetric },
                { icon: Stethoscope, label: t.healthcareLabel, desc: t.healthcareDesc, metric: t.healthcareMetric },
                { icon: Users, label: t.hrRecruitmentLabel, desc: t.hrRecruitmentDesc, metric: t.hrRecruitmentMetric },
                { icon: Building2, label: t.realEstateLabel, desc: t.realEstateDesc, metric: t.realEstateMetric },
                { icon: Shield, label: t.insuranceLabel, desc: t.insuranceDesc, metric: t.insuranceMetric },
                { icon: Factory, label: t.manufacturingLabel, desc: t.manufacturingDesc, metric: t.manufacturingMetric },
              ].map((sector, idx) => (
                <div key={idx} className={`p-6 transition-all group border-l-4 border-transparent hover:border-primary-500 ${theme === 'dark' ? 'glass-card hover:bg-white/10' : 'bg-white border-y border-r border-slate-100 shadow-sm hover:shadow-md'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-white/5 group-hover:bg-primary-500/20' : 'bg-slate-100 group-hover:bg-primary-50'}`}>
                      <sector.icon className={`w-6 h-6 transition-colors ${theme === 'dark' ? 'text-gray-400 group-hover:text-primary-400' : 'text-slate-500 group-hover:text-primary-600'}`} />
                    </div>
                    <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{sector.label}</h3>
                  </div>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{sector.desc}</p>
                  <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${theme === 'dark' ? 'text-primary-400 bg-primary-500/5' : 'text-primary-700 bg-primary-50'}`}>
                    {sector.metric}
                  </div>
                </div>
              ))}
            </div>

            {/* Important Disclaimer */}
            <div className={`mt-16 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-start max-w-5xl mx-auto ${theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
              <Shield className={`w-6 h-6 flex-shrink-0 mt-1 ${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-600'}`} />
              <div>
                <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-yellow-200' : 'text-black'}`}>{t.professionalDisclaimerTitle}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-yellow-100/90' : 'text-black'}`}>
                  {t.professionalDisclaimerDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials - Restored */}
        <section className={`py-24 px-6 relative overflow-hidden border-t ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          {theme === 'dark' && <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>}
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 font-heading ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.partnersSuccessStoriesTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Dr. Heba Saleh */}
              <div className={`p-8 relative group border-t-2 border-transparent hover:border-brand-500/50 ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border border-slate-100'}`}>
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-500/20 group-hover:text-primary-500/40 transition-colors" />
                <p className={`italic mb-8 leading-relaxed text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                  "{t.drHebaSalehTestimonial}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={DrHebaImage} alt="Dr. Heba Saleh" className="w-16 h-16 rounded-full object-cover border-2 border-primary-500/20" />
                  <div>
                    <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Dr. Heba Saleh</h4>
                    <p className="text-sm text-primary-400 uppercase tracking-wider">{t.drHebaSalehTitle}</p>
                  </div>
                </div>
              </div>

              {/* Eng. Ahmed Salah */}
              <div className={`p-8 relative group border-t-2 border-transparent hover:border-brand-500/50 ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border border-slate-100'}`}>
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-500/20 group-hover:text-primary-500/40 transition-colors" />
                <p className={`italic mb-8 leading-relaxed text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                  "{t.engAhmedSalahTestimonial}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={AhmedSalahImage} alt="Eng. Ahmed Salah" className="w-16 h-16 rounded-full object-cover border-2 border-primary-500/20" />
                  <div>
                    <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Eng. Ahmed Salah</h4>
                    <p className="text-sm text-primary-400 uppercase tracking-wider">{t.engAhmedSalahTitle}</p>
                  </div>
                </div>
              </div>

              {/* Third Testimonial - CEFR Agent */}
              <div className={`p-8 relative group border-t-2 border-transparent hover:border-purple-500/50 ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border border-slate-100'}`}>
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-500/20 group-hover:text-primary-500/40 transition-colors" />
                <p className={`italic mb-8 leading-relaxed text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                  "{t.drLauraSchmidtTestimonial}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-xl border-2 border-primary-500/20">LS</div>
                  <div>
                    <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Dr. Laura Schmidt</h4>
                    <p className="text-sm text-primary-400 uppercase tracking-wider">{t.drLauraSchmidtTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 relative">
          <div className={`max-w-4xl mx-auto text-center p-12 shadow-[0_0_50px_rgba(14,165,233,0.15)] ${theme === 'dark' ? 'glass-card border-primary-500/30' : 'bg-white shadow-2xl rounded-3xl border border-slate-100'}`}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 font-heading ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.readyToUpgradeTitle}
            </h2>
            <p className={`text-xl mb-10 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              {t.readyToUpgradeSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/register" className="glass-btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2">
                {t.startFreeTrialButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/demo" className={`glass-btn px-8 py-4 text-lg flex items-center justify-center gap-2 ${theme === 'dark' ? 'text-white hover:bg-white/10' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
                {t.scheduleDemoButton}
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {t.soc2Compliant}</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {t.gdprCompliant}</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {t.iso27001Compliant}</span>
            </div>
          </div>
        </section>

      </div >
    </MainLayout >
  );
};

export default HomePage;
