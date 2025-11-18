import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistrationWizardStore } from '../../store/registrationWizardStore';
import { useAuthStore } from '../../store/authStore';
import WizardSteps from '../wizard/WizardSteps';
import AccountCreationStep from './AccountCreationStep';
import TenantTypeSelectionStep from './TenantTypeSelectionStep';
import OrganizationProfileStep from './organization/OrganizationProfileStep';
import BranchesSetupStep from './organization/BranchesSetupStep';
import DepartmentsSetupStep from './organization/DepartmentsSetupStep';
import ProjectsSetupStep from './organization/ProjectsSetupStep';
import TeamsSetupStep from './organization/TeamsSetupStep';
import RolesPermissionsStep from './organization/RolesPermissionsStep';
import PlanSelectionStep from './organization/PlanSelectionStep';
import MainLayout from '../layout/MainLayout';

const RegistrationWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    totalSteps,
    tenantType,
    accountData,
    organizationData,
    personalData,
    nextStep,
    prevStep,
    setCurrentStep,
    resetWizard,
    isComplete,
    completeRegistration,
  } = useRegistrationWizardStore();

  const { register, isLoading } = useAuthStore();

  // Define wizard steps based on tenant type
  const getWizardSteps = () => {
    const baseSteps = [
      {
        id: 'account',
        title: 'Account',
        description: 'Create account',
      },
      {
        id: 'tenant-type',
        title: 'Account Type',
        description: 'Choose type',
      },
    ];

    if (tenantType === 'organization') {
      return [
        ...baseSteps,
        {
          id: 'org-profile',
          title: 'Organization',
          description: 'Profile setup',
        },
        {
          id: 'branches',
          title: 'Branches',
          description: 'Optional',
        },
        {
          id: 'departments',
          title: 'Departments',
          description: 'Structure',
        },
        {
          id: 'projects',
          title: 'Projects',
          description: 'Optional',
        },
        {
          id: 'teams',
          title: 'Teams',
          description: 'Optional',
        },
        {
          id: 'roles',
          title: 'Roles',
          description: 'Permissions',
        },
        {
          id: 'plan',
          title: 'Plan',
          description: 'Select plan',
        },
      ];
    } else if (tenantType === 'personal') {
      return [
        ...baseSteps,
        {
          id: 'plan',
          title: 'Plan',
          description: 'Select plan',
        },
      ];
    }

    return baseSteps;
  };

  const wizardSteps = getWizardSteps();

  // Handle final registration submission
  const handleComplete = async () => {
    try {
      // Prepare registration data
      const registrationData = {
        email: accountData.email,
        password: accountData.password,
        firstName: accountData.firstName,
        lastName: accountData.lastName,
        phone: accountData.phone,
        tenantType,
      };

      // Add organization data if organization type
      if (tenantType === 'organization') {
        registrationData.organization = {
          profile: organizationData.profile,
          branches: organizationData.branches,
          departments: organizationData.departments,
          projects: organizationData.projects,
          teams: organizationData.teams,
          roles: organizationData.roles,
          customRoles: organizationData.customRoles,
          selectedPlan: organizationData.selectedPlan,
        };
      } else {
        registrationData.plan = personalData.selectedPlan;
      }

      // Register user
      await register(registrationData);

      // Mark as complete
      completeRegistration();

      // Navigate to dashboard or onboarding
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Error is handled by the auth store
    }
  };

  // Redirect if already complete
  useEffect(() => {
    if (isComplete) {
      navigate('/dashboard');
    }
  }, [isComplete, navigate]);

  // Render current step
  const renderStep = () => {
    // For steps 1-2 (account creation and tenant type selection)
    if (currentStep === 1) {
      return <AccountCreationStep onNext={nextStep} />;
    }

    if (currentStep === 2) {
      return <TenantTypeSelectionStep onNext={nextStep} onBack={prevStep} />;
    }

    // Organization flow (9 steps total)
    if (tenantType === 'organization') {
      switch (currentStep) {
        case 3:
          return <OrganizationProfileStep onNext={nextStep} onBack={prevStep} />;
        case 4:
          return <BranchesSetupStep onNext={nextStep} onBack={prevStep} />;
        case 5:
          return <DepartmentsSetupStep onNext={nextStep} onBack={prevStep} />;
        case 6:
          return <ProjectsSetupStep onNext={nextStep} onBack={prevStep} />;
        case 7:
          return <TeamsSetupStep onNext={nextStep} onBack={prevStep} />;
        case 8:
          return <RolesPermissionsStep onNext={nextStep} onBack={prevStep} />;
        case 9:
          return <PlanSelectionStep onNext={handleComplete} onBack={prevStep} />;
        default:
          return null;
      }
    }

    // Personal flow (3 steps total)
    if (tenantType === 'personal') {
      if (currentStep === 3) {
        return <PlanSelectionStep onNext={handleComplete} onBack={prevStep} />;
      }
    }

    return null;
  };

  return (
    <MainLayout showSidebar={false}>
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-full p-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Aasim AI</h1>
            <p className="text-gray-600">
              Let's get you set up. This will only take a few minutes.
            </p>
          </div>

          {/* Wizard Steps Progress */}
          <div className="mb-8">
            <WizardSteps steps={wizardSteps} currentStep={currentStep} />
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Creating your account...</p>
                </div>
              </div>
            ) : (
              renderStep()
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-primary-500 hover:text-primary-600">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-500 hover:text-primary-600">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegistrationWizard;
