# Render Cloud Deployment Guide (MediCare Hospital Portal)

This guide provides step-by-step instructions to deploy the entire MediCare Hospital Portal System (Spring Boot + React + PostgreSQL) to [Render](https://render.com) for production.

---

## Architecture Overview

```
                          ┌───────────────────────────┐
                          │    Render Static Site     │
                          │     (React 18 + Vite)     │
                          │   https://<frontend>.     │
                          │        onrender.com       │
                          └─────────────┬─────────────┘
                                        │ HTTPS / API
                                        ▼
                          ┌───────────────────────────┐
                          │    Render Web Service     │
                          │    (Spring Boot Docker)   │
                          │    https://<backend>.     │
                          │        onrender.com       │
                          └─────────────┬─────────────┘
                                        │ JDBC (SSL)
                                        ▼
                          ┌───────────────────────────┐
                          │     Render Managed DB     │
                          │       (PostgreSQL)        │
                          └───────────────────────────┘
```

---

## Method 1: 1-Click Blueprint Deployment (Recommended)

Render Blueprints allow you to provision and link the database, backend service, and frontend static site automatically using the included `render.yaml` file.

### Steps:
1. **Push your code to GitHub / GitLab**.
2. Log in to your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** in the top navigation bar and select **Blueprint**.
4. Connect your GitHub/GitLab repository.
5. Render will automatically detect `render.yaml` and display the resources to be created:
   - `medicare-postgres` (Managed PostgreSQL Database)
   - `medicare-backend` (Dockerized Spring Boot Web Service)
   - `medicare-frontend` (React Static Site)
6. Click **Apply**.
7. Render will provision the database, build the Docker container for the backend, compile the frontend, and wire up the environment variables automatically.

---

## Method 2: Manual Dashboard Deployment

If you prefer to configure each component manually through the Render web UI, follow these steps:

### Step 1: Create the Managed PostgreSQL Database
1. Go to your Render Dashboard, click **New +**, and select **PostgreSQL**.
2. Configure the database:
   - **Name**: `medicare-postgres`
   - **Database**: `medicare_db`
   - **User**: `medicare_user`
   - **Region**: Choose the region closest to your users (e.g., `Oregon (US West)`).
   - **Plan**: `Free`
3. Click **Create Database**.
4. Once created, copy the **Internal Database URL** (e.g., `postgres://medicare_user:***@dpg-xxxx-a/medicare_db`).

---

### Step 2: Deploy the Spring Boot Backend (Web Service)
1. In the Render Dashboard, click **New +**, and select **Web Service**.
2. Connect your Git repository.
3. Configure the service:
   - **Name**: `medicare-backend`
   - **Region**: Same region as your database (e.g., `Oregon`).
   - **Branch**: `main`
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `./Dockerfile` (or `backend/Dockerfile` with `backend` as Docker context).
   - **Plan**: `Free`
4. Under **Health Check Path**, enter: `/api/departments`
5. Expand **Advanced** and add the following **Environment Variables**:

| Variable Name | Value | Purpose |
|---|---|---|
| `SPRING_PROFILES_ACTIVE` | `postgres` | Activates PostgreSQL datasource and Hibernate configuration |
| `DATABASE_URL` | *(Paste Internal Database URL from Step 1)* | Database connection URI (auto-converted to JDBC) |
| `CORS_ALLOWED_ORIGINS` | `https://medicare-frontend.onrender.com` | Allows requests from your frontend domain |
| `JWT_SECRET` | *(Click "Generate" or enter a 64+ character secret)* | Signs and verifies JWT authentication tokens |
| `PORT` | `8080` | Port for Spring Boot container binding |

6. Click **Create Web Service**.
7. Note down your backend URL (e.g., `https://medicare-backend.onrender.com`).

---

### Step 3: Deploy the React Frontend (Static Site)
1. In the Render Dashboard, click **New +**, and select **Static Site**.
2. Connect your Git repository.
3. Configure the static site:
   - **Name**: `medicare-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Expand **Advanced** and add the following **Environment Variable**:

| Variable Name | Value | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `https://medicare-backend.onrender.com` | Base URL of your deployed backend service |

5. Under **Redirects/Rewrites**, add a rewrite rule for Single Page Application (SPA) routing:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Create Static Site**.
7. Once deployed, if your frontend URL differs from `https://medicare-frontend.onrender.com`, update the `CORS_ALLOWED_ORIGINS` variable in your backend service to match your actual frontend URL.

---

## Pre-Configured Demo Accounts & Seed Data

On startup, the backend automatically initializes sample hospital data (departments, doctors, medical insights, lab reports) and demo user accounts:

| Role | Email | Password | Name |
|---|---|---|---|
| **Administrator** | `admin@medicare.com` | `admin123` | Dr. Sarah Jenkins |
| **Patient** | `patient@medicare.com` | `password123` | Eleanor Vance |

---

## Post-Deployment Sanity Checklist

1. **Backend Health Check**:
   - Visit: `https://<your-backend>.onrender.com/api/departments`
   - Expected Response: JSON list of 6 departments with HTTP 200.
2. **Frontend Availability**:
   - Visit: `https://<your-frontend>.onrender.com`
   - Verify that doctor listings, department directory, and medical insights render properly.
3. **Authentication Verification**:
   - Navigate to `/login`.
   - Log in with `patient@medicare.com` / `password123`.
   - Confirm access to the Patient Portal (`/portal`), lab reports, and appointment history.
4. **Appointment Booking**:
   - Go to `/appointments/book`.
   - Fill out an appointment request and submit.
   - Verify success confirmation.
5. **SPA Page Refresh**:
   - Navigate to any sub-route (e.g., `/departments` or `/doctors`).
   - Hard-refresh the page (Ctrl + F5 or Cmd + Shift + R).
   - Ensure you do NOT get a 404 error (handled by the `/* -> /index.html` rewrite rule).

---

## Troubleshooting & Cloud Notes

- **Cold Starts on Free Tier**: Render's free web services spin down after 15 minutes of inactivity. The first request after idling may take 30–50 seconds to respond as the container boots up. Subsequent requests respond instantly.
- **CORS Errors**: If you encounter CORS blocked errors in the browser console, ensure that `CORS_ALLOWED_ORIGINS` on the backend service contains your exact frontend origin (e.g., `https://medicare-frontend.onrender.com` without trailing slashes).
- **PostgreSQL Database Sleep**: Free PostgreSQL databases on Render expire after 90 days of creation. For uninterrupted production uptime, upgrade to a Starter tier database.
- **Database Schema Updates**: Hibernate is set to `ddl-auto=update` under the `postgres` profile. It will automatically create and update table schemas without requiring manual migrations.
