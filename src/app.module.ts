import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigutration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Category } from 'entities/category.entity';
import { InStock } from 'entities/in-stock.entity';
import { Picture } from 'entities/picture.entity';
import { ProductMaterial } from 'entities/product-material.entity';
import { ProductPrice } from 'entities/product-price.entity';
import { Product } from 'entities/product.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controllers/api/product.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfigutration.hostname,
      port: 3306,
      username: DatabaseConfigutration.username,
      password: DatabaseConfigutration.password,
      database: DatabaseConfigutration.database,
      entities: [
         Administrator,
         Category,
         InStock,
         Picture,
         ProductMaterial,
         ProductPrice,
         Product
        ]
    }),
    TypeOrmModule.forFeature([ 
      Administrator,
      Category,
      Product,
    ])
  ],
  controllers: [
    AppController,
    AdministratorController,
    CategoryController,
    ProductController,
  ],
  providers: [
    AdministratorService,
    CategoryService,
    ProductService,
  ],
})
export class AppModule {}
