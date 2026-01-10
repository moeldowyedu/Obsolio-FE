import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { organizationService } from '../../services';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button } from '../../components/common';
import { Building2, Pencil, Check, X, Camera, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import toast from 'react-hot-toast';

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

// --- Helpers ---
const EditableField = ({ label, name, value, onSave, type = 'text', options = null, readOnly = false }) => {
    const { theme } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value || '');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setTempValue(value || '');
    }, [value]);

    const handleSave = async () => {
        if (tempValue === value) {
            setIsEditing(false);
            return;
        }
        setSaving(true);
        try {
            await onSave(name, tempValue);
            setIsEditing(false);
            toast.success(`${label} updated`);
        } catch (error) {
        } catch (error) {
            const msg = error.response?.data?.message || error.message || 'Unknown error';
            toast.error(`Failed to update ${label}: ${msg}`);
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setTempValue(value || '');
        setIsEditing(false);
    };

    const displayValue = value === null || value === undefined || value === '' ? (
        <span className="italic text-gray-400">undefined</span>
    ) : (
        <span>{value}</span>
    );

    const inputClasses = `w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${theme === 'dark'
        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
        }`;

    return (
        <div className={`flex items-center justify-between py-4 border-b last:border-0 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="w-1/3">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                    {label}
                </span>
            </div>

            <div className="w-2/3 flex items-center gap-3">
                {isEditing ? (
                    <div className="flex-1 flex items-center gap-2 animate-fade-in">
                        {type === 'select' && options ? (
                            <select
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className={inputClasses}
                                autoFocus
                            >
                                <option value="" disabled>Select {label}...</option>
                                {options.map(opt => (
                                    <option key={opt} value={opt} className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>{opt}</option>
                                ))}
                            </select>
                        ) : type === 'textarea' ? (
                            <textarea
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className={inputClasses}
                                rows={3}
                                autoFocus
                            />
                        ) : (
                            <input
                                type={type}
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className={inputClasses}
                                autoFocus
                            />
                        )}

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className={`p-2 rounded-full hover:bg-green-500/10 text-green-500 transition-colors ${saving ? 'opacity-50' : ''}`}
                                title="Save"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                                title="Cancel"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-between group">
                        <div className={`bg-transparent text-base ${theme === 'dark' ? 'text-gray-200' : 'text-slate-700'}`}>
                            {displayValue}
                        </div>

                        {!readOnly && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ${theme === 'dark' ? 'text-primary-400 hover:bg-primary-500/10' : 'text-primary-600 hover:bg-primary-50'
                                    }`}
                                title="Edit"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                        )}
                        {readOnly && (
                            <span className={`text-xs px-2 py-1 rounded border ${theme === 'dark' ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                                Read-only
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const OrganizationSettingsPage = () => {
    const { user, updateUser } = useAuthStore();
    const { theme } = useTheme();
    const fileInputRef = useRef(null);

    const [fetching, setFetching] = useState(true);
    const [orgData, setOrgData] = useState(null);
    const [error, setError] = useState(null);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    // Fetch Data
    const fetchOrganization = async () => {
        setFetching(true);
        try {
            const response = await organizationService.organizations.getCurrent();
            const data = response.data || response;
            setOrgData(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch organization:", err);
            // Fallback logic could go here if needed, but per request we focus on /tenant/organization
            if (err.response?.status === 500) {
                setError("Server error (500). Please check backend logs.");
            } else {
                setError(err.message || "Failed to load organization profile.");
            }
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchOrganization();
    }, []);

    // Helper: Construct full URL
    const getLogoUrl = (partialUrl) => {
        if (!partialUrl) return null;
        if (partialUrl.startsWith('http') || partialUrl.startsWith('data:')) return partialUrl;
        return `https://api.obsolio.com${partialUrl.startsWith('/') ? '' : '/'}${partialUrl}`;
    };

    const handleUpdateField = async (fieldName, newValue) => {
        if (!orgData) return;

        // Optimistic update for UI speed
        const originalData = { ...orgData };

        // Prepare payload - User requested specific fields support
        // We will send FormData to support the _method: PUT trick if needed, 
        // or just to keep it consistent with the service method.
        const payload = new FormData();

        // Append all existing data to ensure we don't accidentally wipe fields if the backend expects full object
        // However, usually partial updates work best with JSON. 
        // Given the requirement "All Organization Fields Supported", let's send what we have + change.

        // Strategy: Send 'mostly' full payload or just the changed field if backend supports PATCH.
        // The endpoint is PUT, so we should imply FULL replacement or at least extensive partial.

        // Let's populate FormData with current state + new value
        const dataToSubmit = { ...orgData, [fieldName]: newValue };

        // List of fields allowed to be updated
        const allowList = [
            'name', 'short_name', 'industry', 'company_size',
            'country', 'phone', 'timezone', 'description'
        ];

        allowList.forEach(key => {
            if (dataToSubmit[key] !== undefined && dataToSubmit[key] !== null) {
                payload.append(key, dataToSubmit[key]);
            }
        });

        // Handle settings specially - MUST be sent as array/object keys for PHP validation 'array'
        if (dataToSubmit.settings) {
            let settingsObj = dataToSubmit.settings;
            // Parse if valid JSON string
            if (typeof settingsObj === 'string') {
                try { settingsObj = JSON.parse(settingsObj); } catch (e) {
                    console.warn('Could not parse settings', e);
                    settingsObj = {}; // Fallback
                }
            }

            if (typeof settingsObj === 'object' && settingsObj !== null) {
                Object.keys(settingsObj).forEach(sKey => {
                    // Append as settings[key]
                    const val = typeof settingsObj[sKey] === 'object' ? JSON.stringify(settingsObj[sKey]) : settingsObj[sKey];
                    payload.append(`settings[${sKey}]`, val);
                });
            }
        }

        payload.append('_method', 'PUT');

        try {
            // Update local state immediately
            setOrgData(prev => ({ ...prev, [fieldName]: newValue }));

            const response = await organizationService.organizations.updateCurrent(payload);
            const updated = response.data || response;

            // Re-sync with server response
            setOrgData(updated);

            // If name/logo changed, update AuthStore/User Context
            if (fieldName === 'name' || fieldName === 'short_name') {
                const updatedUserTenant = {
                    ...user.tenant,
                    name: updated.name,
                    short_name: updated.short_name
                };
                updateUser({ tenant: updatedUserTenant });
            }

        } catch (err) {
            console.error("Update failed:", err);
            // Revert
            setOrgData(originalData);
            throw err; // Propagate to EditableField to show error toast
        }
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingLogo(true);
        const toastId = toast.loading('Uploading logo...');

        try {
            const payload = new FormData();

            // We must preserve other fields if it's a PUT
            const allowList = [
                'name', 'short_name', 'industry', 'company_size',
                'country', 'phone', 'timezone', 'description'
            ];

            allowList.forEach(key => {
                const value = orgData[key];
                if (value !== undefined && value !== null) {
                    payload.append(key, value);
                }
            });

            // Handle settings specially - MUST be sent as array/object keys for PHP validation 'array'
            if (orgData.settings) {
                let settingsObj = orgData.settings;
                // Parse if valid JSON string
                if (typeof settingsObj === 'string') {
                    try { settingsObj = JSON.parse(settingsObj); } catch (e) {
                        console.warn('Could not parse settings', e);
                        settingsObj = {}; // Fallback
                    }
                }

                if (typeof settingsObj === 'object' && settingsObj !== null) {
                    Object.keys(settingsObj).forEach(sKey => {
                        // Append as settings[key]
                        const val = typeof settingsObj[sKey] === 'object' ? JSON.stringify(settingsObj[sKey]) : settingsObj[sKey];
                        payload.append(`settings[${sKey}]`, val);
                    });
                }
            }

            payload.append('logo', file);
            // Changed from organizationLogo to logo for standard update

            payload.append('_method', 'PUT');

            const response = await organizationService.organizations.updateCurrent(payload);
            const updated = response.data || response;

            setOrgData(updated);

            // Update AuthStore
            const updatedUserTenant = {
                ...user.tenant,
                logo_url: updated.logo_url
            };
            updateUser({ tenant: updatedUserTenant });

            toast.success('Logo updated successfully', { id: toastId });
        } catch (err) {
            console.error("Logo upload failed:", err);
            toast.error('Failed to upload logo', { id: toastId });
        } finally {
            setUploadingLogo(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (fetching) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>Loading organization profile...</p>
                </div>
            </MainLayout>
        );
    }

    if (error && !orgData) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="text-center max-w-md mx-auto p-8 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Failed to load profile</h3>
                        <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
                        <Button onClick={fetchOrganization} variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                            Try Again
                        </Button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="py-8 max-w-5xl mx-auto px-4">
                {/* Header & Logo */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 animate-fade-in-up">
                    <div className="relative group">
                        <div className={`w-32 h-32 rounded-2xl flex items-center justify-center overflow-hidden border-2 transition-all duration-300 ${theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 group-hover:border-primary-500/50'
                            : 'bg-white border-gray-200 group-hover:border-primary-400'
                            } shadow-lg`}>
                            {orgData?.logo_url ? (
                                <img src={getLogoUrl(orgData.logo_url)} alt="Org Logo" className="w-full h-full object-contain p-2" />
                            ) : (
                                <Building2 className={`w-12 h-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                            )}

                            {uploadingLogo && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-3 -right-3 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-transform hover:scale-105 active:scale-95"
                            title="Change Logo"
                        >
                            <Camera className="w-5 h-5" />
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>

                    <div>
                        <h1 className={`text-3xl font-bold font-heading mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {orgData?.name || 'Unnamed Organization'}
                        </h1>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <span className={`px-2.5 py-0.5 rounded-full border ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                                {orgData?.industry || 'Unknown Industry'}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                                {orgData?.company_size || 'Unknown Size'}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full border ${theme === 'dark' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
                                Tenant: {user?.tenant?.subdomain || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <Card className="p-6 overflow-hidden">
                            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                General Information
                            </h2>
                            <div className="space-y-1">
                                <EditableField
                                    label="Organization Name"
                                    name="name"
                                    value={orgData?.name}
                                    onSave={handleUpdateField}
                                />
                                <EditableField
                                    label="Short Name"
                                    name="short_name"
                                    value={orgData?.short_name}
                                    onSave={handleUpdateField}
                                />
                                <EditableField
                                    label="Industry"
                                    name="industry"
                                    value={orgData?.industry}
                                    onSave={handleUpdateField}
                                    type="select"
                                    options={INDUSTRIES}
                                />
                                <EditableField
                                    label="Company Size"
                                    name="company_size"
                                    value={orgData?.company_size}
                                    onSave={handleUpdateField}
                                    type="select"
                                    options={COMPANY_SIZES}
                                />
                                <EditableField
                                    label="Description"
                                    name="description"
                                    value={orgData?.description}
                                    onSave={handleUpdateField}
                                    type="textarea"
                                />
                            </div>
                        </Card>

                        <Card className="p-6 overflow-hidden">
                            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                Contact & Location
                            </h2>
                            <div className="space-y-1">
                                <EditableField
                                    label="Country"
                                    name="country"
                                    value={orgData?.country}
                                    onSave={handleUpdateField}
                                    type="select"
                                    options={COUNTRIES}
                                />
                                <EditableField
                                    label="Timezone"
                                    name="timezone"
                                    value={orgData?.timezone}
                                    onSave={handleUpdateField}
                                    type="select"
                                    options={TIMEZONES}
                                />
                                <EditableField
                                    label="Phone Number"
                                    name="phone"
                                    value={orgData?.phone}
                                    onSave={handleUpdateField}
                                />
                            </div>
                        </Card>
                    </div>

                    {/* System Info Sidebar */}
                    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <Card className="p-6">
                            <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                System Metadata
                            </h2>
                            <div className="space-y-4">
                                <EditableField
                                    label="Organization ID"
                                    name="id"
                                    value={orgData?.id}
                                    onSave={() => { }}
                                    readOnly
                                />
                                <EditableField
                                    label="Tenant ID"
                                    name="tenant_id"
                                    value={orgData?.tenant_id}
                                    onSave={() => { }}
                                    readOnly
                                />
                                <EditableField
                                    label="Created At"
                                    name="created_at"
                                    value={orgData?.created_at ? new Date(orgData.created_at).toLocaleDateString() : undefined}
                                    onSave={() => { }}
                                    readOnly
                                />
                                <EditableField
                                    label="Last Updated"
                                    name="updated_at"
                                    value={orgData?.updated_at ? new Date(orgData.updated_at).toLocaleDateString() : undefined}
                                    onSave={() => { }}
                                    readOnly
                                />
                            </div>
                        </Card>

                        {/* Settings JSON Debug/Viewer */}
                        <Card className="p-6">
                            <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                Advanced Settings
                            </h2>
                            <div className={`p-4 rounded-lg text-xs font-mono overflow-auto max-h-60 ${theme === 'dark' ? 'bg-black/30 text-green-400' : 'bg-slate-100 text-slate-700'}`}>
                                <pre>
                                    {orgData?.settings
                                        ? JSON.stringify(typeof orgData.settings === 'string' ? JSON.parse(orgData.settings) : orgData.settings, null, 2)
                                        : 'undefined'
                                    }
                                </pre>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default OrganizationSettingsPage;
