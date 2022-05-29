import { Injectable } from '@nestjs/common';
import { ResetPassTokenDto } from 'src/modules/auth/dto';
import { UserDto } from '../dto';
import { IUserService } from './interfaces/IUserService';

/////////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserService implements IUserService {
  /**
   *
   */
  constructor() {
    //
  }

  findOneUserWithRoleData(args: {
    userName: string;
    IsActive: boolean;
  }): UserDto | PromiseLike<UserDto> {
    throw new Error('Method not implemented.');
  }

  resetUserPassword(
    resetPassTokenDto: ResetPassTokenDto,
  ): boolean | PromiseLike<boolean> {
    throw new Error('Method not implemented.');
  }

  findOneUser(args: { userId: string; IsActive: boolean }): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
}
