import { Link } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout'

const HomePage = () => {
  const industries = [
    { name: 'Education', icon: 'school' },
    { name: 'Technology', icon: 'computer' },
    { name: 'Law', icon: 'gavel' },
    { name: 'Healthcare', icon: 'local_hospital' },
    { name: 'Competitions', icon: 'emoji_events' },
    { name: 'Events', icon: 'event' },
    { name: 'Business', icon: 'business_center' },
    { name: 'Creative', icon: 'palette' },
  ]

  return (
    <MainLayout showFooter={true}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center -mt-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-7xl md:text-9xl font-bold mb-8 text-gray-900 text-shadow-lg tracking-tight">
            <span className="gradient-text">AASIM</span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-gray-800">
            The AI Judge Agent
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto font-light">
            Effortless • Unbiased • Cost-Effective
          </p>

          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Save <strong>80% of your budget</strong> and <strong>90% of your time</strong> with AI-powered evaluation.<br/>
            No human feelings. Just pure objectivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="glass-btn-primary rounded-full px-10 py-4 text-lg glow font-semibold">
              Start Free Trial
            </Link>
            <a href="#why" className="glass-btn-secondary rounded-full px-10 py-4 text-lg font-semibold">
              Why Aasim?
            </a>
          </div>
        </div>
      </section>

      {/* Why Aasim is Perfect */}
      <section id="why" className="py-20 px-6 bg-gradient-to-b from-primary-50/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900">
            Why Aasim is the Perfect Choice
          </h2>
          <p className="text-center text-xl text-gray-600 mb-16">
            Traditional human judging is expensive, slow, and subjective. Aasim changes everything.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cost Savings */}
            <div className="glass-card rounded-3xl p-8 text-center hover:shadow-2xl transition-all">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-400/30 to-green-600/30">
                <span className="material-icons text-5xl text-green-700">savings</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Save Your Budget</h3>
              <p className="text-gray-700 mb-4">
                Hiring human judges costs <strong>$50-200+ per hour</strong>.
              </p>
              <p className="text-green-700 font-bold text-lg">
                With Aasim: <strong>$1 per evaluation</strong>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                80% cost reduction on average
              </p>
            </div>

            {/* Time Efficiency */}
            <div className="glass-card rounded-3xl p-8 text-center hover:shadow-2xl transition-all">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400/30 to-blue-600/30">
                <span className="material-icons text-5xl text-blue-700">speed</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Save Your Time</h3>
              <p className="text-gray-700 mb-4">
                Human judges take <strong>hours to days</strong> per evaluation.
              </p>
              <p className="text-blue-700 font-bold text-lg">
                Aasim delivers in <strong>minutes</strong>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                90% faster evaluation process
              </p>
            </div>

            {/* No Bias */}
            <div className="glass-card rounded-3xl p-8 text-center hover:shadow-2xl transition-all">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400/30 to-purple-600/30">
                <span className="material-icons text-5xl text-purple-700">psychology</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Zero Human Bias</h3>
              <p className="text-gray-700 mb-4">
                No personal feelings, no favoritism, no bad days.
              </p>
              <p className="text-purple-700 font-bold text-lg">
                100% objective criteria-based evaluation
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Consistent across all submissions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900">
            Industries We Serve
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            Aasim evaluates content across multiple sectors
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 text-center hover:bg-white/90 transition-all">
                <span className="material-icons text-4xl text-primary-600 mb-3">{industry.icon}</span>
                <p className="text-gray-900 font-semibold">{industry.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human in the Loop */}
      <section className="py-20 px-6 bg-gradient-to-b from-primary-50/20 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400/30 to-primary-600/30">
              <span className="material-icons text-6xl text-primary-700">people</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Human-in-the-Loop (Optional)
            </h2>

            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Worried about AI making final decisions? <strong>We get it.</strong>
            </p>

            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Aasim provides detailed AI analysis and scoring, then you can choose to:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card rounded-2xl p-6">
                <span className="material-icons text-4xl text-green-600 mb-3">bolt</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Fully Automated</h3>
                <p className="text-gray-700 text-sm">
                  Let Aasim handle everything automatically
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <span className="material-icons text-4xl text-blue-600 mb-3">supervised_user_circle</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Human Review</h3>
                <p className="text-gray-700 text-sm">
                  Review AI results before final approval
                </p>
              </div>
            </div>

            <p className="text-gray-600 italic">
              You stay in control. Aasim is your assistant, not your replacement.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900">
            Transparent Pricing
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            Choose the plan that saves you the most
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small Business */}
            <div className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all">
              <div className="text-center mb-6">
                <span className="material-icons text-5xl text-gray-700 mb-4">business</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Small Business</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">$100</span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-sm text-green-600 font-semibold">Save $4,900/month vs human judges</p>
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
            <div className="glass-card rounded-3xl p-8 border-2 border-primary-400 relative hover:shadow-2xl transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center mb-6">
                <span className="material-icons text-5xl text-primary-700 mb-4">domain</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Medium</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">$250</span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-sm text-green-600 font-semibold">Save $14,750/month vs human judges</p>
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
            <div className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all">
              <div className="text-center mb-6">
                <span className="material-icons text-5xl text-purple-700 mb-4">corporate_fare</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="text-sm text-green-600 font-semibold">Maximum savings for large scale</p>
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
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Link to="/register" className="w-full block text-center glass-btn-secondary rounded-xl px-6 py-3 font-semibold">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Transform Your Evaluation Process?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join hundreds of organizations saving time and money with Aasim
          </p>
          <Link to="/register" className="glass-btn-primary rounded-full px-12 py-5 text-xl glow font-semibold inline-block">
            Start Free Trial Now
          </Link>
          <p className="text-sm text-gray-500 mt-6">No credit card required • 5 free evaluations</p>
        </div>
      </section>
    </MainLayout>
  )
}

export default HomePage
