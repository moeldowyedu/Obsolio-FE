import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import tenantService from '../../services/tenantService';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { Building2, Save, Upload, AlertCircle, CheckCircle } from 'lucide-react';

const OrganizationSettingsPage = () => {
    const { user, updateUser } = useAuthStore();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        organization_full_name: '',
        organization_short_name: '',
        logo: null,
        logo_preview: null
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchTenantData = async () => {
            if (!user?.tenant_id) return;

            try {
                setFetching(true);
                // We can use the user.tenant data initially, but fetching fresh is safer
                const response = await tenantService.getTenant(user.tenant_id);
                const tenant = response.data || response;

                setFormData({
                    organization_full_name: tenant.organization_full_name || tenant.name || '',
                    organization_short_name: tenant.organization_short_name || tenant.short_name || '',
                    logo: null, // File matches cannot be prefilled
                    logo_preview: tenant.organizationLogo || tenant.logo_url || tenant.logo // Use existing logo as preview
                });
            } catch (err) {
                console.error('Failed to fetch tenant details:', err);
                setError('Failed to load organization details.');
            } finally {
                setFetching(false);
            }
        };

        fetchTenantData();
    }, [user?.tenant_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear alerts on change
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

        try {
            const payload = new FormData();
            // Primary keys as per recent spec
            payload.append('organizationName', formData.organization_full_name);
            payload.append('organizationShortName', formData.organization_short_name);

            // Legacy/Fallback keys to ensure backend saves it regardless of controller logic
            payload.append('name', formData.organization_full_name);
            payload.append('organization_full_name', formData.organization_full_name);
            payload.append('short_name', formData.organization_short_name);
            payload.append('organization_short_name', formData.organization_short_name);

            payload.append('_method', 'PUT'); // Explicitly add for Laravel

            if (formData.logo) {
                payload.append('organizationLogo', formData.logo);
            }

            const response = await tenantService.updateTenant(user.tenant_id, payload);
            const updatedTenant = response.data || response; // Unwrap if needed

            // Update local store to reflect changes immediately in Sidebar
            const updatedUserTenant = {
                ...user.tenant,
                ...updatedTenant,
                // Ensure logo_url is picked up if returned, handling various casing/formats
                logo_url: updatedTenant.organizationLogo || updatedTenant.logo_url || updatedTenant.logo
            };

            updateUser({ tenant: updatedUserTenant });

            setSuccess('Organization settings updated successfully!');
        } catch (err) {
            console.error('Update failed:', err);
            setError(err.response?.data?.message || 'Failed to update settings.');
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (fetching) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-[calc(100vh-100px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Organization Settings</h1>
                    <p className="text-gray-400">Manage your organization's branding and details.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3 text-green-400">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Card className="space-y-8 p-8">
                        {/* Logo Section */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-300">Organization Logo</label>
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative group">
                                    {formData.logo_preview ? (
                                        <img
                                            src={formData.logo_preview}
                                            alt="Logo Preview"
                                            className="w-full h-full object-contain p-2"
                                        />
                                    ) : (
                                        <Building2 className="w-10 h-10 text-gray-500" />
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={triggerFileInput}>
                                        <Upload className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Button variant="secondary" onClick={triggerFileInput} size="sm" type="button">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload New Logo
                                    </Button>
                                    <p className="text-xs text-gray-500">
                                        Recommended size: 512x512px. <br /> Supported formats: PNG, JPG, SVG.
                                    </p>
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
                                label="Values Short Name"
                                name="organization_short_name"
                                value={formData.organization_short_name}
                                onChange={handleChange}
                                placeholder="e.g. Acme"
                                helperText="Used in sidebars and compact views."
                                fullWidth
                            />
                        </div>

                        <div className="pt-4 border-t border-white/5 flex justify-end">
                            <Button type="submit" loading={loading} disabled={loading} size="lg">
                                <Save className="w-5 h-5 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </MainLayout>
    );
};

export default OrganizationSettingsPage;
