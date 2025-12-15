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

const HomePage = () => {
  return (
    <MainLayout showSidebar={false} showFooter={true}>
      <div className="min-h-screen bg-[#0B0E14] text-white selection:bg-primary-500/30 font-body">

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

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight font-heading">
                  <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    OBSOLIO
                  </span>
                  <span className="block text-xl sm:text-2xl md:text-3xl mt-4 text-white font-medium tracking-wide">
                    Your Precision AI Agent for Your Industry
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light tracking-wide">
                  Discover specialized AI agents tailored for your industry. Each Precision AI Agent understands your domain's unique language, standards, and requirements.
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
                    <div className="p-2 bg-blue-500/20 rounded-lg"><LineChart className="w-5 h-5 text-blue-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">Financial Agent</div>
                      <div className="text-gray-400">Competition Analysis...</div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 right-0 bg-gray-900/80 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <div className="p-2 bg-purple-500/20 rounded-lg"><Languages className="w-5 h-5 text-purple-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">CEFR Agent</div>
                      <div className="text-gray-400">Oral Assessment</div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-0 bg-gray-900/80 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                    <div className="p-2 bg-green-500/20 rounded-lg"><FileSearch className="w-5 h-5 text-green-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">Admissions Agent</div>
                      <div className="text-gray-400">Reviewing App...</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* AgentX HUB Marketplace Section (Featured Agents) */}
        <section className="py-24 px-6 relative overflow-hidden bg-white/[0.02]">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent -z-10"></div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 px-3 py-1 rounded-full text-xs font-bold text-primary-300 mb-6">
                <Sparkles className="w-3 h-3" /> AgentX HUB
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
                Featured Precision AI Agents
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Ready-to-deploy agents solving complex challenges in Tech, Education, and Recruitment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

              {/* Card 1: Precision AI Judge Agent */}
              <div className="glass-card p-8 group hover:border-blue-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <LineChart className="w-8 h-8 text-blue-400" />
                  </div>
                  <span className="text-xs font-bold bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full border border-blue-500/20">Tech Competitions</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Precision AI Judge Agent</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed font-light">
                  Specialized agent for evaluating tech competition submissions. Analyzes business models, technical feasibility, market potential, and pitch quality with consistent, unbiased scoring.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Standardized evaluation criteria</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Business model assessment</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Pitch deck scoring</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Requested by: ITI for Tech Competitions
                </div>
              </div>

              {/* Card 2: CEFR Assessment */}
              <div className="glass-card p-8 group hover:border-purple-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Languages className="w-8 h-8 text-purple-400" />
                  </div>
                  <span className="text-xs font-bold bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">Education</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">CEFR Assessment Agent</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed font-light">
                  A specialized linguistic agent ensuring alignment with the Common European Framework of Reference for Languages (CEFR). Specifically tuned for oral and written assessments.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Oral proficiency grading</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Multi-language support</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> Standardized scoring</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Used for: Language Certification
                </div>
              </div>

              {/* Card 3: Precision AI Files Agent */}
              <div className="glass-card p-8 group hover:border-green-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <FileSearch className="w-8 h-8 text-green-400" />
                  </div>
                  <span className="text-xs font-bold bg-green-500/10 text-green-300 px-3 py-1 rounded-full border border-green-500/20">Document Processing</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Precision AI Files Agent</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed font-light">
                  Intelligent document processing agent that extracts, categorizes, and analyzes business files. Handles contracts, invoices, reports, and compliance documents with high accuracy.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Automated file classification</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Data extraction & validation</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Compliance checking</div>
                </div>
                <div className="text-xs text-gray-500 pt-4 border-t border-white/5">
                  Requested by: GrossMargin for Enterprise Operations
                </div>
              </div>

            </div>

            <div className="text-center">
              <Link to="/agentx/hub" className="glass-btn-primary inline-flex items-center gap-2">
                Explore All Agents in AgentX HUB
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
                Why Choose OBSOLIO Agents?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built for professionals, by professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, color: "text-blue-400", title: "Domain Expertise Built-In", desc: "Available agents come pre-trained on specific industry standards and requirements." },
                { icon: Zap, color: "text-yellow-400", title: "Deploy in Minutes", desc: "No complex setup. Select your agent, configure parameters, and start processing." },
                { icon: Shield, color: "text-green-400", title: "Regulatory Compliance", desc: "Agents designed with compliance in mind (GDPR, ISO, Industry Standards)." },
                { icon: Eye, color: "text-purple-400", title: "Human-in-the-Loop", desc: "Seamlessly integrate human oversight for critical decisions and quality assurance." },
                { icon: Brain, color: "text-pink-400", title: "Continuous Learning", desc: "Agents adapt to your specific data and feedback loops for improved accuracy." },
                { icon: Users, color: "text-cyan-400", title: "No Bias, No Bad Days", desc: "Consistent, objective analysis every time. No fatigue, no mood swings, no unconscious bias—just reliable, fair decision-making." },
                { icon: DollarSign, color: "text-orange-400", title: "Transparent ROI", desc: "Measurable efficiency gains in document processing and decision support." },
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

        {/* How It Works */}
        <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Three Steps to Intelligence</h2>
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
                  Find the perfect pre-made agent for your specific industry use case.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto glass-card rounded-full flex items-center justify-center mb-6 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                  <Settings className="w-10 h-10 text-purple-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white border border-black">2</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Customize</h3>
                <p className="text-gray-400 leading-relaxed px-4">
                  Tune the agent's parameters and integrate it into your existing workflow.
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
                  Run your tasks, review outputs, and let the agent learn and adapt.
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
                Trusted Across Industries
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: LineChart, label: "Tech & Finance", desc: "Competition & Market Analysis", metric: "High Precision" },
                { icon: GraduationCap, label: "Education", desc: "Admissions & Language Assessment", metric: "CEFR Aligned" },
                { icon: Gavel, label: "Legal Services", desc: "Contract Analysis (Country-Specific)", metric: "Customizable" },
                { icon: Stethoscope, label: "Healthcare", desc: "Clinical Data Processing", metric: "Compliant" },
                { icon: Users, label: "HR & Recruitment", desc: "Candidate Screening", metric: "Bias-Free" },
                { icon: Building2, label: "Real Estate", desc: "Property Valuation", metric: "Market Data" },
                { icon: Shield, label: "Insurance", desc: "Claims Processing", metric: "Automated" },
                { icon: Factory, label: "Manufacturing", desc: "Quality Control", metric: "Real-time" },
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

            {/* Important Disclaimer */}
            <div className="mt-16 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex flex-col md:flex-row gap-4 items-start max-w-5xl mx-auto">
              <Shield className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-yellow-200 font-bold mb-2">Professional Augmentation, Not Replacement</h4>
                <p className="text-sm text-yellow-100/90 leading-relaxed">
                  OBSOLIO Agents are not substitutes for doctors, judges, or lawyers. They serve as intelligent assistants for verification, reducing workload, and saving time through unbiased analysis. All critical decisions require professional human oversight and final approval.
                </p>
                <p className="text-xs text-yellow-200/70 mt-2 italic">
                  وكلاء OBSOLIO ليسوا بديلاً للأطباء أو القضاة أو المحامين، بل أداة للتدقيق وتقليل المجهود وتوفير الوقت باستخدام وكلاء غير متحيزين.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials - Restored */}
        <section className="py-24 px-6 relative overflow-hidden bg-white/[0.02] border-t border-white/5">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Our Partners & Success Stories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Dr. Heba Saleh */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-brand-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-500/20 group-hover:text-primary-500/40 transition-colors" />
                <p className="text-gray-300 italic mb-8 leading-relaxed text-lg">
                  "The Precision AI Judge Agent has revolutionized how we evaluate tech competition submissions. It provides consistent, unbiased scoring while maintaining the nuanced understanding we need for fair assessment."
                </p>
                <div className="flex items-center gap-4">
                  <img src={DrHebaImage} alt="Dr. Heba Saleh" className="w-16 h-16 rounded-full object-cover border-2 border-primary-500/20" />
                  <div>
                    <h4 className="font-bold text-white text-lg">Dr. Heba Saleh</h4>
                    <p className="text-sm text-primary-400 uppercase tracking-wider">ITI Chairwoman</p>
                  </div>
                </div>
              </div>

              {/* Eng. Ahmed Salah */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-brand-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-500/20 group-hover:text-primary-500/40 transition-colors" />
                <p className="text-gray-300 italic mb-8 leading-relaxed text-lg">
                  "The Precision AI Files Agent transformed our document processing workflow. What used to take our team days now happens in minutes, with exceptional accuracy in extracting and categorizing critical business data."
                </p>
                <div className="flex items-center gap-4">
                  <img src={AhmedSalahImage} alt="Eng. Ahmed Salah" className="w-16 h-16 rounded-full object-cover border-2 border-primary-500/20" />
                  <div>
                    <h4 className="font-bold text-white text-lg">Eng. Ahmed Salah</h4>
                    <p className="text-sm text-primary-400 uppercase tracking-wider">CEO, GrossMargin</p>
                  </div>
                </div>
              </div>

              {/* Third Testimonial - CEFR Agent */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-purple-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-500/20 group-hover:text-primary-500/40 transition-colors" />
                <p className="text-gray-300 italic mb-8 leading-relaxed text-lg">
                  "The CEFR Assessment Agent has brought unprecedented consistency to our language proficiency evaluations. It ensures every candidate is assessed against the same rigorous standards, eliminating subjectivity from our certification process."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-xl border-2 border-primary-500/20">LS</div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Dr. Laura Schmidt</h4>
                    <p className="text-sm text-primary-400 uppercase tracking-wider">Director, Language Institute</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto text-center glass-card p-12 border-primary-500/30 shadow-[0_0_50px_rgba(14,165,233,0.15)]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
              Ready to Upgrade Your Workflow?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join leading organizations using AgentX HUB Precision Agents.
              Start with a 14-day free trial.
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
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> ISO 27001</span>
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default HomePage;
