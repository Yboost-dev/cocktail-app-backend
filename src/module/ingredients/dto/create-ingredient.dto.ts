import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, Min, IsIn} from "class-validator";

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "Nom de l'ingrédient, unique par type (ex: 'Menthe')."})
    name: string;

    @IsNumber()
    @Min(1)
    @ApiProperty({
        description: "Quantité requise pour cet ingrédient.",
        example: 200,
    })
    quantity: number;

    @IsString()
    @IsIn(["g", "ml"], {
        message: "L'unité doit être soit 'g' ou 'ml'.",
    })
    @ApiProperty({
        description: "Unités de mesure pour l'ingrédient (g, ml).",
        example: "ml",
        enum: ["g", "ml"],
    })
    unit: string;
}