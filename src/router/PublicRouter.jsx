import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
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

const PublicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-simple" element={<Navigate to="/register" replace />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
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

            {/* Redirect dashboard URLs to login if accessed on public domain */}
            <Route path="/dashboard" element={<Navigate to="/login" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default PublicRouter;
