import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button, Input } from '../../components/common';
import toast from 'react-hot-toast';
import { getSubdomain, isSystemAdminDomain } from '../../utils/subdomain';
import { isMarketingSite } from '../../utils/tenantDetection';
import logo from '../../assets/imgs/OBSOLIO-logo-light.png';
import logoDark from '../../assets/imgs/OBSOLIO-logo-dark.png';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [searchParams] = useSearchParams();
  const verified = searchParams.get('verified');
  const alreadyVerified = searchParams.get('already_verified');

  useEffect(() => {
    if (verified === '1') {
      toast.success('Email verified! You can now login to your workspace.');
    }
    if (alreadyVerified === '1') {
      toast.info('Your email is already verified. Please login.');
    }
  }, [verified, alreadyVerified]);

  const isSystemAdmin = isSystemAdminDomain();
  const subdomain = getSubdomain();
  const onMarketingSite = isMarketingSite();

  // Redirect authenticated users to dashboard (only once on mount)
  useEffect(() => {
    // If on marketing site, redirect to /signin immediately
    if (onMarketingSite) {
      navigate('/signin', { replace: true });
      return;
    }

    if (isAuthenticated) {
      if (useAuthStore.getState().user?.is_system_admin) {
        // If system admin is on admin domain, go to dashboard
        // If on tenant domain, they might be strictly redirected or allowed (impersonation handled elsewhere)
        navigate('/', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    clearError();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);
      toast.success('Login successful!');

      // Redirect based on role and domain
      // AuthStore usually stores user in local state, valid for "session"
      // But we need to ensure they are on correct domain

      const user = data.user;

      if (user.is_system_admin) {
        // System Admin
        if (!isSystemAdmin) {
          // If they logged in on a non-admin domain (e.g. main site), redirect to admin domain
          // Ideally we should construct the URL
          // For now, simpler navigate if we are on router
          window.location.href = `${window.location.protocol}//console.${import.meta.env.VITE_APP_DOMAIN || 'localhost:5173'}/`;
        } else {
          navigate('/');
        }
      } else {
        // Tenant User
        // Need to know their tenant subdomain to redirect
        // Assuming user object has tenant_subdomain or we derive it
        const userTenantSubdomain = user.tenant?.subdomain || user.tenants?.[0]?.subdomain;

        if (userTenantSubdomain && userTenantSubdomain !== subdomain) {
          // Redirect to their subdomain
          const protocol = window.location.protocol;
          const domain = import.meta.env.VITE_APP_DOMAIN || 'localhost:5173';

          // Handle localhost port logic if needed relative to VITE_APP_DOMAIN
          let host = domain;
          if (domain.includes('localhost')) {
            host = `${userTenantSubdomain}.localhost:5173`; // Hardcoded port for dev fallback safety, or use existing logic
            // Better logic:
            // If domain includes port, use it.
          } else {
            host = `${userTenantSubdomain}.${domain}`;
          }

          window.location.href = `${protocol}//${host}/`;
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      toast.error(error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 p-2 rounded-lg transition-all z-50 ${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Background Ambience */}
      {theme === 'dark' ? (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      ) : (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-60 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <img src={theme === 'dark' ? logoDark : logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
          </Link>
          <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {isSystemAdmin ? 'System Admin Access' : subdomain ? `Welcome back, ${subdomain}` : 'Welcome Back'}
          </h2>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
            {isSystemAdmin ? 'Secure Clearance Required' : 'Sign in to your account to continue'}
          </p>
        </div>

        <div className={`p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl rounded-xl transition-all ${theme === 'dark' ? 'glass-card border border-white/10 bg-[#1e293b]/40' : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'}`}>
          {/* Decor glow - Only Dark */}
          {theme === 'dark' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              theme={theme}
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              fullWidth
              required
              error={error && 'Please check your credentials'}
            />

            <Input
              theme={theme}
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              fullWidth
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className={`w-4 h-4 rounded border-gray-600 focus:ring-primary-500/20 transition-all cursor-pointer ${theme === 'dark' ? 'bg-gray-800 text-primary-500' : 'bg-white border-gray-300 text-primary-600'}`}
                />
                <span className={`ml-2 text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-slate-500 group-hover:text-slate-700'}`}>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className={`text-sm transition-colors ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={isLoading}
              disabled={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className={`mt-6 pt-4 border-t text-center ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
              Don't have an account?{' '}
              <Link
                to="/register"
                className={`font-semibold transition-colors ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-gray-400' : 'text-slate-500 hover:text-slate-700'}`}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
