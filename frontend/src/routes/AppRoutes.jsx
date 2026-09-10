import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import PortalLayout from '../components/layout/PortalLayout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import HomePage from '../pages/Home/HomePage';
import AboutUsPage from '../pages/AboutUs/AboutUsPage';
import DepartmentsPage from '../pages/Departments/DepartmentsPage';
import DoctorsPage from '../pages/Doctors/DoctorsPage';
import BookAppointmentPage from '../pages/Appointments/BookAppointmentPage';
import PatientPortalPage from '../pages/Portal/PatientPortalPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ContactPage from '../pages/Contact/ContactPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with Standard Header/Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Patient Portal */}
      <Route
        element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/portal" element={<PatientPortalPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
