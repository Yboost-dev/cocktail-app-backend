import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateIngredientDto} from './dto/create-ingredient.dto';
import {UpdateIngredientDto} from './dto/update-ingredient.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class IngredientsService {
    constructor(private prisma: PrismaService) {
    }

    async create(createIngredientDto: CreateIngredientDto) {
        const articleExisting = await this.prisma.ingredient.findUnique({
            where: {name: createIngredientDto.name},
        })
        if (articleExisting) {
            throw new BadRequestException(`Ingredient with name '${createIngredientDto.name}' already exists.`);
        }
        return this.prisma.ingredient.create({
            data: createIngredientDto,
        });
    }

    async findAll() {
        const ingredients = await this.prisma.ingredient.findMany();
        if (!ingredients || ingredients.length === 0) {
            throw new NotFoundException(`No ingredients found`);
        }
        return ingredients;
    }

    async findOne(id: number) {
        const ingredient = await this.prisma.ingredient.findUnique({
            where: {id: id},
        });
        if (!ingredient) {
            throw new NotFoundException(`No ingredient found`);
        }
        return ingredient;
    }

    async update(id: number, updateIngredientDto: UpdateIngredientDto) {
        const ingredient = await this.prisma.ingredient.findUnique({ where: { id } });
        if (!ingredient) {
            throw new NotFoundException(`No ingredient found.`);
        }
        return this.prisma.ingredient.update({ where: { id: id }, data: updateIngredientDto });
    }

    async remove(id: number) {
        const ingredient = await this.prisma.ingredient.findUnique({ where: { id } });
        if (!ingredient) {
            throw new NotFoundException(`No ingredient found.`);
        }
        await this.prisma.articleIngredient.deleteMany({
            where: { ingredientId: id },
        });
        return this.prisma.ingredient.delete({ where: { id: id } });
    }
}
