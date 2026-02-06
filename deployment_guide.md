# Deployment Guide: SafarSaathi 🚀

This guide outlines the steps to deploy your Full-Stack Application to **Railway (DB)**, **Render (Backend)**, and **Netlify (Frontend)**.

---

## 1️⃣ Database (MySQL) → Railway

1.  **Sign Up/Login**: Go to [Railway.app](https://railway.app/) and login with GitHub.
2.  **New Project**: Click "New Project" -> "Provision MySQL".
3.  **Get Credentials**:
    *   Click on the **MySQL** card.
    *   Go to the **Variables** tab.
    *   You will see `MYSQL_URL` (or a combination of Host, Database, User, Password).
    *   **Copy the `MYSQL_URL`**. It looks like: `mysql://root:password@roundhouse.proxy.rlwy.net:12345/railway`

---

## 2️⃣ Backend (Spring Boot) → Render

1.  **Sign Up/Login**: Go to [Render.com](https://render.com/) and login with GitHub.
2.  **New Service**: Click "New +" -> **"Web Service"**.
3.  **Connect Repo**: Select your `springboot_backend_template` repository (or the monorepo if both are in one).
4.  **Configuration**:
    *   **Name**: `safar-saathi-backend`
    *   **Runtime**: `Docker` (We added a `Dockerfile` for you).
    *   **Environment Variables** (Add these keys from your Railway credentials):
        *   `SPRING_DATASOURCE_URL` = `jdbc:mysql://[HOST]:[PORT]/[DATABASE_NAME]` (Use the parts from your Railway URL)
        *   **OR** simply paste the full Railway JDBC URL if easier. 
        *   `SPRING_DATASOURCE_USERNAME` = `root` (from Railway)
        *   `SPRING_DATASOURCE_PASSWORD` = `[YOUR_RAILWAY_PASSWORD]`
        *   `RAZORPAY_KEY_ID` = `rzp_test_...` (Your Test Key)
        *   `RAZORPAY_KEY_SECRET` = `...` (Your Test Secret)
5.  **Deploy**: Click "Create Web Service".
6.  **Wait**: Render will build Docker image and start. Once "Live", **copy the backend URL** (e.g., `https://safar-saathi-backend.onrender.com`).

---

## 3️⃣ Frontend (React) → Netlify

1.  **Sign Up/Login**: Go to [Netlify.com](https://netlify.com/) and login with GitHub.
2.  **New Site**: "Add new site" -> "Import an existing project".
3.  **Connect Repo**: Select your `Sample_Frontend` repository.
4.  **Configuration**:
    *   **Base directory**: `Sample_Frontend/scratch/safar-saathi-web` (or just leave empty if it's the root).
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5.  **Environment Variables**:
    *   Click "Show advanced" -> "New Variable".
    *   Key: `VITE_API_URL`
    *   Value: `https://safar-saathi-backend.onrender.com/api` (The Render URL you copied + `/api`).
6.  **Deploy**: Click "Deploy site".

### 🎉 Done!
Your website should now be live on a Netlify URL (e.g., `https://safarsaathi.netlify.app`).

### Troubleshooting
*   **CORS Error**: If the frontend can't talk to the backend, ensure your Spring Boot `WebConfig` or `@CrossOrigin` annotations allow the Netlify domain. Currently, we have set `@CrossOrigin(origins = "*")` in Controllers, so it should work immediately.
*   **Redirects**: If refreshing a page creates a 404 error on Netlify, don't worry. I have already added a `public/_redirects` file to handle this.
