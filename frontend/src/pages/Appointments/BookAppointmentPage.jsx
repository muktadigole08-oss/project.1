import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { appointmentService } from '../../services/appointmentService';
import { departmentService } from '../../services/departmentService';
import { doctorService } from '../../services/doctorService';
import { useAuth } from '../../hooks/useAuth';

export const BookAppointmentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    patientName: user?.fullName || '',
    patientEmail: user?.email || '',
    patientPhone: user?.phone || '',
    departmentId: searchParams.get('deptId') || '',
    doctorId: searchParams.get('doctorId') || '',
    appointmentDate: '',
    appointmentTime: '10:00 AM',
    consultType: searchParams.get('type') === 'VIRTUAL' ? 'VIRTUAL' : 'IN_PERSON',
    symptomsNotes: '',
  });

  useEffect(() => {
    departmentService
      .getAllDepartments()
      .then((data) => setDepartments(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  // Handle URL query parameters if arriving with doctorId only
  useEffect(() => {
    const urlDoctorId = searchParams.get('doctorId');
    const urlDeptId = searchParams.get('deptId');
    if (urlDoctorId && !urlDeptId) {
      doctorService
        .getDoctorById(Number(urlDoctorId))
        .then((doc) => {
          if (doc && doc.departmentId) {
            setFormData((prev) => ({
              ...prev,
              doctorId: String(doc.id),
              departmentId: String(doc.departmentId),
            }));
          }
        })
        .catch(console.error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (formData.departmentId) {
      doctorService
        .getAllDoctors(Number(formData.departmentId))
        .then((data) => {
          const list = Array.isArray(data) ? data : [];
          setDoctors(list);
          // Automatically select physician if doctorId is empty or not in this department
          setFormData((prev) => {
            const hasDoctorInList = list.some((d) => String(d.id) === String(prev.doctorId));
            if (!hasDoctorInList && list.length > 0) {
              return { ...prev, doctorId: String(list[0].id) };
            }
            if (list.length === 0) {
              return { ...prev, doctorId: '' };
            }
            return prev;
          });
        })
        .catch((err) => {
          console.error(err);
          setDoctors([]);
        });
    } else {
      doctorService
        .getAllDoctors()
        .then((data) => {
          setDoctors(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error(err);
          setDoctors([]);
        });
    }
  }, [formData.departmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'departmentId') {
      // Trigger doctor re-fetch and auto-selection for the chosen department
      setFormData((prev) => ({ ...prev, departmentId: value, doctorId: '' }));
    } else if (name === 'doctorId') {
      const selectedDoc = doctors.find((d) => String(d.id) === String(value));
      if (selectedDoc && selectedDoc.departmentId) {
        setFormData((prev) => ({
          ...prev,
          doctorId: value,
          departmentId: String(selectedDoc.departmentId),
        }));
      } else {
        setFormData((prev) => ({ ...prev, doctorId: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        departmentId: Number(formData.departmentId),
        doctorId: Number(formData.doctorId),
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        consultType: formData.consultType,
        symptomsNotes: formData.symptomsNotes,
      };

      const res = await appointmentService.createAppointment(payload);
      setSuccessReceipt(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const selectedDoctor = doctors.find((doc) => String(doc.id) === String(formData.doctorId));

  return (
    <div className="w-full bg-background py-space-2xl">
      <div className="max-w-3xl mx-auto px-gutter-desktop">
        {/* Header */}
        <div className="mb-space-xl text-center">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Patient Scheduling
          </span>
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
            Book an Outpatient Consultation
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mt-2">
            Schedule an in-person clinical visit or encrypted telehealth session with our specialists.
          </p>
        </div>

        {/* Confirmation State */}
        {successReceipt ? (
          <div className="p-space-2xl rounded-2xl bg-surface-container-lowest border border-secondary/30 shadow-lg text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center text-secondary mb-space-md">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold mb-2">
              Appointment Request Confirmed!
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg">
              Your appointment request with <strong>{successReceipt.doctorName}</strong> in{' '}
              <strong>{successReceipt.departmentName}</strong> has been registered.
            </p>

            <div className="w-full max-w-md p-space-md rounded-xl bg-surface-container text-left mb-space-lg font-label-md text-label-md space-y-1">
              <p><strong>Appointment ID:</strong> #{successReceipt.id}</p>
              <p><strong>Date &amp; Time:</strong> {successReceipt.appointmentDate} at {successReceipt.appointmentTime}</p>
              <p><strong>Mode:</strong> {successReceipt.consultType === 'VIRTUAL' ? 'Virtual Telehealth' : 'In-Person Hospital Visit'}</p>
              <p><strong>Patient:</strong> {successReceipt.patientName} ({successReceipt.patientEmail})</p>
              <p><strong>Status:</strong> <span className="text-secondary font-bold">{successReceipt.status}</span></p>
            </div>

            <div className="flex gap-space-sm">
              {isAuthenticated ? (
                <Link
                  to="/portal"
                  className="px-space-lg py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-on-secondary-container transition-colors shadow-sm"
                >
                  View in Patient Portal
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-space-lg py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-on-secondary-container transition-colors shadow-sm"
                >
                  Sign In to Access Portal
                </Link>
              )}
              <button
                onClick={() => {
                  setSuccessReceipt(null);
                  setFormData((prev) => ({ ...prev, symptomsNotes: '' }));
                }}
                className="px-space-md py-space-sm rounded-lg bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
              >
                Book Another
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form
            onSubmit={handleSubmit}
            className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col gap-space-lg"
          >
            {error && (
              <div className="p-space-md rounded-xl bg-error-container text-on-error-container font-label-md text-label-md flex items-center gap-space-xs">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Consultation Mode */}
            <div>
              <label className="block font-label-md text-label-md text-primary font-bold mb-space-xs">
                Consultation Mode
              </label>
              <div className="grid grid-cols-2 gap-space-sm">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, consultType: 'IN_PERSON' }))}
                  className={`py-space-sm px-space-md rounded-xl border flex items-center justify-center gap-space-xs font-label-md text-label-md font-semibold transition-all ${
                    formData.consultType === 'IN_PERSON'
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-outline-variant/60 text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined">apartment</span>
                  <span>In-Person Visit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, consultType: 'VIRTUAL' }))}
                  className={`py-space-sm px-space-md rounded-xl border flex items-center justify-center gap-space-xs font-label-md text-label-md font-semibold transition-all ${
                    formData.consultType === 'VIRTUAL'
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-outline-variant/60 text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined">videocam</span>
                  <span>Virtual Telehealth</span>
                </button>
              </div>
            </div>

            {/* Department & Doctor Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-md text-label-md text-primary font-bold mb-1">
                  Medical Department *
                </label>
                <select
                  required
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface font-body-md"
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-primary font-bold mb-1">
                  Specialist Doctor *
                </label>
                <select
                  required
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface font-body-md"
                >
                  <option value="">
                    {doctors.length === 0 && formData.departmentId
                      ? 'No physicians currently assigned'
                      : 'Select Physician'}
                  </option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.fullName} ({doc.title})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Specialist Doctor Preview Card */}
            {selectedDoctor && (
              <div className="p-space-md rounded-2xl bg-secondary/5 border border-secondary/20 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-space-md animate-fadeIn">
                <img
                  src={
                    selectedDoctor.avatarUrl ||
                    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250'
                  }
                  alt={selectedDoctor.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-secondary shrink-0 shadow-sm"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-title-md text-title-md font-bold text-primary">
                      {selectedDoctor.fullName}
                    </h4>
                    {selectedDoctor.rating && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold">
                        ★ {selectedDoctor.rating} ({selectedDoctor.reviewCount || 0} reviews)
                      </span>
                    )}
                  </div>
                  <p className="text-secondary text-body-sm font-medium">
                    {selectedDoctor.title} • {selectedDoctor.qualifications || selectedDoctor.departmentName}
                  </p>
                  {selectedDoctor.availableDays && (
                    <p className="text-on-surface-variant text-label-xs mt-1">
                      <span className="font-semibold text-primary">Clinic Schedule:</span> {selectedDoctor.availableDays}
                    </p>
                  )}
                </div>
                {selectedDoctor.consultationFee && (
                  <div className="text-center sm:text-right shrink-0">
                    <span className="block text-label-xs uppercase tracking-wider text-on-surface-variant">Consultation Fee</span>
                    <span className="text-title-lg font-bold text-primary">
                      ${Number(selectedDoctor.consultationFee).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-md text-label-md text-primary font-bold mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  name="appointmentDate"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface font-body-md"
                />
              </div>

              <div>
                <label className="block font-label-md text-label-md text-primary font-bold mb-1">
                  Time Slot *
                </label>
                <select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface font-body-md"
                >
                  {['09:00 AM', '10:00 AM', '11:30 AM', '01:30 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Personal Details */}
            <div className="pt-space-sm border-t border-surface-container">
              <h3 className="font-label-lg text-label-lg text-primary font-bold mb-space-sm">
                Patient Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="patientEmail"
                    value={formData.patientEmail}
                    onChange={handleChange}
                    placeholder="e.g. name@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="patientPhone"
                    value={formData.patientPhone}
                    onChange={handleChange}
                    placeholder="e.g. (800) 555-0199"
                    className="w-full px-3 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md"
                  />
                </div>
              </div>
            </div>

            {/* Symptoms & Notes */}
            <div>
              <label className="block font-label-md text-label-md text-primary font-bold mb-1">
                Symptoms / Clinical Reason for Consultation
              </label>
              <textarea
                rows="3"
                name="symptomsNotes"
                value={formData.symptomsNotes}
                onChange={handleChange}
                placeholder="Briefly describe your symptoms, existing diagnoses, or follow-up reason..."
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface font-body-md resize-none"
              ></textarea>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-space-sm rounded-xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-all shadow-md disabled:opacity-50"
            >
              <span className="material-symbols-outlined">calendar_clock</span>
              <span>{loading ? 'Submitting Appointment...' : 'Confirm Consultation Booking'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentPage;
