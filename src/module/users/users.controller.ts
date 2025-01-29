import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException, Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/module/auth/strategy/jwt-auth.guard';
import { ERROR } from '../../common/constants/error.constants';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'User successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  async create(@Body() createUserDto: CreateUserDto, @Req() req) {
    console.log('Contenu reçu dans la requête complète :', req.body);
    console.log('Données validées (DTO) :', createUserDto);
    try {
      return new UserEntity(await this.usersService.create(createUserDto));
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(ERROR.InvalidInputFormat);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: 'Users successfully retrieved.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'No users found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserEntity,
    description: 'User successfully retrieved.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  async findOne(@Param('id') id: string) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserEntity,
    description: 'User successfully updated.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiCreatedResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserEntity,
    description: 'User deleted successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  async remove(@Param('id') id: string) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
