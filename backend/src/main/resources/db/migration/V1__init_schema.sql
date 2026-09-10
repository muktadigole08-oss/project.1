-- ==========================================================
-- Flyway Database Migration: V1__init_schema.sql
-- Target Database: Microsoft SQL Server (MSSQL)
-- ==========================================================

-- 1. Users Table (for Authentication & Role Management)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(150) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        full_name NVARCHAR(100) NOT NULL,
        phone NVARCHAR(30),
        role NVARCHAR(30) NOT NULL DEFAULT 'ROLE_PATIENT', -- ROLE_PATIENT, ROLE_DOCTOR, ROLE_ADMIN
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );

    CREATE INDEX idx_users_email ON users(email);
END;

-- 2. Departments Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'departments')
BEGIN
    CREATE TABLE departments (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(150) NOT NULL,
        code NVARCHAR(50) NOT NULL UNIQUE,
        description NVARCHAR(MAX),
        icon NVARCHAR(60) NOT NULL DEFAULT 'local_hospital',
        head_doctor_name NVARCHAR(100),
        bed_count INT DEFAULT 0,
        floor_number NVARCHAR(30),
        active BIT NOT NULL DEFAULT 1,
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );

    CREATE INDEX idx_departments_code ON departments(code);
END;

-- 3. Doctors Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'doctors')
BEGIN
    CREATE TABLE doctors (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        full_name NVARCHAR(120) NOT NULL,
        title NVARCHAR(120) NOT NULL, -- e.g. Chief of Cardiac Surgery
        department_id BIGINT NOT NULL,
        qualifications NVARCHAR(200), -- e.g. MD, FACS, Harvard Medical
        experience_years INT NOT NULL DEFAULT 5,
        rating DECIMAL(3, 2) NOT NULL DEFAULT 5.00,
        review_count INT NOT NULL DEFAULT 0,
        consultation_fee DECIMAL(10, 2) NOT NULL DEFAULT 150.00,
        avatar_url NVARCHAR(500),
        bio NVARCHAR(MAX),
        available_days NVARCHAR(100) DEFAULT 'Mon,Tue,Wed,Thu,Fri',
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT fk_doctors_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
    );

    CREATE INDEX idx_doctors_department ON doctors(department_id);
END;

-- 4. Appointments Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'appointments')
BEGIN
    CREATE TABLE appointments (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        patient_name NVARCHAR(120) NOT NULL,
        patient_email NVARCHAR(150) NOT NULL,
        patient_phone NVARCHAR(30) NOT NULL,
        user_id BIGINT NULL,
        doctor_id BIGINT NOT NULL,
        department_id BIGINT NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time NVARCHAR(20) NOT NULL, -- e.g. "10:30 AM"
        consult_type NVARCHAR(30) NOT NULL DEFAULT 'IN_PERSON', -- IN_PERSON, VIRTUAL
        status NVARCHAR(30) NOT NULL DEFAULT 'PENDING', -- PENDING, CONFIRMED, COMPLETED, CANCELLED
        symptoms_notes NVARCHAR(MAX),
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT fk_appointments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        CONSTRAINT fk_appointments_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE NO ACTION,
        CONSTRAINT fk_appointments_dept FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE NO ACTION
    );

    CREATE INDEX idx_appointments_patient_email ON appointments(patient_email);
    CREATE INDEX idx_appointments_date ON appointments(appointment_date);
    CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
END;

-- 5. Lab Reports Table (for Patient Portal)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'lab_reports')
BEGIN
    CREATE TABLE lab_reports (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL,
        test_name NVARCHAR(150) NOT NULL,
        category NVARCHAR(80) NOT NULL, -- e.g. Cardiology, Hematology, Pathology
        test_date DATE NOT NULL,
        doctor_name NVARCHAR(120) NOT NULL,
        status NVARCHAR(30) NOT NULL DEFAULT 'READY', -- READY, PENDING, PROCESSING
        result_summary NVARCHAR(MAX),
        file_url NVARCHAR(500),
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT fk_lab_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX idx_lab_reports_user ON lab_reports(user_id);
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'medical_insights')
BEGIN
    CREATE TABLE medical_insights (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(255) NOT NULL,
        category NVARCHAR(80) NOT NULL,
        summary NVARCHAR(MAX),
        content NVARCHAR(MAX),
        author_name NVARCHAR(120) NOT NULL,
        author_role NVARCHAR(120),
        read_time_minutes INT DEFAULT 5,
        publish_date DATE NOT NULL,
        image_url NVARCHAR(500),
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );

    CREATE INDEX idx_insights_category ON medical_insights(category);
END;

-- 7. Contact Messages Table (Inquiries & Emergency Requests)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'contact_messages')
BEGIN
    CREATE TABLE contact_messages (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        full_name NVARCHAR(120) NOT NULL,
        email NVARCHAR(150) NOT NULL,
        phone NVARCHAR(30),
        subject NVARCHAR(200) NOT NULL,
        message NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(30) NOT NULL DEFAULT 'NEW', -- NEW, IN_PROGRESS, RESOLVED
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );

    CREATE INDEX idx_contact_email ON contact_messages(email);
END;
