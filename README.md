<div align="center">

# 🚀 Task Management API

### Enterprise-grade REST API with JWT Authentication & Role-Based Access Control

<img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

**[Live API Documentation](http://localhost:3000/api/docs)**

</div>

---

## 💼 Project Overview

A **production-ready REST API** showcasing professional backend development with **modern architecture patterns**, **enterprise security**, and **clean code principles**. Built as a portfolio project demonstrating real-world industry standards.

### 🎯 Key Highlights
- ✅ Full authentication & authorization system (JWT + RBAC)
- ✅ Type-safe database operations with Prisma ORM
- ✅ Interactive API documentation (Swagger/OpenAPI)
- ✅ Production-level security (Helmet, CORS, bcrypt, Rate Limiting)
- ✅ Performance optimizations (Compression, Database Indexes)
- ✅ Professional logging & error handling
- ✅ Health monitoring endpoints
- ✅ Clean architecture & SOLID principles

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

### Backend Framework
- **NestJS** 11.0.1
- **TypeScript** 5.7.3
- **Node.js** (Latest LTS)

### Database & ORM
- **PostgreSQL** (Production DB)
- **Prisma** 7.2.0

### Authentication & Security
- **Passport** (JWT + Local strategies)
- **bcrypt** (Password hashing)
- **Helmet** (Security headers)

</td>
<td width="50%" valign="top">

### Validation & Documentation
- **class-validator**
- **class-transformer**
- **Swagger/OpenAPI**

### Architecture Patterns
- Modular Design
- Dependency Injection
- Repository Pattern
- Guards & Decorators
- DTO Pattern

</td>
</tr>
</table>

---

## ✨ Core Features

### 🔐 Authentication & Authorization
```typescript
✓ JWT Token Authentication (1-day expiration)
✓ Role-Based Access Control (USER, ADMIN)
✓ Secure password hashing with bcrypt
✓ Protected routes with Guards
✓ Custom decorators (@CurrentUser, @Roles)
```

### 🛡️ Enterprise Security
```typescript
✓ Helmet: 15+ HTTP security headers
✓ Rate Limiting: 20 requests/minute per IP (DDoS protection)
✓ CORS: Cross-origin resource sharing
✓ Data isolation: Users access only their resources
✓ Password exclusion: Never exposed in responses
✓ Input validation: DTO validation on all endpoints
```

### ⚡ Performance Optimizations
```typescript
✓ Gzip Compression: 70-90% smaller responses
✓ Database Indexes: 10-100x faster queries
✓ Optimized Prisma queries with select/include
✓ Connection pooling for database efficiency
```

### 📊 Production Features
```typescript
✓ Health Check: /api/health endpoint
✓ Global Exception Filter: Consistent error responses
✓ Professional Logging: Request/error tracking
✓ Environment Config: .env.example template
✓ API Documentation: Interactive Swagger UI
```

---

## 🚀 Quick Start

```bash
# 1️⃣ Clone repository
git clone https://github.com/JYupix/nestjs-task-management-api.git
cd nestjs-task-management-api

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# 4️⃣ Setup database
npx prisma migrate dev

# 5️⃣ Start development server
npm run start:dev

# ✅ API running at http://localhost:3000
# 📚 Swagger docs at http://localhost:3000/api/docs
```

---

## 📡 API Endpoints

### 🔓 Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login & get JWT token |
| `GET` | `/api/health` | Health check |

### 🔐 Protected Endpoints (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get user's tasks (supports filters) |
| `POST` | `/api/tasks` | Create new task |
| `PATCH` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

**Query Filters for GET /api/tasks:**
```http
GET /api/tasks?status=PENDING           # Filter by status
GET /api/tasks?title=homework           # Search by title (partial match)
GET /api/tasks?status=COMPLETED&title=project  # Combine filters
```

**Available filters:**
- `status`: `PENDING` | `COMPLETED` - Filter by task status
- `title`: `string` - Search tasks by title (case-insensitive partial match)

### 👑 Admin Only Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | List all users |
| `POST` | `/api/users` | Create user (assign roles) |
| `PATCH` | `/api/users/:id` | Update user |
| `DELETE` | `/api/users/:id` | Delete user |

📖 **Full interactive documentation:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🏗️ Architecture & Design

### Project Structure
```
src/
├── auth/               # Authentication module (JWT, Passport)
│   ├── strategies/     # Local & JWT strategies
│   ├── guards/         # JWT, Roles, Local guards
│   └── decorators/     # @CurrentUser, @Roles
├── users/              # User management (Admin only)
├── tasks/              # Task CRUD (User isolation)
├── health/             # Health monitoring
├── prisma/             # Database service
├── common/             # Global filters & pipes
└── main.ts             # App bootstrap
```

### Design Patterns
- ✅ **Modular Architecture** - Separated by domain
- ✅ **Dependency Injection** - NestJS IoC container
- ✅ **Guards & Decorators** - Clean authorization logic
- ✅ **DTO Pattern** - Request validation & documentation
- ✅ **Repository Pattern** - Database abstraction
- ✅ **SOLID Principles** - Maintainable & scalable code

---

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // bcrypt encrypted
  name      String
  role      UserRole @default(USER)  // USER | ADMIN
  tasks     Task[]
  
  @@index([email])   // Fast email lookups (login)
  @@index([role])    // Fast role filtering (admin queries)
}

