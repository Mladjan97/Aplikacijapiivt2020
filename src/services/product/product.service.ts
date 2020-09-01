import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ProductPrice } from "entities/product-price.entity";
import { ProductMaterial } from "entities/product-material.entity";
import { InStock } from "entities/in-stock.entity";

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
    constructor(
        @InjectRepository(Product)
        private readonly product: Repository<Product>,

        @InjectRepository(ProductPrice)
        private readonly productPrice: Repository<ProductPrice>,

        @InjectRepository(InStock)
        private readonly inStock: Repository<InStock>,

        ) {
        super(product);
    }

    async createFullProduct(data: AddProductDto): Promise <Product | ApiResponse>{
        const newProduct: Product = new Product();
        newProduct.title             = data.title;
        newProduct.description       = data.description;
        newProduct.categoryId        = data.categoryId;
        newProduct.productMaterialId = data.materialId;

      const savedProduct = await this.product.save(newProduct);

      const newProductPrice: ProductPrice = new ProductPrice();
      newProductPrice.productId = savedProduct.productId;
      newProductPrice.price     = data.price;

      await this.productPrice.save(newProductPrice);
      
      const newInStock: InStock = new InStock();
      newInStock.productId = savedProduct.productId;
      newInStock.quantity  = data.quantity;
      newInStock.size      = data.size;
      newInStock.color     = data.color;

      await this.inStock.save(newInStock);

      return await this.product.findOne(savedProduct.productId, {
          relations: [
            "category",
            "productMaterial",
            "productPrices"
          ]
      })
    }
}