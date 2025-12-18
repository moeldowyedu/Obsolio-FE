import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { organizationService, tenantService } from '../../services';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { Building2, Upload, AlertCircle, CheckCircle } from 'lucide-react';

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

const Select = ({ label, name, value, onChange, options, fullWidth, className, required, placeholder = "Select..." }) => (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
            <label className="text-sm font-medium ml-1 text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all duration-200 appearance-none ${className}`}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {/* Custom Arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    </div>
);


const OrganizationSettingsPage = () => {
    const { user, updateUser } = useAuthStore();
    const fileInputRef = useRef(null);
    const [orgId, setOrgId] = useState(null);
    const [useTenantServiceForUpdate, setUseTenantServiceForUpdate] = useState(false);

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

    useEffect(() => {
        const fetchOrganizationData = async () => {
            try {
                setFetching(true);
                // 1. Try Organization Service
                const response = await organizationService.organizations.list();
                const orgs = Array.isArray(response) ? response : (response.data || []);

                if (orgs.length > 0) {
                    const org = orgs[0];
                    setOrgId(org.id);
                    setUseTenantServiceForUpdate(false);
                    setFormData({
                        organization_full_name: org.name || '',
                        organization_short_name: org.short_name || '',
                        phone: org.phone || '',
                        industry: org.industry || '',
                        company_size: org.company_size || '',
                        country: org.country || '',
                        timezone: org.timezone || '',
                        description: org.description || '',
                        logo: null,
                        logo_preview: org.logo_url || org.logo || null
                    });
                } else {
                    throw new Error('No organizations found via organizationService');
                }
            } catch (err) {
                try {
                    // 2. Try Tenant Service Fallback
                    const response = await tenantService.getTenants();
                    const tenants = Array.isArray(response) ? response : (response.data || []);

                    const match = tenants.find(t =>
                        t.id === user.tenant_id ||
                        t.subdomain === user.tenant_id ||
                        t.id?.toString() === user.tenant_id?.toString() ||
                        (t.subdomain && user.tenant?.name && t.name === user.tenant.name)
                    );

                    if (match) {
                        setOrgId(match.id);
                        setUseTenantServiceForUpdate(true);
                        setFormData({
                            organization_full_name: match.organization_full_name || match.name || '',
                            organization_short_name: match.organization_short_name || match.short_name || '',
                            phone: match.phone || '',
                            industry: match.industry || '',
                            company_size: match.company_size || '',
                            country: match.country || '',
                            timezone: match.timezone || '',
                            description: match.description || '',
                            logo: null,
                            logo_preview: match.organizationLogo || match.logo_url || match.logo
                        });
                    } else {
                        throw new Error('Current tenant not found in user tenants list');
                    }
                } catch (fallbackErr) {
                    if (user.tenant) {
                        setOrgId(user.tenant.id);
                        setUseTenantServiceForUpdate(true);
                        setFormData(prev => ({
                            ...prev,
                            organization_full_name: user.tenant.name || '',
                            logo_preview: user.tenant.logo_url
                        }));
                    } else {
                        const errorMessage = err.response?.data?.message || err.message || 'Failed to load organization details.';
                        setError(`Error: ${errorMessage} (${err.response?.status || 'Unknown Status'})`);
                    }
                }
            } finally {
                setFetching(false);
            }
        };

        fetchOrganizationData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
        if (success) setSuccess(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                logo: file,
                logo_preview: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!orgId) {
            setError('Organization ID is missing. Cannot update.');
            setLoading(false);
            return;
        }

        try {
            const payload = new FormData();
            payload.append('organizationName', formData.organization_full_name);
            payload.append('organizationShortName', formData.organization_short_name);
            payload.append('name', formData.organization_full_name);
            payload.append('organization_full_name', formData.organization_full_name);
            payload.append('short_name', formData.organization_short_name);
            payload.append('organization_short_name', formData.organization_short_name);

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

            let response;
            try {
                if (useTenantServiceForUpdate) {
                    response = await tenantService.updateTenant(orgId, payload);
                } else {
                    response = await organizationService.organizations.update(orgId, payload);
                }
            } catch (initialErr) {
                if (useTenantServiceForUpdate) {
                    response = await organizationService.organizations.update(orgId, payload);
                } else {
                    throw initialErr;
                }
            }

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
            setError(err.response?.data?.message || 'Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    if (fetching) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-[calc(100vh-100px)] bg-gray-50">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50 py-10 px-4">
                <div className="max-w-2xl mx-auto">

                    <div className="mb-6">
                        <h1 className="text-xl font-bold text-gray-900">Organization Settings</h1>
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

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

                        {/* Logo Upload - Compact */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                            <div
                                onClick={triggerFileInput}
                                className="w-16 h-16 rounded bg-gray-100 border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden relative"
                            >
                                {formData.logo_preview ? (
                                    <img
                                        src={formData.logo_preview}
                                        alt="Logo"
                                        className="w-full h-full object-contain p-1 relative z-10"
                                    />
                                ) : (
                                    <Building2 className="w-6 h-6 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Organization Logo</h3>
                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1"
                                >
                                    Change Logo
                                </button>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>

                        {/* Form Inputs - Compact Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                                label="Name"
                                name="organization_full_name"
                                value={formData.organization_full_name}
                                onChange={handleChange}
                                required
                                fullWidth
                                className="bg-white"
                            />
                            <Input
                                label="Short Name"
                                name="organization_short_name"
                                value={formData.organization_short_name}
                                onChange={handleChange}
                                fullWidth
                                className="bg-white"
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
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                fullWidth
                                className="bg-white"
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

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button
                                onClick={handleSubmit}
                                loading={loading}
                                size="md"
                                className="bg-black text-white px-8 hover:bg-gray-800"
                            >
                                Save Changes
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default OrganizationSettingsPage;
