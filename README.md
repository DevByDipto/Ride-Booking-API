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
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT Authentication & Google OAuth
- Language: TypeScript


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
│   └── notFount.ts
│   └── paginateMiddleware.ts
│   └── validateRequest.ts  
│
├── modules/
│   ├── auth/             # login/signup routes
│   ├── rides/            # ride CRUD and logic
│   ├── users/            # user management
│   └── drivers/          # driver management
│   └── ride/             # ride management
│
├── utils/
│   └── sendResponse.ts       # standard API response helper
│   └── appError.ts
│   └── catchAsync.ts
│   └── cookies.ts
│   └── jwt.ts
│   └── paginate.ts
│   └── userToken.ts 
│
├── server.ts              # App entry point
└── app.ts                # Express app setup

```
---

 <h2>📬 API Endpoints</h2>
 <h3>👤 User Routes</h3>
<table border="1" cellpadding="5" cellspacing="0"> 
 <tr> <th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th><th>Role</th> </tr>
 <tr> <td>POST</td> <td>/api/user/register</td> <td>Create new user (Register)</td> <td>❌</td> <td>-</td> </tr>
 <tr> <td>GET</td> <td>/api/user</td> <td>Get all users</td> <td>✅</td> <td>Admin</td> </tr> 
 <tr> <td>PATCH</td> <td>/api/user/:id/updateAdmin</td> <td>Update user to Admin</td> <td>✅</td> <td>Admin</td> </tr>
 <tr> <td>GET</td> <td>/api/user/me</td> <td>Get own profile</td> <td>✅</td> <td>Admin, Rider, Driver</td> </tr> 
</table>

<h3>🚗 Driver Routes</h3>
<table border="1" cellpadding="5" cellspacing="0"> <tr> <th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th><th>Role</th> </tr> <tr> <td>GET</td> <td>/api/driver</td> <td>Get all drivers</td> <td>✅</td> <td>Admin</td> </tr> <tr> <td>GET</td> <td>/api/driver/:driverId</td> <td>Get driver by ID</td> <td>✅</td> <td>Driver</td> </tr> <tr> <td>PATCH</td> <td>/api/driver/:driverId/approval-status</td> <td>Update driver approval status</td> <td>✅</td> <td>Admin</td> </tr> <tr> <td>PATCH</td> <td>/api/driver/:driverId</td> <td>Update driver profile</td> <td>✅</td> <td>Driver</td> </tr> </table>

<h3>🧍‍♂️ Rider Routes</h3>
<table border="1" cellpadding="5" cellspacing="0"> 
 <tr> <th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th><th>Role</th> </tr> 
 <tr> <td>GET</td> <td>/api/rider</td> <td>Get all riders</td> <td>✅</td> <td>Admin</td> </tr>
 <tr> <td>GET</td> <td>/api/rider/:id</td> <td>Get rider by ID</td> <td>✅</td> <td>Rider</td> </tr> 
 <tr> <td>GET</td> <td>/api/rider?isBlocked=true</td> <td>Get all blocked riders</td> <td>✅</td> <td>Admin</td> </tr>
 <tr> <td>PATCH</td> <td>/api/rider/:id</td> <td>Update rider by ID</td> <td>✅</td> <td>Admin, Rider</td> </tr>
</table>

<h3>🚕 Ride Routes</h3>
<table border="1" cellpadding="5" cellspacing="0">
 <tr> <th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th><th>Role</th> </tr>
 <tr> <td>POST</td> <td>/api/ride</td> <td>Create a new ride</td> <td>✅</td> <td>Rider</td> </tr> 
 <tr> <td>GET</td> <td>/api/ride</td> <td>Get all rides</td> <td>✅</td> <td>Admin, Rider, Driver</td> </tr>
 <tr> <td>GET</td> <td>/api/ride/:id</td> <td>Get ride by ID</td> <td>✅</td> <td>Admin, Rider, Driver</td> </tr> 
 <tr> <td>PATCH</td> <td>/api/ride/:id</td> <td>Update ride by ID</td> <td>✅</td> <td>Rider, Driver</td> </tr>
</table>

 <h3>🔐 Auth Routes</h3>
<table border="1" cellpadding="5" cellspacing="0">
 <tr> <th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th><th>Role</th> </tr>
 <tr> <td>GET</td> <td>/api/auth/google-login</td> <td>Login with Google (OAuth Redirect)</td> <td>❌</td> <td>-</td> </tr>
 <tr> <td>POST</td> <td>/api/auth/login</td> <td>Login with email & password</td> <td>❌</td> <td>-</td> </tr>
 <tr> <td>POST</td> <td>/api/auth/refresh-token</td> <td>Generate new access token using refresh token</td> <td>✅</td> <td>-</td> </tr>
 <tr> <td>POST</td> <td>/api/auth/logout</td> <td>Logout user</td> <td>❌</td> <td>-</td> </tr>
</table>
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
#### 🧪 Testing
You can test the API using [Postman](https://www.postman.com) Use the Bearer token in headers to access protected routes:
```
Authorization: Bearer <your_jwt_token>
```

