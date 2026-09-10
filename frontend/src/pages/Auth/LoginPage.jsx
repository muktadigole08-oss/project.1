import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/portal';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoPatient = () => {
    setEmail('patient@medicare.com');
    setPassword('password123');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@medicare.com');
    setPassword('password123');
  };

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center py-space-2xl px-gutter-desktop">
      <div className="w-full max-w-md bg-surface-container-lowest p-space-2xl rounded-2xl border border-outline-variant/40 shadow-lg">
        {/* Header */}
        <div className="text-center mb-space-xl">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 mx-auto flex items-center justify-center text-secondary mb-space-sm">
            <span className="material-symbols-outlined text-3xl">lock</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold">
            Patient Portal Sign In
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Access your appointments, medical history, and diagnostics
          </p>
        </div>

        {error && (
          <div className="mb-space-md p-space-sm rounded-xl bg-error-container text-on-error-container font-label-md text-label-md flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-lg">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div>
            <label className="block font-label-md text-label-md text-primary font-bold mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. patient@medicare.com"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md text-on-surface"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-label-md text-label-md text-primary font-bold">Password</label>
              <span className="font-label-sm text-xs text-secondary hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md text-on-surface"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-space-sm rounded-xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-all shadow-md mt-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">login</span>
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Demo Fast-login shortcuts */}
        <div className="mt-space-lg pt-space-md border-t border-surface-container">
          <p className="font-label-sm text-xs text-on-surface-variant text-center mb-2 font-medium">
            Demo Credentials Preload:
          </p>
          <div className="grid grid-cols-2 gap-space-xs">
            <button
              type="button"
              onClick={fillDemoPatient}
              className="py-1.5 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-xs font-semibold transition-colors"
            >
              👤 Patient (Eleanor)
            </button>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="py-1.5 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-xs font-semibold transition-colors"
            >
              🩺 Doctor/Admin (Sarah)
            </button>
          </div>
        </div>

        {/* Register Footer */}
        <div className="mt-space-md text-center font-body-md text-body-md text-on-surface-variant">
          New to MediCare?{' '}
          <Link to="/register" className="text-secondary font-semibold hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
