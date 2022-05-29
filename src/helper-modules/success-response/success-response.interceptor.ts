/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessApiResponse } from 'src/common/types';
import {
  AuditMetadata,
  AUDIT_KEY,
} from 'src/modules/audit-logs/audit.decorator';
import {
  AuditingData,
  IAuditService,
} from 'src/modules/audit-logs/services/interfaces';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  /**
   *
   */
  constructor(
    @Inject(IAuditService)
    private readonly auditService: IAuditService,

    private reflector: Reflector,
  ) {}

  getAuditData(req: Request, res: SuccessApiResponse, route: string) {
    //

    if (req.headers.authorization) {
      delete req.headers.authorization;
    }

    const entity: AuditingData = {
      created_at: new Date(),
      user: req.user,
      route: route?.toLowerCase(),
      request: {
        method: req?.method ?? null,
        host: req?.hostname ?? null,
        body: req?.body ?? null,
        headers: req?.headers ?? null,
        url: req?.originalUrl ?? null,
        params: req?.params ?? null,
      },
      response: {
        status: res.statusCode,
        statusCode: res.statusCode,
        message: res.message,
        data: res.data,
      },
      entity_type: null,
      error: null,
    };

    return entity;
  }

  responseHandler = (response: SuccessApiResponse) => {
    const apiResponse = {
      status: response.statusCode,
      statusCode: response.statusCode,
      message: response.message,
      data: response.data,
    };

    return apiResponse;
  };

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const request: Request = httpContext.getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: Response = httpContext.getRequest();

    return next.handle().pipe(
      map(async (data: any) => {
        if (data instanceof StreamableFile || data instanceof Buffer) {
          return data;
        }

        const auditMetadata: AuditMetadata =
          this.reflector.getAllAndOverride<AuditMetadata>(AUDIT_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);

        const auditKey = auditMetadata?.AuditKey;
        const auditData = this.getAuditData(request, data, auditKey);

        if (auditData != null) {
          await this.auditService.recordAudit(auditData);
        }

        return this.responseHandler(data);
      }),
    );
  }
}
