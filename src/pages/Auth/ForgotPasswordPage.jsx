import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Card } from '../../components/common';
import { authService } from '../../services';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout showFooter={false}>
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Card padding="lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">
                {isSubmitted
                  ? 'Check your email for reset instructions'
                  : 'Enter your email to reset your password'}
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <div className="bg-green-50 rounded-lg p-6 mb-6">
                  <div className="text-5xl mb-4">✓</div>
                  <p className="text-gray-700">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                ← Back to Login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPasswordPage;
