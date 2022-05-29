import { Provider } from '@nestjs/common';
import { IS3ManagerService } from './interfaces';
import { S3ManagerService } from './S3ManagerService';

export const S3ManagerServiceProvider: Provider = {
  provide: IS3ManagerService,
  useClass: S3ManagerService,
};
