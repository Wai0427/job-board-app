# Mini Job Board Application

This is a full-stack job board application built with **Laravel (Backend)** and **React (Frontend)**. It supports two user roles: Employers and Applicants.

---

## 📁 Project Structure

```
mini-job-board/
├── backend/     # Laravel backend
├── frontend/    # React frontend (Tailwind CSS)
└── README.md
```

---

## 🚀 Tech Stack

### Backend (Laravel)
- Laravel 12
- Sanctum (Authentication)
- MySQL
- RESTful API

### Frontend (React)
- React (Create React App)
- Axios (for API calls)
- React Router DOM (routing)
- Tailwind CSS (UI styling)


---

## 🛠️ Setup Instructions

### Backend (Laravel)
1. Go to the `backend/` directory
2. Copy `.env.example` to `.env` and update DB credentials (*If using Laravel 12, can direct use sqlite for quick test on Apps)
3. Run below commands
    **seed commands to generate an account for each employer and applicant role to quick test
    ** - Employer account (Email: emp@gmail.com, Password: 123)
    ** - Applicant account (Email: app@gmail.com, Password: 123)
```bash
composer install
php artisan migrate --seed 
php artisan serve
```

### Frontend (React)
1. Go to the `frontend/` directory
2. Run:
```bash
npm install
npm start
```

> React will run on `http://localhost:3000` and Laravel API on `http://localhost:8000`

Ensure CORS is configured correctly in Laravel.

---

## 🧪 API Testing

- A Postman collection is included in the project root directory as:
  `MiniJobBoard.postman_collection.json`

It contains:
- Auth (Register / Login)
- Job CRUD (Employer)
- Application submission/view (Applicant)

> Import this file into Postman to test all endpoints easily.
> After request name "show_employer_joblist_after_delete+edit" (Employer), 
    go through the Applicant part for applying job, 
    then you will see the rest of Employer request for showing the applied record of employer's job. 

---

By Weng Wai (Sean)

Feel free to fork or contribute!
