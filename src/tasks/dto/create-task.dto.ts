import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete project documentation',
    description: 'Task title',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  title: string;

  @ApiProperty({
    example: 'Write comprehensive API documentation with examples',
    description: 'Task description',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description must not be empty' })
  description: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    description: 'Task status (PENDING or COMPLETED)',
    default: TaskStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be a valid TaskStatus enum value',
  })
  status?: TaskStatus;
}
