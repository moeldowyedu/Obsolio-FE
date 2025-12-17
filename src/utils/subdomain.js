/**
 * Utility functions for handling subdomains
 */

// Get the main domain from environment or default to localhost
const APP_DOMAIN = import.meta.env.VITE_APP_DOMAIN || 'localhost:5173';

/**
 * Extracts the subdomain from the current window location
 * @returns {string|null} The subdomain or null if no subdomain (bare domain)
 */
/**
 * Extracts the subdomain from the current window location
 * @returns {string|null} The subdomain or null if no subdomain (bare domain)
 */
export const getSubdomain = () => {
    const hostname = window.location.hostname;

    // Handle localhost development
    if (hostname.includes('localhost')) {
        // For localhost, we expect format: subdomain.localhost
        const parts = hostname.split('.');
        // if parts.length is 1 (localhost), no subdomain
        // if parts.length is 2 (subdomain.localhost), return parts[0]
        if (parts.length >= 2 && parts[0] !== 'www') {
            return parts[0];
        }
        return null; // bare localhost
    }

    // Handle production domain
    // Expected format: subdomain.domain.com
    // Use the configured APP_DOMAIN to strip it out
    const domainParts = APP_DOMAIN.split(':')[0]; // remove port

    if (hostname === domainParts || hostname === `www.${domainParts}`) {
        return null;
    }

    if (hostname.endsWith(domainParts)) {
        // e.g. console.obsolio.com -> replace .obsolio.com -> console
        const subdomainPart = hostname.replace(`.${domainParts}`, '');
        if (subdomainPart && subdomainPart !== 'www') {
            return subdomainPart;
        }
    }

    // Fallback: If we didn't match APP_DOMAIN (e.g. env var missing/mismatch),
    // but the hostname starts with "console.", treat it as console subdomain.
    if (hostname.startsWith('console.')) {
        return 'console';
    }

    return null;
};

/**
 * Checks if the current subdomain is the system admin subdomain
 * @returns {boolean}
 */
export const isSystemAdminDomain = () => {
    const subdomain = getSubdomain();
    return subdomain === 'console'; // Strictly 'console'
};

/**
 * Checks if the current subdomain is a tenant subdomain
 * @returns {boolean}
 */
export const isTenantDomain = () => {
    const subdomain = getSubdomain();
    const reserved = ['console', 'www', 'api', 'precision'];
    return subdomain !== null && !reserved.includes(subdomain);
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

    // Handle bare domain request (subdomain is null or empty)
    if (!subdomain) {
        // Clean up APP_DOMAIN to remove port if it's already in window.location.port logic, 
        // but usually APP_DOMAIN env var might not have port. 
        // Let's assume APP_DOMAIN in env might be "obsolio.com" or "localhost"
        // If we are on localhost, struct should be localhost

        // Safer approach: use parts of current hostname
        const currentHost = window.location.hostname;
        let baseDomain = currentHost;

        if (currentHost.includes('localhost')) {
            baseDomain = 'localhost';
        } else {
            // production logic simplified: take last two parts or use Env
            const parts = currentHost.split('.');
            if (parts.length > 2) {
                baseDomain = parts.slice(-2).join('.');
            }
        }

        return `${protocol}//${baseDomain}${port}${path}`;
    }

    // Handle localhost
    if (APP_DOMAIN.includes('localhost')) {
        return `${protocol}//${subdomain}.localhost${port}${path}`;
    }

    // Handle production
    // Strip port from APP_DOMAIN if present, though usually it shouldn't be there for prod
    const cleanAppDomain = APP_DOMAIN.split(':')[0];
    return `${protocol}//${subdomain}.${cleanAppDomain}${port}${path}`;
};
