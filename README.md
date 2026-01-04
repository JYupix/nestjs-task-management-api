<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" width="150" alt="Prisma Logo" /></a>
</p>

<h1 align="center">Tasks API - NestJS + Prisma</h1>

<p align="center">
  A modern RESTful API for task management built with NestJS and Prisma ORM
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>



---

## 📋 Description

A professional task management API built with modern technologies. Features include creating, reading, updating, and deleting tasks with status management and filtering capabilities.

## 🚀 Technologies

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **TypeScript** - Type-safe programming
- **Class Validator** - DTO validation
- **Class Transformer** - Object transformation

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
PORT=3000
```

## 🏃 Running the Application

```bash
# Development mode
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

Base URL: `http://localhost:3000/api`

### Tasks

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/tasks` | Get all tasks with optional filters | Query params: `status`, `title` |
| `GET` | `/tasks/:id` | Get a task by ID | - |
| `POST` | `/tasks` | Create a new task | `{ title, description, status? }` |
| `PATCH` | `/tasks/:id` | Update a task | `{ title?, description?, status? }` |
| `DELETE` | `/tasks/:id` | Delete a task | - |

---

## 📝 API Response Examples

### ✅ GET `/api/tasks` - Get all tasks
**Success Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete documentation",
    "description": "Write comprehensive API documentation",
    "status": "PENDING",
    "createdAt": "2026-01-03T20:00:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Review pull requests",
    "description": "Review team PRs",
    "status": "COMPLETED",
    "createdAt": "2026-01-03T19:30:00.000Z"
  }
]
```

**Available filters:**
- `status`: Filter by task status (`PENDING` or `COMPLETED`)
- `title`: Filter tasks by title (partial match)

**Example with filters:**
```bash
# Get all pending tasks
GET /api/tasks?status=PENDING

# Search tasks by title
GET /api/tasks?title=documentation

# Combine filters
GET /api/tasks?status=COMPLETED&title=API
```

---

### ✅ GET `/api/tasks/:id` - Get task by ID
**Request:**
```bash
GET /api/tasks/550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "status": "PENDING",
  "createdAt": "2026-01-03T20:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Task with ID 550e8400-e29b-41d4-a716-446655440000 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### ✅ POST `/api/tasks` - Create a task
**Request Body:**
```json
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
  "createdAt": "2026-01-03T20:00:00.000Z"
}
```

**Error Response - Validation (400):**
```json
{
  "message": [
    "title must be a string",
    "Title must not be empty",
    "description must be a string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### ✅ PATCH `/api/tasks/:id` - Update a task
**Request:**
```bash
PATCH /api/tasks/550e8400-e29b-41d4-a716-446655440000
```

**Request Body:**
```json
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
  "createdAt": "2026-01-03T20:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Task with ID 550e8400-e29b-41d4-a716-446655440000 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### ✅ DELETE `/api/tasks/:id` - Delete a task
**Request:**
```bash
DELETE /api/tasks/550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "status": "COMPLETED",
  "createdAt": "2026-01-03T20:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Task with ID 550e8400-e29b-41d4-a716-446655440000 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 📊 HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid data provided |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |


## 📝 License

This project is [MIT licensed](LICENSE).

## 👤 Author

Built with ❤️ using NestJS and Prisma
