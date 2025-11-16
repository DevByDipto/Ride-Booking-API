# 🚖 Ride Booking Backend

A robust **Node.js + Express.js** backend for a **Ride Booking System**, featuring **JWT authentication**, **role-based access**, and **MongoDB integration**.

---

## 📖 Table of Contents

- [live-link](https://ride-booking-server-rust.vercel.app)
- [Frontend-repo-link](https://github.com/DevByDipto/Ride-Booking-Client)
- [Frontend-live-link](https://lively-ganache-03dd6f.netlify.app/)


---

## 🚀 Project Overview

This backend powers a **Ride Booking Platform** that supports **Admin**, **Rider**, and **Driver** roles.  
It provides secure authentication, ride management, and role-based APIs for managing users and rides.

---

## ⚙️ Features

✅ **User Authentication** (JWT-based)  
✅ **Role-Based Access Control** (Admin, Rider, Driver)  
✅ **CRUD Operations** for rides, users, and drivers  
✅ **Driver Assignment System**  
✅ **Ride History and Status Tracking**  
✅ **Error Handling Middleware**  
✅ **Protected Routes with Token Verification**  
✅ **Secure Password Hashing (bcrypt)**  
✅ **CORS and Environment Config Support**

---

## 🧰 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **bcrypt**
- **dotenv**
- **cors**

---

## 📁 Folder Structure

```text
src/
├── config/
│   ├── db.ts             # MongoDB connection
│   └── env.ts            # Environment variable setup
│
├── middlewares/
│   ├── auth.ts           # JWT verification middleware
│   └── errorHandler.ts   # Global error handler
│
├── modules/
│   ├── auth/             # login/signup routes
│   ├── rides/            # ride CRUD and logic
│   ├── users/            # user management
│   └── drivers/          # driver management
│
├── utils/
│   └── response.ts       # standard API response helper
│
├── index.ts              # App entry point
└── app.ts                # Express app setup

```
 <h2>📬 API Endpoints</h2>
 
---
### Setup instructions
#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ride-booking-backend.git
cd ride-booking-backend
```
#### 2️⃣ Install Dependencies
```bash
npm install
```
#### 3️⃣ Configure Environment Variables
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>.nc8opzq.mongodb.net/<username>?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development

#auth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
SESSION_SECRET=your-random-session-secret

SALT=10

JWT_ACCESS_SECRET=secret
JWT_REFRESH_SECRET=secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_EXPIRES=1d



```
#### 4️⃣ Run the Development Server
```
npm run dev
```
---
