import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/Auth/LoginPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';

// Dashboard & Core
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import NotificationsPage from '../pages/Profile/NotificationsPage';

// Billing
import BillingOverviewPage from '../pages/Billing/BillingOverviewPage';
import SubscriptionPage from '../pages/Billing/SubscriptionPage';
import UsageReportsPage from '../pages/Billing/UsageReportsPage';
import InvoicesPage from '../pages/Billing/InvoicesPage';

// Organization
import BranchesPage from '../pages/Organization/BranchesPage';
import BranchDetailsPage from '../pages/Organization/BranchDetailsPage';
import DepartmentsPage from '../pages/Organization/DepartmentsPage';
import ProjectsPage from '../pages/Organization/ProjectsPage';
import TeamsPage from '../pages/Organization/TeamsPage';
import OrganizationSettingsPage from '../pages/Organization/OrganizationSettingsPage';

// AgentX Hub
import AgentXMarketplacePage from '../pages/AgentX/MarketplacePage';
import AgentXBuilderPage from '../pages/AgentX/AgentBuilderPage';
import MyAgentsPage from '../pages/AgentX/MyAgentsPage';
import PrivateAgentsPage from '../pages/AgentX/PrivateAgentsPage';
import DeveloperPortalPage from '../pages/AgentX/DeveloperPortalPage';
import AgentDetailPage from '../pages/AgentX/AgentDetailPage';
import CheckoutPage from '../pages/AgentX/CheckoutPage';
import AgentDeploymentWizard from '../components/agent-deployment/AgentDeploymentWizard';

// Job Flows
import JobFlowsListPage from '../pages/JobFlows/JobFlowsListPage';
import JobCalendarPage from '../pages/JobFlows/JobCalendarPage';
import ExecutionHistoryPage from '../pages/JobFlows/ExecutionHistoryPage';

// HITL
import OversightModesPage from '../pages/HITL/OversightModesPage';
import ApprovalWorkflowsPage from '../pages/HITL/ApprovalWorkflowsPage';
import ApprovalQueuePage from '../pages/HITL/ApprovalQueuePage';
import MyApprovalsPage from '../pages/HITL/MyApprovalsPage';
import ActivityLogsPage from '../pages/HITL/ActivityLogsPage';
import HITLConfigurationPage from '../pages/HITL/HITLConfigurationPage';

// Orchestration & Scheduling
import WorkflowsPage from '../pages/Orchestration/WorkflowsPage';
import WorkflowBuilderPage from '../pages/Orchestration/WorkflowBuilderPage';
import OrchestrationExecutionHistoryPage from '../pages/Orchestration/ExecutionHistoryPage';
import ScheduledJobsPage from '../pages/Scheduling/ScheduledJobsPage';
import CalendarViewPage from '../pages/Scheduling/CalendarViewPage';
import UpcomingRunsPage from '../pages/Scheduling/UpcomingRunsPage';

// Engines & Integrations
import EnginesOverviewPage from '../pages/Engines/EnginesOverviewPage';
import DataEnginePage from '../pages/Engines/DataEnginePage';
import TextEnginePage from '../pages/Engines/TextEnginePage';
import AudioEnginePage from '../pages/Engines/AudioEnginePage';
import CodeEnginePage from '../pages/Engines/CodeEnginePage';

import ConnectedAppsPage from '../pages/Integrations/ConnectedAppsPage';
import APIKeysPage from '../pages/Integrations/APIKeysPage';
import WebhooksPage from '../pages/Integrations/WebhooksPage';
import BrowseIntegrationsPage from '../pages/Integrations/BrowseIntegrationsPage';

// Team & Settings
import AllUsersPage from '../pages/Team/AllUsersPage';
import InviteUserPage from '../pages/Team/InviteUserPage';
import RolesPermissionsPage from '../pages/Team/RolesPermissionsPage';
import UserActivityPage from '../pages/Team/UserActivityPage';
import TenantSettingsPage from '../pages/Settings/TenantSettingsPage';
import RubricsPage from '../pages/Settings/RubricsPage';
import SecurityPage from '../pages/Settings/SecurityPage';
import SettingsNotificationsPage from '../pages/Settings/NotificationsPage';

