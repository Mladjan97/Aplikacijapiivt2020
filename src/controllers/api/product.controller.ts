import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ProductService } from "src/services/product/product.service";
import { Product } from "entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";

@Controller('api/product')
@Crud({
    model: {
        type: Product
    },
    params: {
        id: {
            field: 'productId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            category: {
                eager: true
            },
            pictures: {
                eager: true
            },
            productMaterial: {
                eager: true   
            },
            productPrices: {
                eager: true
            },
            inStocks: {
                eager: true
            }
        }
    }
})
export class ProductController {
    constructor(public service: ProductService) { }

    @Post('createFull') 
    createFullProduct(@Body() data: AddProductDto) {

        return this.service.createFullProduct(data);
    }
}