<div align="center">

# 🧳 SafarSaathi — Premium Travel & Hotel Booking Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-safarsathi.pages.dev-008cff?style=for-the-badge&logo=cloudflare)](https://safarsathi.pages.dev/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Jayesh--karadkhele%2FSafarSathi-blue?style=for-the-badge&logo=github)](https://github.com/Jayesh-karadkhele/SafarSathi)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![Razorpay](https://img.shields.io/badge/Payment-Razorpay%20SDK-0C2340?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Developed by [Jayesh Karadkhele](https://github.com/Jayesh-karadkhele)**

*An enterprise-grade, full-stack travel experience aggregator and luxury hotel/villa booking engine.*

---

[🚀 Live Demo App](https://safarsathi.pages.dev/) &nbsp;|&nbsp; [🔗 GitHub Repository](https://github.com/Jayesh-karadkhele/SafarSathi) &nbsp;|&nbsp; [📖 API Docs](http://localhost:8080/swagger-ui/index.html)

</div>

---

## 🌟 Overview

**SafarSaathi** is a comprehensive, modern travel ecosystem designed to streamline holiday package discovery, luxury villa & hotel reservations, real-time payment processing, and vendor partner package publishing.

Engineered with a responsive **React 18 + Vite** frontend and a robust **Spring Boot 3 + Hibernate JPA** backend, SafarSaathi features glassmorphism visual aesthetics, role-based JWT security, automated PDF invoice generation, and instant Razorpay payment gateway integration.

🌐 **Live Application**: **[https://safarsathi.pages.dev/](https://safarsathi.pages.dev/)**

---

## ✨ Key Features

### 🌴 1. Holiday Packages & Itineraries
- **Curated Experiences**: Browse packages across beach getaways, mountain treks, heritage tours, and cultural expeditions.
- **Dynamic Search & Filters**: Search packages by location, price, duration, and ratings.
- **Detailed Itineraries**: Interactive day-wise breakdown, inclusion/exclusion details, and price calculators.

### 🏨 2. Stayinn Integrated Hotel & Villa Booking
- **Luxury Resorts & Homestays**: Integrated stay booking engine offering villas in Goa, Udaipur, Manali, Munnar, and Alibaug.
- **Interactive Stays Filter**: Filter stays by price per night, minimum star rating (4.0★ - 4.8★), and amenities (Pool, Spa, WiFi, Breakfast).
- **Automated Date & Guest Calculator**: Calculates total stay duration, per-night pricing breakdown, and reservation total.

### 💳 3. Secure Razorpay Payment Integration
- **Order Generation & Verification**: Server-side Razorpay order creation (`/api/payments/create-order`) and cryptographic signature verification (`/api/payments/verify-payment`).
- **Instant Booking Confirmation**: Automatically updates trip status to `SCHEDULED` upon successful transaction.

### 💼 4. Vendor Partner Portal
- **Package Management Dashboard**: Travel vendors can publish, inspect, and remove package offerings in real-time.
- **Role-Based Controls**: Dedicated dashboard and permissions for vendors.

### 📑 5. Automated PDF Invoices & Email Notifications
- **iText PDF Invoice Generator**: Instant PDF invoice creation featuring breakdown of taxes, itinerary, and booking details.
- **Spring Mail SMTP Service**: Automated booking confirmation emails and login security alerts sent to user inboxes.

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | **React 18**, **Vite 5** | High-performance single page application framework |
| **Hosting & CDN** | **Cloudflare Pages** | Global edge distribution & deployment ([safarsathi.pages.dev](https://safarsathi.pages.dev/)) |
| **Styling & Motion** | **TailwindCSS**, **Framer Motion** | Glassmorphic visual components & fluid transitions |
| **Icons & Assets** | **Lucide React** | Modern vector icons |
| **Backend Engine** | **Java 21**, **Spring Boot 3.5.7** | RESTful web services & business logic orchestration |
| **Security & Auth** | **Spring Security**, **JWT (JJWT)** | Stateless token-based authentication & RBAC |
| **ORM & Database** | **Spring Data JPA**, **Hibernate**, **MySQL** | Relational persistence & database migrations |
| **Payment Gateway** | **Razorpay Java SDK** | Real-time payment processing & verification |
| **PDF Generation** | **iText 7** | Dynamic PDF receipt and invoice rendering |
| **Email Service** | **Spring Mail (JavaMailSender)** | SMTP notification & verification system |
| **Documentation** | **Springdoc OpenAPI / Swagger UI** | Automated REST API documentation |

---

## 🏗️ Architecture & System Design

```
+-----------------------------------------------------------------------+
|                            SAFARSAATHI CLIENT                         |
|        (Cloudflare Pages Deployment: https://safarsathi.pages.dev)    |
|                     (React 18 + Vite + TailwindCSS)                   |
+-----------------------------------------------------------------------+
                                   |
                         HTTP REST / JSON / JWT
                                   v
+-----------------------------------------------------------------------+
|                        SPRING BOOT BACKEND ENGINE                     |
|                                                                       |
|  +-------------------+   +--------------------+   +----------------+  |
|  | Auth & Security   |   | Package Controller |   | Hotel/Villa    |  |
|  | (JWT + Spring Sec)|   | & Service          |   | Controller     |  |
|  +-------------------+   +--------------------+   +----------------+  |
|            |                       |                      |           |
|  +-------------------+   +--------------------+   +----------------+  |
|  | Payment Service   |   | PDF Invoice Gen    |   | Email Service  |  |
|  | (Razorpay SDK)    |   | (iText 7)          |   | (JavaMail)     |  |
|  +-------------------+   +--------------------+   +----------------+  |
+-----------------------------------------------------------------------+
           |                         |                      |
           v                         v                      v
    +--------------+          +--------------+       +--------------+
    |   MySQL DB   |          | Razorpay API |       |  SMTP Server |
    +--------------+          +--------------+       +--------------+
```

---

## 📁 Repository Structure

```
SafarSathi/
├── Sample_Frontend/
│   └── scratch/
│       └── safar-saathi-web/          # React 18 + Vite Frontend Application
│           ├── src/
│           │   ├── api/               # Axios Instance & Interceptors
│           │   ├── components/        # Layout, Navbar, Footer, Home Search
│           │   ├── context/           # AuthContext & State Management
│           │   ├── layouts/           # Main Layout & Glassmorphism Wrappers
│           │   ├── pages/             # Auth, Customer, Vendor & Hotel Pages
│           │   └── routes/            # React Router v6 & Protected Routes
│           ├── package.json           # Frontend Dependencies & Meta
│           └── vite.config.js         # Vite Configuration
│
└── springboot_backend_template/        # Spring Boot 3 Backend Service
    ├── src/
    │   └── main/
    │       ├── java/com/travel/
    │       │   ├── controllers/       # REST API Controllers (Auth, Package, Villa, Trip, Payment)
    │       │   ├── entities/          # JPA Entities (User, Trip, Packages, Hotel, Payment)
    │       │   ├── repositories/      # Spring Data Repositories
    │       │   ├── security/          # JWT Security & Auth Filters
    │       │   ├── services/          # Business Logic Services
    │       │   └── utils/             # iText PDF Invoice Generator
    │       └── resources/
    │           └── application.properties # Application Configuration
    └── pom.xml                        # Maven Dependencies & Build Setup
```

---

## 🚀 Getting Started

### Live Demo
Experience the live application deployed at: **[https://safarsathi.pages.dev/](https://safarsathi.pages.dev/)**

---

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **JDK**: Java 21 LTS
- **MySQL Server**: 8.0 or higher
- **Maven**: 3.8+ (or included `mvnw`)

---

### 1. Database Setup
Create the MySQL database:
```sql
CREATE DATABASE travelApp2;
```

Update `springboot_backend_template/src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/travelApp2?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

### 2. Backend Installation & Run
Navigate to the backend directory and launch Spring Boot:
```bash
cd springboot_backend_template
.\mvnw.cmd spring-boot:run
```
The backend API will start on **`http://localhost:8080`**.
Swagger UI API Docs: **`http://localhost:8080/swagger-ui/index.html`**

---

### 3. Frontend Installation & Run
Navigate to the frontend directory, install dependencies, and start Vite:
```bash
cd Sample_Frontend/scratch/safar-saathi-web
npm install
npm run dev
```
The web application will open on **`http://localhost:5173`**.

---

## 📡 REST API Reference

### 🔐 Authentication API
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new Customer or Vendor account | Public |
| `POST` | `/api/auth/login` | Authenticate user & return JWT Token | Public |

### 🌴 Travel Packages API
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/packages` | Fetch all available holiday packages | Public |
| `GET` | `/api/packages/{id}` | Get detailed package itinerary by ID | Public |
| `GET` | `/api/packages/search?query=...` | Search packages by keyword/destination | Public |
| `POST` | `/api/packages` | Create new travel package | Vendor / Admin |
| `DELETE` | `/api/packages/{id}` | Delete package by ID | Vendor / Admin |

### 🏨 Stayinn Hotels & Villas API
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/villas` | List luxury hotels & stayinn villas | Public |
| `GET` | `/api/villas/{id}` | Get detailed villa stay & amenities | Public |
| `GET` | `/api/villas/search?location=...` | Search villas by city/location | Public |

### 💳 Payments & Trips API
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips/{userId}` | Create new trip booking reservation | Authenticated |
| `POST` | `/api/payments/create-order` | Generate Razorpay order ID | Authenticated |
| `POST` | `/api/payments/verify-payment` | Cryptographically verify payment & confirm trip | Authenticated |

---

## 👤 Author & Maintainer

Developed with ❤️ by **[Jayesh Karadkhele](https://github.com/Jayesh-karadkhele)**

- **Live Demo**: [https://safarsathi.pages.dev/](https://safarsathi.pages.dev/)
- **GitHub Profile**: [@Jayesh-karadkhele](https://github.com/Jayesh-karadkhele)
- **Repository**: [https://github.com/Jayesh-karadkhele/SafarSathi](https://github.com/Jayesh-karadkhele/SafarSathi)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
