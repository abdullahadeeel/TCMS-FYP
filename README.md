# TCMS - Timetable Management System v2.0

TCMS is a feature-rich, enterprise-grade Timetable Management System designed for educational institutions. It features a stunning **Glassmorphism UI**, role-based access control, and a fully containerized architecture.

## 🚀 Quick Start (Docker)

The easiest way to get the entire system running is using Docker Compose.

1.  **Clone the repository** (if you haven't already).
2.  **Run the following command** in the project root:
    ```bash
    docker compose up --build
    ```
3.  **Access the application**:
    -   **Frontend:** [http://localhost:5173](http://localhost:5173)
    -   **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)

## 🔑 Default Credentials

The system comes pre-initialized with an Administrator account. You can create Teacher and Student accounts via the **Register** page.

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `admin` |
| **Teacher** | (Register an account) | (Your choice) |
| **Student** | (Register an account) | (Your choice) |

## ✨ Features

### 💎 Design & UI
- **Glassmorphism Aesthetic:** Modern blur effects, refined gradients, and smooth Framer Motion animations.
- **Responsive Dashboard:** A persistent sidebar navigation with a tailored experience for every user role.
- **Analytics Cards:** Immediate overview of system stats (Classes, Rooms, Pending Requests).

### 🛠️ Functionality
- **Admin Control Panel:**
    - Manage System Users (View/Delete).
    - Manage Classrooms (Add/View Room Numbers, Capacity, Locations).
    - Manage Subjects (Add/View Curriculum Codes and Names).
    - Timetable Authority (Schedule classes, link teachers, and resolve conflicts).
    - Approvals Center (Review, Approve, or Reject timetable change requests).
- **Teacher Portal:**
    - View personalized timetable.
    - Submit **Change Requests** (Request a new time or room for a specific class with a reason).
    - View classroom availability.
- **Student View:**
    - Access a clean, read-only view of the academic schedule.

## 🏗️ Architecture

- **Frontend:** React.js, Vite, Framer Motion, Axios (with centralized interceptors).
- **Backend:** Node.js, Express, JWT Authentication, Bcrypt hashing.
- **Database:** PostgreSQL 15 (Relational schema).
- **Infrastructure:** Docker, Docker Compose.

## 📂 Project Structure

```text
├── backend/            # Express API and Controllers
├── frontend/           # React Frontend (Vite)
├── docker-compose.yml  # Orchestration
├── init-db.sql        # Automated DB & Admin initialization
└── README.md           # This file
```

## 🛠️ Manual Development Setup

If you prefer to run the services without Docker:

### 1. Database
Ensure PostgreSQL is running and create a database named `tcms_db`. Run the contents of `init-db.sql` to setup the tables and admin user.

### 2. Backend
```bash
cd backend
npm install
npm start
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

---
*Developed with ❤️ as a feature-rich solution for Timetable Management.*
