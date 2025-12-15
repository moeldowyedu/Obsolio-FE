import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Users, Building2,
  Sparkles, Bot, Workflow, Eye, DollarSign, Database, FileText,
  Code, Mic, Video, Globe, Activity, Briefcase, GraduationCap, Quote,
  Search, Settings, Heart, Factory, Gavel, Stethoscope, Landmark,
  LineChart, FileCheck, Brain
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import ObsolioLogo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import DrHebaImage from '../../assets/imgs/heba-saleh.png';
import AhmedSalahImage from '../../assets/imgs/ahmed-salah.jpg';

const HomePage = () => {
  return (
    <MainLayout showSidebar={false} showFooter={true}>
      <div className="min-h-screen bg-[#0B0E14] text-white selection:bg-primary-500/30">

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">

              {/* Text Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                    Industry-Specialized AI Agents
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
                  <span className="block text-white">Welcome to OBSOLIO</span>
                  <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Your AgentX HUB
                  </span>
                  <span className="block text-xl sm:text-2xl md:text-3xl mt-4 text-gray-300 font-normal">
                    for Precision AI Agents
                  </span>
                </h1>

                <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Discover specialized AI agents tailored for your industry. From Legal document drafting to Medical diagnosis support, Financial analysis to HR recruitment - each Precision AI Agent understands your domain's unique language, standards, and requirements.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/agentx/hub" className="glass-btn-primary group flex items-center justify-center gap-3">
                    Explore AgentX HUB
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="#industries" className="glass-btn hover:bg-white/10 text-white flex items-center justify-center gap-2">
                    View All Industries
                  </a>
                </div>

                <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span>Domain Expert AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span>Enterprise Grade</span>
                  </div>
                </div>
              </div>

              {/* Animation / Graphic */}
              <div className="lg:w-1/2 relative">
                {/* Orbital Animation Container */}
                <div className="relative w-[500px] h-[500px] mx-auto hidden md:flex items-center justify-center">
                  {/* Orbits */}
                  <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-24 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>

                  {/* Central Logo */}
                  <div className="relative z-20 bg-[#0B0E14] p-8 rounded-full border border-white/10 shadow-[0_0_50px_rgba(14,165,233,0.3)]">
                    <img src={ObsolioLogo} alt="Obsolio Logo" className="w-32 h-32 object-contain" />
                  </div>

                  {/* Floating Agents */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-gray-900/80 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg animate-float">
                    <div className="p-2 bg-blue-500/20 rounded-lg"><Gavel className="w-5 h-5 text-blue-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">Legal Agent</div>
                      <div className="text-gray-400">Analyzing Contract...</div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 right-0 bg-gray-900/80 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <div className="p-2 bg-purple-500/20 rounded-lg"><Stethoscope className="w-5 h-5 text-purple-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">Medical Agent</div>
                      <div className="text-gray-400">Diagnosis Ready</div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-0 bg-gray-900/80 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                    <div className="p-2 bg-green-500/20 rounded-lg"><LineChart className="w-5 h-5 text-green-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">Financial Agent</div>
                      <div className="text-gray-400">Risk Assessment</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* AgentX HUB Marketplace Section (NEW) */}
        <section className="py-24 px-6 relative overflow-hidden bg-white/[0.02]">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent -z-10"></div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 px-3 py-1 rounded-full text-xs font-bold text-primary-300 mb-6">
                <Sparkles className="w-3 h-3" /> AgentX HUB
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Industry-Specialized Precision AI Agents
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Pre-trained, domain-expert AI agents ready to deploy in minutes. Each agent combines deep industry knowledge with advanced AI capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Card 1: Legal */}
              <div className="glass-card p-8 group hover:border-blue-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Gavel className="w-8 h-8 text-blue-400" />
                  </div>
                  <span className="text-xs font-bold bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full border border-blue-500/20">Most Popular</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Legal Precision Agent</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Specialized in legal document drafting, contract analysis, compliance checking, and case law research.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Contract drafting & review</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Compliance verification</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Case precedent analysis</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Industries: Law Firms • Corporate Legal
                </div>
              </div>

              {/* Card 2: Medical */}
              <div className="glass-card p-8 group hover:border-red-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-red-500/20 rounded-xl">
                    <Stethoscope className="w-8 h-8 text-red-400" />
                  </div>
                  <span className="text-xs font-bold bg-red-500/10 text-red-300 px-3 py-1 rounded-full border border-red-500/20">Healthcare Certified</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Medical Precision Agent</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Trained on medical protocols, diagnostic criteria, and clinical terminology.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-500" /> Medical terminology expertise</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-500" /> Diagnostic support</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-500" /> Patient data analysis</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Industries: Hospitals • Clinics
                </div>
              </div>

              {/* Card 3: Financial */}
              <div className="glass-card p-8 group hover:border-green-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                  <span className="text-xs font-bold bg-green-500/10 text-green-300 px-3 py-1 rounded-full border border-green-500/20">Enterprise Grade</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Financial Precision Agent</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Deep understanding of accounting standards (GAAP, IFRS), financial modeling, and risk assessment.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Financial analysis & modeling</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Risk assessment</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Audit support</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Industries: Banks • Investment Firms
                </div>
              </div>

              {/* Card 4: Education */}
              <div className="glass-card p-8 group hover:border-orange-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-orange-500/20 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-orange-400" />
                  </div>
                  <span className="text-xs font-bold bg-orange-500/10 text-orange-300 px-3 py-1 rounded-full border border-orange-500/20">EdTech Leader</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Education Precision Agent</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Specialized in automated grading, content evaluation, and personalized learning recommendations.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-500" /> Automated assessment</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-500" /> Plagiarism detection</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-500" /> Learning analytics</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Industries: Universities • EdTech
                </div>
              </div>

              {/* Card 5: HR */}
              <div className="glass-card p-8 group hover:border-purple-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <span className="text-xs font-bold bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">Bias-Free Hiring</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">HR Precision Agent</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Expert in resume screening, candidate evaluation, interview analysis, and cultural fit assessment.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Resume screening</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Interview analysis</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Cultural fit evaluation</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Industries: Recruitment • Corporate HR
                </div>
              </div>

              {/* Card 6: Real Estate */}
              <div className="glass-card p-8 group hover:border-yellow-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-yellow-500/20 rounded-xl">
                    <Building2 className="w-8 h-8 text-yellow-400" />
                  </div>
                  <span className="text-xs font-bold bg-yellow-500/10 text-yellow-300 px-3 py-1 rounded-full border border-yellow-500/20">Market Intelligence</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Real Estate Precision Agent</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Specialized in property valuation, market analysis, and contract review for real estate transactions.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-500" /> Property valuation</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-500" /> Market trend analysis</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-500" /> Investment ROI calculation</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Industries: Real Estate • Investors
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/agentx/hub" className="glass-btn-primary inline-flex items-center gap-2">
                View All 15+ Agents in AgentX HUB
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="mt-4 text-sm text-gray-500">New agents added monthly based on industry demand</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why Choose AgentX HUB Precision Agents?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built for professionals, by professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, color: "text-blue-400", title: "Domain Expertise Built-In", desc: "Available agents come pre-trained on industry-specific knowledge, terminology, and best practices." },
                { icon: Zap, color: "text-yellow-400", title: "Deploy in Minutes", desc: "No setup or training needed. Select your agent, configure basics, and start processing immediately." },
                { icon: Shield, color: "text-green-400", title: "Regulatory Compliance", desc: "HIPAA, GDPR, and SOC 2 compliance is embedded in every agent's workflow." },
                { icon: Eye, color: "text-purple-400", title: "Human-in-the-Loop (HITL)", desc: "Configurable HITL workflows for quality assurance and final approval on critical decisions." },
                { icon: Brain, color: "text-pink-400", title: "Continuous Learning", desc: "Agents improve over time from your corrections while maintaining strict data isolation." },
                { icon: DollarSign, color: "text-orange-400", title: "Transparent ROI", desc: "Measurable time savings and accuracy improvements visible from day one." },
              ].map((item, idx) => (
                <div key={idx} className="glass-card hover:bg-white/5 p-8 transition-colors group cursor-default border-t-2 border-transparent hover:border-primary-500/50">
                  <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works (NEW) */}
        <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Three Steps to Your Industry AI Agent</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector Lines */}
              <div className="hidden md:block absolute top-12 left-[20%] w-[25%] h-0.5 border-t border-dashed border-gray-700"></div>
              <div className="hidden md:block absolute top-12 right-[20%] w-[25%] h-0.5 border-t border-dashed border-gray-700"></div>

              {/* Step 1 */}
              <div className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto glass-card rounded-full flex items-center justify-center mb-6 border-primary-500/30 shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                  <Search className="w-10 h-10 text-primary-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white border border-black">1</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Browse AgentX HUB</h3>
                <p className="text-gray-400 leading-relaxed px-4">
                  Explore our marketplace of industry-specialized Precision AI Agents. Filter by your industry or use case.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto glass-card rounded-full flex items-center justify-center mb-6 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                  <Settings className="w-10 h-10 text-purple-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white border border-black">2</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Customize & Deploy</h3>
                <p className="text-gray-400 leading-relaxed px-4">
                  Configure your agent for your specific workflows, approval chains, and integrations, then deploy securely.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto glass-card rounded-full flex items-center justify-center mb-6 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                  <Activity className="w-10 h-10 text-green-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center font-bold text-white border border-black">3</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Process & Improve</h3>
                <p className="text-gray-400 leading-relaxed px-4">
                  Start processing with your Precision Agent. Monitor performance, review HITL decisions, and watch accuracy grow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section - Expanded */}
        <section id="industries" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Trusted Across 10+ Industries
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Each industry has unique challenges. Each Precision Agent is built to solve them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Gavel, label: "Legal Services", desc: "Contract analysis & drafts", metric: "80% faster review" },
                { icon: Stethoscope, label: "Healthcare", desc: "Clinical data & imaging", metric: "95% diagnostic accuracy" },
                { icon: LineChart, label: "Financial", desc: "Risk modeling & audit", metric: "90% faster analysis" },
                { icon: GraduationCap, label: "Education", desc: "Grading & feedback", metric: "70% time saved" },
                { icon: Users, label: "HR & Recruiting", desc: "Resume screening & bias removal", metric: "50% faster hiring" },
                { icon: Building2, label: "Real Estate", desc: "Valuation & contracts", metric: "Market accuracy" },
                { icon: Shield, label: "Insurance", desc: "Claims & underwriting", metric: "60% faster claims" },
                { icon: Factory, label: "Manufacturing", desc: "QC & supply chain", metric: "99.5% defect detection" },
              ].map((sector, idx) => (
                <div key={idx} className="glass-card p-6 hover:bg-white/10 transition-all group border-l-4 border-transparent hover:border-primary-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                      <sector.icon className="w-6 h-6 text-gray-400 group-hover:text-primary-400 transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg text-white">{sector.label}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{sector.desc}</p>
                  <div className="text-xs font-bold text-primary-400 bg-primary-500/5 px-2 py-1 rounded inline-block">
                    {sector.metric}
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Fields Disclaimer */}
            <div className="mt-16 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex flex-col md:flex-row gap-4 items-start max-w-4xl mx-auto">
              <Shield className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-yellow-200 font-bold mb-1">Human-in-the-Loop (HITL) Essential</h4>
                <p className="text-sm text-yellow-500/80 leading-relaxed">
                  While our agents are high-precision, they do not replace certified professionals in critical fields such as Law, Healthcare, or Judiciary.
                  All AI outputs in these domains should be reviewed and verified by human experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 relative overflow-hidden bg-white/[0.02] border-t border-white/5">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Legal Testimonial */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-blue-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-500/20 group-hover:text-blue-500/40 transition-colors" />
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  "The Legal Precision Agent has transformed how we handle contract reviews. What used to take our team days now takes hours, with higher accuracy."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">SM</div>
                  <div>
                    <h4 className="font-bold text-white">Sarah Mitchell</h4>
                    <p className="text-xs text-blue-400 uppercase tracking-wider">Senior Partner, Legal Services</p>
                  </div>
                </div>
              </div>

              {/* Medical Testimonial */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-red-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-red-500/20 group-hover:text-red-500/40 transition-colors" />
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  "As a medical institution, accuracy is non-negotiable. The Medical Precision Agent provides diagnostic support that matches our specialists' expertise."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold">AH</div>
                  <div>
                    <h4 className="font-bold text-white">Dr. Ahmed Hassan</h4>
                    <p className="text-xs text-red-400 uppercase tracking-wider">CMO, Cairo Medical Center</p>
                  </div>
                </div>
              </div>

              {/* HR Testimonial */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-purple-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-500/20 group-hover:text-purple-500/40 transition-colors" />
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  "Our hiring process was broken. The HR Precision Agent reduced our time-to-hire by 45% and eliminated unconscious bias from initial screening."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">JL</div>
                  <div>
                    <h4 className="font-bold text-white">Jennifer Lopez</h4>
                    <p className="text-xs text-purple-400 uppercase tracking-wider">VP Talent, TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto text-center glass-card p-12 border-primary-500/30 shadow-[0_0_50px_rgba(14,165,233,0.15)]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Deploy Your <span className="text-primary-400">Industry AI Agent?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join 500+ organizations already using Precision AI Agents from AgentX HUB.
              Start with a 14-day free trial. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/register" className="glass-btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/demo" className="glass-btn px-8 py-4 text-lg text-white hover:bg-white/10 flex items-center justify-center gap-2">
                Schedule a Demo
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SOC 2 Type II</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> GDPR Compliant</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> HIPAA Ready</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> ISO 27001</span>
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default HomePage;
