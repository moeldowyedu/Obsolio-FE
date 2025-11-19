import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Users, Building2, Sparkles, Bot, Workflow, Eye, DollarSign } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-secondary-900 tracking-tight">Aasim AI</span>
            </Link>
            <div className="flex items-center gap-4">
              <a href="#features" className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors hidden sm:inline">Features</a>
              <a href="#how-it-works" className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors hidden sm:inline">How It Works</a>
              <a href="#pricing" className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors hidden sm:inline">Pricing</a>
              <Link to="/login" className="text-secondary-700 hover:text-secondary-900 font-semibold transition-colors">Sign In</Link>
              <Link to="/register" className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Precision AI Platform for Teams & Individuals
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6 leading-tight tracking-tight">
                Deploy AI Agents.<br />
                Run Smart Jobs.<br />
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Scale with HITL.</span>
              </h1>
              <p className="text-xl text-secondary-600 mb-8 leading-relaxed font-medium">
                Build, deploy, and monetize Precision AI Agents with premade rubrics. Run one-time or scheduled jobs, orchestrate multi-agent workflows, and maintain human oversight.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl text-lg tracking-wide">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 border-2 border-secondary-300 text-secondary-700 px-8 py-4 rounded-xl font-bold hover:border-secondary-400 hover:bg-secondary-50 transition-all text-lg tracking-wide">
                  See How It Works
                </a>
              </div>
              <div className="flex items-center gap-8 text-sm text-secondary-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
                <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary-900">AgentX Hub</div>
                      <div className="text-sm text-secondary-600">Deploy precision AI agents</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">Vision</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">Audio</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">Text</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Workflow className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary-900">Job Flows</div>
                      <div className="text-sm text-secondary-600">Orchestrate & schedule</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-secondary-700">Multi-agent workflow running</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-secondary-700">HITL approval pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-secondary-500 mb-8 uppercase tracking-wider font-bold">Trusted by teams worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-900 mb-1">500x</div>
              <div className="text-sm text-secondary-600 font-semibold">Faster</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-900 mb-1">97%</div>
              <div className="text-sm text-secondary-600 font-semibold">Cost Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-900 mb-1">24/7</div>
              <div className="text-sm text-secondary-600 font-semibold">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-900 mb-1">10k+</div>
              <div className="text-sm text-secondary-600 font-semibold">Agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* For Personal & Organizations */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4 tracking-tight">
              Built for Everyone
            </h2>
            <p className="text-xl text-secondary-600 font-medium">
              Whether you're an individual or an enterprise, Aasim AI scales with you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal */}
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4 tracking-tight">Personal Users</h3>
              <p className="text-secondary-600 mb-6 font-medium">
                Quick setup, powerful results. No organization structure needed.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Create unlimited projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Deploy agents with premade rubrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Run one-time or scheduled jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">HITL oversight & approvals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Monetize by creating agents</span>
                </li>
              </ul>
            </div>

            {/* Organization */}
            <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl p-8">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4 tracking-tight">Organizations</h3>
              <p className="text-secondary-600 mb-6 font-medium">
                Everything for personal users, plus enterprise features.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Full organizational hierarchy</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Branches, departments & teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Unlimited users & role management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Shared projects across organization</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Advanced analytics & reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4 tracking-tight">
              Complete AI Platform
            </h2>
            <p className="text-xl text-secondary-600 font-medium">
              Everything you need to build, deploy, and scale AI operations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">AgentX Hub</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                Deploy precision AI agents from our marketplace with premade rubrics. Build and monetize your own.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Workflow className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">Job Flows</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                Run agents one-time or scheduled. Orchestrate multi-agent workflows for complex tasks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">HITL Framework</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                Human-in-the-loop oversight with approval workflows, activity logs, and audit trails.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">Monetization</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                Create and publish agents to AgentX Hub. Earn revenue from your AI innovations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">7 Precision Engines</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                Vision, Audio, Text, Code, Document, Data, and Web engines for any use case.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">Enterprise Security</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                SOC 2 compliant, encrypted data, role-based access, and complete audit logs.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">Analytics & Insights</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                Track agent performance, job execution, costs, and ROI in real-time.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">API & Integrations</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                Connect with 100+ apps via API, webhooks, and native integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-secondary-600 font-medium">
              From setup to scale in 4 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">Create Project</h3>
                <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                  Set up your first project in seconds. No complex setup required.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="w-6 h-6 text-gray-300" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">Deploy Agents</h3>
                <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                  Browse AgentX Hub, select agents, deploy with premade rubrics.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="w-6 h-6 text-gray-300" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">Run Jobs</h3>
                <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                  Execute one-time jobs or schedule recurring workflows.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="w-6 h-6 text-gray-300" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2 tracking-tight">Monitor & Scale</h3>
              <p className="text-secondary-600 text-sm font-medium leading-relaxed">
                Track with HITL oversight, optimize, and scale as you grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4 tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-secondary-600 font-medium">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 transition-all">
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 tracking-tight">Starter</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-secondary-900 tracking-tight">$49</span>
                <span className="text-secondary-600 font-semibold">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">5 agents deployed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">1,000 job runs/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Basic HITL features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Email support</span>
                </li>
              </ul>
              <Link to="/register" className="block w-full text-center bg-gray-100 text-secondary-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Professional */}
            <div className="bg-white rounded-2xl p-8 border-2 border-primary-600 relative hover:shadow-xl transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 tracking-tight">Professional</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-secondary-900 tracking-tight">$199</span>
                <span className="text-secondary-600 font-semibold">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Unlimited agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">10,000 job runs/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Advanced HITL & workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Priority support</span>
                </li>
              </ul>
              <Link to="/register" className="block w-full text-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-300 transition-all">
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 tracking-tight">Enterprise</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-secondary-900 tracking-tight">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Unlimited everything</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Dedicated support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">SLA & compliance</span>
                </li>
              </ul>
              <a href="mailto:sales@aasim.ai" className="block w-full text-center bg-gray-100 text-secondary-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-accent-purple-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-secondary-200 font-medium">
            Join thousands of teams using Aasim AI to automate their workflows
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-white text-secondary-900 px-8 py-4 rounded-xl font-bold hover:bg-secondary-50 transition-all shadow-xl hover:shadow-2xl text-lg tracking-wide">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="mailto:sales@aasim.ai" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all text-lg tracking-wide">
              Talk to Sales
            </a>
          </div>
          <p className="mt-6 text-secondary-300 text-sm font-semibold">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/agentx/marketplace" className="hover:text-white transition-colors">AgentX Hub</Link></li>
                <li><Link to="/engines" className="hover:text-white transition-colors">AI Engines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/api" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="/status" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="/compliance" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-white font-semibold">Aasim AI</span>
            </div>
            <p className="text-sm">© 2025 Aasim AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
