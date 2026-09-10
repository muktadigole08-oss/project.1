import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentService } from '../../services/departmentService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    departmentService
      .getAllDepartments()
      .then((data) => setDepartments(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full bg-background py-space-2xl">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="mb-space-2xl">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Hospital Infrastructure
          </span>
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
            Specialized Medical Departments &amp; Institutes
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-2">
            Each institute at MediCare operates with specialized dedicated operating theatres, intensive care units, and round-the-clock attending faculty.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading hospital departments..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-3xl">{dept.icon || 'local_hospital'}</span>
                    </div>
                    <span className="px-space-xs py-1 rounded bg-surface-container text-primary font-label-sm text-xs font-semibold">
                      {dept.floorNumber || 'Campus West'}
                    </span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-xs">
                    {dept.name}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    {dept.description}
                  </p>
                  <div className="p-space-sm rounded-lg bg-surface-container-low mb-space-md font-label-sm text-label-sm text-on-surface-variant">
                    <p>
                      <strong>Institute Chair:</strong> {dept.headDoctorName || 'Attending Faculty'}
                    </p>
                    <p>
                      <strong>Inpatient Capacity:</strong> {dept.bedCount || 60} dedicated beds
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                  <Link
                    to={`/doctors?dept=${dept.id}`}
                    className="flex-1 py-space-xs text-center rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold transition-colors"
                  >
                    View Specialists
                  </Link>
                  <Link
                    to={`/book-appointment?deptId=${dept.id}`}
                    className="flex-1 py-space-xs text-center rounded-lg bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md font-semibold transition-colors shadow-sm"
                  >
                    Book Consult
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

export default DepartmentsPage;
