import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "entities/product.entity";

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
    constructor(@InjectRepository(Product)private readonly product: Repository<Product>) {
        super(product);
    }
}