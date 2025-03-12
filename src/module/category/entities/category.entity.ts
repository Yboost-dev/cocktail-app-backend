import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from '../../articles/entities/article.entity';

export class CategoryEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Liste des articles associés à la catégorie',
    type: [ArticleEntity],
    required: false,
  })
  articles?: ArticleEntity[];
}
