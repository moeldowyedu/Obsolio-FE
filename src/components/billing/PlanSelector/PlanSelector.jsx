import { useState } from 'react';
import { Button, Badge, Alert } from '../../common';
import { PLANS } from '../../../utils/constants';
import { Check, Zap, TrendingUp } from 'lucide-react';

const PlanSelector = ({ currentPlanId, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = async (planId) => {
    setIsProcessing(true);
    try {
      await onSelectPlan(planId, billingCycle);
    } finally {
      setIsProcessing(false);
    }
  };

  const getMonthlyPrice = (plan) => {
    if (typeof plan.price === 'number') {
      return billingCycle === 'yearly' ? Math.round(plan.price * 0.8) : plan.price;
    }
    return plan.price;
  };

  const getYearlySavings = (plan) => {
    if (typeof plan.price === 'number') {
      return plan.price * 12 - getMonthlyPrice(plan) * 12;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <Badge variant="success" size="sm" className="ml-2">
              Save 20%
            </Badge>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isCurrentPlan = currentPlanId === plan.id;
          const monthlyPrice = getMonthlyPrice(plan);
          const yearlySavings = getYearlySavings(plan);

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl border-2 p-6 transition-all ${
                plan.popular
                  ? 'border-primary-600 shadow-lg scale-105'
                  : isCurrentPlan
                  ? 'border-secondary-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" size="md" className="font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}

              {isCurrentPlan && (
                <div className="absolute -top-4 right-4">
                  <Badge variant="success" size="sm">
                    Current Plan
                  </Badge>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  {typeof monthlyPrice === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-secondary-900">
                        ${monthlyPrice}
                      </span>
                      <span className="text-secondary-600">/month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-secondary-900">
                      {monthlyPrice}
                    </span>
                  )}
                </div>
                {billingCycle === 'yearly' && yearlySavings > 0 && (
                  <p className="text-sm text-green-600 font-medium">
                    Save ${yearlySavings}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-secondary-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Limits */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-semibold text-secondary-700 mb-2">
                  Usage Limits:
                </p>
                <div className="space-y-1 text-xs text-secondary-600">
                  <div className="flex justify-between">
                    <span>Agents:</span>
                    <span className="font-medium text-secondary-900">
                      {plan.limits.maxAgents === -1
                        ? 'Unlimited'
                        : plan.limits.maxAgents}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Runs/month:</span>
                    <span className="font-medium text-secondary-900">
                      {plan.limits.maxRuns === -1
                        ? 'Unlimited'
                        : plan.limits.maxRuns.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Workflows:</span>
                    <span className="font-medium text-secondary-900">
                      {plan.limits.maxWorkflows === -1
                        ? 'Unlimited'
                        : plan.limits.maxWorkflows}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isCurrentPlan || isProcessing}
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full"
              >
                {isCurrentPlan ? (
                  'Current Plan'
                ) : plan.id === 'enterprise' ? (
                  'Contact Sales'
                ) : currentPlanId === 'starter' && plan.id === 'pro' ? (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </>
                ) : (
                  'Select Plan'
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <Alert variant="info">
        <strong>All plans include:</strong> Access to all 7 Precision AI Engines,
        unlimited team members, API access, and 24/7 support.
      </Alert>
    </div>
  );
};

export default PlanSelector;
