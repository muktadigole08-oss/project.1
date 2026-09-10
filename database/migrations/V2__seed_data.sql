-- ==========================================================
-- Flyway Database Migration: V2__seed_data.sql
-- Target Database: Microsoft SQL Server (MSSQL)
-- ==========================================================

-- 1. Seed Users (passwords: "password123", bcrypt encoded)
-- $2a$10$wH6RovH8l5d5vRovH8l5du7UomVfV5c7UomVfV5c7UomVfV5c7Uom
IF NOT EXISTS (SELECT * FROM users WHERE email = 'admin@medicare.com')
BEGIN
    INSERT INTO users (email, password, full_name, phone, role)
    VALUES 
    ('admin@medicare.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Dr. Sarah Jenkins', '(800) 555-0100', 'ROLE_ADMIN'),
    ('patient@medicare.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Eleanor Vance', '(800) 555-0199', 'ROLE_PATIENT');
END;

-- 2. Seed Departments
IF NOT EXISTS (SELECT * FROM departments WHERE code = 'CARDIO')
BEGIN
    INSERT INTO departments (name, code, description, icon, head_doctor_name, bed_count, floor_number, active)
    VALUES
    ('Heart & Vascular Institute', 'CARDIO', 'Comprehensive tertiary cardiac care, hybrid catheterization laboratories, and robotic heart surgery suites.', 'cardiology', 'Dr. Arthur Vance, MD, FACS', 120, 'Floor 3', 1),
    ('Neurology & Neurosurgery', 'NEURO', 'Advanced brain and spine treatments, biplane neuro-interventional suites, and dedicated stroke ICUs.', 'neurology', 'Dr. Elena Rostova, MD, PhD', 85, 'Floor 4', 1),
    ('Orthopedics & Spine Care', 'ORTHO', 'Minimally invasive joint preservation, robotic navigation surgery, and sports trauma rehabilitation.', 'orthopedics', 'Dr. Marcus Chen, MD, FAAP', 95, 'Floor 2', 1),
    ('Comprehensive Oncology', 'ONCO', 'Precision cancer therapies, immunotherapy programs, clinical trials, and linear accelerator radiation suites.', 'oncology', 'Dr. Julian Sterling, MD', 110, 'Floor 5', 1),
    ('Pediatrics & Child Health', 'PEDIA', 'Dedicated pediatric emergency department, neonatal ICUs (NICU), and multidisciplinary pediatric specialists.', 'pediatrics', 'Dr. Marcus Chen, MD, FAAP', 70, 'Floor 1', 1),
    ('Level 1 Emergency & Trauma', 'EMERGENCY', 'Round-the-clock rapid response trauma resuscitation, acute stroke protocols, and dedicated helipad.', 'e911_emergency', 'Dr. Robert Torres, MD', 60, 'Ground Floor', 1);
END;

