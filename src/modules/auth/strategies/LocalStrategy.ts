import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from '../services';
import { LoginDto } from '../dto';
import { UserDto } from 'src/modules/user/dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  'UsernamePasswordStrategy',
) {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'user_name',
      passwordField: 'password',
    });
  }

  async validate(user_name: string, password: string): Promise<any> {
    const loginDto = plainToClass(LoginDto, {
      user_name: user_name,
      password: password,
    });
    const user: UserDto = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
