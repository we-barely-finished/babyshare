import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { trimString } from './trim-string';

export class RegisterRequestDto {
  @Transform(({ value }) => trimString(value))
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @Transform(({ value }) => trimString(value))
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @Transform(({ value }) => trimString(value))
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @Transform(({ value }) => trimString(value))
  @IsString()
  @IsNotEmpty()
  displayName!: string;

  @Transform(({ value }) => trimString(value))
  @IsOptional()
  @IsString()
  phoneNumber?: string | null;

  @Transform(({ value }) => trimString(value))
  @IsString()
  @IsNotEmpty()
  city!: string;

  @Transform(({ value }) => trimString(value))
  @IsOptional()
  @IsString()
  municipality?: string | null;

  @Transform(({ value }) => trimString(value))
  @IsOptional()
  @IsString()
  addressLine?: string | null;

  @Transform(({ value }) => trimString(value))
  @IsOptional()
  @IsString()
  bio?: string | null;
}
