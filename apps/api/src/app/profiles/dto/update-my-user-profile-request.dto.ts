import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { UpdateMyUserProfileRequest } from '@babyshare/types';
import {
  trimNullableString,
  trimString,
} from '../../common/validation/string-normalizers';

export class UpdateMyUserProfileRequestDto
  implements UpdateMyUserProfileRequest
{
  @Transform(({ value }) => trimString(value))
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @Transform(({ value }) => trimString(value))
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @Transform(({ value }) => trimString(value))
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  displayName?: string;

  @Transform(({ value }) => trimNullableString(value))
  @IsOptional()
  @IsString()
  phoneNumber?: string | null;

  @Transform(({ value }) => trimString(value))
  @ValidateIf((_, value) => value !== undefined)
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
