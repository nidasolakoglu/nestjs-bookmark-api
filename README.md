📌 NestJS Bookmark API

A RESTful API built with NestJS, Prisma, and PostgreSQL that allows authenticated users to manage bookmarks.

This project demonstrates a typical backend architecture with NestJS, including JWT authentication, database management with Prisma, and end-to-end testing.

✨ Features

🔐 JWT Authentication

👤 User signup & signin

🔖 Bookmark CRUD operations

👥 User-specific bookmarks

✅ Request validation with class-validator

🧪 End-to-end testing with Pactum

🗄 Database management with Prisma ORM

🛠 Tech Stack
Backend

NestJS

TypeScript

Prisma ORM

PostgreSQL

Authentication

JWT

Passport

Guards

Custom decorators

Testing

Pactum

Jest

📂 Project Structure
src
 ├── auth
 │   ├── dto
 │   ├── guard
 │   ├── strategy
 │   └── auth.service.ts
 │
 ├── bookmark
 │   ├── dto
 │   ├── bookmark.controller.ts
 │   └── bookmark.service.ts
 │
 ├── user
 │   ├── dto
 │   ├── user.controller.ts
 │   └── user.service.ts
 │
 ├── prisma
 │   └── prisma.service.ts
 │
 └── app.module.ts
🔑 Authentication Flow

Authentication works using JWT tokens.

Client
 → JwtGuard
 → JWT Strategy
 → Controller
 → Service
 → Prisma
 → Database

Example request header:

Authorization: Bearer <JWT_TOKEN>
⚙️ Installation

Clone the repository

git clone https://github.com/nidasolakoglu/nestjs-bookmark-api.git

Go into the project

cd nestjs-bookmark-api

Install dependencies

npm install
🔧 Environment Variables

Create a .env file:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/bookmarkdb"
JWT_SECRET="super-secret"
🗄 Prisma Setup

Generate Prisma client

npx prisma generate

Run migrations

npx prisma migrate dev
🚀 Run the Application

Start development server

npm run start:dev

Server will run at

http://localhost:3000
📡 API Endpoints
Auth
POST /auth/signup
POST /auth/signin
User
GET /users/me
PATCH /users
Bookmarks
POST /bookmarks
GET /bookmarks
GET /bookmarks/:id
PATCH /bookmarks/:id
DELETE /bookmarks/:id
🧪 Running Tests

Run end-to-end tests

npm run test:e2e
👩‍💻 Author

Nida Solakoğlu
