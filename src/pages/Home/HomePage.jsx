import { Link } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout'

const HomePage = () => {
  return (
    <MainLayout showFooter={true}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center -mt-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 text-shadow-lg">
            <span className="gradient-text">Aasim</span>
          </h1>

          <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-gray-800">
            Your AI Judge Agent
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Objective AI evaluation for any content
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="glass-btn-primary rounded-full px-10 py-4 text-lg glow">
              Start Free
            </Link>
            <a href="#pricing" className="glass-btn-secondary rounded-full px-10 py-4 text-lg">
              Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
            Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small Business */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Small Business</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$100</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>100 evaluations/month</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>All AI agents</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Link to="/register" className="w-full block text-center glass-btn-primary rounded-xl px-6 py-3 font-semibold">
                Get Started
              </Link>
            </div>

            {/* Medium */}
            <div className="glass-card rounded-3xl p-8 border-2 border-primary-400">
              <div className="text-center mb-4">
                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Medium</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$250</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>300 evaluations/month</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>API access</span>
                </li>
              </ul>
              <Link to="/register" className="w-full block text-center glass-btn-primary rounded-xl px-6 py-3 font-semibold glow">
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>Unlimited evaluations</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>Custom AI models</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>24/7 support</span>
                </li>
              </ul>
              <Link to="/register" className="w-full block text-center glass-btn-secondary rounded-xl px-6 py-3 font-semibold">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default HomePage
