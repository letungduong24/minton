import { UsersService } from "src/modules/users/users.service";
import { UserCacheService } from "../cache/user/user.cache.services";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private userCacheService: UserCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session?.user;

    if (!userId) throw new UnauthorizedException('Vui lòng đăng nhập để tiếp tục!');

    let user = await this.userCacheService.getUser(userId);
    if (!user) {
      user = await this.userService.findOne(userId);
      await this.userCacheService.setUser(userId, user);
    }

    if (!user) throw new UnauthorizedException('Vui lòng đăng nhập để tiếp tục!');

    request.user = user; 
    return true;
  }
}
