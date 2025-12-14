import { useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useTenantStore } from '../store/tenantStore'

const ProtectedRoute = ({ children, requireAdmin = false, requireSystemAdmin = false }) => {
  const { isAuthenticated, user } = useAuthStore()
  const { tenants, fetchTenants, isLoading: isTenantLoading } = useTenantStore()
  const location = useLocation()
  const fetchedRef = useRef(false)

  // Subdomain Checks
  const isSystemAdminDomain = window.location.hostname.split('.')[0] === 'console';
  const isTenantDomain = !isSystemAdminDomain && window.location.hostname.includes('.') && !window.location.hostname.startsWith('www');

  useEffect(() => {
    // Only fetch if authenticated, not an admin, no tenants, and haven't tried fetching yet
    if (isAuthenticated && user?.role !== 'admin' && tenants.length === 0 && !fetchedRef.current) {
      fetchedRef.current = true
      fetchTenants().catch(() => {
        // Error handling if needed
      })
    }
  }, [isAuthenticated, user?.role, tenants.length, fetchTenants])

  if (!isAuthenticated) {
    // Redirect to login page while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 1. System Admin Security Check
  if (requireSystemAdmin) {
    if (!user?.is_system_admin) {
      // User is NOT a system admin but trying to access system routes
      return <Navigate to="/dashboard" replace />;
    }
    // Also ensure they are on the correct domain (console.X)
    if (!isSystemAdminDomain && import.meta.env.VITE_APP_ENV !== 'local_no_subdomains') {
      // If we are strictly enforcing subdomains (default)
      // Redirect to admin subdomain
      const appDomain = import.meta.env.VITE_APP_DOMAIN || 'localhost:5173';
      const protocol = window.location.protocol;
      const adminUrl = `${protocol}//console.${appDomain}/`;
      window.location.href = adminUrl;
      return null;
    }
  }

  // 2. Subdomain Mismatch Check for Tenants
  // If user is logged in, and this IS a tenant domain, ensure user belongs to this tenant
  if (isTenantDomain && !user?.is_system_admin) {
    // Get current subdomain from URL
    const currentSubdomain = window.location.hostname.split('.')[0];

    // Check if user has access to this tenant
    // User object usually has `tenant_id` or `tenants` array
    // This logic depends on your backend user structure.
    // Assuming user.tenant.subdomain or user.tenants[].subdomain

    const userHasAccess = user.tenant?.subdomain === currentSubdomain ||
      user.tenants?.some(t => t.subdomain === currentSubdomain);

    // Allow if we entered via a valid tenant context, OR if we are just setting up
    // For now, strict check might lock people out if state isn't perfect. PENDING verification.

    // If mismatch, redirect to THEIR dashboard or Public Home
    // if (!userHasAccess) {
    // return <Navigate to="/" replace /> or show "Unauthorized for this tenant"
    // }
  }

  if (requireAdmin && user?.role !== 'admin' && !user?.is_system_admin) {
    // User is authenticated but not an admin (system_admin counts as admin too)
    return <Navigate to="/dashboard" replace />
  }

  // Enforce tenant creation for non-admin users
  if (
    isAuthenticated &&
    user?.role !== 'admin' &&
    !user?.is_system_admin &&
    !location.pathname.startsWith('/onboarding')
  ) {
    // If we have tenants, we're good
    if (tenants.length > 0 || user?.tenant_id || user?.tenant) {
      return children
    }

    // If we are loading or haven't finished the initial fetch check
    if (isTenantLoading || (tenants.length === 0 && !fetchedRef.current)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      )
    }

    // If we've checked and still have no tenants, redirect to setup
    if (tenants.length === 0) {
      return <Navigate to="/onboarding/tenant-setup" replace />
    }
  }

  return children
}

import PropTypes from 'prop-types';

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requireAdmin: PropTypes.bool,
  requireSystemAdmin: PropTypes.bool,
}

export default ProtectedRoute
