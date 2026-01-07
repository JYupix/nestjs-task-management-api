import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: FindTasksDto, userId: string): Promise<Task[]> {
    const where: Prisma.TaskWhereInput = {
      userId, // Filtra solo tareas del usuario
    };

    if (filters.title) {
      where.title = {
        contains: filters.title,
        mode: 'insensitive',
      };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return this.prisma.task.findMany({ where });
  }

  async findById(id: string, userId: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Verificar que la tarea pertenece al usuario
    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  async create(data: CreateTaskDto, userId: string): Promise<Task> {
    return this.prisma.task.create({
      data: { ...data, userId },
    });
  }

  async update(id: string, data: UpdateTaskDto, userId: string): Promise<Task> {
    await this.findById(id, userId); // Verifica que existe Y pertenece al usuario
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string): Promise<Task> {
    await this.findById(id, userId); // Verifica que existe Y pertenece al usuario
    return this.prisma.task.delete({ where: { id } });
  }
}
