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
  @ApiOperation({ summary: 'Obtener todas las tareas del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de tareas' })
  async findAll(
    @Query() filters: FindTasksDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task[]> {
    return this.tasksService.findAll(filters, user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 403, description: 'No tienes acceso a esta tarea' })
  async findById(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task> {
    return this.tasksService.findById(id, user.sub);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(
    @Body() dto: CreateTaskDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task> {
    return this.tasksService.create(dto, user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar tarea' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 403, description: 'No tienes acceso a esta tarea' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task> {
    return this.tasksService.update(id, dto, user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tarea' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 403, description: 'No tienes acceso a esta tarea' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<Task> {
    return this.tasksService.delete(id, user.sub);
  }
}
