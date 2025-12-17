import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTenantStore } from '../../store/tenantStore';
import tenantService from '../../services/tenantService';
import { getSubdomain } from '../../utils/subdomain';
import { Loader } from 'lucide-react';

const TenantGuard = ({ children }) => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthStore();
    const { currentTenant, setTenant } = useTenantStore();
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('checking'); // checking, active, inactive, unauthorized, notfound

    useEffect(() => {
        const checkTenantAccess = async () => {
            const subdomain = getSubdomain();

            if (!subdomain) {
                // Should not happen if routed correctly, but safe guard
                setIsLoading(false);
                return;
            }

            try {
                // 1. Resolve Tenant Public Info
                // We need an endpoint that returns { id, name, status, requires_verification }
                const publicInfo = await tenantService.getPublicTenantInfo(subdomain);

                if (!publicInfo) {
                    setStatus('notfound');
                    setIsLoading(false);
                    return;
                }

                // 2. Check Verification Status
                if (publicInfo.status === 'pending_verification' || publicInfo.requires_verification) {
                    // Just set status to inactive, do NOT redirect to a path that triggers this same guard
                    setStatus('inactive');
                    setIsLoading(false);
                    return;
                }

                // 3. Set Tenant in Store
                setTenant(publicInfo);

                // 4. Check Authentication & Membership
                if (!isAuthenticated || !user) {
                    // Redirect to login, preserving intent
                    // We use window.location to force full reload if needed, but navigate is better for SPA
                    // But strictly, we want them to login *on this domain*? Yes.
                    // The Login page handles the subdomains.
                    setStatus('active'); // Allow rendering, but the ProtectedRoute inside might catch it?
                    // Actually TenantRouter wraps everything in specific routes. 
                    // But we want to enforce: You must be logged in to see *anything* except public pages?
                    // TenantRouter has public routes like Login. We should allow those.
                    setIsLoading(false);
                    return;
                }

                // 5. Strict Membership Check
                // If logged in, does the user belong to this tenant?
                // The backend user object should have `tenant_id` or `tenants` array.
                // Assuming single-tenant user model based on prompt ("user related to that tenant")
                if (user.tenant_id !== publicInfo.id) {
                    // Check if it's in their allowed tenants list if multi-tenant
                    // If strict mismatch:
                    console.warn(`🔒 Access Denied: User tenant ${user.tenant_id} != Current tenant ${publicInfo.id}`);
                    setStatus('unauthorized');
                } else {
                    setStatus('active');
                }

            } catch (error) {
                console.error('Tenant Guard Error:', error);
                setStatus('notfound'); // Assume 404 or network error implies problem
            } finally {
                setIsLoading(false);
            }
        };

        checkTenantAccess();
    }, [isAuthenticated, user, setTenant]);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0B0E14]">
                <Loader className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (status === 'inactive') {
        // We can redirect or render the component
        // Since we are inside Router, we can redirect to a special route or just return the component
        // To be strict, let's redirect to a dedicated public route handled by PublicRouter? 
        // No, PublicRouter is for www. 
        // We need a route inside TenantRouter that is "Public" (like Login)
        // BUT if the workspace is incomplete, we shouldn't even show Login.

        // Dynamic Import to avoid circular deps if needed, or just standard import
        const WorkspaceIncompletePage = React.lazy(() => import('../../pages/Public/WorkspaceIncompletePage'));
        return (
            <React.Suspense fallback={<div />}>
                <WorkspaceIncompletePage />
            </React.Suspense>
        );
    }

    if (status === 'notfound') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0E14] text-white">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p>Workspace not found.</p>
                <a href="https://obsolio.com" className="mt-4 text-primary-400 hover:text-primary-300">Go Home</a>
            </div>
        );
    }

    if (status === 'unauthorized') {
        // User logged in but wrong tenant
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0E14] text-white p-4 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                <p className="text-gray-400 mb-6">You are logged in, but you do not have access to this workspace.</p>
                <div className="flex gap-4">
                    <button onClick={() => navigate('/login')} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">
                        Switch Account
                    </button>
                    <a href="https://obsolio.com" className="px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-500">
                        Go Home
                    </a>
                </div>
            </div>
        );
    }

    // Pass through if active (Login check handled by nested ProtectedRoute or route itself)
    return children;
};

import { ShieldAlert } from 'lucide-react';

export default TenantGuard;
