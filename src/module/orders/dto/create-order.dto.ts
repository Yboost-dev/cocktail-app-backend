import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Item } from '../../items/entities/item.entity';

export class CreateOrderDto {
  @IsString()
  @ApiProperty({
    description: 'Email address',
    example: 'exemple@exemple.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Phone number',
    example: '<KEY>',
  })
  phone: string;

  @IsNumber()
  @ApiProperty({
    description: 'Number of tables',
    example: 2,
  })
  table: number;

  @IsString()
  @ApiProperty({
    description: 'Token for payment',
    example: '<KEY>',
  })
  token: string;

  @IsString()
  @IsIn(['pending', 'finish', 'canceled'], {
    message: 'Status must be pending, finish or canceled',
  })
  @ApiProperty({
    description: 'Status of order',
    example: 'pending / finish / canceled',
    enum: ['pending', 'finish', 'canceled'],
  })
  status: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Is order paid',
    example: false,
  })
  paid: boolean;

  @ValidateNested({ each: true })
  @Type(() => Item)
  @ApiProperty({ type: [Item] })
  articles: Item[];
}
