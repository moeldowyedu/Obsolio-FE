import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegistrationWizardStore } from '../../store/registrationWizardStore';
import { useAuthStore } from '../../store/authStore';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import AccountCreationStep from './AccountCreationStep';
import TenantTypeSelectionStep from './TenantTypeSelectionStep';
import PlanSelectionStep from './organization/PlanSelectionStep';

const RegistrationWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    tenantType,
    accountData,
    organizationData,
    personalData,
    nextStep,
    prevStep,
    isComplete,
    completeRegistration,
  } = useRegistrationWizardStore();

  const { register, isLoading, isAuthenticated } = useAuthStore();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Simplified wizard steps - same for both personal and organization
  const wizardSteps = [
    {
      id: 'account',
      title: 'Account',
      description: 'Create your account',
    },
    {
      id: 'tenant-type',
      title: 'Account Type',
      description: 'Personal or Organization',
    },
    {
      id: 'plan',
      title: 'Plan',
      description: 'Choose your plan',
    },
  ];

  // Handle final registration submission
  const handleComplete = async () => {
    try {
      // Prepare simplified registration data
      const registrationData = {
        email: accountData.email,
        password: accountData.password,
        firstName: accountData.firstName,
        lastName: accountData.lastName,
        phone: accountData.phone,
        tenantType,
      };

      // Add plan selection
      if (tenantType === 'organization') {
        registrationData.plan = organizationData.selectedPlan;
      } else {
        registrationData.plan = personalData.selectedPlan;
      }

      // Register user
      const result = await register(registrationData);

      // Only proceed if registration was successful
      if (result) {
        // Mark as complete
        completeRegistration();

        // Navigate to dashboard where they can set up organization structure
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 500);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Error is handled by the auth store and toast notification
      // User stays on the plan selection step to retry
    }
  };

  // Redirect if already complete
  useEffect(() => {
    if (isComplete) {
      navigate('/dashboard', { replace: true });
    }
  }, [isComplete, navigate]);

  // Render current step - simplified to 3 steps for all users
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AccountCreationStep onNext={nextStep} />;
      case 2:
        return <TenantTypeSelectionStep onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <PlanSelectionStep onNext={handleComplete} onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Modern Header with Logo */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">Aasim AI</span>
            </Link>
            <div className="text-sm text-secondary-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps - Professional Design */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                <div
                  className="h-full bg-gradient-to-r from-primary-600 to-primary-500 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (wizardSteps.length - 1)) * 100}%` }}
                />
              </div>

              {wizardSteps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                        ${
                          isCompleted
                            ? 'bg-primary-600 text-white'
                            : isActive
                            ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                            : 'bg-white border-2 border-gray-300 text-gray-400'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span>{stepNumber}</span>
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <p
                        className={`text-sm font-semibold ${
                          isActive ? 'text-gray-900' : isCompleted ? 'text-primary-600' : 'text-gray-400'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 px-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary-100 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="mt-6 text-secondary-600 font-medium">Creating your account...</p>
                <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
              </div>
            ) : (
              <div className="p-8 md:p-12">{renderStep()}</div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <a href="/terms" className="hover:text-secondary-700 transition-colors">
                Terms of Service
              </a>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <a href="/privacy" className="hover:text-secondary-700 transition-colors">
                Privacy Policy
              </a>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <a href="/support" className="hover:text-secondary-700 transition-colors">
                Help & Support
              </a>
            </div>
            {tenantType === 'organization' && currentStep === 3 && (
              <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Set up your organization structure after registration</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizard;
