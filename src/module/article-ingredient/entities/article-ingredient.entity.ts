import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class ArticleIngredient {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  ingredientId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  quantity: number;

}