import ChatPage from '../pages/Chat/ChatPage';
import NotFoundPage from '../pages/NotFoundPage';

// Onboarding
import TenantSetupPage from '../pages/Onboarding/TenantSetupPage';
import OrganizationSetupPage from '../pages/Onboarding/OrganizationSetupPage';
import ContactPage from '../pages/Public/ContactPage';

// Security
import SecurityMiddleware from '../components/security/SecurityMiddleware';
import TenantGuard from '../components/security/TenantGuard';
import { getSubdomain } from '../utils/subdomain';

const TenantRouter = () => {
    const subdomain = getSubdomain();

    return (
        <TenantGuard subdomain={subdomain}>
            <SecurityMiddleware />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

                <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/dashboard" element={<Navigate to="/" replace />} />

                <Route path="/onboarding/tenant-setup" element={<ProtectedRoute><TenantSetupPage /></ProtectedRoute>} />
                <Route path="/onboarding/organization-setup" element={<ProtectedRoute><OrganizationSetupPage /></ProtectedRoute>} />

                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

                <Route path="/billing" element={<ProtectedRoute><BillingOverviewPage /></ProtectedRoute>} />
                <Route path="/billing/overview" element={<ProtectedRoute><BillingOverviewPage /></ProtectedRoute>} />
                <Route path="/billing/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
                <Route path="/billing/usage" element={<ProtectedRoute><UsageReportsPage /></ProtectedRoute>} />
                <Route path="/billing/invoices" element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>} />

                <Route path="/organization/settings" element={<ProtectedRoute><OrganizationSettingsPage /></ProtectedRoute>} />
                <Route path="/organization/branches" element={<ProtectedRoute><BranchesPage /></ProtectedRoute>} />
                <Route path="/organization/branches/:id" element={<ProtectedRoute><BranchDetailsPage /></ProtectedRoute>} />
                <Route path="/organization/departments" element={<ProtectedRoute><DepartmentsPage /></ProtectedRoute>} />
                <Route path="/organization/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
                <Route path="/organization/teams" element={<ProtectedRoute><TeamsPage /></ProtectedRoute>} />

                <Route path="/agentx" element={<ProtectedRoute><AgentXMarketplacePage /></ProtectedRoute>} />
                <Route path="/agentx/hub" element={<ProtectedRoute><AgentXMarketplacePage /></ProtectedRoute>} />
                <Route path="/agentx/hub/agent/:id" element={<ProtectedRoute><AgentDetailPage /></ProtectedRoute>} />
                <Route path="/agentx/hub/checkout/:id" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/agentx/my-agents" element={<ProtectedRoute><MyAgentsPage /></ProtectedRoute>} />
                <Route path="/agentx/builder" element={<ProtectedRoute><AgentXBuilderPage /></ProtectedRoute>} />
                <Route path="/agentx/private" element={<ProtectedRoute><PrivateAgentsPage /></ProtectedRoute>} />
                <Route path="/agentx/developer" element={<ProtectedRoute><DeveloperPortalPage /></ProtectedRoute>} />
                <Route path="/agents/deploy" element={<ProtectedRoute><AgentDeploymentWizard /></ProtectedRoute>} />

                <Route path="/job-flows/all" element={<ProtectedRoute><JobFlowsListPage /></ProtectedRoute>} />
                <Route path="/job-flows/calendar" element={<ProtectedRoute><JobCalendarPage /></ProtectedRoute>} />
                <Route path="/job-flows/history" element={<ProtectedRoute><ExecutionHistoryPage /></ProtectedRoute>} />

                <Route path="/orchestration/workflows" element={<ProtectedRoute><WorkflowsPage /></ProtectedRoute>} />
                <Route path="/orchestration/builder" element={<ProtectedRoute><WorkflowBuilderPage /></ProtectedRoute>} />
                <Route path="/orchestration/history" element={<ProtectedRoute><OrchestrationExecutionHistoryPage /></ProtectedRoute>} />

                <Route path="/scheduling/jobs" element={<ProtectedRoute><ScheduledJobsPage /></ProtectedRoute>} />
                <Route path="/scheduling/calendar" element={<ProtectedRoute><CalendarViewPage /></ProtectedRoute>} />
                <Route path="/scheduling/upcoming" element={<ProtectedRoute><UpcomingRunsPage /></ProtectedRoute>} />

                <Route path="/hitl" element={<ProtectedRoute><OversightModesPage /></ProtectedRoute>} />
                <Route path="/hitl/modes" element={<ProtectedRoute><OversightModesPage /></ProtectedRoute>} />
                <Route path="/hitl/approvals" element={<ProtectedRoute><ApprovalWorkflowsPage /></ProtectedRoute>} />
                <Route path="/hitl/approval-queue" element={<ProtectedRoute><ApprovalQueuePage /></ProtectedRoute>} />
                <Route path="/hitl/my-approvals" element={<ProtectedRoute><MyApprovalsPage /></ProtectedRoute>} />
                <Route path="/hitl/activity-logs" element={<ProtectedRoute><ActivityLogsPage /></ProtectedRoute>} />
                <Route path="/hitl/configuration" element={<ProtectedRoute><HITLConfigurationPage /></ProtectedRoute>} />

                <Route path="/integrations/connected" element={<ProtectedRoute><ConnectedAppsPage /></ProtectedRoute>} />
                <Route path="/integrations/api-keys" element={<ProtectedRoute><APIKeysPage /></ProtectedRoute>} />
                <Route path="/integrations/webhooks" element={<ProtectedRoute><WebhooksPage /></ProtectedRoute>} />
                <Route path="/integrations/browse" element={<ProtectedRoute><BrowseIntegrationsPage /></ProtectedRoute>} />

                <Route path="/team-users/all" element={<ProtectedRoute><AllUsersPage /></ProtectedRoute>} />
                <Route path="/team-users/invite" element={<ProtectedRoute><InviteUserPage /></ProtectedRoute>} />
                <Route path="/team-users/roles" element={<ProtectedRoute><RolesPermissionsPage /></ProtectedRoute>} />
                <Route path="/team-users/activity" element={<ProtectedRoute><UserActivityPage /></ProtectedRoute>} />

                <Route path="/settings" element={<ProtectedRoute><TenantSettingsPage /></ProtectedRoute>} />
                <Route path="/settings/tenant" element={<ProtectedRoute><TenantSettingsPage /></ProtectedRoute>} />
                <Route path="/settings/rubrics" element={<ProtectedRoute><RubricsPage /></ProtectedRoute>} />
                <Route path="/settings/security" element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
                <Route path="/settings/notifications" element={<ProtectedRoute><SettingsNotificationsPage /></ProtectedRoute>} />

                <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

                <Route path="/engines" element={<ProtectedRoute><EnginesOverviewPage /></ProtectedRoute>} />
                <Route path="/engines/data" element={<ProtectedRoute><DataEnginePage /></ProtectedRoute>} />
                <Route path="/engines/text" element={<ProtectedRoute><TextEnginePage /></ProtectedRoute>} />
                <Route path="/engines/audio" element={<ProtectedRoute><AudioEnginePage /></ProtectedRoute>} />
                <Route path="/engines/code" element={<ProtectedRoute><CodeEnginePage /></ProtectedRoute>} />

                <Route path="/contact" element={<ContactPage />} />

                <Route path="*" element={<NotFoundPage showSidebar={true} />} />
            </Routes>
        </TenantGuard>
    );
};

export default TenantRouter;