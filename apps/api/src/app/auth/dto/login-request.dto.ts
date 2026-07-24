import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { trimString } from '../../common/validation/string-normalizers';

export class LoginRequestDto {
  @Transform(({ value }) => trimString(value))
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
