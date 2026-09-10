import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentService } from '../../services/departmentService';
import { doctorService } from '../../services/doctorService';
import { insightService } from '../../services/insightService';

export const HomePage = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptsData, docsData, insightsData] = await Promise.all([
          departmentService.getAllDepartments().catch(() => []),
          doctorService.getAllDoctors().catch(() => []),
          insightService.getAllInsights().catch(() => []),
        ]);
        setDepartments(deptsData || []);
        setDoctors(docsData || []);
        setInsights(insightsData || []);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================= */}
      {/* HERO SECTION (Preserving exact Stitch visual layout & colors) */}
      {/* ========================================================= */}
      <section className="relative w-full bg-surface-container-low overflow-hidden pb-space-3xl">
        {/* Subtle ambient gradients */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none"></div>

        <div className="max-w-container-max mx-auto px-gutter-desktop pt-space-2xl pb-space-2xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Hero Text Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
              {/* Quality Accreditation Badge */}
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-lowest shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  JCI &amp; NABH Accredited
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  World-Class Clinical Precision
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display-hero text-display-hero text-primary font-bold tracking-tight">
                Compassionate Care. <br className="hidden sm:inline" />
                <span className="text-secondary">Advanced Medicine.</span> <br className="hidden sm:inline" />
                Better Health.
              </h1>

              {/* Description */}
              <p className="font-body-xl text-body-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Delivering world-class tertiary and quaternary healthcare with cutting-edge robotic technology, renowned specialists, and a compassionate patient-first philosophy for over two decades.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs w-full sm:w-auto">
                <Link
                  to="/book-appointment"
                  className="flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg font-semibold hover:bg-on-secondary-container transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-body-lg">calendar_month</span>
                  <span>Book an Appointment</span>
                </Link>
                <Link
                  to="/doctors"
                  className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg font-semibold shadow-sm hover:bg-surface-container transition-all"
                >
                  <span className="material-symbols-outlined text-body-lg text-secondary">person_search</span>
                  <span>Find a Doctor</span>
                </Link>
                <Link
                  to="/book-appointment?type=VIRTUAL"
                  className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface-variant font-label-lg text-label-lg font-medium hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-body-lg text-secondary">videocam</span>
                  <span>Virtual Telehealth</span>
                </Link>
              </div>

              {/* Proof Points */}
              <div className="flex flex-wrap items-center gap-space-lg pt-space-sm">
                <div className="flex items-center gap-space-xs">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-8 w-8 rounded-full object-cover shadow-sm"
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                      alt="Doctor 1"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full object-cover shadow-sm"
                      src="https://images.unsplash.com/photo-1594824813590-7215286435c2?auto=format&fit=crop&w=120&q=80"
                      alt="Doctor 2"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full object-cover shadow-sm"
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80"
                      alt="Doctor 3"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-label-md fill-1">
                          star
                        </span>
                      ))}
                      <span className="font-label-sm text-label-sm text-on-surface font-bold ml-1">4.9/5</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Over 50,000+ happy patient outcomes
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-secondary text-headline-sm">verified_user</span>
                  <span>Zero Hospital Acquired Infection Standards</span>
                </div>
              </div>
            </div>

            {/* Hero Visual / Surgical Theater Card */}
            <div className="lg:col-span-5 relative mt-space-md lg:mt-0">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest">
                <img
                  className="w-full h-[440px] object-cover"
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
                  alt="Operating theater"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>

                {/* Operating Theater Tag */}
                <div className="absolute top-space-md left-space-md px-space-sm py-space-2xs rounded-md bg-primary-container/85 backdrop-blur-md text-on-primary font-label-sm text-label-sm flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span>Robotic Hybrid OR Suite 4 • In Service</span>
                </div>

                {/* Floating Micro Vitals Widget */}
                <div className="absolute bottom-space-md left-space-md right-space-md p-space-md rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-headline-md">cardiology</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">STEMI Cardiac Protocol</span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">Door-to-Balloon &lt; 42 min</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-space-xs py-space-2xs rounded bg-surface-container-high text-secondary font-label-sm text-label-sm font-bold">
                      99.8% Success
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4 QUICK ACCESS ACTION CARDS (Overlapping) */}
      {/* ========================================================= */}
      <section className="relative z-20 -mt-12 px-gutter-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1: Emergency */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-error"></div>
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="w-12 h-12 rounded-lg bg-error-container/40 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-headline-md animate-pulse">e911_emergency</span>
                </div>
                <span className="px-space-xs py-space-2xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                  24/7 Rapid
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-2xs">Emergency &amp; Trauma</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Immediate critical care triage, acute stroke protocol, and air ambulance dispatch.
              </p>
            </div>
            <div className="flex flex-col gap-space-2xs">
              <a
                className="w-full py-space-xs px-space-sm rounded-lg bg-error text-on-error font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs hover:bg-on-error-container transition-colors"
                href="tel:8005550199"
              >
                <span className="material-symbols-outlined text-body-lg">call</span>
                <span>(800) 555-0199</span>
              </a>
              <span className="text-center font-label-sm text-label-sm text-on-surface-variant mt-1">
                Average response &lt; 8 mins
              </span>
            </div>
          </div>

          {/* Card 2: Book Appointment */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-headline-md">calendar_add_on</span>
                </div>
                <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                  Same Day
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-2xs">Book Appointment</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Schedule in-person or telemedicine consults with department chairs seamlessly.
              </p>
            </div>
            <Link
              to="/book-appointment"
              className="w-full py-space-xs px-space-sm rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs hover:bg-on-secondary-container transition-colors"
            >
              <span className="material-symbols-outlined text-body-lg">calendar_month</span>
              <span>Select Date &amp; Doctor</span>
            </Link>
          </div>

          {/* Card 3: Find a Specialist */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-headline-md">person_search</span>
                </div>
                <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                  180+ Doctors
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-2xs">Find a Specialist</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Browse board-certified attending physicians across 35 medical sub-specialties.
              </p>
            </div>
            <Link
              to="/doctors"
              className="w-full py-space-xs px-space-sm rounded-lg bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-body-lg">search</span>
              <span>Search Directory</span>
            </Link>
          </div>

          {/* Card 4: Patient Portal & Reports */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-tertiary-container"></div>
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-tertiary-container">
                  <span className="material-symbols-outlined text-headline-md">vital_signs</span>
                </div>
                <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                  Encrypted
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-2xs">Portal &amp; Lab Reports</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Access real-time diagnostic reports, imaging scans, and digital prescriptions.
              </p>
            </div>
            <Link
              to="/portal"
              className="w-full py-space-xs px-space-sm rounded-lg bg-surface-container-high text-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs hover:bg-primary hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined text-body-lg">lock</span>
              <span>Secure Patient Login</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* DEPARTMENTS SECTION (Wired to dynamic backend data) */}
      {/* ========================================================= */}
      <section className="w-full py-space-3xl mt-12 bg-background">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Centers of Excellence
              </span>
              <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
                Dedicated Specialized Departments
              </h2>
            </div>
            <Link
              to="/departments"
              className="text-secondary font-label-lg text-label-lg font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>View All Departments</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {(departments.length > 0 ? departments : [
              { id: 1, name: 'Heart & Vascular Institute', code: 'CARDIO', icon: 'cardiology', description: 'Comprehensive tertiary cardiac care, catheterization laboratories, and robotic heart surgery.' },
              { id: 2, name: 'Neurology & Neurosurgery', code: 'NEURO', icon: 'neurology', description: 'Advanced brain and spine treatments, biplane neuro-interventional suites, and dedicated stroke ICUs.' },
              { id: 3, name: 'Orthopedics & Spine Care', code: 'ORTHO', icon: 'orthopedics', description: 'Minimally invasive joint preservation, robotic navigation surgery, and sports trauma rehab.' },
              { id: 4, name: 'Comprehensive Oncology', code: 'ONCO', icon: 'oncology', description: 'Precision cancer therapies, immunotherapy programs, clinical trials, and radiation oncology.' },
              { id: 5, name: 'Pediatrics & Child Health', code: 'PEDIA', icon: 'pediatrics', description: 'Dedicated pediatric emergency department, neonatal ICUs (NICU), and multidisciplinary specialists.' },
              { id: 6, name: 'Level 1 Emergency Care', code: 'EMERGENCY', icon: 'e911_emergency', description: 'Round-the-clock rapid trauma resuscitation, acute stroke protocols, and trauma bay helipad.' }
            ]).map((dept) => (
              <div
                key={dept.id}
                className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary/50 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <span className="material-symbols-outlined text-3xl">{dept.icon || 'local_hospital'}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-xs">
                    {dept.name}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                    {dept.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-sm border-t border-surface-container">
                  <Link
                    to={`/doctors?dept=${dept.id}`}
                    className="font-label-md text-label-md font-semibold text-secondary hover:text-on-secondary-container"
                  >
                    View Specialists
                  </Link>
                  <Link
                    to={`/book-appointment?deptId=${dept.id}`}
                    className="p-2 rounded-lg text-primary hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MEET OUR CLINICAL LEADERS / DOCTORS */}
      {/* ========================================================= */}
      <section className="w-full py-space-3xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Pioneering Clinicians
              </span>
              <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
                Meet Our Department Leaders
              </h2>
            </div>
            <Link
              to="/doctors"
              className="text-secondary font-label-lg text-label-lg font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>Explore All 180+ Doctors</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {(doctors.slice(0, 3).length > 0 ? doctors.slice(0, 3) : [
              {
                id: 1,
                fullName: 'Dr. Arthur Vance, MD, FACS',
                title: 'Chief of Cardiac Surgery',
                qualifications: 'MD, FACS - Johns Hopkins Medicine',
                rating: 4.95,
                reviewCount: 342,
                avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
                bio: 'Pioneering minimally invasive coronary revascularization and robotic valve repair for over two decades.'
              },
              {
                id: 2,
                fullName: 'Dr. Elena Rostova, MD, PhD',
                title: 'Head of Neurosurgery',
                qualifications: 'MD, PhD - Harvard Medical School',
                rating: 4.98,
                reviewCount: 289,
                avatarUrl: 'https://images.unsplash.com/photo-1594824813590-7215286435c2?auto=format&fit=crop&w=400&q=80',
                bio: 'Renowned for micro-neurosurgical skull base resection and robotic functional neurosurgery.'
              },
              {
                id: 3,
                fullName: 'Dr. Marcus Chen, MD, FAAP',
                title: 'Director of Pediatric Medicine',
                qualifications: 'MD, FAAP - Stanford University',
                rating: 4.92,
                reviewCount: 198,
                avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
                bio: 'Dedicated to pediatric critical care, congenital anomalies management, and developmental health.'
              }
            ]).map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 flex flex-col"
              >
                <img
                  className="w-full h-64 object-cover object-top"
                  src={doc.avatarUrl}
                  alt={doc.fullName}
                />
                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        {doc.title}
                      </span>
                      <div className="flex items-center text-amber-500 font-label-sm text-xs font-bold">
                        <span className="material-symbols-outlined text-sm fill-1 mr-0.5">star</span>
                        <span>{doc.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-2xs">
                      {doc.fullName}
                    </h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-sm">
                      {doc.qualifications}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-space-md">
                      {doc.bio}
                    </p>
                  </div>
                  <Link
                    to={`/book-appointment?doctorId=${doc.id}`}
                    className="w-full py-space-xs rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-primary font-label-md text-label-md font-semibold text-center transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MEDICAL INSIGHTS & WELLNESS NEWS */}
      {/* ========================================================= */}
      <section className="w-full py-space-3xl bg-background">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Clinical Research &amp; Health Literacy
              </span>
              <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
                Medical Insights &amp; Wellness News
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {(insights.length > 0 ? insights : [
              {
                id: 1,
                title: "Heart Health in Modern Living: Silent Indicators You Shouldn't Ignore",
                category: 'Cardiology',
                authorName: 'Dr. Arthur Vance, MD, FACS',
                readTimeMinutes: 6,
                imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
                summary: 'Understanding subtle microvascular signals and circadian heart rate fluctuations.'
              },
              {
                id: 2,
                title: 'Breakthroughs in Minimally Invasive Orthopedic Joint Procedures',
                category: 'Orthopedics',
                authorName: 'Dr. Marcus Chen, MD, FAAP',
                readTimeMinutes: 5,
                imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
                summary: 'How robotic navigation and custom implants reduce recovery milestones by 60%.'
              },
              {
                id: 3,
                title: "Pediatric Immunization & Seasonal Wellness: A Parent's Complete Guide",
                category: 'Pediatrics',
                authorName: 'Dr. Sarah Jenkins',
                readTimeMinutes: 7,
                imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
                summary: 'Vaccination schedules and supporting children mucosal immunity during season shifts.'
              }
            ]).map((article) => (
              <div
                key={article.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 hover:shadow-md transition-shadow flex flex-col"
              >
                <img className="w-full h-48 object-cover" src={article.imageUrl} alt={article.title} />
                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-2xs text-label-sm font-semibold">
                      <span className="text-secondary uppercase tracking-wider">{article.category}</span>
                      <span className="text-on-surface-variant">{article.readTimeMinutes} min read</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-xs line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-space-md">
                      {article.summary}
                    </p>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-medium">
                    By {article.authorName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
