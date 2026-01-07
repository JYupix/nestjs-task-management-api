import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User, UserRole } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Users (Admin only)')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios (Solo ADMIN)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @ApiResponse({ status: 403, description: 'No tienes permisos (Solo ADMIN)' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID (Solo ADMIN)' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'No tienes permisos (Solo ADMIN)' })
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear usuario manualmente (Solo ADMIN)' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @ApiResponse({ status: 409, description: 'Email ya existe' })
  @ApiResponse({ status: 403, description: 'No tienes permisos (Solo ADMIN)' })
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar usuario (Solo ADMIN)' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'No tienes permisos (Solo ADMIN)' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario (Solo ADMIN)' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'No tienes permisos (Solo ADMIN)' })
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
