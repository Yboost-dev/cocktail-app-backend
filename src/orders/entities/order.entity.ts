import {ApiProperty} from "@nestjs/swagger";
import {Item} from "../../items/entities/item.entity";
import {IsString} from "class-validator";

export class OrderEntity {
    @IsString()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty(
        {
            description: 'Token for payment',
            example: '<KEY>'
        }
    )
    token: string;

    @IsString()
    @ApiProperty(
        {
            description: 'Status of order',
            example: 'pending / finish / canceled'
        }
    )
    status: string;

    @IsString()
    @ApiProperty(
        {
            description: 'Is order paid',
            example: false
        }
    )
    paid: boolean;

    @ApiProperty({ type: Item })
    articles: Item[];
}
