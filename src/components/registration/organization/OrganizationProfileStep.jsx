import { useState } from 'react';
import { Building2, Globe, Users, Clock, FileText, Upload } from 'lucide-react';
import Input from '../../common/Input/Input';
import Select from '../../common/Input/Select';
import Textarea from '../../common/Input/Textarea';
import Button from '../../common/Button/Button';
import { useRegistrationWizardStore } from '../../../store/registrationWizardStore';

const OrganizationProfileStep = ({ onNext, onBack }) => {
  const { organizationData, updateOrganizationProfile } = useRegistrationWizardStore();
  const profile = organizationData.profile;
  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'legal', label: 'Legal' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'other', label: 'Other' },
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1,000 employees' },
    { value: '1000+', label: '1,000+ employees' },
  ];

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'in', label: 'India' },
    { value: 'sg', label: 'Singapore' },
    { value: 'ae', label: 'UAE' },
    { value: 'other', label: 'Other' },
  ];

  const timezones = [
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
    { value: 'UTC-6', label: 'Central Time (UTC-6)' },
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC', label: 'UTC' },
    { value: 'UTC+1', label: 'Central European Time (UTC+1)' },
    { value: 'UTC+5:30', label: 'India Standard Time (UTC+5:30)' },
    { value: 'UTC+8', label: 'Singapore Time (UTC+8)' },
    { value: 'UTC+10', label: 'Australian Eastern Time (UTC+10)' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!profile.organizationName) {
      newErrors.organizationName = 'Organization name is required';
    } else if (profile.organizationName.length < 2) {
      newErrors.organizationName = 'Organization name must be at least 2 characters';
    }

    if (!profile.industry) {
      newErrors.industry = 'Please select an industry';
    }

    if (!profile.companySize) {
      newErrors.companySize = 'Please select company size';
    }

    if (!profile.country) {
      newErrors.country = 'Please select a country';
    }

    if (!profile.timezone) {
      newErrors.timezone = 'Please select a timezone';
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
    updateOrganizationProfile({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          logo: 'Please upload a valid image file (JPG, PNG, SVG, or WebP)',
        }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logo: 'Image size must be less than 2MB',
        }));
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        updateOrganizationProfile({ logo: file });
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.logo;
          return newErrors;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Organization Profile</h2>
        <p className="text-secondary-600">
          Tell us about your organization. This information helps us tailor your experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Name */}
        <Input
          label="Organization Name"
          type="text"
          placeholder="Acme Corporation"
          value={profile.organizationName}
          onChange={(e) => handleChange('organizationName', e.target.value)}
          leftIcon={<Building2 className="w-5 h-5" />}
          error={errors.organizationName}
          required
          fullWidth
        />

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Organization Logo
            <span className="text-gray-500 font-normal ml-2">(Optional)</span>
          </label>
          <div className="flex items-center gap-4">
            {logoPreview ? (
              <div className="relative w-24 h-24 rounded-lg border-2 border-gray-200 overflow-hidden">
                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setLogoPreview(null);
                    updateOrganizationProfile({ logo: null });
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <label
                htmlFor="logo-upload"
                className="inline-block px-4 py-2 bg-gray-100 text-secondary-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Choose File
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG, SVG or WebP. Max size 2MB.
              </p>
              {errors.logo && <p className="text-sm text-red-500 mt-1">{errors.logo}</p>}
            </div>
          </div>
        </div>

        {/* Industry & Company Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Industry"
            value={profile.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            options={industries}
            placeholder="Select industry"
            error={errors.industry}
            required
            fullWidth
          />

          <Select
            label="Company Size"
            value={profile.companySize}
            onChange={(e) => handleChange('companySize', e.target.value)}
            options={companySizes}
            placeholder="Select company size"
            error={errors.companySize}
            required
            fullWidth
          />
        </div>

        {/* Country & Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Country"
            value={profile.country}
            onChange={(e) => handleChange('country', e.target.value)}
            options={countries}
            placeholder="Select country"
            error={errors.country}
            required
            fullWidth
          />

          <Select
            label="Timezone"
            value={profile.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            options={timezones}
            placeholder="Select timezone"
            error={errors.timezone}
            required
            fullWidth
          />
        </div>

        {/* Description */}
        <Textarea
          label="Organization Description"
          placeholder="Briefly describe your organization, its mission, and what it does..."
          value={profile.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          helperText="This helps us understand your organization better (optional)"
          fullWidth
        />

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <div className="flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Why do we need this information?</h4>
            <p className="text-sm text-blue-700">
              This information helps us customize your workspace, provide relevant features, and
              ensure compliance with regional requirements. All data is securely stored and encrypted.
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="primary" size="lg" className="min-w-[200px]">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationProfileStep;
