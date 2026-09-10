import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { doctorService } from '../../services/doctorService';
import { departmentService } from '../../services/departmentService';
import { formatCurrency } from '../../utils/formatters';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const DoctorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDeptId = searchParams.get('dept');

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    departmentService
      .getAllDepartments()
      .then((data) => setDepartments(data || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    doctorService
      .getAllDoctors(selectedDeptId ? Number(selectedDeptId) : null)
      .then((data) => setDoctors(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedDeptId]);

  const filteredDoctors = doctors.filter((doc) =>
    doc.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.departmentName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-background py-space-2xl">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="mb-space-2xl">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Physicians &amp; Surgeons
          </span>
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
            Find a Medical Specialist
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-2">
            Meet our accredited clinicians leading patient recovery across 35 medical sub-specialties.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row gap-space-md mb-space-2xl">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search doctor by name, specialty, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface font-body-md"
            />
          </div>

          <div className="flex items-center gap-space-xs overflow-x-auto pb-2">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold whitespace-nowrap transition-colors ${
                !selectedDeptId
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              All Specialties
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSearchParams({ dept: dept.id })}
                className={`px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold whitespace-nowrap transition-colors ${
                  selectedDeptId === String(dept.id)
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <LoadingSpinner text="Loading doctors directory..." />
        ) : filteredDoctors.length === 0 ? (
          <div className="py-20 text-center text-on-surface-variant font-body-lg">
            No doctors found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 w-full bg-surface-container overflow-hidden">
                    <img
                      src={doc.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'}
                      alt={doc.fullName}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1 font-label-sm text-xs font-bold text-amber-500 shadow-sm">
                      <span className="material-symbols-outlined text-sm fill-1">star</span>
                      <span>{doc.rating}</span>
                      <span className="text-on-surface-variant font-normal">({doc.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-space-lg">
                    <span className="inline-block px-space-xs py-0.5 rounded bg-surface-container text-secondary font-label-sm text-xs font-bold uppercase tracking-wider mb-1">
                      {doc.departmentName || 'Medical Specialist'}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-0.5">
                      {doc.fullName}
                    </h3>
                    <p className="font-label-md text-label-md text-secondary font-semibold mb-1">
                      {doc.title}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-sm">
                      {doc.qualifications} • {doc.experienceYears}+ years exp.
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-space-md">
                      {doc.bio}
                    </p>

                    <div className="flex items-center justify-between text-label-sm text-on-surface-variant pt-space-xs border-t border-surface-container">
                      <span>Available: {doc.availableDays}</span>
                      <span className="font-bold text-primary">{formatCurrency(doc.consultationFee)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-space-lg pt-0">
                  <Link
                    to={`/book-appointment?doctorId=${doc.id}&deptId=${doc.departmentId}`}
                    className="w-full py-space-xs rounded-lg bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-2xs transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                    <span>Book Consultation</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
