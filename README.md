 Task Management System (MERN Stack)

A full-stack role-based task management system built using the MERN stack.  
This project demonstrates authentication, authorization, CRUD operations, and a simple frontend to interact with APIs.

---

##  Features

###  Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt

###  Role-Based Access
- Admin and User roles
- Admin can view all users
- Admin can manage all users' tasks
- Users can only manage their own tasks

###  Task Management (CRUD)
- Create tasks
- View tasks
- Delete tasks
- Admin can view tasks of any user

---

##  Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcryptjs

### Frontend
- React.js
- Axios
- React Router DOM

---

##  Project Structure
backend/
├── controller/
├── models/
├── routes/
├── middleware/
├── config/
├── server.js

frontend/
├── pages/
├── App.jsx
├── main.jsx


---

##  Setup Instructions
### --Backend Setup
cd backend
npm install
nodemon server.js

###--frontend setup
cd frontend
npm install
npm run dev

PORT=5000
MONGO_URI=mongodb+srv://Mango:alooleeloo@cluster0.ehktz0j.mongodb.net/
DB_NAME=TaskFlow
JWT_SECRET=7f3c9a1d8b6e4f2c9d0a1b7e8f6c3d9a5b2e1f4c8d7a6b9c0d1e2f3a4b5c6d7

###--API Endpoints
# Auth Routes
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
# Task Routes
GET /api/v1/tasks
POST /api/v1/tasks
DELETE /api/v1/tasks/:id
# Admin Routes
GET /api/v1/admin/users
GET /api/v1/admin/tasks/:userId

####
##  Admin Login (For Testing)

Use the following credentials to test admin access:

Email: admin@example.com  
Password: admin1234

###  Clone Repository
```bash id="clone_cmd"
git clone https://github.com/extreme2475/TaskFlow
cd your-repo


