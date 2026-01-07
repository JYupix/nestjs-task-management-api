import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Updated task title',
    description: 'Task title',
  })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @ApiPropertyOptional({
    example: 'Updated task description',
    description: 'Task description',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    example: TaskStatus.COMPLETED,
    description: 'Task status (PENDING or COMPLETED)',
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be a valid TaskStatus enum value',
  })
  status?: TaskStatus;
}
