# 🔐 Authentication System

A full-stack Authentication System built with modern web technologies. This project provides a reusable boilerplate for user authentication features like registration, login, logout, and profile management.

---

## 🚀 Features

- User Registration (Sign Up)
- User Login (Sign In)
- User Logout
- Protected Profile Route
- JWT-based Authentication
- Password Hashing (bcrypt)
- Clean and scalable folder structure
- Ready for production-level extension

---

## 🛠️ Tech Stack

### Frontend

- Next.js (React)
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon / Any SQL DB)
- JWT (JSON Web Token)
- bcrypt

---

## 📁 Project Structure

```
Authentication-System/
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   └── server.js
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Rahulmkd/Authentication-System.git
cd Authentication-System
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=4000
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Start backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 API Endpoints

### Auth Routes

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| POST   | `/api/v1/auth/register` | Register user                  |
| POST   | `/api/v1/auth/login`    | Login user                     |
| POST   | `/api/v1/auth/logout`   | Logout user                    |
| GET    | `/api/v1/auth/profile`  | Get user profile _(Protected)_ |

---

## 📦 Environment Variables

### Backend `.env`

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

---

## 🧠 Future Improvements

- [ ] Email verification
- [ ] Forgot password flow
- [ ] OAuth (Google / GitHub login)
- [ ] Role-based access control (Admin/User)
- [ ] Refresh token system

---

## 📸 Screenshots (Optional)

> Add UI screenshots here

---

## 👨‍💻 Author

- GitHub: [Rahulmkd](https://github.com/Rahulmkd)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
