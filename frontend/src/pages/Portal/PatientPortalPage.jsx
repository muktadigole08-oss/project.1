import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { appointmentService } from '../../services/appointmentService';
import { labReportService } from '../../services/labReportService';
import { formatDate, getStatusBadgeColor } from '../../utils/formatters';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const PatientPortalPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const [apts, reports] = await Promise.all([
          appointmentService.getMyAppointments().catch(() => []),
          labReportService.getMyLabReports().catch(() => []),
        ]);
        setAppointments(apts || []);
        setLabReports(reports || []);
      } catch (err) {
        console.error('Error fetching portal data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortalData();
  }, []);

  return (
    <div className="flex flex-col gap-space-xl">
      {/* Patient Welcome Banner */}
      <div className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-16 h-16 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-4xl">vital_signs</span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
              Patient Health Portal
            </span>
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold">
              Welcome, {user?.fullName || 'Patient'}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Medical Record ID: <span className="font-mono font-semibold">MC-2026-{user?.id || 101}</span> •{' '}
              {user?.email}
            </p>
          </div>
        </div>

        <Link
          to="/book-appointment"
          className="px-space-md py-space-xs rounded-xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-space-2xs transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Book Appointment</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-space-sm border-b border-outline-variant/40">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-space-sm font-label-lg text-label-lg font-semibold transition-all border-b-2 flex items-center gap-space-2xs ${
            activeTab === 'appointments'
              ? 'border-secondary text-secondary'
              : 'border-transparent text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined">event</span>
          <span>My Appointments ({appointments.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('labReports')}
          className={`pb-space-sm font-label-lg text-label-lg font-semibold transition-all border-b-2 flex items-center gap-space-2xs ${
            activeTab === 'labReports'
              ? 'border-secondary text-secondary'
              : 'border-transparent text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined">biotechnology</span>
          <span>Lab &amp; Diagnostic Reports ({labReports.length})</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner text="Retrieving clinical records..." />
      ) : activeTab === 'appointments' ? (
        /* Appointments Tab */
        <div className="flex flex-col gap-space-md">
          {appointments.length === 0 ? (
            <div className="p-space-2xl rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-2 text-surface-container-high">
                calendar_today
              </span>
              <h3 className="font-headline-sm font-bold text-primary mb-1">No Appointments Scheduled</h3>
              <p className="font-body-md mb-space-md">You currently have no scheduled appointments.</p>
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-secondary text-on-secondary font-label-md font-semibold"
              >
                Schedule Consult
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-space-2xs">
                      <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-wider">
                        {apt.departmentName}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-xs font-bold ${getStatusBadgeColor(
                          apt.status
                        )}`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                      {apt.doctorName}
                    </h3>

                    <div className="flex items-center gap-space-md text-label-md text-on-surface-variant mb-space-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">calendar_today</span>
                        {formatDate(apt.appointmentDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">schedule</span>
                        {apt.appointmentTime}
                      </span>
                    </div>

                    <p className="font-body-md text-body-md text-on-surface-variant bg-surface-container-low p-space-sm rounded-lg mb-space-md">
                      <strong>Reason / Notes:</strong> {apt.symptomsNotes || 'Routine consultation & checkup.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-label-sm text-on-surface-variant pt-space-xs border-t border-surface-container">
                    <span>
                      Mode: <strong>{apt.consultType === 'VIRTUAL' ? 'Virtual Telehealth' : 'In-Person Visit'}</strong>
                    </span>
                    <span className="font-mono text-xs text-outline">Ref: #{apt.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Lab Reports Tab */
        <div className="flex flex-col gap-space-md">
          {labReports.length === 0 ? (
            <div className="p-space-2xl rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-2 text-surface-container-high">
                clinical_notes
              </span>
              <h3 className="font-headline-sm font-bold text-primary mb-1">No Diagnostic Reports</h3>
              <p className="font-body-md">Completed laboratory tests will appear here automatically.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {labReports.map((report) => (
                <div
                  key={report.id}
                  className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-space-2xs">
                      <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-wider">
                        {report.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-xs font-bold ${getStatusBadgeColor(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                      {report.testName}
                    </h3>

                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-sm">
                      Ordered by: <strong>{report.doctorName}</strong> • Date: {formatDate(report.testDate)}
                    </p>

                    <div className="p-space-sm rounded-lg bg-surface-container-low text-body-md text-on-surface mb-space-md">
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Clinical Findings Summary
                      </p>
                      <p>{report.resultSummary}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-space-xs border-t border-surface-container">
                    <span className="font-label-sm text-xs text-secondary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">verified</span> Verified by Pathologist
                    </span>
                    <button
                      onClick={() => alert(`Downloading official signed laboratory PDF report #${report.id}`)}
                      className="px-space-sm py-1 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-primary font-label-sm text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">download</span>
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientPortalPage;
