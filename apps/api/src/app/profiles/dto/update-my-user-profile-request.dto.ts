import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateMyUserProfileRequest } from '@babyshare/types';
import { trimString } from '../../auth/dto/trim-string';

export class UpdateMyUserProfileRequestDto
  implements UpdateMyUserProfileRequest
{
  @Transform(({ value }) => trimString(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @Transform(({ value }) => trimString(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @Transform(({ value }) => trimString(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  displayName?: string;

  @Transform(({ value }) => trimNullableString(value))
  @IsOptional()
  @IsString()
  phoneNumber?: string | null;

  @Transform(({ value }) => trimString(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @Transform(({ value }) => trimNullableString(value))
  @IsOptional()
  @IsString()
  municipality?: string | null;

  @Transform(({ value }) => trimNullableString(value))
  @IsOptional()
  @IsString()
  addressLine?: string | null;

  @Transform(({ value }) => trimNullableString(value))
  @IsOptional()
  @IsString()
  bio?: string | null;
}

function trimNullableString(value: unknown): unknown {
  const trimmed = trimString(value);

  return trimmed === '' ? null : trimmed;
}
