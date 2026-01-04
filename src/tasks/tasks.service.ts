import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: FindTasksDto): Promise<Task[]> {
    const where: Prisma.TaskWhereInput = {};

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

  async findById(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    await this.findById(id); // Verifica que existe
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Task> {
    await this.findById(id); // Verifica que existe
    return this.prisma.task.delete({ where: { id } });
  }
}
