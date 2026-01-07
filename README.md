<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" width="120" alt="Prisma Logo" /></a>
</p>

<h1 align="center">🚀 Tasks API - NestJS + Prisma + JWT</h1>

<p align="center">
  A professional RESTful API for task management with JWT authentication, role-based authorization, and comprehensive API documentation
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</p>

---

## 📋 Table of Contents

- [Description](#-description)
- [Features](#-features)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Running the App](#-running-the-app)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Authorization & Roles](#-authorization--roles)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)

---

## 📋 Description

A production-ready task management API built with modern technologies and best practices. This project demonstrates:

- 🔐 **JWT Authentication** with Passport strategies
- 🛡️ **Role-Based Access Control** (RBAC)
- 📚 **Auto-generated API Documentation** with Swagger/OpenAPI
- 🗄️ **Type-safe database** operations with Prisma ORM
- ✅ **DTO validation** with class-validator
- 🏗️ **Modular architecture** following NestJS best practices

---

## ✨ Features

### Security
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes with Guards
- ✅ Role-based authorization (USER, ADMIN)
- ✅ User-specific resource filtering

### Functionality
- ✅ User registration and login
- ✅ CRUD operations for tasks
- ✅ Task filtering by status and title
- ✅ User management (Admin only)
- ✅ Automatic userId assignment

### Developer Experience
- ✅ Interactive API documentation (Swagger UI)
- ✅ Type-safe database operations
- ✅ Request validation with DTOs
- ✅ Structured error responses
- ✅ Environment-based configuration

---

## 🚀 Technologies

### Core
- **NestJS** `^11.0.1` - Progressive Node.js framework
- **Prisma** `^7.2.0` - Next-generation ORM
- **PostgreSQL** - Production-grade relational database
- **TypeScript** `^5.7.3` - Type-safe JavaScript

### Authentication & Security
- **Passport JWT** `^4.0.1` - JWT authentication strategy
- **Passport Local** `^1.0.0` - Local authentication strategy
- **bcrypt** `^6.0.0` - Password hashing
- **@nestjs/jwt** `^11.0.2` - JWT utilities

### Validation & Documentation
- **class-validator** `^0.14.3` - DTO validation
- **class-transformer** `^0.5.1` - Object transformation
- **@nestjs/swagger** - OpenAPI documentation

---

## 🏗️ Architecture

### Authentication Flow
```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Client    │─────▶│    Guards    │─────▶│ Controllers │
│  (JWT Token)│      │ - JwtGuard   │      │             │
└─────────────┘      │ - RolesGuard │      └─────────────┘
                     └──────────────┘             │
                            │                     ▼
                            ▼              ┌─────────────┐
                     ┌──────────────┐      │  Services   │
                     │ Strategies   │      └─────────────┘
                     │ - JWT        │             │
                     │ - Local      │             ▼
                     └──────────────┘      ┌─────────────┐
                                           │   Prisma    │
                                           │     ORM     │
                                           └─────────────┘
                                                  │
                                                  ▼
                                           ┌─────────────┐
                                           │ PostgreSQL  │
                                           └─────────────┘
```

### Modules Structure
```
AppModule
├── AuthModule (Authentication & JWT)
├── UsersModule (User management)
├── TasksModule (Task CRUD)
└── PrismaModule (Database connection)
```

---

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd SecondProject

# Install dependencies
npm install
```

---

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Server
PORT=3000

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

### Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# (Optional) Seed admin user
npm run seed
```

---

## 🏃 Running the App

```bash
# Development mode (with hot-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at:
- **API Base**: `http://localhost:3000/api`
- **Swagger Docs**: `http://localhost:3000/api/docs`

---

## 📚 API Documentation

### Swagger UI

Access the **interactive API documentation** at:

```
http://localhost:3000/api/docs
```

**Features:**
- 🔍 Explore all endpoints
- 🧪 Test requests directly from browser
- 🔐 Authenticate with JWT token
- 📋 View request/response schemas
- 💡 See example payloads

**How to authenticate in Swagger:**
1. Click the 🔓 **Authorize** button
2. Enter: `Bearer <your-jwt-token>`
3. Click **Authorize**
4. Now you can test protected endpoints

---

## 🔐 Authentication

### Register a New User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Using the Token

Include the token in the `Authorization` header for protected routes:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**JWT Payload:**
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "USER",
  "iat": 1704672000,
  "exp": 1704758400
}
```

---

## 🛡️ Authorization & Roles

### Available Roles

| Role | Description | Access |
|------|-------------|--------|
| `USER` | Default role for registered users | Own tasks only |
| `ADMIN` | Administrator with elevated permissions | All resources |

### Protected Routes

#### 🔓 Public Routes
- `POST /api/auth/register` - Anyone can register
- `POST /api/auth/login` - Anyone can login

#### 🔐 User Routes (Requires JWT)
- `GET /api/tasks` - Get own tasks
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update own task
- `DELETE /api/tasks/:id` - Delete own task

#### 👑 Admin Routes (Requires JWT + ADMIN role)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user with any role
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update any user
- `DELETE /api/users/:id` - Delete any user

### Security Features

✅ **User Isolation**: Users can only access their own tasks  
✅ **Role Validation**: Admin-only endpoints protected by `RolesGuard`  
✅ **Token Validation**: All protected routes require valid JWT  
✅ **Password Security**: Passwords hashed with bcrypt (salt rounds: 10)  
✅ **Automatic Assignment**: Tasks automatically assigned to authenticated user

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/api`

### 🔐 Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | Public | Register new user |
| `POST` | `/auth/login` | Public | Login user |

### ✅ Tasks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/tasks` | JWT | Get all tasks (filtered by user) |
| `GET` | `/tasks/:id` | JWT | Get task by ID (own task only) |
| `POST` | `/tasks` | JWT | Create new task |
| `PATCH` | `/tasks/:id` | JWT | Update task (own task only) |
| `DELETE` | `/tasks/:id` | JWT | Delete task (own task only) |

**Query Parameters:**
- `status` - Filter by status (`PENDING` or `COMPLETED`)
- `title` - Filter by title (case-insensitive partial match)

### 👥 Users (Admin Only)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/users` | JWT + ADMIN | Get all users |
| `GET` | `/users/:id` | JWT + ADMIN | Get user by ID |
| `POST` | `/users` | JWT + ADMIN | Create user with specific role |
| `PATCH` | `/users/:id` | JWT + ADMIN | Update user |
| `DELETE` | `/users/:id` | JWT + ADMIN | Delete user |

---

## 📝 Request & Response Examples

### Create a Task

**Request:**
```http
POST /api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "status": "PENDING"
}
```

**Success Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "status": "PENDING",
  "userId": "user-uuid-here",
  "createdAt": "2026-01-07T20:00:00.000Z",
  "updatedAt": "2026-01-07T20:00:00.000Z"
}
```

### Get All Tasks (with filters)

**Request:**
```http
GET /api/tasks?status=PENDING&title=documentation
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete documentation",
    "description": "Write comprehensive API documentation",
    "status": "PENDING",
    "userId": "user-uuid-here",
    "createdAt": "2026-01-07T20:00:00.000Z",
    "updatedAt": "2026-01-07T20:00:00.000Z"
  }
]
```

### Update Task Status

**Request:**
```http
PATCH /api/tasks/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "status": "COMPLETED"
}
```

**Success Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "status": "COMPLETED",
  "userId": "user-uuid-here",
  "createdAt": "2026-01-07T20:00:00.000Z",
  "updatedAt": "2026-01-07T21:00:00.000Z"
}
```

