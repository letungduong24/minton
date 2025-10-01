import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { CookieService } from '../shared/services/cookie.service';
import { PrismaService } from '../shared/prisma/prisma.services';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/modules/users/users.service';
import { UserCacheService } from './cache/user/user.cache.services';
import { RedisModule } from './cache/redis.module';
import { UserCacheModule } from './cache/user/user.cache.module';
import { RolesGuard } from './guards/role.guard';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Module({
  providers: [AuthService, LocalStrategy, LocalGuard, GoogleStrategy, GoogleAuthGuard, PrismaService, RolesGuard],
  controllers: [AuthController],
  imports: [
    PassportModule,
    UsersModule,
    RedisModule,
    UserCacheModule,
  ],
})
export class AuthModule {}
