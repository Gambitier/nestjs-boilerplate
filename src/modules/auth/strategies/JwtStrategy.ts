import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUserData } from '../dto';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // This means that if our route is supplied with an expired JWT,
      // the request will be denied and a 401 Unauthorized response sent
      ignoreExpiration: false,
      // instead of jwtConstants, get configs injected here in this class
      secretOrKey: jwtConstants.at_secret,
    });
  }

  validate(payload: JwtUserData) {
    return payload;
  }
}
