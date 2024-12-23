import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateIngredientDto} from './dto/create-ingredient.dto';
import {UpdateIngredientDto} from './dto/update-ingredient.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class IngredientsService {
    constructor(private prisma: PrismaService) {
    }

    create(createIngredientDto: CreateIngredientDto) {
        return this.prisma.ingredient.create({
            data: createIngredientDto,
        });
    }

    findAll() {
        return this.prisma.ingredient.findMany();
    }

    async findOne(name: string) {
        const ingredient = await this.prisma.ingredient.findFirst({
            where: {name: name},
        });
        if (!ingredient) {
            throw new NotFoundException(`No ingredient found for name: ${name}`);
        }
        return ingredient;
    }

    async update(name: string, updateIngredientDto: UpdateIngredientDto) {
        const ingredient = await this.prisma.ingredient.findFirst({ where: { name } });
        if (!ingredient) {
            throw new NotFoundException(`No ingredient found for name: ${name}`);
        }
        return this.prisma.ingredient.update({ where: { id: ingredient.id }, data: updateIngredientDto });
    }

    async remove(name: string) {
        const ingredient = await this.prisma.ingredient.findFirst({ where: { name } });
        if (!ingredient) {
            throw new NotFoundException(`No ingredient found for name: ${name}`);
        }
        return this.prisma.ingredient.delete({ where: { id: ingredient.id } });
    }
}
