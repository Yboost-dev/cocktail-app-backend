import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { email, token, status, paid, phone, table, articles } =
      createOrderDto;

    const invalidArticles = articles.filter((article) => article.quantity <= 0);
    if (invalidArticles.length > 0) {
      throw new Error(
        `Les articles suivants ont une quantité invalide (inférieure ou égale à 0) : ${invalidArticles
          .map((article) => article.articleId)
          .join(', ')}`,
      );
    }

    const articleIds = articles.map((article) => article.articleId);

    const articleDetails = await this.prisma.article.findMany({
      where: { id: { in: articleIds } },
      select: { id: true, price: true },
    });

    const foundArticleIds = articleDetails.map((article) => article.id);
    const missingArticles = articleIds.filter(
      (id) => !foundArticleIds.includes(id),
    );

    if (missingArticles.length > 0) {
      throw new NotFoundException(
        `Les articles suivants sont introuvables: ${missingArticles.join(', ')}`,
      );
    }

    const articlePriceMap = new Map(
      articleDetails.map((article) => [article.id, article.price]),
    );

    const articlesWithPrice = articles.map((article) => ({
      article: { connect: { id: article.articleId } },
      quantity: article.quantity,
      articlePrice: articlePriceMap.get(article.articleId),
    }));

    return this.prisma.order.create({
      data: {
        email,
        token,
        phone,
        table,
        status,
        paid,
        articles: {
          create: articlesWithPrice,
        },
      },
    });
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        articles: {
          select: {
            articleId: true,
            articlePrice: true,
            quantity: true,
          },
        },
      },
    });
    if (!orders || orders.length === 0) {
      throw new NotFoundException(`No orders found`);
    }
    return plainToInstance(OrderEntity, orders);
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        articles: {
          select: {
            articleId: true,
            articlePrice: true,
            quantity: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return plainToInstance(OrderEntity, order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    // Rechercher la commande existante
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
      include: {
        articles: {
          select: {
            articleId: true,
            quantity: true,
            articlePrice: true,
          },
        },
      },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Construire l'objet de données à mettre à jour
    const updateData: any = {};

    // Ajouter uniquement les champs qui ont été fournis
    if (updateOrderDto.email !== undefined) updateData.email = updateOrderDto.email;
    if (updateOrderDto.token !== undefined) updateData.token = updateOrderDto.token;
    if (updateOrderDto.status !== undefined) updateData.status = updateOrderDto.status;
    if (updateOrderDto.paid !== undefined) updateData.paid = updateOrderDto.paid;
    if (updateOrderDto.phone !== undefined) updateData.phone = updateOrderDto.phone;
    if (updateOrderDto.table !== undefined) updateData.table = updateOrderDto.table;

    // Traiter les articles seulement s'ils sont fournis
    if (updateOrderDto.articles && updateOrderDto.articles.length > 0) {
      const articlesWithPrice = updateOrderDto.articles.map((article) => {
        const existingArticle = existingOrder.articles.find(
          (a) => a.articleId === article.articleId,
        );

        return {
          articleId: article.articleId,
          quantity: article.quantity,
          articlePrice: existingArticle ? existingArticle.articlePrice : null,
        };
      });

      updateData.articles = {
        deleteMany: {},
        create: articlesWithPrice,
      };
    }

    // Effectuer la mise à jour
    return this.prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        articles: true,
      },
    });
  }

  async remove(id: string) {
    const exitingOrder = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!exitingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const articlesItem = await this.prisma.item.deleteMany({
      where: { orderId: id },
    });
    if (!articlesItem) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.prisma.order.delete({
      where: { id },
    });
    return {
      message: `Order with ID ${id} has been successfully deleted.`,
    };
  }
}
