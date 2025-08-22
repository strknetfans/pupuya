import { IsString, IsOptional, IsArray, IsNotEmpty, MaxLength, ArrayNotEmpty, IsEnum } from 'class-validator';
import { PrivacyType } from '@prisma/client';

export class CreateContentDto {
	@IsOptional()
	@IsString()
	@MaxLength(100)
	title?: string;

	@IsOptional()
	@IsString()
	@MaxLength(500)
	description?: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	images: string[];

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tags?: string[];

	@IsOptional()
	@IsEnum(PrivacyType)
	privacy?: PrivacyType;
}
