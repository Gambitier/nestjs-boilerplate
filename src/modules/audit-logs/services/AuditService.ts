/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AuditingData, IAuditService } from './interfaces';

@Injectable()
export class AuditService implements IAuditService {
  /**
   *
   */
  constructor() {
    //
  }

  async recordAudit(log: AuditingData): Promise<void> {
    if (!log.route || !log.created_at) {
      return;
    }

    // call service and add audit log data
  }
}
