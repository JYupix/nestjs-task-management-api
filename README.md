<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">🚀 Tasks Management API</h1>

<p align="center">
  <strong>Production-ready REST API with JWT authentication, role-based authorization, and enterprise-grade security</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</p>

---

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/JYupix/nestjs-task-management-api.git
cd nestjs-task-management-api

# 2. Install dependencies
npm install

# 3. Configure environment (copy .env.example to .env and fill values)
cp .env.example .env

# 4. Run database migrations
npx prisma migrate dev

# 5. Start development server
npm run start:dev

# 6. Open Swagger Documentation
# http://localhost:3000/api/docs
```

---

## ✨ Key Features

### 🔐 **Security & Authentication**
- ✅ **JWT Authentication** with Passport strategies (Local + JWT)
- ✅ **Role-Based Access Control** (USER, ADMIN)
- ✅ **Password encryption** with bcrypt
- ✅ **Helmet security** - 15 HTTP security headers
- ✅ **CORS enabled** - Frontend-ready
- ✅ **User isolation** - Users only access their own data

### 📊 **Monitoring & Reliability**
- ✅ **Health check endpoint** - `/api/health` with database connection status
- ✅ **Professional logging** - Request/error tracking with NestJS Logger
- ✅ **Global exception filter** - Consistent error responses
- ✅ **Request validation** - DTO validation with class-validator

### 📚 **Developer Experience**
- ✅ **Interactive API documentation** - Swagger/OpenAPI with Try it out
- ✅ **Type-safe database** operations with Prisma ORM
- ✅ **Modular architecture** - Clean separation of concerns
- ✅ **Environment configuration** - `.env.example` template included

### 🎯 **Core Functionality**
- ✅ **Task Management** - Full CRUD with filtering and search
- ✅ **User Management** - Admin-only user operations
- ✅ **Authentication** - Register and login endpoints
- ✅ **Authorization** - Protected routes with guards

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | NestJS | 11.0.1 |
| **Language** | TypeScript | 5.7.3 |
| **Database** | PostgreSQL | Latest |
| **ORM** | Prisma | 7.2.0 |
| **Authentication** | Passport JWT | 4.0.1 |
| **Validation** | class-validator | 0.14.3 |
| **Documentation** | Swagger | 11.2.4 |
| **Security** | Helmet | Latest |

---

## 📖 API Documentation

### Interactive Documentation
Access the full interactive API documentation at:
```
http://localhost:3000/api/docs
```

### Main Endpoints

#### 🔓 Public Endpoints
```http
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login and get JWT token
GET    /api/health           # Health check endpoint
```

#### 🔐 Protected Endpoints (Require JWT)
```http
GET    /api/tasks            # Get all user tasks (with filters)
GET    /api/tasks/:id        # Get task by ID
POST   /api/tasks            # Create new task
PATCH  /api/tasks/:id        # Update task
DELETE /api/tasks/:id        # Delete task
```

#### 👑 Admin Only Endpoints
```http
GET    /api/users            # Get all users
GET    /api/users/:id        # Get user by ID
POST   /api/users            # Create user (can set role)
PATCH  /api/users/:id        # Update user
DELETE /api/users/:id        # Delete user
```

---

## 🔐 Security Features

### Helmet Security Headers
The API includes 15+ security headers via Helmet:
- `Content-Security-Policy` - Prevents XSS attacks
- `X-Frame-Options` - Prevents clickjacking
- `Strict-Transport-Security` - Forces HTTPS
- `X-Content-Type-Options` - Prevents MIME sniffing
- And more...

### Authentication Flow
1. User registers or logs in → Receives JWT token
2. Include token in requests: `Authorization: Bearer <token>`
3. Server validates token and extracts user info
4. Access granted based on role (USER/ADMIN)

### Data Isolation
- Users can only access their own tasks
- Attempting to access other users' data returns `403 Forbidden`
- Admin users have full access to manage all users

---

## 📊 Health Monitoring

### Health Check Endpoint
```http
GET /api/health
```

**Response (Healthy):**
```json
{
  "status": "ok",
  "timestamp": "2026-01-09T17:30:00.000Z",
  "uptime": 123.45,
  "database": "connected"
}
```

Use this endpoint for:
- Docker health checks
- Kubernetes liveness/readiness probes
- Load balancer health checks
- Monitoring tools (Datadog, New Relic)

---

## 🚀 Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── strategies/          # Passport strategies (Local, JWT)
│   ├── guards/              # Auth guards (JWT, Roles, Local)
│   ├── decorators/          # Custom decorators (@CurrentUser, @Roles)
│   └── dto/                 # Login, Register DTOs
├── users/                   # User management (Admin only)
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
├── tasks/                   # Task management
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── dto/
├── health/                  # Health check endpoint
│   ├── health.controller.ts
│   └── health.service.ts
├── prisma/                  # Prisma configuration
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── common/                  # Shared resources
│   └── filters/             # Global exception filter
└── main.ts                  # Application entry point
```

---

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Encrypted with bcrypt
  name      String
  role      UserRole @default(USER)
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Task Model
```prisma
model Task {
  id          String      @id @default(uuid())
  title       String
  description String
  status      TaskStatus  @default(PENDING)
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

---

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/taskdb"

# JWT
JWT_SECRET="your-super-secret-key-change-this"

# Server
PORT=3000
```

---

## 📝 Available Scripts

```bash
# Development
npm run start:dev          # Start with hot-reload

# Production
npm run build              # Build for production
npm run start:prod         # Run production build

# Database
npx prisma migrate dev     # Run migrations
npx prisma studio          # Open Prisma Studio (DB GUI)
npx prisma generate        # Generate Prisma Client

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format with Prettier
```

---

## 🎯 What Makes This Project Stand Out

### ✅ Production-Ready
- Global exception handling
- Professional logging system
- Health checks for monitoring
- Security headers with Helmet
- Environment-based configuration

### ✅ Developer-Friendly
- Complete Swagger documentation
- Type-safe with TypeScript
- Clean, modular architecture
- Validation on all inputs
- Consistent error responses

### ✅ Secure by Design
- JWT authentication
- Role-based authorization
- Password encryption
- User data isolation
- 15+ security headers

### ✅ Best Practices
- SOLID principles
- Clean Code
- Separation of concerns
- DTO validation
- Error handling

---

## 🤝 Contributing

This is a portfolio project, but feel free to:
- Report bugs
- Suggest improvements
- Fork and create your own version

---

## 📄 License

This project is [MIT licensed](LICENSE).

---

## 👤 Author

**JYupix**

- GitHub: [@JYupix](https://github.com/JYupix)
- Project: [nestjs-task-management-api](https://github.com/JYupix/nestjs-task-management-api)

---

<p align="center">Made with ❤️ using NestJS</p>
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
git clone https://github.com/JYupix/nestjs-task-management-api.git
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
