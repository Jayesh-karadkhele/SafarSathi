---
description: Deployment guide for SafarSaathi (MakeMyTrip Clone)
---

# Deployment Workflow

This guide explains how to build and run the SafarSaathi application for production (on a server).

## 1. Prerequisites
- **Java 17+** installed on the server.
- **Node.js 18+** installed on the server.
- **MySQL Server** running with a database named `travelApp2`.

## 2. Backend Deployment (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd e:/cdac/springboot_backend_template
   ```
2. Build the executable JAR:
   ```bash
   ./mvnw clean package -DskipTests
   ```
3. Run the application:
   ```bash
   java -jar target/SafarSaathiBackend-0.0.1-SNAPSHOT.jar
   ```
   *Note: Ensure port 8080 is open on your firewall.*

## 3. Frontend Deployment (React + Vite)
1. Navigate to the frontend directory:
   ```bash
   cd e:/cdac/Sample_Frontend/scratch/safar-saathi-web
   ```
2. Build the production files:
   ```bash
   npm run build
   ```
3. Serve the `dist` folder:
   - You can use a server like `nginx` or `apache`.
   - For a quick test, use `serve`:
     ```bash
     npx serve -s dist -l 5173
     ```
   *Note: If the backend is on a different server, update `src/api/axios.js` base URL before building.*

## 4. Verification
- Access the frontend at `http://<your-server-ip>:5173`.
- Authenticate and perform bookings to verify backend connectivity.
