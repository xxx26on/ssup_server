import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [PrismaModule, AuthModule, CategoriesModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
