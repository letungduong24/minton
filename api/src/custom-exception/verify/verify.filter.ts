// verified.exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { VerifiedException } from "./verify.exception";

@Catch(VerifiedException)
export class VerifiedExceptionFilter implements ExceptionFilter {
  catch(exception: VerifiedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
      user: exception.user,
    });
  }
}
