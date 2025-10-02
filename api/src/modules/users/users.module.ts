import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/shared/prisma/prisma.services';
import { UserCacheModule } from 'src/auth/cache/user/user.cache.module';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, RolesGuard],
  exports: [UsersService],
  imports: [UserCacheModule]
})
export class UsersModule {}
