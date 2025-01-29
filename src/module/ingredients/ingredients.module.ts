import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import {PrismaModule} from "../../prisma/prisma.module";

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
  imports: [PrismaModule],
  exports: [IngredientsService]
})
export class IngredientsModule {}
