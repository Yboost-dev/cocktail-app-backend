import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {JwtAuthGuard} from "../auth/strategy/jwt-auth.guard";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {OrderEntity} from "./entities/order.entity";
import {plainToInstance} from "class-transformer";

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: OrderEntity, description: 'Order successfully created.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return plainToInstance(OrderEntity, await this.ordersService.create(createOrderDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: OrderEntity, description: 'Orders successfully retrieved.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiNotFoundResponse({ description: 'No orders found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  async findAll() {
    const orders = await this.ordersService.findAll();
    return orders.map((order) => order);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: OrderEntity, description: 'Order successfully retrieved.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: OrderEntity, description: 'Order successfully updated.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  @ApiCreatedResponse({type: OrderEntity})
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: OrderEntity, description: 'Order successfully deleted.' })
  @ApiBadRequestResponse({ description: 'Validation failed for input data.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(+id);
  }
}
