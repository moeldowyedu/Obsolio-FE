import React, { useState, useEffect } from 'react';
import { Check, Zap, Building2, Crown, ArrowRight, HelpCircle } from 'lucide-react';
import pricingService from '../../services/pricingService';
import { useTheme } from '../../contexts/ThemeContext';

const PlanSelector = ({ selectedPlanId, selectedBillingCycle, onSelectPlan }) => {
  const { theme } = useTheme();
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billingCycle, setBillingCycle] = useState(selectedBillingCycle || 'monthly');

  useEffect(() => {
    // Sync internal state if prop changes
    if (selectedBillingCycle) {
      setBillingCycle(selectedBillingCycle);
    }
  }, [selectedBillingCycle]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await pricingService.getPlans();
        if (data && typeof data === 'object') {
          setPlans(data);
        }
      } catch (err) {
        console.error("Failed to load plans", err);
        setError('Unable to load pricing plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
    // If a plan is already selected, we need to re-trigger selection with new cycle
    // But typically we wait for user to click a card. 
    // Ideally, if they switch cycle, we might want to keep the same plan selected but update the billing cycle prop.
    // implementing simplified logic: just update local state, selection happens on card click.
  };

  const handleSelect = (plan, cycle) => {
    onSelectPlan(plan.id, cycle);
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
      return '$0';
    }
  };

  const getSelectedVariant = (planName) => {
    if (!plans || !plans[planName]) return null;
    const variants = plans[planName];
    if (!Array.isArray(variants)) return null;
    return variants.find(v => v?.billing_cycle?.code === billingCycle) || variants[0];
  };

  // Sort: API order reversed (Low to High usually if API matches schema)
  const orderedPlanNames = Object.keys(plans).reverse();

  const getIcon = (name) => {
    switch (name) {
      case 'Starter': return Zap;
      case 'Enterprise': return Crown;
      default: return Building2;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className={`w-10 h-10 border-4 border-t-primary-500 rounded-full animate-spin ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-sm underline">Try Again</button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-8">
        <div className={`inline-flex items-center rounded-lg p-1 ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-slate-200'}`}>
          <button
            type="button"
            onClick={() => handleBillingCycleChange('monthly')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${billingCycle === 'monthly'
              ? (theme === 'dark' ? 'bg-primary-600 text-white shadow-lg' : 'bg-primary-600 text-white shadow-md')
              : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-900')
              }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => handleBillingCycleChange('annual')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center gap-2 ${billingCycle === 'annual'
              ? (theme === 'dark' ? 'bg-primary-600 text-white shadow-lg' : 'bg-primary-600 text-white shadow-md')
              : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-900')
              }`}
          >
            Annual
            <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full text-[10px] uppercase font-bold">
              -17%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orderedPlanNames.map((planName) => {
          const plan = getSelectedVariant(planName);
          if (!plan) return null;

          const Icon = getIcon(planName);
          const isSelected = selectedPlanId === plan.id;
          const isPopular = plan.name === 'Professional'; // Or metadata logic

          // Price Logic Checks
          let priceToUse = parseFloat(plan.final_price);
          if ((!priceToUse || priceToUse === 0) && parseFloat(plan.base_price) > 0) {
            priceToUse = parseFloat(plan.base_price);
          }
          const finalPrice = priceToUse || 0;
          const displayPrice = billingCycle === 'annual' && finalPrice > 0 ? (finalPrice / 12) : finalPrice;


          return (
            <div
              key={plan.id}
              onClick={() => handleSelect(plan, billingCycle)}
              className={`
                relative rounded-xl p-5 border-2 cursor-pointer transition-all duration-200 flex flex-col
                ${isSelected
                  ? 'border-primary-500 ring-4 ring-primary-500/10 ' + (theme === 'dark' ? 'bg-primary-500/5' : 'bg-primary-50')
                  : (theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white border-slate-200 hover:border-slate-300')
                }
              `}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`}>
                  <Icon className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`} />
                </div>
                {isSelected && <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white"><Check className="w-4 h-4" /></div>}
              </div>

              <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{planName}</h3>
              <p className={`text-xs mb-4 line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{plan.description}</p>

              <div className="mt-auto">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatPrice(displayPrice)}</span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>/mo</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-xs text-slate-400'}`}>Billed {formatPrice(finalPrice)}/yr</p>
                )}
              </div>

              {/* Simplified Features for Selection Card */}
              <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs">
                    <Check className="w-3 h-3 text-green-500" />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>
                      {plan.max_users ? `Up to ${plan.max_users} users` : 'Unlimited users'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <Check className="w-3 h-3 text-green-500" />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>
                      {plan.trial_days}-day free trial
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanSelector;
