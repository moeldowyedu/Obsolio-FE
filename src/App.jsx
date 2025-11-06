import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
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
import AgentMarketplacePage from './pages/Marketplace/AgentMarketplacePage'
import MultiAgentOrchestratorPage from './pages/Orchestrator/MultiAgentOrchestratorPage'
import AgentSchedulerPage from './pages/Scheduler/AgentSchedulerPage'
import AgentConfigurationPage from './pages/Agent/AgentConfigurationPage'
import AgentIntegrationPage from './pages/Integration/AgentIntegrationPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './router/ProtectedRoute'

function App() {
  return (
    <LanguageProvider>
      <div className="App">
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

        {/* Agent Management Routes */}
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
      </div>
    </LanguageProvider>
  )
}

export default App
