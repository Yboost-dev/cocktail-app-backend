import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {IngredientEntity} from "./entities/ingredient.entity";

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({type: IngredientEntity})
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: IngredientEntity, isArray: true})
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':name')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: IngredientEntity})
  findOne(@Param('name') name: string) {
    return this.ingredientsService.findOne(name);
  }

  @Patch(':name')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: IngredientEntity})
  update(@Param('name') name: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientsService.update(name, updateIngredientDto);
  }

  @Delete(':name')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: IngredientEntity})
  remove(@Param('name') name: string) {
    return this.ingredientsService.remove(name);
  }
}
