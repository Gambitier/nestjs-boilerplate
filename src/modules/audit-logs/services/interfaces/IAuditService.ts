import { HttpStatus } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';

export const IAuditService = Symbol('IAuditService');

export interface IAuditService {
  recordAudit(log: AuditingData): Promise<void>;
}

export interface ParamsDict {
  [key: string]: string;
}

export type AuditingData = {
  created_at: Date;
  user: Express.User;
  route: string;
  request: {
    method: string;
    host: string;
    body: any;
    headers: IncomingHttpHeaders;
    url: string;
    params: ParamsDict;
  };
  response: {
    status: HttpStatus;
    statusCode: HttpStatus;
    message: string;
    data: any;
  };
  entity_type: string;
  error: any;
};
