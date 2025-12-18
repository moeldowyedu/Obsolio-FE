import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { organizationService, tenantService } from '../../services';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import {
    Building2, Save, Upload, AlertCircle, CheckCircle,
    LayoutDashboard, MapPin, Phone, Globe, Briefcase, FileText
} from 'lucide-react';

const OrganizationSettingsPage = () => {
    const { user, updateUser } = useAuthStore();
    const fileInputRef = useRef(null);
    const [orgId, setOrgId] = useState(null);
    const [useTenantServiceForUpdate, setUseTenantServiceForUpdate] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

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

    const tabs = [
        { id: 'general', label: 'General Info', icon: LayoutDashboard },
        { id: 'branding', label: 'Branding', icon: Building2 },
        { id: 'contact', label: 'Contact & Location', icon: MapPin },
        { id: 'details', label: 'Company Profile', icon: Briefcase },
    ];

    useEffect(() => {
        const fetchOrganizationData = async () => {
            try {
                setFetching(true);
                // 1. Try Organization Service
                const response = await organizationService.organizations.list();
                const orgs = Array.isArray(response) ? response : (response.data || []);

                if (orgs.length > 0) {
                    const org = orgs[0];
                    console.log('🏢 Fetched Organization:', org);
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
                console.warn('⚠️ Organization API failed, attempting Tenant API fallback:', err.message);

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
                        console.log('✅ Found Tenant Match via getTenants:', match);
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
                    console.error('❌ All fetch strategies failed:', fallbackErr);

                    // 3. Final Fallback to Cached Session Data
                    if (user.tenant) {
                        console.log('⚠️ Using cached session data as final fallback');
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
                    console.log('📝 Attempting Update via Tenant Service...');
                    response = await tenantService.updateTenant(orgId, payload);
                } else {
                    console.log('📝 Attempting Update via Organization Service...');
                    response = await organizationService.organizations.update(orgId, payload);
                }
            } catch (initialErr) {
                // FALLBACK STRATEGY: If tenant service fails (e.g. 500), try org service
                if (useTenantServiceForUpdate) {
                    console.warn('⚠️ Tenant Service update failed. Retrying with Organization Service...', initialErr);
                    response = await organizationService.organizations.update(orgId, payload);
                } else {
                    throw initialErr;
                }
            }

            const updatedData = response.data || response;

            // Update local store
            const updatedUserTenant = {
                ...user.tenant,
                name: updatedData.name || updatedData.organization_full_name || formData.organization_full_name,
                short_name: updatedData.short_name || updatedData.organization_short_name || formData.organization_short_name,
                logo_url: updatedData.logo_url || updatedData.organizationLogo || updatedData.logo || user.tenant?.logo_url
            };

            updateUser({ tenant: updatedUserTenant });
            setSuccess('Organization settings updated successfully!');

        } catch (err) {
            console.error('Update failed:', err);
            setError(err.response?.data?.message || 'Failed to update settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Organization Name"
                                name="organization_full_name"
                                value={formData.organization_full_name}
                                onChange={handleChange}
                                placeholder="e.g. Acme Corporation"
                                required
                                fullWidth
                            />
                            <Input
                                label="Short Name (Slug)"
                                name="organization_short_name"
                                value={formData.organization_short_name}
                                onChange={handleChange}
                                placeholder="e.g. Acme"
                                helperText="Used in URLs and concise views."
                                fullWidth
                            />
                        </div>
                    </div>
                );
            case 'branding':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="border border-white/5 rounded-2xl p-6 bg-white/5">
                            <label className="block text-sm font-medium text-gray-300 mb-4">Organization Logo</label>
                            <div className="flex flex-col items-center sm:flex-row gap-8">
                                <div className="w-32 h-32 rounded-full bg-black/20 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden relative group">
                                    {formData.logo_preview ? (
                                        <img
                                            src={formData.logo_preview}
                                            alt="Logo Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Building2 className="w-12 h-12 text-gray-600" />
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={triggerFileInput}>
                                        <Upload className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-3 text-center sm:text-left">
                                    <Button variant="outline" onClick={triggerFileInput} type="button">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Logo
                                    </Button>
                                    <p className="text-xs text-gray-500 max-w-xs">
                                        Support for PNG, JPG or SVG. Max 5MB.<br />Recommended size: 512x512px.
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                icon={<Phone className="w-4 h-4" />}
                                fullWidth
                            />
                            <Input
                                label="Country / Region"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="e.g. United States"
                                icon={<Globe className="w-4 h-4" />}
                                fullWidth
                            />
                            <Input
                                label="Timezone"
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                                placeholder="e.g. UTC-5 (EST)"
                                fullWidth
                            />
                        </div>
                    </div>
                );
            case 'details':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                placeholder="e.g. Software, Healthcare"
                                fullWidth
                            />
                            <Input
                                label="Company Size"
                                name="company_size"
                                value={formData.company_size}
                                onChange={handleChange}
                                placeholder="e.g. 50-200 employees"
                                fullWidth
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none"
                                placeholder="Tell us about your organization's mission and values..."
                            />
                            <p className="text-xs text-gray-500 text-right">0/500 characters</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (fetching) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-[calc(100vh-100px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Organization Settings</h1>
                        <p className="text-gray-400 mt-1">Manage your workspace presence and configuration.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => window.history.back()} type="button">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} loading={loading} disabled={loading} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-900/20">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Notifications */}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 animate-slideIn">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3 text-green-400 animate-slideIn">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="font-medium">{success}</p>
                    </div>
                )}

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1 space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                                    {tab.label}
                                </button>
                            );
                        })}

                        {/* Summary Card */}
                        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/5 hidden lg:block">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold text-white">
                                    {formData.organization_full_name.charAt(0) || 'O'}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-medium text-white truncate">{formData.organization_full_name || 'Organization'}</p>
                                    <p className="text-xs text-gray-500 truncate">{orgId}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className={`w-2 h-2 rounded-full ${user.tenant?.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                {user.tenant?.status || 'Active'} Workspace
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="lg:col-span-3">
                        <Card className="p-0 overflow-hidden border-white/10 bg-gray-900/50 backdrop-blur-sm">
                            <div className="p-6 sm:p-8 min-h-[400px]">
                                <div className="mb-6 pb-6 border-b border-white/5">
                                    <h2 className="text-xl font-semibold text-white">
                                        {tabs.find(t => t.id === activeTab)?.label}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Update your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} details.
                                    </p>
                                </div>
                                {renderTabContent()}
                            </div>
                            {/* Footer for Form */}
                            <div className="bg-black/20 p-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 px-8">
                                <span>All changes are saved to the secure cloud.</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default OrganizationSettingsPage;
