import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Users, Building2,
  Sparkles, Bot, Workflow, Eye, DollarSign, Database, FileText,
  Code, Mic, Video, Globe, Activity, Briefcase
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import ObsolioLogo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import DrHebaImage from '../../assets/imgs/heba-saleh.png';
import AhmedSalahImage from '../../assets/imgs/ahmed-salah.jpg';
import { Quote } from 'lucide-react';

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
                    High Precision AI Agents
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                  <span className="block text-white">Deploy Precision</span>
                  <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    AI Agents
                  </span>
                </h1>

                <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Tenant-based dashboard for executing high-precision AI engines on Video, Audio, Code, and more.
                  Scale with Human-in-the-Loop (HITL) oversight.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/register" className="glass-btn-primary group flex items-center justify-center gap-3">
                    Start 7-Day Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="#how-it-works" className="glass-btn hover:bg-white/10 text-white flex items-center justify-center gap-2">
                    See How It Works
                  </a>
                </div>

                <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span>Cancel anytime</span>
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
                    <div className="p-2 bg-blue-500/20 rounded-lg"><Video className="w-5 h-5 text-blue-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">Video Analysis</div>
                      <div className="text-gray-400">Processing...</div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 right-0 bg-gray-900/80 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <div className="p-2 bg-purple-500/20 rounded-lg"><Code className="w-5 h-5 text-purple-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">Code Generation</div>
                      <div className="text-gray-400">Completed</div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-0 bg-gray-900/80 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                    <div className="p-2 bg-green-500/20 rounded-lg"><Database className="w-5 h-5 text-green-400" /></div>
                    <div className="text-xs">
                      <div className="font-bold text-white">Data Extraction</div>
                      <div className="text-gray-400">Active</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Partners / Trusted By */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-widest font-semibold">
              Powering Next-Gen Enterprises
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholders for Partner Logos - Text for now */}
              <h3 className="text-xl font-bold font-heading text-white">ACME Corp</h3>
              <h3 className="text-xl font-bold font-heading text-white">GlobalTech</h3>
              <h3 className="text-xl font-bold font-heading text-white">Nebula AI</h3>
              <h3 className="text-xl font-bold font-heading text-white">FutureScale</h3>
              <h3 className="text-xl font-bold font-heading text-white">OrbitSystems</h3>
            </div>
          </div>
        </section>

        {/* Precision Engines */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                6 Precision AI Engines
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The core modalities that power our high-precision agents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Video, color: "text-blue-400", title: "Videos", desc: "Frame-by-frame content analysis, object tracking, and scene understanding." },
                { icon: Mic, color: "text-purple-400", title: "Audios", desc: "High-fidelity transcription, sentiment analysis, and speaker separation." },
                { icon: Eye, color: "text-pink-400", title: "Images", desc: "Pixel-perfect object detection, OCR, and visual anomaly detection." },
                { icon: FileText, color: "text-yellow-400", title: "Files", desc: "Deep document parsing for PDFs, spreadsheets, and unstructured data." },
                { icon: Code, color: "text-green-400", title: "Source Code", desc: "Static analysis, refactoring, security auditing, and code generation." },
                { icon: Database, color: "text-orange-400", title: "Databases", desc: "Natural language querying (NL2SQL), schema inference, and data integration." },
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

        {/* Domain Sectors */}
        <section id="use-cases" className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Serving Every Major Sector
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Our agents utilize these engines to deliver specialized value across industries.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Zap, label: "Tech" },
                { icon: Shield, label: "Law" },
                { icon: Activity, label: "Health" },
                { icon: Building2, label: "Real Estate" },
                { icon: Briefcase, label: "Business" },
                { icon: TrendingUp, label: "Financial" },
              ].map((sector, idx) => (
                <div key={idx} className="glass-card p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors group">
                  <sector.icon className="w-8 h-8 text-gray-500 group-hover:text-primary-400 transition-colors" />
                  <span className="font-semibold text-gray-300 group-hover:text-white">{sector.label}</span>
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
                  All AI outputs in these domains should be reviewed and verified by human experts (Lawyers, Doctors, Judges) before action is taken.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Dr. Heba Saleh */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-primary-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-500/20 group-hover:text-primary-500/40 transition-colors" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500/30 p-0.5">
                    <img src={DrHebaImage} alt="Dr. Heba Saleh" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Dr. Heba Saleh</h4>
                    <p className="text-sm text-primary-400">Chairwoman, ITI</p>
                  </div>
                </div>
                <p className="text-gray-400 italic leading-relaxed">
                  "Obsolio's precision AI engines have transformed how we approach digital training and certification. The ability to deploy specialized agents with human oversight is a game-changer for educational institutions."
                </p>
              </div>

              {/* Ahmed Salah */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-purple-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-500/20 group-hover:text-purple-500/40 transition-colors" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30 p-0.5">
                    <img src={AhmedSalahImage} alt="Ahmed Salah" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Ahmed Salah</h4>
                    <p className="text-sm text-purple-400">CEO, GrossMargin</p>
                  </div>
                </div>
                <p className="text-gray-400 italic leading-relaxed">
                  "Refactoring our legacy codebase used to take months. With Obsolio's Code Engine agents, we cleaned up 50k lines of code in a week, with full audit trails."
                </p>
              </div>

              {/* Placeholder 2 */}
              <div className="glass-card p-8 relative group border-t-2 border-transparent hover:border-green-500/50">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-green-500/20 group-hover:text-green-500/40 transition-colors" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-xl font-bold text-green-400">
                    AK
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Amira Khaled</h4>
                    <p className="text-sm text-green-400">Legal Consultant</p>
                  </div>
                </div>
                <p className="text-gray-400 italic leading-relaxed">
                  "The HITL workflow is exactly what the legal sector needed. I can trust the AI to do the heavy lifting on document review, but I have the final say on every critical decision."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Orchestration & HITL */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Multi-Agent Orchestration
                  <br />
                  <span className="text-primary-400">Drag & Drop Workflow</span>
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  Orchestrate multiple agents working together 24/7. Use our easy drag-and-drop calendar to schedule workflows, dependency chains, and approval gates.
                </p>

                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <span className="text-gray-200">Visually build complex agent interactions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-gray-200">Human-in-the-Loop (HITL) approval steps</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-gray-200">Fully AI-Driven or Hybrid modes</span>
                  </li>
                </ul>

                <Link to="/register" className="glass-btn-primary inline-flex items-center gap-2">
                  Start Orchestrating
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="relative">
                {/* Abstract UI Representation of Calendar/Orchestration */}
                <div className="glass-card p-6 border-primary-500/30">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-white">Workflow Schedule</h3>
                    <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Running</div>
                  </div>
                  {/* Mock Calendar Grid */}
                  <div className="space-y-3">
                    <div className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5 items-center">
                      <div className="text-xs text-gray-500 w-12">09:00 AM</div>
                      <div className="flex-1 bg-blue-500/20 border border-blue-500/30 p-2 rounded text-sm text-blue-200 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Data Scraping Agent
                      </div>
                    </div>
                    <div className="flex justify-center h-4 border-l border-dashed border-gray-600 ml-[4.5rem]"></div>
                    <div className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5 items-center">
                      <div className="text-xs text-gray-500 w-12">09:30 AM</div>
                      <div className="flex-1 bg-purple-500/20 border border-purple-500/30 p-2 rounded text-sm text-purple-200 flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Report Generator
                      </div>
                    </div>
                    <div className="flex justify-center h-4 border-l border-dashed border-gray-600 ml-[4.5rem]"></div>
                    <div className="flex gap-4 p-3 bg-white/5 rounded-lg border border-yellow-500/30 items-center">
                      <div className="text-xs text-gray-500 w-12">10:00 AM</div>
                      <div className="flex-1 bg-yellow-500/10 border border-yellow-500/20 p-2 rounded text-sm text-yellow-200 flex items-center gap-2">
                        <Users className="w-3 h-3" /> HITL Approval Required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AgentX Hub / Marketplace */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/20 to-transparent -z-10"></div>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400/20 to-pink-400/20 border border-orange-400/30 px-3 py-1 rounded-full text-xs font-bold text-orange-200 mb-6">
              <DollarSign className="w-3 h-3" /> New Feature
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">AgentX Hub</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              The Marketplace for Precision AI. Monetize your custom agents (Code from Scratch, N8N, etc.) or deploy ready-made solutions instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Product 1 - CEFER */}
              <div className="glass-card overflow-hidden group">
                <div className="h-40 bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
                  <Mic className="w-12 h-12 text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white">CEFER Oral Assessment</h3>
                    <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px]">$59/mo</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">Automated speech scoring for language proficiency tests (A1-C2).</p>
                  <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors">View Details</button>
                </div>
              </div>

              {/* Product 2 - Mistral 7B (Keep as featured/free or replace? keeping for variety but making 3rd one the Competition Judge) */}
              <div className="glass-card overflow-hidden group border-primary-500/30">
                <div className="h-40 bg-gradient-to-br from-primary-900/40 to-gray-900 flex items-center justify-center relative">
                  <div className="absolute top-3 right-3 bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded">Mistral 7B</div>
                  <Sparkles className="w-12 h-12 text-primary-400" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white">Creative Copywriter</h3>
                    <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white">Free</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">Generate marketing copy with high conversion rates.</p>
                  <button className="w-full py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-sm font-bold text-white transition-colors">Deploy Now</button>
                </div>
              </div>

              {/* Product 3 - Competition Judge */}
              <div className="glass-card overflow-hidden group">
                <div className="h-40 bg-gradient-to-br from-purple-900 to-gray-900 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-purple-400 group-hover:text-white transition-colors" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white">Competition AI Judge</h3>
                    <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white">$99/mo</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">Unbiased scoring/ranking for hackathons and coding contests.</p>
                  <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors">View Details</button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link to="/register" className="text-gray-400 hover:text-white underline decoration-gray-600 hover:decoration-white underline-offset-4 transition-all">
                Browse all 500+ Agents in the Hub
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing / CTA */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start your <span className="text-primary-400">7 Days Free Trial</span></h2>
            <p className="text-xl text-gray-400 mb-10">
              Experience the power of Precision AI. No commitment, cancel anytime.
              <br />
              For enterprise needs, we offer custom tailored solutions.
            </p>

            <div className="glass-card p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-500"></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left">
                  <div className="text-3xl font-bold text-white mb-2">Free Trial</div>
                  <div className="text-gray-400">Full access to all engines</div>
                </div>
                <div className="text-5xl font-bold font-mono text-primary-400">
                  $0 <span className="text-base text-gray-500 font-normal">/ 7 days</span>
                </div>
              </div>

              <hr className="border-white/10 my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
                <div className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-4 h-4 text-green-400" /> Unlimited Projects</div>
                <div className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-4 h-4 text-green-400" /> All 7 Precision Engines</div>
                <div className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-4 h-4 text-green-400" /> AgentX Hub Access</div>
                <div className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-4 h-4 text-green-400" /> 5GB Storage Included</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="glass-btn-primary flex-1 flex justify-center items-center gap-2">
                  Start Free Trial
                </Link>
                <Link to="/contact" className="glass-btn flex-1 flex justify-center items-center gap-2 text-white hover:bg-white/10">
                  Contact For Enterprise
                </Link>
              </div>
            </div>
          </div>
        </section>



      </div>
    </MainLayout>
  );
};

export default HomePage;
