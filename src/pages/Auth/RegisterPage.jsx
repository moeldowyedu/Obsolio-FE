import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Building2, Users } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

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
          // Direct login - pass tenant data to onboarding
          toast.success('Account created successfully!');
          navigate('/onboarding/tenant-setup', {
            replace: true,
            state: {
              tenantType: formData.tenantType,
              organizationName: formData.organizationName,
              organizationDomain: formData.organizationDomain,
              userFullName: formData.fullName
            }
          });
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
    <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-2xl relative z-10 animate-fade-in my-4">
        {/* Logo/Brand */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
          </Link>
          <p className="text-gray-400 mt-2">Create your account to get started</p>
        </div>

        {/* Registration Form Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40">
          {/* Decor glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

          <h2 className="text-2xl font-bold text-white mb-4 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tenant Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3 ml-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleTenantTypeChange('personal')}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200 group
                    ${formData.tenantType === 'personal'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <User className={`w-6 h-6 ${formData.tenantType === 'personal' ? 'text-primary-400' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${formData.tenantType === 'personal' ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      Personal
                    </span>
                    <span className="text-xs text-gray-500 text-center">For individual use</span>
                  </div>
                  {formData.tenantType === 'personal' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/50">
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
                    relative p-4 rounded-xl border-2 transition-all duration-200 group
                    ${formData.tenantType === 'organization'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Building2 className={`w-6 h-6 ${formData.tenantType === 'organization' ? 'text-primary-400' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${formData.tenantType === 'organization' ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      Organization
                    </span>
                    <span className="text-xs text-gray-500 text-center">For teams & companies</span>
                  </div>
                  {formData.tenantType === 'organization' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/50">
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
              <Input
                theme="dark"
                label="Full Name"
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
              <Input
                theme="dark"
                label="Email Address"
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
              <div className="relative">
                <Input
                  theme="dark"
                  label="Password"
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
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 pl-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Password Strength</span>
                    <span className={`text-xs font-medium ${passwordStrength < 40 ? 'text-red-400' :
                      passwordStrength < 70 ? 'text-yellow-400' :
                        passwordStrength < 90 ? 'text-blue-400' :
                          'text-green-400'
                      }`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
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
              <div className="relative">
                <Input
                  theme="dark"
                  label="Confirm Password"
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
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Organization Fields - Conditional */}
            {formData.tenantType === 'organization' && (
              <div className="space-y-5 pt-4 border-t border-white/10 animate-slide-down">
                <div className="flex items-center gap-2 text-sm text-primary-400 font-medium">
                  <Building2 className="w-4 h-4" />
                  <span>Organization Details</span>
                </div>

                {/* Organization Name */}
                <div>
                  <Input
                    theme="dark"
                    label="Organization Name"
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
                  <Input
                    theme="dark"
                    label="Organization Domain (Optional)"
                    type="text"
                    name="organizationDomain"
                    value={formData.organizationDomain}
                    onChange={handleChange}
                    placeholder="acme-corp"
                    icon={Users}
                    error={errors.organizationDomain}
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-xs text-gray-500 ml-1">
                    A unique identifier for your organization (e.g., acme-corp)
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-base font-semibold mt-4 shadow-lg shadow-primary-500/25"
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
          <p className="text-xs text-center text-gray-500 mt-4">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-primary-400 hover:text-primary-300 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-400 hover:text-primary-300 font-medium">
              Privacy Policy
            </Link>
          </p>

          {/* Login Link */}
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
