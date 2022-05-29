import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUserData } from '../dto';
import { jwtConstants } from './constants';

@Injectable()
export class JwtFromQueryParamStrategy extends PassportStrategy(
  Strategy,
  'JwtQueryParamStrategy',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.at_secret,
    });
  }

  validate(payload: JwtUserData) {
    return payload;
  }
}
