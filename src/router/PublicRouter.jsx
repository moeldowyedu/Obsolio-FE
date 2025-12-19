import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import SignInPage from '../pages/Auth/SignInPage'; // Import SignInPage
import WorkspaceSelectionPage from '../pages/Auth/WorkspaceSelectionPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import PrivacyPolicyPage from '../pages/Public/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/Public/TermsOfServicePage';
import ContactPage from '../pages/Public/ContactPage';
import DocsPage from '../pages/Docs/DocsPage';
import NotFoundPage from '../pages/NotFoundPage';
import AgentXMarketplacePage from '../pages/AgentX/MarketplacePage';
import AgentDetailPage from '../pages/AgentX/AgentDetailPage';
import VerifyEmailSentPage from '../pages/Auth/VerifyEmailSentPage';
import EmailVerificationPage from '../pages/Auth/EmailVerificationPage';
import ResendVerificationPage from '../pages/Auth/ResendVerificationPage';
import VerifyEmailPendingPage from '../pages/Auth/VerifyEmailPendingPage';
import VerificationSuccessPage from '../pages/Auth/VerificationSuccessPage';
import VerificationFailedPage from '../pages/Auth/VerificationFailedPage';

const PublicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Redirect /login to /signin on public domain */}
            <Route path="/login" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/workspace-selection" element={<WorkspaceSelectionPage />} />

            {/* Guard: Redirect /dashboard to /login on public domain to prevent SaaS leak */}
            <Route path="/dashboard" element={<Navigate to="/login" replace />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-simple" element={<Navigate to="/register" replace />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            {/* Email Verification */}
            <Route path="/verify-email-sent" element={<VerifyEmailSentPage />} />
            {/* New Verification Flow */}
            <Route path="/verify-email" element={<VerifyEmailPendingPage />} />
            <Route path="/verification-success" element={<VerificationSuccessPage />} />
            <Route path="/verification-failed" element={<VerificationFailedPage />} />

            <Route path="/verify-email/:id/:hash" element={<EmailVerificationPage />} />
            <Route path="/resend-verification" element={<ResendVerificationPage />} />

            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Documentation */}
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:section/:page" element={<DocsPage />} />

            {/* Public AgentX Preview */}
            <Route path="/agentx/hub" element={<AgentXMarketplacePage />} />
            <Route path="/agentx/hub/agent/:id" element={<AgentDetailPage />} />
            <Route path="/marketplace/*" element={<Navigate to="/agentx/hub" replace />} />



            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default PublicRouter;
