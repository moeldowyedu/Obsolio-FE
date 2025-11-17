import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/Auth/ResetPasswordPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import AgentSelectionPage from './pages/Submissions/AgentSelectionPage'
import CreateSubmissionForm from './pages/Submissions/CreateSubmissionForm'
import SubmissionsListPage from './pages/Submissions/SubmissionsListPage'
import SubmissionDetailsPage from './pages/Submissions/SubmissionDetailsPage'
import EvaluationResultsPage from './pages/Evaluations/EvaluationResultsPage'
import ReportViewerPage from './pages/Evaluations/ReportViewerPage'
import CriteriaManagementPage from './pages/Evaluations/CriteriaManagementPage'
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
import AgentMarketplacePage from './pages/Marketplace/AgentMarketplacePage'
import AgentDetailPage from './pages/Marketplace/AgentDetailPage'
import MultiAgentOrchestratorPage from './pages/Orchestrator/MultiAgentOrchestratorPage'
import AgentSchedulerPage from './pages/Scheduler/AgentSchedulerPage'
import AgentConfigurationPage from './pages/Agent/AgentConfigurationPage'
import AgentBuilderPage from './pages/Agent/AgentBuilderPage'
import AgentsListPage from './pages/Agent/AgentsListPage'
import AgentDetailPageNew from './pages/Agent/AgentDetailPage'
import AgentExecutionDetailPage from './pages/Agent/AgentExecutionDetailPage'
import AgentIntegrationPage from './pages/Integration/AgentIntegrationPage'
import EnginesOverviewPage from './pages/Engines/EnginesOverviewPage'
import VisionEnginePage from './pages/Engines/VisionEnginePage'
import AudioEnginePage from './pages/Engines/AudioEnginePage'
import TextEnginePage from './pages/Engines/TextEnginePage'
import CodeEnginePage from './pages/Engines/CodeEnginePage'
import DocumentEnginePage from './pages/Engines/DocumentEnginePage'
import DataEnginePage from './pages/Engines/DataEnginePage'
import WebEnginePage from './pages/Engines/WebEnginePage'
import BillingPage from './pages/Billing/BillingPage'
import HITLQueuePage from './pages/HITL/HITLQueuePage'
import HITLActivityPage from './pages/HITL/HITLActivityPage'
import OversightModesPage from './pages/HITL/OversightModesPage'
import ApprovalWorkflowsPage from './pages/HITL/ApprovalWorkflowsPage'
import ActivityLogsPage from './pages/HITL/ActivityLogsPage'
import WorkflowListPage from './pages/Workflow/WorkflowListPage'
import WorkflowBuilderPage from './pages/Workflow/WorkflowBuilderPage'
import WorkflowExecutionPage from './pages/Workflow/WorkflowExecutionPage'
import APIKeysPage from './pages/Developer/APIKeysPage'
import WebhooksPage from './pages/Developer/WebhooksPage'
import IntegrationsPage from './pages/Developer/IntegrationsPage'
import DeveloperDocsPage from './pages/Developer/DeveloperDocsPage'
import AgentXMarketplacePage from './pages/AgentX/MarketplacePage'
import MyAgentsPage from './pages/AgentX/MyAgentsPage'
import PrivateAgentsPage from './pages/AgentX/PrivateAgentsPage'
import DeveloperPortalPage from './pages/AgentX/DeveloperPortalPage'
import TenantSettingsPage from './pages/Settings/TenantSettingsPage'
import RubricsPage from './pages/Settings/RubricsPage'
import SettingsIntegrationsPage from './pages/Settings/IntegrationsPage'
import UsersRolesPage from './pages/Settings/UsersRolesPage'
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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

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
          path="/agent-select"
          element={
            <ProtectedRoute>
              <AgentSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <SubmissionsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions/create"
          element={
            <ProtectedRoute>
              <CreateSubmissionForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions/:id"
          element={
            <ProtectedRoute>
              <SubmissionDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/evaluations/:id"
          element={
            <ProtectedRoute>
              <EvaluationResultsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/evaluations/:id/report"
          element={
            <ProtectedRoute>
              <ReportViewerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/criteria"
          element={
            <ProtectedRoute>
              <CriteriaManagementPage />
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
              <BillingPage />
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

        {/* Agent Management Routes */}
        <Route
          path="/agents/create"
          element={
            <ProtectedRoute>
              <AgentBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents/:agentId/executions/:executionId"
          element={
            <ProtectedRoute>
              <AgentExecutionDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents/:agentId"
          element={
            <ProtectedRoute>
              <AgentDetailPageNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents"
          element={
            <ProtectedRoute>
              <AgentsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <AgentMarketplacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace/:agentId"
          element={
            <ProtectedRoute>
              <AgentDetailPage />
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
          path="/agent/configure/:agentId"
          element={
            <ProtectedRoute>
              <AgentConfigurationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orchestrator"
          element={
            <ProtectedRoute>
              <MultiAgentOrchestratorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduler"
          element={
            <ProtectedRoute>
              <AgentSchedulerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/integration"
          element={
            <ProtectedRoute>
              <AgentIntegrationPage />
            </ProtectedRoute>
          }
        />

        {/* HITL Routes */}
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
          path="/hitl/logs"
          element={
            <ProtectedRoute>
              <ActivityLogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/queue"
          element={
            <ProtectedRoute>
              <HITLQueuePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hitl/activity"
          element={
            <ProtectedRoute>
              <HITLActivityPage />
            </ProtectedRoute>
          }
        />

        {/* Workflow Routes */}
        <Route
          path="/workflows"
          element={
            <ProtectedRoute>
              <WorkflowListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workflows/builder"
          element={
            <ProtectedRoute>
              <WorkflowBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workflows/:workflowId/executions/:executionId"
          element={
            <ProtectedRoute>
              <WorkflowExecutionPage />
            </ProtectedRoute>
          }
        />

        {/* Developer Routes */}
        <Route
          path="/developer/api-keys"
          element={
            <ProtectedRoute>
              <APIKeysPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer/webhooks"
          element={
            <ProtectedRoute>
              <WebhooksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer/integrations"
          element={
            <ProtectedRoute>
              <IntegrationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer/docs"
          element={
            <ProtectedRoute>
              <DeveloperDocsPage />
            </ProtectedRoute>
          }
        />

        {/* Settings Routes */}
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
          path="/settings/integrations"
          element={
            <ProtectedRoute>
              <SettingsIntegrationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/users"
          element={
            <ProtectedRoute>
              <UsersRolesPage />
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
          path="/system-admin/tenants"
          element={
            <ProtectedRoute>
              <TenantsManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/engines"
          element={
            <ProtectedRoute>
              <EngineManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/agents"
          element={
            <ProtectedRoute>
              <AgentsManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/monitor"
          element={
            <ProtectedRoute>
              <ActiveAgentsMonitorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-admin/integrations"
          element={
            <ProtectedRoute>
              <IntegrationManagementPage />
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
