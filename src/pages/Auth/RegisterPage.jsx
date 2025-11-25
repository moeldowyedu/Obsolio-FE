import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Building2, Users } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    tenantType: 'personal', // 'personal' or 'organization'
    organizationName: '',
    organizationDomain: ''
  });

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

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getPasswordStrengthInfo = (strength) => {
    if (strength === 0) return { label: '', color: '' };
    if (strength < 40) return { label: 'Weak', color: 'bg-red-500' };
    if (strength < 70) return { label: 'Fair', color: 'bg-yellow-500' };
    if (strength < 90) return { label: 'Good', color: 'bg-blue-500' };
    return { label: 'Strong', color: 'bg-green-500' };
  };

  const strengthInfo = getPasswordStrengthInfo(passwordStrength);

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 40) {
      newErrors.password = 'Password is too weak. Use a mix of letters, numbers, and symbols';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Organization-specific validation
    if (formData.tenantType === 'organization') {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Organization name is required';
      } else if (formData.organizationName.trim().length < 2) {
        newErrors.organizationName = 'Organization name must be at least 2 characters';
      }

      // Domain is optional, but if provided, validate format
      if (formData.organizationDomain && !/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(formData.organizationDomain)) {
        newErrors.organizationDomain = 'Invalid domain format (use alphanumeric and hyphens only)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Prepare registration payload according to API spec
      const payload = {
        type: formData.tenantType,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      // Add organization fields if organization type
      if (formData.tenantType === 'organization') {
        payload.organizationName = formData.organizationName.trim();
        if (formData.organizationDomain) {
          payload.organizationDomain = formData.organizationDomain.trim();
        }
      }

      // Register user
      const result = await register(payload);

      if (result) {
        // Check if email verification is required
        if (result.emailVerificationRequired) {
          toast.success('Registration successful! Please check your email to verify your account.');
          navigate('/verify-email-sent', { replace: true });
        } else {
          // Direct login - redirect to dashboard
          toast.success('Account created successfully!');
          navigate('/dashboard', { replace: true });
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);

      // Handle backend validation errors
      if (error.response?.data?.errors) {
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          backendErrors[key] = error.response.data.errors[key][0];
        });
        setErrors(backendErrors);
      } else {
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTenantTypeChange = (type) => {
    setFormData(prev => ({ ...prev, tenantType: type }));
    // Clear organization-related errors when switching types
    if (type === 'personal') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.organizationName;
        delete newErrors.organizationDomain;
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Aasim AI
          </h1>
          <p className="text-secondary-600 mt-2">Create your account to get started</p>
        </div>

        {/* Registration Form Card */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tenant Type Selector */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleTenantTypeChange('personal')}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200
                    ${formData.tenantType === 'personal'
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <User className={`w-6 h-6 ${formData.tenantType === 'personal' ? 'text-primary-600' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${formData.tenantType === 'personal' ? 'text-primary-700' : 'text-gray-700'}`}>
                      Personal
                    </span>
                    <span className="text-xs text-gray-500 text-center">For individual use</span>
                  </div>
                  {formData.tenantType === 'personal' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleTenantTypeChange('organization')}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200
                    ${formData.tenantType === 'organization'
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Building2 className={`w-6 h-6 ${formData.tenantType === 'organization' ? 'text-primary-600' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${formData.tenantType === 'organization' ? 'text-primary-700' : 'text-gray-700'}`}>
                      Organization
                    </span>
                    <span className="text-xs text-gray-500 text-center">For teams & companies</span>
                  </div>
                  {formData.tenantType === 'organization' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                icon={User}
                error={errors.fullName}
                disabled={isLoading}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                icon={Mail}
                error={errors.email}
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  icon={Lock}
                  error={errors.password}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-secondary-600">Password Strength</span>
                    <span className={`text-xs font-medium ${passwordStrength < 40 ? 'text-red-600' :
                        passwordStrength < 70 ? 'text-yellow-600' :
                          passwordStrength < 90 ? 'text-blue-600' :
                            'text-green-600'
                      }`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strengthInfo.color}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  icon={Lock}
                  error={errors.confirmPassword}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Organization Fields - Conditional */}
            {formData.tenantType === 'organization' && (
              <div className="space-y-5 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-primary-700 font-medium">
                  <Building2 className="w-4 h-4" />
                  <span>Organization Details</span>
                </div>

                {/* Organization Name */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Organization Name
                  </label>
                  <Input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Acme Corporation"
                    icon={Building2}
                    error={errors.organizationName}
                    disabled={isLoading}
                  />
                </div>

                {/* Organization Domain (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Organization Domain <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <Input
                    type="text"
                    name="organizationDomain"
                    value={formData.organizationDomain}
                    onChange={handleChange}
                    placeholder="acme-corp"
                    icon={Users}
                    error={errors.organizationDomain}
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    A unique identifier for your organization (e.g., acme-corp)
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-base font-semibold mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-xs text-center text-secondary-600 mt-6">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
              Privacy Policy
            </Link>
          </p>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-secondary-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
