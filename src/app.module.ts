import { Module , NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigutration } from 'config/database.configuration';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Category } from 'src/entities/category.entity';
import { InStock } from 'src/entities/in-stock.entity';
import { Picture } from 'src/entities/picture.entity';
import { ProductMaterial } from 'src/entities/product-material.entity';
import { ProductPrice } from 'src/entities/product-price.entity';
import { Product } from 'src/entities/product.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controllers/api/product.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PictureService } from './services/picture/picture.service';
import { InStockService } from './services/inStock/in-stock.service';
import { InStockController } from './controllers/api/in-stock.controller';

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
      ProductPrice,
      ProductMaterial,
      InStock,
      Picture,
    ])
  ],
  controllers: [
    AppController,
    AdministratorController,
    CategoryController,
    ProductController,
    AuthController,
    InStockController,
  ],
  providers: [
    AdministratorService,
    CategoryService,
    ProductService,
    PictureService,
    InStockService,
  ],
  exports: [
    AdministratorService,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   consumer
    .apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*')
  }

}
