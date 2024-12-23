import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateIngredientDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsNumber()
    @ApiProperty()
    quantity: number;

    @IsString()
    @ApiProperty()
    unit: string;
}
