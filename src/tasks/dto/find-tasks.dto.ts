import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class FindTasksDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
