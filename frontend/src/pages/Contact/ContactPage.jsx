import React, { useState } from 'react';
import { contactService } from '../../services/contactService';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await contactService.submitMessage(formData);
      setSuccess(true);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-background py-space-2xl">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="mb-space-2xl text-center max-w-2xl mx-auto">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Hospital Directory &amp; Support
          </span>
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
            Contact MediCare Hospital
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
            Reach out for non-emergency appointments, billing questions, or international patient services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            <div className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col gap-space-md">
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                Hospital Campus Details
              </h2>

              <div className="flex items-start gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-2xl">location_on</span>
                </div>
                <div>
                  <h3 className="font-label-lg font-bold text-primary">Main Campus Location</h3>
                  <p className="font-body-md text-on-surface-variant">
                    742 Evergreen Medical Plaza, Healthcare District, Metro City
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-error-container/40 flex items-center justify-center text-error shrink-0">
                  <span className="material-symbols-outlined text-2xl">e911_emergency</span>
                </div>
                <div>
                  <h3 className="font-label-lg font-bold text-error">24/7 Emergency Dispatch</h3>
                  <p className="font-body-md text-on-surface-variant font-semibold">
                    (800) 555-0199
                  </p>
                  <p className="font-label-sm text-xs text-on-surface-variant">
                    Immediate trauma &amp; cardiac ambulance response
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-2xl">schedule</span>
                </div>
                <div>
                  <h3 className="font-label-lg font-bold text-primary">Outpatient Clinics (OPD)</h3>
                  <p className="font-body-md text-on-surface-variant">
                    Monday – Saturday: 8:00 AM – 8:00 PM <br />
                    Sunday: 9:00 AM – 2:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div>
                  <h3 className="font-label-lg font-bold text-primary">General Inquiries</h3>
                  <p className="font-body-md text-on-surface-variant">
                    info@medicare-hospital.org
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                Send Us an Inquiry
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                Our patient relations team will respond within 24 hours.
              </p>

              {success && (
                <div className="mb-space-md p-space-md rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-label-md flex items-center gap-space-xs">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Thank you. Your message has been received by our patient coordination desk.</span>
                </div>
              )}

              {error && (
                <div className="mb-space-md p-space-md rounded-xl bg-error-container text-on-error-container font-label-md text-label-md flex items-center gap-space-xs">
                  <span className="material-symbols-outlined">error</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block font-label-sm text-label-sm text-primary font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Johnathan Doe"
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md"
                    />
                  </div>

                  <div>
                    <label className="block font-label-sm text-label-sm text-primary font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block font-label-sm text-label-sm text-primary font-bold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. (800) 555-0199"
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md"
                    />
                  </div>

                  <div>
                    <label className="block font-label-sm text-label-sm text-primary font-bold mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Second Opinion Consultation"
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm text-primary font-bold mb-1">
                    Message *
                  </label>
                  <textarea
                    rows="4"
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your inquiry or request details..."
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary outline-none font-body-md resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-space-sm rounded-xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-all shadow-md disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">send</span>
                  <span>{loading ? 'Sending...' : 'Send Inquiry'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
