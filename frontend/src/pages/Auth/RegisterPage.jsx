import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(formData);
      navigate('/portal', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center py-space-2xl px-gutter-desktop">
      <div className="w-full max-w-md bg-surface-container-lowest p-space-2xl rounded-2xl border border-outline-variant/40 shadow-lg">
        {/* Header */}
        <div className="text-center mb-space-xl">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 mx-auto flex items-center justify-center text-secondary mb-space-sm">
            <span className="material-symbols-outlined text-3xl">person_add</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold">
            Create Patient Account
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Register to schedule appointments and view your diagnostic reports
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
              Full Legal Name *
            </label>
            <input
              type="text"
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Johnathan Doe"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md text-on-surface"
            />
          </div>

          <div>
            <label className="block font-label-md text-label-md text-primary font-bold mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md text-on-surface"
            />
          </div>

          <div>
            <label className="block font-label-md text-label-md text-primary font-bold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. (800) 555-0199"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md text-on-surface"
            />
          </div>

          <div>
            <label className="block font-label-md text-label-md text-primary font-bold mb-1">
              Password * (min. 6 characters)
            </label>
            <input
              type="password"
              required
              minLength={6}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md text-on-surface"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-space-sm rounded-xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-all shadow-md mt-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">how_to_reg</span>
            <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-space-lg text-center font-body-md text-body-md text-on-surface-variant">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
