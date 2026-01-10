import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { organizationService, tenantService } from '../../services';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button } from '../../components/common';
import { Building2, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// --- Data Constants ---
const INDUSTRIES = [
    "Software & Technology", "Healthcare", "Finance & Banking", "Education",
    "Retail & E-commerce", "Manufacturing", "Media & Entertainment", "Real Estate",
    "Consulting", "Non-Profit", "Logistics & Transportation", "Construction",
    "Energy & Utilities", "Government", "Hospitality & Tourism", "Legal Services",
    "Marketing & Advertising", "Telecommunications", "Agriculture", "Other"
];

const COMPANY_SIZES = [
    "1-10 employees", "11-50 employees", "51-200 employees",
    "201-500 employees", "501-1000 employees", "1000-5000 employees", "5000+ employees"
];

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. 'Swaziland')", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
    "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const TIMEZONES = [
    "UTC-12:00", "UTC-11:00", "UTC-10:00 (Hawaii)", "UTC-09:00 (Alaska)", "UTC-08:00 (Pacific Time)",
    "UTC-07:00 (Mountain Time)", "UTC-06:00 (Central Time)", "UTC-05:00 (Eastern Time)", "UTC-04:00 (Atlantic Time)",
    "UTC-03:00 (Brasilia)", "UTC-02:00", "UTC-01:00", "UTC+00:00 (London, Dublin)", "UTC+01:00 (Paris, Berlin)",
    "UTC+02:00 (Cairo, Al-Quds)", "UTC+03:00 (Moscow, Riyadh)", "UTC+03:30 (Tehran)", "UTC+04:00 (Dubai)",
    "UTC+05:00 (Karachi)", "UTC+05:30 (New Delhi)", "UTC+06:00 (Dhaka)", "UTC+07:00 (Bangkok)",
    "UTC+08:00 (Beijing, Singapore)", "UTC+09:00 (Tokyo)", "UTC+09:30 (Adelaide)", "UTC+10:00 (Sydney)",
    "UTC+11:00", "UTC+12:00"
];

// --- Local Components ---

