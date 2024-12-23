import { ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "@prisma/client";

export class IngredientEntity implements Ingredient {
    constructor(partial: Partial<IngredientEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty({ nullable: true })
    unit: string | null; // Correspond au type nullable dans Prisma
}