### Error Responses

**401 Unauthorized (Missing/Invalid JWT):**
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

**403 Forbidden (Insufficient Permissions):**
```json
{
  "message": "You do not have permission",
  "error": "Forbidden",
  "statusCode": 403
}
```

**404 Not Found:**
```json
{
  "message": "Task with ID 550e8400-e29b-41d4-a716-446655440000 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

**400 Bad Request (Validation Error):**
```json
{
  "message": [
    "title must be a string",
    "Title must not be empty"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed with bcrypt
  name      String
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  tasks     Task[]
}

enum UserRole {
  USER
  ADMIN
}
```

### Task Model
```prisma
model Task {
  id          String     @id @default(uuid())
  title       String
  description String
  status      TaskStatus @default(PENDING)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  userId      String
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

enum TaskStatus {
  PENDING
  COMPLETED
}
```

---

## 📁 Project Structure

```
src/
├── auth/                     # Authentication module
│   ├── decorators/           # Custom decorators
│   │   ├── current-user.decorator.ts
│   │   └── roles.decorator.ts
│   ├── dto/                  # Data transfer objects
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/               # Route guards
│   │   ├── jwt-auth.guard.ts
│   │   ├── local-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── interfaces/           # TypeScript interfaces
│   │   └── jwt-payload.interface.ts
│   ├── strategies/           # Passport strategies
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── prisma/                   # Database module
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── tasks/                    # Tasks module
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   ├── update-task.dto.ts
│   │   └── find-tasks.dto.ts
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   └── tasks.service.ts
├── users/                    # Users module
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── app.module.ts             # Root module
└── main.ts                   # Application entry point

prisma/
├── schema.prisma             # Database schema
└── migrations/               # Database migrations
```

---

## 📊 HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid data provided |
| 401 | Unauthorized - Missing or invalid JWT token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists (e.g., email) |
| 500 | Internal Server Error - Server error |

---

## 🛠️ Scripts

```bash
# Development
npm run start:dev          # Start with hot-reload

# Build
npm run build              # Build for production

# Production
npm run start:prod         # Run production build

# Database
npx prisma migrate dev     # Run migrations (dev)
npx prisma generate        # Generate Prisma Client
npx prisma studio          # Open Prisma Studio GUI
npm run seed               # Seed admin user

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run e2e tests
npm run test:cov           # Generate coverage report
```

---

## 🔧 Development Tips

### Testing with cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get Tasks (with JWT)
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create Task
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Do something","status":"PENDING"}'
```

### Environment Variables

For local development, you can use different env files:

```bash
# Development
.env.development.local

# Testing
.env.test.local

# Production
.env.production.local
```

---

## 📚 Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Passport JWT Strategy](http://www.passportjs.org/packages/passport-jwt/)
- [Swagger/OpenAPI](https://swagger.io/specification/)

---

## 📝 License

This project is [MIT licensed](LICENSE).

---

## 👤 Author

Built with ❤️ using NestJS, Prisma, and modern web technologies.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

<p align="center">
  <strong>⭐ Star this repository if you found it helpful!</strong>
</p>
