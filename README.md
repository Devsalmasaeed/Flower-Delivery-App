# 💐 Flower Delivery App

A full-stack flower delivery web application that allows users to browse, add to cart, and securely pay for flowers online. Includes a custom admin panel to manage flower listings and a Stripe-integrated checkout.

---

## 🌐 Live URLs

- **Frontend:** [https://flower-delivery-app-frontend.onrender.com](https://flower-delivery-app-frontend.onrender.com)
- **Admin Panel:** [https://flower-delivery-admin-khof.onrender.com](https://flower-delivery-admin-khof.onrender.com)
- **Backend API:** [https://backend-iq9m.onrender.com](https://backend-iq9m.onrender.com)

---

## 🚀 Features

### 🌸 User Frontend
- Browse flowers by categories
- View flower details
- Add to cart
- Secure Stripe payments
- User authentication (JWT-based)

### 🔐 Admin Panel
- Add new flowers (with image upload via Cloudinary)
- View and delete flower listings

### ⚙️ Backend (Node.js + Express + MongoDB)
- RESTful API for flowers and users
- Image storage via Cloudinary
- Secure routes using Passport.js (JWT)
- Stripe payment integration

---

## 🛠 Tech Stack

| Layer     | Tech                                 |
|-----------|--------------------------------------|
| Frontend  | React, React Router, Axios, CSS      |
| Backend   | Node.js, Express, MongoDB, Mongoose  |
| Auth      | JWT, Passport.js                     |
| Payments  | Stripe                               |
| Image Upload | Multer, Cloudinary                |
| Hosting   | Render (Frontend + Backend)          |

---

## 📁 Folder Structure

flower-delivery-app/
├── frontend/ # React customer-facing UI
├── admin/ # Admin panel for managing flowers
├── backend/ # Express backend API
