import { Test, TestingModule } from '@nestjs/testing';
import { ArticleIngredientController } from './article-ingredient.controller';
import { ArticleIngredientService } from './article-ingredient.service';

describe('ArticleIngredientController', () => {
  let controller: ArticleIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleIngredientController],
      providers: [ArticleIngredientService],
    }).compile();

    controller = module.get<ArticleIngredientController>(ArticleIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
