import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class Item {
  @Exclude()
  id: number;

  @Exclude()
  orderId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  articleId: number;

  @Exclude()
  articlePrice: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
