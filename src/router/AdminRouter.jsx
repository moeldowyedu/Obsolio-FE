import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/Auth/LoginPage';

// Admin Pages
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import TenantsManagement from '../pages/Admin/TenantsManagement';
import TenantsDashboardPage from '../pages/Admin/TenantsDashboardPage';
import SubscriptionsManagement from '../pages/Admin/SubscriptionsManagement';
import AgentsManagementPage from '../pages/Admin/AgentsManagementPage';
import AgentCategoriesPage from '../pages/Admin/AgentCategoriesPage';
import AgentEndpointsPage from '../pages/Admin/AgentEndpointsPage';
import AgentRunsPage from '../pages/Admin/AgentRunsPage';
import ActiveAgentsMonitorPage from '../pages/Admin/ActiveAgentsMonitorPage';
import IntegrationManagementPage from '../pages/Admin/IntegrationManagementPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';
import AnalyticsPage from '../pages/Admin/AnalyticsPage';
import ImpersonationPage from '../pages/Admin/ImpersonationPage';
import AuditLogsPage from '../pages/Admin/AuditLogsPage';
import RBACManagementPage from '../pages/Admin/RBACManagementPage';
import N8nWebhookManagementPage from '../pages/Admin/N8nWebhookManagementPage';
import TenantSettingsPage from '../pages/Settings/TenantSettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

// New Admin Console Management Pages
import ConsoleUsersPage from '../pages/Admin/ConsoleUsersPage';
import OrganizationManagementPage from '../pages/Admin/OrganizationManagementPage';
import ActiveSubscriptionsPage from '../pages/Admin/ActiveSubscriptionsPage';
import SubscriptionPlansPage from '../pages/Admin/SubscriptionPlansPage';

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes - Requiring System Admin */}
            <Route path="/" element={
                <ProtectedRoute requireSystemAdmin>
                    <AdminDashboardPage />
                </ProtectedRoute>
            } />

            {/* Manage Tenants */}
            <Route path="/tenants" element={
                <ProtectedRoute requireSystemAdmin>
                    <TenantsManagement />
                </ProtectedRoute>
            } />

            {/* Tenant Statistics Dashboard */}
            <Route path="/tenants/dashboard" element={
                <ProtectedRoute requireSystemAdmin>
                    <TenantsDashboardPage />
                </ProtectedRoute>
            } />

            {/* Manage Subscriptions */}
            <Route path="/subscriptions" element={
                <ProtectedRoute requireSystemAdmin>
                    <SubscriptionsManagement />
                </ProtectedRoute>
            } />

            {/* Manage Platform Agents - Hierarchical Routes */}
            <Route path="/agent-categories" element={
                <ProtectedRoute requireSystemAdmin>
                    <AgentCategoriesPage />
                </ProtectedRoute>
            } />

            <Route path="/agents" element={
                <ProtectedRoute requireSystemAdmin>
                    <AgentsManagementPage />
                </ProtectedRoute>
            } />

            <Route path="/agent-endpoints" element={
                <ProtectedRoute requireSystemAdmin>
                    <AgentEndpointsPage />
                </ProtectedRoute>
            } />

            <Route path="/agent-runs" element={
                <ProtectedRoute requireSystemAdmin>
                    <AgentRunsPage />
                </ProtectedRoute>
            } />

            <Route path="/active-agents" element={
                <ProtectedRoute requireSystemAdmin>
                    <ActiveAgentsMonitorPage />
                </ProtectedRoute>
            } />

            <Route path="/integrations" element={
                <ProtectedRoute requireSystemAdmin>
                    <IntegrationManagementPage />
                </ProtectedRoute>
            } />

            {/* Analytics & Monitoring */}
            <Route path="/analytics" element={
                <ProtectedRoute requireSystemAdmin>
                    <AnalyticsPage />
                </ProtectedRoute>
            } />

            <Route path="/impersonation" element={
                <ProtectedRoute requireSystemAdmin>
                    <ImpersonationPage />
                </ProtectedRoute>
            } />

            <Route path="/audit-logs" element={
                <ProtectedRoute requireSystemAdmin>
                    <AuditLogsPage />
                </ProtectedRoute>
            } />

            {/* RBAC */}
            <Route path="/rbac" element={
                <ProtectedRoute requireSystemAdmin>
                    <RBACManagementPage />
                </ProtectedRoute>
            } />

            <Route path="/settings" element={
                <ProtectedRoute requireSystemAdmin>
                    <TenantSettingsPage />
                </ProtectedRoute>
            } />

            {/* User & Organization Management */}
            <Route path="/console-users" element={
                <ProtectedRoute requireSystemAdmin>
                    <ConsoleUsersPage />
                </ProtectedRoute>
            } />

            <Route path="/organizations" element={
                <ProtectedRoute requireSystemAdmin>
                    <OrganizationManagementPage />
                </ProtectedRoute>
            } />

            {/* Subscription Management */}
            <Route path="/active-subscriptions" element={
                <ProtectedRoute requireSystemAdmin>
                    <ActiveSubscriptionsPage />
                </ProtectedRoute>
            } />

            <Route path="/subscription-plans" element={
                <ProtectedRoute requireSystemAdmin>
                    <SubscriptionPlansPage />
                </ProtectedRoute>
            } />

            {/* Support legacy routes by redirecting to root or specific pages */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />


            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AdminRouter;
