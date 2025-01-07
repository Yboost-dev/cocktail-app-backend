import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

export class ArticleIngredient {
    @Exclude()
    articleId: number;

    @ApiProperty()
    ingredientId: number;

    @ApiProperty()
    quantity: number;
}
