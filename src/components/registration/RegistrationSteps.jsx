import { useTheme } from '../../contexts/ThemeContext';
import { Check } from 'lucide-react';

const RegistrationSteps = ({ currentStep, tenantType }) => {
  const { theme } = useTheme();

  const steps = [
    { number: 1, title: 'Account Type', completed: currentStep > 1 },
    { number: 2, title: 'Choose Plan', completed: currentStep > 2 },
    { number: 3, title: 'Account Details', completed: currentStep > 3 },
    { number: 4, title: 'Workspace Setup', completed: currentStep > 4 }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center relative">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
                  ${step.completed
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                      : (theme === 'dark'
                        ? 'bg-white/10 text-gray-500 border border-white/20'
                        : 'bg-slate-100 text-slate-400 border border-slate-300')
                  }
                `}
              >
                {step.completed ? <Check className="w-5 h-5" /> : step.number}
              </div>

              {/* Step Label */}
              <span
                className={`
                  absolute -bottom-6 text-xs font-medium whitespace-nowrap
                  ${currentStep === step.number
                    ? (theme === 'dark' ? 'text-white' : 'text-slate-900')
                    : (theme === 'dark' ? 'text-gray-500' : 'text-slate-500')
                  }
                `}
              >
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-0.5 mx-2 transition-all
                  ${step.completed
                    ? 'bg-green-500'
                    : (theme === 'dark' ? 'bg-white/10' : 'bg-slate-200')
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationSteps;
