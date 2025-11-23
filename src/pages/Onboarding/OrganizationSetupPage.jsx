import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Sparkles, ArrowRight, ArrowLeft, Check, Crown, Zap, Users } from 'lucide-react';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { useTenantStore } from '../../store/tenantStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const OrganizationSetupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const { createTenant, setCurrentTenant } = useTenantStore();
  const { user } = useAuthStore();

  const [organizationData, setOrganizationData] = useState({
    name: '',
    slug: '',
    selectedPlan: 'pro'
  });

  const [errors, setErrors] = useState({});

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out',
      features: [
        'Up to 5 AI agents',
        'Basic analytics',
        'Community support',
        '1 GB storage'
      ],
      icon: Sparkles,
      gradient: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$49',
      period: '/month',
      description: 'For growing teams',
      features: [
        'Up to 50 AI agents',
        'Advanced analytics',
        'Priority support',
        '50 GB storage',
        'Custom integrations'
      ],
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Unlimited AI agents',
        'Advanced analytics & reporting',
        'Dedicated support',
        'Unlimited storage',
        'Custom integrations',
        'SSO & advanced security',
        'SLA guarantee'
      ],
      icon: Crown,
      gradient: 'from-purple-500 to-pink-500',
      popular: false
    }
  ];

  const validateStep1 = () => {
    const newErrors = {};

    if (!organizationData.name.trim()) {
      newErrors.name = 'Organization name is required';
    } else if (organizationData.name.length < 3) {
      newErrors.name = 'Organization name must be at least 3 characters';
    }

    if (!organizationData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(organizationData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    } else if (organizationData.slug.length < 3) {
      newErrors.slug = 'Slug must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/onboarding/tenant-setup');
    } else {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-generate slug from name
    if (name === 'name') {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50);

      setOrganizationData(prev => ({
        ...prev,
        name: value,
        slug: autoSlug
      }));
    } else if (name === 'slug') {
      // Allow manual slug editing
      const sanitizedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '');

      setOrganizationData(prev => ({
        ...prev,
        slug: sanitizedSlug
      }));
    } else {
      setOrganizationData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectPlan = (planId) => {
    setOrganizationData(prev => ({ ...prev, selectedPlan: planId }));
  };

  const handleComplete = async () => {
    try {
      setIsCreating(true);

      const tenantData = {
        name: organizationData.name,
        slug: organizationData.slug,
        type: 'organization',
        plan: organizationData.selectedPlan,
        owner: user?.id || user?._id
      };

      const tenant = await createTenant(tenantData);

      if (tenant) {
        // Set as current tenant
        await setCurrentTenant(tenant.id || tenant._id);

        toast.success('Organization created successfully!');

        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 500);
      }
    } catch (error) {
      console.error('Failed to create organization:', error);
      toast.error('Failed to create organization. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            {step === 1 ? 'Set up your organization' : 'Choose your plan'}
          </h1>
          <p className="text-secondary-600">
            {step === 1 ? 'Tell us about your organization' : 'Select the plan that fits your needs'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step > 1 ? <Check className="w-5 h-5" /> : '1'}
          </div>
          <div className={`w-24 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>

        {/* Main Card */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          {/* Step 1: Organization Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Organization Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={organizationData.name}
                  onChange={handleChange}
                  placeholder="Acme Corporation"
                  icon={Building2}
                  error={errors.name}
                />
                <p className="text-xs text-secondary-600 mt-1">
                  This will be your organization's display name
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Unique Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-secondary-600 bg-gray-100 px-3 py-2.5 rounded-lg border border-gray-300">
                    aasim.ai/
                  </span>
                  <Input
                    type="text"
                    name="slug"
                    value={organizationData.slug}
                    onChange={handleChange}
                    placeholder="acme-corp"
                    error={errors.slug}
                  />
                </div>
                <p className="text-xs text-secondary-600 mt-1">
                  This will be your organization's unique URL
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Plan Selection */}
          {step === 2 && (
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const isSelected = organizationData.selectedPlan === plan.id;

                return (
                  <button
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`
                      relative text-left p-6 rounded-2xl border-2 transition-all duration-300
                      ${isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-xl scale-[1.02]'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg'
                      }
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          POPULAR
                        </div>
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-secondary-900 mb-1">
                      {plan.name}
                    </h3>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold text-secondary-900">{plan.price}</span>
                      <span className="text-sm text-secondary-600">{plan.period}</span>
                    </div>

                    <p className="text-sm text-secondary-600 mb-4">{plan.description}</p>

                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-secondary-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={isCreating}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {step === 1 ? (
              <Button
                onClick={handleNext}
                className="inline-flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={isCreating}
                className="inline-flex items-center gap-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <Check className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSetupPage;
