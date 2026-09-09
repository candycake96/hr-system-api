import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../database/database.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

const BCRYPT_SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const password = await bcrypt.hash(dto.password, BCRYPT_SALT_ROUNDS);

    try {
      const user = await this.database.user.create({
        data: {
          username: dto.username,
          passwordHash: password,
          email: dto.email,
        },
        omit: { passwordHash: true },
      });

      return {
        user,
        accessToken: await this.createAccessToken(user.id, user.username),
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username or email is already in use');
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.database.user.findUnique({
      where: { username: dto.username },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { passwordHash: _passwordHash, ...safeUser } = user;

    return {
      user: safeUser,
      accessToken: await this.createAccessToken(user.id, user.username),
    };
  }

  async updateProfile(dto: UpdateProfileDto) {
    const user = await this.database.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (dto.username) {
      const existingUsername = await this.database.user.findUnique({
        where: { username: dto.username },
      });

      if (existingUsername && existingUsername.id !== dto.userId) {
        throw new ConflictException('Username is already in use');
      }

      updateData.username = dto.username;
    }

    if (dto.email !== undefined) {
      const existingEmail = dto.email
        ? await this.database.user.findUnique({ where: { email: dto.email } })
        : null;

      if (existingEmail && existingEmail.id !== dto.userId) {
        throw new ConflictException('Email is already in use');
      }

      updateData.email = dto.email;
    }

    const updatedUser = await this.database.user.update({
      where: { id: dto.userId },
      data: updateData,
      omit: { passwordHash: true },
    });

    return { user: updatedUser };
  }

  async changePassword(dto: ChangePasswordDto) {
    const user = await this.database.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('New password and confirm password do not match');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, BCRYPT_SALT_ROUNDS);

    await this.database.user.update({
      where: { id: dto.userId },
      data: { passwordHash: hashedPassword },
    });

    return {
      message: 'Password changed successfully',
    };
  }

  private createAccessToken(userId: string, username: string) {
    return this.jwtService.signAsync({ sub: userId, username });
  }
}
