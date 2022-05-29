import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsString, IsUUID } from 'class-validator';
import { UserEntity } from 'prisma/database.entity';

//////////////////////////////////////////////////////////

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  getById(args: { userId: string }): Promise<UserEntity>;

  findFirstUser(options: UserFindConditions): Promise<UserEntity>;

  findUsers(options: FindManyUsersConditions): Promise<UserEntity[]>;

  getAllUsers(filter: GetAllUsersFilter): Promise<GetAllUsersDbResponse>;

  updateUserPassword(userId: string, encryptedPass: string): Promise<boolean>;
}

export type GetAllUsersDbResponse = {
  totalUsers: number;
  entities: UserEntity[];
};

export enum UsersSortByEnum {
  firstName = 'firstName',
  email = 'email',
}

export enum UsersOrderByEnum {
  asc = 'asc',
  desc = 'desc',
}

export class GetAllUsersFilter {
  userFindOptions: FindManyUsersConditions;
  sortBy: UsersSortByEnum;
  sortingOrder: UsersOrderByEnum;
  limit: number;
  offset: number;
}

export class UserFindConditions {
  /**
   *
   */
  constructor(props: UserFindConditions) {
    Object.assign(this, props);
  }

  @IsUUID()
  userId?: string;

  userIdListToInclude?: string[];

  userIdListToExclude?: string[];

  @IsString()
  name?: string;

  @IsString()
  mobileNumber?: string;

  @IsEmail()
  email?: string;

  @IsBoolean()
  IsActive?: boolean;
}

export class FindManyUsersConditions extends PartialType(UserFindConditions) {
  // By default, all of these fields are required.
  // To create a type with the same fields, but with each one optional,
  // use PartialType() passing the class reference (CreateCatDto) as an argument
  // https://docs.nestjs.com/openapi/mapped-types#partial
}
