import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query() filters: FindTasksDto): Promise<Task[]> {
    return this.tasksService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.delete(id);
  }
}
