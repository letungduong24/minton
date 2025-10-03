// verified.exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { ThrottlerException } from "@nestjs/throttler";

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      error: 'Too Many Request',
      message: 'Quá nhiều yêu cầu, vui lòng thử lại sau',
    });
  }
}
