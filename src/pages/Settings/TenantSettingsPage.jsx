import { useState, useRef } from 'react';
import { Building2, Upload, Globe, Phone, Mail, MapPin, Clock, DollarSign, FileText, Save, X, Shield, Users, Calendar, Briefcase, Link as LinkIcon, Hash, CreditCard } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';

const TenantSettingsPage = () => {
  const fileInputRef = useRef(null);

  const [tenantInfo, setTenantInfo] = useState({
    // Organization Details
    name: 'Acme Corporation',
    logo: null,
    logoPreview: 'https://ui-avatars.com/api/?name=Acme+Corporation&size=200&background=4F46E5&color=fff',
    legalName: 'Acme Corporation Inc.',
    industry: 'Technology',
    companySize: '50-200',
    taxId: 'US-123456789',
    registrationNumber: 'REG-2024-12345',
    website: 'https://www.acme.com',
    linkedIn: 'https://linkedin.com/company/acme',
    foundedYear: '2010',
    description: 'Leading provider of AI-powered business solutions',

    // Contact Information
    primaryPhone: '+1 (555) 123-4567',
    secondaryPhone: '+1 (555) 123-4568',
    supportPhone: '+1 (555) 123-4569',
    fax: '+1 (555) 123-4570',
    primaryEmail: 'contact@acme.com',
    supportEmail: 'support@acme.com',
    billingEmail: 'billing@acme.com',
    salesEmail: 'sales@acme.com',

    // Address
    streetAddress: '123 Tech Avenue',
    addressLine2: 'Suite 100',
    city: 'San Francisco',
    stateProvince: 'California',
    postalCode: '94102',
    country: 'United States',

    // Billing Address (if different)
    useSameAddress: true,
    billingStreetAddress: '',
    billingAddressLine2: '',
    billingCity: '',
    billingStateProvince: '',
    billingPostalCode: '',
    billingCountry: 'United States',

    // Regional Settings
    timezone: 'America/Los_Angeles',
    language: 'en',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',

    // System Info
    plan: 'Enterprise',
    domain: 'acme.aasim.ai',
    adminEmail: 'admin@acme.com',
    maxUsers: 100,
    currentUsers: 47,
    storageLimit: '1TB',
    storageUsed: '450GB',
    planStartDate: '2024-01-01',
    planRenewalDate: '2025-01-01'
  });

  const [settings, setSettings] = useState({
    enableSSO: true,
    enableMFA: true,
    enableAuditLogs: true,
    enableAPIAccess: true,
    dataRetention: 90,
    allowPublicAgents: true,
    allowPrivateAgents: true,
    autoBackup: true,
    notificationEmail: true,
    notificationSlack: false
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Manufacturing', 'Consulting', 'Real Estate', 'E-commerce',
    'Transportation', 'Energy', 'Telecommunications', 'Other'
  ];

  const companySizes = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Germany', 'France',
    'Australia', 'Japan', 'Singapore', 'United Arab Emirates', 'India',
    'China', 'Brazil', 'Mexico', 'Netherlands', 'Switzerland', 'Other'
  ];

  const timezones = [
    'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Amsterdam',
    'Asia/Tokyo', 'Asia/Singapore', 'Asia/Dubai', 'Australia/Sydney'
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTenantInfo({
          ...tenantInfo,
          logo: file,
          logoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setTenantInfo({
      ...tenantInfo,
      logo: null,
      logoPreview: `https://ui-avatars.com/api/?name=${encodeURIComponent(tenantInfo.name)}&size=200&background=4F46E5&color=fff`
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    console.log('Saving tenant settings:', { tenantInfo, settings });
    alert('Settings saved successfully!');
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary-600" />
                Tenant Settings
              </h1>
              <p className="text-secondary-600 mt-2">
                Manage your organization's configuration, preferences, and compliance settings
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 border-l-4 border-primary-600">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Active Users</div>
              <Users className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{tenantInfo.currentUsers}</div>
            <div className="text-xs text-gray-500 mt-1">of {tenantInfo.maxUsers} total</div>
          </div>

          <div className="glass-card rounded-2xl p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Storage Used</div>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{tenantInfo.storageUsed}</div>
            <div className="text-xs text-gray-500 mt-1">of {tenantInfo.storageLimit} limit</div>
          </div>

          <div className="glass-card rounded-2xl p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Plan</div>
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-secondary-900">{tenantInfo.plan}</div>
            <div className="text-xs text-gray-500 mt-1">Active subscription</div>
          </div>

          <div className="glass-card rounded-2xl p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-secondary-600">Renewal Date</div>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-secondary-900">
              {new Date(tenantInfo.planRenewalDate).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">Auto-renewal enabled</div>
          </div>
        </div>

        {/* Consolidated Basic Information */}
        <Card>
          <div className="border-b border-gray-200 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">Basic Information</h2>
                <p className="text-sm text-secondary-600 mt-1">
                  Complete organization profile including contact details, address, and company information
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Logo & Company Identity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Logo Upload - Left Column */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <label className="block text-sm font-semibold text-secondary-900 mb-4">
                    Organization Logo
                  </label>
                  <div className="glass-card rounded-2xl p-6 text-center border-2 border-dashed border-gray-300 hover:border-primary-600 transition-colors">
                    <img
                      src={tenantInfo.logoPreview}
                      alt="Organization Logo"
                      className="w-32 h-32 mx-auto rounded-xl object-cover border-4 border-white shadow-lg mb-4"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full glass-btn-primary rounded-lg px-4 py-2.5 font-medium inline-flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload New Logo
                      </button>
                      {tenantInfo.logo && (
                        <button
                          onClick={handleRemoveLogo}
                          className="w-full glass-btn-secondary rounded-lg px-4 py-2.5 font-medium inline-flex items-center justify-center gap-2 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                          Remove Logo
                        </button>
                      )}
                    </div>
                    <div className="mt-4 text-left">
                      <p className="text-xs text-secondary-600 mb-1">
                        <strong>Requirements:</strong>
                      </p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Square format (200x200px min)</li>
                        <li>• Max size: 5MB</li>
                        <li>• JPG, PNG, or SVG</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details - Right Columns */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6 border border-primary-200">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900 mb-1">Company Identity</h3>
                      <p className="text-sm text-secondary-600 mb-4">
                        Primary information about your organization
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            Organization Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.name}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, name: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder="Enter organization name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            Legal Name
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.legalName}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, legalName: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder="Legal business name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            Industry <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={tenantInfo.industry}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, industry: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                          >
                            {industries.map(industry => (
                              <option key={industry} value={industry}>{industry}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            Company Size
                          </label>
                          <select
                            value={tenantInfo.companySize}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, companySize: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                          >
                            {companySizes.map(size => (
                              <option key={size} value={size}>{size} employees</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            <Hash className="w-3 h-3 inline mr-1" />
                            Tax ID / EIN
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.taxId}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, taxId: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder="XX-XXXXXXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            Registration Number
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.registrationNumber}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, registrationNumber: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder="REG-XXXX-XXXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            <LinkIcon className="w-3 h-3 inline mr-1" />
                            Website
                          </label>
                          <input
                            type="url"
                            value={tenantInfo.website}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, website: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder="https://www.example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            value={tenantInfo.linkedIn}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, linkedIn: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder="https://linkedin.com/company/..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Founded Year
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.foundedYear}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, foundedYear: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder="YYYY"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                            Custom Domain
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.domain}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, domain: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder="company.aasim.ai"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                          Company Description
                        </label>
                        <textarea
                          value={tenantInfo.description}
                          onChange={(e) => setTenantInfo({ ...tenantInfo, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white resize-none"
                          placeholder="Brief description of your organization..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3 mb-6">
                <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">Contact Information</h3>
                  <p className="text-sm text-secondary-600">
                    Primary contact channels for your organization
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Phone Numbers */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-secondary-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    Phone Numbers
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-2">
                      Primary Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={tenantInfo.primaryPhone}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, primaryPhone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-2">
                      Secondary Phone
                    </label>
                    <input
                      type="tel"
                      value={tenantInfo.secondaryPhone}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, secondaryPhone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-2">
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      value={tenantInfo.supportPhone}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, supportPhone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-2">
                      Fax Number
                    </label>
                    <input
                      type="tel"
                      value={tenantInfo.fax}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, fax: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Email Addresses */}
                <div className="space-y-4 md:col-span-2 lg:col-span-2">
                  <div className="text-xs font-bold text-secondary-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email Addresses
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 mb-2">
                        Primary Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={tenantInfo.primaryEmail}
                        onChange={(e) => setTenantInfo({ ...tenantInfo, primaryEmail: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="contact@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 mb-2">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={tenantInfo.supportEmail}
                        onChange={(e) => setTenantInfo({ ...tenantInfo, supportEmail: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="support@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 mb-2">
                        Billing Email
                      </label>
                      <input
                        type="email"
                        value={tenantInfo.billingEmail}
                        onChange={(e) => setTenantInfo({ ...tenantInfo, billingEmail: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="billing@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 mb-2">
                        Sales Email
                      </label>
                      <input
                        type="email"
                        value={tenantInfo.salesEmail}
                        onChange={(e) => setTenantInfo({ ...tenantInfo, salesEmail: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="sales@company.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Address Section */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary-900 mb-1">Business Address</h3>
                  <p className="text-sm text-secondary-600">
                    Primary physical location of your organization
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={tenantInfo.streetAddress}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, streetAddress: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      value={tenantInfo.addressLine2}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, addressLine2: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="Suite, Unit, Building, Floor"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={tenantInfo.city}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, city: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                      State/Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={tenantInfo.stateProvince}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, stateProvince: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={tenantInfo.postalCode}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, postalCode: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={tenantInfo.country}
                    onChange={(e) => setTenantInfo({ ...tenantInfo, country: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* Billing Address Option */}
                <div className="border-t border-green-200 pt-4 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="useSameAddress"
                      checked={tenantInfo.useSameAddress}
                      onChange={(e) => setTenantInfo({ ...tenantInfo, useSameAddress: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="useSameAddress" className="text-sm font-medium text-secondary-700">
                      Billing address is the same as business address
                    </label>
                  </div>

                  {!tenantInfo.useSameAddress && (
                    <div className="space-y-4 bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="text-sm font-semibold text-secondary-900">Billing Address</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.billingStreetAddress}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, billingStreetAddress: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.billingAddressLine2}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, billingAddressLine2: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Optional"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.billingCity}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, billingCity: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2">
                            State/Province
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.billingStateProvince}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, billingStateProvince: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            value={tenantInfo.billingPostalCode}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, billingPostalCode: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="12345"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-secondary-700 mb-2">
                            Country
                          </label>
                          <select
                            value={tenantInfo.billingCountry}
                            onChange={(e) => setTenantInfo({ ...tenantInfo, billingCountry: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            {countries.map(country => (
                              <option key={country} value={country}>{country}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Regional & Localization Settings */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-start gap-3 mb-6">
                <Globe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">Regional & Localization Settings</h3>
                  <p className="text-sm text-secondary-600">
                    Configure time zone, language, currency, and date/time formats
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Time Zone <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={tenantInfo.timezone}
                    onChange={(e) => setTenantInfo({ ...tenantInfo, timezone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    {timezones.map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                    <Globe className="w-3 h-3 inline mr-1" />
                    Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={tenantInfo.language}
                    onChange={(e) => setTenantInfo({ ...tenantInfo, language: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Español (Spanish)</option>
                    <option value="fr">Français (French)</option>
                    <option value="de">Deutsch (German)</option>
                    <option value="ja">日本語 (Japanese)</option>
                    <option value="zh">中文 (Chinese)</option>
                    <option value="ar">العربية (Arabic)</option>
                    <option value="pt">Português (Portuguese)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                    <DollarSign className="w-3 h-3 inline mr-1" />
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={tenantInfo.currency}
                    onChange={(e) => setTenantInfo({ ...tenantInfo, currency: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    {currencies.map(curr => (
                      <option key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                    Date Format
                  </label>
                  <select
                    value={tenantInfo.dateFormat}
                    onChange={(e) => setTenantInfo({ ...tenantInfo, dateFormat: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY (EU)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    <option value="DD.MM.YYYY">DD.MM.YYYY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-2 uppercase tracking-wide">
                    Time Format
                  </label>
                  <select
                    value={tenantInfo.timeFormat}
                    onChange={(e) => setTenantInfo({ ...tenantInfo, timeFormat: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    <option value="12h">12-hour (AM/PM)</option>
                    <option value="24h">24-hour</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security & Compliance */}
        <Card>
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">Security & Compliance</h2>
                <p className="text-sm text-secondary-600 mt-1">
                  Configure security policies and compliance requirements
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-5 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-secondary-900">Single Sign-On (SSO)</p>
                  <p className="text-sm text-secondary-600 mt-1">Enable SAML/OAuth authentication</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableSSO}
                    onChange={(e) => setSettings({ ...settings, enableSSO: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-secondary-900">Multi-Factor Authentication</p>
                  <p className="text-sm text-secondary-600 mt-1">Require MFA for all users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableMFA}
                    onChange={(e) => setSettings({ ...settings, enableMFA: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-secondary-900">Audit Logs</p>
                  <p className="text-sm text-secondary-600 mt-1">Track all system activities</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableAuditLogs}
                    onChange={(e) => setSettings({ ...settings, enableAuditLogs: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-secondary-900">API Access</p>
                  <p className="text-sm text-secondary-600 mt-1">Enable API key authentication</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableAPIAccess}
                    onChange={(e) => setSettings({ ...settings, enableAPIAccess: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-secondary-900">Auto Backup</p>
                  <p className="text-sm text-secondary-600 mt-1">Daily automated backups</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 border-l-4 border-purple-500">
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Data Retention (days)
                </label>
                <input
                  type="number"
                  value={settings.dataRetention}
                  onChange={(e) => setSettings({ ...settings, dataRetention: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="30"
                  max="3650"
                />
                <p className="text-xs text-gray-500 mt-2">Minimum: 30 days, Maximum: 10 years</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Agent Permissions */}
        <Card>
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">Agent Permissions</h2>
                <p className="text-sm text-secondary-600 mt-1">
                  Control agent deployment and usage policies
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-5 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-secondary-900">Allow Public Agents</p>
                  <p className="text-sm text-secondary-600 mt-1">Users can deploy public marketplace agents</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowPublicAgents}
                    onChange={(e) => setSettings({ ...settings, allowPublicAgents: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-secondary-900">Allow Private Agents</p>
                  <p className="text-sm text-secondary-600 mt-1">Users can create custom private agents</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowPrivateAgents}
                    onChange={(e) => setSettings({ ...settings, allowPrivateAgents: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Sticky Action Bar */}
        <div className="sticky bottom-6 z-20">
          <div className="glass-card rounded-2xl p-6 shadow-2xl border-2 border-primary-200 bg-gradient-to-r from-white to-primary-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Save className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">Ready to save your changes?</p>
                  <p className="text-sm text-secondary-600">Make sure all required fields are completed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" className="px-6">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="px-8 inline-flex items-center gap-2 shadow-lg">
                  <Save className="w-4 h-4" />
                  Save All Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TenantSettingsPage;
