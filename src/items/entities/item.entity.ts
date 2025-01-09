import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

export class Item {
    @Exclude()
    id: number;

    @Exclude()
    orderId: number;

    @ApiProperty()
    articleId: number

    @Exclude()
    articlePrice: number

    @ApiProperty()
    quantity: number
}
