import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleIngredientService } from './article-ingredient.service';
import { CreateArticleIngredientDto } from './dto/create-article-ingredient.dto';
import { UpdateArticleIngredientDto } from './dto/update-article-ingredient.dto';

@Controller('article-ingredient')
export class ArticleIngredientController {
  constructor(private readonly articleIngredientService: ArticleIngredientService) {}

  @Post()
  create(@Body() createArticleIngredientDto: CreateArticleIngredientDto) {
    return this.articleIngredientService.create(createArticleIngredientDto);
  }

  @Get()
  findAll() {
    return this.articleIngredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleIngredientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleIngredientDto: UpdateArticleIngredientDto) {
    return this.articleIngredientService.update(+id, updateArticleIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleIngredientService.remove(+id);
  }
}
