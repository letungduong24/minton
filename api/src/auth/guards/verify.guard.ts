import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { VerifiedException } from "src/custom-exception/verify/verify.exception";

@Injectable()
export class VerifiedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user.isVerified) throw new VerifiedException(user);
    return true;
  }
}
