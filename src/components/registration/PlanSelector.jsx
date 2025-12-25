import { useState } from 'react';
import { Check, Zap, Building2, Crown, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const PlanSelector = ({ tenantType, selectedPlan, onSelectPlan }) => {
  const { theme } = useTheme();
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Define plans based on tenant type
  const personalPlans = [
    {
      id: 'personal-free',
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      popular: false,
      icon: Sparkles,
      description: 'Perfect for trying out OBSOLIO',
      features: [
        '3 Precision AI Agents',
        'Access to all 7 AI Engines',
        'Basic rubrics library',
        '500 agent runs/month',
        'Community support',
        'Webhook integration'
      ],
      limits: {
        agents: 3,
        runs: 500,
        workflows: 1,
        storage: '1 GB'
      }
    },
    {
      id: 'personal-pro',
      name: 'Personal Pro',
      price: 29,
      yearlyPrice: 24, // 20% discount
      popular: true,
      icon: Zap,
      description: 'For power users and professionals',
      features: [
        'Unlimited Precision AI Agents',
        'Custom rubrics creation',
        '10,000 agent runs/month',
        'Priority support',
        'API + SDK access',
        'Advanced HITL workflows',
        'Multi-agent orchestration',
        'Publish to marketplace',
        '70% revenue share'
      ],
      limits: {
        agents: 'Unlimited',
        runs: '10,000',
        workflows: 'Unlimited',
        storage: '50 GB'
      }
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
      description: 'Get started with team collaboration',
      features: [
        '5 Precision AI Agents',
        'Access to all 7 AI Engines',
        'Basic rubrics library',
        '1,000 agent runs/month',
        'Up to 5 team members',
        'Community support',
        'Basic analytics'
      ],
      limits: {
        agents: 5,
        runs: '1,000',
        members: 5,
        storage: '5 GB'
      }
    },
    {
      id: 'org-pro',
      name: 'Org Pro',
      price: 99,
      yearlyPrice: 79, // 20% discount
      popular: true,
      icon: Zap,
      description: 'For growing teams and departments',
      features: [
        '50 Precision AI Agents',
        'Custom rubrics creation',
        '25,000 agent runs/month',
        'Up to 25 team members',
        'Priority support',
        'API + SDK access',
        'Advanced HITL workflows',
        'Multi-agent orchestration',
        'Advanced analytics',
        'Role-based access control'
      ],
      limits: {
        agents: 50,
        runs: '25,000',
        members: 25,
        storage: '100 GB'
      }
    },
    {
      id: 'org-team',
      name: 'Org Team',
      price: 299,
      yearlyPrice: 239, // 20% discount
      popular: false,
      icon: Building2,
      description: 'For large teams with complex needs',
      features: [
        'Unlimited Precision AI Agents',
        'Custom rubrics + templates',
        '100,000 agent runs/month',
        'Unlimited team members',
        'Dedicated support',
        'Full API access',
        'Advanced HITL + custom workflows',
        'White-label options',
        'SSO integration',
        'Advanced security features',
        'Custom integrations'
      ],
      limits: {
        agents: 'Unlimited',
        runs: '100,000',
        members: 'Unlimited',
        storage: '500 GB'
      }
    },
    {
      id: 'org-enterprise',
      name: 'Enterprise',
      price: 'Custom',
      yearlyPrice: 'Custom',
      popular: false,
      icon: Crown,
      description: 'For enterprises with specific requirements',
      features: [
        'Everything in Org Team',
        'Unlimited agent runs',
        'Dedicated account manager',
        'SLA guarantees',
        'Custom contracts',
        'Multi-tenant management',
        'On-premise deployment option',
        'Custom AI model training',
        '24/7 phone support',
        'Compliance certifications'
      ],
      limits: {
        agents: 'Unlimited',
        runs: 'Unlimited',
        members: 'Unlimited',
        storage: 'Custom'
      },
      isEnterprise: true
    }
  ];

  const plans = tenantType === 'personal' ? personalPlans : organizationPlans;

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Choose Your Plan
        </h2>
        <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
          {tenantType === 'personal'
            ? 'Select a plan that fits your needs. Upgrade anytime.'
            : 'Select a plan for your organization. Scale as you grow.'}
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className={`inline-flex items-center rounded-lg p-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
          <button
            type="button"
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
            type="button"
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

      {/* Free Trial Notice */}
      <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-primary-50 border border-primary-200'}`}>
        <p className={`text-sm ${theme === 'dark' ? 'text-primary-300' : 'text-primary-700'}`}>
          🎉 Start with a <strong>14-day free trial</strong> on any paid plan • No credit card required
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const savings = getSavings(plan);
          const Icon = plan.icon;

          return (
            <div
              key={plan.id}
              onClick={() => !plan.isEnterprise && onSelectPlan(plan.id)}
              className={`
                relative rounded-2xl p-6 transition-all cursor-pointer border-2
                ${plan.popular
                  ? 'ring-2 ring-primary-500 ring-offset-2 ' + (theme === 'dark' ? 'ring-offset-[#0B0E14]' : 'ring-offset-white')
                  : ''
                }
                ${isSelected
                  ? 'border-primary-500 ' + (theme === 'dark' ? 'bg-primary-500/10' : 'bg-primary-50')
                  : (theme === 'dark'
                    ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                    : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-lg')
                }
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full text-xs font-bold text-white shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Selected Checkmark */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-primary-400' : (theme === 'dark' ? 'text-gray-400' : 'text-slate-600')}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {getDisplayPrice(plan)}
                  </span>
                  {plan.price !== 0 && plan.price !== 'Custom' && (
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                      /month
                    </span>
                  )}
                </div>
                {billingCycle === 'yearly' && savings && (
                  <p className="text-xs text-green-400 font-medium mt-1">
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
              <ul className="space-y-2 mb-4">
                {plan.features.slice(0, 5).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}>{feature}</span>
                  </li>
                ))}
                {plan.features.length > 5 && (
                  <li className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                    + {plan.features.length - 5} more features
                  </li>
                )}
              </ul>

              {/* CTA Button */}
              {plan.isEnterprise ? (
                <button
                  type="button"
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
                  }`}
                >
                  Contact Sales
                </button>
              ) : (
                <div className={`text-center text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                  {isSelected ? '✓ Selected' : 'Click to select'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className={`text-center text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
        All plans include: Access to all 7 Precision AI Engines, webhook integration, and community support
      </div>
    </div>
  );
};

export default PlanSelector;
