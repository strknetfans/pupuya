import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsArray,
  MaxLength,
  Min,
  Max,
  ArrayMaxSize,
} from 'class-validator';

export class CreateGenerateTaskDto {
  @IsString()
  @MaxLength(500)
  prompt: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  negativePrompt?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  styles?: string[];

  @IsOptional()
  @IsInt()
  @Min(64)
  @Max(2048)
  width?: number;

  @IsOptional()
  @IsInt()
  @Min(64)
  @Max(2048)
  height?: number;

  @IsOptional()
  @IsInt()
  seed?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  steps?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(30)
  cfgScale?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  model?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  controlMode?: string;
}
