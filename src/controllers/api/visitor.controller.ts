import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { CategoryService } from "src/services/category/category.service";
import { ProductService } from "src/services/product/product.service";
import { Category } from "src/entities/category.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { ProductSearchDto } from "src/dtos/product/product.search.dto";
import { Product } from "src/entities/product.entity";

@Controller('visitor/')
export class VisitorController {
    
    constructor(
        private readonly categoryService: CategoryService,
        private readonly productService: ProductService,
        ) {}
        
        @Get('category')
        async getCategories(): Promise<Category[] | ApiResponse> {        
        return await this.categoryService.getCategories();
        }
        
        @Get('category/:id')
        async getById(@Param('id') id: number): Promise <Category | ApiResponse> {
            return await this.categoryService.getById(id);
        }

        @Post('search')   
        async search(@Body() data: ProductSearchDto): Promise <Product[] | ApiResponse> {
        return await this.productService.search(data);
        }

        @Get('product')
        async getProducts(): Promise<Product[] | ApiResponse> {        
        return await this.productService.getProducts();
        }
        
        @Get('product/:id')
        async getProductById(@Param('id') id: number): Promise <Product | ApiResponse> {
            return await this.productService.getProductById(id);
        }

}