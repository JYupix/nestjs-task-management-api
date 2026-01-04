import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be a valid TaskStatus enum value',
  })
  status?: TaskStatus;
}
