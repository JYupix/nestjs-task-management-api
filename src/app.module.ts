import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PrismaModule, TasksModule, UsersModule, AuthModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
