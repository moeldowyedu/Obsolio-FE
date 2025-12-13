import { useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useTenantStore } from '../store/tenantStore'

const ProtectedRoute = ({ children, requireAdmin = false, requireSystemAdmin = false }) => {
  const { isAuthenticated, user } = useAuthStore()
  const { tenants, fetchTenants, isLoading: isTenantLoading } = useTenantStore()
  const location = useLocation()
  const fetchedRef = useRef(false)

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

  if (requireSystemAdmin && !user?.is_system_admin) {
    return <Navigate to="/dashboard" replace />;
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
