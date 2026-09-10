import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-primary text-on-primary">
      {/* Emergency Callout Banner */}
      <div className="border-b border-primary-container/80">
        <div className="max-w-container-max mx-auto px-gutter-desktop py-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-12 h-12 rounded-xl bg-error flex items-center justify-center text-on-error">
              <span className="material-symbols-outlined text-3xl animate-pulse">e911_emergency</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-primary">
                Facing a Medical Emergency? Do Not Wait.
              </h4>
              <p className="font-body-md text-body-md text-surface-container-high">
                Our Level 1 Trauma Resuscitation and Acute Stroke Units are fully active 24/7/365.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm w-full md:w-auto">
            <a
              href="tel:8005550199"
              className="w-full md:w-auto px-space-lg py-space-sm rounded-lg bg-error hover:bg-on-error-container text-on-error font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-colors shadow-lg"
            >
              <span className="material-symbols-outlined text-body-lg">call</span>
              <span>(800) 555-0199</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-container-max mx-auto px-gutter-desktop py-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
                <span className="material-symbols-outlined text-2xl">local_hospital</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-primary font-bold tracking-tight">
                  MediCare
                </span>
                <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">
                  Super Specialty Hospital
                </span>
              </div>
            </div>
            <p className="font-body-md text-body-md text-surface-container-high max-w-md leading-relaxed">
              Delivering world-class tertiary and quaternary healthcare with robotic surgical precision, renowned clinical chairs, and compassionate patient-first healing.
            </p>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm border border-primary-container">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
              <span>JCI &amp; NABH Accredited Healthcare Center</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-space-sm">
            <h5 className="font-label-lg text-label-lg text-on-primary font-bold uppercase tracking-wider">
              Quick Links
            </h5>
            <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-surface-container-high">
              <li>
                <Link to="/" className="hover:text-secondary-fixed transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-secondary-fixed transition-colors">
                  About Our Hospital
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-secondary-fixed transition-colors">
                  Find a Specialist
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-secondary-fixed transition-colors">
                  Medical Departments
                </Link>
              </li>
              <li>
                <Link to="/portal" className="hover:text-secondary-fixed transition-colors">
                  Patient Portal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary-fixed transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Medical Specialties */}
          <div className="flex flex-col gap-space-sm">
            <h5 className="font-label-lg text-label-lg text-on-primary font-bold uppercase tracking-wider">
              Specialties
            </h5>
            <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-surface-container-high">
              <li>Heart &amp; Vascular Institute</li>
              <li>Neurology &amp; Neurosurgery</li>
              <li>Orthopedics &amp; Spine Care</li>
              <li>Comprehensive Oncology</li>
              <li>Pediatrics &amp; Child Health</li>
              <li>Robotic Hybrid Surgery</li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="flex flex-col gap-space-sm">
            <h5 className="font-label-lg text-label-lg text-on-primary font-bold uppercase tracking-wider">
              Contact Us
            </h5>
            <div className="flex flex-col gap-space-xs font-body-md text-body-md text-surface-container-high">
              <p className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary-fixed text-body-lg">location_on</span>
                <span>742 Evergreen Medical Plaza, Metro City</span>
              </p>
              <p className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary-fixed text-body-lg">call</span>
                <span>Appointments: (800) 555-0199</span>
              </p>
              <p className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary-fixed text-body-lg">mail</span>
                <span>info@medicare-hospital.org</span>
              </p>
              <p className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary-fixed text-body-lg">schedule</span>
                <span>OPD: 8:00 AM – 8:00 PM</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="w-full bg-tertiary border-t border-primary-container/40">
        <div className="max-w-container-max mx-auto px-gutter-desktop py-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-surface-container-high">
          <p>© {new Date().getFullYear()} MediCare Super Specialty Hospital. All rights reserved.</p>
          <div className="flex items-center gap-space-md">
            <span className="hover:text-on-primary cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-on-primary cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-on-primary cursor-pointer">Patient Bill of Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
