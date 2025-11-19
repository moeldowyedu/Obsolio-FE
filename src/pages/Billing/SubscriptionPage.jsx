import { Check } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';

const SubscriptionPage = () => {
  const currentPlan = {
    name: 'Professional',
    price: '$99',
    period: 'per month',
    nextBilling: '2024-02-15',
    status: 'active'
  };

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: 'per month',
      features: [
        '5 AI Agents',
        '1,000 executions/month',
        'Basic support',
        '1 GB storage'
      ],
      isCurrent: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      features: [
        '25 AI Agents',
        '10,000 executions/month',
        'Priority support',
        '10 GB storage',
        'Advanced analytics'
      ],
      isCurrent: true,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: 'per month',
      features: [
        'Unlimited AI Agents',
        'Unlimited executions',
        '24/7 dedicated support',
        '100 GB storage',
        'Custom integrations',
        'SLA guarantee'
      ],
      isCurrent: false
    }
  ];

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Subscription</h1>
          <p className="text-secondary-600">
            Manage your subscription plan and billing
          </p>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Current Plan</h2>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-secondary-900">
                    {currentPlan.name}
                  </h3>
                  <Badge color="green">{currentPlan.status}</Badge>
                </div>
                <p className="text-3xl font-bold text-primary-600 mb-2">
                  {currentPlan.price} <span className="text-lg font-normal text-secondary-600">{currentPlan.period}</span>
                </p>
                <p className="text-sm text-secondary-600">
                  Next billing date: <strong>{currentPlan.nextBilling}</strong>
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Available Plans */}
        <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? 'border-2 border-primary-600' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge color="blue">Most Popular</Badge>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary-900">{plan.price}</span>
                  <span className="text-secondary-600 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.isCurrent ? 'outline' : 'primary'}
                  disabled={plan.isCurrent}
                >
                  {plan.isCurrent ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
