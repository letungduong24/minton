import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersService } from 'src/modules/users/users.service';
import { UserCacheService } from '../cache/user/user.cache.services';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
    private userCacheService: UserCacheService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) || [];

    const request = context.switchToHttp().getRequest();
    const userId = request.session?.user;

    if (!userId) {
      throw new UnauthorizedException('You must be logged in');
    }

    let user = await this.userCacheService.getUser(userId);
    if (!user) {
      user = await this.userService.findOne(userId);
      await this.userCacheService.setUser(userId, user);
    }

    if (!user) {
      throw new UnauthorizedException('You must be logged in');
    }

    request.user = user

    if (requiredRoles.length === 0) return true;

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
