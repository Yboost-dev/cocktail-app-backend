import { PartialType } from '@nestjs/swagger';
import { CreateArticleIngredientDto } from './create-article-ingredient.dto';

export class UpdateArticleIngredientDto extends PartialType(CreateArticleIngredientDto) {}
