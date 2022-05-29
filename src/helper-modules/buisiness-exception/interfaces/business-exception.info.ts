import { BusinessException } from '../dtos/business-exception';
import { ExceptionInfo } from './exception.info';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BusinessExceptionInfo
  extends ExceptionInfo<BusinessException> {}
