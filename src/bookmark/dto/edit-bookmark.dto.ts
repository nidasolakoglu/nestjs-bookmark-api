import {
  IsOptional,
  IsString,
  IsUrl,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  link?: string;

  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;

  @IsInt()
  @IsOptional()
  visitCount?: number;
}