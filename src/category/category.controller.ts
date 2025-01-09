import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {JwtAuthGuard} from "../auth/strategy/jwt-auth.guard";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {CategoryEntity} from "./entities/category.entity";
import {IngredientEntity} from "../ingredients/entities/ingredient.entity";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({type: CategoryEntity, description: 'Category successfully created.'})
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: CategoryEntity, isArray: true, description: 'Categories successfully retrieved.'})
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'No Categories found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: CategoryEntity, description: 'Category successfully retrieved.'})
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Category not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Category not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiNotFoundResponse({ description: 'One or more categories do not exist.' })
  @ApiCreatedResponse({type: CategoryEntity, description: 'Category successfully updated.'})
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: CategoryEntity, description: 'Category successfully deleted.'})
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Category not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
