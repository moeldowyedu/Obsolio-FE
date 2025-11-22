import { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { useRegistrationWizardStore } from '../../store/registrationWizardStore';

const AccountCreationStep = ({ onNext }) => {
  const { accountData, updateAccountData } = useRegistrationWizardStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 12.5;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 12.5;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(accountData.password);

  const getPasswordStrengthLabel = (strength) => {
    if (strength === 0) return { label: '', color: '' };
    if (strength < 40) return { label: 'Weak', color: 'bg-red-500' };
    if (strength < 70) return { label: 'Fair', color: 'bg-yellow-500' };
    if (strength < 90) return { label: 'Good', color: 'bg-blue-500' };
    return { label: 'Strong', color: 'bg-green-500' };
  };

  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!accountData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(accountData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!accountData.password) {
      newErrors.password = 'Password is required';
    } else if (accountData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 40) {
      newErrors.password = 'Password is too weak. Use a mix of letters, numbers, and symbols';
    }

    // Confirm password validation
    if (!accountData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (accountData.password !== accountData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // First name validation
    if (!accountData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (accountData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!accountData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (accountData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Phone validation (required)
    if (!accountData.phone) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(accountData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      } else if (accountData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleChange = (field, value) => {
    updateAccountData({ [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">Create Your Account</h2>
        <p className="text-secondary-600">
          Enter your details to get started with Aasim AI Platform.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            value={accountData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            leftIcon={<User className="w-5 h-5" />}
            error={errors.firstName}
            required
            fullWidth
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={accountData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            leftIcon={<User className="w-5 h-5" />}
            error={errors.lastName}
            required
            fullWidth
          />
        </div>

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          value={accountData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          leftIcon={<Mail className="w-5 h-5" />}
          error={errors.email}
          helperText="We'll send a verification email to this address"
          required
          fullWidth
        />

        {/* Phone */}
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={accountData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          leftIcon={<Phone className="w-5 h-5" />}
          error={errors.phone}
          helperText="For account recovery and notifications"
          required
          fullWidth
        />

        {/* Password */}
        <div>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter a strong password"
            value={accountData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            leftIcon={<Lock className="w-5 h-5" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
            error={errors.password}
            required
            fullWidth
          />

          {/* Password Strength Indicator */}
          {accountData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-secondary-600">Password Strength</span>
                <span className={`text-xs font-medium ${
                  strengthInfo.label === 'Weak' ? 'text-red-500' :
                  strengthInfo.label === 'Fair' ? 'text-yellow-500' :
                  strengthInfo.label === 'Good' ? 'text-blue-500' :
                  'text-green-500'
                }`}>
                  {strengthInfo.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use 8+ characters with a mix of letters, numbers & symbols
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Re-enter your password"
          value={accountData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          leftIcon={<Lock className="w-5 h-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          }
          error={errors.confirmPassword}
          required
          fullWidth
        />

        {/* Terms & Conditions */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="text-sm text-secondary-700">
            I agree to the{' '}
            <a href="/terms" className="text-primary-600 hover:text-primary-600 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary-600 hover:text-primary-600 font-medium">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" fullWidth>
          Continue to Next Step
        </Button>

        {/* Login Link */}
        <div className="text-center text-sm text-secondary-600">
          Already have an account?{' '}
          <a href="/login" className="text-primary-600 hover:text-primary-600 font-medium">
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
};

export default AccountCreationStep;
