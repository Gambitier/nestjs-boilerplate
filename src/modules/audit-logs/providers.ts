import { Provider } from '@nestjs/common';
import { AuditService } from './services';
import { IAuditService } from './services/interfaces';

export const AuditServiceProvider: Provider = {
  provide: IAuditService,
  useClass: AuditService,
};
