import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import api from '../services/api';

export const useImpersonation = () => {
    const [isImpersonating, setIsImpersonating] = useState(() => {
        return localStorage.getItem('is_impersonating') === 'true';
    });

    const { user } = useAuthStore();

    /**
     * Start impersonating a tenant
     * @param {string} tenantId - The ID of the tenant to impersonate
     * @param {string} tenantSubdomain - The subdomain of the tenant
     */
    const startImpersonation = useCallback(async (tenantId, tenantSubdomain) => {
        try {
            // 1. Call backend to get impersonation token/permission
            // For now, we simulate this or rely on System Admin JWT having super powers
            // const response = await api.post(`/admin/impersonate/${tenantId}`);

            // Mock API call
            console.log(`Mock impersonating tenant ${tenantId}`);
            await new Promise(resolve => setTimeout(resolve, 500));

            // 2. Set local storage flag
            localStorage.setItem('is_impersonating', 'true');
            localStorage.setItem('impersonated_tenant_id', tenantId);

            // 3. Redirect to Tenant Subdomain
            const protocol = window.location.protocol;
            const appDomain = import.meta.env.VITE_APP_DOMAIN || 'localhost:5173';

            let targetHost;
            if (appDomain.includes('localhost')) {
                // If using localhost subdomain routing (e.g. tenant.localhost:5173)
                targetHost = `${tenantSubdomain}.localhost:5173`;

                // If localhost doesn't support subdomains easily without /etc/hosts, 
                // we might just keep same host but rely on localStorage flag.
                // For safety in this mock environment, let's NOT change host if it breaks things.
                // But sticking to original logic:
                if (window.location.hostname === 'localhost') {
                    // We are on localhost, maybe just reload?
                    // Or try specifically constructs.
                    // Let's just assume we reload for now to simulate the "switch"
                    targetHost = window.location.host;
                }
            } else {
                targetHost = `${tenantSubdomain}.${appDomain}`;
            }

            const targetUrl = `${protocol}//${targetHost}/dashboard?impersonating=true&console_session=active`;

            toast.success(`Impersonating tenant: ${tenantSubdomain}`);
            window.location.href = targetUrl;

        } catch (error) {
            console.error('Impersonation failed:', error);
            toast.error('Failed to start impersonation session');
        }
    }, []);

    /**
     * Stop impersonating and return to Admin Dashboard
     */
    const stopImpersonation = useCallback(() => {
        try {
            // 1. Clear flags
            localStorage.removeItem('is_impersonating');
            localStorage.removeItem('impersonated_tenant_id');
            setIsImpersonating(false);

            // 2. Redirect back to Admin Domain
            const protocol = window.location.protocol;
            const appDomain = import.meta.env.VITE_APP_DOMAIN || 'localhost:5173';
            // Construct admin/console domain
            const targetUrl = `${protocol}//console.${appDomain}/godfather/dashboard`;

            window.location.href = targetUrl;

        } catch (error) {
            console.error('Failed to stop impersonation', error);
        }
    }, []);

    return {
        isImpersonating,
        startImpersonation,
        stopImpersonation
    };
};
