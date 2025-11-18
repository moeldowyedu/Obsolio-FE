import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';

// Main Pages
import HomePage from '../pages/Home/HomePage';
import DashboardPage from '../pages/Dashboard/DashboardPage';

// Engine Pages
import EnginesOverviewPage from '../pages/Engines/EnginesOverviewPage';
import VisionEnginePage from '../pages/Engines/VisionEnginePage';
import AudioEnginePage from '../pages/Engines/AudioEnginePage';
import TextEnginePage from '../pages/Engines/TextEnginePage';
import CodeEnginePage from '../pages/Engines/CodeEnginePage';
import DocumentEnginePage from '../pages/Engines/DocumentEnginePage';
import DataEnginePage from '../pages/Engines/DataEnginePage';
import WebEnginePage from '../pages/Engines/WebEnginePage';

// Organization Pages
import BranchesPage from '../pages/Organization/BranchesPage';
import BranchDetailsPage from '../pages/Organization/BranchDetailsPage';
import DepartmentsPage from '../pages/Organization/DepartmentsPage';
import ProjectsPage from '../pages/Organization/ProjectsPage';
import TeamsPage from '../pages/Organization/TeamsPage';

// Agents Pages
import AllAgentsPage from '../pages/Agents/AllAgentsPage';
import AgentPerformancePage from '../pages/Agents/AgentPerformancePage';
import AgentDeploymentWizard from '../components/agent-deployment/AgentDeploymentWizard';

// AgentX Pages
import MarketplacePage from '../pages/AgentX/MarketplacePage';
import AgentBuilderPage from '../pages/AgentX/AgentBuilderPage';
import MyAgentsPage from '../pages/AgentX/MyAgentsPage';
import DeveloperPortalPage from '../pages/AgentX/DeveloperPortalPage';

// Job Flows Pages
import JobFlowsListPage from '../pages/JobFlows/JobFlowsListPage';
import JobCalendarPage from '../pages/JobFlows/JobCalendarPage';
import ExecutionHistoryPage from '../pages/JobFlows/ExecutionHistoryPage';

// HITL Pages
import OversightModesPage from '../pages/HITL/OversightModesPage';
import ApprovalWorkflowsPage from '../pages/HITL/ApprovalWorkflowsPage';
import ActivityLogsPage from '../pages/HITL/ActivityLogsPage';
import ApprovalQueuePage from '../pages/HITL/ApprovalQueuePage';
import MyApprovalsPage from '../pages/HITL/MyApprovalsPage';
import HITLConfigurationPage from '../pages/HITL/HITLConfigurationPage';

// Team & Users Pages
import AllUsersPage from '../pages/Team/AllUsersPage';
import InviteUserPage from '../pages/Team/InviteUserPage';
import RolesPermissionsPage from '../pages/Team/RolesPermissionsPage';
import UserActivityPage from '../pages/Team/UserActivityPage';

// Billing Pages
import BillingOverviewPage from '../pages/Billing/BillingOverviewPage';
import SubscriptionPage from '../pages/Billing/SubscriptionPage';
import UsageReportsPage from '../pages/Billing/UsageReportsPage';
import InvoicesPage from '../pages/Billing/InvoicesPage';

// Orchestration Pages
import WorkflowsPage from '../pages/Orchestration/WorkflowsPage';
import WorkflowBuilderPage from '../pages/Orchestration/WorkflowBuilderPage';
import OrchestrationExecutionHistoryPage from '../pages/Orchestration/ExecutionHistoryPage';

// Scheduling Pages
import ScheduledJobsPage from '../pages/Scheduling/ScheduledJobsPage';
import CalendarViewPage from '../pages/Scheduling/CalendarViewPage';
import UpcomingRunsPage from '../pages/Scheduling/UpcomingRunsPage';

// Integration Pages
import ConnectedAppsPage from '../pages/Integrations/ConnectedAppsPage';
import APIKeysPage from '../pages/Integrations/APIKeysPage';
import WebhooksPage from '../pages/Integrations/WebhooksPage';
import BrowseIntegrationsPage from '../pages/Integrations/BrowseIntegrationsPage';

// Settings Pages
import TenantSettingsPage from '../pages/Settings/TenantSettingsPage';
import RubricsPage from '../pages/Settings/RubricsPage';
import SecurityPage from '../pages/Settings/SecurityPage';
import SettingsNotificationsPage from '../pages/Settings/NotificationsPage';

// Legacy Pages (to be migrated)
import AgentSelectionPage from '../pages/Submissions/AgentSelectionPage';
import CreateSubmissionForm from '../pages/Submissions/CreateSubmissionForm';
import SubmissionsListPage from '../pages/Submissions/SubmissionsListPage';
import SubmissionDetailsPage from '../pages/Submissions/SubmissionDetailsPage';
import EvaluationResultsPage from '../pages/Evaluations/EvaluationResultsPage';
import ReportViewerPage from '../pages/Evaluations/ReportViewerPage';
import CriteriaManagementPage from '../pages/Evaluations/CriteriaManagementPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import NotificationsPage from '../pages/Profile/NotificationsPage';
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';
import AnalyticsPage from '../pages/Admin/AnalyticsPage';
import N8nWebhookManagementPage from '../pages/Admin/N8nWebhookManagementPage';
import AgentMarketplacePage from '../pages/Marketplace/AgentMarketplacePage';
import MultiAgentOrchestratorPage from '../pages/Orchestrator/MultiAgentOrchestratorPage';
import AgentSchedulerPage from '../pages/Scheduler/AgentSchedulerPage';
import AgentConfigurationPage from '../pages/Agent/AgentConfigurationPage';
import AgentIntegrationPage from '../pages/Integration/AgentIntegrationPage';
import NotFoundPage from '../pages/NotFoundPage';
import APITestPage from '../pages/APITestPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/api-test" element={<APITestPage />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Engines Routes */}
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

      {/* Agents Routes */}
      <Route
        path="/agents/all"
        element={
          <ProtectedRoute>
            <AllAgentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agents/my-agents"
        element={
          <ProtectedRoute>
            <MyAgentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agents/performance"
        element={
          <ProtectedRoute>
            <AgentPerformancePage />
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

      {/* AgentX Hub Routes */}
      <Route
        path="/agentx"
        element={
          <ProtectedRoute>
            <MarketplacePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agentx/marketplace"
        element={
          <ProtectedRoute>
            <MarketplacePage />
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
            <AgentBuilderPage />
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
        path="/hitl/approval-queue"
        element={
          <ProtectedRoute>
            <ApprovalQueuePage />
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
        path="/hitl/my-approvals"
        element={
          <ProtectedRoute>
            <MyApprovalsPage />
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

      {/* Billing Routes */}
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

      {/* Legacy Routes - Submissions */}
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

      {/* Legacy Routes - Evaluations */}
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

      {/* Profile Routes */}
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

      {/* Legacy Agent Management Routes */}
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <AgentMarketplacePage />
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

      {/* Admin Routes */}
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

      {/* 404 Not Found */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
