import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@ApiTags('Tasks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user tasks' })
  @ApiResponse({ status: 200, description: 'List of tasks' })
  async findAll(
    @Query() filters: FindTasksDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task[]> {
    return this.tasksService.findAll(filters, user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Task found' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({
    status: 403,
    description: 'You do not have access to this task',
  })
  async findById(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task> {
    return this.tasksService.findById(id, user.sub);
  }

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async create(
    @Body() dto: CreateTaskDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task> {
    return this.tasksService.create(dto, user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({
    status: 403,
    description: 'You do not have access to this task',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task> {
    return this.tasksService.update(id, dto, user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({
    status: 403,
    description: 'You do not have access to this task',
  })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task> {
    return this.tasksService.delete(id, user.sub);
  }
}
