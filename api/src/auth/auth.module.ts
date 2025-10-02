import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { PrismaService } from '../shared/prisma/prisma.services';
import { AuthController } from './auth.controller';
import { RedisModule } from './cache/redis.module';
import { UserCacheModule } from './cache/user/user.cache.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { VerifiedGuard } from './guards/verify.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [PrismaService, AuthService, LocalStrategy, LocalGuard, GoogleStrategy, GoogleAuthGuard, PrismaService, RolesGuard, VerifiedGuard],
  controllers: [AuthController],
  imports: [
    PassportModule,
    UsersModule,
    RedisModule,
    UserCacheModule,
    MailerModule
  ],
})
export class AuthModule {}
