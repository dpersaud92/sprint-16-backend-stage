# 🛠️ Sprint 16: NewsExplorer (Backend API)

This is the backend API for the **NewsExplorer** project, developed as part of the final capstone at the **TripleTen Software Engineering Bootcamp**. It powers user registration, login, authentication, and personalized article storage for the frontend client.

---

## 📌 Key Features

- ✅ User registration and login with **JWT-based auth**
- 🔐 Secure password storage using **bcrypt**
- 📄 Store and retrieve **user-specific articles**
- 📬 Full **REST API** built with **Express.js**
- 🧪 Input validation using **Celebrate/Joi**
- 💥 Centralized error handling and response formatting
- 🌍 CORS and environment-based config support

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **JWT** for secure authentication
- **Celebrate/Joi** for request validation
- **dotenv** for environment configuration

---

## 📁 Folder Structure

se_project_express/
├── controllers/ # Logic for users and articles
├── middlewares/ # Auth, error handling, validators
├── models/ # Mongoose schemas
├── routes/ # API endpoints
├── utils/ # Constants and helpers
├── app.js # Main application setup
├── index.js # Entry point
└── .env # Environment variables (not committed)
