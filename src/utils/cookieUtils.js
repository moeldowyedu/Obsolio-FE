/**
 * Cookie utility functions for cross-domain authentication
 * Stores auth tokens in cookies accessible across all subdomains
 */

/**
 * Get the root domain for cookie sharing
 * Returns '.localhost' for dev or '.obsolio.com' for production
 */
const getRootDomain = () => {
    const hostname = window.location.hostname;

    // Development: localhost
    if (hostname.includes('localhost') || hostname === '127.0.0.1') {
        return 'localhost'; // Note: Cannot use .localhost in modern browsers
    }

    // Production: extract root domain (e.g., obsolio.com from tenant.obsolio.com)
    const parts = hostname.split('.');
    if (parts.length >= 2) {
        return `.${parts.slice(-2).join('.')}`;
    }

    return hostname;
};

/**
 * Set a cookie with proper domain and security settings
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration in days (default: 7)
 */
export const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    const domain = getRootDomain();
    const domainAttr = domain.startsWith('.') ? `domain=${domain};` : `domain=.${domain};`;

    // For localhost, we can't use domain attribute in some browsers
    const cookieString = window.location.hostname.includes('localhost')
        ? `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
        : `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; ${domainAttr} SameSite=Lax`;

    document.cookie = cookieString;
    console.log('🍪 Set cookie:', name, 'on domain:', domain);
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export const getCookie = (name) => {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }

    return null;
};

/**
 * Delete a cookie from both current domain and root domain
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
    const domain = getRootDomain();

    // Delete from current domain (no domain attribute)
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Delete from root domain (with domain attribute)
    if (!window.location.hostname.includes('localhost')) {
        const domainAttr = domain.startsWith('.') ? `domain=${domain};` : `domain=.${domain};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${domainAttr}`;
    }

    console.log('🍪 Deleted cookie:', name, 'from domain:', domain);
};

/**
 * Delete all authentication-related cookies
 * Ensures complete logout across all domains
 */
export const deleteAllAuthCookies = () => {
    const authCookies = [
        'obsolio_auth_token',
        'obsolio_user',
        'auth_token',
        'user',
        'current_tenant_id',
        'XSRF-TOKEN',
        'laravel_session'
    ];

    authCookies.forEach(cookieName => {
        deleteCookie(cookieName);
    });

    console.log('🍪 Cleared all auth cookies');
};

/**
 * Check if a cookie exists
 * @param {string} name - Cookie name
 * @returns {boolean}
 */
export const hasCookie = (name) => {
    return getCookie(name) !== null;
};

