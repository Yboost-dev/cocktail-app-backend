import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateArticleDto} from './dto/create-article.dto';
import {UpdateArticleDto} from './dto/update-article.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) {
    }

    create(createArticleDto: CreateArticleDto) {
        return this.prisma.article.create({
            data: createArticleDto,
        });
    }

    findAll() {
        return this.prisma.article.findMany({
            include: {
                articleIngredients: {
                    include: {
                        ingredient: true, // Inclure les détails de chaque ingrédient
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: {id},
            include: {
                articleIngredients: {
                    include: {
                        ingredient: true, // Inclure les détails de chaque ingrédient
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
        return this.prisma.article.update({
            where: {id},
            data: updateArticleDto,
        })
    }

    remove(id: number) {
        return this.prisma.article.delete({
            where: {id},
        })
    }
}