model Task {
  id          String      @id @default(uuid())
  title       String
  description String
  status      TaskStatus  @default(PENDING)  // PENDING | COMPLETED
  userId      String
  user        User        @relation(fields: [userId])
  
  @@index([userId])          // Fast user task queries (10-50x faster)
  @@index([status])          // Fast status filtering
  @@index([userId, status])  // Combined queries (100x faster)
  @@index([createdAt])       // Sorting by date
}
```

---

## 🔐 Security Implementation

| Feature | Implementation | Purpose |
|---------|---------------|---------|
| **Authentication** | JWT + Passport | Stateless token-based auth |
| **Authorization** | RBAC Guards | Role-based access control |
| **Rate Limiting** | 20 req/min per IP | DDoS protection |
| **Password Security** | bcrypt (10 rounds) | Secure password hashing |
| **Security Headers** | Helmet (15+ headers) | XSS, Clickjacking, CSP protection |
| **CORS** | Configurable origins | Safe frontend communication |
| **Data Isolation** | userId filtering | Users access only their data |
| **Input Validation** | class-validator | Prevent injection attacks |

---

## ⚡ Performance Features

| Feature | Benefit | Impact |
|---------|---------|--------|
| **Gzip Compression** | Reduces response size by 70-90% | Faster load times |
| **Database Indexes** | Optimized query performance | 10-100x faster queries |
| **Connection Pooling** | Reuses DB connections | 3-5x better concurrency |
| **Selective Queries** | Only fetch needed fields | Reduced memory usage |

---

## 📊 Monitoring & Logging

### Health Check Endpoint
```bash
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2026-01-09T18:00:00.000Z",
  "uptime": 123.45,
  "database": "connected"
}
```

### Logging Features
- ✅ Request/response logging
- ✅ Error stack traces
- ✅ Authentication events
- ✅ Database connection status

---

## 🎓 What I Learned Building This

- Implementing JWT authentication with Passport strategies
- Building role-based authorization systems
- Using Prisma ORM for type-safe database operations
- Creating global exception filters for error handling
- Applying SOLID principles in NestJS modules
- Integrating Swagger for API documentation
- Implementing production-level security with Helmet
- Writing clean, maintainable TypeScript code

---

## 🚀 Production Deployment

```bash
# Build for production
npm run build

# Run production build
npm run start:prod

# Database migrations
npx prisma migrate deploy
```

### Environment Variables
```env
DATABASE_URL="postgresql://user:password@host:5432/db"
JWT_SECRET="your-secure-secret-key"
PORT=3000
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Development with hot-reload |
| `npm run build` | Production build |
| `npm run start:prod` | Run production |
| `npx prisma migrate dev` | Run migrations |
| `npx prisma studio` | Open database GUI |

---

## 🎯 Why This Project Stands Out

### ✅ Production-Ready
- Health checks for monitoring (K8s, Docker)
- Global exception handling
- Professional logging system
- Environment-based configuration

### ✅ Enterprise Patterns
- Clean architecture
- SOLID principles
- Dependency injection
- Type-safety end-to-end

### ✅ Well-Documented
- Interactive Swagger/OpenAPI docs
- Clear code structure
- Professional README
- Environment templates

### ✅ Secure by Design
- 15+ security headers
- JWT authentication
- Role-based authorization
- Password encryption
- Input validation

---

## 👨‍💻 Author

**JYupix**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JYupix)

---

## 📄 License

MIT License - Free to use for learning and portfolio projects

---

<div align="center">

### ⭐ Star this repository if you find it useful!

**Built with** ❤️ **using NestJS, TypeScript & modern best practices**

[🔝 Back to Top](#-task-management-api)

</div>
