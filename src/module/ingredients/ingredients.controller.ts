import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IngredientEntity } from './entities/ingredient.entity';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: IngredientEntity,
    description: 'Ingredient successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: IngredientEntity,
    isArray: true,
    description: 'Ingredients successfully retrieved.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'No ingredients found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: IngredientEntity,
    description: 'Ingredient successfully retrieved.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Ingredient not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  findOne(@Param('id') id: number) {
    return this.ingredientsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: IngredientEntity,
    description: 'Ingredient successfully updated.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Ingredient not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiNotFoundResponse({ description: 'One or more ingredients do not exist.' })
  @ApiCreatedResponse({ type: IngredientEntity })
  update(
    @Param('id') id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: IngredientEntity,
    description: 'Ingredient successfully deleted.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Ingredient not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiCreatedResponse({ type: IngredientEntity })
  remove(@Param('id') id: number) {
    return this.ingredientsService.remove(+id);
  }
}
