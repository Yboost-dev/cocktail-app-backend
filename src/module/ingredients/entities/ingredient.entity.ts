import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '@prisma/client';

export class IngredientEntity implements Ingredient {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ nullable: true })
  unit: string | null;
}
