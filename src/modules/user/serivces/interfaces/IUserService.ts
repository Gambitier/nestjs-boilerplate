import { ResetPassTokenDto } from 'src/modules/auth/dto';
import { UserDto } from '../../dto';
import { UserFindConditions } from '../../repositories/interfaces';

////////////////////////////////////////////////////

export const IUserService = Symbol('IUserService');

export interface IUserService {
  findOneUserWithRoleData(arg0: {
    userName: string;
    IsActive: boolean;
  }): UserDto | PromiseLike<UserDto>;

  resetUserPassword(
    resetPassTokenDto: ResetPassTokenDto,
  ): boolean | PromiseLike<boolean>;

  findOneUser(options: UserFindConditions): Promise<UserDto>;
}
