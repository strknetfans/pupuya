import { IsString, IsOptional, IsArray, MaxLength, IsEnum } from 'class-validator';
import { PrivacyType } from '../../prisma/types';

export class UpdateContentDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(PrivacyType)
  privacy?: PrivacyType;
}
