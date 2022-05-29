import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { UserRoleDto } from './UserRoleDto';

export class UserDto {
  constructor(props: UserDto) {
    Object.assign(this, props);
  }

  @ApiProperty({ name: 'userName' })
  userName: string;

  @ApiProperty({ name: 'id' })
  id: string;

  @ApiProperty({ name: 'firstName' })
  firstName: string;

  @ApiProperty({ name: 'middleName' })
  middleName: string;

  @ApiProperty({ name: 'lastName' })
  lastName: string;

  @ApiProperty({ name: 'prefix' })
  prefix: string;

  @ApiProperty({ name: 'mobileNumber' })
  mobileNumber: string;

  @ApiProperty({ name: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'gender' })
  gender: string;

  @ApiProperty({ name: 'dateOfBirth' })
  dateOfBirth: Date;

  @Exclude({ toPlainOnly: true, toClassOnly: false })
  password: string;

  @ApiProperty({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ name: 'deletedAt' })
  deletedAt: Date | null;

  @ApiProperty({ name: 'updatedAt' })
  updatedAt: Date | null;

  @ApiProperty({ name: 'roles' })
  roles: UserRoleDto[];
}
