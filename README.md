# 🚖 Ride Booking Backend

A robust **Node.js + Express.js** backend for a **Ride Booking System**, featuring **JWT authentication**, **role-based access**, and **MongoDB integration**.

---

## 📖 Table of Contents

- [live-link](#project-overview)
- [Frontend-repo-link](#project-overview)
- [Frontend-live-link](#project-overview)


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
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/rideBooking
JWT_SECRET=your_jwt_secret_key
SALT=10
CLIENT_URL=http://localhost:5173
```
#### 4️⃣ Run the Development Server
```
npm run dev
```
---
