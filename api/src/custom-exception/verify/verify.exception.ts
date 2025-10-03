import { ForbiddenException } from "@nestjs/common";

export class VerifiedException extends ForbiddenException {
  constructor(user: any) {
    super('Vui lòng xác minh tài khoản của bạn!');
    this.user = user;
  }
  user: any;
}
