import { Provider } from '@nestjs/common';
import { IOtpRepository, OtpRepository } from './repositories';
import { AuthService, IAuthService } from './services';

export const AuthServiceProvider: Provider = {
  provide: IAuthService,
  useClass: AuthService,
};

export const OtpRepoProvider: Provider = {
  provide: IOtpRepository,
  useClass: OtpRepository,
};
