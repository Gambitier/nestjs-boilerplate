import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from 'src/modules/auth/common';

export class UserRoleDto {
  constructor(props: UserRoleDto) {
    Object.assign(this, props);
  }

  @ApiProperty({ name: 'roleId' })
  roleId: number;

  @ApiProperty({ name: 'roleName' })
  roleName: UserRoleEnum;
}
