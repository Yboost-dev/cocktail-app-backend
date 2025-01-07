import { Module } from '@nestjs/common';
import { ArticleIngredientService } from './article-ingredient.service';
import { ArticleIngredientController } from './article-ingredient.controller';

@Module({
  controllers: [ArticleIngredientController],
  providers: [ArticleIngredientService],
})
export class ArticleIngredientModule {}
