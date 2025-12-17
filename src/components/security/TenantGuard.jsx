import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantService } from '../../services/tenantService';

/**
 * TenantGuard - Protects tenant routes and verifies tenant access
 * 
 * Flow:
 * 1. Resolve tenant by subdomain (public endpoint, no auth required)
 * 2. Check tenant verification status
 * 3. If verified, check user authentication
 * 4. Verify user has access to this tenant
 * 5. Allow access or show appropriate error page
 */
const TenantGuard = ({ children, subdomain }) => {
    const [loading, setLoading] = useState(true);
    const [tenant, setTenant] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyTenantAccess = async () => {
            try {
                console.log('🔐 TenantGuard: Verifying access for subdomain:', subdomain);

                // Step 1: Resolve tenant by subdomain (public endpoint)
                console.log('📡 Fetching tenant info...');

                // ⚠️ CRITICAL FIX: Ensure tenantService.findBySubdomain is a function
                if (!tenantService || typeof tenantService.findBySubdomain !== 'function') {
                    throw new Error('tenantService.findBySubdomain is not available');
                }

                const tenantData = await tenantService.findBySubdomain(subdomain);

                console.log('✅ Tenant found:', tenantData);
                setTenant(tenantData);

                // Step 2: Check verification status
                if (tenantData.requires_verification) {
                    console.log('⚠️ Tenant requires verification');
                    // Show "Workspace Incomplete" page
                    navigate('/workspace-incomplete', {
                        state: {
                            tenant: tenantData,
                            subdomain: subdomain
                        },
                        replace: true
                    });
                    return;
                }

                // Step 3: Check user authentication
                const user = JSON.parse(localStorage.getItem('user') || 'null');
                const token = localStorage.getItem('token');

                if (!user || !token) {
                    console.log('🔓 User not authenticated, showing login');
                    // User not authenticated - show tenant login page
                    setLoading(false);
                    return;
                }

                // Step 4: Verify user has access to this tenant
                console.log('👤 Checking user tenant access...');
                console.log('User tenant_id:', user.tenant_id);
                console.log('Current tenant_id:', tenantData.id);

                if (user.tenant_id !== tenantData.id) {
                    console.error('❌ User does not belong to this tenant');
                    setError({
                        type: 'access_denied',
                        message: 'You do not have access to this workspace',
                        tenantName: tenantData.name
                    });
                    setLoading(false);
                    return;
                }

                // Step 5: All checks passed
                console.log('✅ Access granted');
                setLoading(false);

            } catch (err) {
                console.error('❌ Tenant Guard Error:', err);

                // Handle different error types
                if (err.response?.status === 404) {
                    setError({
                        type: 'not_found',
                        message: 'Workspace not found',
                        subdomain: subdomain
                    });
                } else if (err.response?.status === 403) {
                    setError({
                        type: 'forbidden',
                        message: 'Access denied to this workspace'
                    });
                } else {
                    setError({
                        type: 'error',
                        message: err.message || 'Failed to verify workspace access',
                        details: err.toString()
                    });
                }

                setLoading(false);
            }
        };

        if (subdomain) {
            verifyTenantAccess();
        } else {
            setError({
                type: 'invalid',
                message: 'Invalid workspace URL'
            });
            setLoading(false);
        }
    }, [subdomain, navigate]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying workspace access...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        {error.type === 'not_found' && 'Workspace Not Found'}
                        {error.type === 'access_denied' && 'Access Denied'}
                        {error.type === 'forbidden' && 'Access Forbidden'}
                        {error.type === 'invalid' && 'Invalid Workspace'}
                        {error.type === 'error' && 'Error'}
                    </h2>

                    <p className="mt-2 text-gray-600">
                        {error.message}
                    </p>

                    {error.subdomain && (
                        <p className="mt-2 text-sm text-gray-500">
                            Subdomain: <code className="bg-gray-100 px-2 py-1 rounded">{error.subdomain}</code>
                        </p>
                    )}

                    {error.tenantName && (
                        <p className="mt-2 text-sm text-gray-500">
                            Workspace: {error.tenantName}
                        </p>
                    )}

                    {error.details && (
                        <details className="mt-4 text-left">
                            <summary className="cursor-pointer text-sm text-gray-500">Technical Details</summary>
                            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                                {error.details}
                            </pre>
                        </details>
                    )}

                    <div className="mt-6">
                        <button
                            onClick={() => window.location.href = 'https://obsolio.com'}
                            className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            Go to Homepage
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Success - render children (protected routes)
    return children;
};

export default TenantGuard;