-- 3. Seed Doctors (Matching Stitch Home & About Us designs)
IF NOT EXISTS (SELECT * FROM doctors WHERE full_name = 'Dr. Arthur Vance, MD, FACS')
BEGIN
    DECLARE @CardioId BIGINT = (SELECT id FROM departments WHERE code = 'CARDIO');
    DECLARE @NeuroId BIGINT = (SELECT id FROM departments WHERE code = 'NEURO');
    DECLARE @OrthoId BIGINT = (SELECT id FROM departments WHERE code = 'ORTHO');
    DECLARE @OncoId BIGINT = (SELECT id FROM departments WHERE code = 'ONCO');
    DECLARE @PediaId BIGINT = (SELECT id FROM departments WHERE code = 'PEDIA');

    INSERT INTO doctors (full_name, title, department_id, qualifications, experience_years, rating, review_count, consultationFee, avatar_url, bio, available_days)
    VALUES
    ('Dr. Arthur Vance, MD, FACS', 'Chief of Cardiac Surgery', @CardioId, 'MD, FACS - Johns Hopkins Medicine', 22, 4.95, 342, 220.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmoVsqMp6XiR8eMRmpQZmbAicOFc971TVGl24ErNgaa1K7OPCyxv8Y4Jsj6rrdTb-pRBoNSAe9QxPXsEVFDtZdEtXPZgY7aSWLX67__7fgc4oXQHKvWnnWpWlGOG0aQ9a_RePdvoEET1qWkTRj81F1lpQlxANT_Rp__uxEjKBc5m8Ttx7cbcixko3zXKy_W2CjrhrFn7TdLRbcXXg3wt75kRPhykN9GJ6cha484IqAGXOiLcos9HV1dg', 'Pioneering minimally invasive coronary revascularization and robotic valve repair with over two decades of leading clinical excellence.', 'Mon,Tue,Wed,Thu'),
    ('Dr. Elena Rostova, MD, PhD', 'Head of Neurosurgery', @NeuroId, 'MD, PhD - Harvard Medical School', 18, 4.98, 289, 250.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4LJPX8SDdxsKHpJWUnjK06l4g5wHBNwisIW_-gMvsEbXdL0ZfMu0vNnrGlTa2gizYZjw-2i2IIL0FaLwpZXgBVmaCeAzATFoNaVAsLgTeewUXv5c9G-iPRv0poZNksb0AnzkTvzPrrIG1ksXXQQX1rgea49BgIpfrMohQfVmjaHBQlyNmH4J7N11YeOpYf4Wv3j-s2q5fYU0cfWYyWS6OoVwmiLapc_Jhl5csehKByD5SR8TY0bjX0w', 'Renowned for micro-neurosurgical skull base resection, complex cerebrovascular interventions, and robotic functional neurosurgery.', 'Tue,Wed,Thu,Fri'),
    ('Dr. Marcus Chen, MD, FAAP', 'Director of Pediatric Medicine', @PediaId, 'MD, FAAP - Stanford University School of Medicine', 15, 4.92, 198, 180.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGcOCuYOmEozcWubKoGzcODnjCeMcNqaMcgFJ8lJUAuOh8uyglunGwxXbaPzWttMO748jMzjml5DVNw5Ji-_uUqgVBF194S-SFZqtUWRTPmC7HsJTU5tfpqkgklVIPSWpp3OAtBIZFZlJ4-Ok0k2BixW9bzHBJvyRuqBPzmjq4yCYFrbZxNQhgrNo8goB6MIGPmTQbCCYUo-s8cBVnihl98l9R04c3VoHSOI8a9n0aUCpp6NFISvtKXw', 'Dedicated to compassionate pediatric critical care, congenital anomalies management, and developmental health monitoring.', 'Mon,Wed,Fri,Sat'),
    ('Dr. Julian Sterling, MD', 'Senior Oncology Specialist', @OncoId, 'MD, Medical Oncology - Oxford University', 20, 4.94, 215, 240.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmoVsqMp6XiR8eMRmpQZmbAicOFc971TVGl24ErNgaa1K7OPCyxv8Y4Jsj6rrdTb-pRBoNSAe9QxPXsEVFDtZdEtXPZgY7aSWLX67__7fgc4oXQHKvWnnWpWlGOG0aQ9a_RePdvoEET1qWkTRj81F1lpQlxANT_Rp__uxEjKBc5m8Ttx7cbcixko3zXKy_W2CjrhrFn7TdLRbcXXg3wt75kRPhykN9GJ6cha484IqAGXOiLcos9HV1dg', 'Specializing in targeted biological immunotherapies, personalized genomics-driven oncology, and comprehensive chemotherapy regimens.', 'Mon,Tue,Thu,Fri');
END;

-- 4. Seed Medical Insights
IF NOT EXISTS (SELECT * FROM medical_insights WHERE title LIKE 'Heart Health in Modern Living%')
BEGIN
    INSERT INTO medical_insights (title, category, summary, content, author_name, authorRole, read_time_minutes, publish_date, image_url)
    VALUES
    ('Heart Health in Modern Living: Silent Indicators You Shouldn''t Ignore', 'Cardiology', 'A comprehensive review of early diagnostic markers in cardiovascular health and preventative strategies.', 'Cardiovascular conditions often manifest subtle signals long before an acute event. From sleep architecture irregularities to microvascular exertion fatigue, understanding proactive heart metrics can safeguard long-term longevity.', 'Dr. Arthur Vance, MD, FACS', 'Chief of Cardiac Surgery', 6, '2026-08-15', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'),
    ('Breakthroughs in Minimally Invasive Orthopedic Joint Procedures', 'Orthopedics', 'How computerized robotic navigation reduces recovery times by up to 60% in joint replacements.', 'Modern orthopedic intervention prioritizes muscle-sparing approaches, custom implant 3D modeling, and accelerated early ambulation protocols to restore pain-free biomechanical mobility.', 'Dr. Marcus Chen, MD, FAAP', 'Orthopedics & Spine Director', 5, '2026-08-28', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'),
    ('Pediatric Immunization & Seasonal Wellness: A Parent''s Complete Guide', 'Pediatrics', 'Essential schedule recommendations, seasonal vaccine guidance, and childhood immune optimization.', 'Navigating children''s vaccination milestones and building robust mucosal immunity during transition seasons with evidence-backed clinical protocols.', 'Dr. Sarah Jenkins', 'Clinical Chief Officer', 7, '2026-09-02', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80');
END;

-- 5. Seed Demo Lab Reports for Eleanor Vance (patient@medicare.com)
IF NOT EXISTS (SELECT * FROM lab_reports WHERE test_name = 'Comprehensive Metabolic Panel (CMP-14)')
BEGIN
    DECLARE @PatientUserId BIGINT = (SELECT id FROM users WHERE email = 'patient@medicare.com');

    INSERT INTO lab_reports (user_id, test_name, category, test_date, doctor_name, status, result_summary, file_url)
    VALUES
    (@PatientUserId, 'Comprehensive Metabolic Panel (CMP-14)', 'Biochemistry', '2026-08-20', 'Dr. Arthur Vance, MD, FACS', 'READY', 'All electrolyte, renal, and liver markers within optimal reference thresholds. Fasting glucose at 88 mg/dL.', 'https://medicare.org/reports/cmp-14-eleanor.pdf'),
    (@PatientUserId, 'Advanced Lipid & ApoB Profile', 'Cardiology', '2026-08-22', 'Dr. Arthur Vance, MD, FACS', 'READY', 'Total cholesterol: 172 mg/dL. HDL: 62 mg/dL. LDL: 94 mg/dL. ApoB: 72 mg/dL. Optimal cardiovascular risk score.', 'https://medicare.org/reports/lipid-apob-eleanor.pdf'),
    (@PatientUserId, 'Contrast MRI Brain & Cervical Spine', 'Radiology & Imaging', '2026-09-01', 'Dr. Elena Rostova, MD, PhD', 'READY', 'Clear scan. No acute intracranial hemorrhage, mass effect, or demyelinating lesions noted.', 'https://medicare.org/reports/mri-brain-eleanor.pdf');
END;

-- 6. Seed Demo Appointments
IF NOT EXISTS (SELECT * FROM appointments WHERE patient_email = 'patient@medicare.com')
BEGIN
    DECLARE @PatientId BIGINT = (SELECT id FROM users WHERE email = 'patient@medicare.com');
    DECLARE @DrArthurId BIGINT = (SELECT id FROM doctors WHERE full_name LIKE 'Dr. Arthur Vance%');
    DECLARE @DeptCardioId BIGINT = (SELECT id FROM departments WHERE code = 'CARDIO');

    INSERT INTO appointments (patient_name, patient_email, patient_phone, user_id, doctor_id, department_id, appointment_date, appointment_time, consult_type, status, symptoms_notes)
    VALUES
    ('Eleanor Vance', 'patient@medicare.com', '(800) 555-0199', @PatientId, @DrArthurId, @DeptCardioId, '2026-09-18', '10:30 AM', 'IN_PERSON', 'CONFIRMED', 'Quarterly preventative cardiovascular checkup and ECG review.');
END;
