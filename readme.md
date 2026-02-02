# To-Do App

A simple and clean to-do application built to explore a modern full-stack setup using **Bun** on the backend and **React** on the frontend.  
The focus is on clear structure, predictable behavior, and a smooth developer experience.

---

## Features

- User authentication
- Create, update, delete tasks
- Mark tasks as completed or pending
- Tasks grouped by date
- Responsive, minimal UI
- Cookie-based authentication

---

## Tech Stack

**Backend**
- Bun
- PostgreSQL
- Drizzle ORM
- JWT (access + refresh tokens)

**Frontend**
- React
- Tailwind CSS
- React Router
- React Hot Toast

---

## Getting Started

### Backend
```bash
bun install
bunx drizzle-kit generate
bunx drizzle-kit migrate
bun run dev
````

Make sure PostgreSQL is running and environment variables are set.

### Frontend

```bash
npm install
npm run dev
```

---

## Environment Variables

Backend:

```env
DATABASE_URL=mysql://test_user:test_pass@localhost:3306/test_db

ACCESS_SECRET=this_is_a_secret
REFRESH_SECRET=this_is_a_secret_refresh
NODE_ENV=development

PORT=3000
ALLOWED_ORIGIN="http://localhost:5173"
```

Frontend:

```env
VITE_BACKEND_URL=http://localhost:3000
```

---
## Docker setup:

To dockeize the app:

```bash
cd backend/
docker build -t to-do-backend:1.0.0 .

cd ..
cp backend/.env .env

cd frontend/
bun run build
docker build -t to-do-frontend:1.0.0 .

cd ..
docker compose up -d
```

Now you can visit website at `http://localhost:80`

---

## Notes

This project is intentionally kept simple.
It’s not a framework demo or a template — just a practical implementation of a full-stack to-do app with modern tooling.

---

## Author

Created by **Shivendra Devadhe**