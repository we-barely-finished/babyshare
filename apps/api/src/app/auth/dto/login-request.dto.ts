import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @Transform(({ value }) => trimString(value))
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

function trimString(value: unknown): unknown {
  return typeof value === 'string' ? value.trim() : value;
}
