import React from 'react';
import { Link } from 'react-router-dom';

export const AboutUsPage = () => {
  return (
    <div className="flex flex-col w-full bg-background">
      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative w-full bg-surface-container-low py-space-3xl overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-lowest shadow-sm mb-space-md">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Established 1999
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                25+ Years of Clinical Distinction
              </span>
            </div>
            <h1 className="font-display-hero text-display-hero text-primary font-bold tracking-tight mb-space-md">
              A Legacy of Healing, Innovation, and Human Touch.
            </h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant leading-relaxed">
              Founded on the belief that world-class healthcare should be compassionate, ethical, and accessible. Today, MediCare Super Specialty Hospital stands as a premier tertiary medical destination globally recognized for surgical precision and clinical outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MISSION, VISION & CORE VALUES */}
      {/* ========================================================= */}
      <section className="w-full py-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Our Principles
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
              Purpose-Driven Clinical Governance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-space-md">
                <span className="material-symbols-outlined text-3xl">target</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-xs">Our Mission</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                To provide state-of-the-art compassionate clinical care with relentless dedication to patient safety, dignity, and clinical excellence through innovative multidisciplinary practices.
              </p>
            </div>

            <div className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-space-md">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-xs">Our Vision</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                To be the foremost global healthcare institution renowned for cutting-edge robotic surgical breakthroughs, transformative translational medicine, and superior recovery metrics.
              </p>
            </div>

            <div className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-space-md">
                <span className="material-symbols-outlined text-3xl">favorite</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-xs">Core Values</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Integrity in diagnosis, patient-first empathy, clinical transparency, and continuous pursuit of academic knowledge and surgical mastery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MILESTONES (1999 - 2025) */}
      {/* ========================================================= */}
      <section className="w-full py-space-3xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Quarter-Century History
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
              Breakthrough Milestones (1999 – 2025)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {[
              { year: '1999', title: 'Founding of MediCare Clinic', desc: 'Commenced operations as a 50-bed community clinic dedicated to cardiovascular and emergency trauma care.' },
              { year: '2006', title: 'Campus Expansion & Trauma Center', desc: 'Inaugurated the 250-bed surgical wing and established our designated Level 1 Emergency Trauma facility.' },
              { year: '2012', title: 'First Robotic Cardiac Surgery', desc: 'Pioneered robotic closed-chest valve repairs and biplane neuro-catheterization intervention.' },
              { year: '2017', title: 'Comprehensive Oncology Center', desc: 'Launched linear accelerator radiation vaults and precision genomic immunotherapy programs.' },
              { year: '2021', title: 'JCI Gold Seal Accreditation', desc: 'Awarded Joint Commission International accreditation meeting top international quality benchmarks.' },
              { year: '2025', title: '600-Bed Digital Smart Medical Campus', desc: 'Transitioned to an AI-assisted smart hospital campus with 18 robotic hybrid surgical theatres.' }
            ].map((milestone, idx) => (
              <div
                key={idx}
                className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between"
              >
                <div>
                  <span className="font-headline-md text-headline-md font-bold text-secondary">
                    {milestone.year}
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-bold mt-1 mb-2">
                    {milestone.title}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* GLOBAL CERTIFICATIONS */}
      {/* ========================================================= */}
      <section className="w-full py-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-desktop text-center">
          <h3 className="font-headline-lg text-headline-lg text-primary font-bold mb-space-xl">
            Certified to the Highest Global Standards
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-space-md">
            {['JCI Accredited', 'NABH Certified', 'NABL Diagnostics', 'ISO 9001:2015', 'WHO Guidelines'].map((cert, i) => (
              <div
                key={i}
                className="p-space-md rounded-xl bg-surface-container flex flex-col items-center justify-center gap-space-2xs text-primary"
              >
                <span className="material-symbols-outlined text-secondary text-3xl">verified</span>
                <span className="font-label-md text-label-md font-bold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
