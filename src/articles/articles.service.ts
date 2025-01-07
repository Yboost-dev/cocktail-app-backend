import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateArticleDto} from './dto/create-article.dto';
import {UpdateArticleDto} from './dto/update-article.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) {
    }

    async create(createArticleDto: CreateArticleDto) {
        const { title, description, published , ingredients} = createArticleDto;
        const article = await this.prisma.article.create({
            data: {
                title,
                description,
                published,
                ingredients: {
                    create: ingredients
                }
            },
        });
        ingredients.forEach(ingredient => {
            this.prisma.articleIngredient.create({
                data: {
                    ingredientId: ingredient.ingredientId,
                    articleId: article.id,
                    quantity: ingredient.quantity
                }
            })
        })
        console.log(article);
        return article;
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
                            }
                        },
                        quantity: true
                    }
                }
            },
        });

        return articles.map(article => ({
            ...article,
            ingredients: article.ingredients.map(i => ({
                name: i.ingredient.name,
                quantity: i.quantity,
                unit: i.ingredient.unit,
            }))
        }));
    }

    async findOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: {id},
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        if (!article) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }
        return article;
    }

    update(id: number, updateArticleDto: UpdateArticleDto) {
        const { title, description, published, ingredients, ...rest } = updateArticleDto;

        return this.prisma.article.update({
            where: { id },
            data: {
                title,
                description,
                published,
                ...rest,
            },
        });
    }

    remove(id: number) {
        return this.prisma.article.delete({
            where: {id},
        })
    }
}
