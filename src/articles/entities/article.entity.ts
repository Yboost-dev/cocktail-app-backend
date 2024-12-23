import { Article } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import {IngredientEntity} from "../../ingredients/entities/ingredient.entity";

export class ArticleEntity implements Article {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty({ nullable: true })
    description: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false, type: IngredientEntity })
    ingredient?: IngredientEntity;

    constructor({ ingredient, ...data }: Partial<ArticleEntity>) {
        Object.assign(this, data);

        if (ingredient) {
            this.ingredient = new IngredientEntity(ingredient);
        }
    }
}