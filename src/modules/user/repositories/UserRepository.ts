import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  FindManyUsersConditions,
  GetAllUsersDbResponse,
  GetAllUsersFilter,
  IUserRepository,
  UserFindConditions
} from './interfaces';

//////////////////////////////////////////////////////////

@Injectable()
export class UserRepository implements IUserRepository {
  private userDelegate: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(private prisma: PrismaService) {
    this.userDelegate = prisma.user;
  }

  getById(args: { userId: string }): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findFirstUser(options: UserFindConditions): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findUsers(options: FindManyUsersConditions): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  getAllUsers(filter: GetAllUsersFilter): Promise<GetAllUsersDbResponse> {
    throw new Error('Method not implemented.');
  }

  updateUserPassword(userId: string, encryptedPass: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
