// cache/user-cache.module.ts
import { Module } from '@nestjs/common';
import { UserCacheService } from './user.cache.services';
import { RedisModule } from '../redis.module';

@Module({
  imports: [RedisModule],
  providers: [UserCacheService],
  exports: [UserCacheService], 
})
export class UserCacheModule {}
