import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import SimpleRegisterPage from './pages/Auth/SimpleRegisterPage'
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/Auth/ResetPasswordPage'
// Onboarding Pages
import TenantSetupPage from './pages/Onboarding/TenantSetupPage'
import OrganizationSetupPage from './pages/Onboarding/OrganizationSetupPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProfilePage from './pages/Profile/ProfilePage'
import NotificationsPage from './pages/Profile/NotificationsPage'
import AdminDashboardPage from './pages/Admin/AdminDashboardPage'
import UserManagementPage from './pages/Admin/UserManagementPage'
import AnalyticsPage from './pages/Admin/AnalyticsPage'
import N8nWebhookManagementPage from './pages/Admin/N8nWebhookManagementPage'
// System Admin Pages
import TenantsManagementPage from './pages/Admin/TenantsManagementPage'
import EngineManagementPage from './pages/Admin/EngineManagementPage'
import AgentsManagementPage from './pages/Admin/AgentsManagementPage'
import ActiveAgentsMonitorPage from './pages/Admin/ActiveAgentsMonitorPage'
import IntegrationManagementPage from './pages/Admin/IntegrationManagementPage'
import EnginesOverviewPage from './pages/Engines/EnginesOverviewPage'
import VisionEnginePage from './pages/Engines/VisionEnginePage'
import AudioEnginePage from './pages/Engines/AudioEnginePage'
import TextEnginePage from './pages/Engines/TextEnginePage'
import CodeEnginePage from './pages/Engines/CodeEnginePage'
import DocumentEnginePage from './pages/Engines/DocumentEnginePage'
import DataEnginePage from './pages/Engines/DataEnginePage'
import WebEnginePage from './pages/Engines/WebEnginePage'
import OversightModesPage from './pages/HITL/OversightModesPage'
import ApprovalWorkflowsPage from './pages/HITL/ApprovalWorkflowsPage'
import ActivityLogsPage from './pages/HITL/ActivityLogsPage'
import AgentXMarketplacePage from './pages/AgentX/MarketplacePage'
import AgentXBuilderPage from './pages/AgentX/AgentBuilderPage'
import MyAgentsPage from './pages/AgentX/MyAgentsPage'
import PrivateAgentsPage from './pages/AgentX/PrivateAgentsPage'
import DeveloperPortalPage from './pages/AgentX/DeveloperPortalPage'
// Phase 10 Pages - Organization
import BranchesPage from './pages/Organization/BranchesPage'
import BranchDetailsPage from './pages/Organization/BranchDetailsPage'
import DepartmentsPage from './pages/Organization/DepartmentsPage'
import ProjectsPage from './pages/Organization/ProjectsPage'
import TeamsPage from './pages/Organization/TeamsPage'
// Agent Deployment
import AgentDeploymentWizard from './components/agent-deployment/AgentDeploymentWizard'
// Phase 10 Pages - Job Flows
import JobFlowsListPage from './pages/JobFlows/JobFlowsListPage'
import JobCalendarPage from './pages/JobFlows/JobCalendarPage'
import ExecutionHistoryPage from './pages/JobFlows/ExecutionHistoryPage'
// Phase 10 Pages - HITL
import ApprovalQueuePage from './pages/HITL/ApprovalQueuePage'
import MyApprovalsPage from './pages/HITL/MyApprovalsPage'
import HITLConfigurationPage from './pages/HITL/HITLConfigurationPage'
// Orchestration & Scheduling
import WorkflowsPage from './pages/Orchestration/WorkflowsPage'
import WorkflowBuilderPage from './pages/Orchestration/WorkflowBuilderPage'
import OrchestrationExecutionHistoryPage from './pages/Orchestration/ExecutionHistoryPage'
import ScheduledJobsPage from './pages/Scheduling/ScheduledJobsPage'
import CalendarViewPage from './pages/Scheduling/CalendarViewPage'
import UpcomingRunsPage from './pages/Scheduling/UpcomingRunsPage'
// Integrations
import ConnectedAppsPage from './pages/Integrations/ConnectedAppsPage'
import APIKeysPage from './pages/Integrations/APIKeysPage'
import WebhooksPage from './pages/Integrations/WebhooksPage'
import BrowseIntegrationsPage from './pages/Integrations/BrowseIntegrationsPage'
// Phase 10 Pages - Team & Users
import AllUsersPage from './pages/Team/AllUsersPage'
import InviteUserPage from './pages/Team/InviteUserPage'
import RolesPermissionsPage from './pages/Team/RolesPermissionsPage'
import UserActivityPage from './pages/Team/UserActivityPage'
// Phase 10 Pages - Billing
import BillingOverviewPage from './pages/Billing/BillingOverviewPage'
import SubscriptionPage from './pages/Billing/SubscriptionPage'
import UsageReportsPage from './pages/Billing/UsageReportsPage'
import InvoicesPage from './pages/Billing/InvoicesPage'
import TenantSettingsPage from './pages/Settings/TenantSettingsPage'
import RubricsPage from './pages/Settings/RubricsPage'
import SecurityPage from './pages/Settings/SecurityPage'
import SettingsNotificationsPage from './pages/Settings/NotificationsPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './router/ProtectedRoute'

