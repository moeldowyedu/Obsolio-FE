/**
 * Utility functions for handling subdomains
 */

// Get the main domain from environment or default to localhost
const APP_DOMAIN = import.meta.env.VITE_APP_DOMAIN || 'localhost';

/**
 * Extracts the subdomain from the current window location
 * @returns {string|null} The subdomain or null if no subdomain (bare domain)
 */
export const getSubdomain = () => {
    const hostname = window.location.hostname;

    // Handle localhost development
    if (hostname.includes('localhost') || hostname === '127.0.0.1') {
        const parts = hostname.split('.');
        // localhost or 127.0.0.1 = no subdomain
        // subdomain.localhost = has subdomain
        if (parts.length >= 2 && parts[0] !== 'www') {
            return parts[0];
        }
        return null;
    }

    // Handle production domain
    const domainParts = APP_DOMAIN.split(':')[0]; // remove port if exists

    // Exact match or www variant = no subdomain (public domain)
    if (hostname === domainParts || hostname === `www.${domainParts}`) {
        return null;
    }

    // Check if hostname ends with our domain
    if (hostname.endsWith(`.${domainParts}`)) {
        // Extract subdomain part
        const subdomainPart = hostname.replace(`.${domainParts}`, '');
        if (subdomainPart && subdomainPart !== 'www') {
            return subdomainPart;
        }
    }

    // Fallback for special subdomains
    if (hostname.startsWith('console.') || hostname.startsWith('api.')) {
        return hostname.split('.')[0];
    }

    return null;
};

/**
 * Checks if the current subdomain is the system admin subdomain
 * @returns {boolean}
 */
export const isSystemAdminDomain = () => {
    const subdomain = getSubdomain();
    return subdomain === 'console';
};

/**
 * Checks if the current subdomain is a tenant subdomain
 * @returns {boolean}
 */
export const isTenantDomain = () => {
    const subdomain = getSubdomain();

    // No subdomain = public domain
    if (!subdomain) {
        return false;
    }

    // Reserved subdomains (not tenants)
    const reserved = ['console', 'www', 'api', 'precision'];

    // If subdomain exists and is NOT in reserved list = tenant subdomain
    return !reserved.includes(subdomain);
};

/**
 * Checks if the current domain is the public landing page domain
 * @returns {boolean}
 */
export const isPublicDomain = () => {
    const subdomain = getSubdomain();
    return subdomain === null || subdomain === 'www';
};

/**
 * Get the full URL for a specific subdomain
 * @param {string} subdomain - The subdomain to construct URL for
 * @param {string} path - Optional path to append
 * @returns {string} Full URL
 */
export const getSubdomainUrl = (subdomain, path = '') => {
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : '';

    // Handle bare domain request (no subdomain)
    if (!subdomain) {
        const currentHost = window.location.hostname;
        let baseDomain = currentHost;

        if (currentHost.includes('localhost') || currentHost === '127.0.0.1') {
            baseDomain = 'localhost';
        } else {
            const parts = currentHost.split('.');
            if (parts.length > 2) {
                baseDomain = parts.slice(-2).join('.');
            }
        }

        return `${protocol}//${baseDomain}${port}${path}`;
    }

    // Handle localhost
    if (APP_DOMAIN.includes('localhost') || APP_DOMAIN === '127.0.0.1') {
        return `${protocol}//${subdomain}.localhost${port}${path}`;
    }

    // Handle production
    const cleanAppDomain = APP_DOMAIN.split(':')[0];
    return `${protocol}//${subdomain}.${cleanAppDomain}${port}${path}`;
};
