import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna JWT token' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login')
  async login(
    @Request() req: { user: User },
  ): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Registro de nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado, retorna JWT token',
  })
  @ApiResponse({ status: 409, description: 'Email ya existe' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<{ access_token: string }> {
    return this.authService.register(dto);
  }
}
