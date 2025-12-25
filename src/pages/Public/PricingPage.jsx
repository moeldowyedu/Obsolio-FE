import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Zap, Building2, Crown, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const PricingPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [accountType, setAccountType] = useState('personal'); // personal or organization

  const personalPlans = [
    {
      id: 'personal-free',
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      popular: false,
      icon: Sparkles,
      tagline: 'Perfect for trying out OBSOLIO',
      features: [
        '3 Precision AI Agents',
        'Access to all 7 AI Engines',
        'Basic rubrics library',
        '500 agent runs per month',
        'Community support',
        'Webhook integration',
        '1 GB storage'
      ],
      limits: {
        agents: 3,
        runs: 500,
        workflows: 1,
        storage: '1 GB'
      },
      cta: 'Get Started Free',
      ctaVariant: 'outline'
    },
    {
      id: 'personal-pro',
      name: 'Personal Pro',
      price: 29,
      yearlyPrice: 24,
      popular: true,
      icon: Zap,
      tagline: 'For power users and professionals',
      features: [
        'Unlimited Precision AI Agents',
        'Custom rubrics creation',
        '10,000 agent runs per month',
        'Priority email support',
        'Full API + SDK access',
        'Advanced HITL workflows',
        'Multi-agent orchestration',
        'Publish to marketplace',
        '70% revenue share',
        '50 GB storage'
      ],
      limits: {
        agents: 'Unlimited',
        runs: '10,000',
        workflows: 'Unlimited',
        storage: '50 GB'
      },
      cta: 'Start Free Trial',
      ctaVariant: 'primary'
    }
  ];

  const organizationPlans = [
    {
      id: 'org-free',
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      popular: false,
      icon: Building2,
      tagline: 'Get started with team collaboration',
      features: [
        '5 Precision AI Agents',
        'Access to all 7 AI Engines',
        'Basic rubrics library',
        '1,000 agent runs per month',
        'Up to 5 team members',
        'Community support',
        'Basic analytics',
        '5 GB team storage'
      ],
      limits: {
        agents: 5,
        runs: '1,000',
        members: 5,
        storage: '5 GB'
      },
      cta: 'Get Started Free',
      ctaVariant: 'outline'
    },
    {
      id: 'org-pro',
      name: 'Org Pro',
      price: 99,
      yearlyPrice: 79,
      popular: true,
      icon: Zap,
      tagline: 'For growing teams and departments',
      features: [
        '50 Precision AI Agents',
        'Custom rubrics creation',
        '25,000 agent runs per month',
        'Up to 25 team members',
        'Priority support (24hr response)',
        'Full API + SDK access',
        'Advanced HITL workflows',
        'Multi-agent orchestration',
        'Advanced analytics & insights',
        'Role-based access control',
        '100 GB team storage'
      ],
      limits: {
        agents: 50,
        runs: '25,000',
        members: 25,
        storage: '100 GB'
      },
      cta: 'Start Free Trial',
      ctaVariant: 'primary'
    },
    {
      id: 'org-team',
      name: 'Org Team',
      price: 299,
      yearlyPrice: 239,
      popular: false,
      icon: Building2,
      tagline: 'For large teams with complex needs',
      features: [
        'Unlimited Precision AI Agents',
        'Custom rubrics + templates',
        '100,000 agent runs per month',
        'Unlimited team members',
        'Dedicated support manager',
        'Full API access with higher limits',
        'Advanced HITL + custom workflows',
        'White-label options',
        'SSO integration (SAML, OAuth)',
        'Advanced security features',
        'Custom integrations',
        '500 GB team storage'
      ],
      limits: {
        agents: 'Unlimited',
        runs: '100,000',
        members: 'Unlimited',
        storage: '500 GB'
      },
      cta: 'Start Free Trial',
      ctaVariant: 'primary'
    },
    {
      id: 'org-enterprise',
      name: 'Enterprise',
      price: 'Custom',
      yearlyPrice: 'Custom',
      popular: false,
      icon: Crown,
      tagline: 'For enterprises with specific requirements',
      features: [
        'Everything in Org Team',
        'Unlimited agent runs',
        'Dedicated account manager',
        'SLA guarantees (99.9% uptime)',
        'Custom contracts & pricing',
        'Multi-tenant management',
        'On-premise deployment option',
        'Custom AI model training',
        '24/7 phone & chat support',
        'Compliance certifications',
        'Custom storage solutions'
      ],
      limits: {
        agents: 'Unlimited',
        runs: 'Unlimited',
        members: 'Unlimited',
        storage: 'Custom'
      },
      cta: 'Contact Sales',
      ctaVariant: 'outline',
      isEnterprise: true
    }
  ];

  const plans = accountType === 'personal' ? personalPlans : organizationPlans;

  const getDisplayPrice = (plan) => {
    if (plan.price === 'Custom') return 'Custom';
    if (plan.price === 0) return 'Free';
    const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.price;
    return `$${price}`;
  };

  const getSavings = (plan) => {
    if (typeof plan.price !== 'number' || plan.price === 0) return null;
    const monthlyCost = plan.price * 12;
    const yearlyCost = plan.yearlyPrice * 12;
    return monthlyCost - yearlyCost;
  };

  const handleCTA = (plan) => {
    if (plan.isEnterprise) {
      navigate('/contact');
    } else {
      navigate('/register', { state: { selectedPlan: plan.id } });
    }
  };

  const faqs = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Enterprise customers can also pay via invoice.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All paid plans include a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'What are "agent runs"?',
      answer: 'An agent run is each time you execute a Precision AI Agent. For example, analyzing one document or processing one data file counts as one run.'
    },
    {
      question: 'Can I use my own AI models?',
      answer: 'Enterprise plans include custom AI model training and integration. Contact our sales team to discuss your specific requirements.'
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'You will receive a notification when you reach 80% of your limits. You can either upgrade your plan or purchase additional agent runs as needed.'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
      <Header />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {theme === 'dark' ? (
            <>
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-20"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent"></div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Simple, Transparent Pricing
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Choose the perfect plan for your needs. All plans include access to our 7 Precision AI Engines.
            </p>

            {/* Account Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className={`inline-flex items-center rounded-lg p-1 ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-200'}`}>
                <button
                  onClick={() => setAccountType('personal')}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                    accountType === 'personal'
                      ? (theme === 'dark'
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50'
                        : 'bg-white text-slate-900 shadow-md')
                      : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-900')
                  }`}
                >
                  Personal
                </button>
                <button
                  onClick={() => setAccountType('organization')}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                    accountType === 'organization'
                      ? (theme === 'dark'
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50'
                        : 'bg-white text-slate-900 shadow-md')
                      : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-900')
                  }`}
                >
                  Organization
                </button>
              </div>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex justify-center">
              <div className={`inline-flex items-center rounded-lg p-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 md:px-6 py-2 rounded-md font-medium text-sm transition-all ${
                    billingCycle === 'monthly'
                      ? (theme === 'dark'
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'bg-white text-slate-900 shadow-sm')
                      : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-900')
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 md:px-6 py-2 rounded-md font-medium text-sm transition-all flex items-center gap-2 ${
                    billingCycle === 'yearly'
                      ? (theme === 'dark'
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'bg-white text-slate-900 shadow-sm')
                      : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-900')
                  }`}
                >
                  Yearly
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className={`grid grid-cols-1 gap-8 max-w-7xl mx-auto ${
            plans.length === 2 ? 'md:grid-cols-2 lg:max-w-5xl' :
            plans.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
            'md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {plans.map((plan) => {
              const savings = getSavings(plan);
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`
                    relative rounded-2xl p-8 transition-all duration-300
                    ${plan.popular
                      ? 'ring-2 ring-primary-500 ' + (theme === 'dark'
                        ? 'bg-gradient-to-b from-primary-500/10 to-purple-500/5 shadow-2xl shadow-primary-500/20'
                        : 'bg-gradient-to-b from-primary-50 to-white shadow-2xl scale-105')
                      : (theme === 'dark'
                        ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                        : 'bg-white border border-slate-200 hover:shadow-xl')
                    }
                  `}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-1.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full text-xs font-bold text-white shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`}>
                      <Icon className={`w-6 h-6 ${plan.popular ? 'text-primary-400' : (theme === 'dark' ? 'text-gray-400' : 'text-slate-600')}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                        {plan.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {getDisplayPrice(plan)}
                      </span>
                      {plan.price !== 0 && plan.price !== 'Custom' && (
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                          /month
                        </span>
                      )}
                    </div>
                    {billingCycle === 'yearly' && savings && (
                      <p className="text-sm text-green-400 font-medium mt-2">
                        Save ${savings}/year
                      </p>
                    )}
                    {plan.price !== 0 && plan.price !== 'Custom' && billingCycle === 'yearly' && (
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                        Billed ${plan.yearlyPrice * 12}/year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCTA(plan)}
                    className={`
                      w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2
                      ${plan.ctaVariant === 'primary'
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30'
                        : (theme === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300')
                      }
                    `}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Free Trial Notice */}
          <div className={`text-center mt-12 p-4 rounded-lg ${theme === 'dark' ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-primary-50 border border-primary-200'}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-primary-300' : 'text-primary-700'}`}>
              All paid plans include a <strong>14-day free trial</strong> • No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`py-20 ${theme === 'dark' ? 'bg-white/5' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className={`group rounded-xl p-6 transition-all ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <summary className={`flex items-center justify-between cursor-pointer list-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`} />
                </summary>
                <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Still have questions?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-500/30"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* All Plans Include Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              All Plans Include
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '7 Precision AI Engines', desc: 'Vision, Audio, Text, Code, Document, Data, Web' },
              { title: 'Unlimited Team Members', desc: 'Collaborate with your entire team' },
              { title: 'Webhook Integration', desc: 'Connect with your favorite tools' },
              { title: 'Community Support', desc: 'Active community and documentation' },
              { title: 'Regular Updates', desc: 'New features and improvements' },
              { title: 'Data Security', desc: 'Enterprise-grade security standards' }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}
              >
                <h3 className={`font-semibold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
