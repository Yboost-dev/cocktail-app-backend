import { Article } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleIngredient } from '../../article-ingredient/entities/article-ingredient.entity';

export class ArticleEntity implements Article {
  constructor({ ingredient, ...data }: Partial<ArticleEntity>) {
    Object.assign(this, data);
    if (ingredient) {
      this.ingredient = ingredient;
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  imagePath: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: ArticleIngredient })
  ingredient: ArticleIngredient[];
}
