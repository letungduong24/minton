import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class UserCacheService {
  private readonly prefix = 'user:';
  private readonly ttl = 10; 

  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async getUser(userId: string) {
    const key = this.prefix + userId;
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async setUser(userId: string, userData: any) {
    const key = this.prefix + userId;
    await this.redis.set(key, JSON.stringify(userData), 'EX', this.ttl);
  }

  async delUser(userId: string) {
    const key = this.prefix + userId;
    await this.redis.del(key);
  }
}
