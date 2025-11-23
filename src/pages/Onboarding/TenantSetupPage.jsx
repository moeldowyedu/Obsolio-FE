import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Sparkles, CheckCircle, ArrowRight, Users, Zap } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import { useTenantStore } from '../../store/tenantStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const TenantSetupPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const { createTenant, setCurrentTenant } = useTenantStore();
  const { user } = useAuthStore();

  const tenantTypes = [
    {
      id: 'personal',
      icon: User,
      title: 'Personal',
      description: 'For individual use and personal projects',
      features: [
        'Up to 5 AI agents',
        'Basic analytics',
        'Community support',
        'Personal workspace'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'organization',
      icon: Building2,
      title: 'Organization',
      description: 'For teams and businesses',
      features: [
        'Unlimited AI agents',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
        'Custom integrations'
      ],
      gradient: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      popular: true
    }
  ];

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleContinue = async () => {
    if (!selectedType) {
      toast.error('Please select an account type');
      return;
    }

    if (selectedType === 'personal') {
      // Auto-create personal tenant and redirect to dashboard
      await createPersonalTenant();
    } else {
      // Redirect to organization setup
      navigate('/onboarding/organization-setup');
    }
  };

  const createPersonalTenant = async () => {
    try {
      setIsCreating(true);

      // Create personal tenant with user's name
      const tenantData = {
        name: `${user?.firstName || 'Personal'}'s Workspace`,
        type: 'personal',
        plan: 'free',
        owner: user?.id || user?._id
      };

      const tenant = await createTenant(tenantData);

      if (tenant) {
        // Set as current tenant
        await setCurrentTenant(tenant.id || tenant._id);

        toast.success('Your personal workspace is ready!');

        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 500);
      }
    } catch (error) {
      console.error('Failed to create personal tenant:', error);
      toast.error('Failed to create workspace. Please try again.');
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

      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-secondary-900 mb-3">
            Welcome to Aasim AI!
          </h1>
          <p className="text-lg text-secondary-600">
            What brings you here today?
          </p>
        </div>

        {/* Tenant Type Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tenantTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <button
                key={type.id}
                onClick={() => handleSelectType(type.id)}
                className={`
                  relative glass-card rounded-3xl p-8 text-left transition-all duration-300
                  ${isSelected
                    ? `ring-4 ring-${type.borderColor.split('-')[1]}-500 shadow-2xl scale-[1.02]`
                    : 'hover:shadow-xl hover:scale-[1.01]'
                  }
                `}
              >
                {/* Popular Badge */}
                {type.popular && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      POPULAR
                    </div>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-6 right-6">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${type.gradient} flex items-center justify-center shadow-lg`}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-secondary-600 mb-6">
                  {type.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 ${type.iconColor} flex-shrink-0 mt-0.5`} />
                      <span className="text-sm text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedType || isCreating}
            className="px-12 py-4 text-lg font-semibold"
          >
            {isCreating ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Setting up your workspace...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Continue
                <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors"
            disabled={isCreating}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantSetupPage;
