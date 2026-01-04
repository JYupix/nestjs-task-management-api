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

### Request Examples

#### Create a Task
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "status": "PENDING"
}
```

#### Response
```json
{
  "id": "uuid-here",
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "status": "PENDING",
  "createdAt": "2026-01-03T20:00:00.000Z"
}
```

#### Get All Tasks (with filters)
```bash
GET /api/tasks?status=PENDING&title=documentation
```

#### Update a Task
```bash
PATCH /api/tasks/:id
Content-Type: application/json

{
  "status": "COMPLETED"
}
```

#### Delete a Task
```bash
DELETE /api/tasks/:id
```

## 📝 License

This project is [MIT licensed](LICENSE).

## 👤 Author

Built with ❤️ using NestJS and Prisma

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
