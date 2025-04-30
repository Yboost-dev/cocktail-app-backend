import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArticleIngredient } from '../../article-ingredient/entities/article-ingredient.entity';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  categoryId: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ArticleIngredient)
  @ApiProperty({ type: [ArticleIngredient] })
  ingredients: ArticleIngredient[];
}
