import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PortalLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-low text-on-surface">
      {/* Portal Top Bar */}
      <header className="sticky top-0 z-40 bg-primary text-on-primary shadow-md">
        <div className="max-w-container-max mx-auto px-gutter-desktop h-16 flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <Link to="/" className="flex items-center gap-space-xs text-on-primary">
              <span className="material-symbols-outlined text-secondary-fixed text-2xl">local_hospital</span>
              <span className="font-headline-sm text-headline-sm font-bold">MediCare Portal</span>
            </Link>
            <span className="hidden sm:inline text-outline">|</span>
            <span className="hidden sm:inline font-label-md text-label-md text-surface-container-high">
              Patient Care &amp; Health Records
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-surface-container-high">
              <span className="material-symbols-outlined text-secondary-fixed text-xl">person</span>
              <span className="text-on-primary font-semibold">{user?.fullName || user?.email}</span>
              <span className="px-space-xs py-0.5 rounded bg-primary-container text-xs text-secondary-fixed font-medium">
                {user?.role?.replace('ROLE_', '')}
              </span>
            </div>

            <Link
              to="/book-appointment"
              className="hidden md:flex items-center gap-space-2xs px-space-sm py-1.5 rounded-lg bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-sm text-label-sm font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>New Appointment</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-lg bg-surface-container/20 hover:bg-error hover:text-on-error text-surface-container-high transition-colors font-label-sm text-label-sm"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-container-max mx-auto px-gutter-desktop py-space-xl w-full">
        <Outlet />
      </main>

      {/* Portal Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant py-space-md text-center font-label-sm text-label-sm text-on-surface-variant">
        MediCare Hospital Portal • HIPAA &amp; NABH Compliant Patient Health Information System
      </footer>
    </div>
  );
};

export default PortalLayout;
