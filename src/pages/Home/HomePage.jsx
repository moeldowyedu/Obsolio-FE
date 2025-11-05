import { Link } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout'

const HomePage = () => {
  return (
    <MainLayout showFooter={true}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center -mt-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="fade-in-up">
            <div className="inline-block glass-card rounded-full px-6 py-3 mb-8">
              <span className="text-sm font-medium text-gray-700">Powered by Advanced AI</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 text-shadow-lg">
            Meet <span className="gradient-text">Aasim</span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800 text-shadow">
            Your AI Judge Agent
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Objective AI evaluation for competitions, education, and professional assessments
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link to="/register" className="glass-btn-primary rounded-full px-8 py-4 text-lg glow">
              Get Started Free
            </Link>
            <a href="#pricing" className="glass-btn-secondary rounded-full px-8 py-4 text-lg">
              View Pricing
            </a>
          </div>

          {/* Floating Icon */}
          <div className="mt-20 animate-bounce">
            <div className="inline-block glass-card rounded-3xl p-8">
              <span className="material-icons text-8xl text-primary-600">psychology</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Aasim Evaluates */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-shadow">
              Multi-Modal AI Analysis
            </h2>
            <p className="text-xl text-gray-600">
              Evaluate any type of content with advanced AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video/Audio */}
            <div className="glass-card-hover rounded-3xl p-8 text-center">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-12 mb-6 flex items-center justify-center">
                <span className="material-icons text-8xl text-purple-600">videocam</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Video & Audio</h3>
              <p className="text-gray-600">Presentations, interviews, speeches</p>
            </div>

            {/* Documents/Images */}
            <div className="glass-card-hover rounded-3xl p-8 text-center">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-12 mb-6 flex items-center justify-center">
                <span className="material-icons text-8xl text-blue-600">image</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Documents & Images</h3>
              <p className="text-gray-600">PDFs, Word files, visual content</p>
            </div>

            {/* Code */}
            <div className="glass-card-hover rounded-3xl p-8 text-center">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-12 mb-6 flex items-center justify-center">
                <span className="material-icons text-8xl text-green-600">code</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Source Code</h3>
              <p className="text-gray-600">Programming projects, code quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-primary-50/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-shadow">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="glass-card-hover rounded-3xl p-8 border-2 border-transparent hover:border-primary-300 transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-400/30 to-gray-500/30 mb-4">
                  <span className="material-icons text-4xl text-gray-700">account_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$5</span>
                  <span className="text-gray-600 ml-2">credit</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">5 evaluations</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">All AI agents</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Basic reports</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="w-full block text-center glass-btn-secondary rounded-xl px-6 py-3 font-semibold"
              >
                Get Started
              </Link>
            </div>

            {/* Small Business Plan */}
            <div className="glass-card-hover rounded-3xl p-8 border-2 border-primary-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  POPULAR
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400/30 to-primary-500/30 mb-4">
                  <span className="material-icons text-4xl text-primary-700">business</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Small Business</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$100</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">100 evaluations/month</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Detailed reports</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="w-full block text-center glass-btn-primary rounded-xl px-6 py-3 font-semibold glow"
              >
                Get Started
              </Link>
            </div>

            {/* Medium Plan */}
            <div className="glass-card-hover rounded-3xl p-8 border-2 border-transparent hover:border-primary-300 transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400/30 to-blue-500/30 mb-4">
                  <span className="material-icons text-4xl text-blue-700">domain</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Medium</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$250</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">300 evaluations/month</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">API access</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="w-full block text-center glass-btn-secondary rounded-xl px-6 py-3 font-semibold"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card-hover rounded-3xl p-8 border-2 border-transparent hover:border-primary-300 transition-all bg-gradient-to-br from-purple-50/50 to-primary-50/50">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400/30 to-purple-500/30 mb-4">
                  <span className="material-icons text-4xl text-purple-700">corporate_fare</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">Contact Us</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Unlimited evaluations</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Custom AI models</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">24/7 support</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="w-full block text-center glass-btn-secondary rounded-xl px-6 py-3 font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-shadow">
              Ready to Start?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join organizations using Aasim for objective, AI-powered evaluations
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register" className="glass-btn-primary rounded-full px-8 py-4 text-lg glow">
                Start Free Trial
              </Link>
              <a href="#pricing" className="glass-btn-secondary rounded-full px-8 py-4 text-lg">
                Compare Plans
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default HomePage
