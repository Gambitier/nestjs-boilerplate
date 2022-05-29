import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BUSINESS_EXCEPTION_CONFIG_TOKEN } from '../constants';
import { BusinessException } from '../dtos/business-exception';
import { BusinessExceptionConfig } from '../interfaces/business-exception.config';
import { ExceptionInfo } from '../interfaces/exception.info';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(
    @Inject(BUSINESS_EXCEPTION_CONFIG_TOKEN)
    private readonly config: BusinessExceptionConfig,
  ) {}

  responseException(exception: Error): Error {
    if (
      exception instanceof BusinessException &&
      this.config.responseOnBusinessException
    ) {
      const responseBody = this.config.responseOnBusinessException(exception);
      return new BadRequestException(responseBody);
    } else if (
      exception instanceof BadRequestException &&
      this.config.responseOnBusinessException
    ) {
      const responseBody = this.config.responseOnBadRequestException(exception);
      return new BadRequestException(responseBody);
    }

    const responseBody = this.config.responseOnAnyException(exception);
    return new InternalServerErrorException(responseBody);
  }

  logException(context: ExecutionContext, exception: any) {
    const request = context.switchToHttp().getRequest();
    const exceptionContent: ExceptionInfo<any> = {
      exception,
      request: {
        url: `${request.protocol}://${request.hostname}${request.originalUrl}`,
        method: request.method,
        headers: request.headers,
        body: request.body,
      },
    };

    if (
      exception instanceof BusinessException &&
      this.config.logOnBusinessException
    ) {
      this.config.logOnBusinessException(exceptionContent);
    } else if (this.config.logOnAnyException) {
      this.config.logOnAnyException(exceptionContent);
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception: any) => {
        if (
          this.config?.logOnAnyException ||
          this.config?.logOnBusinessException
        ) {
          this.logException(context, exception);
        }
        return throwError(() => this.responseException(exception));
      }),
    );
  }
}
