import { Exclude } from 'class-transformer';

export class Tokens {
  access_token: string;
  @Exclude()
  refresh_token: string;
}
