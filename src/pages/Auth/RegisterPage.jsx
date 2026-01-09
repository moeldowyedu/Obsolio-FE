import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Building2, Users, Globe, Phone, Upload, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import RegistrationSteps from '../../components/registration/RegistrationSteps';
import toast from 'react-hot-toast';
import logo from '../../assets/imgs/OBSOLIO-logo-light.png';
import logoDark from '../../assets/imgs/OBSOLIO-logo-dark.png';
import { countries } from '../../constants/countries';
import { useTheme } from '../../contexts/ThemeContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    confirmPassword: '',
    tenantType: 'organization', // FORCED: Always organization
    tenantUrl: '',
    // Personal & Shared Fields
    fullName: '',
    country: '',
    phone: '',
    email: '',
    password: '',
    // Organization Specific
    organizationName: '',
    organizationShortName: '',
    organizationLogo: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkingDomain, setCheckingDomain] = useState(false);
  const [domainStatus, setDomainStatus] = useState(null);
  const [domainMessage, setDomainMessage] = useState('');
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

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Step 1: Account Details (Formerly Step 2)
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (passwordStrength < 40) {
        newErrors.password = 'Password is too weak. Use a mix of letters, numbers, and symbols';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.country) {
        newErrors.country = 'Country is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
    } else if (step === 2) {
      // Step 2: Workspace Setup (Formerly Step 3)
      if (!formData.tenantUrl) {
        newErrors.tenantUrl = 'Workspace URL is required';
      } else if (!/^[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?$/.test(formData.tenantUrl)) {
        newErrors.tenantUrl = 'Invalid format. Use lowercase letters, numbers, and hyphens (hyphens not at start/end).';
      }

      // Organization Name Required
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Company/Organization name is required';
      } else if (formData.organizationName.trim().length < 2) {
        newErrors.organizationName = 'Name must be at least 2 characters';
      }

      if (formData.organizationShortName && formData.organizationShortName.length > 20) {
        newErrors.organizationShortName = 'Short name must be less than 20 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleTenantUrlChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, tenantUrl: value }));
    setDomainStatus(null);
    setDomainMessage('');
    if (errors.tenantUrl) {
      setErrors(prev => ({ ...prev, tenantUrl: '' }));
    }
  };

  const handleCheckDomain = () => {
    if (!formData.tenantUrl) return;

    setCheckingDomain(true);
    setDomainStatus(null);
    setErrors(prev => ({ ...prev, tenantUrl: '' }));

    // Client-side validation only
    const isValid = /^[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?$/.test(formData.tenantUrl);

    setTimeout(() => {
      if (isValid) {
        setDomainStatus('available');
        setDomainMessage('Format is valid - availability will be checked during registration');
      } else {
        setDomainStatus('unavailable');
        setDomainMessage('Invalid format. Use lowercase letters, numbers, and hyphens.');
      }
      setCheckingDomain(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(2)) {
      return;
    }

    try {
      const selectedCountry = countries.find(c => c.value === formData.country);
      const dialCode = selectedCountry?.dialCode || '';

      let formattedPhone = formData.phone.trim();
      if (dialCode && !formattedPhone.startsWith('+')) {
        if (formattedPhone.startsWith('0')) {
          formattedPhone = formattedPhone.substring(1);
        }
        formattedPhone = dialCode + formattedPhone;
      }

      const payload = {
        // type: 'organization', // REMOVED: Managed by backend
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.confirmPassword, // Added confirmation
        subdomain: formData.tenantUrl,
        country: formData.country,
        phone: formattedPhone
      };

      const orgFullName = formData.organizationName?.trim();

      if (!orgFullName) {
        toast.error('Company Name is required');
        return;
      }

      payload.organizationFullName = orgFullName;

      if (formData.organizationShortName && formData.organizationShortName.trim()) {
        payload.organizationShortName = formData.organizationShortName.trim();
      }
      if (formData.organizationLogo) {
        payload.organizationLogo = formData.organizationLogo;
      }

      console.log('Sending registration payload:', payload);

      const result = await register(payload);

      if (result) {
        const data = result.data || result;

        // ALWAYS Redirect to verification page
        // Backend no longer returns token immediately
        toast.success('Registration successful! Please check your email.');
        navigate('/verify-email-sent', {
          state: {
            email: formData.email,
            workspacePreview: data.workspace_preview || data.workspace_url || `https://${formData.tenantUrl}.obsolio.com`
          },
          replace: true
        });
      }
    } catch (error) {
      console.error('Registration failed:', error);
      console.error('Error Details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });

      if (error.response?.data?.errors) {
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          let stateKey = key;
          if (key === 'subdomain') stateKey = 'tenantUrl';
          if (key === 'organizationFullName') stateKey = 'organizationName';
          if (key === 'slug') stateKey = 'tenantUrl';
          backendErrors[stateKey] = error.response.data.errors[key][0];
        });
        setErrors(backendErrors);
        toast.error('Please check the form for errors.');
      } else {
        if (!useAuthStore.getState().isAuthenticated) {
          toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        } else {
          navigate('/login', { replace: true });
        }
      }
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      setFormData(prev => ({ ...prev, organizationLogo: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-md ${theme === 'dark'
            ? 'bg-white/5 hover:bg-white/10 text-yellow-400 shadow-lg shadow-yellow-400/10'
            : 'bg-white/80 hover:bg-white text-slate-700 shadow-lg shadow-slate-200'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        {theme === 'dark' ? (
          <>
            <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30"></div>
            <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow opacity-30" style={{ animationDelay: '1s' }}></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-200/40 via-transparent to-transparent opacity-80" />
        )}
      </div>

      <div className="w-full max-w-xl relative z-10 animate-fade-in my-4">
        {/* Logo/Brand */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <img src={theme === 'dark' ? logoDark : logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
          </Link>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
            Start your 7-day free trial. No credit card required.
          </p>
        </div>

        {/* Registration Form Card */}
        <div className={`rounded-3xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300 ${theme === 'dark'
          ? 'glass-card shadow-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/40'
          : 'bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>

          {/* Decor glow (Dark Mode Only) */}
          {theme === 'dark' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
          )}

          <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Sign Up</h2>

          {/* Progress Steps - Modified to 2 steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {/* Step 1 Visual */}
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-primary-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <span className="text-sm font-medium hidden sm:inline">Account</span>
              </div>
              <div className="w-10 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
              {/* Step 2 Visual */}
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-primary-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <span className="text-sm font-medium hidden sm:inline">Workspace</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">

            {/* STEP 1: Account Details */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-fade-in">
                <Input
                  theme={theme}
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

                <Input
                  theme={theme}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ml-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Country
                    </label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`
                          w-full border rounded-lg py-3 pl-10 pr-4 appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer
                          ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-slate-50 text-slate-900'}
                          ${errors.country
                            ? 'border-red-500 focus:ring-red-500/20'
                            : (theme === 'dark' ? 'border-white/10 focus:border-primary-500 focus:ring-primary-500/20' : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20')}
                        `}
                        disabled={isLoading}
                      >
                        <option value="" disabled className={theme === 'dark' ? 'text-gray-500 bg-[#1a1f2e]' : 'text-slate-500 bg-white'}>Select a country</option>
                        {countries.map((country) => (
                          <option key={country.value} value={country.value} className={theme === 'dark' ? 'text-gray-900 bg-white' : 'text-slate-900 bg-white'}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                      <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                      <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-500 ml-1 animate-fade-in">{errors.country}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ml-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className={`
                          w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 transition-all
                          ${theme === 'dark' ? 'bg-white/5 text-white placeholder-gray-500' : 'bg-slate-50 text-slate-900 placeholder-slate-400'}
                          ${errors.phone
                            ? 'border-red-500 focus:ring-red-500/20'
                            : (theme === 'dark' ? 'border-white/10 focus:border-primary-500 focus:ring-primary-500/20' : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20')
                          }
                        `}
                        disabled={isLoading}
                      />
                      <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 ml-1 animate-fade-in">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <Input
                        theme={theme}
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password"
                        icon={Lock}
                        error={errors.password}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-[38px] transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-400 hover:text-slate-600'}`}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Input
                        theme={theme}
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        icon={Lock}
                        error={errors.confirmPassword}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute right-3 top-[38px] transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-400 hover:text-slate-600'}`}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {formData.password && (
                  <div className="mt-1 pl-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Strength</span>
                      <span className={`text-xs font-medium ${passwordStrength < 40 ? 'text-red-400' :
                        passwordStrength < 70 ? 'text-yellow-400' :
                          passwordStrength < 90 ? 'text-blue-400' :
                            'text-green-400'
                        }`}>
                        {strengthInfo.label}
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-1 overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`}>
                      <div
                        className={`h-full transition-all duration-300 ${strengthInfo.color}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <Button
                    type="button"
                    onClick={handleNext}
                    variant="primary"
                    className="w-full py-4 text-base font-semibold shadow-lg shadow-primary-500/25"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Workspace Setup */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-fade-in">

                {/* Organization Details (Now Required) */}
                <div className="space-y-3 pt-1">
                  <Input
                    theme={theme}
                    label="Company / Organization Name"
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    icon={Building2}
                    error={errors.organizationName}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ml-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                    Choose Your Workspace URL <span className="text-red-400">*</span>
                  </label>
                  <p className={`text-xs mb-2 ml-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                    This will be your workspace: <strong>{formData.tenantUrl || 'yourname'}.obsolio.com</strong>
                  </p>

                  <div className="flex items-center gap-3">
                    <div className={`
                      flex-1 flex items-center border rounded-lg overflow-hidden transition-all relative
                      ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}
                      ${errors.tenantUrl ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500/20' :
                        domainStatus === 'available' ? 'border-green-500 focus-within:ring-2 focus-within:ring-green-500/20' :
                          (theme === 'dark' ? 'border-white/10' : 'border-slate-200') + ' focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20'}
                    `}>
                      <input
                        type="text"
                        name="tenantUrl"
                        value={formData.tenantUrl}
                        onChange={handleTenantUrlChange}
                        className={`w-full bg-transparent border-none px-4 py-2 focus:ring-0 focus:outline-none ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-slate-900 placeholder-slate-400'}`}
                        placeholder="your-workspace"
                        disabled={isLoading}
                      />

                      <div className="pr-2">
                        <button
                          type="button"
                          onClick={handleCheckDomain}
                          disabled={!formData.tenantUrl || checkingDomain || isLoading}
                          className={`
                            p-1.5 rounded-md transition-all duration-200 flex items-center gap-1
                            ${!formData.tenantUrl
                              ? (theme === 'dark' ? 'opacity-50 text-gray-600' : 'opacity-50 text-slate-400') + ' cursor-not-allowed'
                              : (theme === 'dark' ? 'opacity-100 hover:bg-white/10 text-primary-400 hover:text-white' : 'opacity-100 hover:bg-slate-200 text-primary-600 hover:text-primary-700') + ' cursor-pointer'
                            }
                          `}
                          title="Validate Format"
                        >
                          {checkingDomain ? (
                            <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <span className="text-xs font-bold uppercase tracking-wider">Validate</span>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className={`font-medium select-none whitespace-nowrap px-4 py-2 border rounded-lg ${theme === 'dark' ? 'text-gray-400 bg-white/5 border-white/10' : 'text-slate-500 bg-slate-50 border-slate-200'}`}>
                      .obsolio.com
                    </div>
                  </div>

                  {domainStatus === 'available' && !errors.tenantUrl && (
                    <p className="mt-1.5 text-xs text-green-400 ml-1 flex items-center gap-1 animate-fade-in">
                      ✓ Valid format - availability will be checked during registration
                    </p>
                  )}
                  {domainStatus === 'unavailable' && !errors.tenantUrl && (
                    <p className="mt-1.5 text-xs text-red-400 ml-1 flex items-center gap-1 animate-fade-in">
                      ✗ {domainMessage || 'Invalid format'}
                    </p>
                  )}
                  {errors.tenantUrl && (
                    <p className="mt-1.5 text-xs text-red-500 ml-1 animate-fade-in">{errors.tenantUrl}</p>
                  )}
                </div>

                <div className={`space-y-3 pt-3 border-t animate-fade-in ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <Input
                      theme={theme}
                      label="Short Name (Optional)"
                      type="text"
                      name="organizationShortName"
                      value={formData.organizationShortName}
                      onChange={handleChange}
                      placeholder="ACME"
                      icon={Building2}
                      error={errors.organizationShortName}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ml-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      Organization Logo (Optional)
                    </label>
                    <div className="relative group cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        id="org-logo"
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                      <label
                        htmlFor="org-logo"
                        className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl transition-all cursor-pointer ${theme === 'dark' ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary-500/50' : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-primary-500/50'}`}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5 text-primary-400" />
                        </div>
                        <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {formData.organizationLogo ? formData.organizationLogo.name : 'Click to upload logo'}
                        </span>
                        <span className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>SVG, PNG, JPG (max 2MB)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 py-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </span>
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1 py-4 text-base font-semibold shadow-lg shadow-primary-500/25"
                    disabled={isLoading}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Start 7-Day Free Trial
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* Terms */}
          <p className={`text-xs text-center mt-6 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
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
          <div className={`mt-4 pt-4 border-t text-center ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
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
            <Link to="/" className={`text-sm hover:text-gray-400 transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