function App() {
  return (
    <LanguageProvider>
      <div className="App">
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-simple" element={<SimpleRegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Onboarding Routes (Post-Registration) */}
        <Route
          path="/onboarding/tenant-setup"
          element={
            <ProtectedRoute>
              <TenantSetupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/organization-setup"
          element={
            <ProtectedRoute>
              <OrganizationSetupPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Authenticated Users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <BillingOverviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing/overview"
          element={
            <ProtectedRoute>
              <BillingOverviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing/subscription"
          element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing/usage"
          element={
            <ProtectedRoute>
              <UsageReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing/invoices"
          element={
            <ProtectedRoute>
              <InvoicesPage />
            </ProtectedRoute>
          }
        />

        {/* Precision AI Engine Routes */}
        <Route
          path="/engines"
          element={
            <ProtectedRoute>
              <EnginesOverviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engines/vision"
          element={
            <ProtectedRoute>
              <VisionEnginePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engines/audio"
          element={
            <ProtectedRoute>
              <AudioEnginePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engines/text"
          element={
            <ProtectedRoute>
              <TextEnginePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engines/code"
          element={
            <ProtectedRoute>
              <CodeEnginePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engines/document"
          element={
            <ProtectedRoute>
              <DocumentEnginePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engines/data"
          element={
            <ProtectedRoute>
              <DataEnginePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engines/web"
          element={
            <ProtectedRoute>
              <WebEnginePage />
            </ProtectedRoute>
          }
        />

        {/* Organization Routes */}
        <Route
          path="/organization/branches"
          element={
            <ProtectedRoute>
              <BranchesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/branches/:id"
          element={
            <ProtectedRoute>
              <BranchDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/departments"
          element={
            <ProtectedRoute>
              <DepartmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/teams"
          element={
            <ProtectedRoute>
              <TeamsPage />
            </ProtectedRoute>
          }
        />

        {/* AgentX Hub Routes */}
        <Route
          path="/agentx"
          element={
            <ProtectedRoute>
              <AgentXMarketplacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agentx/marketplace"
          element={
            <ProtectedRoute>
              <AgentXMarketplacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agentx/my-agents"
          element={
            <ProtectedRoute>
              <MyAgentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agentx/builder"
          element={
            <ProtectedRoute>
              <AgentXBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agentx/private"
          element={
            <ProtectedRoute>
              <PrivateAgentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agentx/developer"
          element={
            <ProtectedRoute>
              <DeveloperPortalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents/deploy"
          element={
            <ProtectedRoute>
              <AgentDeploymentWizard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents/my-agents"
          element={<Navigate to="/agentx/my-agents" replace />}
        />

        {/* HITL Routes */}
        <Route
          path="/hitl"
          element={
            <ProtectedRoute>
              <OversightModesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/modes"
          element={
            <ProtectedRoute>
              <OversightModesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/approvals"
          element={
            <ProtectedRoute>
              <ApprovalWorkflowsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/approval-queue"
          element={
            <ProtectedRoute>
              <ApprovalQueuePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/my-approvals"
          element={
            <ProtectedRoute>
              <MyApprovalsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/activity-logs"
          element={
            <ProtectedRoute>
              <ActivityLogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/logs"
          element={
            <ProtectedRoute>
              <ActivityLogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/configuration"
          element={
            <ProtectedRoute>
              <HITLConfigurationPage />
            </ProtectedRoute>
          }
        />

        {/* Job Flows Routes */}
        <Route
          path="/job-flows/all"
          element={
            <ProtectedRoute>
              <JobFlowsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-flows/calendar"
          element={
            <ProtectedRoute>
              <JobCalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-flows/history"
          element={
            <ProtectedRoute>
              <ExecutionHistoryPage />
            </ProtectedRoute>
          }
        />

        {/* Orchestration Routes */}
        <Route
          path="/orchestration/workflows"
          element={
            <ProtectedRoute>
              <WorkflowsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orchestration/builder"
          element={
            <ProtectedRoute>
              <WorkflowBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orchestration/history"
          element={
            <ProtectedRoute>
              <OrchestrationExecutionHistoryPage />
            </ProtectedRoute>
          }
        />

        {/* Scheduling Routes */}
        <Route
          path="/scheduling/jobs"
          element={
            <ProtectedRoute>
              <ScheduledJobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduling/calendar"
          element={
            <ProtectedRoute>
              <CalendarViewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduling/upcoming"
          element={
            <ProtectedRoute>
              <UpcomingRunsPage />
            </ProtectedRoute>
          }
        />

        {/* Integration Routes */}
        <Route
          path="/integrations/connected"
          element={
            <ProtectedRoute>
              <ConnectedAppsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/integrations/api-keys"
          element={
            <ProtectedRoute>
              <APIKeysPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/integrations/webhooks"
          element={
            <ProtectedRoute>
              <WebhooksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/integrations/browse"
          element={
            <ProtectedRoute>
              <BrowseIntegrationsPage />
            </ProtectedRoute>
          }
        />

        {/* Team & Users Routes */}
        <Route
          path="/team-users/all"
          element={
            <ProtectedRoute>
              <AllUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-users/invite"
          element={
            <ProtectedRoute>
              <InviteUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-users/roles"
          element={
            <ProtectedRoute>
              <RolesPermissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-users/activity"
          element={
            <ProtectedRoute>
              <UserActivityPage />
            </ProtectedRoute>
          }
        />

        {/* Settings Routes */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <TenantSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/tenant"
          element={
            <ProtectedRoute>
              <TenantSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/rubrics"
          element={
            <ProtectedRoute>
              <RubricsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/security"
          element={
            <ProtectedRoute>
              <SecurityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/notifications"
          element={
            <ProtectedRoute>
              <SettingsNotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* Tenant Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin>
              <UserManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute requireAdmin>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/webhooks"
          element={
            <ProtectedRoute requireAdmin>
              <N8nWebhookManagementPage />
            </ProtectedRoute>
          }
        />

        {/* System Admin Routes - Platform Management */}
        <Route
          path="/system-admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/tenants"
          element={
            <ProtectedRoute requireAdmin>
              <TenantsManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/engines"
          element={
            <ProtectedRoute requireAdmin>
              <EngineManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/agents"
          element={
            <ProtectedRoute requireAdmin>
              <AgentsManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/active-agents"
          element={
            <ProtectedRoute requireAdmin>
              <ActiveAgentsMonitorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/integrations"
          element={
            <ProtectedRoute requireAdmin>
              <IntegrationManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/settings"
          element={
            <ProtectedRoute requireAdmin>
              <TenantSettingsPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      </div>
    </LanguageProvider>
  )
}

export default App