const OrganizationSettingsPage = () => {
    const { user, updateUser } = useAuthStore();
    const { theme } = useTheme();
    const fileInputRef = useRef(null);
    const [orgId, setOrgId] = useState(null);
    const [useTenantServiceForUpdate, setUseTenantServiceForUpdate] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Styles
    const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';
    const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 appearance-none ${theme === 'dark'
        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
        }`;
    const labelClass = `text-sm font-medium ml-1 ${textSecondary}`;

    // Select Component (Local to use theme)
    const Select = ({ label, name, value, onChange, options, fullWidth, className, required, placeholder = "Select..." }) => (
        <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
            {label && (
                <label className={labelClass}>
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${inputClass} ${className}`}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt} className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>{opt}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className={`w-4 h-4 ${textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );

    // Input Component (Local to use theme)
    const Input = ({ label, name, value, onChange, fullWidth, className, required, type = "text" }) => (
        <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
            {label && (
                <label className={labelClass}>
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`${inputClass} ${className}`}
            />
        </div>
    );


    // Base URL for resolving relative image paths (common in Laravel)
    const STORAGE_BASE_URL = 'https://api.obsolio.com';

    const [formData, setFormData] = useState({
        organization_full_name: '',
        organization_short_name: '',
        phone: '',
        industry: '',
        company_size: '',
        country: '',
        timezone: '',
        description: '',
        logo: null,
        logo_preview: null
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Normalize Image URL helper
    const getNormalizedLogoUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('blob:') || url.startsWith('data:')) return url;
        if (url.startsWith('http')) return url;
        // Handle relative paths
        if (url.startsWith('/')) return `${STORAGE_BASE_URL}${url}`;
        return `${STORAGE_BASE_URL}/${url}`;
    };

    // Reset error when preview changes
    useEffect(() => {
        setImageError(false);
    }, [formData.logo_preview]);

    useEffect(() => {
        const fetchOrganizationData = async () => {
            setFetching(true);
            try {
                try {
                    // 1. Try to get current organization directly (New Endpoint)
                    try {
                        const response = await organizationService.organizations.getCurrent();
                        const orgData = response.data || response;

                        if (orgData) {
                            setOrganizationData(orgData);
                            return; // Successfully loaded
                        }
                    } catch (newEndpointError) {
                        console.warn('⚠️ Failed to fetch via /tenant/organization (New Endpoint), falling back to list:', newEndpointError);
                        // If 500 or 404, fall through to legacy method
                    }

                    // 2. Fallback: Get organization list (Legacy)
                    const orgResponse = await organizationService.organizations.list();
                    const orgs = Array.isArray(orgResponse) ? orgResponse : (orgResponse.data || []);

                    if (orgs.length > 0) {
                        const match = orgs.find(o => o.id === user.tenant?.id) || orgs[0];
                        setOrgId(match.id);
                        // Fetch full details
                        const fullOrgDetails = await organizationService.organizations.get(match.id);
                        setOrganizationData(fullOrgDetails.data || fullOrgDetails);
                    } else {
                        // 3. Last Resort: Tenant Service
                        if (user.tenant?.id) {
                            const tenant = await tenantService.getTenant(user.tenant.id);
                            if (tenant) {
                                setOrgId(tenant.organization?.id || tenant.id);
                                setUseTenantServiceForUpdate(true);
                                setOrganizationData(tenant.organization || tenant);
                            }
                        }
                    }
                } catch (err) {
                    // ... error handling
                } finally {
                    setFetching(false);
                }
            };

            const setOrganizationData = (orgData) => {
                if (orgData) {
                    setOrgId(orgData.id);
                    setFormData({
                        organization_full_name: orgData.organization_full_name || orgData.name || '',
                        organization_short_name: orgData.organization_short_name || orgData.short_name || '',
                        phone: orgData.phone || '',
                        industry: orgData.industry || '',
                        company_size: orgData.company_size || '',
                        country: orgData.country || '',
                        timezone: orgData.timezone || '',
                        description: orgData.description || '',
                        logo: null,
                        logo_preview: getNormalizedLogoUrl(orgData.organizationLogo || orgData.logo_url || orgData.logo)
                    });
                }
            };

            fetchOrganizationData();
        }, [user.tenant?.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
        if (success) setSuccess(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageError(false);
            const objectUrl = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                logo: file,
                logo_preview: objectUrl
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const payload = new FormData();
            payload.append('organizationName', formData.organization_full_name);
            payload.append('organizationShortName', formData.organization_short_name);
            // payload.append('name', formData.organization_full_name); // Redundant if backend uses specific keys
            // payload.append('organization_full_name', formData.organization_full_name); 
            // payload.append('short_name', formData.organization_short_name);
            // payload.append('organization_short_name', formData.organization_short_name);

            if (formData.phone) payload.append('phone', formData.phone);
            if (formData.industry) payload.append('industry', formData.industry);
            if (formData.company_size) payload.append('company_size', formData.company_size);
            if (formData.country) payload.append('country', formData.country);
            if (formData.timezone) payload.append('timezone', formData.timezone);
            if (formData.description) payload.append('description', formData.description);

            payload.append('_method', 'PUT');

            if (formData.logo) {
                payload.append('organizationLogo', formData.logo);
            }

            const response = await organizationService.organizations.updateCurrent(payload);
            const updatedData = response.data || response;

            const updatedUserTenant = {
                ...user.tenant,
                name: updatedData.name || updatedData.organization_full_name || formData.organization_full_name,
                short_name: updatedData.short_name || updatedData.organization_short_name || formData.organization_short_name,
                logo_url: updatedData.logo_url || updatedData.organizationLogo || updatedData.logo || user.tenant?.logo_url
            };

            updateUser({ tenant: updatedUserTenant });
            setSuccess('Settings updated successfully');

        } catch (err) {
            console.error("Update Error:", err);
            setError(err.response?.data?.message || 'Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    if (fetching) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-[calc(100vh-100px)]">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-600 border-b-transparent"></div>
                </div>
            </MainLayout>
        );
    }

    const currentLogoUrl = getNormalizedLogoUrl(formData.logo_preview);

    return (
        <MainLayout>
            <div className="py-8 space-y-8">
                <div className="max-w-4xl mx-auto">

                    <div className="mb-6">
                        <h1 className={`text-4xl font-bold font-heading mb-2 ${textPrimary}`}>Organization Settings</h1>
                        <p className={textSecondary}>Manage your organization's public profile and details.</p>
                    </div>

                    {/* Notifications */}
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 rounded p-3 flex items-center gap-2 text-red-700 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <p>{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 bg-green-50 border border-green-200 rounded p-3 flex items-center gap-2 text-green-700 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <p>{success}</p>
                        </div>
                    )}

                    <Card className="p-8">

                        {/* Logo Upload - Compact */}
                        <div className={`flex items-center gap-4 mb-8 pb-8 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                            <div
                                onClick={triggerFileInput}
                                className={`w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors overflow-hidden ${theme === 'dark'
                                    ? 'bg-gray-800 border-gray-700 hover:border-gray-500'
                                    : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                                    }`}
                            >
                                {currentLogoUrl && !imageError ? (
                                    <img
                                        key={currentLogoUrl}
                                        src={currentLogoUrl}
                                        alt="Logo"
                                        onError={(e) => {
                                            console.warn('Image failed to load:', currentLogoUrl);
                                            setImageError(true);
                                        }}
                                        className="w-full h-full object-contain p-1"
                                    />
                                ) : (
                                    <Building2 className={`w-8 h-8 ${textSecondary}`} />
                                )}
                            </div>
                            <div>
                                <h3 className={`font-semibold ${textPrimary}`}>Organization Logo</h3>
                                <p className={`text-sm mb-2 ${textSecondary}`}>Recommended size: 512x512px</p>
                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                                >
                                    Change Logo
                                </button>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>

                        {/* Form Inputs - Compact Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Input
                                label="Organization Name"
                                name="organization_full_name"
                                value={formData.organization_full_name}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <Input
                                label="Short Name (Slug)"
                                name="organization_short_name"
                                value={formData.organization_short_name}
                                onChange={handleChange}
                                fullWidth
                            />

                            <Select
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                options={COUNTRIES}
                                placeholder="Select Country"
                                fullWidth
                            />

                            <Input
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                fullWidth
                            />

                            <Select
                                label="Industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                options={INDUSTRIES}
                                placeholder="Select Industry"
                                fullWidth
                            />

                            <Select
                                label="Company Size"
                                name="company_size"
                                value={formData.company_size}
                                onChange={handleChange}
                                options={COMPANY_SIZES}
                                placeholder="Select Size"
                                fullWidth
                            />
                        </div>

                        <div className="mb-6">
                            <Select
                                label="Timezone"
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                                options={TIMEZONES}
                                placeholder="Select Timezone"
                                fullWidth
                            />
                        </div>

                        <div className="mb-8">
                            <label className={labelClass}>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${theme === 'dark'
                                    ? 'bg-gray-800 border-gray-700 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            />
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                            <Button
                                onClick={handleSubmit}
                                loading={loading}
                                size="lg"
                                className="bg-primary-600 text-white hover:bg-primary-700 shadow-lg"
                            >
                                Save Changes
                            </Button>
                        </div>

                    </Card>
                </div>
            </div>
        </MainLayout>
    );
};

export default OrganizationSettingsPage;
