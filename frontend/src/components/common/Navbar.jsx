import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'transition-colors text-primary font-bold'
      : 'text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg';

  return (
    <header class="fixed top-0 left-0 right-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top 24/7 Utility Ribbon */}
      <div className="w-full bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-gutter-desktop h-10 flex items-center justify-between font-label-sm text-label-sm">
          <div className="flex items-center gap-space-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
            </span>
            <span className="font-label-sm text-error-container tracking-wide uppercase">Emergency 24/7:</span>
            <a className="text-on-primary hover:text-secondary-fixed transition-colors font-semibold" href="tel:8005550199">
              (800) 555-0199
            </a>
            <span className="text-outline hidden sm:inline">|</span>
            <span className="text-surface-container-high hidden sm:inline">Ambulatory Dispatch</span>
          </div>

          <div className="hidden lg:flex items-center gap-space-xs text-surface-container-high font-body-md text-label-sm">
            <span className="material-symbols-outlined text-label-sm text-secondary-fixed">schedule</span>
            <span>Mon - Sun: Open 24 Hours</span>
            <span className="text-outline">•</span>
            <span className="material-symbols-outlined text-label-sm text-secondary-fixed">location_on</span>
            <span>742 Evergreen Medical Plaza, Metro City</span>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-sm">
              <Link to="/portal" className="text-surface-container-high hover:text-on-primary transition-colors">
                Patient Portal
              </Link>
              <span className="text-outline">•</span>
              <Link to="/contact" className="text-surface-container-high hover:text-on-primary transition-colors">
                Pay Bill
              </Link>
              <span className="text-outline hidden sm:inline">•</span>
              <Link to="/about-us" className="text-surface-container-high hover:text-on-primary transition-colors hidden sm:inline">
                Careers
              </Link>
            </div>
            <div className="flex items-center gap-space-2xs text-secondary-fixed font-semibold cursor-pointer">
              <span className="material-symbols-outlined text-label-sm">language</span>
              <span>EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full bg-surface-container-lowest/90 backdrop-blur-xl">
        <div className="max-w-container-max mx-auto px-gutter-desktop h-20 flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <Link to="/" className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
                <span className="material-symbols-outlined text-2xl">local_hospital</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
                  MediCare
                </span>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                  Super Specialty Hospital
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-lg">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about-us" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/departments" className={navLinkClass}>
              Departments
            </NavLink>
            <NavLink to="/doctors" className={navLinkClass}>
              Doctors
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Action CTAs & Auth Controls */}
          <div className="flex items-center gap-space-md">
            {isAuthenticated ? (
              <div className="flex items-center gap-space-sm">
                <Link
                  to="/portal"
                  className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-label-md text-label-md"
                >
                  <span className="material-symbols-outlined text-body-lg text-secondary">account_circle</span>
                  <span className="font-medium max-w-[120px] truncate">{user?.fullName || 'Portal'}</span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-on-surface-variant hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-label-md text-label-md"
              >
                <span className="material-symbols-outlined text-body-lg text-secondary">login</span>
                <span className="font-medium">Portal Sign In</span>
              </Link>
            )}

            <Link
              to="/book-appointment"
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-all shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] font-label-lg text-label-lg font-semibold"
            >
              <span className="material-symbols-outlined text-body-lg">calendar_clock</span>
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
