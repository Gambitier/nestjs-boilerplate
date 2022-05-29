import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import { passwordRegex } from 'src/common/constants';

export class ChangePasswordDto {
  @ApiProperty({ name: 'new_password' })
  @Expose({ name: 'new_password' })
  @IsString()
  @Matches(passwordRegex, {
    message:
      'New password does not fit the security criteria. \
       The new password must be between 7 to 15 character long, \
       should have atleast 1 digit, 1 special character, \
       1 lower-case and 1 uppercase letter.',
  })
  newPassword: string;

  @Exclude()
  userId: string;
}
