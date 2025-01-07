import { Test, TestingModule } from '@nestjs/testing';
import { ArticleIngredientService } from './article-ingredient.service';

describe('ArticleIngredientService', () => {
  let service: ArticleIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleIngredientService],
    }).compile();

    service = module.get<ArticleIngredientService>(ArticleIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
