import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/shared/prisma/prisma.services';
import { UserCacheModule } from 'src/auth/cache/user/user.cache.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [UserCacheModule]
})
export class UsersModule {}
