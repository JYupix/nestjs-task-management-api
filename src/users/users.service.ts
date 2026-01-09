import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private excludePassword(user: User): Omit<User, 'password'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.excludePassword(user));
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.excludePassword(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) {
      throw new ConflictException(
        `User with email ${data.email} already exists`,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    return this.excludePassword(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<Omit<User, 'password'>> {
    await this.findById(id);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.excludePassword(user);
  }

  async delete(id: string): Promise<Omit<User, 'password'>> {
    await this.findById(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return this.excludePassword(user);
  }
}
