import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), 
    ProductModule, 
    UsersModule, 
    CategoryModule, 
    ShopModule, 
    BannerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
