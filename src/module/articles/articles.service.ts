import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ERROR } from 'src/common/constants/error.constants';
import { join } from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, file: Express.Multer.File) {
    const { title, description, categoryId, price, published, ingredients } =
      createArticleDto;

    if (!file || !file.mimetype.startsWith('image/')) {
      throw new BadRequestException(
        'Invalid file format, only images are allowed.',
      );
    }

    const uploadDir = join(process.cwd(), 'uploads', 'articles');
    const finalPath = join(uploadDir, file.filename);

    const existingArticle = await this.prisma.article.findUnique({
      where: { title },
    });
    if (existingArticle) {
      throw new BadRequestException(
        `An article with the title '${title}' already exists.`,
      );
    }

    try {
      // S'assurer que le répertoire existe
      await fs.ensureDir(uploadDir);

      // Déplacer le fichier vers sa destination finale
      await fs.move(file.path, finalPath);

      const existingCategory = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!existingCategory) {
        throw new NotFoundException(ERROR.ResourceNotFound);
      }

      const article = await this.prisma.article.create({
        data: {
          title,
          description,
          price,
          imagePath: '/uploads/articles/' + file.filename,
          categoryId,
          published,
          ingredients: {
            create: ingredients.map((ingredient) => ({
              quantity: ingredient.quantity,
              ingredient: {
                connect: { id: ingredient.ingredientId },
              },
            })),
          },
        },
      });

      return article;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const articles = await this.prisma.article.findMany({
      include: {
        ingredients: {
          select: {
            ingredient: {
              select: {
                name: true,
                unit: true,
              },
            },
            quantity: true,
          },
        },
      },
    });

    return articles.map((article) => ({
      ...article,
      ingredients: article.ingredients.map((i) => ({
        name: i.ingredient.name,
        quantity: i.quantity,
        unit: i.ingredient.unit,
      })),
    }));
  }

  async findPublished() {
    const articles = await this.prisma.article.findMany({
      where: { published: true },
      include: {
        ingredients: {
          select: {
            ingredient: {
              select: {
                name: true,
                unit: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
    return articles.map((article) => ({
      ...article,
      ingredients: article.ingredients.map((i) => ({
        name: i.ingredient.name,
        quantity: i.quantity,
        unit: i.ingredient.unit,
      })),
    }));
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findMany({
      where: { id },
      include: {
        ingredients: {
          select: {
            ingredient: {
              select: {
                name: true,
                unit: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
    if (article.length === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article.map((article) => ({
      ...article,
      ingredients: article.ingredients.map((i) => ({
        name: i.ingredient.name,
        quantity: i.quantity,
        unit: i.ingredient.unit,
      })),
    }));
  }

  async findPublishedById(id: number) {
    const article = await this.prisma.article.findMany({
      where: { id, published: true },
      include: {
        ingredients: {
          select: {
            ingredient: {
              select: {
                name: true,
                unit: true,
              },
            },
          },
        },
      },
    });
    if (article.length === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const { title, description, categoryId, published, price, ingredients } =
      updateArticleDto;

    const existingArticle = await this.prisma.article.findUnique({
      where: { id },
      include: { ingredients: true },
    });
    if (!existingArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    const existingCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!existingCategory) {
      throw new NotFoundException(
        `Category with ID ${categoryId} does not exist.`,
      );
    }

    if (ingredients && ingredients.length > 0) {
      const ingredientIds = ingredients.map((ing) => ing.ingredientId);
      const existingIngredients = await this.prisma.ingredient.findMany({
        where: { id: { in: ingredientIds } },
      });

      if (existingIngredients.length !== ingredientIds.length) {
        const existingIngredientIds = new Set(
          existingIngredients.map((ing) => ing.id),
        );
        const missingIngredientIds = ingredientIds.filter(
          (id) => !existingIngredientIds.has(id),
        );
        throw new NotFoundException(
          `Ingredients with IDs ${missingIngredientIds.join(', ')} not found.`,
        );
      }

      const invalidIngredients = ingredients.filter((ing) => ing.quantity <= 0);
      if (invalidIngredients.length > 0) {
        const invalidIds = invalidIngredients.map((ing) => ing.ingredientId);
        throw new BadRequestException(
          `Invalid quantity for ingredients with id: ${invalidIds}. Quantity must be greater than 0.`,
        );
      }

      const ingredientIdsSet = new Set(
        ingredients.map((ing) => ing.ingredientId),
      );
      const oldIngredientIdsSet = new Set(
        existingArticle.ingredients.map((ing) => ing.ingredientId),
      );

      const createIngredients = ingredients.filter(
        (ing) => !oldIngredientIdsSet.has(ing.ingredientId),
      );

      for (const oldIngredient of existingArticle.ingredients) {
        if (!ingredientIdsSet.has(oldIngredient.ingredientId)) {
          await this.prisma.articleIngredient.delete({
            where: {
              articleId_ingredientId: {
                articleId: oldIngredient.articleId,
                ingredientId: oldIngredient.ingredientId,
              },
            },
          });
        }
      }

      await this.prisma.articleIngredient.createMany({
        data: createIngredients.map((ingredient) => ({
          ingredientId: ingredient.ingredientId,
          articleId: existingArticle.id,
          quantity: ingredient.quantity,
        })),
      });

      for (const newIngredient of ingredients) {
        if (oldIngredientIdsSet.has(newIngredient.ingredientId)) {
          await this.prisma.articleIngredient.update({
            where: {
              articleId_ingredientId: {
                articleId: id,
                ingredientId: newIngredient.ingredientId,
              },
            },
            data: {
              quantity: newIngredient.quantity,
            },
          });
        }
      }
    }

    return this.prisma.article.update({
      where: { id },
      data: {
        title,
        description,
        published,
        categoryId,
        price,
      },
    });
  }

  async remove(id: number) {
    const existingArticle = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    await this.prisma.articleIngredient.deleteMany({
      where: { articleId: id },
    });

    await this.prisma.article.delete({
      where: { id },
    });

    return { message: `Article with ID ${id} has been successfully deleted.` };
  }
}
