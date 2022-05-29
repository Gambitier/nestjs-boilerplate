import { Provider } from '@nestjs/common';
import { UserService } from './serivces';
import { IUserService } from './serivces/interfaces';

export const UserServiceProvider: Provider = {
  provide: IUserService,
  useClass: UserService,
};
