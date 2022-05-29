import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, UserRoleEnum } from '.';
import { JwtUserData } from '../dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: JwtUserData } = context.switchToHttp().getRequest();
    const roles: number[] = user?.roles?.map((role) => role.roleId);
    const isAuthorized: boolean = requiredRoles.some((role) =>
      roles.includes(role),
    );

    return isAuthorized;
  }
}
