import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "src/entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ProductPrice } from "src/entities/product-price.entity";
import { ProductMaterial } from "src/entities/product-material.entity";
import { InStock } from "src/entities/in-stock.entity";
import { EditProductDto } from "src/dtos/product/edit.product.dto";

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
      });
    }

    async editFullProduct(productId: number, data: EditProductDto): Promise <Product | ApiResponse>{
      const existingProduct: Product = await this.product.findOne(productId, {
        relations: [ 'productPrices', 'inStocks' ]
      });

      const someId = await this.inStock.findOne(6);

      console.log(someId);

      if (!existingProduct) {
        return new ApiResponse('error', -5001, 'Product not found.');
      }

      existingProduct.title             = data.title;
      existingProduct.description       = data.description;
      existingProduct.categoryId        = data.categoryId;
      existingProduct.productMaterialId = data.productMaterialId;

      const savedProduct = await this.product.save(existingProduct);
      if (!savedProduct) {
        return new ApiResponse('error', -5002, 'Could not save new product data.');
      }

      const newPriceString: string = Number(data.price).toFixed(2);
      const lastPrice = existingProduct.productPrices[existingProduct.productPrices.length-1].price;
      const lastPriceString: string = Number(lastPrice).toFixed(2);

      if (newPriceString !== lastPriceString) {
        const newProductPrice = new ProductPrice();
        newProductPrice.productId = productId;
        newProductPrice.price     = data.price;

        const savedProductPrice = await this.productPrice.save(newProductPrice);
        if (!savedProductPrice) {
          return new ApiResponse('error', -5003, 'Could not save the new product price.');
        }
      }
/*
      const newQuantity = Number(data.quantity);
      const lastQ = existingProduct.inStocks[existingProduct.inStocks.length-1].quantity;
      const lastQuantity = Number(lastQ);

      if (newQuantity !== lastQuantity) {
        const newProductQuantity = new InStock();
        newProductQuantity.productId = productId;
        newProductQuantity.quantity  = data.quantity;

        const savedProductQuantity = await this.inStock.save(newProductQuantity);
        if (!savedProductQuantity) {
          return new ApiResponse('error', -5003, 'Could not save the new product quantity.');
        }
      }

      const newSize = Number(data.size);
      const lastS = existingProduct.inStocks[existingProduct.inStocks.length-1].size;
      const lastSize = Number(lastS);

      if (newSize !== lastSize) {
        const newProductSize = new InStock();
        newProductSize.productId = productId;
        newProductSize.size  = data.size;

        const savedProductSize = await this.inStock.save(newProductSize);
        if (!savedProductSize) {
          return new ApiResponse('error', -5003, 'Could not save the new product size.');
        }
      }

      const newColorString = String(data.color);
      const lastC = existingProduct.inStocks[existingProduct.inStocks.length-1].color;
      const lastColorString = String(lastC);



      if (newColorString !== lastColorString) {
        const newProductColor = new InStock();
        newProductColor.productId = productId;
        newProductColor.color     = data.color;

        const savedProductColor = await this.inStock.save(newProductColor);
        if (!savedProductColor) {
          return new ApiResponse('error', -5003, 'Could not save the new product color.');
        }
      }
      */

     const newSize = Number(data.size);
     const lastS = existingProduct.inStocks[existingProduct.inStocks.length-1].size;
     const lastSize = Number(lastS);

     const newColorString = String(data.color);
      const lastC = existingProduct.inStocks[existingProduct.inStocks.length-1].color;
      const lastColorString = String(lastC);

      if (newSize === lastSize && newColorString === lastColorString) {
        await this.inStock.remove(existingProduct.inStocks);
        const newProductQuantity = new InStock();
        newProductQuantity.productId = productId;
        newProductQuantity.quantity  = data.quantity;
        newProductQuantity.size      = data.size;
        newProductQuantity.color      = data.color;

        const savedProductQuantity = await this.inStock.save(newProductQuantity);
        if (!savedProductQuantity) {
          return new ApiResponse('error', -5003, 'Could not save the new product quantity.');
        }
      }

      return await this.product.findOne(productId, {
          relations: [
            "category",
            "productMaterial",
            "productPrices"
          ]
      });
    }
}