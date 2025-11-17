import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';

// Lazy load the heavy component to improve initial load time
const WhyUsePrecisionAgents = lazy(() =>
  import('../../components/home').then(module => ({
    default: module.WhyUsePrecisionAgents
  }))
);

const HomePage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <MainLayout showFooter={true} showSidebar={false}>
      {/* Hero Section - Concise and Powerful */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-white via-purple-50/30 to-white">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 tracking-tight font-heading">
            <span className="gradient-text">{t.heroTitle}</span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700">
            {t.heroSubtitle}
          </h2>

          {/* Key Benefits */}
          <p className="text-xl md:text-2xl text-primary-600 mb-8 font-medium">
            {t.heroBenefits}
          </p>

          {/* Value Proposition */}
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t.heroDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/register"
              className="glass-btn-primary rounded-full px-10 py-4 text-lg font-semibold glow hover:scale-105 transition-transform"
            >
              {t.startFreeTrial}
            </Link>
            <a
              href="https://calendly.com/aasim-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-secondary rounded-full px-10 py-4 text-lg font-semibold border-2 border-primary-500 hover:bg-primary-50 transition-all"
            >
              {t.bookDemo}
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-6">
              <div className="text-4xl font-bold text-primary-600 mb-2">500x</div>
              <div className="text-sm text-gray-600">Faster Processing</div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">97%</div>
              <div className="text-sm text-gray-600">Cost Reduction</div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Precision AI Agents - Full comprehensive section */}
      <Suspense fallback={
        <div className="py-20 px-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
      }>
        <WhyUsePrecisionAgents />
      </Suspense>

      {/* Social Proof - Compact */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 font-heading">
            {t.testimonialsTitle || "Trusted by Industry Leaders"}
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            {t.testimonialsSubtitle || "Join thousands of organizations saving time and money"}
          </p>

          {/* Featured Testimonials - Just 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-icons text-yellow-400 text-lg">star</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{t.testimonial1Quote?.substring(0, 150)}..."
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Dr. Heba Saleh"
                  className="w-12 h-12 rounded-full mr-3"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-gray-900">Dr. Heba Saleh</div>
                  <div className="text-sm text-gray-600">ITI Chairwoman</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-icons text-yellow-400 text-lg">star</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{t.testimonial2Quote?.substring(0, 150)}..."
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Ahmed El-Sayed"
                  className="w-12 h-12 rounded-full mr-3"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-gray-900">Ahmed El-Sayed</div>
                  <div className="text-sm text-gray-600">CTO, TechStart</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-icons text-yellow-400 text-lg">star</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{t.testimonial3Quote?.substring(0, 150)}..."
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=45"
                  alt="Sarah Martinez"
                  className="w-12 h-12 rounded-full mr-3"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-gray-900">Sarah Martinez</div>
                  <div className="text-sm text-gray-600">Global Hackathon Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Overview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 font-heading">
            {t.aiAgentsTitle || "Precision AI Agents for Every Task"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform">
              <span className="material-icons text-5xl text-blue-600 mb-4">videocam</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.agent1Title}</h3>
              <p className="text-gray-700">{t.agent1Description}</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform">
              <span className="material-icons text-5xl text-purple-600 mb-4">image</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.agent2Title}</h3>
              <p className="text-gray-700">{t.agent2Description}</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform">
              <span className="material-icons text-5xl text-green-600 mb-4">code</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.agent3Title}</h3>
              <p className="text-gray-700">{t.agent3Description}</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/marketplace"
              className="glass-btn-primary rounded-xl px-8 py-3 font-semibold inline-flex items-center"
            >
              <span className="material-icons mr-2">store</span>
              Explore All Agents
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview - Simple */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 font-heading">
            {t.pricingTitle}
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            {t.pricingSubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Small Business */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.smallBusiness}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$100</span>
                <span className="text-gray-600">{t.perMonth}</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.evaluationsMonth}</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.allAgents}</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.prioritySupport}</span>
                </li>
              </ul>
              <Link to="/register" className="w-full block text-center glass-btn-secondary rounded-xl px-6 py-3 font-semibold">
                {t.getStarted}
              </Link>
            </div>

            {/* Medium - Popular */}
            <div className="glass-card rounded-3xl p-8 border-2 border-primary-400 glow transform scale-105">
              <div className="text-center mb-4">
                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  {t.popular}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.medium}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$250</span>
                <span className="text-gray-600">{t.perMonth}</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.evaluations300}</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.advancedAnalytics}</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.apiAccess}</span>
                </li>
              </ul>
              <Link to="/register" className="w-full block text-center glass-btn-primary rounded-xl px-6 py-3 font-semibold glow">
                {t.getStarted}
              </Link>
            </div>

            {/* Enterprise */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.enterprise}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{t.custom}</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.unlimitedEvaluations}</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.customModels}</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-600 text-sm mr-2 mt-1">check</span>
                  <span>{t.support247}</span>
                </li>
              </ul>
              <Link to="/register" className="w-full block text-center glass-btn-secondary rounded-xl px-6 py-3 font-semibold">
                {t.contactUs}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            {t.finalCtaTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t.finalCtaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/register"
              className="glass-btn-primary rounded-full px-10 py-4 text-lg font-semibold glow"
            >
              {t.startFreeTrial}
            </Link>
            <Link
              to="/marketplace"
              className="glass-btn-secondary rounded-full px-10 py-4 text-lg font-semibold border-2 border-primary-500"
            >
              Explore Marketplace
            </Link>
          </div>
          <p className="text-sm text-gray-600">{t.noCredit}</p>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
