import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserByCredentialsDto, CreateUserByGoogleDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-user.dto';
import { PrismaService } from 'src/shared/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { PrismaError } from 'src/shared/prisma/prisma.error';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserByCredentialsDto) {
    try {
      return await this.prisma.user.create({
        data: {
          name: dto.name,
          image: dto.image,
          email: dto.email,
          passwordHash: dto.passwordHash,
          AuthProvider: 'CREDENTIALS'
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.DUPLICATE
      ) {
        throw new ConflictException('User has been registered');
      }
      throw error;
    }
  }

  async createWithGoogle(dto: CreateUserByGoogleDto) {
    try {
      return await this.prisma.user.create({
        data: {
          name: dto.name,
          image: dto.image,
          email: dto.email,
          AuthProvider: 'GOOGLE'
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.DUPLICATE
      ) {
        throw new ConflictException('User has been registered');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ 
      where: { uid: id },
    });
    if (!user) throw new NotFoundException('User not found');
    const {passwordHash, ...userInfo} = user
    return userInfo;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ 
      where: { 
        email: email
      }
    })
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateProfileDto) {
    try {
      return await this.prisma.user.update({
        where: { uid: id },
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.NOT_FOUND
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({ where: { uid: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.NOT_FOUND
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async promoteToAdmin(userId: number) {
    try {
      const user = await this.findOne(userId);
      
      if (user.role === 'admin') {
        throw new ConflictException('User is already an admin');
      }

      return await this.prisma.user.update({
        where: {uid: user.uid},
        data: {
          role: "admin"
        }
      })
    } catch (error) {
      throw error;
    }
  }
}
