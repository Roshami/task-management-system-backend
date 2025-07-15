# 💾 Backend - Task Management System

This is the **backend API** for the Custom Task Management Web App designed for both **personal use** and **company-based task management**. It is built with **Node.js**, **Express.js**, and **MongoDB**. It supports user registration with email OTP verification, JWT authentication, and role-based access control.

---

## 📖 Features

- User Registration with Email OTP Verification (Nodemailer)
- JWT Authentication for secure login sessions
- Role-based access: Personal, Company Admin, Company User
- Task CRUD operations with user-based permission control
- Company and User model linkage
- Input validation and error handling
- MongoDB for data persistence

---

## 👥 User Roles

### 1. Personal User
- Can manage their own tasks (CRUD)

### 2. Company Admin
- Can manage users and tasks within their company
- Can assign tasks to other users

### 3. Company User
- Can view, edit, search, and filter their own assigned tasks only

---

## 🚀 Tech Stack
- **Node.js** v20.18.0
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Nodemailer** for sending OTP emails

---

## 🚫 Environment Variables
Create a `.env` file in the `server/` directory:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AUTH_EMAIL=your_email@example.com
AUTH_PASSWORD=your_email_app_password
CLIENT_URL=http://localhost:3000
```

---

## 📊 Installation & Running

### 1. Clone the Repository
```bash
git clone https://github.com/Roshami/task-management-system-backend.git
cd task-management-system-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

Server will start on [http://localhost:3000](http://localhost:3000) or your configured port.

---

## 🌐 Live Backend
- Hosted on: [https://task-management-system-backend-azxm.onrender.com](https://task-management-system-backend-azxm.onrender.com)

---

## 💼 Author
**Roshami Thashmantha**
- GitHub: [https://github.com/Roshami](https://github.com/Roshami)

---

> This backend pairs with the React frontend located at: [https://github.com/Roshami/task-management-system-frontend.git](https://github.com/Roshami/task-management-system-frontend.git)

