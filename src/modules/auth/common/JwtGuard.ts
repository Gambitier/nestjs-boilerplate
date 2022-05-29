import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ALLOW_ANONYMOUS } from '.';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const anonymousAccessAllowed = this.reflector.getAllAndOverride<boolean>(
      ALLOW_ANONYMOUS,
      // i.e. this allowAnonymous decorator can be applied from  method or class
      [context.getHandler(), context.getClass()],
    );

    if (anonymousAccessAllowed) {
      return true;
    }

    // check strategy (here AuthGuard('jwt')) to authenticate if route/class is not allowAnonymous
    // it will check if token is correct or not, if correct then stragtegy will set req.user obect,
    // which is nothing but decodede jwt payload
    return super.canActivate(context);
  }
}
