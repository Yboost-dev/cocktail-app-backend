import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { ArticlesModule } from './module/articles/articles.module';
import { IngredientsModule } from './module/ingredients/ingredients.module';
import { OrdersModule } from './module/orders/orders.module';
import { CategoryModule } from './module/category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    IngredientsModule,
    OrdersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
