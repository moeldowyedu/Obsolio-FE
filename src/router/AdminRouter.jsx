import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/Auth/LoginPage';

// Admin Pages
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import TenantsManagementPage from '../pages/Admin/TenantsManagementPage';
import EngineManagementPage from '../pages/Admin/EngineManagementPage';
import AgentsManagementPage from '../pages/Admin/AgentsManagementPage';
import ActiveAgentsMonitorPage from '../pages/Admin/ActiveAgentsMonitorPage';
import IntegrationManagementPage from '../pages/Admin/IntegrationManagementPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';
import AnalyticsPage from '../pages/Admin/AnalyticsPage';
import N8nWebhookManagementPage from '../pages/Admin/N8nWebhookManagementPage';
import TenantSettingsPage from '../pages/Settings/TenantSettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

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
                    <TenantsManagementPage />
                </ProtectedRoute>
            } />

            {/* Manage Engines */}
            <Route path="/engines" element={
                <ProtectedRoute requireSystemAdmin>
                    <EngineManagementPage />
                </ProtectedRoute>
            } />

            {/* Manage Platform Agents */}
            <Route path="/agents" element={
                <ProtectedRoute requireSystemAdmin>
                    <AgentsManagementPage />
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

            <Route path="/settings" element={
                <ProtectedRoute requireSystemAdmin>
                    <TenantSettingsPage />
                </ProtectedRoute>
            } />

            {/* Support legacy routes by redirecting to root or specific pages */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/godfather/*" element={<Navigate to="/" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AdminRouter;
