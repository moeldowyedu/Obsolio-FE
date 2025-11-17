import { useState, useRef } from 'react';
import { Building2, Upload, Globe, Phone, Mail, MapPin, Clock, DollarSign, FileText, Save, X } from 'lucide-react';
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
    industry: 'Technology',
    companySize: '50-200',
    taxId: 'US-123456789',
    website: 'https://www.acme.com',

    // Contact Information
    primaryPhone: '+1 (555) 123-4567',
    supportPhone: '+1 (555) 123-4568',
    fax: '+1 (555) 123-4569',
    primaryEmail: 'contact@acme.com',
    supportEmail: 'support@acme.com',
    billingEmail: 'billing@acme.com',

    // Address
    streetAddress: '123 Tech Avenue',
    addressLine2: 'Suite 100',
    city: 'San Francisco',
    stateProvince: 'California',
    postalCode: '94102',
    country: 'United States',

    // Regional Settings
    timezone: 'America/Los_Angeles',
    language: 'en',
    currency: 'USD',

    // System Info
    plan: 'Enterprise',
    domain: 'acme.aasim.ai',
    adminEmail: 'admin@acme.com',
    maxUsers: 100,
    currentUsers: 47,
    storageLimit: '1TB',
    storageUsed: '450GB'
  });

  const [settings, setSettings] = useState({
    enableSSO: true,
    enableMFA: true,
    enableAuditLogs: true,
    dataRetention: 90,
    allowPublicAgents: true,
    allowPrivateAgents: true
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Manufacturing', 'Consulting', 'Real Estate', 'Other'
  ];

  const companySizes = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Germany', 'France',
    'Australia', 'Japan', 'Singapore', 'United Arab Emirates', 'Other'
  ];

  const timezones = [
    'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo',
    'Asia/Singapore', 'Australia/Sydney'
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' }
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
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary-600" />
                Tenant Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your organization's configuration and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Tenant Overview Stats */}
        <Card>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={tenantInfo.logoPreview}
                alt={tenantInfo.name}
                className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{tenantInfo.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{tenantInfo.domain}</p>
              </div>
            </div>
            <Badge variant="success" size="lg">{tenantInfo.plan}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {tenantInfo.currentUsers} / {tenantInfo.maxUsers}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Storage</p>
              <p className="text-2xl font-bold text-gray-900">
                {tenantInfo.storageUsed} / {tenantInfo.storageLimit}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Admin Email</p>
              <p className="text-sm font-medium text-gray-900 mt-2">{tenantInfo.adminEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Plan Type</p>
              <p className="text-sm font-medium text-gray-900 mt-2">{tenantInfo.plan}</p>
            </div>
          </div>
        </Card>

        {/* Organization Information */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Organization Information</h3>
          </div>

          <div className="space-y-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Organization Logo
              </label>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={tenantInfo.logoPreview}
                    alt="Organization Logo"
                    className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="glass-btn-secondary rounded-lg px-4 py-2 inline-flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Logo
                    </button>
                    {tenantInfo.logo && (
                      <button
                        onClick={handleRemoveLogo}
                        className="glass-btn-secondary rounded-lg px-4 py-2 inline-flex items-center gap-2 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: Square image, at least 200x200px. Max file size: 5MB.
                  </p>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, SVG
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Details - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tenantInfo.name}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter organization name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Domain
                </label>
                <input
                  type="text"
                  value={tenantInfo.domain}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, domain: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="company.aasim.ai"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  value={tenantInfo.industry}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size
                </label>
                <select
                  value={tenantInfo.companySize}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, companySize: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size} employees</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID / Registration Number
                </label>
                <input
                  type="text"
                  value={tenantInfo.taxId}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, taxId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="XX-XXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={tenantInfo.website}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, website: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={tenantInfo.primaryPhone}
                onChange={(e) => setTenantInfo({ ...tenantInfo, primaryPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Phone
              </label>
              <input
                type="tel"
                value={tenantInfo.supportPhone}
                onChange={(e) => setTenantInfo({ ...tenantInfo, supportPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fax Number
              </label>
              <input
                type="tel"
                value={tenantInfo.fax}
                onChange={(e) => setTenantInfo({ ...tenantInfo, fax: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={tenantInfo.primaryEmail}
                onChange={(e) => setTenantInfo({ ...tenantInfo, primaryEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="contact@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Email
              </label>
              <input
                type="email"
                value={tenantInfo.supportEmail}
                onChange={(e) => setTenantInfo({ ...tenantInfo, supportEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="support@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Email
              </label>
              <input
                type="email"
                value={tenantInfo.billingEmail}
                onChange={(e) => setTenantInfo({ ...tenantInfo, billingEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="billing@company.com"
              />
            </div>
          </div>
        </Card>

        {/* Address Information */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Business Address</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={tenantInfo.streetAddress}
                onChange={(e) => setTenantInfo({ ...tenantInfo, streetAddress: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="123 Main Street"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                value={tenantInfo.addressLine2}
                onChange={(e) => setTenantInfo({ ...tenantInfo, addressLine2: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Suite, Unit, Building, Floor, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tenantInfo.city}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State / Province <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tenantInfo.stateProvince}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, stateProvince: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="State or Province"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tenantInfo.postalCode}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, postalCode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={tenantInfo.country}
                  onChange={(e) => setTenantInfo({ ...tenantInfo, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Regional Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Regional Settings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Time Zone
              </label>
              <select
                value={tenantInfo.timezone}
                onChange={(e) => setTenantInfo({ ...tenantInfo, timezone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Language
              </label>
              <select
                value={tenantInfo.language}
                onChange={(e) => setTenantInfo({ ...tenantInfo, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Currency
              </label>
              <select
                value={tenantInfo.currency}
                onChange={(e) => setTenantInfo({ ...tenantInfo, currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {currencies.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Security & Compliance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Single Sign-On (SSO)</p>
                <p className="text-sm text-gray-600">Enable SAML/OAuth authentication</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableSSO}
                  onChange={(e) => setSettings({ ...settings, enableSSO: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Multi-Factor Authentication</p>
                <p className="text-sm text-gray-600">Require MFA for all users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableMFA}
                  onChange={(e) => setSettings({ ...settings, enableMFA: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Audit Logs</p>
                <p className="text-sm text-gray-600">Track all system activities</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableAuditLogs}
                  onChange={(e) => setSettings({ ...settings, enableAuditLogs: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                value={settings.dataRetention}
                onChange={(e) => setSettings({ ...settings, dataRetention: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </Card>

        {/* Agent Permissions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Permissions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Allow Public Agents</p>
                <p className="text-sm text-gray-600">Users can deploy public marketplace agents</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowPublicAgents}
                  onChange={(e) => setSettings({ ...settings, allowPublicAgents: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Allow Private Agents</p>
                <p className="text-sm text-gray-600">Users can create custom private agents</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowPrivateAgents}
                  onChange={(e) => setSettings({ ...settings, allowPrivateAgents: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between glass-card rounded-2xl p-6 sticky bottom-6 shadow-xl">
          <p className="text-sm text-gray-600">
            Make sure to save your changes before leaving this page
          </p>
          <div className="flex items-center gap-3">
            <Button variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleSave} className="inline-flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TenantSettingsPage;
