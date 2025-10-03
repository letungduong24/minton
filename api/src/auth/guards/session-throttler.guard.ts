import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class SessionThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {

    // Nếu user có session, dùng userId làm tracker
    if (req.user) {
      console.log({user: req.user})
      return req.user.uid.toString();
    }
    console.log("no user")
    // fallback: dùng IP
    return super.getTracker(req);
  }

  async canActivate(context: ExecutionContext) {
    console.log('ThrottlerGuard active'); // log để kiểm tra
    return super.canActivate(context); // bắt buộc phải gọi super nếu bạn muốn throttle hoạt động
  }
}
