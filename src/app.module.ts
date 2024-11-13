import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [AuthModule, UserModule, ArticleModule],
})
export class AppModule {}
