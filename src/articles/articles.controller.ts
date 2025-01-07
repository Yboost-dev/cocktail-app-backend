import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe} from '@nestjs/common';
import {ArticlesService} from './articles.service';
import {CreateArticleDto} from './dto/create-article.dto';
import {UpdateArticleDto} from './dto/update-article.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {
    ApiAcceptedResponse,
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {ArticleEntity} from "./entities/article.entity";

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: ArticleEntity, description: 'Article successfully created.' })
    @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
    @ApiNotFoundResponse({ description: 'One or more ingredients do not exist.' })
    @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
    async create(@Body() createArticleDto: CreateArticleDto) {
        return new ArticleEntity(
            await this.articlesService.create(createArticleDto),
        );
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: ArticleEntity, description: 'Articles successfully retrieved.'})
    @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
    @ApiNotFoundResponse({ description: 'No articles found.' })
    @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
    async findAll() {
        const articles = await this.articlesService.findAll();
        return articles.map((article) => new ArticleEntity(article));
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: ArticleEntity, description: 'Article successfully retrieved.'})
    @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
    @ApiNotFoundResponse({ description: 'Article not found.' })
    @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const article = await this.articlesService.findOne(id);
        return article.map((article) => new ArticleEntity(article));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({description: 'Article successfully updated.'})
    @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
    @ApiNotFoundResponse({ description: 'Article not found.' })
    @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
    @ApiNotFoundResponse({ description: 'One or more ingredients do not exist.' })
    @ApiCreatedResponse({type: ArticleEntity})
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
    @ApiAcceptedResponse({description: 'Article successfully deleted.'})
    @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
    @ApiNotFoundResponse({ description: 'Article not found.' })
    @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
    @ApiCreatedResponse({type: ArticleEntity})
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.articlesService.remove(id);
    }
}
