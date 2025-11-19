import { User, Building2, Check } from 'lucide-react';
import Button from '../common/Button/Button';
import { useRegistrationWizardStore } from '../../store/registrationWizardStore';

const TenantTypeSelectionStep = ({ onNext, onBack }) => {
  const { tenantType, setTenantType } = useRegistrationWizardStore();

  const handleSelectType = (type) => {
    setTenantType(type);
  };

  const handleContinue = () => {
    if (tenantType) {
      onNext();
    }
  };

  const tenantTypes = [
    {
      id: 'personal',
      title: 'Personal',
      icon: User,
      description: 'Perfect for individual users',
      features: [
        'Individual use',
        'Simple setup',
        'Basic features',
        'Limited users',
        'Quick onboarding',
      ],
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
    },
    {
      id: 'organization',
      title: 'Organization',
      icon: Building2,
      description: 'Designed for teams and companies',
      features: [
        'Company/Team structure',
        'Full organizational hierarchy',
        'Advanced management',
        'Unlimited users',
        'Set up after registration',
      ],
      badge: 'Enterprise',
      badgeColor: 'bg-purple-500',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Account Type</h2>
        <p className="text-gray-600">
          Select the option that best fits your needs. You can upgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {tenantTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = tenantType === type.id;

          return (
            <div
              key={type.id}
              onClick={() => handleSelectType(type.id)}
              className={`
                relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105
                ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-xl'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-lg'
                }
              `}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span
                  className={`px-4 py-1 rounded-full text-white text-xs font-semibold ${type.badgeColor}`}
                >
                  {type.badge}
                </span>
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              {/* Icon */}
              <div
                className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors
                ${isSelected ? 'bg-primary-500' : 'bg-gray-100'}
              `}
              >
                <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-gray-600 mb-6">{type.description}</p>

              {/* Features */}
              <div className="space-y-3">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div
                      className={`
                      w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                      ${isSelected ? 'bg-primary-500' : 'bg-gray-300'}
                    `}
                    >
                      <Check className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <button
                type="button"
                className={`
                  mt-6 w-full py-3 rounded-lg font-medium transition-all
                  ${
                    isSelected
                      ? 'bg-primary-500 text-white shadow-md hover:bg-primary-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {isSelected ? 'Selected' : 'Select'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Feature
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Personal
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Organization
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Users</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">1-5</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Departments</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">-</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Multi-branch Support</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">-</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Projects & Teams</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">-</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Custom Roles</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">Basic</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">Advanced</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Registration Time</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">~1 minute</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">~1 minute</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Organization Setup Note */}
      {tenantType === 'organization' && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Quick Setup Now, Structure Later</h4>
              <p className="text-sm text-blue-800">
                Registration takes just 1 minute! You can set up your organization structure (branches, departments, teams, projects) from your dashboard after you sign in.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
          disabled={!tenantType}
          className="min-w-[200px]"
        >
          Continue
        </Button>
      </div>

      {/* Help Text */}
      {!tenantType && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Please select an account type to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default TenantTypeSelectionStep;
