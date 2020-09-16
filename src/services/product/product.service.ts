import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Product } from "src/entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ProductPrice } from "src/entities/product-price.entity";
import { ProductMaterial } from "src/entities/product-material.entity";
import { InStock } from "src/entities/in-stock.entity";
import { EditProductDto } from "src/dtos/product/edit.product.dto";
import { ProductSearchDto } from "src/dtos/product/product.search.dto";

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
            "productPrices",
            "inStocks",
            "pictures"
          ]
      });
    }

    async editFullProduct(productId: number, data: EditProductDto): Promise <Product | ApiResponse>{
      const existingProduct: Product = await this.product.findOne(productId, {
        relations: [ 'productPrices', 'inStocks' ]
      });

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
            "productPrices",
            "inStocks",
            "pictures"
          ]
      });
    }
    
    async search(data: ProductSearchDto): Promise<Product[] | ApiResponse> {
      const builder = await this.product.createQueryBuilder("product");

      builder.innerJoinAndSelect("product.productPrices",
       "pp",
      "pp.createdAt = (SELECT MAX(pp.created_at) FROM product_price as pp WHERE pp.product_id = product.product_id)"
      );

      builder.leftJoinAndSelect("product.inStocks", "is");

      builder.where('product.productMaterialId = :productMaterialId', { productMaterialId: data.materialId });
      
      

     builder.where('product.categoryId = :categoryId', { categoryId: data.categoryId });

      if(data.size && typeof data.size === 'number') {
        builder.andWhere('is.size = :size', { size: data.size});
      }
      if(data.color && typeof data.color === 'string') {
        builder.andWhere('is.color = :color', { color: data.color});
      }

      if (data.keywords && data.keywords.length > 0) {
        builder.andWhere(`(product.title LIKE :kw OR 
                          product.description LIKE :kw)`,
                          { kw: '%' + data.keywords.trim() + '%' });
      }

      if(data.priceMin && typeof data.priceMin === 'number') {
        builder.andWhere('pp.price >= :min', { min: data.priceMin });
      }

      if(data.priceMax && typeof data.priceMax === 'number') {
        builder.andWhere('pp.price <= :max', { max: data.priceMax });
      }

      let orderBy = 'product.title';
      let orderDirection: 'ASC' | 'DESC' = 'ASC';

      if (data.orderBy) {
        orderBy = data.orderBy;

        if(orderBy === 'price') {
          orderBy = 'pp.price';
        }

        if(orderBy === 'title') {
          orderBy = 'product.title';
        }
      }

      if (data.orderDirection) {
        orderDirection = data.orderDirection;
      }

      builder.orderBy(orderBy, orderDirection);

      let page = 0;
      let perPage: 5 | 10 | 25 | 50 = 25;

      if (data.page && typeof data.page === 'number') {
        page = data.page;
      }

      if (data.itemsPerPage && typeof data.itemsPerPage === 'number') {
        perPage = data.itemsPerPage;
      }

      builder.skip(page * perPage);
      builder.take(perPage);

      const productIds = await (await builder.getMany()).map(product => product.productId);

      if(productIds.length === 0) {
        return new ApiResponse("ok", 0, "No products found!");
      }
      
      return await this.product.find({
        where: { productId: In(productIds) },
        relations: [
          "category",
          "productMaterial",
          "productPrices",
          "inStocks",
          "pictures"
        ]
      });
    }
    
}