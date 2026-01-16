import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Zap, Building2, Crown, ArrowRight, HelpCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import pricingService from '../../services/pricingService';

const PricingPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      console.log('PricingPage: Fetching plans...');
      try {
        setLoading(true);
        const data = await pricingService.getPlans();
        console.log('PricingPage: Plans fetched:', data);

        // Check if data is valid object
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          setPlans(data);
        } else {
          console.warn('PricingPage: No plans data received or empty object.');
        }
      } catch (err) {
        console.error("PricingPage: Failed to load plans", err);
        setError('Unable to load pricing plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = (planId, billingCycleCode) => {
    // Redirect to register with plan params
    const params = new URLSearchParams({
      plan: planId,
      billing: billingCycleCode
    });
    navigate(`/register?${params.toString()}`);
  };

  const formatPrice = (price) => {
    try {
      if (price === undefined || price === null || isNaN(price)) return '$0';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } catch (e) {
      console.error('Price formatting error', e);
      return '$0';
    }
  };

  // Helper to find the correct variant for the current billing cycle
  const getSelectedVariant = (planName) => {
    if (!plans || !plans[planName]) return null;
    const variants = plans[planName];
    if (!Array.isArray(variants)) return null;
    return variants.find(v => v?.billing_cycle?.code === billingCycle) || variants[0];
  };

  // Sort order: Show all plans returned by the API (Reversed order)
  const orderedPlanNames = Object.keys(plans).reverse();

  // Icons mapping
  const getIcon = (name) => {
    switch (name) {
      case 'Starter': return Zap;
      case 'Enterprise': return Crown;
      default: return Building2;
    }
  };

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
            <p className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Choose the perfect plan for your needs. All plans include access to our Precision AI Engines.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="flex justify-center">
              <div className={`inline-flex items-center rounded-lg p-1 ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${billingCycle === 'monthly'
                    ? (theme === 'dark'
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-primary-600 text-white shadow-md')
                    : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-900')
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-6 py-2 rounded-md font-medium text-sm transition-all flex items-center gap-2 ${billingCycle === 'annual'
                    ? (theme === 'dark'
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-primary-600 text-white shadow-md')
                    : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-900')
                    }`}
                >
                  Annual
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                    Save ~17%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Loading State - Simple Fallback */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <div className={`w-12 h-12 border-4 border-t-primary-500 rounded-full animate-spin ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}></div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>Loading plans...</p>
            </div>
          )}

          {/* Error State - Simple Fallback */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500 text-2xl font-bold">!</div>
              <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Pricing Cards */}
          {!loading && !error && orderedPlanNames.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto`}>
              {orderedPlanNames.map((planName) => {
                const plan = getSelectedVariant(planName);
                if (!plan) return null;

                const Icon = getIcon(planName);
                const isPopular = planName === 'Professional';

                // Safety checks for properties
                const discount = plan.billing_cycle?.discount_percentage;
                const savings = billingCycle === 'annual' && discount > 0
                  ? parseFloat(discount).toFixed(0)
                  : null;

                // Fallback to base_price if final_price is missing or 0 (unless it's truly free)
                let priceToUse = parseFloat(plan.final_price);
                if ((!priceToUse || priceToUse === 0) && parseFloat(plan.base_price) > 0) {
                  priceToUse = parseFloat(plan.base_price);
                }
                const finalPrice = priceToUse || 0;

                const displayPrice = billingCycle === 'annual' && finalPrice > 0
                  ? (finalPrice / 12)
                  : finalPrice;

                return (
                  <div
                    key={plan.id || planName}
                    className={`
                      relative rounded-2xl p-8 transition-all duration-300 flex flex-col
                      ${isPopular
                        ? 'ring-2 ring-primary-500 ' + (theme === 'dark'
                          ? 'bg-gradient-to-b from-primary-500/10 to-purple-500/5 shadow-2xl shadow-primary-500/20'
                          : 'bg-white shadow-2xl scale-105 z-10')
                        : (theme === 'dark'
                          ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                          : 'bg-white border border-slate-200 hover:shadow-xl')
                      }
                    `}
                  >
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="px-4 py-1.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full text-xs font-bold text-white shadow-lg">
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-6">
                      <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`}>
                        <Icon className={`w-6 h-6 ${isPopular ? 'text-primary-400' : (theme === 'dark' ? 'text-gray-400' : 'text-slate-600')}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {planName}
                        </h3>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {formatPrice(displayPrice)}
                        </span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                          /month
                        </span>
                      </div>

                      {billingCycle === 'annual' && (
                        <div className="mt-2 space-y-1">
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                            Billed {formatPrice(finalPrice)} annually
                          </p>
                          {savings && (
                            <span className="inline-block px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-bold rounded">
                              Save {savings}%
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleSelectPlan(plan.id, plan.billing_cycle?.code)}
                      className={`
                        w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 mb-8
                        ${isPopular
                          ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30'
                          : (theme === 'dark'
                            ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300')
                        }
                      `}
                    >
                      {plan.trial_days > 0 ? 'Start Free Trial' : 'Get Started'}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Features */}
                    <div className="flex-1">
                      <p className={`text-sm font-semibold mb-4 uppercase tracking-wider ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                        What's included
                      </p>

                      {/* Highlight Features */}
                      {plan.highlight_features && plan.highlight_features.length > 0 && (
                        <ul className="space-y-3 mb-4">
                          {plan.highlight_features.map((feature, idx) => (
                            <li key={`hl-${idx}`} className="flex items-start gap-2 text-sm font-medium">
                              <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
                              <span className={theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Regular Features */}
                      {plan.features && plan.features.length > 0 && (
                        <ul className="space-y-3">
                          {plan.features.map((feature, idx) => (
                            <li key={`f-${idx}`} className="flex items-start gap-2 text-sm">
                              <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Agent Limits Display */}
                      <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                        <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          Limits:
                        </p>
                        <ul className="space-y-2 text-xs">
                          <li className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                            <span>Included Executions</span>
                            <span className="font-mono">{new Intl.NumberFormat('en-US').format(plan.included_executions || 0)}</span>
                          </li>
                          <li className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                            <span>Basic Agents</span>
                            <span className="font-mono">{plan.max_basic_agents ?? 'Unlimited'}</span>
                          </li>
                          <li className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                            <span>Pro Agents</span>
                            <span className="font-mono">{plan.max_professional_agents ?? '0'}</span>
                          </li>
                          <li className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                            <span>Team Members</span>
                            <span className="font-mono">{plan.max_users ? `Up to ${plan.max_users}` : 'Unlimited'}</span>
                          </li>
                          <li className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                            <span>Storage</span>
                            <span className="font-mono">{plan.storage_gb ? `${plan.storage_gb} GB` : 'Unlimited'}</span>
                          </li>
                          {plan.overage_price_per_execution && (
                            <li className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                              <span>Overage Cost</span>
                              <span className="font-mono">${plan.overage_price_per_execution}/run</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && orderedPlanNames.length === 0 && (
            <div className="py-20 text-center">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>No plans available at the moment.</p>
            </div>
          )}

          {/* Trial info */}
          <div className={`text-center mt-12 p-4 rounded-lg max-w-2xl mx-auto ${theme === 'dark' ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-primary-50 border border-primary-200'}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-primary-300' : 'text-primary-700'}`}>
              All paid plans include a <strong>14-day free trial</strong> • No credit card required to sign up
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
              Common questions about our plans and pricing.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Can I change plans later?', a: 'Yes! You can upgrade or downgrade at any time. Changes take effect on the next billing cycle.' },
              { q: 'What happens if I exceed my execution limits?', a: 'You will be charged an overage fee per execution based on your plan tier. We will notify you when you approach your limit.' },
              { q: 'Is there a long-term contract?', a: 'No, you can cancel monthly plans at any time. Annual plans are billed upfront for one year.' },
              { q: 'What are "Basic" vs "Professional" agents?', a: 'Basic agents use standard models for general tasks. Professional agents use advanced reasoning models for complex workflows.' },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.'
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className={`group rounded-xl p-6 transition-all ${theme === 'dark'
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <summary className={`flex items-center justify-between cursor-pointer list-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`} />
                </summary>
                <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
