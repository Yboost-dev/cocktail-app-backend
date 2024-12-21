import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthentifierModule } from './authentifier/authentifier.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthentifierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
