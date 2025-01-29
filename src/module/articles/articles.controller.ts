import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  JwtAuthGuard,
  OptionalJwtAuthGuard,
} from '../auth/strategy/jwt-auth.guard';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { SwaggerResponses } from 'src/common/constants/swagger.constants';
import { ERROR } from 'src/common/constants/error.constants';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse(SwaggerResponses.ErrorServer)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: ArticleEntity,
    description: 'Article successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiNotFoundResponse({ description: 'One or more ingredients do not exist.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      return new ArticleEntity(
        await this.articlesService.create(createArticleDto),
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Propager les erreurs gérées spécifiquement
      }

      throw new BadRequestException(ERROR.InvalidInputFormat); // Erreur générique
    }
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [ArticleEntity],
    description: 'Articles successfully retrieved.',
  }) // Modifié pour refléter un tableau d'articles
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'No articles found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  async findAll(@Req() req: any) {
    const user = req.user;
    let articles;

    if (user) {
      articles = await this.articlesService.findAll();
    } else {
      articles = await this.articlesService.findPublished();
    }

    if (!articles || articles.length === 0) {
      throw new NotFoundException('No articles found.');
    }

    return articles.map((article) => new ArticleEntity(article));
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleEntity,
    description: 'Article successfully retrieved.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Article not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const user = req.user;
    let article;

    if (user) {
      article = await this.articlesService.findOne(id);
    } else {
      throw new NotFoundException('No articles found.');
    }

    if (!article || article.length === 0) {
      throw new NotFoundException('No articles found.');
    }

    return article.map((article) => new ArticleEntity(article));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Article successfully updated.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Article not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiNotFoundResponse({ description: 'One or more ingredients do not exist.' })
  @ApiCreatedResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return new ArticleEntity(
      await this.articlesService.update(id, updateArticleDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiAcceptedResponse({ description: 'Article successfully deleted.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'Article not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiCreatedResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.articlesService.remove(id);
  }
}
