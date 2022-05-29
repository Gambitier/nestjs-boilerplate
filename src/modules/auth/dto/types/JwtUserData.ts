import { UserRoleDto } from 'src/modules/user/dto';

export type JwtUserData = {
  userId: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  roles: UserRoleDto[];
};
