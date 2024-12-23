import {ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

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

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, default: false })
    published?: boolean = false;

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({ type: [String] })
    ingredients: string[];
}
