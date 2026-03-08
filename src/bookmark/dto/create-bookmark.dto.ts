import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;

  @IsInt()
  @IsOptional()
  visitCount?: number;
}