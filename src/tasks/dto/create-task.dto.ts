import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description must not be empty' })
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be a valid TaskStatus enum value',
  })
  status?: TaskStatus;
}
