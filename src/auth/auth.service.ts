import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Logger } from '@nestjs/common';

export type AuthResponse = {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number; // seconds until expiration
  user: Omit<User, 'password'>;
};

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

  private sanitizeUser(
    user: User | Omit<User, 'password'>,
  ): Omit<User, 'password'> {
    const { password: _password, ...userWithoutPassword } = user as User;
    void _password; // explicitly discard sensitive field
    return userWithoutPassword;
  }

  login(user: User | Omit<User, 'password'>): AuthResponse {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const sanitizedUser = this.sanitizeUser(user);
    const expiresInSeconds = 24 * 60 * 60; // aligns with JwtModule signOptions: 1d

    this.logger.log(`Token generated for user: ${user.email}`);

    return {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'Bearer',
      expiresIn: expiresInSeconds,
      user: sanitizedUser,
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    this.logger.log(`New user registration: ${registerDto.email}`);
    const user = await this.usersService.create(registerDto);
    return this.login(user);
  }

  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    this.logger.log(`Fetching profile for user: ${userId}`);
    return this.usersService.findById(userId);
  }
}
