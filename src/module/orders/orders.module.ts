import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {ArticlesController} from "../articles/articles.controller";
import {ArticlesService} from "../articles/articles.service";
import {PrismaModule} from "../../prisma/prisma.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [PrismaModule],
  exports: [OrdersService]
})
export class OrdersModule {}
