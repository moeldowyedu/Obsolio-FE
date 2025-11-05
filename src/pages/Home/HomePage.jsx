import { Link } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout'

const HomePage = () => {
  const features = [
    {
      icon: 'videocam',
      title: 'Video & Audio Analysis',
      description: 'Evaluate presentations, pitches, and interviews with advanced AI analysis of visual and audio content.',
    },
    {
      icon: 'image',
      title: 'Documents and Images Review',
      description: 'Process and analyze PDF, Word documents, and images with intelligent content understanding and visual recognition.',
    },
    {
      icon: 'code',
      title: 'Source Code Assessment',
      description: 'Judge programming quality, structure, documentation, and best practices across multiple languages.',
    },
    {
      icon: 'tune',
      title: 'Custom Evaluation Criteria',
      description: 'Define your own scoring metrics and weightings tailored to your specific evaluation needs.',
    },
    {
      icon: 'assessment',
      title: 'AI Report Generation',
      description: 'Generate comprehensive evaluation reports with detailed insights, scores, and improvement recommendations.',
    },
    {
      icon: 'security',
      title: 'Objective & Consistent',
      description: 'Eliminate bias and ensure fair, consistent evaluations across all submissions with AI-powered objectivity.',
    },
  ]

  const useCases = [
    {
      icon: 'emoji_events',
      title: 'Competitions & Hackathons',
      description: 'Deliver automated, unbiased scoring for hackathons, innovation challenges, and talent competitions. Ensure every participant receives fair and consistent evaluation based on predefined criteria.',
    },
    {
      icon: 'school',
      title: 'Education & Training',
      description: 'Provide objective evaluation of student projects, presentations, and assignments. Help educators save time while delivering detailed, constructive feedback to enhance learning outcomes.',
    },
    {
      icon: 'work',
      title: 'Recruitment & Interviews',
      description: 'Pre-screen candidates efficiently using recorded interviews and coding tests. Evaluate technical skills, communication abilities, and cultural fit with data-driven insights.',
    },
    {
      icon: 'trending_up',
      title: 'Performance Reviews',
      description: 'Support fair employee evaluations and promotion decisions with objective performance metrics. Provide transparent, criteria-based assessments that reduce bias and improve workplace equity.',
    },
  ]

  const scoreCategories = [
    { name: 'Technical Quality', score: 92 },
    { name: 'Presentation & Clarity', score: 85 },
    { name: 'Innovation', score: 88 },
    { name: 'Documentation', score: 83 },
  ]

  const insights = [
    { icon: 'check_circle', text: 'Excellent code structure and adherence to best practices' },
    { icon: 'check_circle', text: 'Strong presentation skills with clear articulation of concepts' },
    { icon: 'info', text: 'Consider adding more detailed API documentation for better maintainability' },
    { icon: 'info', text: 'Include edge case handling in the test suite for comprehensive coverage' },
  ]

  return (
    <MainLayout showFooter={true}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center -mt-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="fade-in-up">
            <div className="inline-block glass-card rounded-full px-6 py-3 mb-8">
              <span className="text-sm font-medium text-gray-700">Powered by Advanced AI Technology</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 text-shadow-lg">
            Meet <span className="gradient-text">Aasim</span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800 text-shadow">
            The AI Judge Agent
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            AI-powered evaluation for competitions, education, and professional assessments.
          </p>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Aasim analyzes videos, audio, documents, and source code to deliver objective,
            criteria-based evaluation reports with unmatched fairness and consistency.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link to="/register" className="glass-btn-primary rounded-full px-8 py-4 text-lg glow">
              Try Aasim Now
            </Link>
            <a href="#about" className="glass-btn-secondary rounded-full px-8 py-4 text-lg">
              Learn More
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

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 text-shadow">
              Intelligent, Fair, Data-Driven
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
              Aasim is an intelligent AI-powered digital judge designed to revolutionize how we evaluate
              and assess content. Whether it's a competition submission, student project, job interview,
              or performance review, Aasim provides objective, consistent, and insightful evaluations.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              With the ability to analyze multiple media types — including videos, audio files,
              text documents (PDF, Word), and source code — Aasim ensures fairness and transparency
              in every assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-shadow">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Multi-modal analysis capabilities for comprehensive evaluation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card-hover rounded-3xl p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400/30 to-accent-400/30 border border-primary-300/30">
                  <span className="material-icons text-5xl text-primary-700">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-shadow">
              Transform Your Evaluation Process
            </h2>
            <p className="text-xl text-gray-600">
              Aasim adapts to diverse assessment scenarios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="glass-card rounded-3xl p-10">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400/30 to-accent-400/30 border border-primary-300/30">
                    <span className="material-icons text-4xl text-primary-700">{useCase.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-900">{useCase.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-primary-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-shadow">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600">
              Multi-modal analysis with state-of-the-art technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video/Audio Visual */}
            <div className="glass-card-hover rounded-3xl p-8">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-12 mb-6 flex items-center justify-center">
                <span className="material-icons text-8xl text-purple-600">videocam</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Video & Audio</h3>
              <p className="text-gray-600">Analyze presentations, speeches, and interviews</p>
            </div>

            {/* Document/Image Visual */}
            <div className="glass-card-hover rounded-3xl p-8">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-12 mb-6 flex items-center justify-center">
                <span className="material-icons text-8xl text-blue-600">image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Documents & Images</h3>
              <p className="text-gray-600">Review PDFs, Word files, and visual content</p>
            </div>

            {/* Code Visual */}
            <div className="glass-card-hover rounded-3xl p-8">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-12 mb-6 flex items-center justify-center">
                <span className="material-icons text-8xl text-green-600">code</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Source Code</h3>
              <p className="text-gray-600">Assess code quality and best practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Preview Section */}
      <section id="report" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-shadow">
              Detailed AI-Generated Reports
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive insights with actionable feedback
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <h3 className="text-2xl font-semibold text-gray-900">Evaluation Report</h3>
              <div className="glass-card rounded-full px-6 py-2">
                <span className="text-sm font-medium text-gray-800">Overall Score: 87/100</span>
              </div>
            </div>

            {/* Score Categories */}
            <div className="space-y-6 mb-8">
              {scoreCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-800">{category.name}</span>
                    <span className="text-gray-600">{category.score}/100</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${category.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="glass-card rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <span className="material-icons mr-2 text-primary-600">lightbulb</span>
                AI Insights & Recommendations
              </h4>
              <ul className="space-y-3 text-gray-700">
                {insights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`material-icons text-sm mr-2 mt-1 ${
                      insight.icon === 'check_circle' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {insight.icon}
                    </span>
                    <span>{insight.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-primary-50/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-shadow">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your evaluation needs
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
                  <span className="text-gray-600 ml-2">credit balance</span>
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
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Email support</span>
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
                  <span className="text-sm">All AI agents</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Detailed reports</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Custom criteria</span>
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
                  <span className="text-sm">All AI agents</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">Dedicated support</span>
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
                  <span className="text-sm">White-label options</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">SLA guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                  <span className="text-sm">24/7 premium support</span>
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
              Empower Your Decisions with AI Fairness
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join organizations worldwide that trust Aasim for objective, consistent,
              and insightful evaluations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register" className="glass-btn-primary rounded-full px-8 py-4 text-lg glow">
                Get Started with Aasim
              </Link>
              <a href="#pricing" className="glass-btn-secondary rounded-full px-8 py-4 text-lg">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default HomePage
