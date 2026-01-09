import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  // Authentication logic will be implemented here
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    // Here you would normally compare the hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }

  login(user: User | Omit<User, 'password'>): { access_token: string } {
    const payload = { sub: user.id, email: user.email, role: user.role };
    this.logger.log(`Token generated for user: ${user.email}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    this.logger.log(`New user registration: ${registerDto.email}`);
    const user = await this.usersService.create(registerDto);
    return this.login(user);
  }
}
