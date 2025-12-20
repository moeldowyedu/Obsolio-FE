import api from './api';

const tenantLookupService = {
    /**
     * Find tenants associated with an email or identifier
     * @param {string} identifier - Email or phone number
     * @returns {Promise<{success: boolean, tenants: Array<{id: string, name: string, type: string, login_url: string, slug?: string}>}>}
     */
    findTenant: async (identifier) => {
        try {
            const response = await api.post('/auth/lookup-tenant', { identifier });

            // Backend returns { success: true, tenants: [...] }
            // Ensure we handle the response structure correctly

            console.log('🔍 Tenant Lookup API Response:', response.data);

            // Helper to normalize tenant data - backend may return 'subdomain' or 'slug'
            const tenants = response.data.tenants ? response.data.tenants.map(t => {
                // Ensure we have a slug field - try subdomain field first, then slug, then extract from login_url
                if (!t.slug) {
                    if (t.subdomain) {
                        // Backend returns 'subdomain' field
                        t.slug = t.subdomain;
                    } else if (t.login_url && typeof t.login_url === 'string' && t.login_url.trim() !== '') {
                        // Fallback: try to extract from login_url using string parsing
                        try {
                            let urlStr = t.login_url.trim();

                            // Remove protocol (http:// or https://)
                            urlStr = urlStr.replace(/^https?:\/\//, '');

                            // Remove path (everything after the first /)
                            urlStr = urlStr.split('/')[0];

                            // Now we have something like: loogentic10.127.0.0.1:port or loogentic10.localhost or subdomain.domain.com
                            // Split by '.' and check if it's an IP or domain
                            const parts = urlStr.split('.');

                            // If it looks like an IP address (has numeric parts), take the first part as subdomain
                            // Examples: loogentic10.127.0.0.1 -> loogentic10
                            //          subdomain.localhost -> subdomain
                            //          subdomain.obsolio.com -> subdomain
                            if (parts.length >= 2) {
                                t.slug = parts[0];
                            }
                        } catch (e) {
                            console.error("Error parsing login_url for tenant:", t.name, "URL:", t.login_url, "Error:", e);
                        }
                    }
                }

                console.log('📦 Processed tenant:', { name: t.name, slug: t.slug, subdomain: t.subdomain, login_url: t.login_url });
                return t;
            }) : [];

            return { ...response.data, tenants };

        } catch (error) {
            console.error("Tenant lookup failed", error);

            // If 404 or 400, return success: false with message
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                return { success: false, message: error.response.data.message || 'No account found.' };
            }
            throw error;
        }
    }
};

export default tenantLookupService;
