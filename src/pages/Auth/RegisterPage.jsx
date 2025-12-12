import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Building2, Users, CheckCircle, XCircle, Globe, Phone, Upload } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    confirmPassword: '',
    tenantType: 'personal', // 'personal' or 'organization'
    tenantUrl: '',
    // Personal & Shared Fields
    // Personal & Shared Fields
    fullName: '',
    country: '',
    phone: '',
    countryCode: '+1', // Default
    email: '',
    password: '',
    // Organization Specific
    organizationName: '',
    organizationShortName: '', // New
    organizationLogo: null, // New
    organizationDomain: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkingDomain, setCheckingDomain] = useState(false);
  const [domainStatus, setDomainStatus] = useState(null); // 'available', 'unavailable', null
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

    // Common Validation
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    // Organization-specific validation
    if (formData.tenantType === 'organization') {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Organization name is required';
      } else if (formData.organizationName.trim().length < 2) {
        newErrors.organizationName = 'Organization name must be at least 2 characters';
      }

      // Short name optional but good to validate length if present
      if (formData.organizationShortName && formData.organizationShortName.length > 20) {
        newErrors.organizationShortName = 'Short name must be less than 20 characters';
      }

      // Domain is optional, but if provided, validate format
      if (formData.organizationDomain && !/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(formData.organizationDomain)) {
        newErrors.organizationDomain = 'Invalid domain format (use alphanumeric and hyphens only)';
      }
    }

    // Tenant URL Validation
    if (!formData.tenantUrl) {
      newErrors.tenantUrl = 'Workspace URL is required';
    } else if (!/^[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?$/.test(formData.tenantUrl)) {
      newErrors.tenantUrl = 'Invalid format. Use lowercase letters, numbers, and hyphens (hyphens not at start/end).';
    } else if (domainStatus === 'unavailable') {
      newErrors.tenantUrl = 'This URL is already taken';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const { checkDomainAvailability } = useAuthStore();

  const handleCheckDomain = async () => {
    if (!formData.tenantUrl) return;

    setCheckingDomain(true);
    setDomainStatus(null);
    setErrors(prev => ({ ...prev, tenantUrl: '' }));

    try {
      const result = await checkDomainAvailability(formData.tenantUrl);
      if (result.available) {
        setDomainStatus('available');
      } else {
        setDomainStatus('unavailable');
        setDomainMessage(result.message || 'Already taken');
      }
    } catch (error) {
      // If strict 404 means available check logic in authService
      console.error(error);
      setDomainStatus('unavailable');
      setDomainMessage('Error checking availability');
    } finally {
      setCheckingDomain(false);
    }
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
        tenantUrl: formData.tenantUrl,
      };

      // Add organization fields if organization type
      if (formData.tenantType === 'organization') {
        payload.organizationName = formData.organizationName.trim();
        payload.organizationShortName = formData.organizationShortName.trim();
        if (formData.organizationDomain) {
          payload.organizationDomain = formData.organizationDomain.trim();
        }
        if (formData.organizationLogo) {
          payload.organizationLogo = formData.organizationLogo;
        }
      }

      // Add common extended fields
      payload.country = formData.country;
      payload.phone = `${formData.countryCode}${formData.phone}`;

      // Register user
      const result = await register(payload);

      if (result) {
        // Check if email verification is required
        if (result.emailVerificationRequired) {
          toast.success('Registration successful! Please check your email to verify your account.');
          navigate('/verify-email-sent', { replace: true });
        } else {
          // Direct login - bypass tenant setup as it's handled by backend now
          toast.success('Account created successfully!');

          // Check for workspace URL in response (could be in result directly or result.data based on return structure)
          const workspaceUrl = result.workspace_url || result.data?.workspace_url;

          if (workspaceUrl) {
            // Redirect to the new workspace subdomain
            window.location.href = workspaceUrl;
          } else {
            // Fallback to local dashboard
            navigate('/dashboard', { replace: true });
          }
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);

      // Handle backend validation errors
      if (error.response?.data?.errors) {
        console.log('Validation Errors:', error.response.data.errors);
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          let stateKey = key;
          // Map backend keys to frontend state keys
          if (key === 'subdomain') stateKey = 'tenantUrl';
          if (key === 'organizationFullName') stateKey = 'organizationName';
          if (key === 'slug') stateKey = 'tenantUrl'; // Just in case

          backendErrors[stateKey] = error.response.data.errors[key][0];
        });
        setErrors(backendErrors);
        // Also show a toast generic message so they know something failed
        toast.error('Please check the form for errors.');
      } else {
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error('File size must be less than 2MB');
        return;
      }
      setFormData(prev => ({ ...prev, organizationLogo: file }));
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

            {/* Tenant URL Field - For All Types */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                Workspace URL <span className="text-red-400">*</span>
              </label>

              <div className="flex items-center gap-3">
                <div className={`
                    flex-1 flex items-center bg-white/5 border rounded-lg overflow-hidden transition-all relative
                    ${errors.tenantUrl ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500/20' :
                    domainStatus === 'available' ? 'border-green-500 focus-within:ring-2 focus-within:ring-green-500/20' :
                      'border-white/10 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20'}
                  `}>
                  <input
                    type="text"
                    name="tenantUrl"
                    value={formData.tenantUrl}
                    onChange={handleTenantUrlChange}
                    className="w-full bg-transparent border-none text-white placeholder-gray-500 px-4 py-3 focus:ring-0 focus:outline-none"
                    placeholder="your-workspace"
                    disabled={isLoading}
                  />

                  {/* Availability Check Button (Inside Input) */}
                  <div className="pr-2">
                    <button
                      type="button"
                      onClick={handleCheckDomain}
                      disabled={!formData.tenantUrl || checkingDomain || isLoading}
                      className={`
                          p-1.5 rounded-md transition-all duration-200 flex items-center gap-1
                          ${!formData.tenantUrl
                          ? 'opacity-50 text-gray-600 cursor-not-allowed'
                          : 'opacity-100 hover:bg-white/10 text-primary-400 hover:text-white cursor-pointer'
                        }
                        `}
                      title="Check Availability"
                    >
                      {checkingDomain ? (
                        <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="text-xs font-bold uppercase tracking-wider">Check</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Suffix Outside */}
                <div className="text-gray-400 font-medium select-none whitespace-nowrap bg-white/5 px-4 py-3 border border-white/10 rounded-lg">
                  .obsolio.com
                </div>
              </div>

              {/* Status Messages */}
              {domainStatus === 'available' && !errors.tenantUrl && (
                <p className="mt-1.5 text-xs text-green-400 ml-1 flex items-center gap-1 animate-fade-in">
                  <CheckCircle className="w-3 h-3" /> Available
                </p>
              )}
              {domainStatus === 'unavailable' && !errors.tenantUrl && (
                <p className="mt-1.5 text-xs text-red-400 ml-1 flex items-center gap-1 animate-fade-in">
                  <XCircle className="w-3 h-3" /> {domainMessage || 'Not available'}
                </p>
              )}
              {errors.tenantUrl && (
                <p className="mt-1.5 text-xs text-red-500 ml-1 animate-fade-in">{errors.tenantUrl}</p>
              )}
            </div>


            {/* Organization Fields */}
            {formData.tenantType === 'organization' && (
              <div className="space-y-4 pt-2 pb-4 border-b border-white/5 animate-fade-in">

                {/* Organization Name & Short Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    theme="dark"
                    label="Organization Name"
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    icon={Building2}
                    error={errors.organizationName}
                    disabled={isLoading}
                  />
                  <Input
                    theme="dark"
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

                {/* Enhanced Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                    Organization Logo
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
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-primary-500/50 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-primary-400" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {formData.organizationLogo ? formData.organizationLogo.name : 'Click to upload logo'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max 2MB)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

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

            {/* Country and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Country
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`
                      w-full bg-white/5 border rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer
                      ${errors.country ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-primary-500 focus:ring-primary-500/20'}
                    `}
                    disabled={isLoading}
                  >
                    <option value="" disabled className="text-gray-500 bg-white">Select a country</option>
                    <option value="United States" className="text-gray-900 bg-white">United States</option>
                    <option value="United Kingdom" className="text-gray-900 bg-white">United Kingdom</option>
                    <option value="Canada" className="text-gray-900 bg-white">Canada</option>
                    <option value="Germany" className="text-gray-900 bg-white">Germany</option>
                    <option value="France" className="text-gray-900 bg-white">France</option>
                    <option value="Australia" className="text-gray-900 bg-white">Australia</option>
                    <option value="Japan" className="text-gray-900 bg-white">Japan</option>
                    {/* Add more countries as needed - in real app use a library */}
                  </select>
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                {errors.country && (
                  <p className="mt-1 text-xs text-red-500 ml-1 animate-fade-in">{errors.country}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555-0123"
                    className={`
                            w-full bg-white/5 border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 transition-all placeholder-gray-500
                            ${errors.phone
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-primary-500 focus:ring-primary-500/20'
                      }
                        `}
                    disabled={isLoading}
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500 ml-1 animate-fade-in">{errors.phone}</p>
                )}
              </div>
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
