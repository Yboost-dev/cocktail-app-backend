import { Injectable } from '@nestjs/common';
import { CreateArticleIngredientDto } from './dto/create-article-ingredient.dto';
import { UpdateArticleIngredientDto } from './dto/update-article-ingredient.dto';

@Injectable()
export class ArticleIngredientService {
  create(createArticleIngredientDto: CreateArticleIngredientDto) {
    return 'This action adds a new articleIngredient';
  }

  findAll() {
    return `This action returns all articleIngredient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} articleIngredient`;
  }

  update(id: number, updateArticleIngredientDto: UpdateArticleIngredientDto) {
    return `This action updates a #${id} articleIngredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} articleIngredient`;
  }
}
