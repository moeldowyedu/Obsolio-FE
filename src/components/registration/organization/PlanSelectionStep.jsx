import { useState } from 'react';
import { Check, Zap, TrendingUp, Building2 } from 'lucide-react';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import { useRegistrationWizardStore } from '../../../store/registrationWizardStore';
import { PLANS } from '../../../utils/constants';

const PlanSelectionStep = ({ onNext, onBack }) => {
  const { setSelectedPlan, tenantType } = useRegistrationWizardStore();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState(null);

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

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
    setSelectedPlan(
      {
        planId,
        billingCycle,
      },
      null
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlanId) {
      onNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">Choose Your Plan</h2>
        <p className="text-secondary-600">
          {tenantType === 'organization'
            ? 'Select the plan that best fits your organization\'s needs. You can upgrade or downgrade anytime.'
            : 'Start with the perfect plan for your individual use. Upgrade as you grow.'}
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button
            type="button"
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
            type="button"
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const monthlyPrice = getMonthlyPrice(plan);
          const yearlySavings = getYearlySavings(plan);

          return (
            <div
              key={plan.id}
              onClick={() => handleSelectPlan(plan.id)}
              className={`relative bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
                plan.popular
                  ? 'border-primary-600 shadow-lg transform scale-105'
                  : isSelected
                  ? 'border-secondary-500 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary-600 text-white px-4 py-1 font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}

              {isSelected && (
                <div className="absolute -top-3 right-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  {typeof monthlyPrice === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-secondary-900">${monthlyPrice}</span>
                      <span className="text-secondary-600">/month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-secondary-900">{monthlyPrice}</span>
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
                <p className="text-xs font-semibold text-secondary-700 mb-2">Usage Limits:</p>
                <div className="space-y-1 text-xs text-secondary-600">
                  <div className="flex justify-between">
                    <span>Agents:</span>
                    <span className="font-medium text-secondary-900">
                      {plan.limits.maxAgents === -1 ? 'Unlimited' : plan.limits.maxAgents}
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

              {/* Select Button */}
              <Button
                type="button"
                variant={isSelected ? 'primary' : plan.popular ? 'primary' : 'outline'}
                className="w-full"
                onClick={() => handleSelectPlan(plan.id)}
              >
                {isSelected ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Selected
                  </>
                ) : plan.id === 'enterprise' ? (
                  'Contact Sales'
                ) : (
                  <>
                    {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                    Select {plan.name}
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
        <div className="flex-shrink-0">
          <Building2 className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900 mb-1">All plans include:</h4>
          <p className="text-sm text-blue-700">
            Access to all 7 Precision AI Engines, unlimited team members, API access, webhook
            integrations, and 24/7 support. You can upgrade or downgrade your plan at any time.
          </p>
        </div>
      </div>

      {/* Free Trial Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
        <p className="text-green-800 font-medium">
          🎉 Start with a 14-day free trial on any plan. No credit card required!
        </p>
      </div>

      {/* Error Message */}
      {!selectedPlanId && (
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Please select a plan to continue</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack} type="button">
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!selectedPlanId}
            className="min-w-[200px]"
          >
            {tenantType === 'organization' ? 'Complete Setup' : 'Start Free Trial'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlanSelectionStep;
