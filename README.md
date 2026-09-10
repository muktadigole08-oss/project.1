# MediCare Hospital Portal System

A full-stack hospital management and patient portal application built around the high-fidelity UI designed in Stitch.

---

## Architecture & Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Axios |
| **Backend** | Spring Boot 3.2.x, Java 17, Spring Security 6, Spring Data JPA, JJWT 0.12 |
| **Database** | Microsoft SQL Server (MSSQL), Flyway Database Migrations |
| **Authentication** | Stateless JWT (JSON Web Tokens) with Bearer token authentication |

---

## Directory Structure

```
project.1/
├── database/
│   └── migrations/
│       ├── V1__init_schema.sql         # MSSQL DDL schema (users, departments, doctors, appointments, etc.)
│       └── V2__seed_data.sql           # Seed data (clinicians, departments, insights, patient records)
├── backend/
│   ├── pom.xml                         # Spring Boot 3 Maven build configuration
│   └── src/main/
│       ├── java/com/yourorg/appname/
│       │   ├── config/                 # SecurityConfig (JWT filter chain), CorsConfig
│       │   ├── controller/             # REST controllers (/api/auth, /api/appointments, etc.)
│       │   ├── dto/                    # Request & Response DTOs
│       │   ├── entity/                 # JPA Entities (User, Doctor, Department, Appointment, etc.)
│       │   ├── exception/              # GlobalExceptionHandler & custom exceptions
│       │   ├── mapper/                 # Entity-to-DTO and DTO-to-Entity mappers
│       │   ├── repository/             # Spring Data JPA repositories
│       │   ├── security/               # JwtUtil, JwtAuthFilter, CustomUserDetailsService
│       │   ├── service/                # Business logic interfaces and service implementations
│       │   └── MedicareHospitalApplication.java
│       └── resources/
│           ├── application.properties  # MSSQL datasource, Flyway, and JWT settings
│           └── db/migration/           # Classpath migration mirror for runtime execution
└── frontend/
    ├── package.json                    # React 18, Vite, Tailwind, Axios, React Router
    ├── vite.config.js                  # Vite server & API reverse proxy configuration
    ├── tailwind.config.js              # Stitch design system color tokens and typography
    ├── index.html                      # HTML entry with Google Fonts & Material Symbols
    └── src/
        ├── components/
        │   ├── common/                 # Navbar, Footer, LoadingSpinner
        │   └── layout/                 # MainLayout, PortalLayout
        ├── context/                    # AuthContext (JWT session & token storage)
        ├── hooks/                      # useAuth custom hook
        ├── pages/
        │   ├── Home/                   # Stitch-migrated Landing screen with live data
        │   ├── AboutUs/                # Stitch-migrated Hospital history & milestones
        │   ├── Departments/            # Centers of Excellence catalog
        │   ├── Doctors/                # Physician directory & search
        │   ├── Appointments/           # Live appointment booking form
        │   ├── Portal/                 # Protected Patient Portal (records, lab tests)
        │   ├── Auth/                   # Login & Register screens
        │   └── Contact/                # Campus emergency numbers & inquiry form
        ├── routes/                     # AppRoutes.jsx, ProtectedRoute.jsx
        ├── services/                   # apiClient.js (Axios + JWT interceptor) & module APIs
        └── utils/                      # formatters.js
```

---

## 1. Database Setup (Microsoft SQL Server)

### Step 1.1: Ensure SQL Server is running
Make sure Microsoft SQL Server (e.g. SQL Server 2019/2022/Express) is installed and running.

1. Open **SQL Server Configuration Manager**:
   - Enable **TCP/IP** protocol under *SQL Server Network Configuration*.
   - Verify TCP Port is set to **1433**.
   - Ensure the **SQL Server (MSSQLSERVER or SQLEXPRESS)** and **SQL Server Browser** services are running.
2. Ensure **SQL Server and Windows Authentication mode** (Mixed Mode) is enabled in SQL Server properties.

### Step 1.2: Create the Database
Connect using **SQL Server Management Studio (SSMS)** or `sqlcmd` and create the database:

```sql
CREATE DATABASE medicare_db;
GO
```

### Step 1.3: Configure `backend/src/main/resources/application.properties`
Update the database connection properties to match your local SQL Server instance and credentials:

```properties
# Microsoft SQL Server Datasource
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=medicare_db;encrypt=true;trustServerCertificate=true
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
spring.datasource.username=sa
spring.datasource.password=YourStrong@Passw0rd

# If using a named instance like SQLEXPRESS, use:
# spring.datasource.url=jdbc:sqlserver://localhost\\SQLEXPRESS:1433;databaseName=medicare_db;encrypt=true;trustServerCertificate=true
```

Flyway will automatically execute `V1__init_schema.sql` and `V2__seed_data.sql` upon backend startup to construct tables and populate seed data.

---

## 2. Running the Backend (Spring Boot)

### Prerequisites:
- **Java 17** or higher (`java -version`)
- **Maven 3.8+** (`mvn -v`)

### Command:
Navigate to the `backend` directory and start the application:

```bash
cd backend
mvn spring-boot:run
```

The Spring Boot backend will start on **`http://localhost:8080`**.

---

## 3. Running the Frontend (React + Vite)

### Prerequisites:
- **Node.js 18+** (`node -v`)
- **npm 9+** (`npm -v`)

### Commands:
Open a new terminal, navigate to the `frontend` directory, install dependencies, and launch Vite:

```bash
cd frontend
npm install
npm run dev
```

The React frontend application will launch on **`http://localhost:5173`**.

---

## 4. Default Seed Accounts & Testing

The initial Flyway migration populates the following test accounts (passwords are BCrypt hashed):

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Patient** | `patient@medicare.com` | `password123` | Patient Portal, Diagnostic Reports, Appointments |
| **Doctor / Admin** | `admin@medicare.com` | `password123` | Admin / Department Head Privileges |

> **Quick Test**: On the `/login` page, you can click the **Demo Credentials** buttons to instantly fill in either test account.

---

## 5. API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | No |
| `POST` | `/api/auth/register` | Register new patient account | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | **Yes (Bearer)** |
| `GET` | `/api/departments` | List all active medical departments | No |
| `GET` | `/api/doctors` | List doctors (supports `?departmentId=`) | No |
| `POST` | `/api/appointments` | Book new outpatient consultation | No (Guest/User) |
| `GET` | `/api/appointments/my` | View logged-in patient's appointments | **Yes (Bearer)** |
| `GET` | `/api/lab-reports/my` | View logged-in patient's lab results | **Yes (Bearer)** |
| `GET` | `/api/insights` | Browse medical insights & health articles | No |
| `POST` | `/api/contact` | Submit general or emergency inquiry | No |
