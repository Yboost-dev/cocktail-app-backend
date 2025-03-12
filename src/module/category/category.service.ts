import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        name: createCategoryDto.name,
      },
    });
    if (existingCategory) {
      throw new NotFoundException(
        `Category with name '${createCategoryDto.name}' already exists.`,
      );
    }

    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    const categorys = await this.prisma.category.findMany({
      include: {
        articles: false,
      },
    });
    if (!categorys || categorys.length === 0) {
      throw new NotFoundException(`No categories found`);
    }
    return categorys;
  }

  async findOne(name: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        name: name,
      },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${name} not found`);
    }
    return this.prisma.category.findUnique({
      where: {
        name: name,
      },
      include: {
        articles: true,
      },
    });
  }

  async findOnePublish(name: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        name: name,
      },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${name} not found`);
    }
    return this.prisma.category.findUnique({
      where: {
        name: name,
      },
      include: {
        articles: {
          where: {
            published: true,
          },
        },
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.prisma.category.update({
      where: { id: id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.prisma.category.delete({
      where: { id: id },
    });
  }
}
